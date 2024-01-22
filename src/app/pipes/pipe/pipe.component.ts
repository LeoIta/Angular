import { Component } from '@angular/core';
import { map, timer } from 'rxjs';

@Component({
  selector: 'app-pipe',
  templateUrl: './pipe.component.html',
  styleUrls: ['./pipe.component.css'],
})
export class PipeComponent {
  today = Date.now();
  asyncValue = timer(2000).pipe(
    map(() => {
      return 'You have wait 2 sec to see it';
    })
  );
}
