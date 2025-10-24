const jwt = require("jsonwebtoken");

const GenerateToken = (user) => {
    const payload = {
        user: {
            id: user?._id,
            role: user?.role
        }
    }
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1d" });
    return token;
}

module.exports = GenerateToken;