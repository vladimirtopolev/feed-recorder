import mongoConnection from '../../connections/mongo-connection.provider';
import {RecordModel} from '../../models/record.model';
import {RECORD_STATE, SIMULATION_STATE} from '../../entities/records';

const INTERVAL = 1000;

mongoConnection.connect()
    .then(() => {
        runProcess();
    });

const runProcess = () => {
    simulateTick();
};

const simulateTick = async () => {
    const newRecord = await RecordModel
        .findOneAndUpdate({
            _id: process.env.recordId,
            recordState: RECORD_STATE.IN_PROGRESS,
        }, {
            $inc: {recordSteps: 1}
        });
    if (!newRecord) {
        process.exit();
    }
    setTimeout(simulateTick, INTERVAL);
};