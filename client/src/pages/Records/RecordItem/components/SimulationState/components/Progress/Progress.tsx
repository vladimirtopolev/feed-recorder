import {FC, MouseEvent, MouseEventHandler, useEffect, useRef, useState} from 'react';
import {useStyles} from './Progress.styles';

type ProgressProps = {
    step: number,
    selectingStep: number,
    changeSimulationStep: (step: number) => void;
    changeSelectingStep: (step: number) => void;
    recordedSteps: number,
};

export const Progress: FC<ProgressProps> = ({step, recordedSteps, changeSimulationStep, selectingStep, changeSelectingStep}) => {
    const classes = useStyles();
    const containerRef = useRef<HTMLDivElement>(null);

    const [{cursor, selectingCursor, width}, setProgressState] = useState<{
        cursor: number,
        selectingCursor: number,
        width: number,
    }>({
        cursor: 0,
        selectingCursor: 0,
        width: 0
    });

    const getCursorStep = (e: MouseEvent<HTMLDivElement>): number => {
        return Math.ceil(e.nativeEvent.offsetX * recordedSteps / width);
    };

    const convertStepToPosition = (step: number) => {
        return step * width / recordedSteps;
    };

    const onMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
        const newStep = getCursorStep(e);
        changeSelectingStep(newStep);
        setProgressState((prev) => ({...prev, selectingCursor: convertStepToPosition(newStep)}));
    };

    const onMouseLeave: MouseEventHandler<HTMLDivElement> = (e) => {
        changeSelectingStep(0);
        setProgressState((prev) => ({...prev, selectingCursor: 0}));
    };

    const onClick: MouseEventHandler<HTMLDivElement> = (e) => {
        changeSimulationStep(getCursorStep(e));
    };

    useEffect(() => {
        if (containerRef.current) {
            const width = containerRef.current.offsetWidth;
            setProgressState(() => ({
                width,
                cursor: step * width / recordedSteps,
                selectingCursor: 0
            }));
        }
    }, [step]);
    return (
        <div
            ref={containerRef}
            className={classes.container}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
        >
            <div
                className={classes.progress}
                style={{
                    width: cursor
                }}
            />
            <div className={classes.selectingProgress} style={{
                width: selectingCursor
            }}/>
        </div>
    );
};