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
    this.title = db['title'];
    this.content = db['content'];
    this.user = new User(db['user_id']);
    this.date = new Date(db['date']);
  }
}
