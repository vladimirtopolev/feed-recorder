import {
    useDeleteItemModal,
    UseDeleteItemModalResult
} from '../../../../../../../../hooks/useDeleteItemModal';
import {TimestampLabel} from '../../../../../../../../api/record';
import API from '../../../../../../../../api';

export const useDeleteLabelModal = (recordId: string, onEventAfterItemDeleted: (deletedItem: TimestampLabel) => void): UseDeleteItemModalResult<TimestampLabel> => {
    return useDeleteItemModal<TimestampLabel>({
        makeDeleteRequest: (deletedItem) => API.record.deleteTimestampLabel(recordId, deletedItem.step),
        onEventAfterItemDeleted,
        DeleteModalMessage: ({deletedItem}) => (<div>Are you sure that you would like to delete label?</div>),
    });
};