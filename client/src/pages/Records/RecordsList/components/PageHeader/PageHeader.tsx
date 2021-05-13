import {FC} from 'react';
import {useStyles} from './PageHeader.styles';
import {Box, Button, Container, Typography} from '@material-ui/core';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
export const PageHeader: FC = () => {
    const classes = useStyles();
    return (
        <Box className={classes.wrapper}>
            <Container className={classes.content}>
                <Typography className={classes.title}>Records list</Typography>
                <Box className={classes.buttons}>
                    <Button
                        variant="contained"
                        color="primary"
                        disableElevation size="small"
                        className={classes.button}
                        startIcon={<ControlPointIcon />}
                    >
                        Create New Record
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};