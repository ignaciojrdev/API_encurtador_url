import { UserUseCases } from '../../domain/usecases/User/UserUseCases.js';

class UserService{
    constructor(repository){
        this.UserRepository = repository;
        this.UserUseCases = new UserUseCases(this.UserRepository);
    }

    get_user = async (UserDTO) => {
        return await this.UserUseCases.getUserByIdUseCase(UserDTO);
    }

    getUserByTokenUseCase = async (UserDTO) => {
        return await this.UserUseCases.getUserByTokenUseCase(UserDTO);
    }

    save_user = async (UserDTO) => {
        UserDTO.id = await this.UserUseCases.getNextUUID();
        UserDTO.password = await this.UserUseCases.getHashedPassword(UserDTO.password);
        UserDTO.updated = this.UserUseCases.getCurretDate();
        UserDTO.bearer_token = this.UserUseCases.getToken(UserDTO);
        await this.UserUseCases.save_userUseCase(UserDTO);
        return {id: UserDTO.id, bearer_token: UserDTO.bearer_token}
    }
    
    update_user = async (UserDTO) => {
        await this.UserUseCases.getUserByIdUseCase(UserDTO);
        let existsUserWithUpdateemail = false;
        try{
            await this.UserUseCases.getUserByemailUseCase(UserDTO);
            existsUserWithUpdateemail = true;
        }catch(e){
            existsUserWithUpdateemail = false;
        }
        if(existsUserWithUpdateemail)
            throw new Error('Use e-mail already exists. Please, choose another new e-mail.');
        UserDTO.password = await this.UserUseCases.getHashedPassword(UserDTO.password);
        UserDTO.updated = this.UserUseCases.getCurretDate();
        UserDTO.bearer_token = this.UserUseCases.getToken(UserDTO);
        await this.UserUseCases.update_userUseCase(UserDTO);
        return {id: UserDTO.id, bearer_token: UserDTO.bearer_token}
    }

    validateEmailPassword = async (email, password, id) => {
        return await this.UserUseCases.validateEmailPassword(email, password, id);
    }

    delete_user = async (UserDTO) => {
        await this.UserUseCases.delete_userUseCase(UserDTO);
    }
}

export { 
    UserService
}