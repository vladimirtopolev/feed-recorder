import React, {FC, useEffect, useState} from 'react';
import {Box, Button} from '@material-ui/core';
import {TimestampLabel} from '../../../../../../../api/record';
import {useStyles} from './LabelDashboard.styles';
import {useDeleteLabelModal} from './hooks/useDeleteLabelModal';
import {useCreateEditLabelModal} from './hooks/useCreateEditLableModal';

type LabelDashboardProps = {
    step: number,
    labels: TimestampLabel[],
    setLabels: (labels: TimestampLabel[]) => void;
    recordId: string
}
const LabelDashboardComponent: FC<LabelDashboardProps> = ({step, labels, recordId, setLabels}) => {
    const classes = useStyles();

    const [label, setLabel] = useState<TimestampLabel | undefined>();
    useEffect(() => {
        setLabel(() => labels.find(l => l.step === step));
    }, [step, labels]);

    const onDeletedItemEvent = (item: TimestampLabel) => {
        setLabels(labels.filter(label => label.step !== item.step));
    };

    const onCreateEditIteEvent = (item: TimestampLabel) => {
        const existedLabel = labels.find(l => l.step === item.step);
        setLabels(existedLabel
            ? labels.map(l => l.step === item.step ? item : l)
            : [...labels, item]
        );
    }

    const {deleteItem, DeleteItemModal, deleteItemModalProps} = useDeleteLabelModal(recordId, onDeletedItemEvent);
    const {CreateEditItemModal, createEditModalProps, createItem, editItem} = useCreateEditLabelModal(recordId, onCreateEditIteEvent);

    return (
        <Box className={classes.container}>
            <div className={classes.label}>{label?.label || '---'}</div>
            {!label && <Button size="small" variant="outlined" onClick={() => createItem({step})}>Create Label</Button>}
            {label && (
                <Box>
                    <Button size="small" variant="outlined" onClick={() => editItem(label)}>Edit Label</Button>
                    <Button size="small" variant="outlined" onClick={() => deleteItem(label)}>Delete Label</Button>
                </Box>
            )}
            <DeleteItemModal {...deleteItemModalProps}/>
            <CreateEditItemModal {...createEditModalProps}/>
        </Box>
    );
};

export const LabelDashboard = React.memo(LabelDashboardComponent)