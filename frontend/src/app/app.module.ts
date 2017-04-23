import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AddContact } from './components/add-contact/add-contact.component';
import { Contacts } from './components/contacts/contacts.component';
import { ContactList } from './components/contact-list/contact-list.component';
import { Contact } from './components/contact/contact.component';
import { SearchBar } from './components/search-bar/search-bar.component';

import { ContactsApiService } from './services/contacts-api.service';

import { AppComponent } from './main-container/app.component';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    HttpModule
    ],
  declarations: [ 
    AppComponent,
    AddContact,
    Contacts,
    Contact,
    ContactList,
    SearchBar
  ],
  providers: [ ContactsApiService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
