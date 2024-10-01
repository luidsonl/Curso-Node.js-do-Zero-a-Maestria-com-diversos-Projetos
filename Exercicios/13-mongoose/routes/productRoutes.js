import express from 'express'
import ProductController from '../controllers/ProductController.js'

const productRoutes = express.Router()

productRoutes.get('/create', ProductController.renderCreateProductPage)
productRoutes.post('/create', ProductController.createProduct)
productRoutes.get('/edit/:sku', ProductController.renderEditProductPage)
productRoutes.post('/edit/:id', ProductController.updateProduct)
productRoutes.post('/remove/:id', ProductController.removeProduct)
productRoutes.get('/:sku', ProductController.renderProductPage)
productRoutes.get('/', ProductController.renderAllProducts)



export default productRoutes

