import { Injectable } from "@angular/core";
import { Actions, Effect } from '@ngrx/effects';
import { CharacterActions, IAction } from "../actions/characters.action";
import { CharacterServices } from "../services/character.services";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import { Router } from "@angular/router";
import { SpeciesActions } from "../actions/species.action";

@Injectable()
export class SpeciesEffects {
    constructor(
        private actions$: Actions,
        private actions: SpeciesActions,
        private services: CharacterServices,
        private router: Router
    ) { }

    @Effect() load$ = this.actions$
        .ofType(SpeciesActions.load.types.INIT)
        .switchMap(({payload}: IAction) => this.services.getSpeciesList()
            .map((response) => this.actions.load.success(response))
            .catch(() => Observable.of({ type: 'load$' }))
        );
}