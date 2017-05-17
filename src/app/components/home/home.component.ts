import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  events: Array<any>;

  constructor(public db: DatabaseService) {
    this.events = [];
    this.db.events.subscribe(
      (data) => {
        this.events = data;
        console.log(data);
      }
    );
  }

  ngOnInit() {
  }

}
