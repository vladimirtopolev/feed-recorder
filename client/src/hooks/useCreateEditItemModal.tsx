import React, {FC, ReactElement, useEffect, useState} from 'react';
import {useAxiosFetch} from './useAxiosFetch';
import {ModalComponent} from '../components/Modal/Modal';
import {Button, DialogActions, DialogContent} from '@material-ui/core';
import {AxiosPromise} from 'axios';

enum ModalStatus {
    CLOSED,
    CREATE_ITEM,
    EDIT_ITEM
}

type ModalState<T> = {
    status: ModalStatus,
    item: T | null | undefined
}

type CreateEditModalProps<T> = {
    initialItem: T,
    onClose: () => void;
    onEventAfterItemUpdated: (item: T) => void;
    modalState: ModalState<T>;
    makeCreateItemRequest: (item: T) => AxiosPromise<T>,
    makeEditItemRequest: (item: T) => AxiosPromise<T>,
    CreateEditForm: FC<{item: T, changeField: (field: string, value: any) => void}>
}


type UseCreateEditItemModalProps<T> = {
    initialItem: T,
    onEventAfterItemUpdated: (item: T) => void;
    makeCreateItemRequest: (item: T) => AxiosPromise<T>,
    makeEditItemRequest: (item: T) => AxiosPromise<T>,
    CreateEditForm: FC<{item: T, changeField: (field: string, value: any) => void}>
}

export type UseCreateEditItemModalResult<T> = {
    createItem: (item?: Partial<T>) => void;
    editItem: (item: T) => void;
    createEditModalProps: CreateEditModalProps<T>,
    CreateEditItemModal: (props: CreateEditModalProps<T>) => ReactElement;
}


const CreateEditItemModal = function <T>({modalState, initialItem, makeEditItemRequest, makeCreateItemRequest, onEventAfterItemUpdated, onClose, CreateEditForm}: CreateEditModalProps<T>): ReactElement {
    const [item, changeItem] = useState<T>({...(modalState.item || initialItem)});

    useEffect(() => {
        changeItem(() => ({...(modalState.item || initialItem)}));
    }, [modalState.item]);

    const changeField = (field: string, value: any) => {
        changeItem((prev) => ({...prev, [field]: value}));
    };

    const {handleRequest, responseState: {isLoading}} = useAxiosFetch<T>();

    const onCreateEditItem = () => {
        const makeRequest: () => AxiosPromise<T> =
            modalState.status === ModalStatus.CREATE_ITEM
                ? () => makeCreateItemRequest(item)
                : () => makeEditItemRequest(item);
        handleRequest(makeRequest)
            .then((item) => {
                onEventAfterItemUpdated(item);
                onClose();
            })
    };

    return (
        <ModalComponent
            isLoading={isLoading}
            onClose={onClose}
            title={modalState.status === ModalStatus.EDIT_ITEM ? 'Edit item' : 'Create item'}
            open={modalState.status !== ModalStatus.CLOSED}
        >
            <DialogContent dividers>
                <CreateEditForm item={item} changeField={changeField}/>
            </DialogContent>

            <DialogActions disableSpacing>
                <Button autoFocus onClick={onClose}>
                    {'CLOSE'}
                </Button>
                <Button variant="contained" color="primary" onClick={onCreateEditItem}>
                    {'CREATE'}
                </Button>
            </DialogActions>
        </ModalComponent>
    );
};


export const useCreateEditItemModal = function <T>({initialItem, onEventAfterItemUpdated, makeCreateItemRequest, makeEditItemRequest, CreateEditForm}: UseCreateEditItemModalProps<T>): UseCreateEditItemModalResult<T> {
    const [modalState, changeModalState] = useState<ModalState<T>>({status: ModalStatus.CLOSED, item: null});

    const createItem = (item: Partial<T> = {}) => {
        changeModalState(() => ({
            status: ModalStatus.CREATE_ITEM,
            item: {...initialItem, ...item}
        }));
    };

    const editItem = (item: T) => {
        changeModalState(() => ({
            status: ModalStatus.EDIT_ITEM,
            item: {...item}
        }));
    };

    const onClose = () => {
        changeModalState(() => ({
            status: ModalStatus.CLOSED,
            item: null
        }));
    };

    const createEditModalProps: CreateEditModalProps<T> = {
        initialItem,
        modalState,
        onClose,
        onEventAfterItemUpdated,
        makeCreateItemRequest,
        makeEditItemRequest,
        CreateEditForm
    }


    return {
        createItem,
        editItem,
        CreateEditItemModal,
        createEditModalProps
    };
};