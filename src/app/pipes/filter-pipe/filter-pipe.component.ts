import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-pipe',
  templateUrl: './filter-pipe.component.html',
  styleUrls: ['./filter-pipe.component.css'],
})
export class FilterPipeComponent {
  filterName = '';
  filterTeam = '';
  filterNum = '';
  sortByKey = 'name';

  players: Player[] = [
    { name: 'Roberto', team: 'Lions', num: '10' },
    { name: 'Roberto', team: 'Lions', num: '9' },
    { name: 'Franco', team: 'Lions', num: '10' },
    { name: 'Fabrizio', team: 'Gemini', num: '10' },
    { name: 'Roberto', team: 'Lions', num: '8' },
    { name: 'Franco', team: 'Gemini', num: '10' },
    { name: 'Roberto', team: 'Gemini', num: '8' },
    { name: 'Fabrizio', team: 'Dogs', num: '9' },
    { name: 'Roberto', team: 'Cats', num: '8' },
    { name: 'Roberto', team: 'Dogs', num: '10' },
  ];
}

export type Player = { name: string; team: string; num: string };
