import React from 'react';
import {FeedMeta} from '../../../../../../api/record';
import API from '../../../../../../api';
import {useDeleteItemModal, UseDeleteItemModalResult} from '../../../../../../hooks/useDeleteItemModal';


export const useDeleteFeedMetaModal = (recordId: string, onEventAfterItemDeleted: () => void): UseDeleteItemModalResult<FeedMeta> => {
    return useDeleteItemModal<FeedMeta>({
        makeDeleteRequest: (deletedItem) => API.record.deleteFeedRecordItem(recordId, deletedItem!.id),
        onEventAfterItemDeleted,
        DeleteModalMessage: ({deletedItem}) => (
            <span>
                Are you sure that you would like to delete item <b>{deletedItem?.fileName} - {deletedItem?.feedUrl}</b>
            </span>
        )
    })
}