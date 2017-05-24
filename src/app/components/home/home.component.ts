import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Event } from '../../models/event.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  events: Array<Event>;

  constructor(public db: DatabaseService) { }

  ngOnInit() {
    this.events = [];
    this.db.events.subscribe(
      (data) => {
        console.log(data)
        for(let i in data){
          let event = new Event();
          event.loadFromDatabase(Number(i), data[i]);
          this.events.push(event);
        }
        console.log(this.events);
      }
    );
  }

}
