import { Pipe, PipeTransform } from '@angular/core';
import { Event } from '../models/event.model';

@Pipe({
  name: 'upcomingEvents'
})
export class UpcomingEventsPipe implements PipeTransform {

  transform(events: Array<Event>, date?: Date): Array<Event> {
    return events;
    // if(!date){
    //   date = new Date();
    // }
    // return events.sort((event1, event2) => {
    //                     return (event1.schedule[0].start.getTime() -
    //                             event2.schedule[0].start.getTime())
    //                           }).filter(event =>
    //                                    (event.schedule[event.schedule.length-1].start < date));
  }

}
