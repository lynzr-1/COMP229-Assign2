import Product from '../models/products.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

//Create a new product
const create = async (req, res) => { 
	const product = new Product(req.body) 
	try {
		await product.save()
		return res.status(200).json({ 
			message: "Successfully added new product"
		})
	} catch (err) {
		return res.status(400).json({
		error: errorHandler.getErrorMessage(err) 
		})
	} 
}

//Read all products
const read = (req, res) => {
	return res.json(req.profile) 
	}

//Find a product by id
const productByID = async (req, res, next, id) => { 
	try {
		let product = await Product.findById(id) 
		if (!product)
		return res.status(400).json({ 
			error: "Product ID not found"
		})
		req.profile = product;
		next();
	} catch (err) {
		return res.status(400).json({ 
		error: "Could not retrieve product by ID"
		}) 
	}
}

//List all products
const list = async (req, res) => { 
	try {
		let products = await Product.find().select('name description price quantity category')
		res.json(products)
	} catch (err) {
		return res.status(400).json({
		error: errorHandler.getErrorMessage(err) 
		})
	} 
}

//update a product by id
const update = async (req, res) => { 
	try {
		let product = req.profile;
		if (!product)
		return res.status(400).json({ 
			error: "Product not found - could not update product"
		})
		product = extend(product, req.body);
		product.updated = Date.now();
		await product.save();
		res.json(product);
	} catch (err) {
		return res.status(400).json({ 
			error: "Could not update product"
		}) 
	} 
}

//find a product by search terms
const findProduct = async(req,res)=>{
	try{
		let searchWord = req.query.name;
        let products = await Product.find({name:{$regex: searchWord, $options: "i"}}).select('name description price quantity category');
        return res.status(200).json(products);
    }catch(err){
		return res.status(400).json({
			error:"Error finding product"
		});
	}
}

//Remove a product
const remove = async (req, res) => { 
	try {
		let product = req.profile
		let deletedProduct = await product.deleteOne() 
		res.json(deletedProduct) 
	} catch (err) {
	 return res.status(400).json({error: errorHandler.getErrorMessage(err) })
	} 
}

//Delete all products
const deleteAll = async (req, res) => {
	try {
		let products = await Product.deleteMany()
		res.json(products)
	} catch (err) {
		return res.status(400).json({
		error: errorHandler.getErrorMessage(err) 
		})
	} 
}

export default { create, productByID, read, list, remove, update, deleteAll, findProduct }