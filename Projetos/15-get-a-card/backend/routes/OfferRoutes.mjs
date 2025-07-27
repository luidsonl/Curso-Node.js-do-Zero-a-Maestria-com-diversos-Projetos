import express from 'express'
import OfferController from '../controllers/OfferController.mjs';
import verifyTokenMiddleware from '../middlewares/verifyTokenMiddleware.mjs';

const OfferRoutes = express.Router();

OfferRoutes.get('/', OfferController.getAll);
OfferRoutes.post('/', verifyTokenMiddleware, OfferController.create)
OfferRoutes.post('/cancel/:id', verifyTokenMiddleware, OfferController.cancel)
OfferRoutes.get('/:id', OfferController.getById);
OfferRoutes.get('/user/:userId', OfferController.getByUserId);


export default OfferRoutes;