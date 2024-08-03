import dotenv from 'dotenv';
dotenv.config();

export function authentication(req, res, next){
    //todo - autenticação de TODAS as requisições feitas.
    // se for informado o baerer token, validar, caso contrario, retornar erro
    next();
}


