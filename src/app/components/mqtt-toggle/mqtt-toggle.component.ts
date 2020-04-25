import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'mqtt-toggle',
  templateUrl: './mqtt-toggle.component.html',
  styleUrls: ['./mqtt-toggle.component.scss'],
  //providers: [DataService]
})
export class MqttToggleComponent implements OnInit {

  public model = false;

  private _topic: string = '';
  
  @Input()
  set topic(topic: string) {
    this._topic = topic
  }

  constructor(
    private dataService: DataService) {
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
}
