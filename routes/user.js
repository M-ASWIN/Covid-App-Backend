import express from 'express';
import { login,register,getUsers, profile } from '../controllers/users.js';


const router=express.Router();

router.post('/login',login);
router.post('/register',register);
router.get('/users',getUsers);
router.get('/profile',profile);


export default router;