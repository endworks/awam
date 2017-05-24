import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from '../../../models/ticket.model'

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  @Input() tickets: Array<Ticket>;
  @Input() ticketSeller: string;
  constructor() { }

  ngOnInit() {
  }

}
