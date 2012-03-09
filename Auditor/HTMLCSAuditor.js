var HTMLCSAuditor = new function()
{
    var _prefix   = 'HTMLCS-';
    var _screen   = '';
    var _standard = '';
    var _source   = '';
    var _options  = {};
    var _messages = [];
    var _page     = 1;

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
        buttonInner.className = _prefix + 'button-icon ' + className;
        button.appendChild(buttonInner);

        var nbsp = document.createTextNode(String.fromCharCode(160));
        button.appendChild(nbsp);

        if ((onclick instanceof Function) === true) {
            button.onclick = function() {
                if (/disabled/.test(button.className) === false) {
                    onclick();
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
    var buildCheckbox = function(id, title, checked) {
        if (checked === undefined) {
            checked = false;
        }

        var div       = document.createElement('div');
        div.className = _prefix + 'checkbox';

        var span       = document.createElement('span');
        span.className = 'input-container';
        div.appendChild(span);

        var input     = document.createElement('input');
        input.id      = id;
        input.checked = checked;
        input.setAttribute('type', 'checkbox');
        span.appendChild(input);

        var label       = document.createElement('label');
        label.innerHTML = title;
        label.setAttribute('for', input.id);
        div.appendChild(label);

        return div;
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

        var div       = document.createElement('div');
        div.className = _prefix + 'radio';

        var span       = document.createElement('span');
        span.className = 'input-container';
        div.appendChild(span);

        var input     = document.createElement('input');
        input.id      = _prefix + '-' + groupName + '-' + value;
        input.name    = groupName;
        input.checked = checked;
        input.setAttribute('type', 'radio');
        span.appendChild(input);

        var label       = document.createElement('label');
        label.innerHTML = title;
        label.setAttribute('for', input.id);
        div.appendChild(label);

        return div;
    };

    /**
     * Build the "message box" interface.
     *
     * This is displayed while the tests are running.
     *
     * @return {HTMLDivElement}
     */
    var buildMessageBox = function(text) {
        var runningDiv       = document.createElement('div');
        runningDiv.className = _prefix + 'message-box';
        runningDiv.innerHTML = text;

        return runningDiv;
    };

    /**
     * Build the header section at the absolute top of the interface.
     *
     * @return {HTMLDivElement}
     */
    var buildHeaderSection = function(standard) {
        var header       = document.createElement('div');
        header.className = _prefix + 'header';
        header.innerHTML = 'Accessibility Auditor - ' + standard;

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
        var self = this;

        var summary       = document.createElement('div');
        summary.className = _prefix + 'summary';

        var leftPane       = document.createElement('div');
        leftPane.className = _prefix + 'summary-left';
        summary.appendChild(leftPane);

        var rightPane       = document.createElement('div');
        rightPane.className = _prefix + 'summary-right';
        summary.appendChild(rightPane);

        var leftContents = [];
        var divider      = '<span class="' + _prefix + 'divider"></span>';

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

        if (leftContents.length === 0) {
            leftPane.innerHTML = '';
        } else {
            leftPane.innerHTML = leftContents.join(divider);
        }

        rightPane.appendChild(buildSummaryButton(_prefix + 'button-settings', 'settings', 'Audit Settings', function() {
            if (_screen === 'settings') {
                HTMLCSAuditor.changeScreen('issue-list');
            } else {
                HTMLCSAuditor.changeScreen('settings');
            }
        }));
        rightPane.appendChild(buildSummaryButton(_prefix + 'button-rerun', 'refresh', 'Re-run Audit', function() {
            HTMLCSAuditor.run(_standard, _source);
        }));

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
        var self = this;

        var summary       = document.createElement('div');
        summary.className = _prefix + 'summary-detail';

        var leftPane       = document.createElement('div');
        leftPane.className = _prefix + 'summary-left';
        summary.appendChild(leftPane);

        var rightPane       = document.createElement('div');
        rightPane.className = _prefix + 'summary-right';
        summary.appendChild(rightPane);

        var showList         = document.createElement('a');
        showList.className   = _prefix + 'back-home';
        showList.href        = 'javascript:';
        showList.innerHTML   = 'List';
        showList.onmousedown = function() {
            var list = document.getElementsByClassName('HTMLCS-inner-wrapper')[0];
            list.style.marginLeft = '0em';
            list.style.maxHeight  = null;

            summary.style.display = 'none';
            var listSummary = document.getElementsByClassName('HTMLCS-summary')[0];
            listSummary.style.display = 'block';
        };

        leftPane.appendChild(showList);

        var navDivider = document.createElement('span');
        navDivider.className = _prefix + 'issue-nav-divider';
        navDivider.innerHTML = ' &gt; ';
        leftPane.appendChild(navDivider);

        var issueCount = document.createTextNode('Issue ' + issue + ' of ' + totalIssues);
        leftPane.appendChild(issueCount);

        // Element pointer.
        rightPane.appendChild(buildSummaryButton(_prefix + 'button-settings', 'pointer', 'Point to Element', function() {
            var msg = _messages[Number(issue)];
            if (!msg.element) {
                return;
            }

            pointer.container = document.getElementById('HTMLCS-wrapper');
            pointer.pointTo(msg.element);
        }));

        rightPane.appendChild(buildSummaryButton(_prefix + 'button-settings', 'previous', 'Previous Issue', function() {
            var newIssue = Number(issue) - 1;

            if (newIssue >= 1) {
                setCurrentDetailIssue(newIssue - 1);
                wrapper = summary.parentNode;
                var newSummary = buildDetailSummarySection(newIssue, totalIssues);
                wrapper.replaceChild(newSummary, summary);
                newSummary.style.display = 'block';

                var issueList = document.getElementsByClassName('HTMLCS-issue-detail-list')[0];
                issueList.style.marginLeft = (parseInt(issueList.style.marginLeft, 10) + 35) + 'em';
            }
        }));

        rightPane.appendChild(buildSummaryButton(_prefix + 'button-rerun', 'next', 'Next Issue', function() {
            var newIssue = Number(issue) + 1;

            if (newIssue <= _messages.length) {
                setCurrentDetailIssue(newIssue - 1);
                wrapper = summary.parentNode;
                var newSummary = buildDetailSummarySection(newIssue, totalIssues);
                wrapper.replaceChild(newSummary, summary);
                newSummary.style.display = 'block';

                var issueList = document.getElementsByClassName('HTMLCS-issue-detail-list')[0];
                issueList.style.marginLeft = (parseInt(issueList.style.marginLeft, 10) - 35) + 'em';
            }
        }));

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
        var issueListWidth = (Math.ceil(messages.length / 5) * 35);
        var issueList      = document.createElement('div');
        issueList.id        = _prefix + 'issues';
        issueList.className = _prefix + 'details';
        issueList.setAttribute('style', 'width: ' + issueListWidth + 'em');

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
        var issueListWidth  = (messages.length * 35);
        var issueList       = document.createElement('div');
        issueList.id        = _prefix + 'issues-detail';
        issueList.className = _prefix + 'details';
        issueList.setAttribute('style', 'width: ' + issueListWidth + 'em');

        var listSection = document.createElement('ol');
        listSection.className = _prefix + 'issue-detail-list';
        listSection.setAttribute('style', 'margin-left: 0');

        for (var i = 0; i < messages.length; i++) {
            listSection.innerHTML += buildMessageDetail(i, messages[i]);
        }

        issueList.appendChild(listSection);

        return issueList;
    };

    var buildSettingsSection = function() {
        var settingsDiv       = document.createElement('div');
        settingsDiv.className = _prefix + 'settings';

        var listFiltersDiv = document.createElement('div');
        listFiltersDiv.id  = _prefix + 'settings-list-filters';
        settingsDiv.appendChild(listFiltersDiv);

        var listFiltersHdr       = document.createElement('h1');
        listFiltersHdr.innerHTML = 'List Filters';
        listFiltersDiv.appendChild(listFiltersHdr);

        var listFiltersExp       = document.createElement('p');
        listFiltersExp.innerHTML = 'Errors and Warnings are always shown and cannot be hidden. Notices will be automatically shown if there are not other issues.';
        listFiltersDiv.appendChild(listFiltersExp);

        var showNoticesCheckbox = buildCheckbox(_prefix + 'include-notices', 'Always include Notices');
        listFiltersDiv.appendChild(showNoticesCheckbox);

        var useStandardDiv = document.createElement('div');
        useStandardDiv.id = _prefix + 'settings-use-standard';
        settingsDiv.appendChild(useStandardDiv);

        var useStandardHdr       = document.createElement('h1');
        useStandardHdr.innerHTML = 'Accessibility Standard';
        useStandardDiv.appendChild(useStandardHdr);

        var useStandardExp       = document.createElement('p');
        useStandardExp.innerHTML = 'Choose which standard you would like to check your content against.';
        useStandardDiv.appendChild(useStandardExp);

        var radioButton = buildRadioButton('standard', 'WCAG2AAA', 'WCAG 2.0 AAA');
        useStandardDiv.appendChild(radioButton);

        var radioButton = buildRadioButton('standard', 'WCAG2AA', 'WCAG 2.0 AA');
        useStandardDiv.appendChild(radioButton);

        var radioButton = buildRadioButton('standard', 'WCAG2A', 'WCAG 2.0 A');
        useStandardDiv.appendChild(radioButton);

        var recheckDiv = document.createElement('div');
        recheckDiv.id  = _prefix + 'settings-recheck';
        settingsDiv.appendChild(recheckDiv);

        var recheckButton       = document.createElement('button');
        recheckButton.id        = _prefix + 'recheck-content';
        recheckButton.className = _prefix + 'button';
        recheckButton.innerHTML = 'Re-check Content';
        recheckButton.onclick   = function() {
            HTMLCSAuditor.run(_standard);
        };
        recheckDiv.appendChild(recheckButton);

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
        if (messageMsg.length > 130) {
            messageMsg = messageMsg.substr(0, 127) + '...';
        }

        var msg = document.createElement('li');
        msg.id  = _prefix + 'msg-' + id;

        var typeIcon       = document.createElement('span');
        typeIcon.className = _prefix + 'issue-type ' + typeClass;
        typeIcon.setAttribute('title', typeText);
        msg.appendChild(typeIcon);

        var msgTitle       = document.createElement('span');
        msgTitle.className = _prefix + 'issue-title';
        msgTitle.innerHTML = messageMsg;
        msg.appendChild(msgTitle);

        msg.onclick = function() {
            var id = this.id.replace(new RegExp(_prefix + 'msg-'), '');
            setCurrentDetailIssue(id);

            var detailList = document.getElementsByClassName('HTMLCS-issue-detail-list')[0];
            detailList.className += ' transition-disabled';
            detailList.style.marginLeft = (id * -35) + 'em';

            setTimeout(function() {
                detailList.className = detailList.className.replace(/ transition-disabled/, '');
            }, 500);

            var list = document.getElementsByClassName('HTMLCS-inner-wrapper')[0];
            list.style.marginLeft = '-35em';
            list.style.maxHeight  = '15em';

            summary = document.getElementsByClassName('HTMLCS-summary-detail')[0];
            var newSummary = buildDetailSummarySection(parseInt(id) + 1, _messages.length);
            summary.parentNode.replaceChild(newSummary, summary);
            newSummary.style.display = 'block';

            var oldSummary = document.getElementsByClassName('HTMLCS-summary')[0];
            oldSummary.style.display = 'none';
        }

        return msg;
    };

    var setCurrentDetailIssue = function(id) {
        var detailList = document.getElementsByClassName('HTMLCS-issue-detail-list')[0];
        var items      = detailList.getElementsByTagName('li');
        for (var i = 0; i < items.length; i++) {
            items[i].className = items[i].className.replace(/ current/, '');
        }

        var currentItem = document.getElementById('HTMLCS-msg-detail-' + id);
        currentItem.className += ' current';
    }

    var buildMessageDetail = function(id, message, standard) {
        var msg       = '';
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

        var typeClass     = typeText.toLowerCase();
        var msgCodeParts  = message.code.split('.', 5);
        var principle     = msgCodeParts[1];
        var techniques    = msgCodeParts[4].split(',');
        var techniquesStr = [];

        for (var i = 0; i < techniques.length; i++) {
            techniques[i]  = techniques[i].split('.');
            techniquesStr.push('<a href="http://www.w3.org/TR/WCAG20-TECHS/' + techniques[i][0] + '">' + techniques[i][0] + '</a>');
        }

        msg += '<li id="HTMLCS-msg-detail-' + id + '"><div>';
        msg += '<span class="HTMLCS-issue-type ' + typeClass + '" title="' + typeText + '"></span>';
        msg += '<div class="HTMLCS-issue-title">' + message.msg + '</div>';
        msg += '<div class="HTMLCS-issue-wcag-ref">';
        msg += '<em>Principle:</em> <a href="' + principles[principle].link + '">' + principles[principle].name + '</a><br/>';
        msg += '<em>Technique:</em> ' + techniquesStr.join(' '); + '<br/>';
        msg += '</div>';
        msg += '</div></li>';

        return msg;
    };

    var buildNavigation = function(page, totalPages) {
        var navDiv       = document.createElement('div');
        navDiv.className = _prefix + 'navigation';

        var prev       = document.createElement('span');
        prev.className = _prefix + 'nav-button previous';
        prev.innerHTML = String.fromCharCode(160);

        if (page === 1) {
            prev.className += ' disabled';
        }

        navDiv.appendChild(prev);

        var pageNum       = document.createElement('span');
        pageNum.className = _prefix + 'page-number';
        pageNum.innerHTML = 'Page ' + page + ' of ' + totalPages;
        navDiv.appendChild(pageNum);

        var next       = document.createElement('span');
        next.className = _prefix + 'nav-button next';
        next.innerHTML = String.fromCharCode(160);

        if (page === totalPages) {
            next.className += ' disabled';
        }

        navDiv.appendChild(next);

        prev.onclick = function() {
            if (_page > 1) {
                _page--;
                if (_page === 1) {
                    prev.className += ' disabled';
                }
            }

            next.className    = next.className.replace(/ disabled/, '');
            pageNum.innerHTML = 'Page ' + _page + ' of ' + totalPages;

            var issueList = document.getElementsByClassName('HTMLCS-issue-list')[0];
            issueList.style.marginLeft = ((_page - 1) * -35) + 'em';
        }

        next.onclick = function() {
            if (_page < totalPages) {
                _page++;
                if (_page === totalPages) {
                    next.className += ' disabled';
                }
            }

            prev.className    = prev.className.replace(/ disabled/, '');
            pageNum.innerHTML = 'Page ' + _page + ' of ' + totalPages;

            var issueList = document.getElementsByClassName('HTMLCS-issue-list')[0];
            issueList.style.marginLeft = ((_page - 1) * -35) + 'em';
        }

        return navDiv;
    }

    this.build = function(standard, messages, options) {
        if (options.alwaysShowNotices === undefined) {
            options.alwaysShowNotices = false;
        }

        if (options.initialScreen === undefined) {
            options.initialScreen = 'settings';
        }

        // Restack the messages so they are sorted by message type.
        var showNotices = true;
        for (var i = 0; i < messages.length; i++) {
            if (messages[i].type !== HTMLCS.NOTICE) {
                showNotices = options.alwaysShowNotices;
                break;
            }//end if
        }//end if

        var errors   = 0;
        var warnings = 0;
        var notices  = 0;

        for (i = 0; i < messages.length; i++) {
            switch (messages[i].type) {
                case HTMLCS.ERROR:
                    errors++;
                break;

                case HTMLCS.WARNING:
                    warnings++;
                break;

                case HTMLCS.NOTICE:
                    if (showNotices === false) {
                        messages.splice(i, 1);
                        i--;
                    } else {
                        notices++;
                    }
                break;
            }//end switch
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

        var detailWidth  = (i * 35);

        var wrapper       = document.createElement('div');
        wrapper.id        = _prefix + 'wrapper';
        wrapper.className = 'showing-' + options.initialScreen;

        var header = buildHeaderSection(standard);
        wrapper.appendChild(header);

        var summary = buildSummarySection(errors, warnings, notices);
        wrapper.appendChild(summary);

        var summaryDetail = buildDetailSummarySection(1, messages.length);
        wrapper.appendChild(summaryDetail);

        var settings = buildSettingsSection();
        wrapper.appendChild(settings);

        var outerWrapper       = document.createElement('div');
        outerWrapper.className = _prefix + 'outer-wrapper';
        wrapper.appendChild(outerWrapper);

        var innerWrapper       = document.createElement('div');
        innerWrapper.id        = _prefix + 'issues-wrapper';
        innerWrapper.className = _prefix + 'inner-wrapper';
        outerWrapper.appendChild(innerWrapper);

        var issueList = buildIssueListSection(messages);
        innerWrapper.appendChild(issueList);

        var totalPages = Math.ceil(messages.length / 5);
        var navDiv     = buildNavigation(1, totalPages);
        innerWrapper.appendChild(navDiv);

        var innerWrapper       = document.createElement('div');
        innerWrapper.id        = _prefix + 'issues-detail-wrapper';
        innerWrapper.className = _prefix + 'inner-wrapper';
        outerWrapper.appendChild(innerWrapper);

        var issueDetail = buildIssueDetailSection(messages);
        innerWrapper.appendChild(issueDetail);

        var processingDiv = buildMessageBox('Processing...');
        wrapper.appendChild(processingDiv);

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
        } else if (source instanceof Node) {
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

        var self    = this;
        var target  = document.getElementById(_prefix + 'wrapper');

        // Load the "processing" screen.
        options.initialScreen = 'message-box';
        var wrapper = self.build(standard, _messages, options);
        if (target) {
            document.body.replaceChild(wrapper, target);
        } else {
            document.body.appendChild(wrapper);
        }


        // Process and replace with the issue list when finished.
        HTMLCS.process(standard, source, function() {
            options.initialScreen = 'issue-list';
            _messages      = HTMLCS.getMessages();
            var newWrapper = self.build(standard, _messages, options);
            document.body.replaceChild(newWrapper, wrapper);
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

            // Determine where to show the arrow.
            var winDim = this.getWindowDimensions(elem);

            // Scroll in to view if not visible.
            if (elem.scrollIntoView && (rect.y1 < iframeScroll.y || rect.y1 > iframeScroll.y + winDim.height)) {
                if (rect.y1 > 100) {
                    this.getElementWindow(elem).scroll(rect.x1, rect.y1 - 100);
                } else {
                    this.getElementWindow(elem).scroll(rect.x1, 0);
                }

                iframeScroll = this.getScrollCoords(elem);
            }

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

            var frameScroll = this.getScrollCoords(elem);

            this.pointer.style.top  = top - frameScroll.y + 'px';
            this.pointer.style.left = left - frameScroll.x + 'px';

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
                    pointer.parentNode.removeChild(pointer);
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
