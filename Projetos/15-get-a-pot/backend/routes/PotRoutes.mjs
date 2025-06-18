import express from 'express'
import PotController from '../controllers/PotController.mjs';



const PotRoutes = express.Router();

PotRoutes.post('/create', PotController.create);
PotRoutes.get('/:id', PotController.getById);
PotRoutes.patch('/update', PotController.update);
PotRoutes.delete('/delete', PotController.delete);


export default PotRoutes