function runHTMLCS(standard, source, resultsDiv, expectedMsgs, expectedOmissions)
{
    resultsDiv.innerHTML = '<em>Running...</em>';

    HTMLCS.process(standard, source, function() {
        updateResults(resultsDiv, expectedMsgs, expectedOmissions);
    });
}

function updateResults(resultsWrapper, expectedMsgs, expectedOmissions)
{
    resultsWrapper.innerHTML = '';

    var msgs = HTMLCS.getMessages();
    if (msgs.length === 0) {
        resultsWrapper.innerHTML = 'No errors found';
        return;
    }

    expectedMsgs      = expectedMsgs || [];
    expectedOmissions = expectedOmissions || [];

    var content = '<h3>Test results</h3>';
/*
    content += '<ul id="results-overview">';
    content += '<li><span class="result-count result-count-errors">2</span> <span class="result-type">errors</span></li>';
    content += '<li><span class="result-count result-count-warnings">3</span> <span class="result-type">warnings</span></li>';
    content += '<li><span class="result-count result-count-notices">33</span> <span class="result-type">notices</span></li>';
    content += '</ul>';
*/
    content    += '<table><tr>';
    content    += '<th>#</th><th>Type</th><th>Message</th><th>Code</th></tr>';

    for (var i = 0; i < msgs.length; i++) {
        var msg = msgs[i];
        var type = '';
        switch (msg.type) {
            case HTMLCS.ERROR:
                type = 'Error';
            break;

            case HTMLCS.WARNING:
                type = 'Warning';
            break;

            case HTMLCS.NOTICE:
                type = 'Notice';
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

        var foundClass = '';
        var relevantText = '';
        for (var j = 0; j < expectedMsgs.length; j++) {
            if (expectedMsgs[j] === noStdMsgParts) {
                foundClass   = ' found';
                relevantText = ' [expected]';
                break;
            }
        }
        for (var j = 0; j < expectedOmissions.length; j++) {
            if (expectedOmissions[j] === noStdMsgParts) {
                foundClass   = ' failed';
                relevantText = ' [failed]';
                break;
            }
        }

        content += '<tr class="' + type.toLowerCase() + foundClass + '">';
        content += '<td class="number">' + (i + 1) + '</td>';
        content += '<td class="assertType">' + type + '</td>'
        content += '<td class="messageText">' + msg.msg + relevantText + '</td>';
        content += '<td class="messageCode">' + msg.code + '</td></tr>';
    }

    content += '</table>';
    resultsWrapper.innerHTML = content;

}
