import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class DatabaseService {
  events: FirebaseListObservable<any[]>;

  constructor(db: AngularFireDatabase) {
    this.events = db.list('events');
  }

  loadEvents() {

  }
}
