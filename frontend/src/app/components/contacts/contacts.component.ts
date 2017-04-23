import { Inject, Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact.interface';
import { ContactsApiService } from '../../services/contacts-api.service';

@Component({
  selector: 'contacts',
  templateUrl: './contacts.html',
})
export class Contacts implements OnInit {
  public visibleContacts: Contact[] = [];

  constructor(@Inject(ContactsApiService) private contactsApiService: ContactsApiService) {
    this.visibleContacts = [];
  }

  async ngOnInit(): Promise<void> {
    this.visibleContacts = await this.contactsApiService.getAllContacts();
  }
}