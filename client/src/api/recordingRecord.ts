import axios, {AxiosInstance, AxiosPromise} from 'axios';
import {getBaseUrl} from './index';
import {RECORD_STATE} from './record';


export type RecordingState = {
    recordState: RECORD_STATE,
    recordSteps: number,
}

export class RecordingRecordApi {
    private axios: AxiosInstance;

    constructor() {
        this.axios = axios.create({baseURL: getBaseUrl()});
    }

    private domainArea = 'records';

    public getRecordingState = (recordId: string): AxiosPromise<RecordingState> => {
        return this.axios.get(`/api/${this.domainArea}/${recordId}/recordingRecord`);
    };

    public startRecordingRecord = (recordId: string): AxiosPromise<RecordingState> => {
        return this.axios.get(`/api/${this.domainArea}/${recordId}/recordingRecord/start`);
    };

    public stopRecordingRecord = (recordId: string): AxiosPromise<RecordingState> => {
        return this.axios.get(`/api/${this.domainArea}/${recordId}/recordingRecord/stop`);
    };
}