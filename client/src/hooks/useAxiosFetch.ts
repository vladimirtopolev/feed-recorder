import {useEffect, useState} from 'react';
import {AxiosPromise} from 'axios';

type ResponseState<T> = {
    isLoading: boolean,
    error: any,
    response: T | null
}

type UseFetch<T> = {
    responseState: ResponseState<T>;
    handleRequest: (makeRequestFn: MakeRequestFn<T>) => Promise<T>;
    resetResponseState: () => void;
};

type UseFetchProps<T> = {
    makeRequestOnComponentMount?: boolean,
    makeRequestFn?: MakeRequestFn<T>
}

export type MakeRequestFn<T> = () => AxiosPromise<T>;

export const useAxiosFetch = <T> (options?: UseFetchProps<T>): UseFetch<T> => {
    const makeRequestOnComponentMount = options?.makeRequestOnComponentMount;
    const makeRequestFn = options?.makeRequestFn;

    const [responseState, setResponseState] = useState<ResponseState<T>>({
        isLoading: false,
        error: null,
        response: null
    });

    useEffect(()=>{
        if (makeRequestOnComponentMount && makeRequestFn) {
            handleRequest(makeRequestFn);
        }
    }, []);

    const handleRequest = async (makeRequestFn: MakeRequestFn<T>): Promise<T> => {
        setResponseState(() => ({isLoading: true, error: null, response: null}));
        try {
            const responseObject = await makeRequestFn();
            setResponseState(()=>({isLoading: false, error: null, response: responseObject.data}));
            return responseObject.data;
        } catch (error) {
            setResponseState(()=>({isLoading: false, error, response: null}));
            throw error;
        }

    };

    const resetResponseState = () =>{
        setResponseState(()=>({isLoading: false, response: null, error: null}))
    }
    return {
        handleRequest,
        responseState,
        resetResponseState
    };
};