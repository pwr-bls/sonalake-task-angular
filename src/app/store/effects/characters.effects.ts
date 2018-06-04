import { Injectable } from "@angular/core";
import { Actions, Effect } from '@ngrx/effects';
import { CharacterActions, IAction } from "../actions/characters.action";
import { CharacterServices } from "../services/character.services";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/withLatestFrom';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { PaginationModel } from "../../common/components/pagination/pagination.model";
import { getPagination } from "../selectors/charcter-state.selector";

@Injectable()
export class CharactersEffects {
    constructor(
        private actions$: Actions,
        private actions: CharacterActions,
        private services: CharacterServices,
        private router: Router,
        private store: Store<any>
    ) { }

    @Effect() load$ = this.actions$
        .ofType(CharacterActions.load.types.INIT)
        .withLatestFrom(this.store.select(getPagination))
        .switchMap(([{ payload }, pagination]: [IAction, PaginationModel]) =>
            this.services.getCharacterList({ ...payload, pagination })
                .mergeMap((response) => {
                    return [
                        this.actions.load.success(response.body),
                        this.actions.setPagination({
                            ...pagination,
                            total: parseInt(response.headers.get('X-Total-Count'), 10)
                        })
                    ];
                }))
        .catch(() => Observable.of({ type: 'load$' }));

    @Effect() select$ = this.actions$
        .ofType(CharacterActions.select.types.INIT)
        .switchMap(({ payload }: IAction) =>
            this.services.getCharacterDetails(payload)
                .map((response) => {
                    return this.actions.select.success(response[0])                    
                }))
        .catch(() => Observable.of({ type: 'load$' }));

    @Effect() save$ = this.actions$
        .ofType(CharacterActions.save.types.INIT)
        .switchMap(({ payload }: IAction) => this.services.saveCharacter(payload)
            .map((response) => this.actions.save.success(response))
            .catch(() => Observable.of({ type: 'save$' }))
        );

    @Effect() afterSave$ = this.actions$
        .ofType(CharacterActions.save.types.SUCCESS)
        .switchMap(({ payload }: IAction) => {
            this.router.navigate(['list-view']);
            return Observable.of({ type: 'afterSave' });
        });

    @Effect() delete$ = this.actions$
        .ofType(CharacterActions.delete.types.INIT)
        .switchMap(({ payload }: IAction) => this.services.delete(payload)
            .mergeMap((response) => { return [
                this.actions.delete.success(payload),
                this.actions.load.init(payload)
            ]})
            .catch(() => Observable.of({ type: 'delete$' }))
        );
}