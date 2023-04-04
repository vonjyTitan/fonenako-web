
export interface Pageable<T> {
    content: T[];

    currentPage: number;

    totalPage: number;

    pageSize: number;
}