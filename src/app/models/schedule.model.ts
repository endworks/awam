import { Activity } from './activity.model'

export class ScheduleDay{
  start: Date;
  end:Date;
  //both should be set to the same day in local time
  activities: Activity[];
  loadFromDatabase(db: Object){
    this.start = new Date(db['start']);
    this.end = new Date(db['end']);
    this.activities = [];
    for(let zone in db['activities']){
      for(let dbActivity of db['activities'][zone]){
        /** 7/future version
        var type = dbActivity['type']
        if(type == 'tournament') var activity = new Tournament();
        else if(type == 'guest') var activity = new Guest();
        else var activity = new Activity(); */
        let activity = new Activity();
        activity.loadFromDatabase(dbActivity);
        activity.zone = zone;
        this.activities.push(activity);
      }
    }
  }
}
