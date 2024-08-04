import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class UserUseCases{
    constructor(repository) {
        this.repository = repository;
    }

    getUserByTokenUseCase = async(userDTO) => {
        let user = await this.repository.getUserByToken(userDTO.bearer_token);
        if(!user || (user.id != userDTO.id)){
            throw new Error('User not found.');
        }
        return user;
    }

    getUserByIdUseCase = async(userDTO) => {
        let user = await this.repository.getUserById(userDTO.id);
        if(!user){
            throw new Error('User not found.');
        }
        return user;
    }

    getUserByEmailUseCase = async(userDTO) => {
        let user = await this.repository.getUserByEmail(userDTO.email);
        if(!user){
            throw new Error('User not found.');
        }
        return user;
    }

    save_userUseCase = async(userDTO) => {
        let userByEmail = await this.repository.getUserByEmail(userDTO.email);
        if(userByEmail != null){
            throw new Error('Already exists a user with this e-mail. Please, change and try again.');
        }
        return await this.repository.save_user(userDTO.id, userDTO.email, userDTO.password, userDTO.bearer_token, userDTO.updated, userDTO.deleted);
    }

    update_userUseCase = async(userDTO) => {
        return await this.repository.update_user(userDTO.id, userDTO.email, userDTO.password, userDTO.bearer_token, userDTO.updated);
    }

    getNextUUID = async () => {
        let nextUUID = null, stop = false;
    
        do{
            nextUUID = null;
            nextUUID = uuidv4();
            let user = await this.repository.getUserById(nextUUID);
            if(user == null){
                stop = true;
            }
        }while (stop == false)
        return nextUUID;
    }

    getCurretDate = () => {
        return format(Date(), 'yyyy-MM-dd HH:mm:ss', { timeZone: "America/Sao_Paulo" } );
    }

    getToken = (UserDTO) => {
        return jwt.sign({ email: UserDTO.email, password: UserDTO.password }, process.env.JWT_SECRET, { algorithm: 'HS256' });
    }

    getHashedPassword = async (password) => {
        return await bcrypt.hash(password, 10);
    }

    validateEmailPassword = async (email, password, id) => {
        let user = null;
        try{
            user =  await this.getUserByEmailUseCase({email: email});
            if(user.id != id){
                throw new Error('Invalid access. The e-mail have a diferent id.');
            }
        }catch(e){
            throw new Error('Invalid access. Incorrect e-mail.');
        }
        let match = await bcrypt.compare(password, user.password);
        if(!match){
            throw new Error('Invalid access. Incorrect password.');
        }
    }    

    delete_userUseCase = async (UserDTO) => {
        return await this.repository.delete_user(UserDTO.id);
    }
}

export { 
    UserUseCases
}