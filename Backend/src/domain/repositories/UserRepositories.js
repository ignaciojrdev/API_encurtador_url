import { UserDTO } from '../../application/dtos/UserDTO.js';
class UserRepository{
    constructor(){}
    getUserByToken = async(token) => {
        return new UserDTO('43534534523423534', 'teste', 'etste2123', token, '12/12/2024'); // criar select a partir do token
    }

}

export { 
    UserRepository
}