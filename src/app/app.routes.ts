import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EventComponent } from './components/event/event.component';

const app_routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'events', component: HomeComponent },
  { path: 'events/:id/overview', component: EventComponent },
  { path: 'events/:id/schedule', component: EventComponent },
  { path: 'events/:id/location', component: EventComponent },
  { path: 'events/:id/reviews', component: EventComponent },
  { path: 'events/:id/gallery', component: EventComponent },
  { path: 'admin', component: HomeComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

export const app_routing = RouterModule.forRoot(app_routes);
