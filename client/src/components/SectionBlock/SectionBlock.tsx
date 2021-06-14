import {FC} from 'react';
import {Box, Typography} from '@material-ui/core';
import useClasses from './SectionBlock.styles';

type SectionBlockProps = {
    title: React.ReactNode
}

export const SectionBlock: FC<SectionBlockProps> = ({title, children}) => {
    const classes = useClasses();
    return (
        <Box className={classes.container}>
            <Box className={classes.titleContainer}>
                <Typography className={classes.title}>{title}</Typography>
            </Box>
            <Box className={classes.content}>
                {children}
            </Box>
        </Box>
    );
};
