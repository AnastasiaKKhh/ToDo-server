module.exports = {
    accessToken: {
        salt: "secret",
        expired: "10m",
        type: "access",
    },
    refreshToken: {
        salt: "secret",
        expired: "30 days",
        type: "refresh",
    }
}