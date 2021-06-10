import {
    createSlice,
    Draft,
    SliceCaseReducers,
    Slice,
    ThunkAction,
    PayloadAction,
    AnyAction
} from '@reduxjs/toolkit';
import {AxiosPromise} from 'axios';
import {RootState} from '../store';
import {PaginationResponse} from '@declarations/index';

export type GenericListItem<T> = {
    isLoading: boolean,
    error: any,
    items: T[],
    count: number,
    limit: number,
    offset: number,
    isPrev: boolean,
    isNext: boolean,
}

type CreateGenericSliceOptions<T> = {
    name: string,
    reducers?: SliceCaseReducers<GenericListItem<T>>,
    limit?: number,
    getItems: (props: { limit: number, offset: number }) => AxiosPromise<PaginationResponse<T>>
}

type CreateGenericSliceResponse<T> = {
    slice: Slice<GenericListItem<T>>,
    getAllItemsAction: (props?: {limit: number, offset: number}) => ThunkAction<void, RootState, unknown, AnyAction>
}

export const createGenericListItems = <T>({name, reducers = {}, limit = 10, getItems}: CreateGenericSliceOptions<T>): CreateGenericSliceResponse<T> => {
    const initialState: GenericListItem<T> = {
        isLoading: false,
        error: null,
        items: [],
        count: 0,
        limit,
        offset: 0,
        isPrev: false,
        isNext: false,
    };

    const slice = createSlice({
        name,
        initialState,
        reducers: {
            startRequest: (state) => {
                state.isLoading = true;
            },
            successRequest: (state, action: PayloadAction<PaginationResponse<T> & { limit: number, offset: number }>) => {
                state.isLoading = false;
                const payload = action.payload as Draft<PaginationResponse<T> & { limit: number, offset: number }>;
                const {items, count, limit, offset} = payload;
                state.items = items;
                state.count = count;
                state.limit = limit;
                state.offset = offset;
                state.isNext = limit * offset < count;
                state.isPrev = offset > 0;
            },
            errorRequest: (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.error = action.payload;
            },
            nextPage: (state) => {
                if (!state.isNext) {
                    return;
                }
                state.offset = state.offset + state.limit;
            },
            prevPage: (state) => {
                if (!state.isPrev) {
                    return;
                }
                const offset = state.offset - state.limit;
                state.offset = offset > 0 ? offset : 0;
            },
            changePage: (state, action: PayloadAction<number>) => {
                state.offset = action.payload * state.limit;
            },
            changeLimit: (state, action: PayloadAction<number>) => {
                state.offset = 0;
                state.limit = action.payload;
            }
        }
    });

    const actions = slice.actions;

    const getAllItemsAction = (props: { limit: number, offset: number } = {limit: 10, offset: 0}) => {
        const thunkAction: ThunkAction<void, RootState, unknown, AnyAction> = async (dispatch) => {
            dispatch(actions.startRequest());
            try {
                const response = await getItems(props);
                dispatch(actions.successRequest({...response.data, ...props}));
            } catch (e) {
                dispatch(actions.errorRequest(e));
            }
        };
        return thunkAction;
    };

    return {
        slice,
        getAllItemsAction
    }

};