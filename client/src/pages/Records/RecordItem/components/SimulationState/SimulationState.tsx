import {FC} from 'react';
import {SIMULATION_STATE} from './../../../../../api/record';
import {useStyles} from './SimulationState.styles';
import {Box, Button, Typography} from '@material-ui/core';
import {Pause as PauseIcon, PlayArrow as PlayArrowIcon, Stop as StopIcon} from '@material-ui/icons';

type SimulationStateCellProps = {
    state: SIMULATION_STATE,
    step: number
};

export const SimulationState:FC<SimulationStateCellProps> = ({state, step}) =>{
    const classes = useStyles();
    return (
        <Box className={classes.container}>
            <Typography>Simulation State</Typography>
            <Box className={classes.buttons}>
                <Button
                    size="large"
                    className={classes.playButton}
                    disabled={state !== SIMULATION_STATE.NOT_STARTED}
                >
                    <PlayArrowIcon/>
                </Button>
                <Button
                    size="large"
                    className={classes.pauseButton}
                    disabled={state !== SIMULATION_STATE.PAUSED}
                >
                    <PauseIcon/>
                </Button>
                <Button
                    size="large"
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