import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/elements/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { EventComponent } from './components/event/event.component';

import { DatabaseService } from './services/database.service';

import { app_routing } from './app.routes';
import { environment } from './environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { SafePipe } from './pipes/safe.pipe';
import { FooterComponent } from './components/elements/footer/footer.component';
import { ReviewsComponent } from './components/event/reviews/reviews.component';
import { TicketsComponent } from './components/event/tickets/tickets.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    EventComponent,
    SafePipe,
    FooterComponent,
    ReviewsComponent,
    TicketsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    app_routing,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [DatabaseService, AngularFireDatabase],
  bootstrap: [AppComponent]
})



export class AppModule { }
