const {handleHttpError} = require("../utils/handleError");
const {verifyToken } = require("../utils/handleJwt");
const { usersModel } = require("../model/user")
import { check } from 'express-validator';
import { validateResults } from '../utils/handleValidator.js';

// Validaciones para registro de usuario
export const validatorRegister = [
  check('email').exists().notEmpty().isEmail(),
  check('password').exists().notEmpty().isLength({ min: 8, max: 16 }),
  (req, res, next) => validateResults(req, res, next)
];

// Validaciones para código de verificación
export const validatorCode = [
  check('verificationCode').exists().notEmpty().isLength({ min: 6, max: 6 }),
  (req, res, next) => validateResults(req, res, next)
];

// Validaciones para login
export const validatorLogin = [
  check('email').exists().notEmpty().isEmail(),
  check('password').exists().notEmpty().isLength({ min: 8, max: 16 }),
  (req, res, next) => validateResults(req, res, next)
];

// Validaciones para datos personales
export const validatorPersonalData = [
  check('name').exists().notEmpty().isLength({ min: 3, max: 99 }),
  check('lastName').exists().notEmpty().isLength({ min: 3, max: 99 }),
  check('nif').exists().notEmpty(),
  (req, res, next) => validateResults(req, res, next)
];

// Validaciones para datos de compañía
export const validatorCompanyData = [
  check('name').exists().notEmpty().isLength({ min: 3, max: 99 }),
  check('cif').exists().notEmpty(),
  check('street').exists().notEmpty().isLength({ min: 3, max: 99 }),
  check('number').exists().notEmpty().isNumeric(),
  check('postal').exists().notEmpty().isNumeric(),
  check('city').exists().notEmpty().isLength({ min: 3, max: 99 }),
  check('province').exists().notEmpty().isLength({ min: 3, max: 99 }),
  (req, res, next) => validateResults(req, res, next)
];



