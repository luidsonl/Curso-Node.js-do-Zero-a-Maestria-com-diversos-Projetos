import express from 'express'
import CardController from '../controllers/CardController.mjs';
import Card from '../models/Card.mjs';
import verifyTokenMiddleware from '../middlewares/verifyTokenMiddleware.mjs';



const CardRoutes = express.Router();

CardRoutes.post('/create', verifyTokenMiddleware, CardController.create);
CardRoutes.get('/:id', CardController.getById);
CardRoutes.get('/user/:userId', CardController.getByUserId);
CardRoutes.patch('/update', CardController.update);
CardRoutes.patch('/transfer', CardController.transfer);
CardRoutes.delete('/delete', CardController.delete);


export default CardRoutes