import * as mqtt from 'mqtt';
import { IClientOptions } from 'mqtt';
import { Output, EventEmitter, Injectable } from '@angular/core';
import { Message } from './Message';

@Injectable()
export class MqttService {

    private client: mqtt.Client;

    @Output() onConnect: EventEmitter<any> = new EventEmitter();
    @Output() onMessageArrived: EventEmitter<Message> = new EventEmitter();
    @Output() onError: EventEmitter<any> = new EventEmitter();

    constructor() {}

    public connect(options: IClientOptions) {
        this.client = mqtt.connect(options);
        this.client.on('connect', () => this.onConnect.emit());
        this.client.on('message', (topic, message) => {
            this.onMessageArrived.emit(new Message(topic.toString(), message.toString()))
        });
        this.client.on('error', error => this.onError.emit(error));
    }

    public subscribe(topic: string): void {
        this.client.subscribe(topic);
    }

    public isConnected() {
        return this.client !== undefined;
    }

    public publish(topic: string, message: string, retain: boolean = false) {
        console.log("Publish msg\ntopic: " + topic + "\nmessage: " + message);
        
        this.client.publish(topic.toString(), message.toString(), {qos: 1, retain: retain});
    }
}
