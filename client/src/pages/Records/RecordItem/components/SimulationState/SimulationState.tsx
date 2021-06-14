import {FC, useCallback, useEffect, useState} from 'react';
import {TimestampLabel} from '@api/record';
import API from '@api/index';
import {useStyles} from './SimulationState.styles';
import {Box} from '@material-ui/core';
import {Progress} from './components/Progress/Progress';
import {ProgressLabels} from './components/ProgressLabels/ProgressLabels';
import {CurrentTimestamp} from './components/CurrentTimestamp/CurrentTimestamp';
import {CurrentStepTitle} from '@components/Record/CurrentStepTitle/CurrentStepTitle';
import {LabelDashboard} from './components/LabelDashboard/LableDashboard';
import {SimulationState} from '@api/simulationRecord';
import {SectionBlock} from '@components/SectionBlock/SectionBlock';
import {SimulationControlButtons} from '@components/Record/SimulationControlButtons/SimulationControlButtons';

type SimulationStateCellProps = {
    recordId: string,
    recordedSteps: number,
    labels: TimestampLabel[],
};

export const SimulationStateComponent: FC<SimulationStateCellProps> = ({recordedSteps, labels: serverLabels, recordId}) => {
    const classes = useStyles();

    const [labels, setLabels] = useState<TimestampLabel[]>(serverLabels);
    const [selectingStep, setSelectingStep] = useState(0);
    const [simulationState, setSimulationState] = useState<SimulationState>();

    const changeSelectingStep = (step: number) => {
        setSelectingStep(step);
    };

    const changeSimulationStep = useCallback((step: number) => {
        API.record.editItem(recordId, {simulationStep: step})
            .then(() => setSimulationState((prev) => !prev ? prev : {...prev, simulationStep: step}));
    }, [recordId]);


    const requestSimulationStep = () => {
        API.simulationRecord.getSimulationRecord(recordId)
            .then((res) => {
                setSimulationState(() => res.data);
            });
    };

    useEffect(() => {
        requestSimulationStep();
        const interval = setInterval(requestSimulationStep, 1000);
        return () => clearInterval(interval);
    }, [recordId]);

    const changeSimulationState = useCallback<(state: SimulationState) => void>((state) => {
        setSimulationState(() => state);
    }, []);

    const onPlay = () => {
        API.simulationRecord.playRecord(recordId)
            .then((res) => changeSimulationState(res.data));
    };

    const onPause = () => {
        API.simulationRecord.pauseRecord(recordId)
            .then((res) => changeSimulationState(res.data));
    };

    const onStop = () => {
        API.simulationRecord.stopRecord(recordId)
            .then((res) => changeSimulationState(res.data));
    };
    const step = simulationState?.simulationStep || 0;
    const state = simulationState?.simulationState;

    return (
        <SectionBlock title="Simulation State">
            <SimulationControlButtons
              state={state}
              onPlay={onPlay}
              onPause={onPause}
              onStop={onStop}
            />
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
        </SectionBlock>
    );
};