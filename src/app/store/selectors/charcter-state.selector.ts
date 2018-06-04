import { createSelector } from "@ngrx/store";
import { ICharactersState } from "../reducers/characters-state.reducer";
import { ICharacterListState } from "../reducers/characters-list-state.reducer";
import { CharacterModel } from "../model/character.model";
import { ICharacterSelectedState } from "../reducers/character-selected-state.reducer";

export const getCharactersState = (state: any) => state.charactersState || {};
export const getCharactersListState = createSelector(
    getCharactersState,
    (state: ICharactersState): ICharacterListState => {
        return state.characterListState || {} as ICharacterListState;
    });

export const getCharactersList = createSelector(
    getCharactersListState,
    (state: ICharacterListState): CharacterModel[] => {
        return state.entites || [] as CharacterModel[];
    }
);

export const getPagination = createSelector(
    getCharactersListState,
    (state: ICharacterListState) => {
        return state.pagination || {};
    }
);

export const getCharacterSelectedState = createSelector(
    getCharactersState,
    (state: ICharactersState): ICharacterSelectedState => {
        return state.characterSelectedState || {} as ICharacterSelectedState;
    });

export const getCharacterSelected = createSelector(
    getCharacterSelectedState,
    (state: ICharacterSelectedState): CharacterModel => {
        return state.data || {} as CharacterModel;
    });