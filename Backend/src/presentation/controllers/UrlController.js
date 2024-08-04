import { UrlService } from '../../application/services/UrlService.js';
import { UrlRepository } from '../../domain/repositories/UrlRepositories.js';
import { UserRepository } from '../../domain/repositories/UserRepositories.js';
import { UrlDTO } from '../../application/dtos/UrlDTO.js';
import { config, db } from '../../infraestructure/persistence/Connection.js';
class UrlController{
    constructor(){
        this.UrlRepository = new UrlRepository(db, config);
        this.UserRepository = new UserRepository(db, config);
        this.UrlService = new UrlService(this.UrlRepository, this.UserRepository);
    }

    save_short_url = async(request, response) => {
        let urlDTO = null;
        const { URL } = request.body;
        const { accessValidate } = request.body;
        if(!URL)
            return response.status(400).json({message: 'Parameter `URL` is required. Please, follow API specification.'});
        try{
            urlDTO = new UrlDTO(null, accessValidate, URL, null, 0, null, null);
            urlDTO = await this.UrlService.save_short_url(urlDTO); 
        }catch(e){
            let { message } = e;
            return response.status(500).json({ 'message': 'Error shortening URL. ' +  message});
        }

        return response.status(201).json({message: 'Shortener url was created!', shortURL: urlDTO.short_url});
    }

    get_short_url = async(request, response) => {
        let urlDTO = null;
        const { accessValidate } = request.body;
        const { short_url } = request.params;
        if(!short_url)
            return response.status(400).json({message: 'Parameter `short_url` is required. Please, follow API specification.'});
        try{
            urlDTO = new UrlDTO(null, accessValidate ? accessValidate : null, null, short_url, 0, null, null);
            urlDTO = await this.UrlService.get_short_url(urlDTO); 
        }catch(e){
            let { message } = e;
            return response.status(500).json({ 'message': 'Error: ' +  message});
        }
        return response.status(308).redirect(urlDTO.origin_url);
    }
    
    get_short_url_list = async(request, response) => {
        const { accessValidate } = request.body;
        let urlDTO = null, urlsDTO_list = null, url_list = [];
        if(!accessValidate){
            return response.status(401).json({message: 'Invalid access, wrong credentials. Choose a method to authenticate and try again: 1 - Token or 2 - E-mail and Password.'});
        }
        try{
            urlDTO = new UrlDTO(null, accessValidate, null, null, 0, null, null);
            urlsDTO_list = await this.UrlService.get_short_url_list(urlDTO); 
        }catch(e){
            let { message } = e;
            return response.status(500).json({ 'message': 'Error: ' +  message});
        }
        urlsDTO_list.forEach(url => {
            let obj = {
                'id': url.id,
                'id_user': url.id_user,
                'url': url.url,
                'short_url': url.short_url,
                'access_counter': url.access_counter,
                'updated':  url.updated
            }
            url_list.push(obj);
        });
        return response.status(200).json({ message: 'Success: The user have ' + urlsDTO_list.length + ' actives URLs.',  'URLs': url_list});
    }

    delete_short_url = async(request, response) => {
        const { accessValidate } = request.body;
        const { short_url } = request.params;
        let urlDTO = null;
        if(!accessValidate){
            return response.status(401).json({message: 'Invalid access, wrong credentials. Choose a method to authenticate and try again: 1 - Token or 2 - E-mail and Password.'});
        }

        if(!short_url){
            return response.status(401).json({message: 'You need choose which shortener URL wants delete.'});
        }
        try{
            urlDTO = new UrlDTO(null, accessValidate, null, short_url, 0, null, null);
            await this.UrlService.delete_short_url(urlDTO); 
        }catch(e){
            let { message } = e;
            return response.status(500).json({ 'message': 'Error: ' +  message});
        }
        return response.status(200).json({ message: 'Success: The URL with final .../' + short_url + ' was deleted.'});
    }

    update_short_url = async(request, response) => {
        let urlDTO = null;
        const { accessValidate } = request.body;
        const { short_url } = request.params;
        const { url } = request.body;
        if(!url)
            return response.status(400).json({message: 'Parameter `URL` is required. Please, follow API specification.'});

        if(!accessValidate){
            return response.status(401).json({message: 'Invalid access, wrong credentials. Choose a method to authenticate and try again: 1 - Token or 2 - E-mail and Password.'});
        }

        try{
            urlDTO = new UrlDTO(null, accessValidate, url, short_url, 0, null, null);
            await this.UrlService.update_short_url(urlDTO); 
        }catch(e){
            let { message } = e;
            return response.status(500).json({ 'message': 'Error shortening URL. ' +  message});
        }

        return response.status(201).json({message: 'Shortener url was updated!', shortURL: urlDTO.short_url});
    }
}

export { 
    UrlController
}