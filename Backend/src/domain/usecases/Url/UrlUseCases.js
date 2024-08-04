import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
class UrlUseCases{
    constructor(repository) {
        this.repository = repository
    }

    createShortUrlUseCase = async() =>{
        const longUUID = uuidv4();
        const shortUrl = longUUID.slice(0, 6);
        return shortUrl;
    }

    createShortUrlFormat = (shortUrl) => {
        return process.env.BASEURL + '/url/' + shortUrl;
    }

    createIdShortUrlUseCase = async() =>{
        const id = uuidv4();
        return id
    }

    saveShortUrlUseCase = async(urlDTO) =>{
        return await this.repository.saveShortUrl(urlDTO.id, urlDTO.user_id, urlDTO.origin_url, urlDTO.short_url, urlDTO.access_counter, urlDTO.deleted, urlDTO.updated);
    }

    getShortUrlUseCase = async (urlDTO) =>{
        let newUrlDTO = await this.repository.getUrlByShortURLWithoutId(urlDTO.short_url, urlDTO.user_id);
        if(!newUrlDTO){
            throw new Error('Url not found.');
        }
        this.validateUserIdAndShortUrl(urlDTO, newUrlDTO);
        return newUrlDTO;
    }

    validateUserIdAndShortUrl = (oldDTO, newDTO) => {
        let error = false;

        if(!!oldDTO.user_id && !!newDTO.user_id && (oldDTO.user_id != newDTO.user_id)){
            error = true;
        }
        if(!oldDTO.user_id && !!newDTO.user_id){
            error = true;
        }
        if(error){
            throw new Error('Access denied.');
        }
    }

    increments_access_counter = async(urlDTO) => {
        return await this.repository.increments_access_counter(urlDTO.id, urlDTO.short_url, urlDTO.access_counter + 1);
    }

    get_short_url_list = async(urlDTO) => {
        let urlDTO_list = await this.repository.getshort_url_listByUserId(urlDTO.user_id);
        if(!urlDTO_list){
            throw new Error('The user id: ' + urlDTO.user_id + ' do not have URLs.');
        }
        return urlDTO_list;
    }

    delete_short_url = async (urlDTO) => {
        await this.getShortUrlUseCase(urlDTO);
        await this.repository.delete_short_url(urlDTO.short_url, urlDTO.user_id);
    }

    update_short_url = async (urlDTO) => {
        await this.getShortUrlUseCase(urlDTO);
        await this.repository.update_short_url(urlDTO.origin_url, urlDTO.short_url, urlDTO.user_id);
    }
}

export{
    UrlUseCases
}