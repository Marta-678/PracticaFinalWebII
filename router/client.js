import express from 'express';
import {
  validatorCreateClient,
  validatorUpdateClient,
  validatorGetClient
} from '../middleware/session.js';
import {
  createClientCtrl,
  getClientsCtrl,
  getClientCtrl,
  updateClientCtrl,
  deleteClientCtrl,
  restoreClientCtrl,
  hardDeleteClientCtrl
} from '../controllers/clients.js';

const router = express.Router();

// Crear nuevo cliente
router.post('/', validatorCreateClient, createClientCtrl);

// Obtener todos los clientes
router.get('/', getClientsCtrl);

// Obtener cliente por ID
router.get('/:id', validatorGetClient, getClientCtrl);

// Actualizar cliente
router.put('/:id', validatorUpdateClient, updateClientCtrl);

// Archivar (soft delete) cliente
router.delete('/:id', validatorGetClient, deleteClientCtrl);

// Restaurar cliente archivado
router.patch('/restore/:id', validatorGetClient, restoreClientCtrl);

// Borrado definitivo
router.delete('/hard/:id', validatorGetClient, hardDeleteClientCtrl);

export default router;
