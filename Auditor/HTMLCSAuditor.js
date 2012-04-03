var HTMLCSAuditor = new function()
{
    var _prefix   = 'HTMLCS-';
    var _screen   = '';
    var _standard = '';
    var _source   = '';
    var _options  = {};
    var _messages = [];
    var _page     = 1;

    var self = this;

    /**
     * Build the "summary section" square button.
     *
     * @return {HTMLDivElement}
     */
    var buildSummaryButton = function(id, className, title, onclick) {
        var button       = document.createElement('div');
        button.id        = id;
        button.className = _prefix + 'button';
        button.setAttribute('title', title);

        var buttonInner       = document.createElement('span');
        buttonInner.className = _prefix + 'button-icon ' + _prefix + 'button-' + className;
        button.appendChild(buttonInner);

        var nbsp = document.createTextNode(String.fromCharCode(160));
        button.appendChild(nbsp);

        if ((onclick instanceof Function) === true) {
            button.onclick = function(event) {
                if (/disabled/.test(button.className) === false) {
                    var target = event.target;
                    var regexp = new RegExp(_prefix + 'button');
                    while (target !== null) {
                        if ((target.nodeName.toLowerCase() === 'div') && (regexp.test(target.className) === true)) {
                            break;
                        }
                        target = target.parentNode;
                    }

                    onclick(target);
                }
            };
        }

        return button;
    };

    /**
     * Build a checkbox.
     *
     * @return {HTMLDivElement}
     */
    var buildCheckbox = function(id, title, checked, disabled, onclick) {
        if (checked === undefined) {
            checked = false;
        }

        var label   = document.createElement('label');
        var content = '';
        label.className = _prefix + 'checkbox';

        content    += '<span class="' + _prefix + 'checkbox-switch">';
        content    += '<span class="' + _prefix + 'checkbox-slider"></span>';
        content    += '<input id="' + id + '" type="checkbox"';

        if (checked === true) {
            content += ' checked="checked"';
            label.className += ' active';
        }

        if (disabled === true) {
            content += ' disabled="disabled"';
            label.className += ' disabled';
        }

        content += ' title="' + title + '" /></span>';

        label.innerHTML = content;

        var input = label.getElementsByTagName('input')[0];
        input.onclick = function() {
            if (input.checked === true) {
                label.className += ' active';
            } else {
                label.className = label.className.replace('active', '');
            }

            if (onclick instanceof Function === true) {
                onclick(input);
            }
        };

        return label;
    };

    /**
     * Build a radio button.
     *
     * @return {HTMLDivElement}
     */
    var buildRadioButton = function(groupName, value, title, checked) {
        if (checked === undefined) {
            checked = false;
        }

        var label   = document.createElement('label');
        label.className = _prefix + 'radio';
        var content = '<span class="' + _prefix + 'radio-title">' + title + '</span>';
        content    += '<span class="' + _prefix + 'radio-switch">';
        content    += '<span class="' + _prefix + 'radio-slider"></span>';
        content    += '<input type="radio" name="' + _prefix + groupName + '" ';
        content    += 'class="' + _prefix + 'radiobtn"';
        content    += 'value="' + value + '"';

        if (checked === true) {
            content    += ' checked="true"';
        }

        content += ' /></span>';

        label.innerHTML = content;

        return label;
    };

    /**
     * Build the header section at the absolute top of the interface.
     *
     * @return {HTMLDivElement}
     */
    var buildHeaderSection = function(standard, wrapper) {
        var header       = document.createElement('div');
        header.className = _prefix + 'header';
        header.innerHTML = 'HTML_CodeSniffer by Squiz';
        header.setAttribute('title', 'Using standard ' + standard);

        var dragging = false;
        var prevX    = 0;
        var prevY    = 0;
        var mouseX   = 0;
        var mouseY   = 0;

        header.onmousedown = function(e) {
            dragging = true;
            mouseX   = e.clientX;
            mouseY   = e.clientY;
            return false;
        };

        document.onmousemove = function(e) {
            if (dragging === true) {
                var top = wrapper.offsetTop;
                var left = wrapper.offsetLeft;

                if (mouseY < e.clientY) {
                    top += (e.clientY - mouseY);
                    wrapper.style.top = top + 'px';
                } else if (mouseY > e.clientY) {
                    top -= (mouseY - e.clientY);
                    wrapper.style.top = top + 'px';
                }

                if (mouseX < e.clientX) {
                    left += (e.clientX - mouseX);
                    wrapper.style.left = left + 'px';
                } else if (mouseX > e.clientX) {
                    left -= (mouseX - e.clientX);
                    wrapper.style.left = left + 'px';
                }

                mouseX = e.clientX;
                mouseY = e.clientY;
            }//end if
        };

        document.onmouseup = function(e) {
            dragging = false;
        };

        var closeIcon       = document.createElement('div');
        closeIcon.className = _prefix + 'close';
        closeIcon.setAttribute('title', 'Close');
        closeIcon.onmousedown = function() {
            var wrapper = document.getElementById('HTMLCS-wrapper');
            if (wrapper) {
                document.body.removeChild(wrapper);
            }
        }

        header.appendChild(closeIcon);

        return header;
    };

    /**
     * Build the summary section of the interface.
     *
     * This includes the number of errors, warnings and notices; as well as buttons
     * to access the settings interface, and to recheck the content.
     *
     * @return {HTMLDivElement}
     */
    var buildSummarySection = function(errors, warnings, notices) {
        var summary       = document.createElement('div');
        summary.className = _prefix + 'summary';

        var leftPane       = document.createElement('div');
        leftPane.className = _prefix + 'summary-left';
        summary.appendChild(leftPane);

        var rightPane       = document.createElement('div');
        rightPane.className = _prefix + 'summary-right';
        summary.appendChild(rightPane);

        var leftContents = [];

        var divider = ', &nbsp;<span class="' + _prefix + 'divider"></span>';

        if (errors > 0) {
            var typeName = 'Errors';
            if (errors === 1) {
                typeName = 'Error';
            }
            leftContents.push('<strong>' + errors + '</strong> ' + typeName);
        }

        if (warnings > 0) {
            var typeName = 'Warnings';
            if (warnings === 1) {
                typeName = 'Warning';
            }
            leftContents.push('<strong>' + warnings + '</strong> ' + typeName);
        }

        if (notices > 0) {
            var typeName = 'Notices';
            if (notices === 1) {
                typeName = 'Notice';
            }
            leftContents.push('<strong>' + notices + '</strong> ' + typeName);
        }

        // Start lineage in left pane.
        var lineage       = document.createElement('ol');
        lineage.className = _prefix + 'lineage';

        // Back to summary item.
        var lineageHomeItem       = document.createElement('li');
        lineageHomeItem.className = _prefix + 'lineage-item';

        var lineageHomeLink       = document.createElement('a');
        lineageHomeLink.className = _prefix + 'lineage-link';
        lineageHomeLink.href      = 'javascript:';
        lineageHomeLink.innerHTML = '&nbsp;';
        lineageHomeLink.setAttribute('title', 'Summary');

        lineageHomeLink.onmousedown = function() {
            HTMLCSAuditor.run(_standard, _source, _options);
        };

        // Issue totals.
        var lineageTotalsItem       = document.createElement('li');
        lineageTotalsItem.className = _prefix + 'lineage-item';
        lineageTotalsItem.innerHTML = leftContents.join(divider);

        lineageHomeItem.appendChild(lineageHomeLink);
        lineage.appendChild(lineageHomeItem);
        lineage.appendChild(lineageTotalsItem);
        leftPane.appendChild(lineage);

        rightPane.appendChild(document.createTextNode(String.fromCharCode(160)));

        return summary;
    };

    /**
     * Build the summary section of the interface.
     *
     * This includes the number of errors, warnings and notices; as well as buttons
     * to access the settings interface, and to recheck the content.
     *
     * @return {HTMLDivElement}
     */
    var buildDetailSummarySection = function(issue, totalIssues) {
        var summary       = document.createElement('div');
        summary.className = _prefix + 'summary-detail';

        var leftPane       = document.createElement('div');
        leftPane.className = _prefix + 'summary-left';

        var rightPane       = document.createElement('div');
        rightPane.className = _prefix + 'summary-right';

        // Start lineage.
        var lineage       = document.createElement('ol');
        lineage.className = _prefix + 'lineage';

        var lineageHomeItem       = document.createElement('li');
        lineageHomeItem.className = _prefix + 'lineage-item';

        var lineageHomeLink       = document.createElement('a');
        lineageHomeLink.className = _prefix + 'lineage-link';
        lineageHomeLink.href      = 'javascript:';
        lineageHomeLink.innerHTML = '&nbsp;';
        lineageHomeLink.setAttribute('title', 'Summary');

        lineageHomeLink.onmousedown = function() {
            HTMLCSAuditor.run(_standard, _source, _options);
        };

        // Back to Report item.
        var lineageReportItem       = document.createElement('li');
        lineageReportItem.className = _prefix + 'lineage-item';

        var lineageReportLink       = document.createElement('a');
        lineageReportLink.className = _prefix + 'lineage-link';
        lineageReportLink.href      = 'javascript:';
        lineageReportLink.innerHTML = 'Report';
        lineageReportLink.setAttribute('title', 'Back to Report');

        lineageReportLink.onmousedown = function() {
            var list = document.querySelectorAll('.HTMLCS-inner-wrapper')[0];
            list.style.marginLeft = '0px';
            list.style.maxHeight  = null;

            summary.style.display = 'none';
            var listSummary = document.querySelectorAll('.HTMLCS-summary')[0];
            listSummary.style.display = 'block';
        };

        // Issue Count item.
        var lineageTotalsItem       = document.createElement('li');
        lineageTotalsItem.className = _prefix + 'lineage-item';
        lineageTotalsItem.innerHTML = issue + ' of ' + totalIssues;

        lineageHomeItem.appendChild(lineageHomeLink);
        lineageReportItem.appendChild(lineageReportLink);
        lineage.appendChild(lineageHomeItem);
        lineage.appendChild(lineageReportItem);
        lineage.appendChild(lineageTotalsItem);
        leftPane.appendChild(lineage);

        var buttonGroup       = document.createElement('div');
        buttonGroup.className = _prefix + 'button-group';

        var prevButton = buildSummaryButton(_prefix + 'button-previous-issue', 'previous', 'Previous Issue', function(target) {
            var newIssue = Number(issue) - 1;

            if (newIssue >= 1) {
                setCurrentDetailIssue(newIssue - 1);
                wrapper = summary.parentNode;
                var newSummary = buildDetailSummarySection(newIssue, totalIssues);
                wrapper.replaceChild(newSummary, summary);
                newSummary.style.display = 'block';

                var issueList = document.querySelectorAll('.HTMLCS-issue-detail-list')[0];
                issueList.firstChild.style.marginLeft = (parseInt(issueList.firstChild.style.marginLeft, 10) + 300) + 'px';
                pointToIssueElement(newIssue - 1);
            }//end if
        });

        var nextButton = buildSummaryButton(_prefix + 'button-next-issue', 'next', 'Next Issue', function(target) {
            var newIssue = Number(issue) + 1;

            if (newIssue <= _messages.length) {
                setCurrentDetailIssue(newIssue - 1);
                wrapper = summary.parentNode;
                var newSummary = buildDetailSummarySection(newIssue, totalIssues);
                wrapper.replaceChild(newSummary, summary);
                newSummary.style.display = 'block';

                var issueList = document.querySelectorAll('.HTMLCS-issue-detail-list')[0];
                issueList.firstChild.style.marginLeft = (parseInt(issueList.firstChild.style.marginLeft, 10) - 300) + 'px';
                pointToIssueElement(newIssue - 1);
            }//end if
        });

        if (issue === 1) {
            prevButton.className += ' disabled';
        } else if (issue === totalIssues) {
            nextButton.className += ' disabled';
        }

        buttonGroup.appendChild(prevButton);
        buttonGroup.appendChild(nextButton);
        rightPane.appendChild(buttonGroup);

        summary.appendChild(leftPane);
        summary.appendChild(rightPane);

        return summary;
    };

    /**
     * Build the main issue list section of the interface.
     *
     * This is what you see when the tests have finished running. A summary list of
     * , paged five at a time.
     *
     * @return {HTMLDivElement}
     */
    var buildIssueListSection = function(messages) {
        var issueListWidth = (Math.ceil(messages.length / 5) * 300);
        var issueList      = document.createElement('div');
        issueList.id        = _prefix + 'issues';
        issueList.className = _prefix + 'details';
        issueList.setAttribute('style', 'width: ' + issueListWidth + 'px');

        var listSection = document.createElement('ol');
        listSection.className = _prefix + 'issue-list';
        listSection.setAttribute('style', 'margin-left: 0');

        for (var i = 0; i < messages.length; i++) {
            if ((i > 0) && ((i % 5) === 0)) {
                issueList.appendChild(listSection);
                var listSection = document.createElement('ol');
                listSection.className = _prefix + 'issue-list';
            }

            var msg = buildMessageSummary(i, messages[i]);
            listSection.appendChild(msg);
        }

        issueList.appendChild(listSection);

        return issueList;
    };

    var buildIssueDetailSection = function(messages) {
        var issueListWidth  = (messages.length * 300);
        var issueList       = document.createElement('div');
        issueList.id        = _prefix + 'issues-detail';
        issueList.className = _prefix + 'details';
        issueList.setAttribute('style', 'width: ' + issueListWidth + 'px');

        var listSection = document.createElement('ol');
        listSection.className = _prefix + 'issue-detail-list';
        listSection.setAttribute('style', 'margin-left: 0');

        for (var i = 0; i < messages.length; i++) {
            var msg = buildMessageDetail(i, messages[i]);
            listSection.appendChild(msg);
        }

        issueList.appendChild(listSection);

        return issueList;
    };

    var buildSettingsSection = function() {
        var settingsDiv       = document.createElement('div');
        settingsDiv.className = _prefix + 'settings';

        var useStandardDiv = document.createElement('div');
        useStandardDiv.id = _prefix + 'settings-use-standard';

        var useStandardLabel       = document.createElement('label');
        useStandardLabel.innerHTML = 'Standards:';
        useStandardLabel.setAttribute('for', _prefix + 'settings-use-standard-select');

        var useStandardSelect       = document.createElement('select');
        useStandardSelect.id        = _prefix + 'settings-use-standard-select';
        useStandardSelect.innerHTML = '';

        var standards = ['WCAG2AAA', 'WCAG2AA', 'WCAG2A'];
        for (var i = 0; i < standards.length; i++) {
            var standard     = standards[i];
            var option       = document.createElement('option');
            option.value     = standard;
            option.innerHTML = window['HTMLCS_' + standard].name;

            if (standard === _standard) {
                option.selected = true;
            }

            useStandardSelect.appendChild(option);
            useStandardSelect.onchange = function() {
                _standard = this.options[this.selectedIndex].value;
                self.run(_standard, _source, _options);
            }
        }

        var issueCountDiv = document.createElement('div');
        issueCountDiv.id  = _prefix + 'settings-issue-count';

        var issueCountHelpDiv       = document.createElement('div');
        issueCountHelpDiv.id        = _prefix + 'settings-issue-count-help';
        issueCountHelpDiv.innerHTML = 'Select the types of issues to include in the report';

        var viewReportDiv       = document.createElement('div');
        viewReportDiv.id        = _prefix + 'settings-view-report';
        viewReportDiv.innerHTML = 'View Report';
        viewReportDiv.onclick   = function() {
            if (/disabled/.test(this.className) === false) {
                _options.show = {
                    error: document.getElementById(_prefix + 'include-error').checked,
                    warning: document.getElementById(_prefix + 'include-warning').checked,
                    notice: document.getElementById(_prefix + 'include-notice').checked
                }

                var wrapper = document.getElementById(_prefix + 'wrapper');
                var newWrapper        = self.build(_standard, _messages, _options);
                newWrapper.style.left = wrapper.style.left;
                newWrapper.style.top  = wrapper.style.top;
                document.body.replaceChild(newWrapper, wrapper);
            }//end if
        };

        var levels = {
            error: 0,
            warning: 0,
            notice: 0
        };

        var wrapper  = document.getElementById(_prefix + 'wrapper');
        var messages = HTMLCS.getMessages();
        for (var i = 0; i < messages.length; i++) {
            var ignore = false;
            if (wrapper) {
                if (wrapper === messages[i].element) {
                    ignore = true;
                } else if (document === messages[i].element) {
                    // Don't ignore document. This is to short-circuit calls to
                    // contains() because IE doesn't like document being the argument.
                    ignore = false;
                } else if ((wrapper.contains) && (wrapper.contains(messages[i].element) === true)) {
                    ignore = true;
                } else if ((wrapper.compareDocumentPosition) && ((wrapper.compareDocumentPosition(messages[i].element) & 16) > 0)) {
                    ignore = true;
                }
            }

            if (ignore === false) {
                switch (messages[i].type) {
                    case HTMLCS.ERROR:
                        levels.error++;
                    break;

                    case HTMLCS.WARNING:
                        levels.warning++;
                    break;

                    case HTMLCS.NOTICE:
                        levels.notice++;
                    break;

                    default:
                        // No default case.
                    break;
                }//end switch
            }//end if
        }//end for

        for (var level in levels) {
            var msgCount       = levels[level];
            var levelDiv       = document.createElement('div');
            levelDiv.className = _prefix + 'issue-tile ' + _prefix + level.toLowerCase();

            var levelCountDiv       = document.createElement('div');
            levelCountDiv.className = 'HTMLCS-tile-text';

            var content = '<strong>' + msgCount + '</strong> ' + level.substr(0, 1).toUpperCase() + level.substr(1);
            if (msgCount !== 1) {
                content += 's';
            }

            levelCountDiv.innerHTML = content;

            var checked  = true;
            var disabled = false;
            if (level === 'notice') {
                if ((levels.error === 0) && (levels.warning === 0)) {
                    checked = true;
                } else {
                    checked = _options.alwaysShowNotices;
                }
            } else if (msgCount === 0) {
                checked  = false;
                disabled = true;
            }

            var levelSwitch = buildCheckbox(_prefix + 'include-' + level, 'Toggle display of ' + level + ' messages', checked, disabled, function() {
                var enable = document.getElementById(_prefix + 'include-error').checked;
                enable     = enable || document.getElementById(_prefix + 'include-warning').checked;
                enable     = enable || document.getElementById(_prefix + 'include-notice').checked;
                if (enable === true) {
                    viewReportDiv.className = viewReportDiv.className.replace(/ disabled/, '');
                } else {
                    viewReportDiv.className += ' disabled';
                }
            });

            levelDiv.appendChild(levelCountDiv);
            levelDiv.appendChild(levelSwitch);
            issueCountDiv.appendChild(levelDiv);
        }

        useStandardDiv.appendChild(useStandardLabel);
        useStandardDiv.appendChild(useStandardSelect);

        settingsDiv.appendChild(useStandardDiv);
        settingsDiv.appendChild(issueCountDiv);
        settingsDiv.appendChild(issueCountHelpDiv);
        settingsDiv.appendChild(viewReportDiv);

        return settingsDiv;
    };

    var buildMessageSummary = function(id, message) {
        var msg       = '';
        var typeText  = '';
        var typeClass = '';

        switch (message.type) {
            case HTMLCS.ERROR:
                typeText = 'Error';
            break;

            case HTMLCS.WARNING:
                typeText = 'Warning';
            break;

            case HTMLCS.NOTICE:
                typeText = 'Notice';
            break;

            default:
                // Not defined.
            break;
        }//end switch

        var typeClass  = typeText.toLowerCase();
        var messageMsg = message.msg;
        if (messageMsg.length > 115) {
            messageMsg = messageMsg.substr(0, 115) + '…';
        }

        var msg = document.createElement('li');
        msg.id  = _prefix + 'msg-' + id;

        var typeIcon       = document.createElement('span');
        typeIcon.className = _prefix + 'issue-type ' + _prefix + typeClass;
        typeIcon.setAttribute('title', typeText);
        msg.appendChild(typeIcon);

        var msgTitle       = document.createElement('span');
        msgTitle.className = _prefix + 'issue-title';
        msgTitle.innerHTML = messageMsg;
        msg.appendChild(msgTitle);

        msg.onclick = function() {
            var id = this.id.replace(new RegExp(_prefix + 'msg-'), '');
            setCurrentDetailIssue(id);

            var detailList = document.querySelectorAll('.HTMLCS-issue-detail-list')[0];
            detailList.className += ' ' + _prefix + 'transition-disabled';
            detailList.firstChild.style.marginLeft = (id * -300) + 'px';

            pointToIssueElement(id);

            setTimeout(function() {
                detailList.className = detailList.className.replace(new RegExp(' ' + _prefix + 'transition-disabled'), '');
            }, 500);

            var list = document.querySelectorAll('.HTMLCS-inner-wrapper')[0];
            list.style.marginLeft = '-300px';
            list.style.maxHeight  = '15em';

            summary = document.querySelectorAll('.HTMLCS-summary-detail')[0];
            var newSummary = buildDetailSummarySection(parseInt(id) + 1, _messages.length);
            summary.parentNode.replaceChild(newSummary, summary);
            newSummary.style.display = 'block';

            var oldSummary = document.querySelectorAll('.HTMLCS-summary')[0];
            oldSummary.style.display = 'none';
        }

        return msg;
    };

    var setCurrentDetailIssue = function(id) {
        var detailList = document.querySelectorAll('.HTMLCS-issue-detail-list')[0];
        var items      = detailList.getElementsByTagName('li');
        for (var i = 0; i < items.length; i++) {
            items[i].className = items[i].className.replace(new RegExp(' ' + _prefix + 'current'), '');
        }

        var currentItem = document.getElementById('HTMLCS-msg-detail-' + id);
        currentItem.className += ' ' + _prefix + 'current';
    }

    var buildMessageDetail = function(id, message, standard) {
        var typeText  = '';

        var principles = {
            'Principle1': {
                name: 'Perceivable',
                link: 'http://www.w3.org/TR/WCAG20/#perceivable'
               },
            'Principle2': {
                name: 'Operable',
                link: 'http://www.w3.org/TR/WCAG20/#operable'
               },
            'Principle3': {
                name: 'Understandable',
                link: 'http://www.w3.org/TR/WCAG20/#understandable'
               },
            'Principle4': {
                name: 'Robust',
                link: 'http://www.w3.org/TR/WCAG20/#robust'
               }
        }

        switch (message.type) {
            case HTMLCS.ERROR:
                typeText = 'Error';
            break;

            case HTMLCS.WARNING:
                typeText = 'Warning';
            break;

            case HTMLCS.NOTICE:
                typeText = 'Notice';
            break;

            default:
                // Not defined.
            break;
        }//end switch

        var typeClass     = _prefix + typeText.toLowerCase();
        var msgCodeParts  = message.code.split('.', 5);
        var principle     = msgCodeParts[1];
        var techniques    = msgCodeParts[4].split(',');
        var techniquesStr = [];

        for (var i = 0; i < techniques.length; i++) {
            techniques[i]  = techniques[i].split('.');
            techniquesStr.push('<a href="http://www.w3.org/TR/WCAG20-TECHS/' + techniques[i][0] + '" target="_blank">' + techniques[i][0] + '</a>');
        }

        var msgDiv = document.createElement('li');
        msgDiv.id  = _prefix + 'msg-detail-' + id;

        var msgDetailsDiv       = document.createElement('div');
        msgDetailsDiv.className = _prefix + 'issue-details';

        var msgType       = document.createElement('span');
        msgType.className = _prefix + 'issue-type ' + typeClass;
        msgType.setAttribute('title', typeText);

        var msgTitle       = document.createElement('div');
        msgTitle.className = _prefix + 'issue-title';
        msgTitle.innerHTML = message.msg;

        var msgWcagRef       = document.createElement('div');
        msgWcagRef.className = _prefix + 'issue-wcag-ref';

        var refContent       = '<em>Principle:</em> <a href="' + principles[principle].link + '" target="_blank">' + principles[principle].name + '</a><br/>';
        refContent          += '<em>Technique:</em> ' + techniquesStr.join(' '); + '<br/>';
        msgWcagRef.innerHTML = refContent;

        msgDetailsDiv.appendChild(msgType);
        msgDetailsDiv.appendChild(msgTitle);
        msgDetailsDiv.appendChild(msgWcagRef);
        msgDiv.appendChild(msgDetailsDiv);

        // Build the source view, if outerHTML exists (Firefox >= 11, Webkit, IE),
        // and applies to the particular element (ie. document doesn't have it).
        if (message.element.outerHTML) {
            var preText  = '';
            var postText = '';

            if (message.element.innerHTML.length > 31) {
                var outerHTML = message.element.outerHTML.replace(message.element.innerHTML, message.element.innerHTML.substr(0, 31) + '...');
            } else {
                var outerHTML = message.element.outerHTML;
            }

            // Find previous siblings.
            var preNode = message.element.previousSibling;
            while (preText.length <= 31) {
                if (preNode === null) {
                    break;
                } else {
                    if (preNode.nodeType === 1) {
                        // Element node.
                        preText = preNode.outerHTML;
                    } else if (preNode.nodeType === 3) {
                        // Text node.
                        preText = preNode.textContent + preText;
                    }

                    if (preText.length > 31) {
                        preText = '...' + preText.substr(preText.length - 31);
                    }
                }

                preNode = preNode.previousSibling;
            }//end while

            // Find following siblings.
            var postNode = message.element.nextSibling;
            while (postText.length <= 31) {
                if (postNode === null) {
                    break;
                } else {
                    if (postNode.nodeType === 1) {
                        // Element node.
                        postText += postNode.outerHTML;
                    } else if (postNode.nodeType === 3) {
                        // Text node.
                        postText += postNode.textContent;
                    }

                    if (postText.length > 31) {
                        postText = postText.substr(0, 31) + '...';
                    }
                }

                postNode = postNode.nextSibling;
            }//end while

            var msgElementSource       = document.createElement('div');
            msgElementSource.className = _prefix + 'issue-source';

            // Header row.
            var msgElementSourceHeader       = document.createElement('div');
            msgElementSourceHeader.className = _prefix + 'issue-source-header';

            var msgSourceHeaderText         = document.createElement('strong');
            msgSourceHeaderText.textContent = 'Code Snippet';

            var btnPointTo = buildSummaryButton(_prefix + 'button-point-to-element', 'pointer', 'Point to Element', function() {
                pointer.container = document.getElementById(_prefix + 'wrapper');
                pointer.pointTo(message.element);
            })

            var btnCopy = buildSummaryButton(_prefix + 'copy-to-clipboard', 'copy', 'Copy to Clipboard');

            msgElementSourceHeader.appendChild(msgSourceHeaderText);
            msgElementSourceHeader.appendChild(btnPointTo);
            msgElementSourceHeader.appendChild(btnCopy);

            // Actual source code, highlighting offending element.
            var msgElementSourceInner       = document.createElement('div');
            msgElementSourceInner.className = _prefix + 'issue-source-inner';

            var msgElementSourceMain         = document.createElement('strong');
            msgElementSourceMain.textContent = outerHTML;
            msgElementSourceInner.appendChild(document.createTextNode(preText));
            msgElementSourceInner.appendChild(msgElementSourceMain);
            msgElementSourceInner.appendChild(document.createTextNode(postText));

            msgElementSource.appendChild(msgElementSourceHeader);
            msgElementSource.appendChild(msgElementSourceInner);
            msgDiv.appendChild(msgElementSource);
        }

        return msgDiv;
    };

    var buildNavigation = function(page, totalPages) {
        var navDiv       = document.createElement('div');
        navDiv.className = _prefix + 'navigation';

        var prev       = document.createElement('span');
        prev.className = _prefix + 'nav-button ' + _prefix + 'previous';
        prev.innerHTML = String.fromCharCode(160);

        if (page === 1) {
            prev.className += ' ' + _prefix + 'disabled';
        }

        navDiv.appendChild(prev);

        var pageNum       = document.createElement('span');
        pageNum.className = _prefix + 'page-number';
        pageNum.innerHTML = 'Page ' + page + ' of ' + totalPages;
        navDiv.appendChild(pageNum);

        var next       = document.createElement('span');
        next.className = _prefix + 'nav-button ' + _prefix + 'next';
        next.innerHTML = String.fromCharCode(160);

        if (page === totalPages) {
            next.className += ' ' + _prefix + 'disabled';
        }

        navDiv.appendChild(next);

        prev.onclick = function() {
            if (_page > 1) {
                _page--;
                if (_page === 1) {
                    prev.className += ' ' + _prefix + 'disabled';
                }
            }

            next.className    = next.className.replace(new RegExp(' ' + _prefix + 'disabled'), '');
            pageNum.innerHTML = 'Page ' + _page + ' of ' + totalPages;

            var issueList = document.querySelectorAll('.HTMLCS-issue-list')[0];
            issueList.style.marginLeft = ((_page - 1) * -300) + 'px';
        }

        next.onclick = function() {
            if (_page < totalPages) {
                _page++;
                if (_page === totalPages) {
                    next.className += ' ' + _prefix + 'disabled';
                }
            }

            prev.className    = prev.className.replace(new RegExp(' ' + _prefix + 'disabled'), '');
            pageNum.innerHTML = 'Page ' + _page + ' of ' + totalPages;

            var issueList = document.querySelectorAll('.HTMLCS-issue-list')[0];
            issueList.style.marginLeft = ((_page - 1) * -300) + 'px';
        }

        return navDiv;
    }

    var pointToIssueElement = function(issue) {
        var msg = _messages[Number(issue)];
        if (!msg.element) {
            return;
        }

        pointer.container = document.getElementById('HTMLCS-wrapper');
        pointer.pointTo(msg.element);

    };

    this.build = function(standard, messages, options) {
        var wrapper = document.getElementById(_prefix + 'wrapper');

        var errors   = 0;
        var warnings = 0;
        var notices  = 0;

        for (var i = 0; i < messages.length; i++) {
            // Filter only the wanted error types.
            var ignore = false;
            switch (messages[i].type) {
                case HTMLCS.ERROR:
                    if (options.show.error === false) {
                        ignore = true;
                    } else {
                        errors++;
                    }
                break;

                case HTMLCS.WARNING:
                    if (options.show.warning === false) {
                        ignore = true;
                    } else {
                        warnings++;
                    }
                break;

                case HTMLCS.NOTICE:
                    if (options.show.notice === false) {
                        ignore = true;
                    } else {
                        notices++;
                    }
                break;
            }//end switch

            if (ignore === true) {
                messages.splice(i, 1);
                i--;
            }
        }//end for

        _messages = messages;

        var settingsContents = '';
        var summaryContents  = '';
        var detailContents   = '';

        for (var i = 0; i < messages.length; i++) {
            if ((i % 5) === 0) {
                summaryContents += '<ol class="HTMLCS-issue-list"';

                if (i === 0) {
                    summaryContents += 'style="margin-left: 0em"';
                }

                summaryContents += '>';
            }

            summaryContents += buildMessageSummary(i, messages[i]);

            if (((i % 5) === 4) || (i === (messages.length - 1))) {
                summaryContents += '</ol>';
            }

            detailContents  += buildMessageDetail(i, messages[i], standard);
        }

        var detailWidth  = (i * 300);

        var wrapper       = document.createElement('div');
        wrapper.id        = _prefix + 'wrapper';
        wrapper.className = 'showing-issue-list';

        var header        = buildHeaderSection(standard, wrapper);
        var summary       = buildSummarySection(errors, warnings, notices);
        var summaryDetail = buildDetailSummarySection(1, messages.length);

        var innerWrapper       = document.createElement('div');
        innerWrapper.id        = _prefix + 'issues-wrapper';
        innerWrapper.className = _prefix + 'inner-wrapper';

        var issueList = buildIssueListSection(messages);
        innerWrapper.appendChild(issueList);

        var totalPages = Math.ceil(messages.length / 5);
        var navDiv     = buildNavigation(1, totalPages);
        innerWrapper.appendChild(navDiv);

        var outerWrapper       = document.createElement('div');
        outerWrapper.className = _prefix + 'outer-wrapper';
        outerWrapper.appendChild(innerWrapper);

        var innerWrapper       = document.createElement('div');
        innerWrapper.id        = _prefix + 'issues-detail-wrapper';
        innerWrapper.className = _prefix + 'inner-wrapper';

        var issueDetail = buildIssueDetailSection(messages);
        innerWrapper.appendChild(issueDetail);
        outerWrapper.appendChild(innerWrapper);

        wrapper.appendChild(header);
        wrapper.appendChild(summary);
        wrapper.appendChild(summaryDetail);
        wrapper.appendChild(outerWrapper);

        return wrapper;
    };

    this.buildSummaryPage = function() {
        var wrapper       = document.createElement('div');
        wrapper.id        = _prefix + 'wrapper';
        wrapper.className = 'showing-settings';

        var header = buildHeaderSection(_standard, wrapper);
        wrapper.appendChild(header);

        var summary = buildSettingsSection();
        wrapper.appendChild(summary);

        return wrapper;
    };

    this.changeScreen = function(screen) {
        var wrapper = document.getElementById(_prefix + 'wrapper');

        // Remove current "showing" section, add new one, then clean up the class name.
        wrapper.className  = wrapper.className.replace(new RegExp('showing-' + _screen), '');
        wrapper.className += ' showing-' + screen;
        wrapper.className  = wrapper.className.replace(/\s+/, ' ');
        _screen = screen;
    };

    /**
     * Run HTML_CodeSniffer and place the results in the auditor.
     *
     * @returns undefined
     */
    this.run = function(standard, source, options) {
        if ((source === null) || (source === undefined)) {
            // If not defined (or no longer existing?), check the document.
            source = document;
        } else if (source.nodeName) {
            // See if we are being sent a text box or text area; if so then
            // examine its contents rather than the node itself.
            if (source.nodeName.toLowerCase() === 'input') {
                if (source.hasAttribute('type') === false) {
                    // Inputs with no type default to text fields.
                    source = source.value;
                } else {
                    var inputType = source.getAttribute('type').toLowerCase();
                    if (inputType === 'text') {
                        // Text field.
                        source = source.value;
                    }
                }
            } else if (source.nodeName.toLowerCase() === 'textarea') {
                // Text area.
                source = source.value;
            }//end if
        }//end if

        if (options === undefined) {
            options = {};
        }

        // Save the options at this point, so we can refresh with them.
        _standard = standard;
        _source   = source;
        _options  = options;
        _page     = 1;
        _screen   = '';

        var target = document.getElementById(_prefix + 'wrapper');

        // Load the "processing" screen.
        var wrapper = self.buildSummaryPage();
        wrapper.className += ' processing';
        if (target) {
            wrapper.style.left = target.style.left;
            wrapper.style.top  = target.style.top;
            document.body.replaceChild(wrapper, target);
        } else {
            document.body.appendChild(wrapper);
        }

        // Process and replace with the issue list when finished.
        HTMLCS.process(standard, source, function() {
            // Before then, ignore warnings arising from the Advisor interface itself.
            _messages = HTMLCS.getMessages();
            for (var i = 0; i < _messages.length; i++) {
                var ignore = false;
                if (wrapper) {
                    if (wrapper === _messages[i].element) {
                        ignore = true;
                    } else if (document === _messages[i].element) {
                        // Don't ignore document. This is to short-circuit calls to
                        // contains() because IE doesn't like document being the argument.
                        ignore = false;
                    } else if ((wrapper.contains) && (wrapper.contains(_messages[i].element) === true)) {
                        ignore = true;
                    } else if ((wrapper.compareDocumentPosition) && ((wrapper.compareDocumentPosition(_messages[i].element) & 16) > 0)) {
                        ignore = true;
                    }
                }//end if

                if (ignore === true) {
                    _messages.splice(i, 1);
                    i--;
                }
            }//end for

            setTimeout(function() {
                var newWrapper = self.buildSummaryPage();
                newWrapper.style.left = wrapper.style.left;
                newWrapper.style.top  = wrapper.style.top;
                document.body.replaceChild(newWrapper, wrapper);
            }, 400);
        });
    };

    var pointer =
    {
        pointer: null,
        pointerDim: {},
        container: null,

        getBoundingRectangle: function(element)
        {
            if (!element) {
                return null;
            }

            // Retrieve the coordinates and dimensions of the element.
            var coords     = this.getElementCoords(element);
            var dimensions = this.getElementDimensions(element);
            var result     = {
                'x1' : coords.x,
                'y1' : coords.y,
                'x2' : coords.x + dimensions.width,
                'y2' : coords.y + dimensions.height
            };
            return result;

        },

        getElementDimensions: function(element)
        {
            var result = {
                width: element.offsetWidth,
                height: element.offsetHeight
            };

            return result;

        },

        getElementCoords: function(element)
        {
            var left = 0;
            var top  = 0;

            // Get parent window coords.
            var window = null;
            if (element.ownerDocument.defaultView) {
                window = element.ownerDocument.defaultView;
            } else {
                window = element.ownerDocument.parentWindow;
            }

            if (window && window.frameElement) {
                var elem = window.frameElement;
                do {
                    left += elem.offsetLeft;
                    top  += elem.offsetTop;
                } while (elem = elem.offsetParent)
            }

            do {
                left += element.offsetLeft;
                top  += element.offsetTop;
            } while (element = element.offsetParent)

            return {
                x: left,
                y: top
            };

        },

        getWindowDimensions: function(elem)
        {
            var window = this.getElementWindow(elem);
            var windowWidth  = 0;
            var windowHeight = 0;
            if (window.innerWidth) {
                // Will work on Mozilla, Opera and Safari etc.
                windowWidth  = window.innerWidth;
                windowHeight = window.innerHeight;
                // If the scrollbar is showing (it is always showing in IE) then its'
                // width needs to be subtracted from the height and/or width.
                var scrollWidth = this.getScrollbarWidth(elem);
                // The documentElement.scrollHeight.
                if (document.documentElement.scrollHeight > windowHeight) {
                    // Scrollbar is shown.
                    if (typeof scrollWidth === 'number') {
                        windowWidth -= scrollWidth;
                    }
                }

                if (document.body.scrollWidth > windowWidth) {
                    // Scrollbar is shown.
                    if (typeof scrollWidth === 'number') {
                        windowHeight -= scrollWidth;
                    }
                }
            } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
                // Internet Explorer.
                windowWidth  = document.documentElement.clientWidth;
                windowHeight = document.documentElement.clientHeight;
            } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                // Browsers that are in quirks mode or weird examples fall through here.
                windowWidth  = document.body.clientWidth;
                windowHeight = document.body.clientHeight;
            }//end if

            var result = {
                'width'  : windowWidth,
                'height' : windowHeight
            };
            return result;

        },

        getScrollbarWidth: function()
        {
            if (this.scrollBarWidth) {
                return this.scrollBarWidth;
            }

            var wrapDiv            = null;
            var childDiv           = null;
            var widthNoScrollBar   = 0;
            var widthWithScrollBar = 0;
            // Outer scrolling div.
            wrapDiv                = document.createElement('div');
            wrapDiv.style.position = 'absolute';
            wrapDiv.style.top      = '-1000px';
            wrapDiv.style.left     = '-1000px';
            wrapDiv.style.width    = '100px';
            wrapDiv.style.height   = '50px';
            // Start with no scrollbar.
            wrapDiv.style.overflow = 'hidden';

            // Inner content div.
            childDiv              = document.createElement('div');
            childDiv.style.width  = '100%';
            childDiv.style.height = '200px';

            // Put the inner div in the scrolling div.
            wrapDiv.appendChild(childDiv);
            // Append the scrolling div to the doc.
            document.body.appendChild(wrapDiv);

            // Width of the inner div sans scrollbar.
            widthNoScrollBar = childDiv.offsetWidth;
            // Add the scrollbar.
            wrapDiv.style.overflow = 'auto';
            // Width of the inner div width scrollbar.
            widthWithScrollBar = childDiv.offsetWidth;

            // Remove the scrolling div from the doc.
            document.body.removeChild(document.body.lastChild);

            // Pixel width of the scroller.
            var scrollBarWidth = (widthNoScrollBar - widthWithScrollBar);
            // Set the DOM variable so we don't have to run this again.
            this.scrollBarWidth = scrollBarWidth;
            return scrollBarWidth;

        },

        getScrollCoords: function(elem)
        {
            var window = this.getElementWindow(elem);

            var scrollX = 0;
            var scrollY = 0;
            if (window.pageYOffset) {
                // Mozilla, Firefox, Safari and Opera will fall into here.
                scrollX = window.pageXOffset;
                scrollY = window.pageYOffset;
            } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
                // This is the DOM compliant method of retrieving the scroll position.
                // Safari and OmniWeb supply this, but report wrongly when the window
                // is not scrolled. They are caught by the first condition however, so
                // this is not a problem.
                scrollX = document.body.scrollLeft;
                scrollY = document.body.scrollTop;
            } else {
                // Internet Explorer will get into here when in strict mode.
                scrollX = document.documentElement.scrollLeft;
                scrollY = document.documentElement.scrollTop;
            }

            var coords = {
                x: scrollX,
                y: scrollY
            };
            return coords;

        },

        getElementWindow: function(element)
        {
            element = element || document.body;

            var window = null;
            if (element.ownerDocument.defaultView) {
                window = element.ownerDocument.defaultView;
            } else {
                window = element.ownerDocument.parentWindow;
            }

            return window;

        },

        pointTo: function(elem) {
            // If the specified elem is not in the DOM then we cannot point to it.
            if (!elem) {
                return;
            }

            // Do not point to elem if its hidden.
            if (elem.style.visibility === 'hidden') {
                return;
            }

            // Get element coords.
            var rect = this.getBoundingRectangle(elem);

            // If we cannot get the position then dont do anything,
            // most likely element is hidden.
            if (rect.x1 === 0
                && rect.x2 === 0
                || rect.x1 === rect.x2
                || rect.y1 === rect.y2
            ) {
                return;
            }

            var pointer = this.getPointer(elem);

            pointer.style.display = 'block';
            pointer.style.opacity = 1;

            var pointerRect = this.getBoundingRectangle(pointer);
            var pointerH    = (pointerRect.y2 - pointerRect.y1);
            var pointerW    = (pointerRect.x2 - pointerRect.x1);

            this.pointerDim.height = pointerH;
            this.pointerDim.width  = pointerW;

            var bounceHeight = 20;
            var scroll       = this.getScrollCoords();
            var iframeScroll = this.getScrollCoords(elem);

            // Determine where to show the arrow.
            var winDim = this.getWindowDimensions(elem);
            window.scrollTo(0, rect.y1 - 100);

            // Try to position the pointer.
            //if ((rect.y1 - pointerH - bounceHeight) > iframeScroll.y) {
                // Arrow direction down.
                this.showPointer(elem, 'down');
           /* } else if ((rect.y2 + pointerH) < (winDim.height - iframeScroll.y)) {
                // Up.
                this.showPointer(elem, 'up');
            } else if ((rect.y2 + pointerW) < winDim.width) {
                // Left.
                this.showPointer(elem, 'left');
            } else if ((rect.y1 - pointerW) > 0) {
                // Right.
                this.showPointer(elem, 'right');
            }*/
        },

        getPointer: function(targetElement) {
            if (this.pointer && this.pointer.parentNode) {
                this.pointer.parentNode.removeChild(this.pointer);
            }

            this.pointer = document.createElement('div');
            var c        = 'HTMLCS';
            this.pointer.className = c + '-pointer ' + c + '-pointer-hidden';
            document.body.appendChild(this.pointer);
            //targetElement.ownerDocument.body.appendChild(this.pointer);

            return this.pointer;
        },

        showPointer: function(elem, direction) {
            var c = 'HTMLCS';

            this._removeDirectionClasses();

            this.pointer.className += ' ' + c + '-pointer-' + direction;
            this.pointer.className  = this.pointer.className.replace(c + '-pointer-hidden', '');

            var rect         = this.getBoundingRectangle(elem);
            var top          = 0;
            var left         = 0;
            var bounceHeight = 20;
            switch (direction) {
                case 'up':
                    bounceHeight = (-bounceHeight);
                    top          = rect.y2;
                    if ((rect.x2 - rect.x1) < 250) {
                        left = (this.getRectMidPnt(rect) - (this.pointerDim.width / 2));
                    } else {
                        left = rect.x1;
                    }
                break;

                case 'left':
                    left = rect.x2;
                    top  = this.getRectMidPnt(rect, true);
                break;

                case 'right':
                    left = (rect.x1 - this.pointerDim.width);
                    top  = this.getRectMidPnt(rect, true);
                break;

                case 'down':
                default:
                    top = (rect.y1 - this.pointerDim.height);
                    if ((rect.x2 - rect.x1) < 250) {
                        left = (this.getRectMidPnt(rect) - (this.pointerDim.width / 2));
                    } else {
                        left = rect.x1;
                    }
                break;
            }//end switch

            var frameScroll = this.getScrollCoords();

            this.pointer.style.top  = top  + 'px';
            this.pointer.style.left = left + 'px';

            // Check if the help window is under the pointer then re-position it.
            // Unless it is an element within the HTMLCS pop-up.
            var coords    = this.getBoundingRectangle(this.container);
            rect          = this.getBoundingRectangle(this.pointer);
            var posOffset = 20;
            var newPos    = null;
            var midX      = (rect.x1 + ((rect.x2 - rect.x1) / 2));
            var midY      = (rect.y1 + ((rect.y2 - rect.y1) / 2));
            if (coords.x1 <= midX
                && coords.x2 >= midX
                && coords.y1 <= midY
                && coords.y2 >= midY
            ) {
                var self = this;
                this.container.style.opactiy = 0.5;
                setTimeout(function() {
                    self.container.style.opactiy = 1;
                }, 4000);
            }

            var pointer = this.pointer;
            this.bounce(function() {
                setTimeout(function() {
                    if (pointer.parentNode) {
                        pointer.parentNode.removeChild(pointer);
                    }
                }, 1500);
            });

        },

        bounce: function(callback)
        {
            var pointer = this.pointer;
            var initialTop = Number(pointer.style.top.replace('px', ''));
            var currentTop = initialTop;
            var dist       = 30;
            var lowerLimit = (initialTop - dist);
            var maxBounce  = 5;

            var bounces   = 0;
            var direction = 'up';
            var i = setInterval(function() {
                if (direction === 'up') {
                    currentTop--;
                    pointer.style.top = currentTop + 'px';
                    if (currentTop < lowerLimit) {
                        direction = 'down';
                    }
                } else if (direction === 'down') {
                    currentTop++;
                    pointer.style.top = currentTop + 'px';

                    if (currentTop >= initialTop) {
                        direction = 'up';
                        bounces++;

                        if (bounces === maxBounce) {
                            clearInterval(i);
                            callback.call(this);
                            return;
                        }
                    }
                }
            }, 10);

        },

        getRectMidPnt: function(rect, height) {
            var midPnt = 0;
            if (height === true) {
                midPnt = (rect.y1 + ((rect.y2 - rect.y1) / 2));
            } else {
                midPnt = (rect.x1 + ((rect.x2 - rect.x1) / 2));
            }

            return midPnt;
        },

        _removeDirectionClasses: function() {
            var c = 'HTMLCS';
            var d = ['down', 'up', 'left', 'right'];
            var l = d.length;
            for (var i = 0; i < l; i++) {
                this.pointer.className = this.pointer.className.replace(c + '-pointer-' + d[i], '');
            }
        }

    }

};
