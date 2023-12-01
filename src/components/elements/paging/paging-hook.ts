import { Filter, FilterItem, Order, Page, PagingRequest, PagingResponse, SingleValueFilterItem } from "./model";
import { useEffect, useState } from "react";

export interface PagingHandler<T> {
    pages: Page[] | undefined,
    currentPage: Page,
    response: PagingResponse<T> | undefined,
    previousPage: () => void,
    nextPage: () => void,
    gotoPage: (idx: number) => void,
    filter: (filter: SingleValueFilterItem) => void,
    removeFilter: (name: string) => void,
    filters: (filters: SingleValueFilterItem[]) => void,
    reset: (to: number) => void,
    hasOrder: (property: string) => Order | undefined,
    sort: (property: string) => void,
    isLoading: boolean,
    hasItems: boolean,
    reload: () => void
    execute: () => void
    totalItems: number,
    pageRequest: PagingRequest,
    findFilter: any,
    set: (fun: (items: T[]) => void) => void
}

export const usePaging = <T>(
    loader: (request: PagingRequest) => Promise<any>,
    transformer: (response: any, request: PagingRequest) => PagingResponse<T>,
    pageSize: number,
    initialPage: number = -1
): PagingHandler<T> | undefined => {
    const defaultRequest: PagingRequest = {page: initialPage, size: pageSize};
    const [pages, setPages] = useState<Page[]>();
    const [pageRequest, setPageRequest] = useState<PagingRequest>({...defaultRequest});
    const [response, setResponse] = useState<PagingResponse<T>>();
    const [isLoading, setIsLoading] = useState(false)

    const toaster = console;

    const initPages = (totalItems: number) => {
        let pages = [];
        if (totalItems > pageSize) {
            const numberOfPages = Math.ceil(totalItems / pageSize);
            for (let i = 0; i < numberOfPages; i++) {
                pages.push({index: i, label: i + 1});
            }
        } else {
            pages.push({index: 0, label: 1});
        }
        return pages;
    };

    const loadData = () => {
        if (pageRequest.page === -1) {
            return;
        }
        setIsLoading(true)
        loader(pageRequest)
            .then((response: any) => {
                return transformer(response, pageRequest)
            })
            .then((response: PagingResponse<T>) => {
                setResponse(response);
                setPages(initPages(response.totalItems));
            })
            .catch((err: any) => {
                if (!!toaster && !!toaster.error && !!err)toaster.error(err);
            })
            .finally(() => {
                setIsLoading(false)
            })
    };

    useEffect(() => {
        if (pageRequest.page > -1) {
            loadData();
        }
    }, [pageRequest]);

    const reset = (to: number) => {
        const toPage = isNaN(to) ? initialPage : to;

        setPageRequest({...defaultRequest, page: toPage});
        setResponse(undefined);
        setPages(undefined);
    };

    const execute = () => {
        const copy: PagingRequest = JSON.parse(JSON.stringify(pageRequest));
        copy.filter = undefined;
        copy.page = 0;
        setPageRequest(copy)
    };

    const handlePageChange = (newPageIndex: number) => {
        setPageRequest({...pageRequest, page: newPageIndex});
    };

    const handlePreviousPage = () => {
        if (pageRequest && pageRequest.page > 0)
            handlePageChange(pageRequest.page - 1)
    };

    const handleNextPage = () => {
        if (pageRequest && pages && pageRequest.page < pages.length - 1)
            handlePageChange(pageRequest.page + 1)
    };

    const hasItems = () => {
        return !!response && !!response.items && response.items.length > 0;
    };

    const reload = () => {
        loadData();
    };

    // is loading when you request page 0 and there are not any data yet
    // const isLoading = (): boolean => {
    //     return pageRequest.page > -1 && !response;
    // };

    const filters = (filters: SingleValueFilterItem[]) => {
        const r: PagingRequest = {...pageRequest};
        r.page = 0;
        r.size = pageSize;

        if (!r.filter) {
            r.filter = new class implements Filter {
                singleValueFilterItems: SingleValueFilterItem[] = []
            };
        }
        filters.forEach(f => {
            const item: SingleValueFilterItem = findOrCreate(r.filter!.singleValueFilterItems, f.name);
            item.value = f.value;
        });
        setPageRequest(r);
    };

    const filter = (filter: SingleValueFilterItem) => {
        const r: PagingRequest = {...pageRequest};
        r.page = 0;
        r.size = pageSize;

        if (!r.filter)
            r.filter = new class implements Filter {
                singleValueFilterItems: SingleValueFilterItem[] = [];
            };

        const item: SingleValueFilterItem = findOrCreate(r.filter.singleValueFilterItems, filter.name);
        item.value = filter.value;

        setPageRequest(r);
    };

    const removeFilter = (name: string) => {
        if (!!pageRequest.filter && pageRequest.filter.singleValueFilterItems) {
            const r: PagingRequest = {...pageRequest};
            const idx = r.filter!.singleValueFilterItems.findIndex(s => s.name === name);
            if (idx > -1) r.filter!.singleValueFilterItems.splice(idx, 1);
            setPageRequest(r);
        }
    };

    const findFilter = (name: string) => {
        if (!!pageRequest.filter && pageRequest.filter.singleValueFilterItems) {
            return pageRequest.filter.singleValueFilterItems.find(f => f.name === name);
        }
        return null;
    };


    const sort = (property: string) => {
        const r: PagingRequest = {...pageRequest};
        r.page = 0;
        r.size = pageSize;

        if (!r.order || r.order.property !== property) {
            r.order = {
                isAsc: true,
                property: property
            }
        } else if (r.order.property === property) {
            r.order.isAsc = !r.order.isAsc;
        }

        setPageRequest(r);
    };

    const hasOrder = (property: string): Order | undefined => {
        return pageRequest.order && pageRequest.order.property === property ? pageRequest.order : undefined;
    };

    const findOrCreate = <FILTER extends FilterItem>(arr: FILTER[], name: string): FILTER => {
        const index = arr.findIndex(i => i.name === name);
        if (index > -1) return arr[index];

        const item = <FILTER>{name: name};
        arr.push(item);
        return item;
    };

    const set = (fun: (items: T[]) => void) => {
        if (!response) {
            return
        }
        const copy: PagingResponse<T> = {...response};
        if (!!copy) {
            fun(copy.items);
        }
        setResponse(copy);
    }

    return {
        pages: pages,
        currentPage: pageRequest ? {index: pageRequest.page, label: pageRequest.page + 1} : {index: 0, label: 1},
        response: response,
        previousPage: handlePreviousPage,
        nextPage: handleNextPage,
        gotoPage: handlePageChange,
        filter,
        removeFilter: removeFilter,
        filters,
        reset: reset,
        hasOrder: hasOrder,
        sort: sort,
        isLoading: isLoading,
        hasItems: hasItems(),
        reload: reload,
        execute: execute,
        totalItems: !!response ? response.totalItems : 0,
        pageRequest: pageRequest,
        findFilter: (name: string) => findFilter(name),
        set: set
    };
}

export default usePaging;
