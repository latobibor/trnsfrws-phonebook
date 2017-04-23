import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Contact } from '../models/contact.interface';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

const backendHost = 'http://localhost:8080';

@Injectable()
export class ContactsApiService {
    constructor(private http: Http) {
    }

    public searchByName(name: string): Promise<Contact[]> {
        return this.http.get(`${backendHost}/search/${name}`)
                        .map(this.extractData)
                        .toPromise();
    }

    public getAllContacts(): Promise<Contact[]> {
        return this.http.get(`${backendHost}/contacts`)
                        .map(this.extractData)
                        .toPromise();
    }

    public addContact(contact: Contact): Promise<Response> {
        return this.http.put(`${backendHost}/contact`, JSON.stringify(contact)).toPromise();
    }

    private extractData(res: Response) {
        const body = res.json();
        return body;
    }
}