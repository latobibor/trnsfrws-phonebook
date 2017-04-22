const db = require('./in-memory-db');
const restify = require('restify');
const guid = require('guid');

function setRoutes(server) {
    server.get('/contacts', (req, res, next) => {
        res.send(db.records);
        return next();
    });

    server.get('/contact-details/:userId', (req, res, next) => {
        const userId = new guid(req.params.userId);

        if (guid.isGuid(userId)) {
            const contact = db.searchById(userId);
            
            if (contact) {
                res.send(contact);
                return next();
            }
        } 

        return next(new restify.NotFoundError(`Record with id [${req.params.userId}] was not found in the database`));
    });

    server.get('/search/:name', (req, res, next) => {      
        const contact = db.searchByName(req.params.name);
        
        if (contact) {
            res.send(contact);
        }

        return next();
    });

    server.post('/contact/', (req, res, next) => {
        const minimumNameLength = 3;
        const maximumNameLength = 200;

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

        db.addContact({
            id: id,
            name,
            phoneNumber
        });

        res.send(201);
        return next();
    });
}

module.exports = setRoutes;