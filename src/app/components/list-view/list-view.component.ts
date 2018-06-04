import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CharacterModel } from '../../store/model/character.model';
import { Store } from '@ngrx/store';
import { CharacterActions } from '../../store/actions/characters.action';
import { getCharactersList, getPagination } from '../../store/selectors/charcter-state.selector';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DataGridColumnModel } from '../../common/components/data-grid/data-grid-column.model';

@Component({
  selector: 'sl-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  public characters$: Observable<CharacterModel[]>;
  public pagination$: Observable<any>;
  public searchQuery: string = null;

  public columns: DataGridColumnModel[] = [];

  constructor(
    private store: Store<any>,
    private characterActions: CharacterActions,
    private router: Router) { }

  ngOnInit() {
    this.characters$ = this.store.select(getCharactersList);
    this.pagination$ = this.store.select(getPagination);
    this.store.dispatch(this.characterActions.load.init());

    this.columns = <DataGridColumnModel[]>[{
      header: 'Id',
      field: 'id',
      styleClass: 'th'
    }, {
      header: 'Name',
      field: 'name'
    }, {
      header: 'Species',
      field: 'species'
    }, {
      header: 'Gender',
      field: 'gender'
    }, {
      header: 'Homeworld',
      field: 'homeworld'
    }];
  }

  public handleEdit(character: CharacterModel) {
    this.router.navigate(['list-view', character.id, 'edit']);
  }

  public handleRemove(character: CharacterModel) {
    this.store.dispatch(this.characterActions.setPagination({ current: 1 }));
    this.store.dispatch(this.characterActions.delete.init({ id: character.id, query: this.searchQuery }));
  }

  public handleSearchChange(value: string) {
    this.searchQuery = value;
    this.store.dispatch(this.characterActions.setPagination({ current: 1 }));
    this.store.dispatch(this.characterActions.load.init({ query: value }));
  }

  public handlePageChange(page) {
    this.store.dispatch(this.characterActions.setPagination({ current: page }));
    this.store.dispatch(this.characterActions.load.init({ query: this.searchQuery }));
  }

}
