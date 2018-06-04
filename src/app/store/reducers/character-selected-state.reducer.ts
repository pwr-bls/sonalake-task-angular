import { CharacterActions, IAction } from "../actions/characters.action";
import { CharacterModel } from "../model/character.model";

export interface ICharacterSelectedState {
    loading: boolean;
    failure: boolean;
    success: boolean;
    data: CharacterModel;
};

export const initialState: ICharacterSelectedState = {
    loading: false,
    failure: false,
    success: false,
    data: null,
};

export const reducer = (state: ICharacterSelectedState = initialState, action: IAction): ICharacterSelectedState => {
    switch (action.type) {
        case CharacterActions.select.types.INIT:
            return {
                ...initialState,
                loading: true
            };
        case CharacterActions.select.types.SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                data: action.payload
            };

        case CharacterActions.delete.types.SUCCESS:
            return {
                ...state,
                data: null
            };

        default:
            return state;
    }
}