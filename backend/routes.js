const db = require('./in-memory-db');
const Controller = require('./controller');

const controller = new Controller(db);

function setRoutes(server) {
    server.get('/contacts', controller.getAllContacts);
    server.get('/contact-details/:userId', controller.getContactDetail);
    server.get('/search/:name', controller.searchByName);

    server.post('/contact/', controller.addContact);
}

module.exports = setRoutes;