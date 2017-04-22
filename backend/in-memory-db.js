const Chance = require('chance');
const chance = new Chance();

class InMemoryDatabase {
    constructor() {
        this.records = createRecords();
    }

    addContact(contact) {
        this.records.push(
            {
                id: contact.id,
                name: contact.name,
                phoneNumber: contact.phoneNumber
            }
        );
    }

    deleteContact(contact) {
        const index = this.records.findIndex(record => record.id === contact.id);

        if (index > -1) {
            array.splice(index, 1);
        }
    }

    searchByName(name) {
        return this.records.filter(record => record.name.indexOf(name) > -1);
    }

    get contacts() {
        return this.records;
    }
}

function createRecords() {
    const numberOfElements = chance.natural({ min: 5, max: 20 });

    const records = [];
    records.length = numberOfElements;

    for (let i = 0; i < numberOfElements; i++) {
        records[i] = createFakeRecord();
    }

    return records;
}


function createFakeRecord() {
    return {
        id: chance.guid(),
        name: chance.name(),
        phoneNumber: chance.phone()
    };
}

const db = new InMemoryDatabase();

module.exports = db;
