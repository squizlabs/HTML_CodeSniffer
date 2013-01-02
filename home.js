function runHTMLCS(standard, source, resultsDiv, callback)
{
    if (/resultsWrapperActive/.test(resultsDiv) === false) {
        resultsDiv.className += ' resultsWrapperActive';
    }

    resultsDiv.innerHTML = '<span class="loading"><img src="images/loading.gif" alt="Loading"> Sniffing...</span>';

    HTMLCS.process(standard, source, function() {
        if (standard === 'Section508') {
            updateResults508(resultsDiv);
        } else {
            updateResults(resultsDiv);
        }

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

    var content = '<table id="test-results-table"><tr>';
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
        var sc         = msgParts[3].split('_').slice(0, 3).join('_');
        var techniques = msgParts[4];
        techniques     = techniques.split(',');

        // Build a message code without the standard name.
        msgParts.shift();
        msgParts.unshift('[Standard]');
        var noStdMsgParts = msgParts.join('.');

        content += '<tr class="' + type.toLowerCase() + '">';
        content += '<td class="number"><span class="flag"></span></td>';
        content += '<td class="messageText"><strong>' + type + ':</strong> ' + msg.msg + '</td>';
        content += '<td class="messagePrinciple">';
        content += '<a href="http://www.w3.org/TR/WCAG20/#' + principles[principle].toLowerCase() + '">' + principles[principle] + '</a>';
        content += '</td>';
        content += '<td class="messageSC">';
        content += '<a href="Standards/WCAG2/' + sc + '">' + sc.replace(new RegExp('_', 'g'), '.') + '</a>';
        content += '</td>';
        content += '<td class="messageTechniques"><ul>';
        for (var j = 0; j < techniques.length; j++) {
            content += '<li><a href="http://www.w3.org/TR/WCAG20-TECHS/' + techniques[j] + '">' + techniques[j] + '</a></li>';
        }
        content += '</ul></td>';
        content += '</tr>';
    }


    var heading = '<h3>Test results</h3>';

    var noticeActive     = '';
    var testResultsClass = 'hide-notice';
    if ((errors === 0) && (warnings === 0)) {
        noticeActive     = ' class="active"';
        testResultsClass = '';
    }

    heading += '<ul id="results-overview">';
    heading += '<li class="active"><a href="#" onclick="return toggleMsgTypes.call(this, \'error\');"><span class="result-count result-count-errors">' + errors + '</span> <span class="result-type">errors</span></a></li>';
    heading += '<li class="active"><a href="#" onclick="return toggleMsgTypes.call(this, \'warning\');"><span class="result-count result-count-warnings">' + warnings + '</span> <span class="result-type">warnings</span></a></li>';
    heading += '<li' + noticeActive + '><a href="#" onclick="return toggleMsgTypes.call(this, \'notice\');"><span class="result-count result-count-notices">' + notices + '</span> <span class="result-type">notices</span></a></li>';
    heading += '</ul>';
    heading += '<div id="test-results" class="' + testResultsClass + '">';

    content  = heading + content;
    content += '</table>';
    content += '<div id="test-results-noMessages"><em>No messages matched the types you selected</em></div>';
    content += '<span class="footnote"><em>Add the Accessibility Auditor bookmarklet to your browser to run this test on any web page.</em></span></div>';
    resultsWrapper.innerHTML = content;

    reorderResults();
}

function updateResults508(resultsWrapper)
{
    resultsWrapper.innerHTML = '';

    var msgs = HTMLCS.getMessages();
    console.info(msgs);
    if (msgs.length === 0) {
        resultsWrapper.innerHTML = 'No violations found';
        return;
    }

    var content = '<table id="test-results-table"><tr>';
    content    += '<th>#</th><th>Message</th><th>Rule</th></tr>';

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
        var section  = msgParts[1];

        // Build a message code without the standard name.
        msgParts.shift();
        msgParts.unshift('[Standard]');
        var noStdMsgParts = msgParts.join('.');

        content += '<tr class="' + type.toLowerCase() + '">';
        content += '<td class="number"><span class="flag"></span></td>';
        content += '<td class="messageText"><strong>' + type + ':</strong> ' + msg.msg + '</td>';
        content += '<td class="messagePrinciple">';
        content += '<a href="./Standards/Section508#pr' + section.toUpperCase() + '">1194.22 (' + section.toLowerCase() + ')</a>';
        content += '</td>';
        content += '</tr>';
    }


    var heading = '<h3>Test results</h3>';

    var noticeActive     = '';
    var testResultsClass = 'hide-notice';
    if ((errors === 0) && (warnings === 0)) {
        noticeActive     = ' class="active"';
        testResultsClass = '';
    }

    heading += '<ul id="results-overview">';
    heading += '<li class="active"><a href="#" onclick="return toggleMsgTypes.call(this, \'error\');"><span class="result-count result-count-errors">' + errors + '</span> <span class="result-type">errors</span></a></li>';
    heading += '<li class="active"><a href="#" onclick="return toggleMsgTypes.call(this, \'warning\');"><span class="result-count result-count-warnings">' + warnings + '</span> <span class="result-type">warnings</span></a></li>';
    heading += '<li' + noticeActive + '><a href="#" onclick="return toggleMsgTypes.call(this, \'notice\');"><span class="result-count result-count-notices">' + notices + '</span> <span class="result-type">notices</span></a></li>';
    heading += '</ul>';
    heading += '<div id="test-results" class="' + testResultsClass + '">';

    content  = heading + content;
    content += '</table>';
    content += '<div id="test-results-noMessages"><em>No messages matched the types you selected</em></div>';
    content += '<span class="footnote"><em>Add the Accessibility Auditor bookmarklet to your browser to run this test on any web page.</em></span></div>';
    resultsWrapper.innerHTML = content;

    reorderResults();
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

    reorderResults();
    return false;
}

function reorderResults() {
    var testResultsDiv = document.getElementById('test-results');
    var numberCells    = testResultsDiv.querySelectorAll('tr td.number');
    var currRow        = 0;

    for (var i = 0; i < numberCells.length; i++) {
        if (window.getComputedStyle) {
            var display = window.getComputedStyle(numberCells[i].parentNode).display;
        } else {
            var display = numberCells[i].parentNode.currentStyle.display;
        }

        if (display !== 'none') {
            currRow++;
            numberCells[i].innerHTML = currRow;
        } else {
            numberCells[i].innerHTML = '';
        }
    }

    if (currRow === 0) {
        document.getElementById('test-results-noMessages').style.display = 'block';
    } else {
        document.getElementById('test-results-noMessages').style.display = 'none';
    }
}

// HTMLCSMeter.
function loadHTMLCSStats(callback)
{
    var feed = 'list';
    var key  = '0ArD0TOS0OvHkdEdLQ0pRbkgzRUp5T2JvRHRYQkZfS0E';
    var worksheet = 'od8';
    $.getJSON('http://spreadsheets.google.com/feeds/' + feed + '/' + key + '/' + worksheet + '/public/values?alt=json-in-script&single=true&callback=?', null, function(data) {
        var stats = {};
        var entry = data.feed.entry[0];
        var sec   = data.feed.entry[1];

        stats.errors         = parseInt(entry.gsx$errors.$t);
        stats.warnings       = parseInt(entry.gsx$warnings.$t);
        stats.notices        = parseInt(entry.gsx$notices.$t);
        stats.errorSeconds   = parseInt(sec.gsx$errors.$t);
        stats.warningSeconds = parseInt(sec.gsx$warnings.$t);
        stats.noticesSeconds = parseInt(sec.gsx$notices.$t);

        callback.call(this, stats);
    });
}

window.onload = function() {
    var radios = document.querySelectorAll('.radio-gen');
    var source = document.getElementById('source');

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

            if (source.value !== '') {
                activateHTMLCS();
            }
        }
    }

    source.onkeypress = function() {
        activateHTMLCS();
    };

    source.onpaste = function() {
        activateHTMLCS();
    };

    // Set the back-to-top div to appear only when a certain amount of pixels down.
    var topDiv = document.getElementById('back-to-top');
    window.onscroll = function() {
        var offset = window.pageYOffset || document.documentElement.scrollTop;

        if (offset >= 1200) {
            topDiv.className = 'on';
        } else {
            topDiv.className = 'off';
        }
    }

    window.onscroll();
}
