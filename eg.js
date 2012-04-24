function runHTMLCS(standard, source, resultsDiv, callback)
{
    if (/resultsWrapperActive/.test(resultsDiv) === false) {
        resultsDiv.className += ' resultsWrapperActive';
    }

    resultsDiv.innerHTML = '<span class="loading"><img src="images/loading.gif" alt="Loading"> Sniffing...</span>';

    HTMLCS.process(standard, source, function() {
        updateResults(resultsDiv);
        if (callback instanceof Function === true) {
            callback.call();
        }
    });
}

function updateResults(resultsWrapper)
{
    resultsWrapper.innerHTML = '';

    var msgs = HTMLCS.getMessages();
    if (msgs.length === 0) {
        resultsWrapper.innerHTML = 'No violations found';
        return;
    }

    var content = '<div id="test-results"><table id="test-results"><tr>';
    content    += '<th>#</th><th>Message</th><th>Code</th></tr>';

    var errors   = 0;
    var warnings = 0;
    var notices  = 0;

    for (var i = 0; i < msgs.length; i++) {
        var msg = msgs[i];
        var type = '';
        switch (msg.type) {
            case HTMLCS.ERROR:
                type = 'Error';
                errors++;
            break;

            case HTMLCS.WARNING:
                type = 'Warning';
                warnings++;
            break;

            case HTMLCS.NOTICE:
                type = 'Notice';
                notices++;
            break;

            default:
                type = 'Unknown';
            break;
        }

        // Get the success criterion so we can provide a link.
        var msgParts = msg.code.split('.');
        var sc = msgParts[3];

        // Build a message code without the standard name.
        msgParts.shift();
        msgParts.unshift('[Standard]');
        var noStdMsgParts = msgParts.join('.');

        content += '<tr class="' + type.toLowerCase() + '">';
        content += '<td class="number">' + (i + 1) + '<span class="flag"></span></td>';
        content += '<td class="messageText"><strong>' + type + ':</strong> ' + msg.msg + '</td>';
        content += '<td class="messageCode">' + msg.code + '</td></tr>';
    }


    var heading = '<h3>Test results</h3>';

    heading += '<ul id="results-overview">';
    heading += '<li><a href="#"><span class="result-count result-count-errors">' + errors + '</span> <span class="result-type">errors</span></a></li>';
    heading += '<li><a href="#"><span class="result-count result-count-warnings">' + warnings + '</span> <span class="result-type">warnings</span></a></li>';
    heading += '<li class="active"><a href="#"><span class="result-count result-count-notices">' + notices + '</span> <span class="result-type">notices</span></a></li>';
    heading += '</ul>';

    content  = heading + content;
    content += '</table>';
    content += '<span class="footnote"><em>Add the WCAG bookmarklet to your browser to run this test on any web page.</em></span></div>';
    resultsWrapper.innerHTML = content;

}
