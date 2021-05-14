import axios, {AxiosInstance, AxiosPromise} from 'axios';
import {delay, getBaseUrl} from './index';
import {PaginationOptions, PaginationResponse} from '../types';

export enum RECORD_STATE  {
    IN_PROGRESS= 'IN_PROGRESS',
    NOT_STARTED= 'NOT_STARTED',
    NOT_AVAILABLE= 'NOT_AVAILABLE'
}

export enum SIMULATION_STATE  {
    IN_PROGRESS= 'IN_PROGRESS',
    PAUSED= 'PAUSED',
    NOT_STARTED= 'NOT_STARTED',
    NOT_AVAILABLE= 'NOT_AVAILABLE'
}

export type FeedMeta = {
    id: string,
    feedUrl: string,
    fileName: string
}

export type TimestampLabel = {
    step: number,
    label: string
}

export type Record = {
    id: string,
    name: string,
    recordState: RECORD_STATE,
    recordSteps: number,
    simulationState: SIMULATION_STATE,
    simulationStep: number,
    created: Date,
    feedsMeta: FeedMeta[],
    timestampLabels: TimestampLabel[],
    labels: string[]
}

export class RecordApi {
    private axios: AxiosInstance;

    constructor() {
        this.axios = axios.create({baseURL: getBaseUrl()})
    }
    private domainArea = 'records';

    public getItems = (options: PaginationOptions = {limit: 10, offset:0}):  AxiosPromise<PaginationResponse<Record>> => {
        return this.axios.get(`/api/${this.domainArea}`, {params: options})
            .then(data => delay(data))
    }

    public getItem = (itemId: string): AxiosPromise<Record> =>{
        return this.axios.get(`/api/${this.domainArea}/${itemId}`);
    }

    public createItem = (item: Partial<Record>): AxiosPromise<Record> =>{
        return this.axios.post(`/api/${this.domainArea}`, item)
    }

    public editItem = (itemId: string, item: Partial<Record>) =>{
        return this.axios.post(`/api/${this.domainArea}/${itemId}`, item)
    }

    public deleteItem = (itemId: string) =>{
        return this.axios.delete(`/api/${this.domainArea}/${itemId}`);
    }
}