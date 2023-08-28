import express from "express";
import EventosService from "../services/eventosService.js";
import { FileService } from "../services/fileService.js";

const router = express.Router();
const eventoService = new EventosService();
const fileService = new FileService();

//get all with filters
router.get("/", async (req, res) => {
 
  let entidad = "eventos";
  if (req.query) {
    if (req.query?.novedad !== undefined) {
      const esNovedad = req.query?.novedad;
      if (esNovedad !== "false") {
        entidad = "novedades";
      }
    }

    if (req.query?.incidencia !== undefined) {
      const esincidencia = req.query?.incidencia;
      if (esincidencia !== "false") {
        entidad = "incidencias";
      }
    }
  }

  const resultado = await eventoService.getAll(req.query);
  let ok = false;
  if (resultado) {
    ok = true;
  }
  res.json({ ok, [entidad]: resultado });
});

//create
router.post("/", fileService.validateUpload(), async (req, res) => {
  const uploadedFilePaths = fileService.getUploadedFilePaths();

  let entidad = "eventos";
  if (req.query) {
    if (req.query?.novedad !== undefined) {
      const esNovedad = req.query?.novedad;
      if (esNovedad !== "false") {
        entidad = "novedades";
      }
    }

    if (req.query?.incidencia !== undefined) {
      const esincidencia = req.query?.incidencia;
      if (esincidencia !== "false") {
        entidad = "incidencias";
      }
    }
  }
  const imagen = uploadedFilePaths.filter(
    (filepath) =>
      filepath.includes(".jpg") ||
      filepath.includes(".png") ||
      filepath.includes(".jpeg")
  );

  const archivo = uploadedFilePaths.filter(
    (filepath) =>
      filepath.includes(".pdf") ||
      filepath.includes(".xlsx") ||
      filepath.includes(".doc")
  );
  console.log(uploadedFilePaths);

  req.body.imagen = imagen.shift();
  req.body.archivo = archivo.shift();

  const resultado = await eventoService.create(req.body);
  let ok = false;
  if (resultado) {
    ok = true;
  }
  res.json({ ok, [entidad]: resultado });
});

router.delete("/:id", async (req, res) => {
  const id = +req.params?.id;
  if (!id) {
    return res.json({ ok: false, message: "Debe ingresar un id" });
  }
  let ok = false;
  const evento = await eventoService.getOne(id);
  if (!evento) {
    return res.json({ ok: false, message: "El evento indicado no existe" });
  }
  const deleted = await eventoService.delete(id)
  //eliminar imagenes y archivos
  if (evento.imagen) {
    fileService.deleteFile(evento.imagen);
  }
  if (evento.archivo) {
    fileService.deleteFile(evento.archivo);
  }


  if (deleted) {
    res.json({ ok: true, message: "Evento eliminado" });
  } else {
    res.status(500).json({ ok: false, message: "Error eliminando evento" });
  }
});

router.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;
  fileService.downloadFile(res, filename);
});

//update evento
router.put("/:id", fileService.validateUpload(), async (req, res) => {
  if (!req.params?.id) {
    return res.json({ ok: false, message: "Debe ingresar un id" });
  }
  const id = +req.params?.id;
  let ok = false;
  try {
    const uploadedFilePaths = fileService.getUploadedFilePaths();
    const evento = await eventoService.getOne(id);

    if (!evento) {
      return res.json({ ok: false, message: "No existe el evento indicado" });
    }

    let entidad = "eventos";
    if (req.query) {
      if (req.query?.novedad !== undefined) {
        const esNovedad = req.query?.novedad;
        if (esNovedad !== "false") {
          entidad = "novedades";
        }
      }

      if (req.query?.incidencia !== undefined) {
        const esincidencia = req.query?.incidencia;
        if (esincidencia !== "false") {
          entidad = "incidencias";
        }
      }
    }
    const imagen = uploadedFilePaths.filter(
      (filepath) =>
        filepath.includes(".jpg") ||
        filepath.includes(".png") ||
        filepath.includes(".jpeg")
    );

    const archivo = uploadedFilePaths.filter(
      (filepath) =>
        filepath.includes(".pdf") ||
        filepath.includes(".xlsx") ||
        filepath.includes(".doc")
    );

    if (imagen.length) {
      req.body.imagen = imagen.shift();
    }

    if (archivo.length) {
      req.body.archivo = archivo.shift();
    }

    if (req.body.imagen && evento.imagen) {
      fileService.deleteFile(evento.imagen);
    }

    if (req.body.archivo && evento.archivo) {
      fileService.deleteFile(evento.archivo);
    }

    const resultado = await eventoService.update(id, req.body);
    if (resultado) {
      ok = true;
    }
    return res.json({ ok, [entidad]: resultado });
  } catch (error) {
    return res.json({ ok, message: error.message });
  }
});

export default router;
