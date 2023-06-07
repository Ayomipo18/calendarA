export class PagedResponse<T> {
    public status: number;
    public message: string;
    public data: T;
    public meta: Meta;

    constructor(status: number, message: string, data: T, meta: Meta) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.meta = meta;
    }
}

export class Meta {
    public nextPage : number | null;
    public previousPage: number | null;
    public totalPages: number;
    public pageSize: number;
    public total: number;

    constructor(nextPage: number | null, previousPage: number | null, totalPages: number, pageSize: number, total: number) {
        this.nextPage = nextPage;
        this.previousPage = previousPage;
        this.totalPages = totalPages;
        this.pageSize = pageSize;
        this.total = total;
    }
}