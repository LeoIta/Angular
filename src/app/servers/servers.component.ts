import { Component } from '@angular/core';
import { Server } from '../server.model';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent {
  servers = [new Server('server1', true), new Server('server2', false)];

  getServerStatus(serverName: string): boolean {
    return this.servers.filter((server) => server.name === serverName)[0]
      .online;
  }
}
