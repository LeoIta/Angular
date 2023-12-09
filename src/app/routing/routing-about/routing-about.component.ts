import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-routing-about',
  templateUrl: './routing-about.component.html',
  styleUrls: ['./routing-about.component.css'],
})
export class RoutingAboutComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  city = 'Warsaw';
  country = 'Poland';
  hasPermissions = 'none';
  userType = 'unknown';

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.city = params['city'] || 'Warsaw';
      this.country = params['country'] || 'Poland';
    });
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.hasPermissions =
        queryParams['logged'] === 'true' && queryParams['role'] === 'admin'
          ? 'has permissions'
          : 'does not have the needed permissions';
    });
    this.route.fragment.subscribe(
      (fragment: any) => (this.userType = fragment)
    );
  }

  onLogOut() {
    this.router.navigate(['/about'], {
      queryParams: { logged: false, role: 'admin' },
      fragment: 'user',
    });
  }
}
