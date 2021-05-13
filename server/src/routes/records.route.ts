import express, {Request} from 'express';
import entities from '../entities';
import {Record, FeedMeta, RECORD_STATE, SIMULATION_STATE} from '../entities/records';
import {PaginationRequest} from '../types';
import {getPageFrame} from '../utils';
import faker from 'faker';

export const recordRouter = express.Router();

const INIT_RECORD: Partial<Record> = {
    recordState: RECORD_STATE.NOT_STARTED,
    simulationState: SIMULATION_STATE.NOT_STARTED,
    recordStep: 0,
    feedsMeta: [],
    labels: [],
    timestampLabels: []
};

recordRouter.get('/', (req: PaginationRequest, res) => {
    res.send(getPageFrame(entities.RECORDS, req.query));
});

recordRouter.post('/', (req, res) => {
    const newItem: Record = {
        ...INIT_RECORD,
        ...req.body,
        id: faker.datatype.uuid(),
        created: new Date()
    };
    entities.RECORDS = entities.RECORDS.concat(newItem);
    res.json(newItem);
});

recordRouter.get('/:recordId', (req: Request<{ recordId: string }>, res) => {
    const {recordId} = req.params;
    let item = entities.RECORDS.find(record => record.id === recordId);
    res.send(item);
});

recordRouter.delete('/:recordId', (req: Request<{ recordId: string }>, res) => {
    const {recordId} = req.params;
    const deletedItem = entities.RECORDS.find(r => r.id === recordId);
    if (!deletedItem) {
        return res.sendStatus(404).json({message: `Record with id ${recordId} not found`});
    }
    entities.RECORDS = entities.RECORDS.filter(r => r.id !== recordId);
    res.json(deletedItem);
});

recordRouter.get('/:recordId/feedsMeta', (req: Request<{ recordId: string }>, res) => {
    const {recordId} = req.params;
    const record = entities.RECORDS.find(rec => rec.id === recordId);
    if (!record) {
        return res.sendStatus(404).json({message: `Record with id ${recordId} not found`});
    }
    res.send(record.feedsMeta);
});

recordRouter.post('/:recordId/feedsMeta', (req: Request<{ recordId: string }, any, FeedMeta>, res) => {
    const {recordId} = req.params;
    const feedMeta = req.body;
    const targetRecord = entities.RECORDS.find(rec => rec.id === recordId);

    if (!targetRecord) {
        return res.sendStatus(404).json({message: `Record with id ${recordId} not found`});
    }
    const newFeedMeta = {...feedMeta, id: faker.datatype.uuid()};
    targetRecord.feedsMeta.push(newFeedMeta);
    res.send(newFeedMeta);
});

recordRouter.put('/:recordId/feedsMeta/:feedMetaId', (req: Request<{ recordId: string, feedMetaId: string }, any, FeedMeta>, res) => {
    const {recordId, feedMetaId} = req.params;
    const editedMeta = req.body;
    const targetRecord = entities.RECORDS.find(rec => rec.id === recordId);

    if (!targetRecord) {
        return res.sendStatus(404).json({message: `Record with id ${recordId} not found`});
    }
    targetRecord.feedsMeta = targetRecord.feedsMeta.map(meta => meta.id === feedMetaId ? editedMeta : meta);
    res.send({...editedMeta, id: feedMetaId});
});

recordRouter.delete('/:recordId/feedsMeta/:feedMetaId', (req:Request<{ recordId: string, feedMetaId: string }>, res) => {
    const {recordId, feedMetaId} = req.params;
    const targetRecord = entities.RECORDS.find(rec => rec.id === recordId);

    if (!targetRecord) {
        return res.sendStatus(404).json({message: `Record with id ${recordId} not found`});
    }

    const deletedFeedMeta = targetRecord.feedsMeta.find(meta => meta.id === feedMetaId);
    if (!deletedFeedMeta){
        return res.sendStatus(404).json({message: `Feed meta with id ${feedMetaId} not found in record with id ${recordId}`});
    }

    targetRecord.feedsMeta = targetRecord.feedsMeta
        .filter(meta => meta.id !== feedMetaId)
    res.send(deletedFeedMeta);
});
