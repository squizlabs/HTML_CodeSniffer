/**
 * +--------------------------------------------------------------------+
 * | This HTML_CodeSniffer file is Copyright (c)                        |
 * | Squiz Pty Ltd (ABN 77 084 670 600)                                 |
 * +--------------------------------------------------------------------+
 * | IMPORTANT: Your use of this Software is subject to the terms of    |
 * | the Licence provided in the file licence.txt. If you cannot find   |
 * | this file please contact Squiz (www.squiz.com.au) so we may        |
 * | provide you a copy.                                                |
 * +--------------------------------------------------------------------+
 *
 */

_global.HTMLCSAuditor = new function()
{
    var _prefix   = 'HTMLCS-';
    var _screen   = '';
    var _standard = '';
    var _sources  = [];
    var _options  = {};
    var _doc      = null;
    var _top      = null;
    var _messages = [];
    var _page     = 1;
    var _sbWidth  = null;

    var self = this;

    this.pointerContainer = null;

    /**
     * Build the "summary section" square button.
     *
     * @return {HTMLDivElement}
     */
    var buildSummaryButton = function(id, className, title, onclick) {
        var button       = _doc.createElement('div');
        button.id        = id;
        button.className = _prefix + 'button';
        button.setAttribute('title', title);

        var buttonInner       = _doc.createElement('span');
        buttonInner.className = _prefix + 'button-icon ' + _prefix + 'button-' + className;
        button.appendChild(buttonInner);

        var nbsp = _doc.createTextNode(String.fromCharCode(160));
        button.appendChild(nbsp);

        if ((onclick instanceof Function) === true) {
            button.onclick = function() {
                if (/disabled/.test(button.className) === false) {
                    onclick(button);
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

        var label   = _doc.createElement('label');
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

        label.onclick = function(event) {
            if (disabled === false) {
                input.checked = !input.checked;

                if (input.checked === true) {
                    label.className += ' active';
                } else {
                    label.className = label.className.replace('active', '');
                }

                if (onclick instanceof Function === true) {
                    onclick(input);
                }
            }//end if

            return false;
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

        var label   = _doc.createElement('label');
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
        var header       = _doc.createElement('div');
        header.className = _prefix + 'header';
        header.innerHTML = 'HTML_CodeSniffer by Squiz';
        header.setAttribute('title', _global.HTMLCS.getTranslation("auditor_using_standard") + standard);

        var dragging = false;
        var prevX    = 0;
        var prevY    = 0;
        var mouseX   = 0;
        var mouseY   = 0;

        header.onmousedown = function(e) {
            e = e || window.event;

            dragging = true;
            mouseX   = e.clientX;
            mouseY   = e.clientY;
            return false;
        };

        _doc.onmousemove = function(e) {
            e = e || window.event;

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

        _doc.onmouseup = function(e) {
            var maxHeight = window.innerHeight - wrapper.offsetHeight;

            if (mouseY > maxHeight) {
                wrapper.style.top = maxHeight + 'px';
            } else if (mouseY < 0) {
                wrapper.style.top = 0 + 'px';
            }

            dragging = false;
        };

        var closeIcon       = _doc.createElement('div');
        closeIcon.className = _prefix + 'close';
        closeIcon.setAttribute('title', _global.HTMLCS.getTranslation("auditor_close"));
        closeIcon.onmousedown = function() {
            self.close.call(self);
        };

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
        var summary       = _doc.createElement('div');
        summary.className = _prefix + 'summary';

        var leftPane       = _doc.createElement('div');
        leftPane.className = _prefix + 'summary-left';
        summary.appendChild(leftPane);

        var rightPane       = _doc.createElement('div');
        rightPane.className = _prefix + 'summary-right';
        summary.appendChild(rightPane);

        var leftContents = [];

        var divider = ', &#160;<span class="' + _prefix + 'divider"></span>';

        if (errors > 0) {
            var typeName = _global.HTMLCS.getTranslation("auditor_errors");
            if (errors === 1) {
                typeName = _global.HTMLCS.getTranslation("auditor_error");
            }
            leftContents.push('<strong>' + errors + '</strong> ' + typeName);
        }

        if (warnings > 0) {
            var typeName = _global.HTMLCS.getTranslation("auditor_warnings");
            if (warnings === 1) {
                typeName = _global.HTMLCS.getTranslation("auditor_warning");
            }
            leftContents.push('<strong>' + warnings + '</strong> ' + typeName);
        }

        if (notices > 0) {
            var typeName = _global.HTMLCS.getTranslation("auditor_notices");
            if (notices === 1) {
                typeName = _global.HTMLCS.getTranslation("auditor_notice");
            }
            leftContents.push('<strong>' + notices + '</strong> ' + typeName);
        }

        // Start lineage in left pane.
        var lineage       = _doc.createElement('ol');
        lineage.className = _prefix + 'lineage';

        // Back to summary item.
        var lineageHomeItem       = _doc.createElement('li');
        lineageHomeItem.className = _prefix + 'lineage-item';

        var lineageHomeLink       = _doc.createElement('a');
        lineageHomeLink.className = _prefix + 'lineage-link';
        lineageHomeLink.href      = 'javascript:';

        var lineageHomeSpan       = _doc.createElement('span');
        lineageHomeSpan.innerHTML = 'Home';
        lineageHomeLink.appendChild(lineageHomeSpan);

        lineageHomeLink.onmousedown = function() {
            self.run(_standard, _sources, _options);
        };

        // Issue totals.
        var lineageTotalsItem       = _doc.createElement('li');
        lineageTotalsItem.className = _prefix + 'lineage-item';
        lineageTotalsItem.innerHTML = leftContents.join(divider);

        lineageHomeItem.appendChild(lineageHomeLink);
        lineage.appendChild(lineageHomeItem);
        lineage.appendChild(lineageTotalsItem);
        leftPane.appendChild(lineage);

        rightPane.appendChild(_doc.createTextNode(String.fromCharCode(160)));

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
        var summary       = _doc.createElement('div');
        summary.className = _prefix + 'summary-detail';

        var leftPane       = _doc.createElement('div');
        leftPane.className = _prefix + 'summary-left';

        var rightPane       = _doc.createElement('div');
        rightPane.className = _prefix + 'summary-right';

        // Start lineage.
        var lineage       = _doc.createElement('ol');
        lineage.className = _prefix + 'lineage';

        var lineageHomeItem       = _doc.createElement('li');
        lineageHomeItem.className = _prefix + 'lineage-item';

        var lineageHomeLink       = _doc.createElement('a');
        lineageHomeLink.className = _prefix + 'lineage-link';
        lineageHomeLink.href      = 'javascript:';

        var lineageHomeSpan       = _doc.createElement('span');
        lineageHomeSpan.innerHTML = _global.HTMLCS.getTranslation("auditor_home");
        lineageHomeLink.appendChild(lineageHomeSpan);

        lineageHomeLink.onmousedown = function() {
            self.run(_standard, _sources, _options);
        };

        // Back to Report item.
        var lineageReportItem       = _doc.createElement('li');
        lineageReportItem.className = _prefix + 'lineage-item';

        var lineageReportLink       = _doc.createElement('a');
        lineageReportLink.className = _prefix + 'lineage-link';
        lineageReportLink.href      = 'javascript:';
        lineageReportLink.innerHTML = _global.HTMLCS.getTranslation("auditor_report");
        lineageReportLink.setAttribute('title', _global.HTMLCS.getTranslation("auditor_back_to_report"));

        lineageReportLink.onmousedown = function() {
            var list = _doc.querySelectorAll('.HTMLCS-inner-wrapper')[0];
            list.style.marginLeft = '0px';
            list.style.maxHeight  = null;

            summary.style.display = 'none';
            var listSummary = _doc.querySelectorAll('.HTMLCS-summary')[0];
            listSummary.style.display = 'block';
        };

        // Issue Count item.
        var lineageTotalsItem       = _doc.createElement('li');
        lineageTotalsItem.className = _prefix + 'lineage-item';
        lineageTotalsItem.innerHTML = _global.HTMLCS.getTranslation("auditor_issue") + ' ' + issue + ' ' + _global.HTMLCS.getTranslation("auditor_of") + ' ' + totalIssues;

        lineageHomeItem.appendChild(lineageHomeLink);
        lineageReportItem.appendChild(lineageReportLink);
        lineage.appendChild(lineageHomeItem);
        lineage.appendChild(lineageReportItem);
        lineage.appendChild(lineageTotalsItem);
        leftPane.appendChild(lineage);

        var buttonGroup       = _doc.createElement('div');
        buttonGroup.className = _prefix + 'button-group';

        var prevButton = buildSummaryButton(_prefix + 'button-previous-issue', 'previous', _global.HTMLCS.getTranslation("auditor_previous_issue"), function(target) {
            var newIssue = Number(issue) - 1;

            if (newIssue >= 1) {
                setCurrentDetailIssue(newIssue - 1);
                wrapper = summary.parentNode;
                var newSummary = buildDetailSummarySection(newIssue, totalIssues);
                wrapper.replaceChild(newSummary, summary);
                newSummary.style.display = 'block';

                var issueList = _doc.querySelectorAll('.HTMLCS-issue-detail-list')[0];
                issueList.firstChild.style.marginLeft = (parseInt(issueList.firstChild.style.marginLeft, 10) + 300) + 'px';
                pointToIssueElement(newIssue - 1);
            }//end if
        });

        var nextButton = buildSummaryButton(_prefix + 'button-next-issue', 'next', _global.HTMLCS.getTranslation("auditor_next_issue"), function(target) {
            var newIssue = Number(issue) + 1;

            if (newIssue <= _messages.length) {
                setCurrentDetailIssue(newIssue - 1);
                wrapper = summary.parentNode;
                var newSummary = buildDetailSummarySection(newIssue, totalIssues);
                wrapper.replaceChild(newSummary, summary);
                newSummary.style.display = 'block';

                var issueList = _doc.querySelectorAll('.HTMLCS-issue-detail-list')[0];
                issueList.firstChild.style.marginLeft = (parseInt(issueList.firstChild.style.marginLeft, 10) - 300) + 'px';
                pointToIssueElement(newIssue - 1);
            }//end if
        });

        if (issue === 1) {
            prevButton.className += ' disabled';
        }

        if (issue === totalIssues) {
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
        var issueList      = _doc.createElement('div');
        issueList.id        = _prefix + 'issues';
        issueList.className = _prefix + 'details';
        issueList.setAttribute('style', 'width: ' + issueListWidth + 'px');

        var listSection = _doc.createElement('ol');
        listSection.className = _prefix + 'issue-list';
        listSection.setAttribute('style', 'margin-left: 0');

        for (var i = 0; i < messages.length; i++) {
            if ((i > 0) && ((i % 5) === 0)) {
                issueList.appendChild(listSection);
                var listSection = _doc.createElement('ol');
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
        var issueList       = _doc.createElement('div');
        issueList.id        = _prefix + 'issues-detail';
        issueList.className = _prefix + 'details';
        issueList.setAttribute('style', 'width: ' + issueListWidth + 'px');

        var listSection = _doc.createElement('ol');
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
        var settingsDiv       = _doc.createElement('div');
        settingsDiv.className = _prefix + 'settings';

        var useStandardDiv = _doc.createElement('div');
        useStandardDiv.id = _prefix + 'settings-use-standard';

        var useStandardLabel       = _doc.createElement('label');
        useStandardLabel.innerHTML = _global.HTMLCS.getTranslation("auditor_standards") + ':';
        useStandardLabel.setAttribute('for', _prefix + 'settings-use-standard-select');

        var useStandardSelect       = _doc.createElement('select');
        useStandardSelect.id        = _prefix + 'settings-use-standard-select';
        useStandardSelect.innerHTML = '';

        var standards = HTMLCSAuditor.getStandardList();
        for (var i = 0; i < standards.length; i++) {
            var standard     = standards[i];
            var option       = _doc.createElement('option');
            option.value     = standard;
            option.innerHTML = _global['HTMLCS_' + standard].name;

            if (standard === _standard) {
                option.selected = true;
            }

            useStandardSelect.appendChild(option);
            useStandardSelect.onchange = function() {
                _standard = this.options[this.selectedIndex].value;
                self.run(_standard, _sources, _options);
            };
        }

        var issueCountDiv = _doc.createElement('div');
        issueCountDiv.id  = _prefix + 'settings-issue-count';

        var issueCountHelpDiv       = _doc.createElement('div');
        issueCountHelpDiv.id        = _prefix + 'settings-issue-count-help';
        issueCountHelpDiv.innerHTML = _global.HTMLCS.getTranslation("auditor_select_types");

        var viewReportDiv       = _doc.createElement('div');
        viewReportDiv.id        = _prefix + 'settings-view-report';
        viewReportDiv.innerHTML = _global.HTMLCS.getTranslation("auditor_view_report");

        viewReportDiv.onclick = function() {
            if (/disabled/.test(this.className) === false) {
                _options.show = {
                    error: _doc.getElementById(_prefix + 'include-error').checked,
                    warning: _doc.getElementById(_prefix + 'include-warning').checked,
                    notice: _doc.getElementById(_prefix + 'include-notice').checked
                };

                var wrapper    = _doc.getElementById(_prefix + 'wrapper');
                var newWrapper = self.build(_standard, _messages, _options);

                if (_options.parentElement) {
                    _options.parentElement.replaceChild(newWrapper, wrapper);
                } else {
                    newWrapper.style.left = wrapper.style.left;
                    newWrapper.style.top  = wrapper.style.top;
                    _doc.body.replaceChild(newWrapper, wrapper);
                }

                if (_options.listUpdateCallback) {
                    _options.listUpdateCallback.call(this, _messages);
                }
            }//end if
        };

        var wrapper = _doc.getElementById(_prefix + 'wrapper');
        var levels  = self.countIssues(_messages);

        // Set default show options based on the first run. Don't re-do these, let
        // the user's settings take priority, unless there is no message.
        if ((_options.show === undefined) && (_messages.length > 0)) {
            _options.show = {
                error: true,
                warning: true,
                notice: false
            };

            if ((levels.error === 0) && (levels.warning === 0)) {
                _options.show.notice = true;
            }
        }

        for (var level in levels) {
            var msgCount       = levels[level];
            var levelDiv       = _doc.createElement('div');
            levelDiv.className = _prefix + 'issue-tile ' + _prefix + level.toLowerCase();
            var levelName = null;
            var levelCountDiv       = _doc.createElement('div');
            levelCountDiv.className = 'HTMLCS-tile-text';

            if(level == "error") {
                levelName = _global.HTMLCS.getTranslation('auditor_error');
                if (msgCount !== 1) {
                    levelName = _global.HTMLCS.getTranslation('auditor_errors');
                }
            }

            if(level == "warning") {
                levelName = _global.HTMLCS.getTranslation('auditor_warning');
                if (msgCount !== 1) {
                    levelName = _global.HTMLCS.getTranslation('auditor_warnings');
                }
            }

            if(level == "notice") {
                levelName = _global.HTMLCS.getTranslation('auditor_notice');
                if (msgCount !== 1) {
                    levelName = _global.HTMLCS.getTranslation('auditor_notices');
                }
            }
            var content = '<strong>' + msgCount + '</strong> ' + levelName;


            levelCountDiv.innerHTML = content;

            if (_options.show === undefined) {
                var checked  = false;
                var disabled = true;
            } else {
                var checked  = _options.show[level];
                var disabled = false;

                if (msgCount === 0) {
                    checked  = false;
                    disabled = true;
                }
            }

            var levelSwitch = buildCheckbox(_prefix + 'include-' + level, 'Toggle display of ' + level + ' messages', checked, disabled, function(input) {
                // Only change checkboxes that haven't been disabled.
                var enable = false;

                if (_doc.getElementById(_prefix + 'include-error').disabled === false) {
                    _options.show.error = _doc.getElementById(_prefix + 'include-error').checked;
                    enable = enable || _options.show.error;
                }

                if (_doc.getElementById(_prefix + 'include-warning').disabled === false) {
                    _options.show.warning = _doc.getElementById(_prefix + 'include-warning').checked;
                    enable = enable || _options.show.warning;
                }

                if (_doc.getElementById(_prefix + 'include-notice').disabled === false) {
                    _options.show.notice = _doc.getElementById(_prefix + 'include-notice').checked;
                    enable = enable || _options.show.notice;
                }

                if (enable === true) {
                    viewReportDiv.className = viewReportDiv.className.replace(/ disabled/g, '');
                } else {
                    viewReportDiv.className += ' disabled';
                }
            });

            levelDiv.appendChild(levelCountDiv);
            levelDiv.appendChild(levelSwitch);
            issueCountDiv.appendChild(levelDiv);
        }

        // Only disable if we have "currently showing" setting on.
        if (_options.show !== undefined) {
            var enable = (_options.show.error || _options.show.warning || _options.show.notice);
            if (enable === false) {
                viewReportDiv.className += ' disabled';
            }
        } else {
            viewReportDiv.className += ' disabled';
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
            messageMsg = messageMsg.substr(0, 115) + '...';
        }

        var msg = _doc.createElement('li');
        msg.id  = _prefix + 'msg-' + id;

        var typeIcon       = _doc.createElement('span');
        typeIcon.className = _prefix + 'issue-type ' + _prefix + typeClass;
        typeIcon.setAttribute('title', typeText);
        msg.appendChild(typeIcon);

        var msgTitle       = _doc.createElement('span');
        msgTitle.className = _prefix + 'issue-title';
        msgTitle.innerHTML = messageMsg;
        msg.appendChild(msgTitle);

        msg.onclick = function() {
            var id = this.id.replace(new RegExp(_prefix + 'msg-'), '');
            setCurrentDetailIssue(id);

            var detailList = _doc.querySelectorAll('.HTMLCS-issue-detail-list')[0];
            detailList.className += ' ' + _prefix + 'transition-disabled';
            detailList.firstChild.style.marginLeft = (id * -300) + 'px';

            pointToIssueElement(id);

            setTimeout(function() {
                detailList.className = detailList.className.replace(new RegExp(' ' + _prefix + 'transition-disabled'), '');
            }, 500);

            var list = _doc.querySelectorAll('.HTMLCS-inner-wrapper')[0];
            list.style.marginLeft = '-300px';
            list.style.maxHeight  = '15em';

            summary = _doc.querySelectorAll('.HTMLCS-summary-detail')[0];
            var newSummary = buildDetailSummarySection(parseInt(id) + 1, _messages.length);
            summary.parentNode.replaceChild(newSummary, summary);
            newSummary.style.display = 'block';

            var oldSummary = _doc.querySelectorAll('.HTMLCS-summary')[0];
            oldSummary.style.display = 'none';
        };

        return msg;
    };

    var setCurrentDetailIssue = function(id) {
        var detailList = _doc.querySelectorAll('.HTMLCS-issue-detail-list')[0];
        var items      = detailList.getElementsByTagName('li');
        for (var i = 0; i < items.length; i++) {
            items[i].className = items[i].className.replace(new RegExp(' ' + _prefix + 'current'), '');
        }

        var currentItem = _doc.getElementById('HTMLCS-msg-detail-' + id);
        currentItem.className += ' ' + _prefix + 'current';

        if (_options.showIssueCallback) {
            _options.showIssueCallback.call(this, id);
        }
    };

    var buildMessageDetail = function(id, message, standard) {
        if (standard === undefined) {
            standard = _standard;
        }

        var typeText  = '';

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

        var standardObj = HTMLCS.util.getElementWindow(_doc)['HTMLCS_' + standard];
        var standardObj = _top['HTMLCS_' + standard];
        var msgInfo = [];
        if (standardObj.getMsgInfo) {
            msgInfo = standardObj.getMsgInfo(message.code);
        }

        var msgDiv = _doc.createElement('li');
        msgDiv.id  = _prefix + 'msg-detail-' + id;

        var msgDetailsDiv       = _doc.createElement('div');
        msgDetailsDiv.className = _prefix + 'issue-details';

        var msgType       = _doc.createElement('span');
        msgType.className = _prefix + 'issue-type ' + typeClass;
        msgType.setAttribute('title', typeText);

        var msgTitle       = _doc.createElement('div');
        msgTitle.className = _prefix + 'issue-title';
        msgTitle.innerHTML = message.msg;

        var msgRef       = _doc.createElement('div');
        msgRef.className = _prefix + 'issue-wcag-ref';

        var refContent = '';
        for (var i = 0; i < msgInfo.length; i++) {
            refContent += '<em>' + msgInfo[i][0] + ':</em> ' + msgInfo[i][1] + '<br/>';
        }
        msgRef.innerHTML = refContent;

        msgDetailsDiv.appendChild(msgType);
        msgDetailsDiv.appendChild(msgTitle);
        msgDetailsDiv.appendChild(msgRef);
        msgDiv.appendChild(msgDetailsDiv);

        // If the item cannot be pointed to, tell them why.
        if (pointer.isPointable(message.element) === false) {
            var msgElementSource       = _doc.createElement('div');
            msgElementSource.className = _prefix + 'issue-source';
            msgDiv.appendChild(msgElementSource);

            var msgElementSourceInner       = _doc.createElement('div');
            msgElementSourceInner.className = _prefix + 'issue-source-inner-u2p';
            var msg = _global.HTMLCS.getTranslation('auditor_unable_to_point');

            if (message.element.nodeName === '#document') {
                msg = _global.HTMLCS.getTranslation('auditor_applies_entire_document');
            } else if (message.element.ownerDocument === null) {
                msg = _global.HTMLCS.getTranslation('auditor_unable_to_point_removed');
            } else {
                var body = message.element.ownerDocument.getElementsByTagName('body')[0];
                if (HTMLCS.util.isInDocument(message.element) === false) {
                    msg += _global.HTMLCS.getTranslation('auditor_unable_to_point_entire');
                } else if (HTMLCS.util.contains(body, message.element) === false) {
                    msg = _global.HTMLCS.getTranslation('auditor_unable_to_point_outside');
                } else {
                    msg += ' ' + _global.HTMLCS.getTranslation('auditor_unable_to_point_outside');
                }
            }

            if (msgElementSourceInner.textContent !== undefined) {
                msgElementSourceInner.textContent = msg;
            } else {
                // IE8 uses innerText instead. Oh well.
                msgElementSourceInner.innerText = msg;
            }

            msgElementSource.appendChild(msgElementSourceInner);
        }

        // Build the source view, if outerHTML exists (Firefox >= 11, Webkit, IE),
        // and applies to the particular element (ie. document doesn't have it).
        if (_options.customIssueSource) {
            var msgElementSource       = _doc.createElement('div');
            msgElementSource.className = _prefix + 'issue-source';
            msgDiv.appendChild(msgElementSource);
            _options.customIssueSource.call(this, id, message, standard, msgElementSource, msgDetailsDiv);
        } else {
            var msgElementSource       = _doc.createElement('div');
            msgElementSource.className = _prefix + 'issue-source';

            // Header row.
            var msgElementSourceHeader       = _doc.createElement('div');
            msgElementSourceHeader.className = _prefix + 'issue-source-header';

            var msgSourceHeaderText       = _doc.createElement('strong');
            msgSourceHeaderText.innerHTML =  _global.HTMLCS.getTranslation("auditor_code_snippet");

            var btnPointTo = buildSummaryButton(_prefix + 'button-point-to-element-' + id, 'pointer', _global.HTMLCS.getTranslation("auditor_point_to_element"), function() {
                self.pointToElement(message.element);
            });

            msgElementSourceHeader.appendChild(msgSourceHeaderText);
            msgElementSourceHeader.appendChild(btnPointTo);
            msgElementSource.appendChild(msgElementSourceHeader);

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
                            if (preNode.textContent !== undefined) {
                                preText = preNode.textContent + preText;
                            } else {
                                preText = preNode.nodeValue + preText;
                            }
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
                            if (postNode.textContent !== undefined) {
                                postText += postNode.textContent;
                            } else {
                                postText += postNode.nodeValue;
                            }
                        }

                        if (postText.length > 31) {
                            postText = postText.substr(0, 31) + '...';
                        }
                    }

                    postNode = postNode.nextSibling;
                }//end while

                // Actual source code, highlighting offending element.
                var msgElementSourceInner       = _doc.createElement('div');
                msgElementSourceInner.className = _prefix + 'issue-source-inner';

                var msgElementSourceMain       = _doc.createElement('strong');
                if (msgElementSourceMain.textContent !== undefined) {
                    msgElementSourceMain.textContent = outerHTML;
                } else {
                    // IE8 uses innerText instead. Oh well.
                    msgElementSourceMain.innerText = outerHTML;
                }

                msgElementSourceInner.appendChild(_doc.createTextNode(preText));
                msgElementSourceInner.appendChild(msgElementSourceMain);
                msgElementSourceInner.appendChild(_doc.createTextNode(postText));
                msgElementSource.appendChild(msgElementSourceInner);
            } else if (message.element.nodeName === '#document') {
                // Show nothing, it's the document root.
            } else {
                // No support for outerHTML.
                var msgElementSourceInner       = _doc.createElement('div');
                msgElementSourceInner.className = _prefix + 'issue-source-not-supported';

                var nsText = _global.HTMLCS.getTranslation('auditor_unsupported_browser');

                msgElementSourceInner.appendChild(_doc.createTextNode(nsText));
                msgElementSource.appendChild(msgElementSourceInner);
            }//end if

            msgDiv.appendChild(msgElementSource);
        }//end if

        return msgDiv;
    };

    var buildNavigation = function(page, totalPages) {
        var navDiv       = _doc.createElement('div');
        navDiv.className = _prefix + 'navigation';

        var prev       = _doc.createElement('span');
        prev.className = _prefix + 'nav-button ' + _prefix + 'previous';
        prev.innerHTML = String.fromCharCode(160);

        if (page === 1) {
            prev.className += ' ' + _prefix + 'disabled';
        }

        navDiv.appendChild(prev);

        var pageNum       = _doc.createElement('span');
        pageNum.className = _prefix + 'page-number';
        // pageNum.innerHTML = 'Page ' + page + ' of ' + totalPages;
        pageNum.innerHTML = _global.HTMLCS.getTranslation("auditor_page") + ' ' + page + ' ' + _global.HTMLCS.getTranslation("auditor_of") + ' ' + totalPages;
        navDiv.appendChild(pageNum);

        var next       = _doc.createElement('span');
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

            if (totalPages > 1) {
                next.className = next.className.replace(new RegExp(' ' + _prefix + 'disabled'), '');
            }

            pageNum.innerHTML = '';
            pageNum.appendChild(document.createTextNode(_global.HTMLCS.getTranslation("auditor_page") + ' ' + _page + ' ' + _global.HTMLCS.getTranslation("auditor_of") + ' ' + totalPages));

            var issueList = _doc.querySelectorAll('.HTMLCS-issue-list')[0];
            issueList.style.marginLeft = ((_page - 1) * -300) + 'px';
        };

        next.onclick = function() {
            if (_page < totalPages) {
                _page++;
                if (_page === totalPages) {
                    next.className += ' ' + _prefix + 'disabled';
                }
            }

            if (totalPages > 1) {
                prev.className = prev.className.replace(new RegExp(' ' + _prefix + 'disabled'), '');
            }

            pageNum.innerHTML = '';
            pageNum.appendChild(document.createTextNode(_global.HTMLCS.getTranslation("auditor_page") + ' ' + _page + ' ' + _global.HTMLCS.getTranslation("auditor_of") + ' ' + totalPages));

            var issueList = _doc.querySelectorAll('.HTMLCS-issue-list')[0];
            issueList.style.marginLeft = ((_page - 1) * -300) + 'px';
        };

        return navDiv;
    };

    var pointToIssueElement = function(issue) {
        var msg = _messages[Number(issue)];
        if (!msg.element) {
            return;
        }

        var btnPointTo    = _doc.getElementById(_prefix + 'button-point-to-element-' + issue);
        pointer.container = self.pointerContainer || _doc.getElementById('HTMLCS-wrapper');

        if (pointer.isPointable(msg.element) === false) {
            var myPointer = pointer.getPointer(msg.element);

            if (pointer.pointer) {
                myPointer.className += ' HTMLCS-pointer-hidden';
            }

            if (btnPointTo) {
                btnPointTo.className += ' disabled';
            }
        } else {
            if (btnPointTo) {
                btnPointTo.className =  btnPointTo.className.replace(' disabled', '');
            }

            pointer.pointTo(msg.element);
        }

    };

    var loadStandards = function(standards, callback) {
        if (standards.length === 0) {
            callback.call(this);
            return;
        }

        var standard = standards.shift();
        HTMLCS.loadStandard(standard, function() {
            loadStandards(standards, callback);
        });

    };

    /**
     * Includes the specified JS file.
     *
     * @param {String}   src      The URL to the JS file.
     * @param {Function} callback The function to call once the script is loaded.
     */
    var _includeScript = function(src, callback) {
        var script    = document.createElement('script');
        script.onload = function() {
            script.onload = null;
            script.onreadystatechange = null;

            if ((callback instanceof Function) === true) {
                callback.call(this);
            }
        };

        script.onreadystatechange = function() {
            if (/^(complete|loaded)$/.test(this.readyState) === true) {
                script.onreadystatechange = null;
                script.onload();
            }
        };

        script.src = src;

        if (document.head) {
            document.head.appendChild(script);
        } else {
            document.getElementsByTagName('head')[0].appendChild(script);
        }
    };

    this.setOption = function(name, value) {
        _options[name] = value;
    };

    this.getIssue = function(issueNumber)
    {
        return _messages[issueNumber];

    };

    this.countIssues = function(messages)
    {
        var counts = {
            error: 0,
            warning: 0,
            notice: 0
        };

        for (var i = 0; i < messages.length; i++) {
            switch (messages[i].type) {
            case HTMLCS.ERROR:
                counts.error++;
                break;

            case HTMLCS.WARNING:
                counts.warning++;
                break;

            case HTMLCS.NOTICE:
                counts.notice++;
                break;
            }//end switch
        }//end for

        return counts;
    };

    this.build = function(standard, messages, options) {
        var wrapper = null;
        if (_doc) {
            var wrapper = _doc.getElementById(_prefix + 'wrapper');
        }

        var errors   = 0;
        var warnings = 0;
        var notices  = 0;

        for (var i = 0; i < messages.length; i++) {
            // Filter only the wanted error types.
            var ignore = false;
            switch (messages[i].type) {
            case HTMLCS.ERROR:
                if (_options.show.error === false) {
                    ignore = true;
                } else {
                    errors++;
                }
                break;

            case HTMLCS.WARNING:
                if (_options.show.warning === false) {
                    ignore = true;
                } else {
                    warnings++;
                }
                break;

            case HTMLCS.NOTICE:
                if (_options.show.notice === false) {
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

        var wrapper       = _doc.createElement('div');
        wrapper.id        = _prefix + 'wrapper';
        wrapper.className = 'showing-issue-list';

        if (_options.noHeader !== true) {
            var header = buildHeaderSection(standard, wrapper);
            wrapper.appendChild(header);
        }

        var summary       = buildSummarySection(errors, warnings, notices);
        var summaryDetail = buildDetailSummarySection(1, messages.length);

        var innerWrapper       = _doc.createElement('div');
        innerWrapper.id        = _prefix + 'issues-wrapper';
        innerWrapper.className = _prefix + 'inner-wrapper';

        var issueList = buildIssueListSection(messages);
        innerWrapper.appendChild(issueList);

        var totalPages = Math.ceil(messages.length / 5);
        var navDiv     = buildNavigation(1, totalPages);
        innerWrapper.appendChild(navDiv);

        var outerWrapper       = _doc.createElement('div');
        outerWrapper.className = _prefix + 'outer-wrapper';
        outerWrapper.appendChild(innerWrapper);

        var innerWrapper       = _doc.createElement('div');
        innerWrapper.id        = _prefix + 'issues-detail-wrapper';
        innerWrapper.className = _prefix + 'inner-wrapper';

        var issueDetail = buildIssueDetailSection(messages);
        innerWrapper.appendChild(issueDetail);
        outerWrapper.appendChild(innerWrapper);

        wrapper.appendChild(summary);
        wrapper.appendChild(summaryDetail);
        wrapper.appendChild(outerWrapper);

        return wrapper;
    };

    this.buildSummaryPage = function() {
        var wrapper       = _doc.createElement('div');
        wrapper.id        = _prefix + 'wrapper';
        wrapper.className = 'showing-settings';

        if (_options.noHeader !== true) {
            var header = buildHeaderSection(_standard, wrapper);
            wrapper.appendChild(header);
        }

        var summary = buildSettingsSection();
        wrapper.appendChild(summary);

        return wrapper;
    };

    this.changeScreen = function(screen) {
        var wrapper = _doc.getElementById(_prefix + 'wrapper');

        // Remove current "showing" section, add new one, then clean up the class name.
        wrapper.className  = wrapper.className.replace(new RegExp('showing-' + _screen), '');
        wrapper.className += ' showing-' + screen;
        wrapper.className  = wrapper.className.replace(/\s+/, ' ');
        _screen = screen;
    };

    this.includeCss = function(prefix, doc) {
        if (_options.includeCss === false) {
            return;
        }

        if (doc === undefined) {
            doc = _doc;
        }

        var head     = doc.querySelector('head');
        var exLinks  = head.getElementsByTagName('link');
        var foundCss = false;
        for (var i = 0; i < exLinks.length; i++) {
            if (new RegExp(prefix + '\.css').test(exLinks[i].getAttribute('href')) === true) {
                foundCss = true;
                break;
            }
        }

        if (foundCss === false) {
            var cssLink  = doc.createElement('link');
            cssLink.rel  = 'stylesheet';
            cssLink.type = 'text/css';
            cssLink.href = _options.path + prefix + '.css';
            head.appendChild(cssLink);
        }
    };

    this.getStandardList = function() {
        var pattern   = /^HTMLCS_[^_]+$/;
        var standards = [];
        for (i in window) {
            if (pattern.test(i) === true) {
                var standard = window[i];
                if (standard.sniffs && standard.name) {
                    standards.push(i.substr(7));
                }
            }
        }

        return standards;
    };

    this.getParentElement = function() {
        var parentEl = null;
        if (_options.parentElement) {
            parentEl = _options.parentElement;
        } else if (_top.frames.length > 0) {
            var largestFrameSize = -1;
            var largestFrame     = null;

            for (var i = 0; i < _top.frames.length; i++) {
                try {
                    if (window.frames[i].frameElement.nodeName.toLowerCase() === 'frame') {
                        if (window.frames[i].document) {
                            var frameSize = window.frames[i].innerWidth * window.frames[i].innerHeight;
                            if (frameSize > largestFrameSize) {
                                largestFrameSize = frameSize;
                                largestFrame     = window.frames[i].document.body;
                            }
                        }//end if
                    }//end if
                } catch (ex) {
                    // Skip cross-domain frames. Can't do much about those.
                }//end try
            }//end for

            if (largestFrame === null) {
                // They're all iframes. Just use the main document body.
                parentEl = document.body;
            } else {
                parentEl = largestFrame;
            }
        } else {
            parentEl = document.body;
        }

        return parentEl;
    };

    this.getOwnerDocument = function() {
        var _doc = this.getParentElement();
        if (_doc.ownerDocument) {
            _doc = _doc.ownerDocument;
        }

        return _doc;
    };

    /**
     * Get the current document's language.
     *
     * @return string
     */
    this.getDocumentLanguage = function() {
        var defaultLang = 'en';
        var doc = this.getOwnerDocument();
        var html = doc.getElementsByTagName('html')[0];
        if (html) {
            var lang = html.getAttribute('lang');
            if (lang) { 
                return lang;
            }
        }

        return defaultLang;
    };

    /**
     * Run HTML_CodeSniffer and place the results in the auditor.
     *
     * @returns undefined
     */
    this.run = function(standard, source, options) {
        // Save the top window.
        _top = window;

        var standards       = this.getStandardList();
        var standardsToLoad = [];
        for (var i = 0; i < standards.length; i++) {
            if (!_global['HTMLCS_' + standards[i]]) {
                standardsToLoad.push(standards[i]);
            }
        }

        if (standardsToLoad.length > 0) {
            loadStandards(standardsToLoad, function() {
                self.run(standard, source, options);
            });
            return;
        }

        if ((source === null) || (source === undefined)) {
            // If not defined (or no longer existing?), check the document.
            source = [];

            if (document.querySelectorAll('frameset').length === 0) {
                source.push(document);
            }

            if (_top.frames.length > 0) {
                for (var i = 0; i < _top.frames.length; i++) {
                    try {
                        source.push(_top.frames[i].document);
                    } catch (ex) {
                        // If no access permitted to the document (eg.
                        // cross-domain), then ignore.
                    }
                }
            }
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
        }

        if ((source instanceof Array) === false) {
            source = [source];
        }//end if

        if (options === undefined) {
            options = {};
        }

        // Save the options at this point, so we can refresh with them.
        _standard = standard;
        _sources  = source;
        _options  = options;
        _page     = 1;
        _screen   = '';
        _messages = [];

        var parentEl = this.getParentElement();
        _doc         = this.getOwnerDocument();

        if (!_options.path) {
            _options.path = './';
        }

        if (!options.lang) {
            _options.lang = this.getDocumentLanguage();
        }

        if (_options.includeCss === undefined) {
            _options.includeCss = true;
        }

        if (_options.ignoreMsgCodes === undefined) {
            _options.ignoreMsgCodes = [];
        }

        this.includeCss('HTMLCS');

        var target    = _doc.getElementById(_prefix + 'wrapper');
        var newlyOpen = false;

        // Load the "processing" screen.
        var wrapper        = self.buildSummaryPage();
        wrapper.className += ' HTMLCS-processing';

        if (target) {
            wrapper.style.left = target.style.left;
            wrapper.style.top  = target.style.top;
            parentEl.replaceChild(wrapper, target);
        } else {
            // Being opened for the first time (in this frame).
            if (_options.openCallback) {
                _options.openCallback.call(this);
            }

            newlyOpen = true;
            parentEl.appendChild(wrapper);
        }

        // Process and replace with the issue list when finished.
        var _finalise = function() {
            // Before then, ignore warnings arising from the Advisor interface itself.
            for (var i = 0; i < _messages.length; i++) {
                var ignore = false;
                if (wrapper) {
                    if (wrapper === _messages[i].element) {
                        ignore = true;
                    } else if (_messages[i].element.documentElement) {
                        // Short-circuit document objects. IE doesn't like documents
                        // being the argument of contains() calls.
                        ignore = false;
                    } else if ((wrapper.contains) && (wrapper.contains(_messages[i].element) === true)) {
                        ignore = true;
                    } else if ((wrapper.compareDocumentPosition) && ((wrapper.compareDocumentPosition(_messages[i].element) & 16) > 0)) {
                        ignore = true;
                    }
                }//end if

                for (var j = 0; j < options.ignoreMsgCodes.length; j++) {
                    if (new RegExp(options.ignoreMsgCodes[j]).test(_messages[i].code) === true) {
                        ignore = true;
                        break;
                    }
                }

                if (ignore === true) {
                    _messages.splice(i, 1);
                    i--;
                }
            }//end for

            // -- Google Analytics Beacon Placeholder -- //

            if (_options.runCallback) {
                var _newMsgs = _options.runCallback.call(this, _messages, newlyOpen);
                if ((_newMsgs instanceof Array) === true) {
                    _messages = _newMsgs;
                }
            }

            setTimeout(function() {
                var wrapper    = _doc.getElementById(_prefix + 'wrapper');
                var newWrapper = self.buildSummaryPage();

                newWrapper.style.left = wrapper.style.left;
                newWrapper.style.top  = wrapper.style.top;
                parentEl.replaceChild(newWrapper, wrapper);
            }, 400);
        };

        var _processSource = function(standard, sources) {
            var source = sources.shift();

            // Source is undefined. Keep shifting, until we find one or we run
            // out of array elements.
            while (!source) {
                if (sources.length === 0) {
                    _finalise();
                    return;
                } else {
                    source = sources.shift();
                }
            }

            HTMLCS.process(standard, source, function() {
                _messages = _messages.concat(HTMLCS.getMessages());
                if (sources.length === 0) {
                    _finalise();
                } else {
                    _processSource(standard, sources);
                }
            }, function() {}, options.lang);
        };

        _processSource(standard, _sources.concat([]));
    };

    this.versionCheck = function(response) {
        if (response && (response.currentVersion !== null)) {
            if (response.newVersion > response.currentVersion) {
                var msgElementSource = _doc.createElement('div');
                msgElementSource.id  = _prefix + 'settings-updated-notification';
                _doc.documentElement.querySelector('.HTMLCS-settings').appendChild(msgElementSource);

                var msg = 'HTML_CodeSniffer has been updated to version ' + response.newVersion + '.';
                msg    += ' <a href="http://squizlabs.github.io/HTML_CodeSniffer/patches/' + response.newVersion + '">View the changelog</a>';

                msgElementSource.innerHTML = msg;
            }//end if
        }//end if
    };

    this.close = function() {
        if (_doc) {
            var wrapper = _doc.getElementById('HTMLCS-wrapper');

            if (wrapper) {
                var pointerEl = pointer.getPointer(wrapper);
                if (pointerEl && pointerEl.parentNode) {
                    pointerEl.parentNode.removeChild(pointerEl);
                }

                wrapper.parentNode.removeChild(wrapper);

                if (_options.closeCallback) {
                    _messages = _options.closeCallback.call(this);
                }
            }//end if
        }//end if
    };

    this.pointToElement = function(element) {
        pointer.container = self.pointerContainer || _doc.getElementById('HTMLCS-wrapper');
        pointer.pointTo(element);

    };

    this.getCurrentStandard = function() {
        return _standard;

    };

    var pointer =
    {
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

        getElementCoords: function(element, absolute)
        {
            var left = 0;
            var top  = 0;

            // Get parent window coords.
            var window = HTMLCS.util.getElementWindow(element);

            if (absolute === true) {
                var topWin = window.top;
            } else {
                var topWin = window;
            }

            while (true) {
                do {
                    left += element.offsetLeft;
                    top  += element.offsetTop;
                } while (element = element.offsetParent);

                if (window === topWin) {
                    break;
                } else {
                    element = window.frameElement;
                    window  = window.parent;

                    if (element.nodeName.toLowerCase() === 'frame') {
                        // We can't go any further if we hit a proper frame.
                        break;
                    }
                }
            }//end while

            return {
                x: left,
                y: top
            };

        },

        getWindowDimensions: function(elem)
        {
            var window = HTMLCS.util.getElementWindow(elem);
            var doc    = elem.ownerDocument;

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
                if (doc.documentElement.scrollHeight > windowHeight) {
                    // Scrollbar is shown.
                    if (typeof scrollWidth === 'number') {
                        windowWidth -= scrollWidth;
                    }
                }

                if (doc.body.scrollWidth > windowWidth) {
                    // Scrollbar is shown.
                    if (typeof scrollWidth === 'number') {
                        windowHeight -= scrollWidth;
                    }
                }
            } else if (doc.documentElement && (doc.documentElement.clientWidth || doc.documentElement.clientHeight)) {
                // Internet Explorer.
                windowWidth  = doc.documentElement.clientWidth;
                windowHeight = doc.documentElement.clientHeight;
            } else if (doc.body && (doc.body.clientWidth || doc.body.clientHeight)) {
                // Browsers that are in quirks mode or weird examples fall through here.
                windowWidth  = doc.body.clientWidth;
                windowHeight = doc.body.clientHeight;
            }//end if

            var result = {
                'width'  : windowWidth,
                'height' : windowHeight
            };
            return result;

        },

        getScrollbarWidth: function(elem)
        {
            if (_sbWidth !== null) {
                return _sbWidth;
            }

            doc = elem.ownerDocument;

            var wrapDiv            = null;
            var childDiv           = null;
            var widthNoScrollBar   = 0;
            var widthWithScrollBar = 0;
            // Outer scrolling div.
            wrapDiv                = doc.createElement('div');
            wrapDiv.style.position = 'absolute';
            wrapDiv.style.top      = '-1000px';
            wrapDiv.style.left     = '-1000px';
            wrapDiv.style.width    = '100px';
            wrapDiv.style.height   = '50px';
            // Start with no scrollbar.
            wrapDiv.style.overflow = 'hidden';

            // Inner content div.
            childDiv              = doc.createElement('div');
            childDiv.style.width  = '100%';
            childDiv.style.height = '200px';

            // Put the inner div in the scrolling div.
            wrapDiv.appendChild(childDiv);
            // Append the scrolling div to the doc.
            _doc.body.appendChild(wrapDiv);

            // Width of the inner div sans scrollbar.
            widthNoScrollBar = childDiv.offsetWidth;
            // Add the scrollbar.
            wrapDiv.style.overflow = 'auto';
            // Width of the inner div width scrollbar.
            widthWithScrollBar = childDiv.offsetWidth;

            // Remove the scrolling div from the doc.
            doc.body.removeChild(doc.body.lastChild);

            // Pixel width of the scroller.
            var scrollBarWidth = (widthNoScrollBar - widthWithScrollBar);

            // Set the auditor-level variable so we don't have to run this again.
            _sbWidth = scrollBarWidth;
            return scrollBarWidth;

        },

        getScrollCoords: function(elem)
        {
            var window = HTMLCS.util.getElementWindow(elem);
            doc        = elem.ownerDocument;

            var scrollX = 0;
            var scrollY = 0;
            if (window.pageYOffset) {
                // Mozilla, Firefox, Safari and Opera will fall into here.
                scrollX = window.pageXOffset;
                scrollY = window.pageYOffset;
            } else if (doc.body && (doc.body.scrollLeft || doc.body.scrollTop)) {
                // This is the DOM compliant method of retrieving the scroll position.
                // Safari and OmniWeb supply this, but report wrongly when the window
                // is not scrolled. They are caught by the first condition however, so
                // this is not a problem.
                scrollX = doc.body.scrollLeft;
                scrollY = doc.body.scrollTop;
            } else {
                // Internet Explorer will get into here when in strict mode.
                scrollX = doc.documentElement.scrollLeft;
                scrollY = doc.documentElement.scrollTop;
            }

            var coords = {
                x: scrollX,
                y: scrollY
            };
            return coords;

        },

        isPointable: function(elem) {
            // If the specified elem is not in the DOM then we cannot point to it.
            // Also, cannot point to the document itself.
            if (elem.ownerDocument === null) {
                return false;
            }

            // Check whether the element is in the document, by looking up its
            // DOM tree for a document object.
            var parent = elem.parentNode;
            while (parent && parent.ownerDocument) {
                parent = parent.parentNode;
            }//end while

            // If we didn't hit a document, the element must not be in there.
            if (parent === null) {
                return false;
            }

            // Do not point to elem if its hidden. Use computed styles.
            if (HTMLCS.util.isVisuallyHidden(elem) === true) {
                return false;
            }

            if (this.getPointerDirection(elem) === null) {
                return false;
            }

            return true;
        },

        getPointerDirection: function(elem) {
            var direction = null;

            // Get element coords.
            var rect      = this.getBoundingRectangle(elem);
            var myPointer = this.getPointer(elem);
            var doc       = elem.ownerDocument;

            myPointer.className  = myPointer.className.replace('HTMLCS-pointer-hidden', '');
            myPointer.className += ' HTMLCS-pointer-hidden-block';

            this.pointerDim.height = 62;
            this.pointerDim.width  = 62;

            var bounceHeight = 20;

            // Determine where to show the arrow.
            var winDim = this.getWindowDimensions(elem);
            var window = HTMLCS.util.getElementWindow(elem);

            var scrollY = Math.max(0, Math.min(rect.y1 - 100, doc.documentElement.offsetHeight - winDim.height));

            // Try to position the pointer.
            if ((rect.y1 - this.pointerDim.height - bounceHeight) > scrollY) {
                // Arrow direction down.
                direction = 'down';
            } else if ((rect.y2 + this.pointerDim.height) < (winDim.height - scrollY)) {
                // Up.
                direction = 'up';
            } else if ((rect.x2 + this.pointerDim.width) < winDim.width) {
                // Left.
                direction = 'left';
            } else if ((rect.x1 - this.pointerDim.width) > 0) {
                // Right.
                direction = 'right';
            }

            myPointer.className  = myPointer.className.replace('HTMLCS-pointer-hidden-block', '');
            myPointer.className += ' HTMLCS-pointer-hidden';

            return direction;
        },

        pointTo: function(elem) {
            // Do not point to elem if its hidden.
            if (elem.ownerDocument) {
                var doc = elem.ownerDocument;
            } else {
                var doc = elem;
            }

            var oldPointer = doc.getElementById('HTMLCS-pointer');
            if (oldPointer) {
                oldPointer.parentNode.removeChild(oldPointer);
            }

            if (this.isPointable(elem) === false) {
                return;
            }

            // Get element coords.
            var topWin = HTMLCS.util.getElementWindow(elem).top;
            var winDim = this.getWindowDimensions(topWin.document.documentElement);

            var direction = this.getPointerDirection(elem);
            var myPointer = this.getPointer(elem);

            myPointer.className  = myPointer.className.replace('HTMLCS-pointer-hidden-block', '');
            if (direction === null) {
                myPointer.className += ' HTMLCS-pointer-hidden';
            } else {
                var isFixed = false;
                if (HTMLCS.util.style(elem).position === 'fixed') {
                    var isFixed = true;
                }

                var parent = elem.parentNode;
                while (parent.ownerDocument) {
                    if (HTMLCS.util.style(parent).position === 'fixed') {
                        isFixed = true;
                        break;
                    }

                    parent = parent.parentNode;
                }//end while

                if (isFixed === true) {
                    myPointer.style.position = 'fixed';
                } else {
                    myPointer.style.position = 'absolute';

                    var rect    = this.getElementCoords(elem, true);
                    var window  = HTMLCS.util.getElementWindow(elem);
                    var targetY = Math.max(rect.y - 100, 0);

                    while (targetY >= 0) {
                        window.scrollTo(0, targetY);
                        var scrollCoords = this.getScrollCoords(window.document.documentElement);

                        targetY -= scrollCoords.y;
                        targetY  = Math.max(targetY, 0);

                        if (window === topWin) {
                            break;
                        } else {
                            window = window.parent;
                        }
                    }//end while
                }//end if

                this.showPointer(elem, direction);
            }
        },

        getPointer: function(targetElement) {
            try {
                var doc = targetElement.ownerDocument;
                HTMLCSAuditor.includeCss('HTMLCS', doc);
                var c = 'HTMLCS';

                var myPointer = doc.getElementById(c + '-pointer');
                if (!myPointer) {
                    myPointer = doc.createElement('div');
                    myPointer.id        = c + '-pointer';
                    myPointer.className = c + '-pointer ' + c + '-pointer-hidden';
                    doc.body.appendChild(myPointer);
                }
            } catch (ex) {
                // Can't get to owner document due to unsafe access.
            }

            return myPointer;
        },

        showPointer: function(elem, direction) {
            var c = 'HTMLCS';

            var myPointer = this.getPointer(elem);
            this._removeDirectionClasses(myPointer);
            myPointer.className += ' ' + c + '-pointer-' + direction;
            myPointer.className  = myPointer.className.replace(c + '-pointer-hidden', '');

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

            case 'down':
            default:
                top = (rect.y1 - this.pointerDim.height);
                if ((rect.x2 - rect.x1) < 250) {
                    left = (this.getRectMidPnt(rect) - (this.pointerDim.width / 2));
                } else {
                    left = rect.x1;
                }
                break;

            case 'left':
                left = rect.x2;
                top  = (this.getRectMidPnt(rect, true) - (this.pointerDim.height / 2));
                break;

            case 'right':
                bounceHeight = (-bounceHeight);
                left         = (rect.x1 - this.pointerDim.width);
                top          = (this.getRectMidPnt(rect, true) - (this.pointerDim.height / 2));
                break;

            }//end switch

            var frameScroll = this.getScrollCoords(elem);

            myPointer.style.top  = top  + 'px';
            myPointer.style.left = left + 'px';

            // Check if the help window is under the pointer then re-position it.
            // Unless it is an element within the HTMLCS pop-up.
            var coords    = this.getBoundingRectangle(this.container);
            rect          = this.getBoundingRectangle(myPointer);
            var posOffset = 20;
            var newPos    = null;
            var midX      = (rect.x1 + ((rect.x2 - rect.x1) / 2));
            var midY      = (rect.y1 + ((rect.y2 - rect.y1) / 2));

            if (HTMLCS.util.style(myPointer).position !== 'fixed') {
                midY -= frameScroll.y;
            }

            if (coords.x1 <= midX
                && coords.x2 >= midX
                && coords.y1 <= midY
                && coords.y2 >= midY
            ) {
                var self = this;

                this.container.className += ' HTMLCS-translucent';
                setTimeout(function() {
                    self.container.className = self.container.className.replace('HTMLCS-translucent', '');
                }, 4000);
            }

            this.bounce(myPointer, function() {
                setTimeout(function() {
                    if (myPointer.parentNode) {
                        myPointer.parentNode.removeChild(myPointer);
                    }
                }, 1500);
            }, direction);

        },

        bounce: function(myPointer, callback, direction)
        {
            var currentDirection = direction;
            var initialPos       = 0;
            var style            = '';
            var initalPosOffset  = 0;
            var dist             = 30;
            var maxBounce        = 5;

            switch (direction) {
            case 'up':
                currentDirection = direction + '-op';
                initalPosOffset  = dist;
            case 'down':
                style = 'top';
                break;

            case 'left':
                currentDirection = direction + '-op';
                initalPosOffset  = dist;
            case 'right':
                style = 'left';
                break;
            }

            initialPos = (Number(myPointer.style[style].replace('px', '')) + initalPosOffset);

            var currentPos = initialPos;
            var lowerLimit = (initialPos - dist);
            var bounces    = 0;

            var i = setInterval(function() {
                if (currentDirection === direction) {
                    currentPos--;
                    myPointer.style[style] = currentPos + 'px';
                    if (currentPos < lowerLimit) {
                        currentDirection = direction + '-op';
                        if (bounces === maxBounce && initalPosOffset !== 0) {
                            clearInterval(i);
                            callback.call(this);
                            return;
                        }
                    }

                } else {
                    currentPos++;
                    myPointer.style[style] = currentPos + 'px';

                    if (currentPos >= initialPos) {
                        currentDirection = direction;
                        bounces++;

                        if (bounces === maxBounce && initalPosOffset === 0) {
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

        _removeDirectionClasses: function(myPointer) {
            var c = 'HTMLCS';
            var d = ['down', 'up', 'left', 'right'];
            var l = d.length;
            for (var i = 0; i < l; i++) {
                myPointer.className = myPointer.className.replace(c + '-pointer-' + d[i], '');
            }
        }

    };

};
