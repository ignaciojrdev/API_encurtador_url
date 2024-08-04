import dotenv from 'dotenv';
dotenv.config();
import { AuthController } from '../../controllers/Auth.js';

export async function authenticationUser(req, res, next){
    const { bearer_token } = req.headers;
    const { email, password } = req.body;
    const { id } = req.params;

    if(!bearer_token && ( !email || !password )){
        return res.status(401).json({message: 'Invalid access. Please, send bearer token or email and password to authenticate.'})
    }
    if(!id){
        return res.status(401).json({message: 'Invalid access. Please, send id user to authenticate.'})
    }

    let isValid = await new AuthController().validateAccessUser(bearer_token, email, password, id);
    if(!isValid){
        return res.status(401).json({message: 'Invalid access. Token/E-mail/Password are wrong.'})
    }
    req.body.accessValidate = true;
    next();
}


