const express = require('express');
const router = express.Router();

//modelos
const Tarea = require('../models/tarea.model');
const Backlog = require('../models/backlog.model');

//middlewares
const { validarId } = require('../middlewares/validarId');
const { cargarDocumentoPorId } = require('../middlewares/cargarDocumentoPorId ');
const { validarCamposBacklog } = require('../middlewares/backlog.validaciones');
const manejarErroresValidacion = require('../middlewares/manejarErrores');

//controladores
const {
  getBacklogs,
  crearBacklog,
  agregaTareaAlBacklog
} = require('../controllers/backlog.controller');

//get de todos los backlogs, en este caso uno
router.get('/', getBacklogs);

//crea backlog
router.post('/', validarCamposBacklog, manejarErroresValidacion, crearBacklog);

//agrega tarea al backlog
router.put(
  '/:backlogId/add-tarea/:tareaId',
  validarId('backlogId', 'Backlog'),
  validarId('tareaId', 'Tarea'),
  manejarErroresValidacion,
  cargarDocumentoPorId('tareaId', Tarea, 'Tarea'),
  cargarDocumentoPorId('backlogId', Backlog, 'Backlog', { populate: 'listaTareas' }),
  agregaTareaAlBacklog
);

module.exports = router;
