import React, {FC, useState} from 'react';
import {Record} from '../../../../api/record';
import {ModalComponent} from '../../../../components/Modal/Modal';
import {Button, DialogActions, DialogContent} from '@material-ui/core';
import {useAxiosFetch} from '../../../../hooks/useAxiosFetch';
import API from '../../../../api';

type UseDeleteRecordResult = {
    deleteRecord: (record: Record) => void;
    DeleteRecordModal: FC<DeleteRecordModalProps>;
    deleteRecordModalProps: DeleteRecordModalProps;
}

type DeleteRecordModalProps = {
    isLoading?: boolean;
    deletedRecord: Record | null;
    requestDeleteRecord: (record: Record) => void;
    onClose: () => void;
}

const DeleteRecordModal: FC<DeleteRecordModalProps> = ({deletedRecord, onClose, requestDeleteRecord}) => {
    return (
        <ModalComponent
            title="Warning"
            open={!!deletedRecord}
            onClose={onClose}
        >
            <DialogContent dividers>
                Are you sure that you would like to delete record <b>${deletedRecord?.name}</b>
            </DialogContent>

            <DialogActions disableSpacing>
                <Button autoFocus onClick={onClose}>
                    {'CLOSE'}
                </Button>
                <Button variant="contained" color="secondary" onClick={() => requestDeleteRecord(deletedRecord!)}>
                    {'DELETE'}
                </Button>
            </DialogActions>
        </ModalComponent>
    );
};

export const useDeleteRecordModal = (onRecordDeletedEvent?: (record: Record) => void): UseDeleteRecordResult => {
    const [deletedRecord, setDeletedRecord] = useState<Record | null>(null);
    const {handleRequest, responseState: {isLoading}} = useAxiosFetch<Record>();

    const deleteRecord = (record: Record): void => {
        setDeletedRecord(() => record);
    };

    const onClose = () => setDeletedRecord(() => null);

    const requestDeleteRecord = (record: Record): void => {
        handleRequest(() => API.record.deleteItem(record.id))
            .then(() => {
                onClose();
                onRecordDeletedEvent && onRecordDeletedEvent(record);
            });
    };


    const deleteRecordModalProps: DeleteRecordModalProps = {
        deletedRecord,
        onClose,
        isLoading,
        requestDeleteRecord
    };
    return {deleteRecord, DeleteRecordModal, deleteRecordModalProps};
};