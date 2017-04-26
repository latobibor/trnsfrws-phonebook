import { Component } from '@angular/core';
import componentToggler from '../../utilities/component-toggler';

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
        Object.assign(this, componentToggler);
    }

    public getResults() {
        this.resultCallback({ name: this.searchPhrase, phoneNumber: this.searchNumber });
    }
}