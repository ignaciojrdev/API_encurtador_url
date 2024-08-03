import { UrlService } from '../../application/services/UrlService.js';
import { UrlDTO } from '../../application/dtos/UrlDTO.js';
import { UserDTO } from '../../application/dtos/UserDTO.js';

class UrlController{
    constructor(){
        this.UrlService = new UrlService();
    }

    save_short_url = async(request, response) => {
        let urlDTO = null;
        let userDTO = null;
        const { baerer_token } = request.headers;
        const { URL } = request.body;
        if(!URL)
            return response.status(400).json({message: 'Parameter `URL` is required. Please, follow API specification.'});
        try{
            userDTO = new UserDTO(null, null, null, baerer_token, null, null);
            urlDTO = new UrlDTO(null, userDTO.id, URL, null, 0, null, null);
            await this.UrlService.save_short_url(urlDTO, userDTO);   
        }catch(e){
            let { message } = e;
            return response.status(500).json({ 'message': 'Error shortening URL. ' +  message});
        }

        return response.status(201).json({message: 'Url was shortened!', shortURL: `${process.env.BASEURL}/${urlDTO.short_url}`});
    }

}

export { 
    UrlController
}