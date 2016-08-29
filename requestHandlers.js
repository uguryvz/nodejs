var querystring = require("querystring");
var fs = require("fs");

function start(response, postData){
	
	console.log("Request handler 'start' was called.");
	
	var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<p>İsim: </p><textarea name="nickname" rows="1" cols="30"></textarea>'+
    '<br><p>Mesaj: </p><textarea name="text" rows="20" cols="60"></textarea>'+
	'<input type="submit" value="Gonder" />'+
    '</form>'+
    '</body>'+
    '</html>';
	
	response.writeHead(200, {"Content-Type":"text/html"});
    response.write(body);
	response.end();
	
}

function upload(response, postData){
	
	console.log("Request handler 'upload' was called.");
	response.writeHead(200, {"Content-Type":"text/plain"});
	response.write("Mesajiniz gonderildi: " + querystring.parse(postData).text + "\n");
	
	
	fs.appendFile("log.txt", querystring.parse(postData).nickname+":\n"+querystring.parse(postData).text+"\n--------------------\n", function (err) {
     if (err) return console.log(err);
     console.log('postData > log.txt');
     });
	
	fs.createReadStream("./log.txt").pipe(response);
	
	//response.end();
	
}

exports.start = start;
exports.upload = upload;