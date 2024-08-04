import express from 'express';
import { UrlController } from '../../../controllers/UrlController.js';
import { authenticationUrl } from '../../Middleware/Auth.js';
var router = express.Router();
const Url_Controller = new UrlController();

router.post('/', Url_Controller.save_short_url);
router.get('/:short_url', authenticationUrl, Url_Controller.get_short_url);
router.get('/:id/shortener', authenticationUrl, Url_Controller.get_short_url_list);
router.delete('/:id/shortener/:short_url', authenticationUrl, Url_Controller.delete_short_url);
router.put('/:id/shortener/:short_url', authenticationUrl, Url_Controller.update_short_url);

export default router;