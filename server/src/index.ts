import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoConnection from './connections/mongo-connection.provider';

import {recordRouter} from './routes/records.route';
import {recordSimulatorRouter} from './routes/recordSimulator.route';
import {recordRecordRouter} from './routes/recordRecord.route';
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// API ROUTES
app.use('/api/records', recordRecordRouter);
app.use('/api/records', recordSimulatorRouter);
app.use('/api/records', recordRouter);



app.use('/static', express.static(path.resolve(__dirname, '../static/static')));

app.get('*', (req, res) => {
    const pathFile = path.resolve(__dirname, '../static/index.html');
    res.sendFile(pathFile);
});

mongoConnection.connect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server is listening on ${PORT}`);
        });
    });
