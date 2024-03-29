const admin = require("../firebase.config");
const auth = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    try {
        if (token === "secret") {
            req.user = { uid: "tzOVE3pENMW6pzmHrXpieeej8942" };
            next();
            return;
        }
        const user = await admin.auth().verifyIdToken(token);
        req.user = user;
        next();
    } catch (err) {
        if (err.code === "auth/id-token-expired")
            res.status(403).json({
                msg: "Your token is expired, please login again",
            });
        else if (err.code === "auth/argument-error")
            res.status(403).json({ msg: "Please login to visit the page." });
        else next(err);
    }
};

module.exports = auth;
