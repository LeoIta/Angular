import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-routing-about',
  templateUrl: './routing-about.component.html',
  styleUrls: ['./routing-about.component.css'],
})
export class RoutingAboutComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  city = 'Warsaw';
  country = 'Poland';

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.city = params['city'] || 'Warsaw';
      this.country = params['country'] || 'Poland';
    });
  }
}
