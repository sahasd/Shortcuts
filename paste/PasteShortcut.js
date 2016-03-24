var fs = require("fs");
var paste = require("better-pastebin");
var binUser = JSON.parse(fs.readFileSync(__dirname+"/credentials.json"));
paste.setDevKey(binUser.key);
paste.login(binUser.user, binUser.pass, function(success, data) {
    if(!success) {
        console.log("Failed (" + data + ")");
        return false;
    }
    paste.create({
        contents: fs.readFileSync(__dirname + "/pasted.txt") ,
        name: "test pasting",
        format: "javascript"
    }, function(success, data) {
        if(success) {
          console.log(data);
          fs.writeFile(__dirname+"/pasted.txt", data, function (err){
            if (err) {
              return console.log(err);
            }
          });

        }
    });
});





