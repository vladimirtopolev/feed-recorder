import {FC} from 'react';
import {Box, Typography} from '@material-ui/core';
import {useStyles} from './CurrentStepTitle.styles';

type CurrentStepTitleProps = {
    step: number,
    description?: string
}
export const CurrentStepTitle: FC<CurrentStepTitleProps> = ({step, description}) => {
    const classes = useStyles();
    return (
        <Box className={classes.container}>
            <Typography className={classes.step}>{step}</Typography>
            <span className={classes.description}>{description || 'current step'}</span>
        </Box>
    )
}