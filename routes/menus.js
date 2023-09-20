import express from "express";
import MenusService from "../services/menusService.js";
import { validateMenuCreateOrUpdate } from "../middlewares/validarMenu.js";
import errorHandler from "../lib/errorHandler.js";

const router = express.Router();
const menusService = new MenusService();

router.get("/", async (req, res) => {
  const menus = await menusService.getAll();
  let ok = false;
  if (menus) {
    ok = true;
  }
  res.json({ ok, menus });
});

router.post("/", validateMenuCreateOrUpdate, async (req, res) => {
  try {
    const menu = await menusService.create(req.body);
    let ok = false;
    if (menu) {
      ok = true;
    }
    res.json({ ok, menu });
  } catch (error) {
    const err = await errorHandler(error);
    return res
      .status(500)
      .json({ ok: false, message: "Error en el servidor", error: err });
  }
});

router.put("/:id", validateMenuCreateOrUpdate, async (req, res) => {
  let ok = false;
  const id = +req.params?.id;
  if (!id) {
    return res.json({ ok: false, message: "Debe ingresar un id" });
  }
  const menu = await menusService.getOne(id);
  if (!menu) {
    return res.json({ ok: false, message: "el menu indicada no existe" });
  }

  try {
    const menu = await menusService.update(id, req.body);
    if (menu) {
      ok = true;
    }
    res.json({ ok, menu });
  } catch (error) {
    const err = await errorHandler(error);
    return res
      .status(500)
      .json({ ok: false, message: "Error en el servidor", error: err });
  }
});

export default router;
