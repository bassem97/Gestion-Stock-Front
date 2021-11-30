import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class WebSocketAPIService {
  private remoteMonitoringCompSource = new Subject<any>();
  // Observable string streams
  remoteMonitoringComp = this.remoteMonitoringCompSource.asObservable();
  webSocketEndPoint = environment.url+ '/ws';
  topic = '/topic/greetings';
  stompClient: any;
  constructor() {
  }
  _connect() {
    console.log("hnee2");
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    this.stompClient.debug = null;
    const thisService = this;
    thisService.stompClient.connect({}, function(frame) {
      thisService.stompClient.subscribe(thisService.topic, function(sdkEvent) {
        thisService.onMessageReceived(sdkEvent);
      });
      // _this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);
  }

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this._connect();
    }, 5000);
  }
  _send(message) {
    this.stompClient.send('/app/hello', {}, JSON.stringify(message));
  }

  onMessageReceived(message) {
    this.remoteMonitoringCompSource.next(message);
  }

getRemoteMonitoring(): any {
    return this.remoteMonitoringCompSource;
}
}
