const Tarea = require('../models/tarea.model');

//trae todas las tareas
const getTareas = async (req, res) => {
  try {
    const { estado } = req.query;

    const filtro = {};
    if (estado) {
      filtro.estado = estado;
    }
    const tareas = await Tarea.find(filtro).sort({ fechaLimite: 1 });

    if (tareas.length === 0) {
      return res.status(204).json([]);
    }
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//trae una tarea por id
const getTareaByID = async (req, res) => {
  res.json(res.tarea);
};

// crear una tarea
const crearTarea = async (req, res) => {
  try {
    const { titulo, descripcion, estado, fechaLimite, color } = req.body;
    const tarea = new Tarea({ titulo, descripcion, estado, fechaLimite, color });
    const nuevaTarea = await tarea.save();

    res.status(201).json(nuevaTarea);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//edita una tarea
const editarTarea = async (req, res) => {
  try {
    const tarea = res.tarea;

    tarea.titulo = req.body.titulo || tarea.titulo;
    tarea.descripcion = req.body.descripcion || tarea.descripcion;
    tarea.estado = req.body.estado || tarea.estado;
    tarea.fechaLimite = req.body.fechaLimite || tarea.fechaLimite;
    tarea.color = req.body.color || tarea.color;

    const updateTarea = await tarea.save();
    res.json(updateTarea);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//elimina tarea
const eliminarTarea = async (req, res) => {
  const tarea = res.tarea;
  try {
    await tarea.deleteOne();
    res.status(200).json({ message: `la tarea '${tarea.titulo}' se eliminó correctamente` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  crearTarea,
  getTareas,
  getTareaByID,
  editarTarea,
  eliminarTarea
};
