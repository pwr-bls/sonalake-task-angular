import { createSelector } from "@ngrx/store";
import { ICharactersState } from "../reducers/characters-state.reducer";
import { ICharacterListState } from "../reducers/characters-list-state.reducer";
import { CharacterModel } from "../model/character.model";
import { ISpeciesListState } from "../reducers/species-state.reducer";

export const getSpeciesState = (state: any) => state.speciesState || {};
export const getSpeciesListState = createSelector(
    getSpeciesState,
    (state: any): ISpeciesListState => {
        return state.speciesListState || {} as ISpeciesListState;
    });

export const getSpeciesList = createSelector(
    getSpeciesState,
    (state: ISpeciesListState) : string[] => {
        return state.entites || [] as string[];
    }
);