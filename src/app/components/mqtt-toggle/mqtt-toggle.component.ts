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

  private _statusTopic: string = '';
  
  @Input()
  set statusTopic(statusTopic: string) {
    this._statusTopic = statusTopic
  }

  private _commandTopic: string = '';
  
  @Input()
  set commandTopic(commandTopic: string) {
    this._commandTopic = commandTopic
  }

  private _highValue = '';

  @Input()
  set highValue(highValue: string) {
    this._highValue = highValue
  }

  private _lowValue = '';

  @Input()
  set lowValue(lowValue: string) {
    this._lowValue = lowValue
  }

  // True if the last model change is occurred due to cause
  // a MQTT message 
  private lastIsMqtt: boolean = false;

  constructor(
    private dataService: DataService,
    private mqttService: MqttService) {
    }

  ngOnInit() {    
    this.dataService.messages.subscribe(
        msg => {
          this.lastIsMqtt = true;
          if(msg[this._statusTopic] == "1") this.model = true;
          else this.model = false
        },
        err => console.log("ERR: " + err),
        () => console.log("COMPLETE"));
    this.lastIsMqtt = false;
  }

  public onChange() {
    if(this.lastIsMqtt) {
      this.lastIsMqtt = !this.lastIsMqtt;
    }
    else {
      this.mqttService.publish(this._commandTopic, this.model==true ? this._highValue : this._lowValue)
    }
  }
}
