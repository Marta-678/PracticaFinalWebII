import express from 'express';
import {
  validatorCreateDeliveryNote,
  validatorGetDeliveryNote
} from '../middlewares/handleValidator.js';
import {
  createDeliveryNoteCtrl,
  getDeliveryNotesCtrl,
  getDeliveryNoteCtrl,
  deleteDeliveryNoteCtrl,
  signDeliveryNoteCtrl
} from '../controllers/deliveryNotes.js';

const router = express.Router();

// Crear nuevo albarán
router.post(
  '/',
  validatorCreateDeliveryNote,
  createDeliveryNoteCtrl
);

// Obtener todos los albaranes
router.get(
  '/',
  getDeliveryNoteCtrl
);

// Obtener albarán por ID
router.get(
  '/:id',
  validatorGetDeliveryNote,
  getDeliveryNoteCtrl
);

// Borrar albarán (solo si no está firmado)
router.delete(
  '/:id',
  validatorGetDeliveryNote,
  deleteDeliveryNoteCtrl
);

// Firmar albarán: genera PDF, sube a IPFS y guarda firma
router.post(
  '/sign/:id',
  validatorGetDeliveryNote,
  signDeliveryNoteCtrl
);

export default router;
