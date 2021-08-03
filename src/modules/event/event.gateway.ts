import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WsResponse,
} from '@nestjs/websockets';

@WebSocketGateway({ transports: ['websocket'] })
export class EventGateway
  extends Logger
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor() {
    super('events');
  }

  public afterInit() {
    super.log('wss initialized');
  }

  public handleConnection() {
    super.log('ws client connected');
  }

  public handleDisconnect() {
    super.log('ws client disconnected');
  }

  sendEvent(event: string, data: any): WsResponse<any> {
    return { event, data };
  }
}
