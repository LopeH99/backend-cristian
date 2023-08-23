import express from 'express';
import SugerenciasService from '../services/sugerenciasService.js'

const router = express.Router();
const sugerenciasService = new SugerenciasService();


router.get('/', async (req, res) => {
    const sugerencias = sugerenciasService.getAll();
    let ok = false;
    if (sugerencias) {
        ok = true;
    }
    res.json({ok, sugerencias});
})


export default router;