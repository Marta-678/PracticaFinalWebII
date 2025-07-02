const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");
const validatorRegister=[
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({ min: 8, max: 16 }),
    (req, res, next) => validateResults(req, res, next)
];

const validatorCode=[
    check("email").exists().notEmpty().isEmail(),
    check("verificationCode").exists().notEmpty().isLength({ min: 6, max: 6 }),
    (req, res, next) => validateResults(req, res, next)
];

const validatorLogin = [
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({ min: 8, max: 16 }),
    (req, res, next) => validateResults(req, res, next)
];


const validatorPersonalData=[
    check("name").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("lastName").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("nif").exists().notEmpty(),
    (req, res, next) => validateResults(req, res, next)
];

const validatorCompanyData=[
    check("name").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("street").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("cif").exists().notEmpty(),
    check("city").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("Madrid").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("number").exists().notEmpty().isNumeric(),
    check("postal").exists().notEmpty().isNumeric(),
    (req, res, next) => validateResults(req, res, next)
]

module.exports = {validatorRegister, validatorCode, validatorLogin, validatorPersonalData, validatorCompanyData}