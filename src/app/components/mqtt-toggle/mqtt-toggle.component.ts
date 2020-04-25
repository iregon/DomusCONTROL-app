import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { MqttService } from 'src/app/services/mqtt/mqtt.service';

@Component({
  selector: 'mqtt-toggle',
  templateUrl: './mqtt-toggle.component.html',
  styleUrls: ['./mqtt-toggle.component.scss'],
  //providers: [DataService]
})
export class MqttToggleComponent implements OnInit {

  public model: boolean = false;

  private _topic: string = '';

  // True if the last model change is occurred due to cause
  // a MQTT message 
  private lastIsMqtt: boolean = false;
  
  @Input()
  set topic(topic: string) {
    this._topic = topic
  }

  constructor(
    private dataService: DataService,
    private mqttService: MqttService) {
    }

  ngOnInit() {    
    this.dataService.messages.subscribe(
        msg => {
          if(msg[this._topic] == "1") this.model = true;
          else this.model = false
        },
        err => console.log("ERR: " + err),
        () => console.log("COMPLETE"));
  }

  public onChange() {
    if(this.lastIsMqtt) {
      this.lastIsMqtt = !this.lastIsMqtt;
    }
    else {
      //this.dataService.update(this._topic, this.model==true ? "1": "0");
      this.mqttService.publish(this._topic, this.model==true ? "1": "0")
    }
  }
}
