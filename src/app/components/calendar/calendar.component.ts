//TODO:
//make monthSelector be able to change between years
import { Component, AfterViewChecked , Input } from '@angular/core';
import { Event } from '../../models/event.model'
import { Subject } from 'rxjs/Subject';
import { EventColor, CalendarEvent, WeekDay, MonthView, MonthViewDay } from 'calendar-utils';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

interface Month {
  name: string;
  numberOfEvents: number;
  date: Date;
  year: number;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements AfterViewChecked  {

  @Input() events: Array<Event>;
  calendarEvents: CalendarEvent[] = [];
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  monthSelectorActivated = false;
  months: Array<Month[]> = [];
  currentYear: string;

  constructor() {
    this.currentYear = new Date().getFullYear().toString();
    this.initializeYear(this.currentYear);
  }

  ngAfterViewChecked() {
    for(let year in this.months){
      for(let month of this.months[year]){
        month.numberOfEvents = 0;
      }
    }
    this.calendarEvents = [];
    for(let event of this.events){
      for(let day of event.schedule){
        let calendarEvent: CalendarEvent = {
          start: day.start,
          end: day.end,
          title: event.name,
          color: colors.red}
        this.calendarEvents.push(calendarEvent);
      }
      let day = event.schedule[0].start;
      let year = day.getFullYear()
      if(!(year in this.months)){
        this.initializeYear(year);
      }
      this.months[year][day.getMonth()].numberOfEvents += 1;
    }

  }

  initializeYear(year: number|string){
    year = year.toString()
    this.months[year] = [];
    for(let index in monthNames){
      let month = {
        name: monthNames[index],
        numberOfEvents: 0,
        year: year,
        date: new Date(Number(year), Number(index), 1, 0, 0, 0)
      }
      this.months[year].push(month)
    }
  }
}
