//TODO:
//make the calendar load better (create empty space while it loads?)
//optimize
import { Component, AfterViewChecked, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarComponent } from 'ap-angular2-fullcalendar'
import { Event } from '../../models/event.model'
import { subMonths, addMonths } from 'date-fns'

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
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.css']
})
export class EventCalendarComponent implements AfterViewChecked  {

  @Input() events: Array<Event>;
  viewDate: Date = new Date();
  resetDate: Date = new Date();
  activeDayIsOpen: boolean = false;
  monthSelectorActivated = false;
  yearSelectorActivated = false;
  yearsAndMonths: Array<Year> = [];
  currentYear: string;
  resetYear: string;
  currentMonth: number;
  calendarOptions: Object = {
    height: '600px',
    fixedWeekCount : true,
    header: false,
    firstDay: 1,
    eventLimit: true, // allow "more" link when too many events
    eventLimitClick: "popover",
    events: [],
    eventClick: function(event){
      if (event.id) {
        this.router.navigate(['/events', event.id, 'overview']);
      }
    }
  }

  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;

  constructor(
    private router: Router
  ) {
    this.currentMonth = this.viewDate.getMonth()
    this.currentYear = this.viewDate.getFullYear().toString();
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
    this.calendarOptions['events'] = [];
    for(let event of this.events){
      for(let interval of event.consecutiveDays()){
        let calendarEvent = {
          start: interval.start,
          end: interval.end,
          title: event.name,
          id: Number(event.id)}
        this.calendarOptions['events'].push(calendarEvent);
      }
      this.myCalendar.fullCalendar('removeEventSources');
      this.myCalendar.fullCalendar('addEventSource', this.calendarOptions['events']);

      //this makes it possible to have a number-of-events-in-month property:
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
  previousMonth(){
    this.myCalendar.fullCalendar('prev');
    this.viewDate = subMonths(this.viewDate, 1);
  }
  nextMonth(){
    this.myCalendar.fullCalendar('next');
    this.viewDate = addMonths(this.viewDate, 1);
  }
  gotoDate(date: Date){
    this.myCalendar.fullCalendar('gotoDate', date);
    this.viewDate = date;
  }
}
