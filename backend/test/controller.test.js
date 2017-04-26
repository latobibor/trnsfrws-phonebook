const expect = require('expect');
const sinon = require('sinon');
const restify = require('restify');

const Controller = require('../controller');

describe('Controller', function () {
  const validGuid = '99ae8275-61a3-5b3b-b790-f7f122e16148';

  let res;
  let req;
  let next;
  let db;

  let controller;

  beforeEach(function () {
    res = { send: sinon.spy() };
    req = sinon.stub();
    next = sinon.spy();
    db = {};

    controller = new Controller(db);
  });

  afterEach(function () {
    // In all cases next() must be called
    sinon.assert.calledOnce(next);
  });

  it('getAllContacts returns all records in DB', function () {
    const dummyDb = [ 123, 456 ];
    db.records = dummyDb;

    controller.getAllContacts(req, res, next);

    sinon.assert.calledWith(res.send, dummyDb);
  });

  describe('getContactDetail', function () {
    it('should return with error with invalid guid', function () {
      req.params = { 
        userId: 'invalid guid'
      };

      controller.getContactDetail(req, res, next);

      const errorMessageBody = next.getCall(0).args[0].body;
      expect(errorMessageBody.code).toBe('NotFoundError');
      expect(errorMessageBody.message).toBe(`Record with id [${req.params.userId}] was not found in the database`);
    });

    it('should return with error if guid was not found in DB', function () {
      req.params = { 
        userId: validGuid
      };

      db.searchById = sinon.stub();

      controller.getContactDetail(req, res, next);

      const errorMessageBody = next.getCall(0).args[0].body;
      expect(errorMessageBody.code).toBe('NotFoundError');
      expect(errorMessageBody.message).toBe(`Record with id [${req.params.userId}] was not found in the database`);
    });

    it('should return the value if found', function () {
      req.params = { 
        userId: validGuid
      };

      db.searchById = sinon.stub().returns('item');

      controller.getContactDetail(req, res, next);

      sinon.assert.calledWith(res.send, 'item');
    });
  });

  describe('Search', function () {
    beforeEach(function () {
      db.search = sinon.stub().returns([ 'item' ]);
    });

    it('should call res.send with result', function () {
      req.params = { 
        name: 'Név Tibor'
      };      

      controller.search(req, res, next);

      sinon.assert.calledWith(res.send, [ 'item' ]);
    });

    it('should call db.search with request parameters', function () {
      req.params = { 
        name: 'Név Tibor',
        phoneNumber: 123
      };

      controller.search(req, res, next);
      sinon.assert.calledWith(db.search, { name: req.params.name, phoneNumber: req.params.phoneNumber });
    });
  });

  describe('addContact', function () {
    let validRequestBody;

    beforeEach(function () {
      validRequestBody = {
        name: 'aasdf',
        phoneNumber: '(234) 23424'
      };

      db.addContact = sinon.spy();
    });

    it('should return with error when name was not specified', function () {
      req.body = JSON.stringify({});

      controller.addContact(req, res, next);

      verifyBadNameErrorMessage();
    });

    it('should return with error when name was too short', function () {
      req.body = JSON.stringify({ name: 'a' });

      controller.addContact(req, res, next);

      verifyBadNameErrorMessage();
    });

    it('should return with error when name are too long', function () {
      req.body = JSON.stringify({ 
        name: '01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789'
      });

      controller.addContact(req, res, next);

      verifyBadNameErrorMessage();
    });

    it('should return with error when phone number was empty', function () {
      req.body = JSON.stringify({ name: 'aasdf' });

      controller.addContact(req, res, next);

      verifyBadRequestError('Phone number cannot be empty.');
    });

    it('should return call DB with (id, name, phoneNumber) when everything was valid', function () {
      validRequestBody.maliciousAdditionalField = {}
      req.body = JSON.stringify(validRequestBody);

      controller.addContact(req, res, next);

      sinon.assert.calledOnce(db.addContact);
      const callArgs = db.addContact.getCall(0).args[0];
      
      expect(callArgs.name).toBe('aasdf');
      expect(callArgs.phoneNumber).toBe('(234) 23424');
      expect(callArgs.maliciousAdditionalField).toNotExist();
    });

    it('should return 201 when everything was valid', function () {
      req.body = JSON.stringify(validRequestBody);

      controller.addContact(req, res, next);

      sinon.assert.calledWith(res.send, 201);
    });

    it('should return with error when DB threw an error', function () {
      req.body = JSON.stringify(validRequestBody);

      db.addContact = () => { throw new Error(); };

      controller.addContact(req, res, next);

      const errorMessageBody = next.getCall(0).args[0].body;
      expect(errorMessageBody.code).toBe('InternalServerError');
      expect(errorMessageBody.message).toNotExist();
    });

    function verifyBadRequestError(message) {
      const errorMessageBody = next.getCall(0).args[0].body;
      expect(errorMessageBody.code).toBe('BadRequestError');
      expect(errorMessageBody.message).toBe(message);
    }

    function verifyBadNameErrorMessage() {
      verifyBadRequestError('Name should be 3-100 long.');
    }
  })
});