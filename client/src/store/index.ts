import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {recordReducer} from './reducers/record';
import {recordListReducer} from './reducers/recordList';
import {patternListListReducer} from './reducers/patternList';


const store = configureStore({
    reducer: {
        record: recordReducer,
        recordList: recordListReducer,
        patternList: patternListListReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const recordSelector = (state: RootState) => state.record;
export const recordListSelector = (state: RootState) => state.recordList;
export const patternListSelector = (state: RootState) => state.patternList;

export default store;