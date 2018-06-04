import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'sl-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent implements OnInit, OnDestroy {
  @Input() public labelText: string = 'Search';
  @Input() public placeholderText: string = null;
  @Output() public onChange: EventEmitter<string> = new EventEmitter<string>();
  public searchFieldControl = new FormControl();

  private searchField: string = '';
  private searchFieldControlSub: Subscription;
  constructor() { }

  ngOnInit() {
    this.placeholderText = this.placeholderText || this.labelText
    this.searchFieldControlSub = this.searchFieldControl.valueChanges
      .debounceTime(200)
      .subscribe((value) => {
        this.onChange.emit(value);
      });
  }
  ngOnDestroy() {
    this.searchFieldControlSub.unsubscribe();
  }

}
