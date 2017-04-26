import { Component } from '@angular/core';

@Component({
    inputs: [ 'resultCallback' ],
    selector: 'search-bar',
    templateUrl: './search-bar.html',
})
export class SearchBar {
    public searchPhrase: string;
    public searchNumber: string;
    public resultCallback: Function;

    constructor() {
    }

    public getResults() {
        this.resultCallback({ name: this.searchPhrase, phoneNumber: this.searchNumber });
    }
}