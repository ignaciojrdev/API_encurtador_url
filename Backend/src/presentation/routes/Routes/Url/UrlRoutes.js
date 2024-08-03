import express from 'express';
import { UrlController } from '../../../controllers/UrlController.js';
import { authentication } from '../../Middleware/Auth.js';

var router = express.Router();
const Url_Controller = new UrlController();

router.post('/', Url_Controller.save_short_url);

export default router;