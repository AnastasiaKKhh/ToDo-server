require("dotenv").config();

module.exports = {
    accessToken: {
        salt: process.env.SALT_WORD,
        expired: "10m",
        type: "access",
    },
    refreshToken: {
        salt: "secret",
        expired: "30 days",
        type: "refresh",
    }
}