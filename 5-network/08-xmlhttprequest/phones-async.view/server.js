var http = require('http');
var url = require('url');
var querystring = require('querystring');
var static = require('node-static');
var file = new static.Server('.', {
  cache: 0
});


function accept(req, res) {

  if (req.url == '/phones.json') {
    // va un pochino in stallo per permettere di mostrare il messaggio di "loading"
    setTimeout(function() {
      file.serve(req, res);
    }, 2000);
  } else {
    file.serve(req, res);
  }

}


// ------ avvia il server -------

if (!module.parent) {
  http.createServer(accept).listen(8080);
} else {
  exports.accept = accept;
}