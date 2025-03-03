const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(" ")[1]; // Extract Bearer token correctly
    console.log("🟢 Received Token:", token);

    if (!token) {
        console.log("❌ No Token Found");
        return res.status(401).json({ message: "Access Denied" });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        console.log("✅ Token Verified:", verified);
        next();
    } catch (error) {
        console.error("❌ Invalid Token:", error.message);
        res.status(400).json({ message: "Invalid Token" });
    }
};

module.exports = authMiddleware;
