import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {ModalComponent} from '../../../../../../components/Modal/Modal';
import {FeedMeta} from '../../../../../../api/record';
import {Box, Button, DialogActions, DialogContent, TextField} from '@material-ui/core';
import {useAxiosFetch} from '../../../../../../hooks/useAxiosFetch';
import API from '../../../../../../api';
import {AxiosPromise} from 'axios';

type UseCreateEditFeedMetaModalResult = {
    CreateEditModal: FC<CreateEditModalProps>;
    createEditModalProps: CreateEditModalProps;
    editItem: (item: FeedMeta) => void;
    createItem: () => void;
}


type ModalState = {
    status: ModalStatus,
    item: FeedMeta | null
}

type CreateEditModalProps = {
    onClose: () => void;
    onEventAfterItemUpdated: () => void;
    modalState: ModalState;
    recordId: string;
}

enum ModalStatus {
    CLOSED,
    CREATE_ITEM,
    EDIT_ITEM
}

const INIT_FEED_META: FeedMeta = {
    id: '',
    feedUrl: '',
    fileName: ''
};

const CreateEditModal: FC<CreateEditModalProps> = ({onClose, modalState, recordId, onEventAfterItemUpdated}) => {
    const [item, changeItem] = useState<FeedMeta>({...(modalState.item || INIT_FEED_META)});

    useEffect(() => {
        changeItem(() => ({...(modalState.item || INIT_FEED_META)}));
    }, [modalState.item]);

    const onChangeField = (field: string) => (e: ChangeEvent<HTMLInputElement>) => {
        changeItem((prev) => ({...prev, [field]: e.target.value}));
    };

    const {handleRequest, responseState: {isLoading}} = useAxiosFetch<FeedMeta>();

    const onCreateEditItem = () => {
        const makeRequest: () => AxiosPromise<FeedMeta> =
            modalState.status === ModalStatus.CREATE_ITEM
                ? () => API.record.createFeedRecordItem(recordId, item)
                : () => API.record.editFeedRecordItem(recordId, item.id, item);
        handleRequest(makeRequest)
            .then(() => {
                onEventAfterItemUpdated();
                onClose();
            })
    };

    return (
        <ModalComponent
            isLoading={isLoading}
            onClose={onClose}
            title={modalState.status === ModalStatus.EDIT_ITEM ? 'Edit feed meta' : 'Create feed meta'}
            open={modalState.status !== ModalStatus.CLOSED}
        >
            <DialogContent dividers>
                <Box>
                    <TextField
                        label="FileName"
                        value={item.fileName}
                        onChange={onChangeField('fileName')}
                    />
                    <TextField
                        label="FeedUrl"
                        value={item.feedUrl}
                        onChange={onChangeField('feedUrl')}
                    />
                </Box>
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


export const useCreateEditFeedMetaModal = (recordId: string, onEventAfterItemUpdated: () => void): UseCreateEditFeedMetaModalResult => {

    const [modalState, changeModalState] = useState<ModalState>({status: ModalStatus.CLOSED, item: null});

    const createItem = () => {
        changeModalState(() => ({
            status: ModalStatus.CREATE_ITEM,
            item: {...INIT_FEED_META}
        }));
    };

    const editItem = (item: FeedMeta) => {
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

    const createEditModalProps: CreateEditModalProps = {
        onClose,
        modalState,
        recordId,
        onEventAfterItemUpdated
    };

    return {
        CreateEditModal,
        createEditModalProps,
        editItem,
        createItem
    };
};