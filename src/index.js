const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

require('../swagger')(app);

const rutasTareas = require('./routes/tarea.routes');
const rutasSprints = require('./routes/sprint.routes');
const rutasBacklogs = require('./routes/backlog.routes');

//Middleware para parsear el body
app.use(bodyParser.json());

//conexión a la base de datos
const { MONGO_URL, MONGO_DB_NAME, PORT } = process.env;

mongoose
  .connect(MONGO_URL, { dbName: MONGO_DB_NAME })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.log('Error al conectar a MongoDB', err));

//Routes
app.use('/tareas', rutasTareas);
app.use('/sprints', rutasSprints);
app.use('/backlogs', rutasBacklogs);

//Server
app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en el puerto: http://localhost:${PORT}`);
});
