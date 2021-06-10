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

export type GenericDomain<T> = {
    isLoading: boolean,
    error: any,
    data: T | null
}

type CreateGenericSliceOptions<DATA> = {
    name: string,
    initData: DATA | null,
    reducers?: SliceCaseReducers<GenericDomain<DATA>>
}
type CreateGenericSliceResponse<DATA> = {
    slice: Slice<GenericDomain<DATA>>,
    getRequestAction: (makeRequest: () => AxiosPromise<DATA>) => ThunkAction<void, RootState, unknown, AnyAction>
}

export const createGenericSlice = <DATA>({name, initData, reducers = {}}: CreateGenericSliceOptions<DATA>): CreateGenericSliceResponse<DATA> => {
    const initialState: GenericDomain<DATA> = {
        isLoading: false,
        error: null,
        data: initData || null
    };


    const slice = createSlice({
        name,
        initialState,
        reducers: {
            startRequest: (state) => {
                state.isLoading = true;
            },
            successRequest: (state, action: PayloadAction<Draft<DATA>>) => {
                state.isLoading = false;
                state.data = action.payload;
            },
            errorRequest: (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.error = action.payload;
            }
        }
    });

    const actions = slice.actions;

    const getRequestAction = (makeRequest: () => AxiosPromise<DATA>) => {
        const thunkAction: ThunkAction<void, RootState, unknown, AnyAction> = async (dispatch) => {
            dispatch(actions.startRequest());
            try {
                const response = await makeRequest();
                dispatch(actions.successRequest(response.data));
            } catch (e) {
                dispatch(actions.errorRequest(e));
            }
        };
        return thunkAction;

    };
    return {
        slice,
        getRequestAction
    };
};


