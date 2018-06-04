import { CharacterActions, IAction } from "../actions/characters.action";
import { CharacterModel } from "../model/character.model";

export interface ICharacterListState {
    loading: boolean;
    failure: boolean;
    success: boolean;
    entites: CharacterModel[];
    pagination: {
        current: number,
        limit: number,
        total: number
    }
}

export const initialState: ICharacterListState = {
    loading: false,
    failure: false,
    success: false,
    entites: [],
    pagination: {
        current: 1,
        limit: 10,
        total: 10
    }
};

export const reducer = (state: ICharacterListState = initialState, action: IAction): ICharacterListState => {
    switch (action.type) {
        case CharacterActions.load.types.INIT:
            return {
                ...initialState,
                loading: true,
                entites: state.entites,
                pagination: state.pagination
            };
        case CharacterActions.load.types.SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                entites: action.payload
            };

        case CharacterActions.delete.types.SUCCESS:
            return {
                ...state,
                entites: state.entites.filter((character) => character.id !== action.payload.id)
            };

        case CharacterActions.setPagination:
            const { current, limit, total } = action.payload;
            return {
                ...state,
                pagination: {
                    current: current || state.pagination.current,
                    limit: limit || state.pagination.limit,
                    total: (total || total === 0) ? total : state.pagination.total
                }
            };

        default:
            return state;
    }
}