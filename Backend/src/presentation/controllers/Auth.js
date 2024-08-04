import { UserService } from '../../application/services/UserService.js';
import { UserRepository } from '../../domain/repositories/UserRepositories.js';
import { config, db } from '../../infraestructure/persistence/Connection.js';

class AuthController{
    constructor(){
        this.AuthRepository = new UserRepository(db, config);
        this.AuthService = new UserService(this.AuthRepository);
    }

    authenticationUserOnlyBearerToken = async (bearer_token, id) =>{
        if(!!bearer_token && !!id){
            let returnBoolToken;
            try{
                await this.AuthService.getUserByTokenUseCase({bearer_token: bearer_token, id: id});  
                returnBoolToken = true; 
            }catch(e){
                returnBoolToken = false;
            }
            return returnBoolToken;
        }else{
            return false;
        } 
    }

    authenticationUserOnlyEmailPassword = async(email, password, id) => {
        if(!!email && !!password && !!id){
            let returnBoolEmailPassword;
            try{
                await this.AuthService.validateEmailPassword(email, password, id);   
                returnBoolEmailPassword = true;
            }catch(e){
                returnBoolEmailPassword = false;
            }
            return returnBoolEmailPassword;
        }else{
            return false;
        }
    }
}
export { 
    AuthController
}