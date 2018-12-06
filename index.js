var fs         = require('fs');
var scriptPath = __dirname+'/build/HTMLCS.js';

if (fs.existsSync(scriptPath) === true) {
    module.exports = require(scriptPath);
} else {
    throw new Error('HTMLCS must be built using `grunt build` before it can be required in Node.js.');
}
