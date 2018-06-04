import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import { PaginationModel } from './pagination.model';

@Component({
    selector: 'sl-pagination',
    templateUrl: './pagination.component.html'
})
export class PaginationComponent {
    public pages: Array<number> = [];
    @Output() onChangePage = new EventEmitter();
    private searchField: string = '';
    private searchFieldControlSub: Subscription;
    constructor() { }
    public pagination: PaginationModel;
    public handlePageChange(event) {
        this.onChangePage.emit(event);
    }

    @Input()
    public set setPagination(value: PaginationModel) {
        this.pagination = value;
        this.pages = [];
        let i = 0;
        while (i * this.pagination.limit < this.pagination.total) {
            this.pages.push(i + 1);
            i++;
        }
    };

    public disablePrevious() {
        return !(this.pagination.current - 1 >= 1);
    }

    public disableNext() {
        return !(this.pagination.current * this.pagination.limit < this.pagination.total);
    }
}
