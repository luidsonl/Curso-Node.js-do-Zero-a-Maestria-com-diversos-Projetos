import express from 'express'
import PotController from '../controllers/PotController.mjs';



const PotEoutes = express.Router();

UserRoutes.post('/create', PotController.register);


export default PotEoutes