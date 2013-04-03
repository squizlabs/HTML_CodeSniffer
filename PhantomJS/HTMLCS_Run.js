var page = require('webpage').create(),
    system = require('system'),
    address, standard;

if (system.args.length < 3 || system.args.length > 3) {
    console.log('Usage: phantomjs HTMLCS_Run.js URL standard');
    console.log('  available standards: "WCAG2A", "WCAG2AA", "WCAG2AAA"');
    phantom.exit();
} else {
    address  = system.args[1];
    standard = system.args[2];
    page.open(address, function (status) {
        if (status !== 'success') {
            console.log('Unable to load the address!');
            phantom.exit();
        } else {
            window.setTimeout(function () {

                // Override onConsoleMessage function for outputting.
                page.onConsoleMessage = function (msg) {
                    if (msg === 'done') phantom.exit();
                    console.log(msg);
                };

                // Include all sniff files.
                var fs = require('fs');
                var injectAllStandards = function(dir) {
                    var files = fs.list(dir),
                        filesLen = files.length,
                        absPath = '';
                    for (var i = 0; i < filesLen; i++) {
                        if (files[i] === '.' || files[i] === '..') continue;

                        absPath = fs.absolute(dir + '/' + files[i]);
                        if (fs.isDirectory(absPath) === true) {
                            injectAllStandards(absPath);
                        } else if (fs.isFile(absPath) === true) {
                            page.injectJs(absPath);
                        }
                    }
                };

                injectAllStandards('../Standards');
                page.injectJs('../HTMLCS.js');
                page.injectJs('runner.js');

                // Now Run. Note that page.evaluate() function is sanboxed to
                // the loaded page's context. We can't pass any variable to it.
                switch (standard) {
                    case 'WCAG2A':
                        page.evaluate(function() {HTMLCS_RUNNER.run('WCAG2A');});
                    break;
                    case 'WCAG2AA':
                        page.evaluate(function() {HTMLCS_RUNNER.run('WCAG2AA');});
                    break;
                    case 'WCAG2AAA':
                        page.evaluate(function() {HTMLCS_RUNNER.run('WCAG2AAA');});
                    break;
                    default:
                        console.log('Unknown standard.');
                        phantom.exit();
                    break;
                }
            }, 200);
        }//end if
    });//end
}//end if