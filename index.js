var fs = require('fs')
var restler = require('restler')
var filePath = 'c:\\test.zip'
fs.stat(filePath, function(err, stats) {
    console.log('size: ' + stats.size)
    restler.post("http://localhost:1337/deploy/send", {
		multipart: true,
		data: {
			'package': restler.file(filePath, null, stats.size, null, 'application/zip')
		  }
	}).on("complete", function(result, response) {
        console.log('result: ' + result)
		if (response) {
				console.log('code: ' + response.statusCode)
				console.log('message: ' + response.statusMessage)
				console.log('headers: ' + JSON.stringify(response.headers))
		}
        
    })
})


/*var http = require('http');

var options = {
  method: 'POST',
  port: 1337,
  hostname: 'localhost',
  uri: 'http://localhost:1337/deploy/send',
  multipart: [
    {
      'content-type': 'application/zip',
      body: fs.createReadStream('c:\\logs.zip')
    }
  ]    
};

var req = http.request(options);
req.on('response', function(response) {
    console.log(response);
});

req.end();*/
/*
request(,
function (error, response, body) {
  if (error) {
    return console.error('upload failed:', error);
  }
  console.log('Upload successful!  Server responded with:' + JSON.stringify(response) + "," + JSON.stringify(body));
});*/