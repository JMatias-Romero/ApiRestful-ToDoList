const Sprint = require("../models/sprint.model");

//trae todos los sprints
const getSprints = async (req, res) => {
  try {
    const sprints = await Sprint.find().populate("listaTareas");
    const sprintsConTareas = sprints.map((sprint) => ({
      ...sprint.toObject(),
      tareas: sprint.listaTareas || [],
    }));

    res.status(200).json(sprintsConTareas);
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
    const {
      nombreSprint,
      fechaInicio,
      fechaFin,
      listaTareas = [],
      color,
    } = req.body;

    const fechaInicioLocal = new Date(fechaInicio + "T00:00:00");
    const fechaFinLocal = new Date(fechaFin + "T00:00:00");

    const datos = {
      nombreSprint,
      fechaInicio: fechaInicioLocal,
      fechaFin: fechaFinLocal,
      color,
    };

    //si lista tareas viene vacio, se elimina
    if (Array.isArray(listaTareas) && listaTareas.length > 0) {
      datos.listaTareas = listaTareas; // solo se agrega listaTareas si tiene datos
    }
    const sprint = new Sprint(datos);
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

    res.status(200).json({ message: "Tarea agregada correctamente al sprint" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Elimina tarea del sprint
const eliminarTareaDelSprint = async (req, res) => {
  try {
    const { sprintId, tareaId } = req.params; // Obtenemos el ID del sprint y de la tarea a eliminar
    const sprint = await Sprint.findById(sprintId); // Buscamos el sprint
    if (!sprint) {
      return res.status(404).json({ message: "Sprint no encontrado" });
    }

    // Filtramos la tarea de la lista de tareas del sprint
    sprint.listaTareas = sprint.listaTareas.filter(
      (id) => id.toString() !== tareaId
    );

    await sprint.save(); // Guardamos los cambios
    res
      .status(200)
      .json({ message: "Tarea eliminada correctamente del sprint" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//edita un sprint
const editarSprint = async (req, res) => {
  try {
    const sprint = await Sprint.findById(req.params.sprintId);

    sprint.nombreSprint = req.body.nombreSprint || sprint.nombreSprint;
    sprint.fechaInicio = req.body.fechaInicio
      ? new Date(req.body.fechaInicio + "T00:00:00")
      : sprint.fechaInicio;
    sprint.fechaFin = req.body.fechaFin
      ? new Date(req.body.fechaFin + "T00:00:00")
      : sprint.fechaFin;

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
    res.status(200).json({ message: "El Sprint se eliminó correctamente" });
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
  agregaTareaAlSprint,
  eliminarTareaDelSprint,
};
