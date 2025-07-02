import { check, param } from 'express-validator';
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

// Validaciones para Client
export const validatorCreateClient = [
  check('name').exists().notEmpty().isLength({ min: 2 }),
  check('contact.email').exists().notEmpty().isEmail(),
  check('contact.phone').optional().isMobilePhone('es-ES'),
  check('address.street').optional().isLength({ min: 2 }),
  check('address.number').optional().isNumeric(),
  check('address.postal').optional().isNumeric(),
  check('address.city').optional().isLength({ min: 2 }),
  check('address.province').optional().isLength({ min: 2 }),
  (req, res, next) => validateResults(req, res, next)
];

export const validatorUpdateClient = [
  param('id').isMongoId(),
  ...validatorCreateClient,
  (req, res, next) => validateResults(req, res, next)
];

export const validatorGetClient = [
  param('id').isMongoId(),
  (req, res, next) => validateResults(req, res, next)
];

// Validaciones para Project
export const validatorCreateProject = [
  check('name').exists().notEmpty().isLength({ min: 2 }),
  check('client').exists().notEmpty().isMongoId(),
  check('description').optional().isString(),
  check('startDate').optional().isISO8601(),
  check('endDate').optional().isISO8601(),
  (req, res, next) => validateResults(req, res, next)
];

export const validatorUpdateProject = [
  param('id').isMongoId(),
  ...validatorCreateProject,
  (req, res, next) => validateResults(req, res, next)
];

export const validatorGetProject = [
  param('id').isMongoId(),
  (req, res, next) => validateResults(req, res, next)
];

// Validaciones para DeliveryNote
export const validatorCreateDeliveryNote = [
  check('date').exists().notEmpty().isISO8601(),
  check('client').exists().notEmpty().isMongoId(),
  check('project').exists().notEmpty().isMongoId(),
  check('entries').isArray({ min: 1 }),
  check('entries.*.type').isIn(['hours', 'material']),
  check('entries.*.description').isString(),
  check('entries.*.qty').isNumeric(),
  check('entries.*.rate').isNumeric(),
  (req, res, next) => validateResults(req, res, next)
];

export const validatorGetDeliveryNote = [
  param('id').isMongoId(),
  (req, res, next) => validateResults(req, res, next)
];
