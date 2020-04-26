import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomPageRoutingModule } from './room-routing.module';

import { RoomPage } from './room.page';
import { MqttToggleComponent } from 'src/app/components/mqtt-toggle/mqtt-toggle.component' 
import { MqttRangeComponent } from 'src/app/components/mqtt-range/mqtt-range.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoomPageRoutingModule
  ],
  declarations: [
    RoomPage, 
    MqttToggleComponent,
    MqttRangeComponent
  ]
})
export class RoomPageModule {}
