import {FC, useState} from 'react';
import {SIMULATION_STATE, TimestampLabel} from './../../../../../api/record';
import API from './../../../../../api';
import {useStyles} from './SimulationState.styles';
import {Box, Button, Typography} from '@material-ui/core';
import {Pause as PauseIcon, PlayArrow as PlayArrowIcon, Stop as StopIcon} from '@material-ui/icons';
import {Progress} from './components/Progress/Progress';
import {ProgressLabels} from './components/ProgressLabels/ProgressLabels';
import {CurrentTimestamp} from './components/CurrentTimestamp/CurrentTimestamp';
import {CurrentStepTitle} from './components/CurrentStepTitle/CurrentStepTitle';
import {LabelDashboard} from './components/LabelDashboard/LableDashboard';
import {SimulationState} from '../../../../../api/simulationRecord';

type SimulationStateCellProps = {
    recordId: string,
    state: SIMULATION_STATE,
    step: number,
    recordedSteps: number,
    labels: TimestampLabel[],
    changeSimulationStep: (step: number) => void,
    changeSimulationState: (state: SimulationState) => void
};

export const SimulationStateComponent: FC<SimulationStateCellProps> = ({step, state, recordedSteps, labels: serverLabels, recordId, changeSimulationStep, changeSimulationState}) => {
    const classes = useStyles();

    const [labels, setLabels] = useState<TimestampLabel[]>(serverLabels);
    const [selectingStep, setSelectingStep] = useState(0);

    const changeSelectingStep = (step: number) => {
        setSelectingStep(step);
    };

    console.log('==><', state)

    const onPlay = () => {
        API.simulationRecord.playRecord(recordId)
            .then((res) => changeSimulationState(res.data))
    }

    const onPause = () => {
        API.simulationRecord.pauseRecord(recordId)
            .then((res) => changeSimulationState(res.data))
    }

    const onStop = () => {
        API.simulationRecord.stopRecord(recordId)
            .then((res) => changeSimulationState(res.data))
    }

    return (
        <Box className={classes.container}>
            <Box className={classes.titleContainer}>
                <Typography className={classes.title}>Simulation State</Typography>
            </Box>
            <Box className={classes.content}>
                <Box className={classes.buttons}>
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
                <CurrentStepTitle step={step}/>
                <LabelDashboard step={step} labels={labels} recordId={recordId} setLabels={setLabels}/>
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
        </Box>
    );
};