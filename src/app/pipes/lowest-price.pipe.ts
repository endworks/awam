//TODO:
//implement currency rates
//update locale
import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Ticket } from './../models/ticket.model';
import { Price } from './../models/price.model';

@Pipe({
  name: 'lowestPrice'
})
export class LowestPricePipe implements PipeTransform {
  transform(tickets: Ticket[]): any {
    var lowestPrice = new Price(Infinity, 'EUR');
    var free = true;
      for(let ticket of tickets){
        if(ticket.price.currency == 'EUR'){
          if(ticket.price.value < lowestPrice.value){
            var lowestPrice = ticket.price;
          }
          if(free){
            if(ticket.price.value != 0){
              free = false;
            }
          }
        }
      }
    if(free){
      return 'Free';
    }
    return "From "+ new CurrencyPipe('en-us').transform(lowestPrice.value, lowestPrice.currency, true);
  }

}
