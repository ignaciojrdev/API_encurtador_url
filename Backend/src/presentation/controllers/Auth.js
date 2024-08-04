import { UserService } from '../../application/services/UserService.js';
import { UserRepository } from '../../domain/repositories/UserRepositories.js';
import { config, db } from '../../infraestructure/persistence/Connection.js';

class AuthController{
    constructor(){
        this.AuthRepository = new UserRepository(db, config);
        this.AuthService = new UserService(this.AuthRepository);
    }

    validateAccessUser = async (bearer_token = null, email = null, password = null, id = null) => {
        if (!bearer_token && (!email || !password) && !id){
            return false;
        }

        let returnBoolToken = false;
        let returnBoolEmailPassword = false;
        if(!!bearer_token){
            try{
                await this.AuthService.getUserByTokenUseCase({bearer_token: bearer_token, id: id});  
                returnBoolToken = true; 
                return returnBoolToken;
            }catch(e){
                returnBoolToken = false;
            }
        }   
        if(!!email && !!password){
            try{
                await this.AuthService.validateEmailPassword(email, password, id);   
                returnBoolEmailPassword = true;
                return returnBoolEmailPassword;
            }catch(e){
                returnBoolEmailPassword = false;
            }
        }
        return returnBoolToken && returnBoolEmailPassword;
    }

}
export { 
    AuthController
}