

// Native object prototypes
require('./helpers.js');

// Configuration
const defaults = require('./defaults.json');
const config = require('./config.json');

// Data Producer functions
let producer = require('./producer.js');
let headers = config.data.columns[].name;

console.log(headers);

let data = [];

for ( var records = 1; records <= config.data.records; records++ ) {
    let cells = [];

    for ( var columns = 0; columns < config.data.columns.length; columns++ ) {
        switch(config.data.columns[columns].type) {
            case "bigint" :
                if (config.data.columns[columns].sequence) {
                    var start = config.data.columns[columns].start || 0; // Logic for number sequence from a particular number
                    cells.push(records + start).pad(config.data.columns[columns].length);
                } else {
                    cells.push(producer.randomBigInt(config.data.columns[columns].length));
                }
                break;
            case "int" : 
                if (config.data.columns[columns].sequence) {
                    var start = config.data.columns[columns].start || 0; // Logic for number sequence from a particular number
                    cells.push(records + start).pad(config.data.columns[columns].length);
                } else {
                    cells.push(producer.randomBigInt(config.data.columns[columns].length));
                }
                break;
            case "char" : 
                if (config.data.columns[columns].case) {
                    cells.push(producer.randomString(config.data.columns[columns].length, config.data.columns[columns].case));
                } else {
                    cells.push(producer.randomString(config.data.columns[columns].length));
                }
                break;
            case "date" : 
                cells.push(producer.randomDateTime(config.data.columns[columns].start));
                break;

            case "float" : 
                cells.push(producer.randomFloat(config.data.columns[columns].start, config.data.columns[columns].end, config.data.columns[columns].precision));
                break;
        }

    }
    console.log(cells.join(","));
    data.push(cells);
}

