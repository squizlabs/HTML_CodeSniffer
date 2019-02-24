var page = require('webpage').create(),
    system = require('system'),
    address, standard, reportType, cwd;
var messages = {
    'ERROR': [],
    'WARNING': [],
    'NOTICE': []
};

if (system.args.length < 3 || system.args.length > 4) {
    console.log('Usage: phantomjs HTMLCS_Run.js URL standard [report]');
    console.log('  available standards: "WCAG2A", "WCAG2AA", "WCAG2AAA", "Section508"');
    console.log('  available reports: "default" (default if omitted), "table", "json"');
    phantom.exit();
} else {
    address    = system.args[1];
    standard   = system.args[2];
    reportType = 'default';
    if (system.args.length > 3) {
        reportType = system.args[3];
    }

    // Get the absolute working directory from the PWD var and
    // and the command line $0 argument.
    cwd = system.env['PWD'];
    if (system.args[0].substr(0, 1) === '/') {
        cwd = system.args[0];
    } else {
        cwd += '/' + system.args[0];
    }

    cwd = cwd.substr(0, cwd.lastIndexOf('/'));

    // Default reporter.
    var reportDefaultFn = function(cb) {
        var levels = ['ERROR', 'WARNING', 'NOTICE'];
        for (var lvl = 0; lvl < levels.length; lvl++) {
            for (var i = 0; i < messages[levels[lvl]].length; i++) {
                var thisMsg = messages[levels[lvl]][i];
                var line    = thisMsg.join('|');
                console.log(line);
            }
        }

        cb();
    };

    // Table reporter.
    var reportTableFn = function(cb) {
        console.log('LEVEL   | MESSAGE CODE                             | NODE NAME  | ELEMENT ID');
        console.log('--------+------------------------------------------+------------+---------------------');
        var levels = ['ERROR', 'WARNING', 'NOTICE'];
        for (var lvl = 0; lvl < levels.length; lvl++) {
            for (var i = 0; i < messages[levels[lvl]].length; i++) {
                var thisMsg = messages[levels[lvl]][i];
                var line    = '';
                var stdMsg  = thisMsg[1].split('.');
                stdMsg.splice(0, 3);
                stdMsg = stdMsg.join('.');
                if (stdMsg.length > 40) {
                    stdMsg = '...' + stdMsg.substr(stdMsg.length - 37);
                }

                line += (thisMsg[0] + Array(8).join(' ')).substr(0, 7) + ' | ';
                line += (stdMsg + Array(41).join(' ')).substr(0, 40) + ' | ';
                line += (thisMsg[2] + Array(11).join(' ')).substr(0, 10) + ' | ';
                line += (thisMsg[3] + Array(21).join(' ')).substr(0, 20);
                console.log(line);

                var remText = thisMsg[4];
                while (remText.length > 0) {
                    line  = '';
                    line += (Array(8).join(' ')).substr(0, 7) + ' | ';
                    
                    if (remText.length < 75) {
                        line += remText;
                        console.log(line);
                        break;
                    } else {
                        var lastSpace = remText.substr(0, 75).lastIndexOf(' ');
                        line += remText.substr(0, lastSpace);
                        console.log(line);
                        remText = remText.substr(lastSpace + 1);
                    }
                }

                console.log('--------+------------------------------------------+------------+---------------------');
                
            }
        }

        console.log('');
        console.log(_global.HTMLCS.getTranslation("auditor_errors") + ': ' + messages['ERROR'].length + ', ' + _global.HTMLCS.getTranslation("auditor_warnings") + ': ' + messages['WARNING'].length +
            ', ' + _global.HTMLCS.getTranslation("auditor_notices") + ': ' + messages['NOTICE'].length);
        cb();
    };

    var reportJSONFn = function(cb) {
        var reportJSONData = [];
        var levels = ['ERROR', 'WARNING', 'NOTICE'];
        for (var lvl = 0; lvl < levels.length; lvl++) {
            for (var i = 0; i < messages[levels[lvl]].length; i++) {
                var thisMsg = messages[levels[lvl]][i];
                reportJSONData.push({
                    type: thisMsg[0],
                    code: thisMsg[1],
                    nodeName: thisMsg[2],
                    id: thisMsg[3],
                    msg: thisMsg[4],
                    outerHTML: thisMsg[5]
                });
            }
        }

        console.log('[');
        reportJSONData.forEach(function(report, i) {
            console.log(JSON.stringify(report, null, '    '));
            if (i < reportJSONData.length-1) {
                console.log(',');
            }
        });
        console.log(']');
        cb();
    };

    page.open(address, function (status) {
        if (status !== 'success') {
            console.log('Unable to load the address!');
            phantom.exit();
        } else {
            window.setTimeout(function () {

                // Override onConsoleMessage function for outputting.
                page.onConsoleMessage = function (msg) {
                    var thisMsg;
                    if (msg.indexOf('[HTMLCS] ') === 0) {
                        thisMsg = msg.substr(9, msg.length).split('|');
                        messages[thisMsg[0]].push(thisMsg);
                    } else if (msg === 'done') {
                        var cb = function() {
                            phantom.exit();
                        };
                        switch (reportType.toLowerCase()) {
                        case 'table':
                            reportTableFn(cb);
                            break;

                        case 'json':
                            reportJSONFn(cb);
                            break;

                        default:
                            reportDefaultFn(cb);
                            break;
                        }
                    } else {
                        console.log(msg);
                    }
                };

                page.injectJs(cwd + '/../../build/HTMLCS.js');

                // Now Run. Note that page.evaluate() function is sanboxed to
                // the loaded page's context. We can't pass any variable to it.
                switch (standard) {
                case 'WCAG2A':
                case 'WCAG2AA':
                case 'WCAG2AAA':
                case 'Section508':
                    page.evaluate(function(standard) {HTMLCS_RUNNER.run(standard);}, standard);
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
