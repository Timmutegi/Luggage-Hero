import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { fadeInAnimation, slideInAnimation } from './route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // animations: [ fadeInAnimation, slideInAnimation ]
})
export class AppComponent {
  title = 'Morbags';

  constructor(public router: Router, public route: ActivatedRoute) {}

  prepareRoute(outlet: RouterOutlet) {
  return outlet && outlet.activatedRouteData && outlet.activatedRouteData.state;
}
}
