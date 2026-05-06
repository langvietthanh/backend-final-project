const jwt = require("jsonwebtoken");
const User = require("../db/userModel");

const adminLogin = async (request, response) => {
    try {
        const { login_name, password } = request.body;
        if (!login_name) return response.status(400).json({ message: "login_name is required" });
        if (!password) return response.status(400).json({ message: "password is required" });

        const user = await User.findOne({ login_name });
        if (!user) {
            return response.status(400).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return response.status(400).json({ message: "Incorrect password" });
        }

        const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        return response.status(200).json({
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            login_name: user.login_name,
            token
        });
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
};

const adminLogout = async (request, response) => {
    try {
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return response.status(400).json({ message: "User is not logged in" });
        }
        
        const token = authHeader.split(" ")[1];
        try {
            jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            // Token không hợp lệ hoặc đã hết hạn
            return response.status(400).json({ message: "User is not logged in or token is invalid" });
        }

        return response.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
};

module.exports = {
    adminLogin,
    adminLogout
};
