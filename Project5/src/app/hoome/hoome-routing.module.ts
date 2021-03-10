import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HoomePage } from './hoome.page';

const routes: Routes = [
  {
    path: '',
    component: HoomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HoomePageRoutingModule {}
