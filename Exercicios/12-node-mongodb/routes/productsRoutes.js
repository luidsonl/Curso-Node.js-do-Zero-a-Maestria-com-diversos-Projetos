const express = require('express')
const router = express.Router()

const ProductController  = require ('../controllers/ProductController')

router.get('/create', ProductController.createProduct)
router.post('/create', ProductController.postCreateProduct)
router.get('/', ProductController.showProducts)

module.exports = router