import { AuthController } from '../../controllers/Auth.js';

export async function authenticationUser(req, res, next){
    const { bearer_token } = req.headers;
    const { email, password } = req.body;
    const { id } = req.params;
    let user_id = false;

    if(!bearer_token && ( !email || !password )){
        return res.status(401).json({message: 'Invalid access. Please, send bearer token or email and password to authenticate.'});
    }
    if(!id){
        return res.status(401).json({message: 'Invalid access. Please, send id user to authenticate.'});
    }
    user_id = await new AuthController().authenticationUserOnlyBearerToken(bearer_token);
    if(req.method != 'POST' && !user_id){
        user_id = await new AuthController().authenticationUserOnlyEmailPassword(email, password);
    }

    if(!user_id || (user_id != id)){
        return res.status(401).json({message: 'Invalid access, wrong credentials. Choose a method to authenticate and try again: 1 - Token or 2 - E-mail and Password.'});
    }
    req.body.accessValidate = true;
    return next();
}

export async function authenticationUrl(req, res, next){
    const { bearer_token } = req.headers;
    const { email, password } = req.body;
    let user_id = false;

    if((!bearer_token && ( !email || !password ))){
        req.body.accessValidate = user_id ? true : false;
        return next();
    }

    user_id = await new AuthController().authenticationUserOnlyBearerToken(bearer_token);
    if(!user_id){
        user_id = await new AuthController().authenticationUserOnlyEmailPassword(email, password);
    }
    req.body.accessValidate = user_id ? user_id : false;
    return next();
}