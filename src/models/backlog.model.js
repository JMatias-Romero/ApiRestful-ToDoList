const mongoose = require('mongoose');

const backlogSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  listaTareas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tarea',
      default: []
    }
  ]
});

module.exports = mongoose.model('Backlog', backlogSchema);
