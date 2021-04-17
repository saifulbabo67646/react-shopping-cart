const express = require('express')
const shortid = require('shortid')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://saiful123:saiful123@cluster0.jzbrf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
},() => {
    console.log('database connected successfully');
})

const Product = mongoose.model('products', new mongoose.Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    title:  String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String]
}))

app.get('/api/products', async (req, res)=> {
    const products = await Product.find({})
    res.send(products)
})

app.post('/api/products', async (req,res)=>{
    const newProduct = new Product(req.body)
    const savedProduct = await newProduct.save()
    res.send(savedProduct)
})

app.delete('/api/products/:id', async (req,res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)
    res.send(deletedProduct)
})

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log('Server is Running on this PORT'+ port)
})