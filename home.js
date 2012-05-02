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

    var principles = {
        'Principle1': 'Perceivable',
        'Principle2': 'Operable',
        'Principle3': 'Understandable',
        'Principle4': 'Robust'
    };

    var msgs = HTMLCS.getMessages();
    if (msgs.length === 0) {
        resultsWrapper.innerHTML = 'No violations found';
        return;
    }

    var content = '<div id="test-results" class="hide-notice"><table id="test-results-table"><tr>';
    content    += '<th>#</th><th>Message</th><th>Principle</th><th><acronym title="Success Criterion">SC</acronym></th><th>Techniques</th></tr>';

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
        var msgParts   = msg.code.split('.');
        var principle  = msgParts[1];
        var sc         = msgParts[3];
        var techniques = msgParts[4];
        techniques     = techniques.split(',');

        // Build a message code without the standard name.
        msgParts.shift();
        msgParts.unshift('[Standard]');
        var noStdMsgParts = msgParts.join('.');

        content += '<tr class="' + type.toLowerCase() + '">';
        content += '<td class="number">' + (i + 1) + '<span class="flag"></span></td>';
        content += '<td class="messageText"><strong>' + type + ':</strong> ' + msg.msg + '</td>';
        content += '<td class="messagePrinciple">';
        content += '<a href="http://www.w3.org/TR/WCAG20/#' + principles[principle].toLowerCase() + '">' + principles[principle] + '</a>';
        content += '</td>';
        content += '<td class="messageSC">';
        content += '<a href="Standards/WCAG2/' + sc + '">' + sc.replace('_', '.', 'g') + '</a>';
        content += '</td>';
        content += '<td class="messageTechniques"><ul>';
        for (var j = 0; j < techniques.length; j++) {
            content += '<li><a href="http://www.w3.org/TR/UNDERSTANDING-WCAG20/' + techniques[j] + '">' + techniques[j] + '</a></li>';
        }
        content += '</ul></td>';
        content += '</tr>';
    }


    var heading = '<h3>Test results</h3>';

    heading += '<ul id="results-overview">';
    heading += '<li class="active"><a href="#" onclick="return toggleMsgTypes.call(this, \'error\');"><span class="result-count result-count-errors">' + errors + '</span> <span class="result-type">errors</span></a></li>';
    heading += '<li class="active"><a href="#" onclick="return toggleMsgTypes.call(this, \'warning\');"><span class="result-count result-count-warnings">' + warnings + '</span> <span class="result-type">warnings</span></a></li>';
    heading += '<li><a href="#" onclick="return toggleMsgTypes.call(this, \'notice\');"><span class="result-count result-count-notices">' + notices + '</span> <span class="result-type">notices</span></a></li>';
    heading += '</ul>';

    content  = heading + content;
    content += '</table>';
    content += '<span class="footnote"><em>Add the WCAG bookmarklet to your browser to run this test on any web page.</em></span></div>';
    resultsWrapper.innerHTML = content;

}

function runHTMLCSTest() {
    var source = document.getElementById('source').value;
    if (source !== '') {
        var level = '';
        for (var i = 0; i < document.getElementById('runHTMLCS').level.length; i++) {
            var option = document.getElementById('runHTMLCS').level[i];
            if (option.checked === true) {
                level = option.value;
                break;
            }
        }

        runHTMLCS(level, source, document.getElementById('resultsWrapper'), function() {
            scrollToElement(document.getElementById('test-area'));
        });

        var runBtn       = document.getElementById('run-button');
        runBtn.className = 'test-options-disabled';
    }
}

function activateHTMLCS() {
    var runBtn       = document.getElementById('run-button');
    runBtn.className = 'test-options-active';
}

function hideDiv() {
    document.getElementById('source').focus();
    var overlayDiv = document.getElementById('code-overlay');

    if (overlayDiv.style.opacity !== undefined) {
        overlayDiv.style.opacity = 0;
        setTimeout(function() {
            overlayDiv.style.visibility = "hidden";
        }, 400);
    } else {
        overlayDiv.style.visibility = "hidden";
    }
}

function scrollToElement(element) {
    var currScrollY   = null;

    var targetScrollY = 0;
    var op = element;
    while (op.offsetParent !== null) {
        targetScrollY += op.offsetTop;
        op = op.offsetParent;
    }

    if (window.pageYOffset !== undefined) {
        currScrollY = window.pageYOffset;
    } else if (document.documentElement.scrollTop !== undefined) {
        currScrollY = document.documentElement.scrollTop;
    } else if (document.body.scrollTop !== undefined) {
        currScrollY = document.body.scrollTop;
    }


    if (currScrollY !== targetScrollY) {
        var maxTick  = 1;
        var interval = setInterval(function() {
            var sign = 1;
            if (currScrollY > targetScrollY) {
                sign = -1;
            }
            var scrollBy = sign * Math.ceil(Math.max(1, Math.min(maxTick, (Math.abs(targetScrollY - currScrollY) * 0.25))));
            currScrollY += scrollBy;
            window.scrollBy(0, scrollBy);

            if (currScrollY === targetScrollY) {
                clearInterval(interval);
            } else {
                maxTick = Math.min(maxTick + 0.5, Math.abs(targetScrollY - currScrollY));
            }
        }, 20);
    }//end if
}

function toggleMsgTypes(type) {
    if (this.parentNode.className === 'active') {
        this.parentNode.className = '';
    } else {
        this.parentNode.className = 'active';
    }

    var testResultsDiv = document.getElementById('test-results');
    var className      = 'hide-' + type;

    if (new RegExp(className).test(testResultsDiv.className) === true) {
        testResultsDiv.className = testResultsDiv.className.replace(className, '');
    } else {
        testResultsDiv.className += ' ' + className;
    }

    return false;
}

window.onload = function() {
    var radios = document.querySelectorAll('.radio-gen');
    for (var i = 0; i < radios.length; i++) {
        radios[i].onclick = function(event) {
            event.target.previousSibling.click();
        }
    }

    var inputs = document.querySelectorAll('.radio-input');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].onclick = function(event) {
            var radios = document.querySelectorAll('.radio-gen');
            for (var j = 0; j < radios.length; j++) {
                radios[j].className = radios[j].className.replace(/ radio-on/, '');
            }

            event.target.nextSibling.className += ' radio-on';
        }
    }

    var source = document.getElementById('source');
    source.onkeypress = function() {
        activateHTMLCS();
    };

    source.onpaste = function() {
        activateHTMLCS();
    };
}
