var fs = require("fs");
fs.writeFile("paste.txt", "google.com", function (err){
	if (err) {
		return console.log(err);
	}
	console.log("The file was completed");
});