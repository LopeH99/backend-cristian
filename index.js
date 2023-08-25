import express from 'express';
import bodyParser from 'body-parser';

import authRoutes from './routes/auth.js'
import eventosRoutes from './routes/eventos.js'
import horariosRoutes from './routes/horarios.js'
import licenciasRoutes from './routes/licencias.js'
import menusRoutes from './routes/menus.js'
import sugerenciasRoutes from './routes/sugerencias.js'
import usuariosRoutes from './routes/usuarios.js'
import authMiddleware from './middlewares/authMiddleware.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/eventos',authMiddleware, eventosRoutes);
app.use('/horarios',authMiddleware, horariosRoutes);
app.use('/licencias',authMiddleware, licenciasRoutes);
app.use('/menus',authMiddleware, menusRoutes);
app.use('/sugerencias',authMiddleware, sugerenciasRoutes);
app.use('/usuarios',authMiddleware, usuariosRoutes);

// Define routes and middleware here
app.get('/', (req,res) =>  {
    console.log("hola")
    return res.json({message: "API Tesis"})});

app.listen(PORT, () => {
  console.log(`Server corriendo en puerto ${PORT}`);
});

