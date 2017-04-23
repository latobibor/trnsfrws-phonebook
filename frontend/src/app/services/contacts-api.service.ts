import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.interface';

@Injectable()
export class ContactsApiService {
    public contacts: Contact[] = []; 

    constructor() {
        this.fillupSomeRandomData();
    }

    public getAllContacts(): Promise<Contact[]> {
        return Promise.resolve(this.contacts);
    }

    public searchByName(name: string): Promise<Contact[]> {
        return Promise.resolve(this.contacts.filter(x => x.name.indexOf(name) > -1));
    }

    private fillupSomeRandomData() {
        this.contacts.push({
            id: '123',
            name: 'asdfasdf',
            phoneNumber: '2134 34545'
        });
        
        this.contacts.push({
            id: '54',
            name: 'ASD',
            phoneNumber: '134 34545'
        });

        this.contacts.push({
            id: '45656',
            name: 'EKG',
            phoneNumber: '34 34545'
        });
    }
}