import { Component } from '@angular/core';

@Component({
    inputs: [ 'resultCallback' ],
    selector: 'search-bar',
    templateUrl: './search-bar.html',
})
export class SearchBar {
    public searchPhrase: string;
    public resultCallback: Function;

    constructor() {
    }

    public getResults() {
        if (this.searchPhrase.length > 1) {
            this.resultCallback(this.searchPhrase);
        }
    }
}