import { Review } from './review.model';
import { Ticket } from './ticket.model';
import { PhysicalLocation } from './physical-location.model';
import { Activity } from './activity.model';
import { DatabaseService } from '../services/database.service';
import { ScheduleDay } from './schedule.model';
import { Price } from './price.model'

export class Event{
  id: number;
  cover: string;
  name: string;
  description: string;
  slug: string;
  pricing: string; //Paid, Free, Other
  tags: string[];
  reviews: Review[];
  tickets: Ticket[];
  ticketSeller: string;
  schedule: ScheduleDay[];
  location: PhysicalLocation;
  website: string;
  //WIP:
  //photos: Photo[];

  loadFromDatabase(id:number, db: any){

    this.id = id;
    this.cover = db['cover'];
    this.name = db['name'];
    this.description = db['description'];
    if(db.hasOwnProperty('slug')){
      this.slug = db['slug'];
    } else {
      this.slug = this.name.toLowerCase().replace(/\W+/g, '');
    }
    //regex removes non-alphanumeric characters
    this.location = new PhysicalLocation();
    this.location.loadFromDatabase(db['location']);
    this.website = db['website'];
    this.tags = db['tags'];
    this.ticketSeller = db['ticket_seller'];

    this.reviews = [];
    for (let i in db['reviews']){
      let dbReview = db['reviews'][i];
      let review = new Review();
      review.loadFromDatabase(dbReview);
      review.id = Number(i)
      this.reviews.push(review);
    }

    this.tickets = [];
    if('tickets' in db){
      for (let dbTicket of db['tickets']){
        let ticket = new Ticket();
        ticket.loadFromDatabase(dbTicket);
        this.tickets.push(ticket);
      }
    }

    this.schedule = [];
    if('schedule' in db){
      for (let dbSchedule of db['schedule']){
        let schedule_day = new ScheduleDay();
        schedule_day.loadFromDatabase(dbSchedule);
        this.schedule.push(schedule_day);
      }
    }
  }
}
