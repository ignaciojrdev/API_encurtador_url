import { v4 as uuidv4 } from 'uuid';

class UrlUseCases{
    constructor(repository) {
        this.repository = repository
    }

    createShortUrlUseCase = async() =>{
        const longUUID = uuidv4();
        const shortUrl = longUUID.slice(0, 6);
        return shortUrl;
    }

    createIdShortUrlUseCase = async() =>{
        const id = uuidv4();
        return id
    }

    saveShortUrlUseCase = async(urlDTO) =>{
        //this.repository.save(urlDTO) e salvar no banco
    }

    createDateUrlUseCase = async() =>{
        //parei aqui
    }

}

export{
    UrlUseCases
}