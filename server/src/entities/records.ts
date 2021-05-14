
const RECORDS_COUNT = 100;
const FEEDS_COUNT = 10;


import * as faker from 'faker';

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

export const RECORDS:Record[] = Array.from({ length: RECORDS_COUNT })
    .map((_, i): Record=>({
       id: faker.datatype.uuid(),
        name: `${i+1} ${faker.name.title()}`,
        recordState: RECORD_STATE.NOT_STARTED,
        recordSteps: faker.datatype.number({min: 100, max: 200}),
        simulationState: SIMULATION_STATE.NOT_STARTED,
        simulationStep: 0,
        created: new Date(),
        feedsMeta: Array.from({ length: FEEDS_COUNT })
            .map((_, i):FeedMeta => ({
                id: `${i + 1}`,
                feedUrl: `http://site.com/${i + 1}`,
                fileName: `feedName-${i + 1}`
            })),
        timestampLabels: [
            { step: 1, label: 'Start game' },
            { step: 10, label: 'Start of 1st period' },
            { step: 20, label: 'Goal 0:1' },
            { step: 50, label: 'Start of 2nd period' },
            { step: 70, label: 'Finished of 2nd period' }
        ],
        labels: []
    }));