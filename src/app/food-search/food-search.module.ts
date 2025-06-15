import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodSearchPage } from './food-search.page';

const routes: Routes = [
  {
    path: '',
    component: FoodSearchPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FoodSearchPage
  ]
})
export class FoodSearchPageModule {}
