import Category from '../models/category.model';
import merge from 'lodash/merge';
import errorHandler from '../helpers/dbErrorHandler';
import formidable from 'formidable';
import fs from 'fs';
import { extend } from 'lodash';

const create = async(req, res) => {
    const category = new Category(req.body);
    try{
        await category.save();
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
        let categories = await Category.find().select('name updated created');
        res.json(categories);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const categoryById = async(req, res, next, id) => {
    try{
        let category = await Category.findById({_id: id})
        .populate('following', '_id name')
        .populate('followers', '_id name')
        .exec();

        if(!category) {
            return res.status(400).json({
                error: 'Category not found'
            });
        }
        req.profile = category;
        next();
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            error: "Could not retrieve user"
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
            if(err) {
                return res.status(400).json({
                    error: 'Photo could not be uploaded'
                });
            }
            let category = req.profile;
            category = extend(category, fields);
            category.updated = Date.now();

            await category.save();
            category.salt = '';

            res.json(category);
        } catch (err) {
            return res.status(400).json({
                erroR: errorHandler.getErrorMessage(err)
            });
        }
    });
};

const remove = async (req, res, next) => {
    try {
        console.log('deleted');
        let category = req.profile;
        console.log('category to remove', category);
        let deletedCategory = await category.deleteOne();
        deletedCategory.salt = '';
        res.json(deletedCategory);
    } catch(err) {
        console.log(err);
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
    categoryById,
    update
}