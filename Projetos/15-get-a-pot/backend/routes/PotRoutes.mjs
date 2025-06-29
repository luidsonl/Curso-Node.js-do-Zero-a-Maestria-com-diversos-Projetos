import express from 'express'
import PotController from '../controllers/PotController.mjs';
import Pot from '../models/Pot.mjs';



const PotRoutes = express.Router();

PotRoutes.post('/create', PotController.create);
PotRoutes.get('/:id', PotController.getById);
PotRoutes.get('/user/:userId', PotController.getByUserId);
PotRoutes.patch('/update', PotController.update);
PotRoutes.patch('/transfer', PotController.transfer);
PotRoutes.delete('/delete', PotController.delete);


export default PotRoutes