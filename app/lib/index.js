const getOsEnv = (key) => {
    return process.env[key];
};

module.exports = {
    getOsEnv,
};
