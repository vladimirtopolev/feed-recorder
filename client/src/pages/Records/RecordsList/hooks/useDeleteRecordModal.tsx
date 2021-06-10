import React from 'react';
import {Record} from '@api/record';
import API from '@api/index';
import {useDeleteItemModal, UseDeleteItemModalResult} from '@hooks/useDeleteItemModal';

export const useDeleteRecordModal = (onEventAfterItemDeleted: () => void): UseDeleteItemModalResult<Record> => {
    return useDeleteItemModal<Record>({
        makeDeleteRequest: (deletedItem) => API.record.deleteItem(deletedItem.id),
        onEventAfterItemDeleted,
        DeleteModalMessage: ({deletedItem}) => (
            <>
                Are you sure that you would like to delete record <b>${deletedItem?.name}</b>
            </>)
    });
};