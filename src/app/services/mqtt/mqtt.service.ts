import * as mqtt from 'mqtt';
import { IClientOptions } from 'mqtt';
import { DataService } from '../data/data.service';

export class MqttService {

    private client: mqtt.Client;
    private onSuccess: () => any;
    private onMessageArrived: (topic: string, message: string, dataService: DataService) => any;
    
    constructor(private dataService: DataService) {}

    connect(options: IClientOptions) {
        this.client = mqtt.connect(options);
        this.client.on('connect', () => this.onSuccess());
        // this.client.on('connect', () => console.log("Connected"));
        this.client.on('message', (topic, message) => this.onMessageArrived(topic, message.toString(), this.dataService));
        this.client.on('error', error => console.log(error.message));
    }

    setOnSuccess(onSuccess: () => any) {
        this.onSuccess = onSuccess;
    }

    setOnMessageArrived(onMessageArrived: (topic: string, message: string, dataService: DataService) => any): void {
        this.onMessageArrived = onMessageArrived;
    }

    subscribe(topic: string): void {
        this.client.subscribe(topic);
    }

    isConnected() {
        return this.client !== undefined;
    }
}
