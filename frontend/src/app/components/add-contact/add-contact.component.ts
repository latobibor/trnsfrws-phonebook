import { Component, Inject } from '@angular/core';
import { ContactsApiService } from '../../services/contacts-api.service';

@Component({
  selector: 'add-contact',
  templateUrl: './add-contact.html',
})
export class AddContact {
    public name: string = '';
    public phoneNumber: string = '';

    constructor(@Inject(ContactsApiService) private contactsApiService: ContactsApiService) {
    }

    public onSubmit() {
      this.contactsApiService.addContact({
        name: this.name,
        phoneNumber: this.phoneNumber
      });
    }
}
