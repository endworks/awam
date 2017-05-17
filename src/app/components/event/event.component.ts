import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html'
})
export class EventComponent implements OnInit {
  id: number;
  event: any;

  constructor(public db: DatabaseService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    })
    this.db.events.subscribe(
      (data) => {
        this.event = data[this.id];
        console.log(data[this.id]);
      }
    );
  }

  ngOnInit() {
  }

}
