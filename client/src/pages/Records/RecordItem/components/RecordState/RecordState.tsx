import {FC, useEffect, useState} from 'react';
import {Box, Button, Typography} from '@material-ui/core';
import {useStyles} from './RecordState.styles';
import {RECORD_STATE} from '../../../../../api/record';
import {PlayArrow as PlayArrowIcon, Stop as StopIcon} from '@material-ui/icons';
import {RecordingState} from '../../../../../api/recordingRecord';
import API from '../../../../../api';

type RecordStateProps = {
    recordId: string
}
export const RecordState: FC<RecordStateProps> = ({recordId}) => {
    const classes = useStyles();

    const [recordingState, setRecordingState] = useState<RecordingState>();

    const requestRecordingRecord = () => {
        API.recordingRecord.getRecordingState(recordId)
            .then(res => setRecordingState(() => res.data));
    };

    useEffect(() => {
        requestRecordingRecord();
        const interval = setInterval(requestRecordingRecord, 1000);
        return () => clearInterval(interval);
    }, [recordId]);

    const onStartRecording = () => {
        API.recordingRecord.startRecordingRecord(recordId)
            .then((res) => setRecordingState(() => res.data))
    }

    const onStopRecording = () => {
        API.recordingRecord.stopRecordingRecord(recordId)
            .then((res) => setRecordingState(() => res.data))
    }

    const state = recordingState?.recordState;
    const steps = recordingState?.recordSteps || 0;

    return (
        <Box className={classes.wrapper}>
            <Typography>Recorded State</Typography>
            <Box className={classes.buttons}>
                <Button
                    size="large"
                    className={classes.playButton}
                    disabled={state === RECORD_STATE.IN_PROGRESS}
                    onClick={onStartRecording}
                >
                    <PlayArrowIcon/>
                </Button>
                <Button
                    size="large"
                    className={classes.stopButton}
                    disabled={state === RECORD_STATE.NOT_STARTED}
                    onClick={onStopRecording}
                >
                    <StopIcon/>
                </Button>
            </Box>
            <Box className={classes.description}>
                <span>{steps} Recorded Steps</span>
            </Box>
        </Box>
    );
};