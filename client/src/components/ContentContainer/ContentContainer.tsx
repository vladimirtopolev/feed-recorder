import {FC} from 'react';
import {Box, CircularProgress, Container} from '@material-ui/core';
import {useStyles} from './ContentContainer.styles';

type ContentContainerProps = {
    header?: React.ReactNode,
    isLoading?: boolean,
    error?: boolean
}

export const ContentContainer: FC<ContentContainerProps> = ({header, isLoading, children}) => {
   const classes = useStyles();
    return (
        <Box className={classes.container}>
            {header}
            <Container className={classes.content}>
                <>
                    {children}
                </>
                {isLoading && (
                    <Box className={classes.loaderContainer}>
                        <Box className={classes.loaderBackground}/>
                        <CircularProgress />
                    </Box>
                )}
            </Container>
        </Box>
    );
};