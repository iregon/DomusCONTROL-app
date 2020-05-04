import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomPageRoutingModule } from './room-routing.module';

import { RoomPage } from './room.page';
import { MqttToggleComponent } from 'src/app/components/mqtt/mqtt-toggle/mqtt-toggle.component' 
import { MqttRangeComponent } from 'src/app/components/mqtt/mqtt-range/mqtt-range.component';
import { MqttLabelComponent } from 'src/app/components/mqtt/mqtt-label/mqtt-label.component';

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
    MqttRangeComponent,
    MqttLabelComponent
  ]
})
export class RoomPageModule {}
