var fs = require("fs");

module.exports = {
	cert: fs.readFileSync('../server.crt'),
	key: fs.readFileSync('../server.key'),
	// cert: fs.readFileSync(__dirname + "/server.cert"),
	// key: fs.readFileSync(__dirname + "/server.key"),
	passphrase: 'thetrg#1701#2018'
};
