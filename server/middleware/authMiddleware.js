const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        // Extract the Authorization header
        const authHeader = req.header("Authorization");

        // Check if the Authorization header is provided and starts with 'Bearer '
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.log("❌ No Token Found");
            return res.status(401).json({ message: "Access Denied. No Token Provided." });
        }

        // Extract the token from the header
        const token = authHeader.split(" ")[1];
        console.log("🟢 Received Token:", token);

        // Verify the token with the JWT secret
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;

        console.log("✅ Token Verified:", verified);
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        // Catch and handle token-related errors
        console.error("❌ Authentication Error:", error.message);

        // Handle specific error for expired token
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Session Expired. Please log in again." });
        }

        // Default error message for any other JWT-related issue
        return res.status(400).json({ message: "Invalid Token", error: error.message });
    }
};

module.exports = authMiddleware;
