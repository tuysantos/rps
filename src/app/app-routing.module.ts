import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RpsContainer } from './rps/rps.container';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RpsContainer
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
