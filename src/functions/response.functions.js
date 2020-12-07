module.exports = (res, status, result, error) =>{
    return res.status(status).json({
        error,
        result
    });
}