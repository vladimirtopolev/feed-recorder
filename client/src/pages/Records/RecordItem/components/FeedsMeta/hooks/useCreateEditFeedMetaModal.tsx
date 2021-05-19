import React, {FC} from 'react';
import {FeedMeta} from '../../../../../../api/record';
import {Box, TextField} from '@material-ui/core';
import API from '../../../../../../api';
import {
    CreateEditFormProps,
    useCreateEditItemModal,
    UseCreateEditItemModalResult
} from '../../../../../../hooks/useCreateEditItemModal';



const CreateEditForm: FC<CreateEditFormProps<FeedMeta>> = React.memo(({item, changeField}) => {
    return (
        <Box>
            <TextField
                label="FileName"
                value={item.fileName}
                onChange={(e) => changeField('fileName', e.target.value)}
            />
            <TextField
                label="FeedUrl"
                value={item.feedUrl}
                onChange={(e) => changeField('feedUrl', e.target.value)}
            />
        </Box>
    );
});

export const useCreateEditFeedMetaModal = (recordId: string, onEventAfterItemUpdated: () => void): UseCreateEditItemModalResult<FeedMeta> => {
    return useCreateEditItemModal<FeedMeta>({
        initialItem: {
            id: '',
            feedUrl: '',
            fileName: ''
        },
        onEventAfterItemUpdated,
        makeCreateItemRequest: (item) => API.record.createFeedRecordItem(recordId, item),
        makeEditItemRequest: (item) => API.record.editFeedRecordItem(recordId, item.id, item),
        CreateEditForm
    });
};