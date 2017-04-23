import { Component } from '@angular/core';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.html',
})
export class SearchBar {
    public searchPhrase: string;

    constructor() {

    }

    public getResults() {
        console.log('s:', this.searchPhrase);
    }
}