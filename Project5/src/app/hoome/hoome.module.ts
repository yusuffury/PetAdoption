import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HoomePageRoutingModule } from './hoome-routing.module';

import { HoomePage } from './hoome.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HoomePageRoutingModule
  ],
  declarations: [HoomePage]
})
export class HoomePageModule {}
