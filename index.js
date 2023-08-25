import express from 'express';
import bodyParser from 'body-parser';

import authRoutes from './routes/auth.js'
import eventosRoutes from './routes/eventos.js'
import horariosRoutes from './routes/horarios.js'
import licenciasRoutes from './routes/licencias.js'
import menusRoutes from './routes/menus.js'
import sugerenciasRoutes from './routes/sugerencias.js'
import usuariosRoutes from './routes/usuarios.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/eventos', eventosRoutes);
app.use('/horarios', horariosRoutes);
app.use('/licencias', licenciasRoutes);
app.use('/menus', menusRoutes);
app.use('/sugerencias', sugerenciasRoutes);
app.use('/usuarios', usuariosRoutes);

// Define routes and middleware here
app.get('/', (req,res) =>  {
    console.log("hola")
    return res.json({message: "API Tesis"})});

app.listen(PORT, () => {
  console.log(`Server corriendo en puerto ${PORT}`);
});

