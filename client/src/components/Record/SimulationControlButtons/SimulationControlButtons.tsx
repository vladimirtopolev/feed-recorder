import {FC} from 'react';
import {Box, Button} from '@material-ui/core';
import {SIMULATION_STATE} from '@api/record';
import {Pause as PauseIcon, PlayArrow as PlayArrowIcon, Stop as StopIcon} from '@material-ui/icons';
import useClasses from './SimulationControlButtons.styles';

type SimulationControlButtonsProps = {
    state: SIMULATION_STATE | undefined,
    onPlay: () => void,
    onPause: () => void,
    onStop: () => void,
};

export const SimulationControlButtons: FC<SimulationControlButtonsProps> = ({state, onPlay, onStop, onPause}) => {
    const classes = useClasses();

    return (
        <Box>
            <Button
                size="large"
                className={classes.playButton}
                disabled={state === SIMULATION_STATE.IN_PROGRESS}
                onClick={onPlay}
            >
                <PlayArrowIcon fontSize="large"/>
            </Button>
            <Button
                size="large"
                className={classes.pauseButton}
                disabled={state !== SIMULATION_STATE.IN_PROGRESS}
                onClick={onPause}
            >
                <PauseIcon fontSize="large"/>
            </Button>
            <Button
                size="large"
                className={classes.stopButton}
                disabled={state === SIMULATION_STATE.NOT_STARTED}
                onClick={onStop}
            >
                <StopIcon/>
            </Button>
        </Box>
    );
};