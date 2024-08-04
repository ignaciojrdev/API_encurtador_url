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
        return await this.repository.getUrlByShortURLWithoutId(urlDTO.short_url);
    }
}

export{
    UrlUseCases
}