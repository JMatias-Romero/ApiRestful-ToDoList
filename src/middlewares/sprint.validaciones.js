const { body } = require('express-validator');
const Tarea = require('../models/tarea.model');
const Sprint = require('../models/sprint.model');

const validarCamposSprint = [
  body('fechaInicio').notEmpty().withMessage('El campo fechaInicio es obligatorio'),
  body('fechaFin').notEmpty().withMessage('El campo fechaFin es obligatorio')
];

const validarTareaParaAgregarASprint = async (req, res, next) => {
  const sprint = res.sprint;
  const tarea = res.tarea;

  // Verifica que la tarea no esté ya en el sprint
  const yaExiste = sprint.listaTareas.some((t) => t._id.toString() === tarea._id.toString());
  if (yaExiste) {
    return res.status(400).json({ message: 'La tarea ya está en el sprint' });
  }

  // Verifica si la tarea ya está en otro sprint
  try {
    const tareaYaAsignada = await Sprint.findOne({
      _id: { $ne: sprint._id },
      listaTareas: tarea._id
    });

    if (tareaYaAsignada) {
      return res.status(400).json({ message: 'La tarea ya pertenece a otro sprint' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const validarListaTareasExistentes = async (req, res, next) => {
  const { listaTareas } = req.body;

  if (!listaTareas) return next(); // si no se envió listaTareas, sigue normal

  try {
    const tareasEncontradas = await Tarea.find({ _id: { $in: listaTareas } });
    const todasExisten = tareasEncontradas.length === listaTareas.length;

    if (!todasExisten) {
      return res.status(400).json({ message: 'Una o más tareas no existen en la base de datos' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  validarCamposSprint,
  validarTareaParaAgregarASprint,
  validarListaTareasExistentes
};
