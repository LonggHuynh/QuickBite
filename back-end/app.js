const express = require("express");
const app = express();
const orders = require("./routes/Order");
const users = require("./routes/User");
const dishes = require("./routes/Dish");
const restaurants = require("./routes/Restaurant");
const errorHandler = require("./middlewares/errorHandler");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: "50mb" }));

app.use(express.json());

app.use("/orders", orders);
app.use("/users", users);
app.use("/restaurants", restaurants);
app.use("/dishes", dishes);

app.use(errorHandler);

const port = 5000;
const start = async () => {
    try {
        app.listen(port, () => console.log(`Server is running`));
    } catch (err) {
        console.log(err);
    }
};

start();
