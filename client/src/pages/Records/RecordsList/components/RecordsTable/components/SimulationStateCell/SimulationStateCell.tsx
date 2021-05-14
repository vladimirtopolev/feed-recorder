import {FC} from 'react';
import {SIMULATION_STATE} from '../../../../../../../api/record';
import {useStyles} from './SimulationStateCell.styles';
import {Box, Button} from '@material-ui/core';
import {Pause as PauseIcon, PlayArrow as PlayArrowIcon, Stop as StopIcon} from '@material-ui/icons';

type SimulationStateCellProps = {
    state: SIMULATION_STATE,
    step: number
};

export const SimulationStateCell:FC<SimulationStateCellProps> = ({state, step}) =>{
    const classes = useStyles();
    return (
        <Box className={classes.container}>
            <Box className={classes.buttons}>
                <Button
                    className={classes.playButton}
                    disabled={state !== SIMULATION_STATE.NOT_STARTED}
                >
                    <PlayArrowIcon/>
                </Button>
                <Button
                    className={classes.pauseButton}
                    disabled={state !== SIMULATION_STATE.PAUSED}
                >
                    <PauseIcon/>
                </Button>
                <Button
                    className={classes.stopButton}
                    disabled={state !== SIMULATION_STATE.IN_PROGRESS}
                >
                    <StopIcon/>
                </Button>
            </Box>
            <Box className={classes.description}>
                {step} Step
            </Box>
        </Box>
    )
}