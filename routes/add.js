import express from 'express';
import { Addlocations, Getlocations, Viewlocation } from '../controllers/add.js';

const router=express.Router();

router.post('/',Addlocations);
router.get('/loc',Getlocations)
router.post('/view',Viewlocation)

export default router;