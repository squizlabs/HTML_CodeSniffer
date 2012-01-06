function runHTMLCS()
{
    var level = document.getElementById('level');
    var source = document.getElementById('source');
    HTMLCS.process(level.value, source.value, function() {
        updateResults();
    });
}

function updateResults()
{
    var resultsWrapper = document.getElementById('resultsWrapper');
    resultsWrapper.innerHTML = '';

    var msgs = HTMLCS.getMessages();
    if (msgs.length === 0) {
        resultsWrapper.innerHTML = 'No errors found';
        return;
    }

    var content = '<table border="1" cellpadding="5"><tr>';
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
        for (var j = 0; j < testedMsgs.length; j++) {
            if (testedMsgs[j] === noStdMsgParts) {
                foundClass   = ' failed';
                relevantText = ' [failed]';
                break;
            }
        }

        content += '<tr class="' + type.toLowerCase() + foundClass + '">';
        content += '<td class="number">' + (i + 1) + '</td>';
        content += '<td class="assertType">' + type + '</td>'
        content += '<td class="messageText">' + msg.msg + relevantText + '</td>';
        content += '<td class="messageCode"><a href="../' + sc + '">' + msg.code + '</a></td></tr>';
    }

    content += '</table>';
    resultsWrapper.innerHTML = content;

}
