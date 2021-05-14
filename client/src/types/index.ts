export type PaginationOptions = {
    offset: number,
    limit: number
}

export type PaginationResponse<T> = {
    items: T[],
    count: number
}