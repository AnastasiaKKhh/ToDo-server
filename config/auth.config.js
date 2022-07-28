module.exports = {
    accessToken: {
        salt: "secret",
        expired: "10min",
        type: "access",
    },
    refreshToken: {
        salt: "secret",
        expired: "30min",
        type: "refresh",
    }
}