const fs = require('fs');

module.exports = class silverdb {
    constructor(filePath) {
        this.filePath = filePath || "./silver-db.json";
        this.data = {};

        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, "{}", "utf-8");
        } else {
            this.fetchDataFromFile();
        }
    }

    fetchDataFromFile() {
        const savedData = JSON.parse(fs.readFileSync(this.filePath));
        if (typeof savedData == "object") {
            this.data = savedData;
        }
    }

    saveData() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), "utf-8");
    }

    set(key, value) {
        if (!key) throw Error("Key was not specified.\n\nExample to fix\ndb.set(KEY, value)");
        if (!value) throw Error("Value was not specified.\n\nExample to fix\ndb.set(key, VALUE)");
        this.data[key] = value;
        this.saveData();
    }

    get(key) {
        if (!key) throw Error("Key was not specified.\n\nExample to fix\ndb.get(KEY)");
        return this.data[key];
    }

    fetch(key) {
        if (!key) throw Error("Key was not specified.\n\nExample to fix\ndb.get(KEY)");
        return this.data[key];
    }

    has(key) {
        if (!key) throw Error("Key was not specified.\n\nExample to fix\ndb.get(KEY)");
        return Boolean(this.data[key]);
    }

    delete(key) {
        if (!key) throw Error("Key was not specified.\n\nExample to fix\ndb.get(KEY)");
        delete this.data[key];
        this.saveData();
    }

    clear() {
        this.data = {};
        this.saveData();
    }

    deleteAll() {
        this.data = {};
        this.saveData();
    }

    all() {
        return Object.keys(this.data).map((i) => {
            return {
                key: i,
                data: this.data[i]
            }
        });
    }

    add(key, number) {
        if (!key) throw Error("Key was not specified.\n\nExample to fix\ndb.add(KEY, number)");
        if (!number) throw Error("Number was not specified.\n\nExample to fix\ndb.add(key, NUMBER)");

        if (!typeof number == 'number') throw Error("Number specified was not a number. Please replace old value with a number");
        if (typeof this.data[key] == 'number') {
            this.data[key] += number;
            this.saveData();
        } else throw Error("Key specified value was not a number. Please either set a new value or add to a key that is a number");;
    }

    subtract(key, number) {
        if (!key) throw Error("Key was not specified.\n\nExample to fix\ndb.subtract(KEY, number)");
        if (!number) throw Error("Number was not specified.\n\nExample to fix\ndb.subtract(key, NUMBER)");

        if (!typeof number == 'number') throw Error("Number specified was not a number. Please replace old value with a number");
        if (typeof this.data[key] == 'number') {
            this.data[key] -= number;
            this.saveData();
        } else throw Error("Key specified value was not a number. Please either set a new value or add to a key that is a number");
    }

    push(key, item) {
        if (!key) throw Error("Key was not specified.\n\nExample to fix\ndb.push(KEY, item)");
        if (!item) throw Error("Item was not specified.\n\nExample to fix\ndb.push(key, ITEM)");
        if (!this.data[key]) this.data[key] = [];
        if (!Array.isArray(this.data[key])) this.data[key] = [this.data[key]]
        this.data[key].push(item);
        this.saveData();
    }

    unpush(key, item) {
        if (!key) throw Error("Key was not specified.\n\nExample to fix\ndb.unpush(KEY, item)");
        if (!item) throw Error("Item was not specified.\n\nExample to fix\ndb.unpush(key, ITEM)");
        if (!this.data[key]) this.data[key] = [];
        if (!Array.isArray(this.data[key])) this.data[key] = [this.data[key]]

        const filtered = this.data[key].filter(i => i !== item);
        this.data[key] = filtered;
        this.saveData();
    }
}