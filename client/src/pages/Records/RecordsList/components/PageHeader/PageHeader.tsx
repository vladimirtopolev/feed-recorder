import {FC} from 'react';
import {useStyles} from './PageHeader.styles';
import {Box, Button, Container, Typography} from '@material-ui/core';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import {useCreateRecordModal} from '@pages/Records/RecordsList/components/CreateRecordModal/useCreateRecordModal';

type PageHeaderProps = {
    getItems: (options: {limit?: number, offset?: number}) => void
}

export const PageHeader: FC<PageHeaderProps> = ({getItems}) => {
    const classes = useStyles();
    const {CreateRecordModal,createRecordModalProps, createRecord} = useCreateRecordModal(() => getItems({offset: 0}));

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
                        onClick={createRecord}
                    >
                        Create New Record
                    </Button>
                </Box>
            </Container>
            <CreateRecordModal {...createRecordModalProps}/>
        </Box>
    );
};