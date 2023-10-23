import Department from '../models/department.model';
import merge from 'lodash/merge';
import errorHandler from '../helpers/dbErrorHandler';
import formidable from 'formidable';
import fs from 'fs';
import { extend } from 'lodash';

const create = async(req, res) => {
    const department = new Department(req.body);
    try{
        await department.save();
        return res.status(200).json({
            message: 'Successfully signed up!'
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const list = async(req, res) => {
    try {
        let departments = await Department.find().select('name updated created');
        res.json(departments);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const departmentById = async(req, res, next, id) => {
    try {
        let department = await Department.findById({_id: id})
        .populate('following', '_id name')
        .populate('followers', '_id name')
        .exec();

        if(!department) {
            return res.status(400).json({
                error: 'Department not found'
            });
        }
        req.profile = department;
        next();
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            error: 'Could not retrieve department'
        });
    }
};

const read = (req, res) => {
    req.profile.salt = undefined;
    req.name = '';
    return res.json(req.profile);
};