import {FC} from 'react';
import {Box, Button, Container, Typography} from '@material-ui/core';
import {useStyles} from './PageHeader.styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {NavLink} from 'react-router-dom';

export const PageHeader: FC<{ title?: string }> = ({title}) => {
    const classes = useStyles();

    return (
        <Box className={classes.wrapper}>
            <Container className={classes.content}>
                <Typography className={classes.title}>
                    <Button component={NavLink} to={'/records'}>
                        <ArrowBackIcon/>
                    </Button>
                    {title || 'Record name'}</Typography>
            </Container>
        </Box>
    );
};