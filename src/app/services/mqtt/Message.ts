export class Message {

    private _topic: string;

    public get topic(): string {
        return this._topic;
    }

    public set topic(value: string) {
        this._topic = value;
    }

    private _message: string;

    public get message(): string {
        return this._message;
    }

    public set message(value: string) {
        this._message = value;
    }

    // private _senderId: string;

    // public get senderId(): string {
    //     return this._senderId;
    // }

	constructor(topic: string, message: string) {
        this._topic = topic;
        this._message = message;
	}
    
    public toString(): string {
        return this._topic + " " + this._message;
    }
}