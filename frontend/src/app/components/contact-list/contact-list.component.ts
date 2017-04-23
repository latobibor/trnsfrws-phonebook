import { Component } from '@angular/core';

@Component({
  inputs: [ 'visibleContacts' ],
  selector: 'contact-list',
  templateUrl: './contact-list.html',
})
export class ContactList {
}