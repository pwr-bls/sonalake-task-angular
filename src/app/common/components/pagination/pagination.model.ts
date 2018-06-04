export class PaginationModel {
    public current: number;
    public limit: number;
    public total: number;

    constructor(options: {
        current?: number,
        limit?: number,
        total?: number
    } = {}) {
        options = options || {};
        this.current = options.current || 1;
        this.limit = options.limit || 10;
        this.total = options.total || 0;
    }
}