import {createGenericListItems} from '@utils/createGenericListItems';
import {Record} from '@api/record';
import API from '@api/index'

const recordSlice = createGenericListItems<Record>({
    name: 'recordList',
    getItems: (props) => API.record.getItems(props)
});

export const recordListReducer = recordSlice.slice.reducer;
export const recordListActions = recordSlice.slice.actions;
export const recordListRequestAction = recordSlice.getAllItemsAction;