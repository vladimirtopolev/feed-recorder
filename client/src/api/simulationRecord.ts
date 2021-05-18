import axios, {AxiosInstance, AxiosPromise} from 'axios';
import {getBaseUrl} from './index';
import {SIMULATION_STATE} from './record';


export type SimulationState = {
    simulationState: SIMULATION_STATE,
    simulationStep: number,
}

export class SimulationRecordApi {
    private axios: AxiosInstance;

    constructor() {
        this.axios = axios.create({baseURL: getBaseUrl()});
    }

    private domainArea = 'records';

    public getSimulationRecord = (recordId: string): AxiosPromise<SimulationState> =>{
        return this.axios.get(`/api/${this.domainArea}/${recordId}/simulationState`);
    }

    public playRecord = (recordId: string): AxiosPromise<SimulationState> => {
        return this.axios.get(`/api/${this.domainArea}/${recordId}/play`);
    }

    public pauseRecord = (recordId: string): AxiosPromise<SimulationState> => {
        return this.axios.get(`/api/${this.domainArea}/${recordId}/pause`);
    }

    public stopRecord = (recordId: string): AxiosPromise<SimulationState> => {
        return this.axios.get(`/api/${this.domainArea}/${recordId}/stop`);
    }
}