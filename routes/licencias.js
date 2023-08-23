import express from 'express';
import LicenciasService from '../services/licenciasService.js'

const router = express.Router();
const licenciasService = new LicenciasService();


router.get('/', async (req, res) => {
    const licencias = licenciasService.getAll();
    let ok = false;
    if (licencias) {
        ok = true;
    }
    res.json({ok, licencias});
})


export default router;