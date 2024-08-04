import express from 'express';
import { UrlController } from '../../../controllers/UrlController.js';
import { authenticationUrl } from '../../Middleware/Auth.js';
var router = express.Router();
const Url_Controller = new UrlController();

router.post('/', Url_Controller.save_short_url);
router.get('/:short_url', Url_Controller.get_short_url);

export default router;