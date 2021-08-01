import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ transports: ['websocket'] })
export class EventGateway extends Logger implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor() {
    super();
  }

  @WebSocketServer()
  private wss: Server;

  public afterInit() {
    super.log('wss initialized');
  }

  public handleConnection() {
    super.log('ws client connected');

  }

  public handleDisconnect() {
    super.log('ws client disconnected');
  }

  sendEvent(event: string, data: any) {
    return { event, data }
  }
}