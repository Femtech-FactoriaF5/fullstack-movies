import Router from 'express';
import {userController} from '../controller/user/userController';
import auth from '../middleware/authentication/authHandler';
import jwt from '../middleware/authentication/jwtHandler';

const {saveUser,getAllUsers} = userController;
const {encryptPassword} = auth;
const {validateToken} = jwt;

// ROUTES
const router = Router();

router.route('/user')
        .post(encryptPassword,saveUser)
        .get (validateToken,getAllUsers);



export default router;