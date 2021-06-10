import express, {Request} from 'express';
import {PaginationRequest} from '../types';
import {PatternModel} from '../models/pattern.model';

export const patternRouter = express.Router();


patternRouter.get('/', async (req: PaginationRequest, res) => {
    const {offset, limit} = req.query;
    const [count, items] = await Promise.all([
        PatternModel.countDocuments(),
        PatternModel.find({}).skip(Number(offset)).limit(Number(limit))
    ]);
    res.send({
        items: items,
        count: count
    });
});
