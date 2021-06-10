import {createGenericListItems} from '@utils/createGenericListItems';
import API from '@api/index'
import {Pattern} from '@api/pattern';

const patternSlice = createGenericListItems<Pattern>({
    name: 'patternList',
    getItems: (props) => API.pattern.getItems(props)
});

export const patternListListReducer = patternSlice.slice.reducer;
export const patternListActions = patternSlice.slice.actions;
export const patternListRequestAction = patternSlice.getAllItemsAction;