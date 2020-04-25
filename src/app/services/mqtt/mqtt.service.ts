import * as mqtt from 'mqtt';
import { IClientOptions } from 'mqtt';
import { Output, EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class MqttService {

    private client: mqtt.Client;

    @Output() onConnect: EventEmitter<any> = new EventEmitter();
    @Output() onMessageArrived: EventEmitter<string> = new EventEmitter();
    @Output() onError: EventEmitter<any> = new EventEmitter();

    constructor() {}

    connect(options: IClientOptions) {
        this.client = mqtt.connect(options);
        this.client.on('connect', () => this.onConnect.emit());
        this.client.on('message', (topic, message) => {
            const value = topic + "#BR#" + message.toString();
            this.onMessageArrived.emit(value)
        });
        this.client.on('error', error => this.onError.emit(error));
    }

    subscribe(topic: string): void {
        this.client.subscribe(topic);
    }

    isConnected() {
        return this.client !== undefined;
    }
}
