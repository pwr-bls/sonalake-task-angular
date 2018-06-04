import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { CharacterServices } from './store/services/character.services';
import { SearchFieldComponent } from './components/search-field/search-field.component';
import { CharactersEffects } from './store/effects/characters.effects';
import { StoreModule } from '@ngrx/store';
import { CharacterActions } from './store/actions/characters.action';
import * as charactersState from './store/reducers/characters-state.reducer';
import * as speciesState from './store/reducers/species-state.reducer';
import { LiveViewEditItemComponent } from './components/list-view/edit-item/edit-item.component';
import { SpeciesEffects } from './store/effects/species.effects';
import { SpeciesActions } from './store/actions/species.action';
import { PaginationComponent } from './common/components/pagination/pagination.component';
import { DataGridComponent } from './common/components/data-grid/data-grid.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    ListViewComponent,
    LiveViewEditItemComponent,
    SearchFieldComponent,
    PaginationComponent,
    DataGridComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot({
      charactersState: charactersState.reducer,
      speciesState: speciesState.reducer
    }),
    EffectsModule.forRoot([CharactersEffects, SpeciesEffects])
  ],
  providers: [
    HttpClient,
    CharacterServices,
    CharacterActions,
    SpeciesActions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
