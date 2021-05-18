import axios, {AxiosInstance, AxiosPromise} from 'axios';
import {delay, getBaseUrl} from './index';
import {PaginationOptions, PaginationResponse} from '../types';

export enum RECORD_STATE {
    IN_PROGRESS = 'IN_PROGRESS',
    NOT_STARTED = 'NOT_STARTED',
    NOT_AVAILABLE = 'NOT_AVAILABLE'
}

export enum SIMULATION_STATE {
    IN_PROGRESS = 'IN_PROGRESS',
    PAUSED = 'PAUSED',
    NOT_STARTED = 'NOT_STARTED',
    NOT_AVAILABLE = 'NOT_AVAILABLE'
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
        this.axios = axios.create({baseURL: getBaseUrl()});
    }

    private domainArea = 'records';
    private feedsRecordDomainArea = 'feedsMeta';
    private timestampDomainArea = 'timestampLabels';

    public getItems = (options: PaginationOptions = {
        limit: 10,
        offset: 0
    }): AxiosPromise<PaginationResponse<Record>> => {
        return this.axios.get(`/api/${this.domainArea}`, {params: options});
    };

    public getItem = (itemId: string): AxiosPromise<Record> => {
        return this.axios.get(`/api/${this.domainArea}/${itemId}`);
    };

    public createItem = (item: Partial<Record>): AxiosPromise<Record> => {
        return this.axios.post(`/api/${this.domainArea}`, item);
    };

    public editItem = (itemId: string, item: Partial<Record>) => {
        return this.axios.put(`/api/${this.domainArea}/${itemId}`, item);
    };

    public deleteItem = (itemId: string) => {
        return this.axios.delete(`/api/${this.domainArea}/${itemId}`);
    };


    // FEED META ROUTES
    public getFeedRecordItems = (recordId: string): AxiosPromise<FeedMeta[]> => {
        return this.axios.get(`/api/${this.domainArea}/${recordId}/${this.feedsRecordDomainArea}`);
    };

    public createFeedRecordItem = (recordId: string, item: Partial<FeedMeta>): AxiosPromise<FeedMeta> => {
        return this.axios.post(`/api/${this.domainArea}/${recordId}/${this.feedsRecordDomainArea}`, item);
    };

    public editFeedRecordItem = (recordId: string, feedMetaId: string, item: Partial<FeedMeta>): AxiosPromise<FeedMeta> => {
        return this.axios.put(`/api/${this.domainArea}/${recordId}/${this.feedsRecordDomainArea}/${feedMetaId}`, item);
    };

    public deleteFeedRecordItem = (recordId: string, feedMetaId: string): AxiosPromise<FeedMeta> => {
        return this.axios.delete(`/api/${this.domainArea}/${recordId}/${this.feedsRecordDomainArea}/${feedMetaId}`);
    };

    // TIMESTAMPS LABELS ROUTES
    public createTimestampLabel = (recordId: string, item: Partial<TimestampLabel>): AxiosPromise<TimestampLabel> => {
        return this.axios.post(`/api/${this.domainArea}/${recordId}/${this.timestampDomainArea}`, item);
    };

    public editTimestampLabel = (recordId: string, stepId: number, item: Partial<TimestampLabel>): AxiosPromise<TimestampLabel> => {
        return this.axios.put(`/api/${this.domainArea}/${recordId}/${this.timestampDomainArea}/${stepId}`, item);

    }

    public deleteTimestampLabel = (recordId: string, stepId: number): AxiosPromise<TimestampLabel> => {
        return this.axios.delete(`/api/${this.domainArea}/${recordId}/${this.timestampDomainArea}/${stepId}`);
    }
}