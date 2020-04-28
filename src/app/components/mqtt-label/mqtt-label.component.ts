import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { MqttService } from 'src/app/services/mqtt/mqtt.service';

@Component({
  selector: 'mqtt-label',
  templateUrl: './mqtt-label.component.html',
  styleUrls: ['./mqtt-label.component.scss'],
})
export class MqttLabelComponent implements OnInit {

  private _model = '';

  get model() {
    return this._model;
  }

  private _statusTopic = '';

  @Input()
  set statusTopic(statusTopic: string) {
    this._statusTopic = statusTopic;
  }

  private _prefix = '';

  @Input()
  set prefix(prefix: string) {
    this._prefix = prefix;
  }

  get prefix() {
    return this._prefix;
  }

  private _suffix = '';

  @Input()
  set suffix(suffix: string) {
    this._suffix = suffix;
  }

  get suffix() {
    return this._suffix;
  }

  // True if the last model change is occurred due to cause
  // a MQTT message 
  private lastIsMqtt: boolean = false;

  constructor(
    private dataService: DataService,
    private mqttService: MqttService) { 
      console.log(this._prefix+ " "+ this._model+ " " + this._suffix);
    }

  ngOnInit() {
    this.dataService.messages.subscribe(
      msg => {
        this.lastIsMqtt = true;
        this._model = msg[this._statusTopic];
      },
      err => console.log("ERR: " + err),
      () => console.log("COMPLETE"));
    
    this.lastIsMqtt = false;
  }

}
