import React, {FC, useState} from 'react';
import {ModalComponent} from '../../../../../../components/Modal/Modal';
import {FeedMeta} from '../../../../../../api/record';
import {Button, DialogActions, DialogContent} from '@material-ui/core';
import API from '../../../../../../api';
import {useAxiosFetch} from '../../../../../../hooks/useAxiosFetch';

type UseDeleteFeedMetaModalResult = {
    DeleteModal: FC<DeleteModalProps>;
    deleteModalProps: DeleteModalProps;
    deleteItem: (feedMeta: FeedMeta) => void;
}

type DeleteModalProps = {
    deletedItem: FeedMeta | null;
    onClose: () => void;
    recordId: string,
    onEventAfterItemUDeleted: () => void
};

const DeleteModal: FC<DeleteModalProps> = ({deletedItem, onClose, recordId, onEventAfterItemUDeleted}) => {
    const {handleRequest, responseState} = useAxiosFetch<FeedMeta>();

    const onDelete = () =>{
        handleRequest(() => API.record.deleteFeedRecordItem(recordId, deletedItem!.id))
            .then(()=>{
                onEventAfterItemUDeleted();
                onClose();
            })
    }

    return (
        <ModalComponent
            title="Warning"
            isLoading={responseState.isLoading}
            onClose={onClose}
            open={!!deletedItem}
        >
            <DialogContent dividers>
                Are you sure that you would like to delete item <b>{deletedItem?.fileName} - {deletedItem?.feedUrl}</b>
            </DialogContent>

            <DialogActions disableSpacing>
                <Button autoFocus onClick={onClose}>
                    {'CLOSE'}
                </Button>
                <Button variant="contained" color="secondary" onClick={onDelete}>
                    {'DELETE'}
                </Button>
            </DialogActions>
        </ModalComponent>
    );
};

export const useDeleteFeedMetaModal = (recordId: string, onEventAfterItemUDeleted: () => void): UseDeleteFeedMetaModalResult => {
    const [deletedItem, setDeletedItem] = useState<FeedMeta | null>(null);

    const deleteItem = (feedMeta: FeedMeta) => {
        setDeletedItem(() => feedMeta);
    };
    const onClose = () => {
        setDeletedItem(() => null);
    };

    const deleteModalProps: DeleteModalProps = {
        deletedItem,
        onClose,
        recordId,
        onEventAfterItemUDeleted
    };

    return {
        DeleteModal,
        deleteModalProps,
        deleteItem
    };
};