import { UserService } from '../../application/services/UserService.js';
import { UserRepository } from '../../domain/repositories/UserRepositories.js';
import { config, db } from '../../infraestructure/persistence/Connection.js';

class AuthController{
    constructor(){
        this.AuthRepository = new UserRepository(db, config);
        this.AuthService = new UserService(this.AuthRepository);
    }

    authenticationUserOnlyBearerToken = async (bearer_token) =>{
        if(!!bearer_token){
            let returnBoolToken;
            try{
                let userDTO = await this.AuthService.getUserByTokenUseCase({bearer_token: bearer_token});  
                returnBoolToken = userDTO.id; 
            }catch(e){
                returnBoolToken = false;
            }
            return returnBoolToken;
        }else{
            return false;
        } 
    }

    authenticationUserOnlyEmailPassword = async(email, password) => {
        if(!!email && !!password){
            let returnBoolEmailPassword;
            try{
                let userDTO = await this.AuthService.validateEmailPassword(email, password);   
                returnBoolEmailPassword = userDTO.id;
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