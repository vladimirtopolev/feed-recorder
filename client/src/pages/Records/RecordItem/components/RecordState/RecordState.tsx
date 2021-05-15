import {FC} from 'react';
import {Box, Button, Typography} from '@material-ui/core';
import {useStyles} from './RecordState.styles';
import {RECORD_STATE} from '../../../../../api/record';
import {PlayArrow as PlayArrowIcon, Stop as StopIcon} from '@material-ui/icons';

type RecordStateProps = {
    state: RECORD_STATE,
    steps: number
}
export const RecordState: FC<RecordStateProps> = ({state, steps}) => {
    const classes = useStyles();

    return (
        <Box className={classes.wrapper}>
            <Typography>Recorded State</Typography>
            <Box className={classes.buttons}>
                <Button
                    size="large"
                    className={classes.playButton}
                    disabled={state === RECORD_STATE.IN_PROGRESS}
                >
                    <PlayArrowIcon/>
                </Button>
                <Button
                    size="large"
                    className={classes.stopButton}
                    disabled={state === RECORD_STATE.NOT_STARTED}
                >
                    <StopIcon/>
                </Button>
            </Box>
            <Box className={classes.description}>
                <span>{steps} Recorded Steps</span>
            </Box>
        </Box>
    )
};