import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // https://coryrylan.com/blog/angular-observable-data-services
  private _messages = new BehaviorSubject<string[]>([]);
  private dataStore: { messages: string[] } = { messages: [] }; // store our data in memory
  public readonly messages = this._messages.asObservable();
  
  constructor() { 
    //this.update("hello", "world");
  }

  public update(topic: string, message: string): void {
    this.dataStore.messages[topic] = message;    
    this._messages.next(this.dataStore.messages);
  }
}