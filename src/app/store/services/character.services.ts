import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CharacterModel } from '../model/character.model';
import { PaginationModel } from '../../common/components/pagination/pagination.model';

@Injectable()
export class CharacterServices {

  constructor(private http: HttpClient) { }

  public getCharacterList(payload?: { query?: string, pagination?: PaginationModel }) {
    let query = '';
    if (payload.query) {
      query = '?q=' + payload.query;
    }
    if (payload.pagination) {
      const { limit, current } = payload.pagination;
      query = (query ? query + '&' : '?') + `_limit=${limit}&_page=${current}`;
    }

    return this.http.get('http://localhost:3000/characters' + query, { observe: 'response' });
  }

  public getCharacterDetails(id) {
    return this.http.get('http://localhost:3000/characters?id=' + id);
  }

  public saveCharacter(value: CharacterModel) {
    return this.http.post('http://localhost:3000/characters', value);
  }
  public delete(value: CharacterModel) {
    return this.http.delete('http://localhost:3000/characters/' + value.id);
  }

  public getSpeciesList() {
    return this.http.get('http://localhost:3000/species');
  }

}
