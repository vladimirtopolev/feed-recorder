import {useEffect, useState} from 'react';
import {useAxiosFetch} from './useAxiosFetch';
import {PaginationOptions, PaginationResponse} from '../types';
import {AxiosPromise} from 'axios';

type PaginationState = {
    limit: number;
    offset: number;
    itemsCount: number;
    isNext: boolean;
    isPrev: boolean
}

export type UsePaginationReturn<T> = PaginationState & {
    nextPage: () => void;
    prevPage: () => void;
    changePage: (page: number)=>void;
    changeItemsPerPage: (limit: number) => void;
    isLoading: boolean,
    error: any,
    items: T[]
}


export const usePagination = <T>(getItems: (options: PaginationOptions) => AxiosPromise<PaginationResponse<T>>): UsePaginationReturn<T> => {
    const [paginationState, setPaginationState] = useState<PaginationState>({
        limit: 10,
        offset: 0,
        isNext: false,
        isPrev: false,
        itemsCount: 0
    });

    const {limit, offset, isNext, isPrev} = paginationState;

    const {handleRequest, responseState: {isLoading, error, response}} = useAxiosFetch<PaginationResponse<T>>();

    const nextPage = (): void => {
        if (!isNext) {
            return;
        }
        setPaginationState((prev)=>({...prev, offset: prev.offset + prev.limit}))
    };
    const prevPage = (): void => {
        if (!isPrev) {
            return;
        }
        setPaginationState((prev) => {
            const offset = prev.offset - prev.limit;
            return {...prev, offset: offset > 0 ? offset : 0};
        });
    };

    const changePage = (page: number):void =>{
        console.log('==>', page, offset, page*offset);
        setPaginationState((prev) => ({
            ...prev,
            offset: page * prev.limit
        }))
    }

    const changeItemsPerPage = (limit: number) => {
        setPaginationState((prev) => ({
            ...prev,
            offset: 0,
            limit
        }));
    };

    useEffect(() => {
        handleRequest(() => getItems({limit, offset}))
            .then(data => {
                setPaginationState((prev) => {
                    return {
                        ...prev,
                        itemsCount: data.count,
                        isNext: limit * offset < data.count,
                        isPrev: offset > 0
                    };
                });
            });
    }, [limit, offset]);

    return {
        ...paginationState,
        nextPage,
        prevPage,
        changeItemsPerPage,
        changePage,
        isLoading,
        error,
        items: response?.items || []
    };
};