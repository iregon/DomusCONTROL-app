import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// export class Message {
//   public topic: string;
//   public message: string;

//   constructor(topic: string, message: string) {
//     this.message = message;
//     this.topic = topic;
//   }
// }

@Injectable()
export class DataService {

  // https://coryrylan.com/blog/angular-observable-data-services
  private _messages = new BehaviorSubject<string[]>([]);
  private dataStore: { messages: string[] } = { messages: [] }; // store our data in memory
  public readonly messages = this._messages.asObservable();

  constructor() { }

  // get messages() {
  //   return this._messages.asObservable();
  // }

  public update(topic: string, message: string): void {
    this.dataStore.messages[topic] = message;
    this._messages.next(Object.assign({}, this.dataStore).messages);
  }
}