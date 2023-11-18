import { Component } from '@angular/core';
import { Server } from '../server.model';

@Component({
  selector: 'app-string-interpolation',
  templateUrl: './string-interpolation.component.html',
  styleUrls: ['./string-interpolation.component.css'],
})
export class StringInterpolationComponent {
  isDisabled = false;

  servers = [new Server('server1', true), new Server('server2', false)];

  getServerStatus(serverName: string): boolean {
    return this.servers.filter((server) => server.name === serverName)[0]
      .online;
  }
}
