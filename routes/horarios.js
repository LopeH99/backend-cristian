import express from 'express';
import HorariosService from '../services/horariosService.js'

const router = express.Router();
const horariosService = new HorariosService();


router.get('/', async (req, res) => {
    const horarios = await horariosService.getAll();
    let ok = false;
    if (horarios) {
        ok = true;
    }
    res.json({ok, horarios});
})

router.post('/', async (req, res) => {
    const horario = await horariosService.create(req.body);
    let ok = false;
    if (horario) {
        ok = true;
    }
    res.json({ok, horario} , 201);
})

//editar
router.put('/:id', async (req, res) => {
    let ok = false;
    const id = +req.params?.id;
    if (!id) {
        return res.json({ ok: false, message: "Debe ingresar un id" });
    }
    const horario = await horariosService.getOne(id);
    if (!horario) {
        return res.json({ ok: false, message: "la horario indicada no existe" });        
    }
    try {
        const horario = await horariosService.update(id, req.body);
        if (horario) {
            ok = true;
        }
        res.json({ok, horario});
    } catch (error) {
        res.json({ok, message: error.message})
    }   
})

//eliminar
router.delete('/:id', async (req, res) => {
    let ok = false;
    const id = +req.params?.id;
    if (!id) {
        return res.json({ ok: false, message: "Debe ingresar un id" });
    }
    const horario = await horariosService.getOne(id);
    if (!horario) {
        return res.json({ ok: false, message: "el horario indicada no existe" });        
    }

    try {
        const horario = await horariosService.delete(id);
        if (horario) {
            ok = true;
        }
        res.json({ok, message: 'horario eliminado', horario});
    } catch (error) {
        res.json({ok, message: error.message})
    }   
})

export default router;