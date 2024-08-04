import { UrlUseCases } from '../../domain/usecases/Url/UrlUseCases.js';
import { UserUseCases } from '../../domain/usecases/User/UserUseCases.js';
import { UserRepository } from '../../domain/repositories/UserRepositories.js';
import { UrlRepository } from '../../domain/repositories/UrlRepositories.js';

class UrlService{
    constructor(repository){
        this.UrlRepository = repository;
        this.UrlUseCases = new UrlUseCases(this.UrlRepository);
        this.UserUseCases = new UserUseCases(this.UrlRepository);
    }

    save_short_url = async(urlDTO) => {
        let short_url = this.UrlUseCases.createShortUrlUseCase();
        let id_short_url = this.UrlUseCases.createIdShortUrlUseCase();
        urlDTO.updated = this.UserUseCases.getCurretDate();
        [ urlDTO.short_url, urlDTO.id ] = await Promise.all([short_url, id_short_url]);
        urlDTO.short_url = this.UrlUseCases.createShortUrlFormat(urlDTO.short_url);
        if(!!urlDTO.user_id){
            await this.UserUseCases.getUserByIdUseCase(urlDTO);
        }
        await this.UrlUseCases.saveShortUrlUseCase(urlDTO);
        return urlDTO;
    }

    get_short_url = async(urlDTO) => {
        urlDTO.short_url = this.UrlUseCases.createShortUrlFormat(urlDTO.short_url);
        return this.UrlUseCases.getShortUrlUseCase(urlDTO);
    }
}

export { 
    UrlService
}