const Backlog = require("../models/backlog.model");

//trae todos los backlogs, en este caso uno solo
const getBacklogs = async (req, res) => {
  try {
    const backlogs = await Backlog.find().populate("listaTareas");

    if (backlogs.length === 0) {
      return res.status(204).send();
    }

    res.json(backlogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//trae un backlog por id
const getBacklogByID = async (req, res) => {
  res.json(res.backlog);
};

//crea un backlog
const crearBacklog = async (req, res) => {
  try {
    const { nombre, listaTareas = [] } = req.body;
    const backlog = new Backlog({ nombre, listaTareas });
    const nuevoBacklog = await backlog.save();
    res.status(201).json(nuevoBacklog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//edita un backlog
const editarBacklog = async (req, res) => {
  try {
    const backlog = await Backlog.findById(req.params.backlogId);

    backlog.nombre = req.body.nombre || backlog.nombre;

    if (req.body.listaTareas) {
      backlog.listaTareas = req.body.listaTareas;
    }

    const updateBacklog = await backlog.save();
    res.json(updateBacklog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//agrega tareas al backlog
const agregaTareaAlBacklog = async (req, res) => {
  const backlog = res.backlog;
  const tarea = res.tarea;

  try {
    backlog.listaTareas.push(tarea._id);
    await backlog.save();

    res
      .status(200)
      .json({ message: "Tarea agregada correctamente al backlog" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//elimina un backlog
const eliminarBacklog = async (req, res) => {
  try {
    const backlog = res.backlog;
    await backlog.deleteOne();
    res.status(200).json({ message: "El backlog se eliminó correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBacklogs,
  getBacklogByID,
  crearBacklog,
  editarBacklog,
  agregaTareaAlBacklog,
  eliminarBacklog,
};
