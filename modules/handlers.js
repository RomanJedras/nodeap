const fs = require('fs');
const formidable = require('formidable');

exports.welcome = function(request, response) {
	console.log("Rozpoczynam obsługę żądania welcome.");
	fs.readFile('templates/start.html', function(err, html) {
		response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
		response.write("Witaj na stronie startowej!");
		response.write(html);
		response.end();
	});
};

exports.error = function(request, response) {
	console.log("Nie wiem co robić.");
	response.write("404 :(");
	response.end();
};

exports.upload = function (request, response) {
	console.log("Rozpoczynam obsługę żądania welcome.");
	fs.readFile('templates/upload.html', function (err, html) {
		response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
		const form = new formidable.IncomingForm();
		form.parse(request, function (error, fields, files) {
			fs.renameSync(files.upload.path, "test.png");
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write("received image:<br/>");
			response.write("<img src='/show' />");
			response.end(html);
		});
		
	});
};

exports.show = function(request, response) {
	fs.readFile("test.png", "binary", function(error, file) {
		response.writeHead(200, {"Content-Type": "image/png"});
		response.write(file, "binary");
		response.end();
	});
};