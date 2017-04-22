const Chance = require('chance');
const chance = new Chance();

class InMemoryDatabase {
    constructor() {
        this.records = createRecords();
    }

    addContact(contact) {
        if (!this.searchById(contact.id)) {
            this.records.push(
                {
                    id: contact.id.value,
                    name: contact.name,
                    phoneNumber: contact.phoneNumber
                }
            );
        } else {
            throw new Error('Contact with this ID was already added');
        }
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

    searchById(id) {
        const contacts = this.records.filter(record => record.id === id.value);
        
        if (contacts.length === 1) {
            return contacts[0];
        } else if (contacts.length > 1) {
            throw new Error('inconsistent DB?');
        }

        // I know by default JS would return undefined, but I wanted to make it clear, that I did not forget this
        return undefined;
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
