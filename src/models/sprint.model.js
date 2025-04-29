const mongoose = require("mongoose");

const sprintSchema = new mongoose.Schema({
  nombreSprint: {
    type: String,
    required: true,
  },
  fechaInicio: {
    type: String,
    required: true,
  },
  fechaFin: {
    type: String,
    required: true,
  },
  listaTareas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tarea",
      default: [],
    },
  ],
  color: {
    type: String,
  },
});

module.exports = mongoose.model("Sprint", sprintSchema);
