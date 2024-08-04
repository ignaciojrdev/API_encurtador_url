import { UserService } from '../../application/services/UserService.js';
import { UserRepository } from '../../domain/repositories/UserRepositories.js';
import { UserDTO } from '../../application/dtos/UserDTO.js';
import { config, db } from '../../infraestructure/persistence/Connection.js';
import validator from 'validator';
class UserController{
    constructor(){
        this.UserRepository = new UserRepository(db, config);
        this.UserService = new UserService(this.UserRepository);
    }

    get_user = async (request, response) => {
        const { id } = request.params;
        if(!id)
            return response.status(400).json({message: 'Parameter `id` is required. Please, follow API specification.'});
        let userDTO = null, userDTOFound = null;
        try{
            userDTO = new UserDTO(id, null, null, null, null, null);
            userDTOFound = await this.UserService.get_user(userDTO);   
        }catch(e){
            let { message } = e;
            return response.status(500).json({ 'message': 'Error: ' +  message});
        }
        return response.status(200).json({message: 'Success: User was found.', user: {'id': userDTOFound.id, 'email': userDTOFound.email, 'bearer_token': userDTOFound.bearer_token, 'last_update': userDTOFound.updated, 'deleted': userDTOFound.deleted ? userDTOFound.deleted : false}});
    }

    save_user = async (request, response) => {
        const { email, password } = request.body;

        if(!email)
            return response.status(400).json({message: 'Parameter `email` is required. Please, follow API specification.'});
        if(!validator.isEmail(email)){
            return response.status(400).json({message: 'E-mail is not valid.'});
        }
        
        if(!password || password.length < 5 || password.length > 20 )
            return response.status(400).json({message: 'Parameter `password` is required and need have between 5-20 characters. Please, follow API specification.'});
        let userDTO = null;
        let userCreated = null
        try{
            userDTO = new UserDTO(null, email, password, null, null, null);
            userCreated = await this.UserService.save_user(userDTO);   
        }catch(e){
            let { message } = e;
            return response.status(500).json({ 'message': 'Error: ' +  message});
        }
        return response.status(201).json({message: 'Success: User was created.', 'id': userCreated.id, 'bearer_token': userCreated.bearer_token});
    }
    
    update_user = async (request, response) => {
        const { email, password } = request.body;
        const { id } = request.params;
        if(!id)
            return response.status(400).json({message: 'Parameter `id` is required. Please, follow API specification.'});
        if(!email || !password)
            return response.status(400).json({message: 'The following parameters are required: email, password. Please, follow API specification.'});
        if(password.length < 5 || password.length > 20 )
            return response.status(400).json({message: 'Parameter `password` is required and need have between 5-20 characters. Please, follow API specification.'});
        let userDTO = null;
        let userUpdated = null;
        try{
            userDTO = new UserDTO(id, email, password, null, null, null);
            userUpdated = await this.UserService.update_user(userDTO);   
        }catch(e){
            let { message } = e;
            return response.status(500).json({ 'message': 'Error: ' +  message});
        }
        return response.status(201).json({message: 'Success: User was updated.', 'id': userUpdated.id, 'bearer_token': userUpdated.bearer_token});
    }

    delete_user = async (request, response) => {
        const { id } = request.params;
        if(!id)
            return response.status(400).json({message: 'Parameter `id` is required. Please, follow API specification.'});
        let userDTO = null;
        try{
            userDTO = new UserDTO(id, null, null, null, null, null);
            await this.UserService.delete_user(userDTO);   
        }catch(e){
            let { message } = e;
            return response.status(500).json({ 'message': 'Error: ' +  message});
        }
        return response.status(201).json({message: 'Success: User was deleted.'});
    }
}
export { 
    UserController
}