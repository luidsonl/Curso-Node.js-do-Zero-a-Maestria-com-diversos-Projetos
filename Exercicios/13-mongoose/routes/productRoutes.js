import express from 'express'
import ProductController from '../controllers/ProductController.js'

const productRoutes = express.Router()

productRoutes.get('/create', ProductController.RenderCreateProductPage)



export default productRoutes

