import express from 'express'
import CardController from '../controllers/CardController.mjs';
import Card from '../models/Card.mjs';
import verifyTokenMiddleware from '../middlewares/verifyTokenMiddleware.mjs';



const CardRoutes = express.Router();

CardRoutes.post('/create', verifyTokenMiddleware, CardController.create);
CardRoutes.get('/:id', CardController.getById);
CardRoutes.get('/user/:userId', CardController.getByUserId);
CardRoutes.delete('/:id', CardController.delete);
CardRoutes.get('/', CardController.getByPage);


export default CardRoutes