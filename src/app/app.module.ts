import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/elements/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { EventComponent } from './components/event/event.component';

import { DatabaseService } from './services/database.service';

import { app_routing } from './app.routes';
import { environment } from './environments/environment';

import { CalendarModule } from 'angular-calendar';
import { AgmCoreModule } from 'angular2-google-maps/core'
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { SafePipe } from './pipes/safe.pipe';
import { FooterComponent } from './components/elements/footer/footer.component';
import { ReviewsComponent } from './components/event/reviews/reviews.component';
import { TicketsComponent } from './components/event/tickets/tickets.component';
import { EventMapComponent } from './components/event/event-map/event-map.component';
import { GoogleMapsDirectionsDirective } from './directives/google-maps-directions.directive';
import { CalendarComponent } from './components/calendar/calendar.component';
//import { MapDirectionsComponent } from './components/map-directions/map-directions.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    EventComponent,
    SafePipe,
    FooterComponent,
    ReviewsComponent,
    TicketsComponent,
    EventMapComponent,
    GoogleMapsDirectionsDirective,
    CalendarComponent,
    //MapDirectionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    app_routing,
    AngularFireModule.initializeApp(environment.firebase),
    AgmCoreModule.forRoot(environment.gmaps),
    BrowserAnimationsModule,
    CalendarModule.forRoot()
  ],
  providers: [DatabaseService, AngularFireDatabase],
  bootstrap: [AppComponent]
})



export class AppModule { }
