import express from 'express';
import { UserController } from '../../../controllers/UserController.js'
var router = express.Router();
const User_Controller = new UserController();
router.post('/', User_Controller.save_user);
router.get('/:id', User_Controller.get_user);
router.delete('/:id', User_Controller.delete_user); 
router.put('/:id', User_Controller.update_user);
export default router;