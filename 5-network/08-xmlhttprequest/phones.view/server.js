let http = require('http');
let url = require('url');
let querystring = require('querystring');
let static = require('node-static');
let file = new static.Server('.', {
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
