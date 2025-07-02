import ClientModel from '../models/client.js';
import { handleHttpError } from '../utils/handleError.js';

// Crear nuevo cliente
export const createClientCtrl = async (req, res) => {
  try {
    const { name, contact, address } = req.body;
    const owner = req.user._id;

    // Verificar duplicado
    const existing = await ClientModel.findOne({ name, company: owner });
    if (existing) {
      return handleHttpError(res, 'CLIENT_ALREADY_EXISTS', 400);
    }

    const client = await ClientModel.create({ name, contact, address, company: owner });
    res.status(201).json({ message: 'Cliente creado correctamente', client });
  } catch (error) {
    console.error('Error en createClientCtrl:', error);
    handleHttpError(res, 'ERROR_CREATE_CLIENT');
  }
};

// Obtener todos los clientes
export const getClientsCtrl = async (req, res) => {
  try {
    const owner = req.user._1d || req.user._id;
    const clients = await ClientModel.find({ company: owner });
    res.json({ clients });
  } catch (error) {
    console.error('Error en getClientsCtrl:', error);
    handleHttpError(res, 'ERROR_GET_CLIENTS');
  }
};

// Obtener cliente por ID
export const getClientCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = req.user._id;

    const client = await ClientModel.findOne({ _id: id, company: owner });
    if (!client) {
      return handleHttpError(res, 'CLIENT_NOT_FOUND', 404);
    }
    res.json({ client });
  } catch (error) {
    console.error('Error en getClientCtrl:', error);
    handleHttpError(res, 'ERROR_GET_CLIENT');
  }
};

// Actualizar cliente
export const updateClientCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, contact, address } = req.body;
    const owner = req.user._id;

    // Verificar duplicado en otro cliente
    const duplicate = await ClientModel.findOne({ name, company: owner, _id: { $ne: id } });
    if (duplicate) {
      return handleHttpError(res, 'CLIENT_ALREADY_EXISTS', 400);
    }

    const client = await ClientModel.findOneAndUpdate(
      { _id: id, company: owner },
      { name, contact, address },
      { new: true }
    );
    if (!client) {
      return handleHttpError(res, 'CLIENT_NOT_FOUND', 404);
    }
    res.json({ message: 'Cliente actualizado correctamente', client });
  } catch (error) {
    console.error('Error en updateClientCtrl:', error);
    handleHttpError(res, 'ERROR_UPDATE_CLIENT');
  }
};

// Archivar (soft delete) cliente
export const deleteClientCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = req.user._id;

    const client = await ClientModel.delete({ _id: id, company: owner });
    if (!client) {
      return handleHttpError(res, 'CLIENT_NOT_FOUND', 404);
    }
    res.json({ message: 'Cliente archivado correctamente' });
  } catch (error) {
    console.error('Error en deleteClientCtrl:', error);
    handleHttpError(res, 'ERROR_DELETE_CLIENT');
  }
};

// Restaurar cliente archivado
export const restoreClientCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = req.user._id;

    const restored = await ClientModel.restore({ _id: id, company: owner });
    if (!restored) {
      return handleHttpError(res, 'CLIENT_NOT_FOUND', 404);
    }
    res.json({ message: 'Cliente restaurado correctamente' });
  } catch (error) {
    console.error('Error en restoreClientCtrl:', error);
    handleHttpError(res, 'ERROR_RESTORE_CLIENT');
  }
};

// Borrado definitivo de cliente
export const hardDeleteClientCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = req.user._id;

    const result = await ClientModel.deleteOne({ _id: id, company: owner });
    if (result.deletedCount === 0) {
      return handleHttpError(res, 'CLIENT_NOT_FOUND', 404);
    }
    res.json({ message: 'Cliente eliminado definitivamente' });
  } catch (error) {
    console.error('Error en hardDeleteClientCtrl:', error);
    handleHttpError(res, 'ERROR_HARD_DELETE_CLIENT');
  }
};
