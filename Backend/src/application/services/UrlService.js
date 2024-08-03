import { UrlUseCases } from '../../domain/usecases/Url/UrlUseCases.js';
import { UserUseCases } from '../../domain/usecases/User/UserUseCases.js';
import { UserRepository } from '../../domain/repositories/UserRepositories.js';
import { UrlRepository } from '../../domain/repositories/UrlRepositories.js';

class UrlService{
    constructor(){
        this.UrlRepository = new UrlRepository();
        this.UserRepository = new UserRepository();
        this.UrlUseCases = new UrlUseCases(this.UrlRepository);
        this.UserUseCases = new UserUseCases(this.UserRepository);
    }

    save_short_url = async(urlDTO, userDTO) => {
        let short_url = this.UrlUseCases.createShortUrlUseCase();
        let id_short_url = this.UrlUseCases.createIdShortUrlUseCase();
        let date_insert = this.UrlUseCases.createDateUrlUseCase();
        [ urlDTO.short_url, urlDTO.id ] = await Promise.all([short_url, id_short_url]);
        if(!!userDTO.token){
            userDTO = await this.UserUseCases.getUserByTokenUseCase(userDTO);
            urlDTO.user_id = userDTO.id;
        }
        this.UrlUseCases.saveShortUrlUseCase(urlDTO);
    }
}

export { 
    UrlService
}