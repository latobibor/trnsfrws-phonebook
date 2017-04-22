const db = require('./in-memory-db');
const Controller = require('./controller');

const controller = new Controller(db);

function setRoutes(server) {
    server.get('/contacts', controller.getAllContacts.bind(controller));
    server.get('/contact-details/:userId', controller.getContactDetail.bind(controller));
    server.get('/search/:name', controller.searchByName.bind(controller));

    server.post('/contact/', controller.addContact.bind(controller));
}

module.exports = setRoutes;