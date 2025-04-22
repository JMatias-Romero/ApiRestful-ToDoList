const express = require('express');
const router = express.Router();

//modelos
const Tarea = require('../models/tarea.model');

//middlewares
const { validarId } = require('../middlewares/validarId');
const {
  validarEstadoTarea,
  validarCamposTarea,
  verificarTareaNoAsignadaASprint
} = require('../middlewares/tarea.validaciones');
const { cargarDocumentoPorId } = require('../middlewares/cargarDocumentoPorId ');
const manejarErroresValidacion = require('../middlewares/manejarErrores');

//controladores
const {
  crearTarea,
  getTareas,
  getTareaByID,
  editarTarea,
  eliminarTarea
} = require('../controllers/tarea.controller');

/**
 * @swagger
 * /tareas:
 *   get:
 *     summary: Obtiene todas las tareas (opcional: filtradas por estado)
 *     tags:
 *       - Tareas
 *     parameters:
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *         description: Filtrar por estado de tarea (por ejemplo: pendiente)
 *     responses:
 *       200:
 *         description: Lista de tareas obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       204:
 *         description: No se encontraron tareas
 *       500:
 *         description: Error del servidor
 */

//get de todas las tareas
router.get('/', getTareas);

//get por id
router.get(
  '/:tareaId',
  validarId('tareaId', 'Tarea'),
  manejarErroresValidacion,
  cargarDocumentoPorId('tareaId', Tarea, 'Tarea'),
  getTareaByID
);

//crear tarea
router.post('/', validarCamposTarea, validarEstadoTarea, manejarErroresValidacion, crearTarea);

//editar una tarea
router.put(
  '/:tareaId',
  validarId('tareaId', 'Tarea'),
  manejarErroresValidacion,
  validarCamposTarea,
  validarEstadoTarea,
  manejarErroresValidacion,
  cargarDocumentoPorId('tareaId', Tarea, 'Tarea'),
  editarTarea
);

//eliminar una tarea
router.delete(
  '/:tareaId',
  validarId('tareaId', 'Tarea'),
  manejarErroresValidacion,
  cargarDocumentoPorId('tareaId', Tarea, 'Tarea'),
  verificarTareaNoAsignadaASprint,
  eliminarTarea
);

module.exports = router;
