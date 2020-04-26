import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { MqttService } from 'src/app/services/mqtt/mqtt.service';

@Component({
  selector: 'mqtt-range',
  templateUrl: './mqtt-range.component.html',
  styleUrls: ['./mqtt-range.component.scss'],
})
export class MqttRangeComponent implements OnInit {

  public model: string = '0';

  private _statusTopic: string = '';
  
  @Input()
  set statusTopic(statusTopic: string) {
    this._statusTopic = statusTopic;
  }

  private _commandTopic: string = '';
  
  @Input()
  set commandTopic(commandTopic: string) {
    this._commandTopic = commandTopic;
  }

  private _maxValue = '';

  @Input()
  set maxValue(maxValue: string) {
    this._maxValue = maxValue;
  }

  get maxValue() {
    return this._maxValue;
  }

  private _minValue = '';

  @Input()
  set minValue(minValue: string) {
    this._minValue = minValue;
  }

  get minValue() {
    return this._minValue;
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
          this.model = msg[this._statusTopic];
        },
        err => console.log("ERR: " + err),
        () => console.log("COMPLETE"));
  }

  public onChange() {
    if(this.lastIsMqtt) {
      this.lastIsMqtt = !this.lastIsMqtt;
    }
    else {
      this.mqttService.publish(this._commandTopic, this.model);
    }
  }
}
