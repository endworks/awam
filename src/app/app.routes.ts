import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EventComponent } from './components/event/event.component';

const app_routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'events', component: HomeComponent },
  { path: 'events/:id/overview', component: EventComponent },
  { path: 'events/:id/schedule', component: EventComponent },
  { path: 'events/:id/tickets', component: EventComponent },
  { path: 'admin', component: HomeComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const app_routing = RouterModule.forRoot(app_routes);