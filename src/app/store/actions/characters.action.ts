import { Action } from '@ngrx/store';
import { CharacterModel } from '../model/character.model';
import { Injectable } from '@angular/core';

export interface IAction<P = any> extends Action {
  readonly type: string;
  readonly payload?: P;
}

export class CharacterActions {

  public static load = {
    types: {
      INIT: '[APP] LOAD_CHARACTERS_INIT',
      FAILURE: '[APP] LOAD_CHARACTERS_FAILURE',
      SUCCESS: '[APP] LOAD_CHARACTERS_SUCCESS',
    },

    init: (payload?): IAction => ({
      type: CharacterActions.load.types.INIT,
      payload
    }),

    failure: (payload): IAction => ({
      type: CharacterActions.load.types.FAILURE,
      payload
    }),

    success: (payload): IAction => ({
      type: CharacterActions.load.types.SUCCESS,
      payload
    })
  };

  public static save = {
    types: {
      INIT: '[APP] ADD_CHARACTERS_INIT',
      FAILURE: '[APP] ADD_CHARACTERS_FAILURE',
      SUCCESS: '[APP] ADD_CHARACTERS_SUCCESS',
    },

    init: (payload?): IAction => ({
      type: CharacterActions.save.types.INIT,
      payload
    }),

    failure: (payload): IAction => ({
      type: CharacterActions.save.types.FAILURE,
      payload
    }),

    success: (payload): IAction => ({
      type: CharacterActions.save.types.SUCCESS,
      payload
    })
  }

  public static delete = {
    types: {
      INIT: '[APP] DELETE_CHARACTERS_INIT',
      FAILURE: '[APP] DELETE_CHARACTERS_FAILURE',
      SUCCESS: '[APP] DELETE_CHARACTERS_SUCCESS',
    },

    init: (payload?): IAction => ({
      type: CharacterActions.delete.types.INIT,
      payload
    }),

    failure: (payload): IAction => ({
      type: CharacterActions.delete.types.FAILURE,
      payload
    }),

    success: (payload): IAction => ({
      type: CharacterActions.delete.types.SUCCESS,
      payload
    })
  }

  public static select = {
    types: {
      INIT: '[APP] SELECT_CHARACTERS_INIT',
      FAILURE: '[APP] SELECT_CHARACTERS_FAILURE',
      SUCCESS: '[APP] SELECT_CHARACTERS_SUCCESS',
    },

    init: (payload?): IAction => ({
      type: CharacterActions.select.types.INIT,
      payload
    }),

    failure: (payload): IAction => ({
      type: CharacterActions.select.types.FAILURE,
      payload
    }),

    success: (payload): IAction => ({
      type: CharacterActions.select.types.SUCCESS,
      payload
    })
  }

  public static setPagination = "[APP] SET_PAGINATION";

  public get delete() {
    return CharacterActions.delete;
  }

  public get save() {
    return CharacterActions.save;
  }
  
  public get load() {
    return CharacterActions.load;
  }
  
  public get select() {
    return CharacterActions.select;
  }

  public setPagination(payload): IAction {
    return {
      type: CharacterActions.setPagination,
      payload
    }
  }
}
