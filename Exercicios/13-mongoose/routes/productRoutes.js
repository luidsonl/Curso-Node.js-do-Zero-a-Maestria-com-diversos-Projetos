import express from 'express'
import ProductController from '../controllers/ProductController.js'

const productRoutes = express.Router()

productRoutes.get('/create', ProductController.renderCreateProductPage)
productRoutes.post('/create', ProductController.createProduct)



export default productRoutes

