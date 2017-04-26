import { SearchBar } from "./search-bar.component";

describe('SearchBar', function () {
    let searchBar: SearchBar;

    beforeEach(function () {
        searchBar = new SearchBar();
    });

    it('should call resultCallBack with name and phone number', function () {
        const testName = 'Tivadar';
        const testPhoneNumber = '123';
        let result = { name: '', phoneNumber: '' };
        searchBar.resultCallback = (parameters: any) => { result = parameters };

        searchBar.searchNumber = testPhoneNumber;
        searchBar.searchPhrase = testName;
        searchBar.getResults();

        expect(result.name).toEqual(testName);
        expect(result.phoneNumber).toEqual(testPhoneNumber);
    });
});
