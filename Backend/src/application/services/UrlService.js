import { UrlUseCases } from '../../domain/usecases/Url/UrlUseCases.js';
import { UserUseCases } from '../../domain/usecases/User/UserUseCases.js';
import { UserRepository } from '../../domain/repositories/UserRepositories.js';
import { UrlRepository } from '../../domain/repositories/UrlRepositories.js';

class UrlService{
    constructor(urlrepository, userRepository){
        this.UrlRepository = urlrepository;
        this.UserRepository = userRepository;
        this.UrlUseCases = new UrlUseCases(this.UrlRepository);
        this.UserUseCases = new UserUseCases(this.UserRepository);
    }

    save_short_url = async(urlDTO) => {
        let short_url = this.UrlUseCases.createShortUrlUseCase();
        let id_short_url = this.UrlUseCases.createIdShortUrlUseCase();
        urlDTO.updated = this.UserUseCases.getCurretDate();
        [ urlDTO.short_url, urlDTO.id ] = await Promise.all([short_url, id_short_url]);
        urlDTO.short_url = this.UrlUseCases.createShortUrlFormat(urlDTO.short_url);
        if(!!urlDTO.user_id){
            await this.UserUseCases.getUserByIdUseCase({id: urlDTO.user_id});
        }
        await this.UrlUseCases.saveShortUrlUseCase(urlDTO);
        return urlDTO;
    }

    get_short_url = async(urlDTO) => {
        urlDTO.short_url = this.UrlUseCases.createShortUrlFormat(urlDTO.short_url);
        let new_urlDTO = await this.UrlUseCases.getShortUrlUseCase(urlDTO);
        await this.UrlUseCases.increments_access_counter(new_urlDTO);
        return new_urlDTO;
    }

    get_short_url_list = async(urlDTO) => {
        return await this.UrlUseCases.get_short_url_list(urlDTO);
    }

    delete_short_url = async(urlDTO) => {
        urlDTO.short_url = this.UrlUseCases.createShortUrlFormat(urlDTO.short_url);
        return await this.UrlUseCases.delete_short_url(urlDTO);
    }

    update_short_url = async(urlDTO) => {
        urlDTO.short_url = this.UrlUseCases.createShortUrlFormat(urlDTO.short_url);
        return await this.UrlUseCases.update_short_url(urlDTO);
    }
}

export { 
    UrlService
}