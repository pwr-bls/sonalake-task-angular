import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { IAction } from './characters.action';

export class SpeciesActions {

  public static load = {
    types: {
      INIT: '[APP] LOAD_SPECIES_INIT',
      FAILURE: '[APP] LOAD_SPECIES_FAILURE',
      SUCCESS: '[APP] LOAD_SPECIES_SUCCESS',
    },

    init: (): IAction => ({
      type: SpeciesActions.load.types.INIT
    }),

    failure: (payload): IAction => ({
      type: SpeciesActions.load.types.FAILURE,
      payload
    }),

    success: (payload): IAction => ({
      type: SpeciesActions.load.types.SUCCESS,
      payload
    })
  };

  public get load() {
    return SpeciesActions.load;
  }
}
