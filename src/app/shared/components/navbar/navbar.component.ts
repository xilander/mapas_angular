import { Component, inject, Type } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, tap } from 'rxjs';
import { routes } from '../../../app.routes';

@Component({
  selector: 'app-navbar',
  imports: [ RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  router = inject(Router);
  
  routes = routes.map( (route) => ({
    path: route.path,
    title:  `${route.title ?? 'Mapas en angular'}`,
  })).filter(route => route.path !== '**');

  pageTitle = toSignal(  this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map((event) => event.url),
    map((url) => routes.find(route => `/${route.path}` === url)?.title ?? 'Mapas en angular'),
    )
  );

  pageTitle$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    // tap((event) => console.log(event)),
    map((event) => event.url),
    map((url) => routes.find(route => `/${route.path}` === url)?.title ?? 'Mapas en angular'),
  );

}


