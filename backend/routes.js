const db = require('./in-memory-db');

function setRoutes(server) {
    server.get('/contact-details/:userId', (req, res, next) => {
        res.send(req.params);
        return next();
    });

    server.get('/contacts/', (req, res, next) => {
        res.send(db.records);
        return next();
    });
}

module.exports = setRoutes;