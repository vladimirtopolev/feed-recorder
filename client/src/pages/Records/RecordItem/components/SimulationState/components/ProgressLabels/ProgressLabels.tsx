import {FC, useEffect, useRef, useState} from 'react';
import {TimestampLabel} from '../../../../../../../api/record';
import {useStyles} from './ProgressLabels.styles';
import {Tooltip} from '@material-ui/core';

type ProgressLabelsProps = {
    recordedSteps: number,
    labels: TimestampLabel[],
    changeSimulationStep: (step: number) => void;
};
export const ProgressLabels: FC<ProgressLabelsProps> = ({ labels, recordedSteps, changeSimulationStep}) => {
    const classes = useStyles();
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (containerRef.current) {
            setWidth(containerRef.current.offsetWidth);
        }
    }, []);

    return (
        <div ref={containerRef} className={classes.container}>
            <div className={classes.startLabel}>0</div>
            <div className={classes.endLabel}>{recordedSteps}</div>
            {labels.map((label, i) => (
                <Tooltip title={label.label}>
                <div
                    className={classes.label}
                    style={{
                        left: label.step * width / recordedSteps
                    }}
                    onClick={() => changeSimulationStep(label.step) }
                />
                </Tooltip>
            ))}
        </div>
    );
};