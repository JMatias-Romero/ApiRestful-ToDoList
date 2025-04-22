const Sprint = require('../models/sprint.model');

const { body } = require('express-validator');

//valida campos

const validarCamposTarea = [
  body('titulo').notEmpty().withMessage('El campo Titulo es obligatorio'),
  body('fechaLimite').notEmpty().withMessage('El campo fechaLimite es obligatorio')
];

// valida las opciones de estado de la tarea
const estadosValidos = ['pendiente', 'en progreso', 'completada'];

const validarEstadoTarea = body('estado').custom((value, { req }) => {
  if (value === '') {
    throw new Error('El estado no puede estar vacío');
  }
  if (value && !estadosValidos.includes(value)) {
    throw new Error(`El estado debe ser : ${estadosValidos.join(', ')}`);
  }
  return true;
});

const verificarTareaNoAsignadaASprint = async (req, res, next) => {
  const tarea = res.tarea;

  try {
    const sprintAsignado = await Sprint.findOne({ listaTareas: tarea._id });

    if (sprintAsignado) {
      return res
        .status(400)
        .json({ message: 'No se puede eliminar la tarea, fue asignada a un sprint' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  validarEstadoTarea,
  validarCamposTarea,
  verificarTareaNoAsignadaASprint
};
