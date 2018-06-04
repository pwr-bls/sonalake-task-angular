import { IAction } from "../actions/characters.action";
import { SpeciesActions } from "../actions/species.action";

export interface ISpeciesListState {
    loading: boolean;
    failure: boolean;
    success: boolean;
    entites: string[];
}

export const initialState: ISpeciesListState = {
    loading: false,
    failure: false,
    success: false,
    entites: [],
};

export const reducer = (state: ISpeciesListState = initialState, action: IAction): ISpeciesListState => {
    switch (action.type) {
        case SpeciesActions.load.types.INIT:
            return {
                ...initialState,
                loading: true
            };
        case SpeciesActions.load.types.SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                entites: action.payload
            };

        default:
            return state;
    }
}
