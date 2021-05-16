import {FC, useEffect, useRef, useState} from 'react';
import {useStyles} from './CurrentTimestamp.styles';
import {Chip} from '@material-ui/core';

type CurrentTimestampProps = {
    selectingStep: number,
    recordedSteps: number,
}
export const CurrentTimestamp: FC<CurrentTimestampProps> = ({selectingStep, recordedSteps}) => {
    const classes = useStyles();
    const [width, setWidth] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (containerRef.current) {
            setWidth(containerRef.current.offsetWidth);
        }
    }, []);

    return (
        <div className={classes.container} ref={containerRef}>
            {selectingStep > 0  && (
                <div
                    className={classes.timestamp}
                    style={{
                        left: selectingStep * width / recordedSteps
                    }}
                >
                    <Chip
                        className={classes.timestampChip}
                        label={selectingStep}
                        variant="outlined"
                        size="small"
                    />
                </div>
            )}
        </div>
    );
};