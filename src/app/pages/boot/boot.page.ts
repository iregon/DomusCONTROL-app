import { Component } from '@angular/core';

import { ConfigService } from 'src/app/services/config/config.service';
import { IClientOptions } from 'mqtt';
import { MqttService } from 'src/app/services/mqtt/mqtt.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-boot',
  templateUrl: './boot.page.html',
  styleUrls: ['./boot.page.scss']
})
export class BootPage {
  // 0 = non eseguito, 1 = ok, 2 = errore
  networkConnectionState = 0;
  mqttBrokerConnectionState = 0;

  private config: any;

  constructor(
    // private connectionService: ConnectionService, 
    private router: Router, 
    private configService: ConfigService,
    private dataService: DataService,
    private mqttClient: MqttService,
    ) {
    this.checkConnection();
  }

  public checkConnection() : void {
    
    this.config = this.configService.getConfig();
    // Check network connection
    // this.connectionService.monitor().subscribe(isConnected => {
    //   if(isConnected) this.networkConnectionState = 1;
    //   else this.networkConnectionState = 2;
    // })
    if(navigator.onLine) this.networkConnectionState = 1;
    else this.networkConnectionState = 2;

    // Check MQTT broker connection if network connection is present
    if(this.networkConnectionState == 1) {
      const mqttClientId = "domuscontrol-app-" + uuid.v4();
      const options: IClientOptions = {
        hostname: this.config.project.mqttConnectionOptions.mqttBrokerAddress,
        port: Number(this.config.project.mqttConnectionOptions.mqttBrokerWebsocketPort),
        clientId: mqttClientId,
        username: this.config.project.mqttConnectionOptions.mqttUsername,
        password: this.config.project.mqttConnectionOptions.mqttPassword,
        protocol: 'wss'
      };

      // console.log(options);

      console.log('Connecting to broker...');

      this.mqttClient.onConnect.subscribe(() => {
        console.log("onSuccess");
        this.mqttBrokerConnectionState = 1;
        this.subscribeToStateTopics();
        this.router.navigate(['dashboard']);
      });

      this.mqttClient.onMessageArrived.subscribe((value) => {
        console.log("Msg arrived: " + value);
        
        const topic = value.split("#BR#")[0];
        const msg = value.split("#BR#")[1];        
        this.dataService.update(topic, msg);
      });

      this.mqttClient.connect(options);

      console.log('Connected to broker.');
    }
  }

  private subscribeToStateTopics() {
    this.config.project.floors.forEach(floor =>
      floor.rooms.forEach(room =>
        room.devices.forEach(device => {
          const topic = this.getDeviceTopic(floor.label, room.label, device)
          console.log(topic);
          this.mqttClient.subscribe(topic);
        })
      )
    );
  }

  private getDeviceTopic(floor: string, room: string, device: any): string {
    if(device.knx != undefined)
      return floor.replace(' ', '_') + '/' +
        room.replace(' ', '_') + '/' +
        device.label.replace(' ', '_') + '/' +
        device.knx.groupAddresses[0].addressStatus;
    else
      return device.statusTopic;
  }
}
