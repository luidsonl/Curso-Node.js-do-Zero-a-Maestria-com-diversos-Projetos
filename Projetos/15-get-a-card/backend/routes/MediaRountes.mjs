import express from 'express'
import MediaController from '../controllers/MediaController.mjs'
import verifyTokenMiddleware from '../middlewares/verifyTokenMiddleware.mjs';

const MediaRoutes = express.Router();

MediaRoutes.post('/create', verifyTokenMiddleware, MediaController.create);


export default MediaRoutes;