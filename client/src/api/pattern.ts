import axios, {AxiosInstance, AxiosPromise} from 'axios';
import {getBaseUrl} from './index';
import {PaginationOptions, PaginationResponse} from '@declarations/index';

export type PatterVariable = {
    key: string,
};

export type FeedMetaPattern = {
    feedUrl: string,
    fileName: string
};

export type Pattern = {
    _id: string,
    name: string,
    description: string,
    variables: PatterVariable[],
    feedMetaPatterns: FeedMetaPattern[],
    created: Date,
}

export class PatternApi {
    private axios: AxiosInstance;

    constructor() {
        this.axios = axios.create({baseURL: getBaseUrl()});
    }

    private domainArea = 'patterns';

    public getItems = (options: PaginationOptions): AxiosPromise<PaginationResponse<Pattern>> => {
        return this.axios.get(`/api/${this.domainArea}`);
    };
}