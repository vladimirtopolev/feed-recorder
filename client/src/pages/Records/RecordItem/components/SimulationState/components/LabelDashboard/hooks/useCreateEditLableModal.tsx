import {TimestampLabel} from '../../../../../../../../api/record';
import API from '../../../../../../../../api';
import {useCreateEditItemModal} from '../../../../../../../../hooks/useCreateEditItemModal';
import {Box, TextField} from '@material-ui/core';
import React from 'react';

export const useCreateEditLabelModal = (recordId: string, onEventAfterItemUpdated: (item: TimestampLabel) => void) =>{
    return useCreateEditItemModal<TimestampLabel>({
        initialItem: {
            step: 0,
            label: ''
        },
        makeEditItemRequest: (item) => API.record.editTimestampLabel(recordId, item.step, item),
        makeCreateItemRequest: (item) => API.record.createTimestampLabel(recordId, item),
        onEventAfterItemUpdated,
        CreateEditForm: ({item, changeField}) => (
            <Box>
                <span>Step: {item.step}</span>
                <TextField
                    label="Label"
                    value={item.label}
                    onChange={(e) => changeField('label', e.target.value)}
                />
            </Box>
        )
    })
}