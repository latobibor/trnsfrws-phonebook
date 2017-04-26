import { AddContact } from './add-contact.component';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ContactsApiService } from '../../services/contacts-api.service';

describe('AddContact', function () {
    let addContactComponent: AddContact;
    let apiMock: any;

    beforeEach(async(() => {
        apiMock = {
            addContact: jasmine.createSpy('apiMock')
        };

        TestBed
        .configureTestingModule({
            imports: [ FormsModule ],
            declarations: [ AddContact ]
        })
        .overrideComponent(AddContact, {
            set: {
                providers: [{ provide: ContactsApiService, useValue: apiMock }]
            }
        })
        .compileComponents();
    }));

    beforeEach(function () {
        const testFixture = TestBed.createComponent(AddContact);
        addContactComponent = testFixture.componentInstance;
    });

    it('should call resultCallBack with name and phone number', function () {
        addContactComponent.onSubmit();
    });
});
