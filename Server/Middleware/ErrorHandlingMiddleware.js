const ApiError = require('../Exception/ApiError');

module.exports = function (err, req, res, next) {
    if(err instanceof ApiError) {
        return res.status(err.status).json({error: err.message});
    }
    return res.status(500).json({error: "Internal Error"});
}