import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/app/services/config/config.service';
import { DataService } from 'src/app/services/data/data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-room',
    templateUrl: './room.page.html',
    styleUrls: ['./room.page.scss'],
    providers: [ConfigService]
})

export class RoomPage implements OnInit {

    private floorConfig: any;
    private roomConfig: any;

    private floorName: string;
    private roomName: string;

    private messages: Observable<string[]>;

    constructor(
        private config: ConfigService, 
        private route: ActivatedRoute,
        private dataService: DataService) {
    }

    ngOnInit() {
        this.floorName = this.route.snapshot.paramMap.get('floor');
        this.roomName = this.route.snapshot.paramMap.get('room');

        this.floorConfig = this.config.getConfig().project.floors.filter(floor => floor.label === this.floorName)[0];
        this.roomConfig = this.floorConfig.rooms.filter(room => room.label === this.roomName)[0];
        // console.log(this.roomConfig);
        this.subscribeToTopic();

        this.messages = this.dataService.messages;
    }

    public getRoomConfig() {
        return this.roomConfig;
    }

    public getFloorConfig() {
        return this.floorConfig;
    }

    private subscribeToTopic() {

    }

    public getTopic(floor: string, room: string, device): string {
        return floor.replace(' ', '_') + "/" + room.replace(' ', '_') + '/' + device.label + '/' + device.groupAddresses[0].addressStatus;
    }

    /**
     * getMessageBinding
     */
    public getMessageBinding(floor: string, room: string, device): Observable<string> {
        var topic: string = this.getTopic(floor, room, device)
        console.log(topic);
        return this.messages.pipe<string>(
            map<string[], string>(msgs => msgs[topic])
        );
    }
}
