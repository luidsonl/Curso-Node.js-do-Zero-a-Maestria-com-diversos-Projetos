import Product from "../models/product.js";

class ProductController {
    static async renderAllProducts(req, res){

        const products = await Product.getProducts()
        res.render('products/all', {products})
    }

    static RenderCreateProductPage(req, res){
        res.render('products/create')
    }

    static createProduct(req, res){
        const data = req.body

        const product = new Product(data)
        product.create()
        res.redirect('/products')
    }

    static async renderProductPage(req, res){
        const id = req.params.id

        const product = await Product.getProductById(id)
        res.render('products/product', {product})
    }

    static async removeProduct(req, res){
        const id = req.params.id

        await Product.removeProduct(id)
        res.redirect('/products')
    }

    static async renderEditProductPage(req, res){
        const id = req.params.id

        const product = await Product.getProductById(id)
        res.render('products/edit', {product})
    }

    static async updateProduct(req, res){
        const data = req.body
        const id = req.params.id

        const product = new Product(data)
        product.update(id)
        res.redirect(`/products/${id}`)
    }
}

export default ProductController