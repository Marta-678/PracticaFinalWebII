const handleHttpError = (res, message, code = 403) => {
    res.status(code).send(message);
};

const handleEmailExistError = (res, message, code = 409) => {
    res.status(code).send(message);
};

module.exports = { handleHttpError, handleEmailExistError };