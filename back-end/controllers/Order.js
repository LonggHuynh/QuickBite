const db = require("../db");

const uuid = require("uuid");

const getOrdersOfUser = async (req, res, next) => {
    const { uid } = req.user;
    const statement = `SELECT app_order.*, json_agg(to_jsonb(dish.*) || jsonb_build_object('quantity', ordered_item.quantity)) as items, to_jsonb(restaurant.*) as restaurant
        FROM app_order
                 JOIN ordered_item ordered_item ON app_order.id = ordered_item.order_id
                 JOIN dish ON dish.id = ordered_item.dish_id
                 JOIN restaurant on app_order.restaurant_id = restaurant.id
        WHERE app_order.uid = $1
        GROUP BY app_order.id, restaurant.id
        ORDER BY app_order.date DESC
        `;

    try {
        const { rows } = await db.query(statement, [uid]);

        res.status(200).json(rows);
    } catch (err) {
        next(err);
    }
};

const rateOrder = async (req, res, next) => {
    const { uid } = req.user;
    const { id } = req.params;
    const { rating } = req.body;

    const statement = `UPDATE app_order 
        SET rating = $1
        WHERE id = $2
        AND uid = $3
    `;
    try {
        const { rowCount } = await db.query(statement, [rating, id, uid]);
        if (rowCount == 0) {
            res.status(400).json({ msg: "You do not have this order" });
        } else {
            res.status(201).json({ msg: "Order updated" });
        }
    } catch (err) {
        next(err);
    }
};

const addNewOrder = async (req, res, next) => {
    const { info, cart } = req.body;

    const uid = req.user?.uid;

    const amountPaid = cart.amountPaid;
    const items = cart.items;
    const restaurantId = cart.restaurant.id;
    try {
        await db.query("BEGIN");

        const statement = `SELECT dish.id, dish.price, restaurant.delivery_cost, restaurant.min_order 
                    FROM dish 
                    LEFT JOIN restaurant ON dish.restaurant_id = restaurant.id
                    WHERE restaurant.id=$1 
                    AND dish.id = ANY($2::uuid[])`;

        const { rows } = await db.query(statement, [
            restaurantId,
            items.map((item) => item.id),
        ]);

        const priceMap = rows.reduce(function (map, item) {
            map[item.id] = item.price;
            return map;
        }, {});

        let total = Number(rows[0].delivery_cost) || 0;

        items.forEach(({ id, quantity }) => {
            const price = Number(priceMap[id]) || 0;
            total += price * quantity;
        });

        if (
            items.length > priceMap.length ||
            amountPaid != total ||
            rows.length == 0
        ) {
            await db.query("ABORT");
            res.status(400).json({
                msg: "There is some thing wrong with your order",
            });
            next();
        }

        if (total - Number(rows[0].delivery_cost) < rows[0].min_order) {
            await db.query("ABORT");
            res.status(400).json({
                msg: `The minimum order price hasn't been reached yet.`,
            });
            next();
        }

        const orderId = uuid.v4();

        const insertOrderStatement = `INSERT INTO app_order(id, uid, restaurant_id, name, email, address) values ($1, $2, $3, $4, $5, $6)`;

        await db.query(insertOrderStatement, [
            orderId,
            uid,
            restaurantId,
            info.name,
            info.email,
            `${info.address}, ${info.city}, ${info.postcode}`,
        ]);

        const orderedItems = items.map((item) => [
            orderId,
            item.quantity,
            item.id,
        ]);

        const valueSet = orderedItems
            .map(
                (_, index) =>
                    `($${index * 3 + 1}, $${index * 3 + 2}, $${index * 3 + 3})`
            )
            .join(",");

        const insertItemsStatement = `INSERT INTO ordered_item(order_id, quantity, dish_id) values ${valueSet}`;

        await db.query(insertItemsStatement, orderedItems.flat());

        await db.query("COMMIT");
        res.status(201).json({ msg: "Order added" });
    } catch (err) {
        await db.query("ABORT");
        next(err);
    }
};

module.exports = { getOrdersOfUser, rateOrder, addNewOrder };
