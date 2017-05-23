import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { Event } from '../../models/event.model'

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html'
})
export class EventComponent implements OnInit {
  id: number;
  event: Event;

  constructor(public db: DatabaseService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    })
    this.db.events.subscribe(
      (data) => {
        this.event = new Event();
        this.event.loadFromDatabase(this.id, data[this.id]);
        console.log(data[this.id]);
        console.log(this.event);
      }
    );
  }

}
