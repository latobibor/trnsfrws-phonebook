const expect = require('expect');
const sinon = require('sinon');

const db = require('../in-memory-db');

const name = 'Béla';
const phoneNumber = '1234569009';

// This is basically an integration test, since I am not recreating a blank DB before every test
describe('In Memory Database', function () {
  before(function () {
    db.addContact({
        name,
        phoneNumber
    });
  });

  describe('Search', function () {
    it('should return result when only name was supplied', function () {
      const result = db.search({ name });
      expect(result[0].name).toEqual(name);
    });

    it('should return result when only phone number was supplied', function () {
      const result = db.search({ phoneNumber: '9009' });
      expect(result[0].phoneNumber).toContain(phoneNumber);
    });

    it('should return all results when none was supplied', function () {
      const result = db.search({});

      const allContacts = db.contacts;

      expect(result).toEqual(allContacts);
    });
  });
});
