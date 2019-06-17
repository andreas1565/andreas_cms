// IMPORTS
// ============================================================================
const express = require('express');
const pjson = require('./package.json');
const port = process.env.PORT || 3000;
const debug = require('debug')('andreas-kodebase');


/* const options = {
	'key': fs.readFileSync('ssl/localhost-privkey.pem'),
	'cert': fs.readFileSync('ssl/localhost-cert.pem')
}; */

// SERVER
// ============================================================================
const app = express();

require('./config/index')(app);
require('./routes/index')(app);



// SERVER INIT
// ============================================================================
app.listen(port, () => {
	debug(
		`${pjson.name} v${pjson.version} is running on http://${process.env.SITE_HOST}:${port}`
	);
});