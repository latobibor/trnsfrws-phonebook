import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Contact } from '../models/contact.interface';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

const backendHost = 'http://localhost:8080';

@Injectable()
export class ContactsApiService {
    private newContactAddedSubject: Subject<{}>;

    constructor(private http: Http) {
        this.newContactAddedSubject = new Subject();
    }

    public search(name: string, phoneNumber: string): Promise<Contact[]> {
        return this.http.get(`${backendHost}/search/${name}/${phoneNumber}`)
                        .map(this.extractData)
                        .toPromise();
    }

    public getAllContacts(): Promise<Contact[]> {
        return this.http.get(`${backendHost}/contacts`)
                        .map(this.extractData)
                        .toPromise();
    }

    public addContact(contact: Contact): Promise<void> {
        return this.http
            .put(`${backendHost}/contact`, JSON.stringify(contact))
            .toPromise()
            .then(() => {
                this.newContactAddedSubject.next();
            });
    }

    public get newContactAdded(): Observable<{}> {
        return this.newContactAddedSubject;
    }

    private extractData(res: Response) {
        const body = res.json();
        return body;
    }
}