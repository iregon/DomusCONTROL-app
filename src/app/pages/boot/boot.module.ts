import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BootPageRoutingModule } from './boot-routing.module';

import { BootPage } from './boot.page';
import { ConfigService } from 'src/app/services/config/config.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BootPageRoutingModule
  ],
  declarations: [BootPage],
  providers: [ConfigService]
})
export class BootPageModule {}
