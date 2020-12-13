module.exports = (err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
        return res.status(400).json({
            error:true,
            type: err.type,
            message: err.error.message
        });
    }
    next(err);
};
