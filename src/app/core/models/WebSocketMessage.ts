export class WebSocketMessage {
  socketMessage: string;
  objectId: number;


  constructor(socketMessage: string, objectId: number) {
    this.socketMessage = socketMessage;
    this.objectId = objectId;
  }
}

