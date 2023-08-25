import express from 'express';
import SugerenciasService from '../services/sugerenciasService.js'

const router = express.Router();
const sugerenciasService = new SugerenciasService();


router.get('/', async (req, res) => {
    const sugerencias = await sugerenciasService.getAll(req.query);
    let ok = false;
    if (sugerencias) {
        ok = true;
    }
    res.json({ok, sugerencias});
})

router.post('/', async (req, res) => {
    const sugerencia = await sugerenciasService.create(req);
    let ok = false;
    if (sugerencia) {
        ok = true;
    }
    res.json({ok, sugerencia}, 201);
})

router.delete('/:id', async (req, res) => {
    let ok = false;
    const id = +req.params?.id;
    if (!id) {
        return res.json({ ok: false, message: "Debe ingresar un id" });
    }
    const sugerencia = await sugerenciasService.getOne(id);
    if (!sugerencia) {
        return res.json({ ok: false, message: "la sugerencia indicada no existe" });        
    }

    try {
        const sugerencia = await sugerenciasService.delete(id);
        if (sugerencia) {
            ok = true;
        }
        res.json({ok, message: 'sugerencia eliminada', sugerencia});
    } catch (error) {
        res.json({ok, message: error.message})
    }   
})


export default router;