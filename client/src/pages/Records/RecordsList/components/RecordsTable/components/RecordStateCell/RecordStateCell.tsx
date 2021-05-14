import {FC} from 'react';
import {RECORD_STATE} from '../../../../../../../api/record';
import {Box, Button} from '@material-ui/core';
import {PlayArrow as PlayArrowIcon, Stop as StopIcon} from '@material-ui/icons';
import {useStyles} from './RecordStateCell.styles';

type RecordStateCellProps = {
    state: RECORD_STATE,
    steps: number
}

export const RecordStateCell: FC<RecordStateCellProps> = ({state, steps}) => {
    const classes = useStyles();
    return (
        <Box className={classes.container}>
            <Box className={classes.buttons}>
                <Button
                    className={classes.playButton}
                    disabled={state === RECORD_STATE.IN_PROGRESS}
                >
                    <PlayArrowIcon/>
                </Button>
                <Button
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
    );
};