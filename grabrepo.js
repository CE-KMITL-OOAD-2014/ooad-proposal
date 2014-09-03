var request = require("request");
var fs = require("fs");
request({
  uri:"https://api.github.com/orgs/CE-KMITL-OOAD-2014/repos",
  method:"GET",
  headers: {
    'User-Agent':'request'
  }
}, function(error, response, body) {
  var parsed = JSON.parse(body);

  fs.unlinkSync("grab.sh");

  var stream = fs.createWriteStream("grab.sh");
  stream.once('open', function(fd) {
    stream.write('#!/bin/bash\n');
    var count = 0;
    for (var i=0;i<parsed.length;i++) {
      x = parsed[i];
      if (x.clone_url.indexOf('ooad-proposal') == -1) {
        console.log(x.clone_url);
        stream.write('git submodule add '+x.clone_url+'\n');
	count++;
      }
    }
    console.log(count+" repos");
    stream.end();
  });
});

