import {FC, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useAxiosFetch} from '../../../hooks/useAxiosFetch';
import {Record, SIMULATION_STATE} from '../../../api/record';
import API from '../../../api';
import {ContentContainer} from '../../../components/ContentContainer/ContentContainer';
import {PageHeader} from './components/PageHeader/PageHeader';
import {Container, Grid, Box} from '@material-ui/core';
import {RecordState} from './components/RecordState/RecordState';
import {SimulationStateComponent} from './components/SimulationState/SimulationState';
import {FeedsMeta} from './components/FeedsMeta/FeedsMeta';
import {SimulationState} from '../../../api/simulationRecord';

export const RecordItemPage: FC = () => {
    const {id} = useParams<{ id: string }>();
    const {handleRequest, responseState} = useAxiosFetch<Record>();
    const {isLoading, error, response} = responseState;

    const [record, setRecord] = useState<Record | null>(null)

    useEffect(() => {
        handleRequest(() => API.record.getItem(id))
            .then(record => setRecord(record))
    }, [id]);

    console.log(record?.simulationStep, record?.simulationState)

    useEffect(() => {
        const interval = setInterval(() => {
            API.simulationRecord.getSimulationRecord(id)
                .then((res) => {
                    setRecord((prev) => prev === null ? prev : {...prev, ...res.data})
                })
        }, 1000);
        return () => clearInterval(interval)
    }, [id]);

    const changeSimulationStep = (step: number) => {
        API.record.editItem(id, {simulationStep: step})
            .then((res) => setRecord(()=> res.data))
    }

    const changeSimulationState = (state: SimulationState) =>{
        setRecord((prev) =>  prev === null ? prev : {...prev, ...state})
    }

    return <ContentContainer isLoading={isLoading} header={<PageHeader title={responseState.response?.name}/>}>
        {!isLoading && !error && response && record && (
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <RecordState state={record.recordState} steps={record.recordSteps}/>
                    </Grid>
                    <Grid item xs={9}>
                        <SimulationStateComponent
                            changeSimulationState={changeSimulationState}
                            changeSimulationStep={changeSimulationStep}
                            recordId={id}
                            state={record.simulationState}
                            step={record.simulationStep}
                            recordedSteps={record.recordSteps}
                            labels={record.timestampLabels}
                        />
                    </Grid>
                </Grid>
                <Box mt={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FeedsMeta recordId={id}/>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        )}
    </ContentContainer>;
};