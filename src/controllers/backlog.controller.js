const Backlog = require('../models/backlog.model');

//trae todos los backlogs, en este caso uno solo
const getBacklogs = async (req, res) => {
  try {
    const backlogs = await Backlog.find().populate('listaTareas');

    if (backlogs.length === 0) {
      return res.status(204).send();
    }

    res.json(backlogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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

//agrega tareas al backlog
const agregaTareaAlBacklog = async (req, res) => {
  const backlog = res.backlog;
  const tarea = res.tarea;

  try {
    backlog.listaTareas.push(tarea._id);
    await backlog.save();

    res.status(200).json({ message: 'Tarea agregada correctamente al backlog' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBacklogs,
  crearBacklog,
  agregaTareaAlBacklog
};
