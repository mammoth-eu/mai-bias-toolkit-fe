export interface Page {
   index: number;
   label: number;
}
export interface PagingRequest {
   page: number;
   size: number;
   filter?: Filter;
   order?: Order;
}

export interface PagingResponse<T> {
   items: T[];
   totalItems: number;
   hasNextPage: boolean;
}

export interface FilterItem {
   name: string;
}

export interface SingleValueFilterItem extends FilterItem {
   value: any;
}

export interface Filter {
   singleValueFilterItems: SingleValueFilterItem[];
}

export interface Order {
   property: string;
   isAsc: boolean;
}
export interface PagingResponse<T> {
   items: T[];
   totalItems: number;
   hasNextPage: boolean;
}
