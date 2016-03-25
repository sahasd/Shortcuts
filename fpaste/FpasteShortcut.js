var fs = require("fs");
var paste = require("better-pastebin");
var binUser = JSON.parse(fs.readFileSync(__dirname+"/credentials.json"));
var input = fs.readdirSync(__dirname+'/copied')
console.log(input)
paste.setDevKey(binUser.key);
paste.login(binUser.user, binUser.pass, function(success, data) {
    if(!success) {
        console.log("Failed (" + data + ")");
        return false;
    }
    paste.createFromFile({
        path: __dirname+"/copied/"+input[1]
    }, function(success, data) {
        if(success) {
          console.log(data);
          fs.writeFile(__dirname+"/pasted.txt", data, function (err){
            if (err) {
              return console.log(err);
              fs.unlinkSync(__dirname+"copied/"+input[1]);
            }
          });

        }
    });
});


