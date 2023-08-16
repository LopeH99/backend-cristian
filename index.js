import express from 'express';
import bodyParser from 'body-parser';

import usuarioRoutes from './routes/usuario.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/auth', usuarioRoutes);

// Define routes and middleware here
app.get('/', (req,res) =>  {
    console.log("hola")
    return res.json({message: "API Tesis"})});

app.listen(PORT, () => {
  console.log(`Server corriendo en puerto ${PORT}`);
});

