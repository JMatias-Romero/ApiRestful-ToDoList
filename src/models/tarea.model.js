const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String
  },
  estado: {
    type: String,
    enum: ['pendiente', 'en progreso', 'completada'],
    default: 'pendiente'
  },
  fechaLimite: {
    type: String,
    required: true
  },
  color: {
    type: String
  }
});

module.exports = mongoose.model('Tarea', tareaSchema);
