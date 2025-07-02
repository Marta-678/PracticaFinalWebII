import express from 'express';
import {
  validatorCreateProject,
  validatorUpdateProject,
  validatorGetProject
} from '../middlewares/handleValidator.js';
import {
  createProjectCtrl,
  getProjectsCtrl,
  getProjectCtrl,
  updateProjectCtrl,
  deleteProjectCtrl,
  restoreProjectCtrl,
  hardDeleteProjectCtrl
} from '../controllers/projects.js';

const router = express.Router();

// Crear nuevo proyecto
router.post('/', validatorCreateProject, createProjectCtrl);

// Obtener todos los proyectos
router.get('/', getProjectsCtrl);

// Obtener proyecto por ID
router.get('/:id', validatorGetProject, getProjectCtrl);

// Actualizar proyecto
router.put('/:id', validatorUpdateProject, updateProjectCtrl);

// Archivar (soft delete) proyecto
router.delete('/:id', validatorGetProject, deleteProjectCtrl);

// Restaurar proyecto archivado
router.patch('/restore/:id', validatorGetProject, restoreProjectCtrl);

// Borrado definitivo de proyecto
router.delete('/hard/:id', validatorGetProject, hardDeleteProjectCtrl);

export default router;
