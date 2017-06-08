import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Event } from '../../models/event.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  events: Array<Event>;
  upcomingEvents: Array<Event>;

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

        let date = new Date();
        this.upcomingEvents = this.events.sort((event1, event2) => {
                            var a = event1.schedule[0].start.getTime();
                            var b = event2.schedule[0].start.getTime();
                            if (a < b) {
                              return -1;
                            } else if (a > b) {
                              return 1;
                            } else {
                              return 0;
                            }
                          }).filter(event => {
                            return (event.schedule[0].start > date)
                          });
      }
    );
  }

}
