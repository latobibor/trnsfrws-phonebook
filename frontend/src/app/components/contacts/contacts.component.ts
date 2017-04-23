import { Inject, Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact.interface';
import { ContactsApiService } from '../../services/contacts-api.service';

@Component({
  selector: 'contacts',
  templateUrl: './contacts.html',
})
export class Contacts implements OnInit {
  public contacts: Contact[] = [];
  public searchCallback: Function;

  constructor(@Inject(ContactsApiService) private contactsApiService: ContactsApiService) {
    this.contacts = [];
    this.searchCallback = this.searchByName.bind(this);
  }

  public async ngOnInit(): Promise<void> {
    this.contacts = await this.contactsApiService.getAllContacts();
  }

  public async searchByName(name: string): Promise<void> {
    this.contacts = await this.contactsApiService.searchByName(name);
  }
}