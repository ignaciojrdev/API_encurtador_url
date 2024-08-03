import { CreateShortUrlUseCase, SaveShortUrlUseCase, CreateIdShortUrlUseCase, CreateDateUrlUseCase } from '../../domain/usecases/Url/UrlUseCase.js';
import { GetUserByTokenUseCase } from '../../domain/usecases/User/UserUseCases.js';
import { UserRepository } from '../../domain/repositories/UserRepositories.js';
import { UrlRepository } from '../../domain/repositories/UrlRepositories.js';

class UrlService{
    constructor(){
        this.CreateShortUrlUseCase = new CreateShortUrlUseCase( new UrlRepository() );
        this.SaveShortUrlUseCase = new SaveShortUrlUseCase( new UrlRepository() );
        this.GetUserByTokenUseCase = new GetUserByTokenUseCase( new UserRepository() );
        this.CreateIdShortUrlUseCase = new CreateIdShortUrlUseCase();
        this.CreateDateUrlUseCase = new CreateDateUrlUseCase();
    }

    save_short_url = async(urlDTO, userDTO) => {
        let short_url = this.CreateShortUrlUseCase.execute(urlDTO.origin_url);
        let id_short_url = this.CreateIdShortUrlUseCase.execute();
        let date_insert = this.CreateDateUrlUseCase.execute();
        [ urlDTO.short_url, urlDTO.id ] = await Promise.all([short_url, id_short_url]);
        if(!!userDTO.token){
            userDTO = await this.GetUserByTokenUseCase.execute(userDTO);
            urlDTO.user_id = userDTO.id;
        }
        this.SaveShortUrlUseCase.execute(urlDTO);
    }
}

export { 
    UrlService
}