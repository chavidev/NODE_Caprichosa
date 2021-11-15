const jwt = require("jsonwebtoken");
const { env: { JWT_SECRET } } = process;

let checkToken = async (req, res, next) => {
    try {
        let token = req.headers["x-access-token"] || req.headers["authorization"];

        if (token && token.startsWith("Bearer")) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not provided"
            });
        }

        const decoded = await jwt.verify(token, JWT_SECRET);

        console.log(decoded);

        req.user = decoded;
        next();

    }
    catch (err) {
        console.log(err);
        return res.status(401).json({
            success: false,
            message: err.message || err._message
        });
    }
};

module.exports = { checkToken };

//const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "30s" });