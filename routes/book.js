import express from 'express';
import { Book } from '../controllers/book.js';

const router=express.Router();

router.post('/',Book);

export default router;