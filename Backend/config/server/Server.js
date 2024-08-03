import { app } from '../../src/presentation/routes/Routes/Routes.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT_SERVER = process.env.PORT_SERVER || 3000;

app.listen(PORT_SERVER, () =>{
    console.log(`Server on port ${PORT_SERVER}`);
});