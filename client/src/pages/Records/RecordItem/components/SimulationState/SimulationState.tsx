import {FC, useState} from 'react';
import {SIMULATION_STATE, TimestampLabel} from './../../../../../api/record';
import {useStyles} from './SimulationState.styles';
import {Box, Button, Typography} from '@material-ui/core';
import {Pause as PauseIcon, PlayArrow as PlayArrowIcon, Stop as StopIcon} from '@material-ui/icons';
import {Progress} from './components/Progress/Progress';
import {ProgressLabels} from './components/ProgressLabels/ProgressLabels';
import {CurrentTimestamp} from './components/CurrentTimestamp/CurrentTimestamp';
import {CurrentStepTitle} from './components/CurrentStepTitle/CurrentStepTitle';

type SimulationStateCellProps = {
    state: SIMULATION_STATE,
    step: number,
    recordedSteps: number,
    labels: TimestampLabel[]
};

export const SimulationState: FC<SimulationStateCellProps> = ({state, recordedSteps, labels}) => {
    const classes = useStyles();

    const [step, setStep] = useState(0);
    const [selectingStep, setSelectingStep] = useState(0);

    const changeSimulationStep = (step: number) =>{
        setStep(step);
    }

    const changeSelectingStep = (step: number) => {
        setSelectingStep(step);
    }

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
            <CurrentStepTitle step={step}/>
            <Box className={classes.progress}>
                <CurrentTimestamp
                    selectingStep={selectingStep}
                    recordedSteps={recordedSteps}
                />
                <Progress
                    recordedSteps={recordedSteps}
                    step={step}
                    selectingStep={selectingStep}
                    changeSelectingStep={changeSelectingStep}
                    changeSimulationStep={changeSimulationStep}
                />
                <ProgressLabels
                    recordedSteps={recordedSteps}
                    labels={labels}
                    changeSimulationStep={changeSimulationStep}
                />
            </Box>
        </Box>
    );
};