import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListViewComponent } from './components/list-view/list-view.component';
import { LiveViewEditItemComponent } from './components/list-view/edit-item/edit-item.component';

const routes: Routes = [
  {
    path: '',
    component: ListViewComponent
  },
  {
    path: 'list-view',
    component: ListViewComponent
  },
  {
    path: 'list-view/create',
    component: LiveViewEditItemComponent
  },
  {
    path: 'list-view/:id/edit',
    component: LiveViewEditItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
