import { Price } from './price.model';

export class Activity{
  title: string;
  tags: string[];
  description: string;
  price: Price;
  inscription_necessary: boolean;
  zone: string;
  start: Date;
  end: Date;
  type: string; //Tournament, Guest, Talk, etc
  loadFromDatabase(db : Object){
    this.description = db['description'];
    this.inscription_necessary = db['inscription_necessary'];
    this.start = new Date(db['start']);
    this.end = new Date(db['end']);
    this.tags = db['tags'];
    this.title = db['title'];
    this.type = db['type'];

    this.rules = db['rules'];
    this.prizes = db['prize'];
  }
  rules: string;
  prizes: string[];
}

export class Tournament extends Activity {
  rules: string;
  prizes: string[];
  type = 'tournament';
}

export class Guest extends Activity {
  guestName: string;
  type = 'guest';
}
