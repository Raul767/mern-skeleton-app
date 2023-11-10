import Product from '../models/product.model';
import merge from 'lodash/merge';
import errorHandler from './../helpers/dbErrorHandler';
import formidable from 'formidable';
import fs from 'fs';
import { extend } from 'lodash';

const create = async(req, res) => {
    const product = new Product(req.body);
    try{
        await product.save();
        return res.status(200).json({
            message: 'Successfully signed up!'
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const list = async (req, res) => {
    try {
        let products = await Product.find().select('name category updated created');
        res.json(products);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const productById = async (req, res, next, id) => {
    try {
        let product = await Product.findById({_id: id})
        .populate('category', '_id name')
        .exec();

        if(!product) {
            return res.status(400).json({
                error: 'Product not found'
            });
        }
        req.profile = product;
        next();
    } catch(err){
        console.log(err);
        return res.status(400).json({
            error: "Could not retrieve product"
        });
    }
};

const read = (req, res) => {
    req.profile.salt = undefined;
    req.name = '';
    return res.json(req.profile);
};

const update = async (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.keepExtension = true;
    form.parse(req, async(err, fields, files) => {
        try {
            if(err){
                return res.status(400).json({
                    error: 'Photo could not be uploaded'
                });
            }
            let product = req.profile;
            product = extend(product, fields);
            product.updated = Date.now();

            await product.save();
            product.salt = '';

            res.json(product);
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            });
        }
    });
};

const remove = async(req, res, next) => {
    try {
        console.log('deleted');
        let product = req.profile;
        console.log('product to remove', product);
        let deletedProduct = await product.deleteOne();
        deletedProduct.salt = '';
        res.json(deletedProduct);
    } catch(err) {
        console.log(err);
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const addCategory = async (req, res) => {
    try {
        const result = await Product.findByIdAndUpdate(
            req.body.categoryId,
            { $push: { categories: req.body.productId } },
            { new: true }
        )
        .populate('category', '_id name')
        exec();
        result.salt = undefined;
        res.json(result);
    } catch(err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const removeCategory = async (req, res) => {
    try {
        const result = await Product.findByIdAndUpdate(
            req.body.uncategoryId,
            { $push: { categories: req.body.productId } },
            { new: true }
        )
        .populate('category', '_id name')
        exec();
        result.salt = undefined;
        res.json(result);
    } catch(err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

export default {
    create,
    list,
    read,
    remove,
    productById,
    update,
    addCategory,
    removeCategory
}