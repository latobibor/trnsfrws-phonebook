import { Inject, Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../../models/contact.interface';
import { ContactsApiService } from '../../services/contacts-api.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'contacts',
  templateUrl: './contacts.html',
})
export class Contacts implements OnInit, OnDestroy {
  public contacts: Contact[] = [];
  public searchCallback: Function;
  private newContactAdded: Subscription;

  constructor(@Inject(ContactsApiService) private contactsApiService: ContactsApiService) {
    this.contacts = [];
    this.searchCallback = this.search.bind(this);
    this.newContactAdded = this.contactsApiService.newContactAdded.subscribe(this.loadContacts.bind(this));
  }

  public async ngOnInit(): Promise<void> {
    this.loadContacts();
  }

  public ngOnDestroy(): void {
    this.newContactAdded.unsubscribe();
  }

  public async search({ name = '', phoneNumber = '' }): Promise<void> {
    console.log('eee', name, phoneNumber);
    this.contacts = await this.contactsApiService.search(name, phoneNumber);
  }

  private async loadContacts() {
    this.contacts = await this.contactsApiService.getAllContacts();
  }
}
