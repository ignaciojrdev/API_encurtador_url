import { UrlService } from '../../application/services/UrlService.js';
import { UrlRepository } from '../../domain/repositories/UrlRepositories.js';
import { UrlDTO } from '../../application/dtos/UrlDTO.js';
import { UserDTO } from '../../application/dtos/UserDTO.js';
import { config, db } from '../../infraestructure/persistence/Connection.js';
class UrlController{
    constructor(){
        this.UrlRepository = new UrlRepository(db, config);
        this.UrlService = new UrlService(this.UrlRepository);
    }

    save_short_url = async(request, response) => {
        let urlDTO = null;
        const { URL, id } = request.body;
        
        if(!URL)
            return response.status(400).json({message: 'Parameter `URL` is required. Please, follow API specification.'});
        try{
            urlDTO = new UrlDTO(null, id ? id : null, URL, null, 0, null, null);
            urlDTO = await this.UrlService.save_short_url(urlDTO); 
        }catch(e){
            let { message } = e;
            return response.status(500).json({ 'message': 'Error shortening URL. ' +  message});
        }

        return response.status(201).json({message: 'Shortener url was created!', shortURL: urlDTO.short_url});
    }

    get_short_url = async(request, response) => {
        let urlDTO = null;
        const { id } = request.body;
        const { short_url } = request.params;
        if(!short_url)
            return response.status(400).json({message: 'Parameter `short_url` is required. Please, follow API specification.'});
        try{
            urlDTO = new UrlDTO(null, id ? id : null, null, short_url, 0, null, null);
            urlDTO = await this.UrlService.get_short_url(urlDTO); 
        }catch(e){
            let { message } = e;
            return response.status(500).json({ 'message': 'Error: ' +  message});
        }
        return response.redirect(urlDTO.origin_url);
    }
}

export { 
    UrlController
}