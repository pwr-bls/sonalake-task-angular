import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataGridColumnModel } from './data-grid-column.model';
import { PaginationModel } from '../pagination/pagination.model';

@Component({
  selector: 'sl-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataGridComponent {
  @Input() public columns: DataGridColumnModel[] = [];
  @Input() public actions: boolean = false;
  @Input() public value: any[] = [];
  @Input() public paginator: boolean = false;
  @Input() public pagination: PaginationModel = new PaginationModel();
  @Input() public rows: number = null;
  @Input() public totalRecords: number = null;
  @Input() public sortField: string = null;
  @Input() public sortOrder: string = null;
  @Output() public onRemove = new EventEmitter();
  @Output() public onEdit = new EventEmitter();
  @Output() public onChangePage = new EventEmitter();

  constructor() { }

  public handleEdit(event) {
      this.onEdit.emit(event);
  }

  public handleRemove(event) {
    this.onRemove.emit(event);
  }

  public handlePageChange(event) {
    console.log(event);
    this.onChangePage.emit(event);
  }
}
