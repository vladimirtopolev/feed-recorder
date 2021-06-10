import {FC, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import API from '../../../api';
import {ContentContainer} from '@components/ContentContainer/ContentContainer';
import {PageHeader} from './components/PageHeader/PageHeader';
import {Container, Grid, Box} from '@material-ui/core';
import {RecordState} from './components/RecordState/RecordState';
import {SimulationStateComponent} from './components/SimulationState/SimulationState';
import {FeedsMeta} from './components/FeedsMeta/FeedsMeta';
import { useSelector, useDispatch } from 'react-redux'
import {recordSelector} from '@store/index';
import {recordRequestAction} from '@store/reducers/record';

export const RecordItemPage: FC = () => {
    const {id} = useParams<{ id: string }>();

    const {isLoading, error, data: record} = useSelector(recordSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(recordRequestAction(() => API.record.getItem(id)))
    }, [id]);

    return <ContentContainer isLoading={isLoading} header={<PageHeader title={record?.name}/>}>
        {!isLoading && !error && record && (
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <RecordState recordId={id}/>
                    </Grid>
                    <Grid item xs={9}>
                        <SimulationStateComponent
                            recordId={id}
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