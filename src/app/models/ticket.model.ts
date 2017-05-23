import { Price } from './price.model';

export class Ticket{
    id: number;
    name: string;
    type: string; //Free, Day, Pass, Other
    price: Price;
    loadFromDatabase(db:Object){
      this.name = db['name']
      this.type = db['type']
      this.price = new Price(db['amount'], db['currency'], db['description']);
    }
}
