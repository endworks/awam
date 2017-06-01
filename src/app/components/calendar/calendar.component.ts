//TODO:
//make events clickable
//optimize
import { Component, AfterViewChecked , Input } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../../models/event.model'
import { Subject } from 'rxjs/Subject';
import { EventColor, CalendarEvent, WeekDay, MonthView, MonthViewDay } from 'calendar-utils';
import { isSameDay } from 'date-fns';

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

interface Year {
  year: number,
  months: Month[],
  numberOfEvents: number
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
  resetDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  activeDayIsOpen: boolean = false;
  monthSelectorActivated = false;
  yearSelectorActivated = false;
  yearsAndMonths: Array<Year> = [];
  currentYear: string;
  resetYear: string;
  eventIdDict: Array<string> = [];

  constructor(
    private router: Router
  ) {
    this.currentYear = new Date().getFullYear().toString();
    this.resetYear = this.currentYear;
    this.initializeYear(this.currentYear);
  }

  ngAfterViewChecked() {
    for(let year of this.yearsAndMonths){
      if(year){
        for(let month of year.months){
          month.numberOfEvents = 0;
        }
      year.numberOfEvents = 0;
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
        this.eventIdDict[event.name] = event.id;
      }
      let alreadyAdded: Array<boolean> = [];
      for(let scheduleDay of event.schedule){
        let day = scheduleDay.start;
        let month = day.getMonth()
        let year = day.getFullYear()
        if(!(month in alreadyAdded)){
          this.initializeYear(year);
          this.yearsAndMonths[year].months[month].numberOfEvents += 1;
          alreadyAdded[month] = true;
        }
        if(!(year in alreadyAdded)){
          this.initializeYear(year);
          this.yearsAndMonths[year].numberOfEvents += 1;
          alreadyAdded[year] = true;
        }
      }
    }

  }

  dayClicked({date, events}: {date: Date, events: Array<CalendarEvent>}): void{
    if((isSameDay(date, this.viewDate) && this.activeDayIsOpen == true)
      || events.length == 0){
      this.activeDayIsOpen = false;
    } else {
      this.activeDayIsOpen = true;
      this.viewDate = date;
    }
  }

  handleEvent(event: CalendarEvent){
    let id = this.eventIdDict[event.title];
    this.router.navigate(['/events', id, 'overview'])
  }

  initializeYear(year: number|string){
    if(year in this.yearsAndMonths){
      return undefined
    }
    year = year.toString()
    this.yearsAndMonths[year] = {
      year: Number(year),
      months: [],
      numberOfEvents: 0
    }
    for(let index in monthNames){
      let month = {
        name: monthNames[index],
        numberOfEvents: 0,
        year: year,
        date: new Date(Number(year), Number(index), 1, 0, 0, 0)
      }
      this.yearsAndMonths[year].months.push(month)
    }
  }

  yearRange(year : number|string){
    year = Number(year);
    let list = [];
    for(let i = year-4; i <= year+4; i++){
      if(!(i.toString() in this.yearsAndMonths)){
        this.initializeYear(i.toString())
      }
      list.push(this.yearsAndMonths[i.toString()]);
    }
    return list;
  }
  previousYear(){
    this.currentYear = (Number(this.currentYear)-1).toString();
    this.initializeYear(this.currentYear);
  }
  nextYear(){
    this.currentYear = (Number(this.currentYear)+1).toString();
    this.initializeYear(this.currentYear);
  }
}
