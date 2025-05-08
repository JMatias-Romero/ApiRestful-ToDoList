const Tarea = require("../models/tarea.model");
const Sprint = require("../models/sprint.model");
const Backlog = require("../models/backlog.model");

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
    const tarea = new Tarea({
      titulo,
      descripcion,
      estado,
      fechaLimite,
      color,
    });
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
    res
      .status(200)
      .json({ message: `la tarea '${tarea.titulo}' se eliminó correctamente` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//obtiene tareas no asignadas a sprint ni a backlog para mostrarse disponibles de agregar a un backlog
const obtenerTareasNoAsignadas = async (req, res) => {
  try {
    //trae todos los sprints y backlogs
    const sprints = await Sprint.find({}, "listaTareas");
    const backlogs = await Backlog.find({}, "listaTareas");

    //extrae todos los id's de tareas asignadas
    const tareasAsignadasASprints = sprints.flatMap((s) =>
      s.listaTareas.map((id) => id.toString())
    );
    const tareasAsignadasABacklogs = backlogs.flatMap((s) =>
      s.listaTareas.map((id) => id.toString())
    );

    const todasLasAsignadas = new Set([
      ...tareasAsignadasASprints,
      ...tareasAsignadasABacklogs,
    ]);

    //busca todas las tareas que no estan asignadas
    const tareasNoAsignadas = await Tarea.find({
      _id: { $nin: Array.from(todasLasAsignadas) },
    });

    res.json(tareasNoAsignadas);
  } catch (error) {
    console.log("Error al obtener tareas no asignadas", error);
    res.status(500).json({ message: "error al obtener tareas no asignadas" });
  }
};

module.exports = {
  crearTarea,
  getTareas,
  getTareaByID,
  editarTarea,
  eliminarTarea,
  obtenerTareasNoAsignadas,
};
