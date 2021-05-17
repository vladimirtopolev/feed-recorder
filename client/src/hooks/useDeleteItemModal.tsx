import React, {ReactElement, useState, FC} from 'react';
import {useAxiosFetch} from './useAxiosFetch';
import {ModalComponent} from '../components/Modal/Modal';
import {Button, DialogActions, DialogContent} from '@material-ui/core';
import {AxiosPromise} from 'axios';

type UseDeleteItemModalProps<T> = {
    makeDeleteRequest: (deletedItem: T) => AxiosPromise<T>;
    onEventAfterItemDeleted: (deletedItem: T) => void;
    DeleteModalMessage: FC<{ deletedItem: T | null }>;

};

type DeleteModalProps<T> = {
    DeleteModalMessage: FC<{ deletedItem: T | null }>;
    makeDeleteRequest: (deletedItem: T) => AxiosPromise<T>;
    deletedItem: T | null;
    onClose: () => void;
    onEventAfterItemDeleted: (deletedItem: T) => void;
}

export type UseDeleteItemModalResult<T> = {
    deleteItem: (item: T) => void;
    DeleteItemModal: (props: DeleteModalProps<T>) => ReactElement;
    deleteItemModalProps: DeleteModalProps<T>
};

const DeleteItemModal = function <T>({deletedItem, onClose, DeleteModalMessage, makeDeleteRequest, onEventAfterItemDeleted}: DeleteModalProps<T>): ReactElement {
    const {handleRequest, responseState} = useAxiosFetch<T>();

    const onDelete = () => {
        handleRequest(() => makeDeleteRequest(deletedItem!))
            .then((item) => {
                onEventAfterItemDeleted(item);
                onClose();
            });
    };

    return (
        <ModalComponent
            title="Warning"
            isLoading={responseState.isLoading}
            onClose={onClose}
            open={!!deletedItem}
        >
            <DialogContent dividers>
                <DeleteModalMessage deletedItem={deletedItem}/>
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


export const useDeleteItemModal = function <T>({makeDeleteRequest, onEventAfterItemDeleted, DeleteModalMessage}: UseDeleteItemModalProps<T>): UseDeleteItemModalResult<T> {
    const [deletedItem, setDeletedItem] = useState<T | null>(null);

    const deleteItem = (item: T) => {
        setDeletedItem(() => item);
    };

    const onClose = () =>{
        setDeletedItem(null);
    }

    const deleteItemModalProps: DeleteModalProps<T> = {
        deletedItem,
        makeDeleteRequest,
        onEventAfterItemDeleted,
        onClose,
        DeleteModalMessage
    }

    return {
        DeleteItemModal,
        deleteItem,
        deleteItemModalProps
    };
};