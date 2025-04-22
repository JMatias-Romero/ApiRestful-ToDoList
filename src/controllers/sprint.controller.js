const Sprint = require('../models/sprint.model');

//trae todos los sprints
const getSprints = async (req, res) => {
  try {
    const sprints = await Sprint.find().populate('listaTareas');

    if (sprints.length === 0) {
      return res.status(204).send();
    }

    res.json(sprints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//trae un sprint por ID
const getSprintById = async (req, res) => {
  res.json(res.sprint);
};

//crea un sprint
const crearSprint = async (req, res) => {
  try {
    const { fechaInicio, fechaFin, listaTareas = [], color } = req.body;

    const sprint = new Sprint({ fechaInicio, fechaFin, listaTareas, color });
    const nuevoSprint = await sprint.save();
    res.status(201).json(nuevoSprint);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//agrega tareas al sprint
const agregaTareaAlSprint = async (req, res) => {
  try {
    const sprint = res.sprint;
    const tarea = res.tarea;
    sprint.listaTareas.push(tarea._id);
    await sprint.save();

    res.status(200).json({ message: 'Tarea agregada correctamente al sprint' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//edita un sprint
const editarSprint = async (req, res) => {
  try {
    const sprint = await Sprint.findById(req.params.sprintId);

    sprint.fechaInicio = req.body.fechaInicio || sprint.fechaInicio;
    sprint.fechaFin = req.body.fechaFin || sprint.fechaFin;
    sprint.color = req.body.color || sprint.color;

    if (req.body.listaTareas) {
      sprint.listaTareas = req.body.listaTareas;
    }

    const updateSprint = await sprint.save();
    res.json(updateSprint);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//elimina un sprint
const eliminarSprint = async (req, res) => {
  try {
    const sprint = res.sprint;
    await sprint.deleteOne();
    res.status(200).json({ message: 'El Sprint se eliminó correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSprints,
  getSprintById,
  crearSprint,
  editarSprint,
  eliminarSprint,
  agregaTareaAlSprint
};
