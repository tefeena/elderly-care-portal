const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.log("❌ No Token Found");
            return res.status(401).json({ message: "Access Denied. No Token Provided." });
        }

        const token = authHeader.split(" ")[1];
        console.log("🟢 Received Token:", token);

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;

        console.log("✅ Token Verified:", verified);
        next();
    } catch (error) {
        console.error("❌ Authentication Error:", error.message);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Session Expired. Please log in again." });
        }
        return res.status(400).json({ message: "Invalid Token" });
    }
};

module.exports = authMiddleware;
