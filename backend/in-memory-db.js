const Chance = require('chance');
const chance = new Chance();

class InMemoryDatabase {
    constructor() {
        this.records = createRecords();
    }

    addContact(contact) {
        this.records.push({
                id: chance.guid(),
                name: contact.name,
                phoneNumber: contact.phoneNumber
            });
    }

    updateContact(contact) {
        const index = this.findRecordIndexByContact(contact);
        if (index > -1) {
            this.records[index] = {
                    id: contact.id.value,
                    name: contact.name,
                    phoneNumber: contact.phoneNumber
                };
        } else {
            throw new Error(`Contact with this ID [${contact.id}] was not found`);
        }
    }

    deleteContact(contact) {
        const index = this.findRecordIndexByContact(contact);

        if (index > -1) {
            array.splice(index, 1);
        }
    }

    search({ name = '', phoneNumber = '' }) {
        return this.records
                .filter(record => record.name.toLowerCase().indexOf(name.toLowerCase()) > -1)
                .filter(record => record.phoneNumber.toLowerCase().indexOf(phoneNumber.toLowerCase()) > -1);
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

    findRecordIndexByContact(contact) {
        return this.records.findIndex(record => record.id === contact.id);
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
