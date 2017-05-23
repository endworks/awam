import { User } from './user.model'

export class Review{
  id: number;
  user: User;
  title: string;
  content: string;
  date: Date;
  rating: number;
  loadFromDatabase(db:Object){
    this.rating = db['rating'];
    this.content = db['text'];
    this.user = new User(db['user']);
    this.date = new Date(db['date']);
  }
}
