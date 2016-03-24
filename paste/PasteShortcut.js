var fs = require("fs");
var PastebinAPI = require("pastebin-js");
var binUser = JSON.parse(fs.readFileSync(__dirname+"/credentials.json"));
    pastebin = new PastebinAPI({
      'api_dev_key' : binUser.key,
      'api_user_name' : binUser.user,
      'api_user_password' : binUser.pass
    });
pastebin.createPasteFromFile(__dirname+"/pasted.txt", "pastebin-js test", null, 1, "N")
    .then(function (data) {
        fs.writeFile(__dirname+"/pasted.txt", "pastebin.com/" + data, function (err){
			if (err) {
			return console.log(err);
			}
			console.log("pastebin.com/" + data);
		});
    });


