const defaults = require('./defaults.json');


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
var randomInt = function(length, start) {
    return randomFixedNumber(length); // TODO: check for INT length
}

// BIGINT (unisnged) : 0 to 18446744073709551615 (20 digits)
var randomBigInt = function(length, start) {
    return randomFixedNumber(length, start); // TODO: check for BIGINT length
}

var randomFixedNumber = function (length, start) {
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}

var randomFloat = function (start, end, precision) {
    return (Math.random() * (end - start) + start).toFixed(precision);
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
    
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).format(defaults.dateFormat);
}


module.exports = {
	randomString : randomString,
	randomInt : randomInt, 
	randomBigInt : randomBigInt,
	randomFloat : randomFloat,
	randomDateTime : randomDateTime
}