import { Component, OnInit, Input } from '@angular/core';
import { ScheduleDay } from '../../../models/schedule.model'

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html'
})
export class DatesComponent implements OnInit {

  @Input() schedule: Array<ScheduleDay>;

  constructor() { }

  ngOnInit() {
  }

}
