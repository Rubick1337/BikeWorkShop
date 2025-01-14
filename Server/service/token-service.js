const jwt = require("jsonwebtoken");
const { RefreshToken } = require("../Models/models"); // Проверьте путь

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '10d' });
        return { accessToken, refreshToken };
    }

    validateAccessToken(accessToken) {
        try {
            return jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        } catch (err) {
            return null;
        }
    }

    validateRefreshToken(refreshToken) {
        try {
            return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        } catch (err) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        try {
            console.log("Saving token for userId:", userId);
            const tokenData = await RefreshToken.findOne({ id_user: userId });
            if (tokenData) {
                console.log("Updating existing token");
                tokenData.refresh_token = refreshToken;
                await tokenData.save();
            } else {
                console.log("Creating new token");
                console.log(userId);
                const newTokenData = new RefreshToken({ id_user: userId, refresh_token: refreshToken });
                await newTokenData.save();
            }
        } catch (error) {
            console.error("Error saving token:", error);
        }
    }

    async removeToken(refreshToken) {
        return await RefreshToken.findOneAndDelete({ refresh_token: refreshToken });
    }

    async findToken(refreshToken) {
        return await RefreshToken.findOne({ refresh_token: refreshToken });
    }
}

module.exports = new TokenService();