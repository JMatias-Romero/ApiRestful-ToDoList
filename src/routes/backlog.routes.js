const express = require("express");
const router = express.Router();

//modelos
const Tarea = require("../models/tarea.model");
const Backlog = require("../models/backlog.model");

//middlewares
const { validarId } = require("../middlewares/validarId");
const {
  cargarDocumentoPorId,
} = require("../middlewares/cargarDocumentoPorId ");
const { validarCamposBacklog } = require("../middlewares/backlog.validaciones");
const manejarErroresValidacion = require("../middlewares/manejarErrores");

//controladores
const {
  getBacklogs,
  getBacklogByID,
  crearBacklog,
  agregaTareaAlBacklog,
} = require("../controllers/backlog.controller");

//*** Rutas ***
//get de todos los backlogs
router.get("/", getBacklogs);

//get por id
router.get(
  "/:backlogId",
  validarId("backlogId", "Backlog"),
  manejarErroresValidacion,
  cargarDocumentoPorId("backlogId", Backlog, "Backlog"),
  getBacklogByID
);

//crea backlog
router.post("/", validarCamposBacklog, manejarErroresValidacion, crearBacklog);

//agrega tarea al backlog
router.put(
  "/:backlogId/add-tarea/:tareaId",
  validarId("backlogId", "Backlog"),
  validarId("tareaId", "Tarea"),
  manejarErroresValidacion,
  cargarDocumentoPorId("tareaId", Tarea, "Tarea"),
  cargarDocumentoPorId("backlogId", Backlog, "Backlog", {
    populate: "listaTareas",
  }),
  agregaTareaAlBacklog
);

module.exports = router;
