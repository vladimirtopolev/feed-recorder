import {createGenericSlice} from '../../utils/createGenericSlice';
import {Record} from '../../api/record';


const recordSlice = createGenericSlice<Record>({
    name: 'record',
    initData: null
});

export const recordReducer = recordSlice.slice.reducer;
export const recordActions = recordSlice.slice.actions;
export const recordRequestAction = recordSlice.getRequestAction;