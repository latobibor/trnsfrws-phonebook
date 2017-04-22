const restify = require('restify');
const guid = require('guid');

class Controller {
    constructor(database) {
        this.db = database;
    }

    getAllContacts(req, res, next) {
        res.send(this.db.records);
        return next();
    }

    getContactDetail(req, res, next) {
        const userId = new guid(req.params.userId);

        if (guid.isGuid(req.params.userId)) {
            const contact = this.db.searchById(userId);
            
            if (contact) {
                res.send(contact);
                return next();
            }
        } 

        return next(new restify.NotFoundError(`Record with id [${req.params.userId}] was not found in the database`));
    }

    searchByName(req, res, next) {
        res.send(this.db.searchByName(req.params.name));
        return next();
    }

    addContact(req, res, next) {
        const minimumNameLength = 3;
        const maximumNameLength = 100;

        const parsedBody = JSON.parse(req.body);

        const id = new guid(parsedBody.userId)
        const name = parsedBody.name;
        const phoneNumber = parsedBody.phoneNumber;

        let validated = false;

        if (!guid.isGuid(parsedBody.userId)) {
            return next(new restify.BadRequestError(`Bad user id format [${parsedBody.userId}]`));
        }

        if (!name || name.length < minimumNameLength || name.length > maximumNameLength) {
            return next(new restify.BadRequestError(`Name should be ${minimumNameLength}-${maximumNameLength} long.`));
        }

        if (!phoneNumber) {
            return next(new restify.BadRequestError('Phone number cannot be empty.'));
        }

        this.db.addContact({
            id: id,
            name,
            phoneNumber
        });

        res.send(201);
        return next();
    };
}

module.exports = Controller;