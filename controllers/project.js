import ProjectModel from '../models/project.js';
import { handleHttpError } from '../utils/handleError.js';

// Crear nuevo proyecto
export const createProjectCtrl = async (req, res) => {
  try {
    const { name, description, client, startDate, endDate } = req.body;
    const owner = req.user._id;

    // Verificar duplicado
    const existing = await ProjectModel.findOne({ name, company: owner });
    if (existing) {
      return handleHttpError(res, 'PROJECT_ALREADY_EXISTS', 400);
    }

    const project = await ProjectModel.create({
      name,
      description,
      client,
      startDate,
      endDate,
      company: owner
    });
    res.status(201).json({ message: 'Proyecto creado correctamente', project });
  } catch (error) {
    console.error('Error en createProjectCtrl:', error);
    handleHttpError(res, 'ERROR_CREATE_PROJECT');
  }
};

// Obtener todos los proyectos
export const getProjectsCtrl = async (req, res) => {
  try {
    const owner = req.user._id;
    const projects = await ProjectModel.find({ company: owner }).populate('client');
    res.json({ projects });
  } catch (error) {
    console.error('Error en getProjectsCtrl:', error);
    handleHttpError(res, 'ERROR_GET_PROJECTS');
  }
};

// Obtener proyecto por ID
export const getProjectCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = req.user._id;

    const project = await ProjectModel.findOne({ _id: id, company: owner }).populate('client');
    if (!project) {
      return handleHttpError(res, 'PROJECT_NOT_FOUND', 404);
    }
    res.json({ project });
  } catch (error) {
    console.error('Error en getProjectCtrl:', error);
    handleHttpError(res, 'ERROR_GET_PROJECT');
  }
};

// Actualizar proyecto
export const updateProjectCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, client, startDate, endDate } = req.body;
    const owner = req.user._id;

    // Verificar duplicado
    const duplicate = await ProjectModel.findOne({ name, company: owner, _id: { $ne: id } });
    if (duplicate) {
      return handleHttpError(res, 'PROJECT_ALREADY_EXISTS', 400);
    }

    const project = await ProjectModel.findOneAndUpdate(
      { _id: id, company: owner },
      { name, description, client, startDate, endDate },
      { new: true }
    ).populate('client');
    if (!project) {
      return handleHttpError(res, 'PROJECT_NOT_FOUND', 404);
    }
    res.json({ message: 'Proyecto actualizado correctamente', project });
  } catch (error) {
    console.error('Error en updateProjectCtrl:', error);
    handleHttpError(res, 'ERROR_UPDATE_PROJECT');
  }
};

// Archivar (soft delete) proyecto
export const deleteProjectCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = req.user._id;

    const project = await ProjectModel.delete({ _id: id, company: owner });
    if (!project) {
      return handleHttpError(res, 'PROJECT_NOT_FOUND', 404);
    }
    res.json({ message: 'Proyecto archivado correctamente' });
  } catch (error) {
    console.error('Error en deleteProjectCtrl:', error);
    handleHttpError(res, 'ERROR_DELETE_PROJECT');
  }
};

// Restaurar proyecto archivado
export const restoreProjectCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = req.user._id;

    const restored = await ProjectModel.restore({ _id: id, company: owner });
    if (!restored) {
      return handleHttpError(res, 'PROJECT_NOT_FOUND', 404);
    }
    res.json({ message: 'Proyecto restaurado correctamente' });
  } catch (error) {
    console.error('Error en restoreProjectCtrl:', error);
    handleHttpError(res, 'ERROR_RESTORE_PROJECT');
  }
};

// Borrado definitivo de proyecto
export const hardDeleteProjectCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = req.user._id;

    const result = await ProjectModel.deleteOne({ _id: id, company: owner });
    if (result.deletedCount === 0) {
      return handleHttpError(res, 'PROJECT_NOT_FOUND', 404);
    }
    res.json({ message: 'Proyecto eliminado definitivamente' });
  } catch (error) {
    console.error('Error en hardDeleteProjectCtrl:', error);
    handleHttpError(res, 'ERROR_HARD_DELETE_PROJECT');
  }
};
