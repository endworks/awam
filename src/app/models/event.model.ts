import { Review } from './review.model';
import { Ticket } from './ticket.model';
import { PhysicalLocation } from './physical-location.model';
import { Activity } from './activity.model';
import { DatabaseService } from '../services/database.service';
import { Schedule } from './schedule.model';

export class Event{
  id: number;
  name: string;
  slug: string;
  pricing: string; //Paid, Free, Other
  tags: string[];
  reviews: Review[];
  tickets: Ticket[];
  ticketSeller: string;
  schedule: Schedule[];
  location: PhysicalLocation;
  website: string;
  //WIP:
  //photos: Photo[];
  loadFromDatabase(id:number, db: Object){
    this.id = id;
    this.name = db['name'];
    if(db.hasOwnProperty('slug')){
      this.slug = db['slug'];
    }
    else this.slug = this.name.toLowerCase().replace(/\W+/g, '')
    //regex removes non-alphanumeric characters
    this.location = new PhysicalLocation();
    this.location.loadFromDatabase(db['location']);
    this.website = db['website'];
    this.tags = db['tags'];
    this.ticketSeller = db['ticket_seller'];

    this.reviews = [];
    for (let dbReview of db['reviews']){
       var review = new Review();
       review.loadFromDatabase(dbReview);
       this.reviews.concat(review);
    }

    this.tickets = [];
    for (let dbTicket of db['tickets']){
       var ticket = new Ticket();
       ticket.loadFromDatabase(dbTicket);
       this.tickets.concat(ticket);
    }

    this.schedule = [];
    for (let dbSchedule of db['schedule']){
       var schedule_day = new Schedule();
       schedule_day.loadFromDatabase(dbSchedule);
       this.schedule.concat(schedule_day);
    }

  }
}
