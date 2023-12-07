import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}
  goToContacts() {
    this.router.navigate(['/contacts']);
  }
  goHome() {
    this.router.navigate(['/']);
  }

  reload() {
    this.router.navigate(['about']);
  }

  wrongReload() {
    this.router.navigate(['about'], { relativeTo: this.route });
  }
}
