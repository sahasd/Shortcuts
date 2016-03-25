var fs = require("fs");
var paste = require("better-pastebin");
var binUser = JSON.parse(fs.readFileSync(__dirname+"/credentials.json"));
var input = fs.readdirSync(__dirname+'/copied')
var answer =  extractFileFormat(__dirname + "/copied/"+input[1])
var fileTypes = JSON.parse(fs.readFileSync(__dirname+'/types.json', 'utf8')).types;
console.log(input)
paste.setDevKey(binUser.key);
paste.login(binUser.user, binUser.pass, function(success, data) {
    if(!success) {
        console.log("Failed (" + data + ")");
        return false;
    }
    paste.createFromFile({
        path: __dirname+"/copied/"+input[1],
        format: answer
    }, function(success, data) {
        if(success) {
          console.log(data);
          fs.unlinkSync(__dirname+"/copied/"+input[1]);
          fs.writeFile(__dirname+"/pasted.txt", data, function (err){
            if (err) {
              return console.log(err);
            }
          });

        }
    });
});

function extractFileFormat(filename){
  console.log(filename)
  if(filename.indexOf('.') == -1)
    return null;
  var ext =  filename.substring(filename.indexOf('.')+1);
  if(ext == 'js')
    ext = 'javascript';
  console.log(ext)
  return ext;
}

