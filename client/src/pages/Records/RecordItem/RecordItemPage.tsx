import {FC, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useAxiosFetch} from '../../../hooks/useAxiosFetch';
import {Record} from '../../../api/record';
import API from '../../../api';
import {ContentContainer} from '../../../components/ContentContainer/ContentContainer';
import {PageHeader} from './components/PageHeader/PageHeader';
import {Container, Grid, Box} from '@material-ui/core';
import {RecordState} from './components/RecordState/RecordState';
import {SimulationState} from './components/SimulationState/SimulationState';
import {FeedsMeta} from './components/FeedsMeta/FeedsMeta';

export const RecordItemPage: FC = () => {
    const {id} = useParams<{ id: string }>();
    const {handleRequest, responseState} = useAxiosFetch<Record>();
    const {isLoading, error, response} = responseState;

    useEffect(() => {
        handleRequest(() => API.record.getItem(id));
    }, [id]);

    return <ContentContainer isLoading={isLoading} header={<PageHeader title={responseState.response?.name}/>}>
        {!isLoading && !error && response && (
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <RecordState state={response.recordState} steps={response.recordSteps}/>
                    </Grid>
                    <Grid item xs={9}>
                        <SimulationState state={response.simulationState} step={response.simulationStep}/>
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