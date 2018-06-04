import * as characterList from './characters-list-state.reducer';
import * as characterSelected from './character-selected-state.reducer';
import { ActionReducer, combineReducers } from '@ngrx/store';

const reducers = {
    characterListState: characterList.reducer,
    characterSelectedState: characterSelected.reducer
};

export interface ICharactersState {
    characterListState: characterList.ICharacterListState,
    characterSelectedState: characterSelected.ICharacterSelectedState
}

export const reducer: ActionReducer<ICharactersState> = combineReducers(reducers);