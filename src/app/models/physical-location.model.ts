class Coordinates{
  constructor(
    public lat: number,
    public lon: number){}
}

export class PhysicalLocation{
  administrative_area_level_1: string;
  administrative_area_level_2: string;
  coordinates: Coordinates;
  country: string;
  locality: string;
  postal_code: number;
  route: string;
  street_number: number;
  venue: string;
  loadFromDatabase(db: Object){
    this.administrative_area_level_1 = db['administrative_area_level_1']
    this.administrative_area_level_2 = db['administrative_area_level_2']
    this.country = db['country']
    this.locality = db['locality']
    this.postal_code = db['postal_code']
    this.route = db['route']
    this.street_number = db['street_number']
    this.venue = db['venue']
    this.coordinates =  new Coordinates(db['coordinates']['lat'],
                                        db['coordinates']['lon'])
  }
}
