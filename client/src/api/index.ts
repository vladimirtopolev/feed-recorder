import {RecordApi} from './record';
import {SimulationRecordApi} from './simulationRecord';

export const getBaseUrl = ():any =>{
    console.log(process.env.NODE_ENV)
    return process.env.NODE_ENV === 'development' ? 'http://localhost:5000': undefined;
}

export const delay = (data: any, delay = 1000) => {
    return new Promise<any>((resolve) => {
       setTimeout(()=>{
           resolve(data);
       }, delay)
    })
}

export default {
    record: new RecordApi(),
    simulationRecord: new SimulationRecordApi()
}