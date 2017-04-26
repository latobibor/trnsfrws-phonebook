import { Contacts } from './contacts.component';
import { Contact } from '../contact/contact.component';
import { SearchBar } from '../search-bar/search-bar.component';
import { AddContact } from '../add-contact/add-contact.component';
import { ContactList } from '../contact-list/contact-list.component';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ContactsApiService } from '../../services/contacts-api.service';

import { Subject } from 'rxjs/Subject';

describe('Contacts', function () {
    let contactsComponent: Contacts;
    let apiMock: any;

    beforeEach(async(function () {
        apiMock = {
            getAllContacts: jasmine.createSpy('getAllContacts'),
            search: jasmine.createSpy('search'),
            newContactAdded: new Subject()
        };

        TestBed
        .configureTestingModule({
            imports: [ FormsModule ],
            declarations: [ 
                Contact,
                Contacts,
                SearchBar,
                AddContact,
                ContactList
            ]
        })
        .overrideComponent(Contacts, {
            set: {
                providers: [{ provide: ContactsApiService, useValue: apiMock }]
            }
        })
        .compileComponents();
    }));

    beforeEach(function () {
        const testFixture = TestBed.createComponent(Contacts);
        contactsComponent = testFixture.componentInstance;
    });

    it('should call API getAllContacts when a new contact is added', function () {
        apiMock.newContactAdded.next();
        expect(apiMock.getAllContacts).toHaveBeenCalled();
    });

    it('should call API getAllContacts when initialized', function () {
        contactsComponent.ngOnInit();
        expect(apiMock.getAllContacts).toHaveBeenCalled();
    });

    it('should call API search when search is called', function () {
        const searchObject = {
            name: 'Dezső',
            phoneNumber: '123456'
        };

        contactsComponent.search(searchObject)
        expect(apiMock.search).toHaveBeenCalledWith(searchObject.name, searchObject.phoneNumber);
    });

    it('should unsubscribe from newContactAdded when destroyed so new events will not trigger getAllContacts calls', function () {
        apiMock.newContactAdded.next();
        expect(apiMock.getAllContacts.calls.count()).toEqual(1);
        
        contactsComponent.ngOnDestroy();
        apiMock.newContactAdded.next();
        
        expect(apiMock.getAllContacts.calls.count()).toEqual(1);
    });
});
