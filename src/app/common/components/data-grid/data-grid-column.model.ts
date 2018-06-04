export class DataGridColumnModel {
    public field: string;
    public header: string;
    public sortable: boolean;
    public scope: string;

    constructor(options: {
        field?: string,
        header?: string,
        scope?: string,
        sortable?: boolean,
    } = {}) {
        options = options || {};
        this.field = options.field || null;
        this.header = options.header || null;
        this.header = options.scope || 'col';
        this.sortable = options.sortable || false;
    }
}