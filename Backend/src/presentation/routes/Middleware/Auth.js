import dotenv from 'dotenv';
dotenv.config();
import { AuthController } from '../../controllers/Auth.js';

export async function authenticationUser(req, res, next){
    const { bearer_token } = req.headers;
    const { email, password } = req.body;
    const { id } = req.params;
    let isValid = false;

    if(!bearer_token && ( !email || !password )){
        return res.status(401).json({message: 'Invalid access. Please, send bearer token or email and password to authenticate.'})
    }
    if(!id){
        return res.status(401).json({message: 'Invalid access. Please, send id user to authenticate.'})
    }
    isValid = await new AuthController().authenticationUserOnlyBearerToken(bearer_token, id);
    if(req.method != 'POST' && !isValid){
        isValid = await new AuthController().authenticationUserOnlyEmailPassword(email, password, id);
    }
    if(!isValid){
        return res.status(401).json({message: 'Invalid access, check your credentials. Choose a method to authenticate and try again: 1 - Token or 2 - E-mail and Password.'});
    }
    req.body.accessValidate = true;
    next();
}


