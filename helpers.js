

(function() {

	/**
	 * format
	 * @param {*} formatString date format string 
	 */
	Date.prototype.format = function(pattern) {
	    
	    var result = pattern;

	    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
	    var daysFull = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thusday", "Friday", "Saturday"]
	    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	    var monthsFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

	    return result
	                .replace("yyyy", this.getFullYear())
	                .replace("dddd", daysFull[this.getDay()])
	                .replace("ddd", days[this.getDay()])
	                .replace("mmmm", monthsFull[this.getMonth()])
	                .replace("mmm", months[this.getMonth()])
	                .replace("yy", (this.getFullYear() + "").substr(2, 4))
	                .replace("mm", (this.getMonth() + 1).pad(2))
	                .replace("dd", (this.getDay()).pad(2))
	                .replace("HH", (this.getHours()).pad(2))
	                .replace("MM", (this.getMinutes()).pad(2))
	                .replace("SS", (this.getSeconds()).pad(2))
	                
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

}());
