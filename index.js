
const fs = require('fs');

const defaults = { 
            "locale" : "en-AU", 
            "timezone" : "Australia/Melbourne", 
            "dateFormat" : "yyyy-mm-dd HH:MM:SS" 
        }

var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

/**
 * randomString
 * @param {*} length Length of the String
 * @param {*} type SMALL, BIG, ALL, CAPITALISE
 */
var randomString = function(length, type = 'LOWER') {
    var result = '';
    var allchars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var bigchars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var smallchars = 'abcdefghijklmnopqrstuvwxyz';

    var characters = '';
    var start = 0;

    if (type == "ALL") {
        characters = allchars;
    } else if (type == "UPPER") {
        characters = bigchars;
    } else if (type == "LOWER") {
        characters = smallchars;
    } else if (type == "CAPITALISE") {
        characters = smallchars;
        start = 1;
        result += bigchars.charAt(Math.floor(Math.random() * bigchars.length));
    }

    var charactersLength = characters.length;
    for ( var i = start; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// INT (unisnged) : 0 to 4294967295 (10 digits)
var randomInt = function(length) {
    return randomFixedNumber(length); // TODO: check for INT length
}

// BIGINT (unisnged) : 0 to 18446744073709551615 (20 digits)
var randomBigInt = function(length) {
    return randomFixedNumber(length); // TODO: check for BIGINT length
}

var randomFixedNumber = function (length) {
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}

/**
 * randomDateTime 
 * @param {*} start 
 * @param {*} end 
 */
var randomDateTime = function(start, end) {
    // console.log(Date.UTC())
    // .toLocaleString(defaults.locale, { timeZone: defaults.timezone })
    // var dateStart = new Date(Date.parse(start));

    start = (start == undefined) ? new Date() : new Date(start);
    end = (end == undefined) ? new Date() : new Date(end);
    
    return formatDate(new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())));
}

var printDate = function(date) {
    return date.getFullYear() + "-" + (date.getMonth() + 1).pad(2) + "-" + (date.getDay()).pad(2) + " " + (date.getHours()).pad(2) + ":" + (date.getMinutes()).pad(2) + ":" + (date.getSeconds().pad(2));
}



/**
 * formatDate
 * @param {*} date Date to format
 * @param {*} formatString OPTIONAL date format string 
 */
var formatDate = function(date, formatString) {
    
    var result = formatString || defaults.dateFormat;

    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    var daysFull = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thusday", "Friday", "Saturday"]
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    var monthsFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    return result
                .replace("yyyy", date.getFullYear())
                .replace("dddd", daysFull[date.getDay()])
                .replace("ddd", days[date.getDay()])
                .replace("mmmm", monthsFull[date.getMonth()])
                .replace("mmm", months[date.getMonth()])
                .replace("yy", (date.getFullYear() + "").substr(2, 4))
                .replace("mm", (date.getMonth() + 1).pad(2))
                .replace("dd", (date.getDay()).pad(2))
                .replace("HH", (date.getHours()).pad(2))
                .replace("MM", (date.getMinutes()).pad(2))
                .replace("SS", (date.getSeconds()).pad(2))
                
}

/**
 * pad (HELPER function)
 * @param {*} number Number to pad with zero
 */
Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}


/*
    MAIN
 */

for ( var records = 1; records <= config.data.records; records++ ) {
    var data = "";

    for ( var columns = 0; columns < config.data.columns.length; columns++ ) {
        switch(config.data.columns[columns].type) {
            case "bigint" :
                if (config.data.columns[columns].sequence) {
                    data += (records).pad(config.data.columns[columns].length);
                } else {
                    data += randomBigInt(config.data.columns[columns].length);
                }
                break;
            case "int" : 
                if (config.data.columns[columns].sequence) {
                    data += records;
                } else {
                    data += randomInt(config.data.columns[columns].length);
                }
                break;
            case "char" : 
                if (config.data.columns[columns].case) {
                    data += randomString(config.data.columns[columns].length, config.data.columns[columns].case);
                } else {
                    data += randomString(config.data.columns[columns].length);
                }
                break;
            case "date" : 
                data += randomDateTime(config.data.columns[columns].start);
                break;

            case "float" : 
                data += randomFloat(config.data.columns[columns].start, config.data.columns[columns].precision)
                break;
        }
        data += ",";
    }
    console.log(data);
}