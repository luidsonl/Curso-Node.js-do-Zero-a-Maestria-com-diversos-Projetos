const express = require('express')
const router = express.Router()

const ProductController  = require ('../controllers/ProductController')

router.get('/create', ProductController.RenderCreateProductPage)
router.post('/create', ProductController.createProduct)
router.get('/remove/:id', ProductController.removeProduct)
router.get('/edit/:id', ProductController.renderEditProductPage)
router.post('/edit/:id', ProductController.updateProduct)
router.get('/:id', ProductController.renderProductPage)
router.get('/', ProductController.renderAllProducts)

module.exports = router