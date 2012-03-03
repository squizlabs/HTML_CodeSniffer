var HTMLCSAuditor = new function()
{
    var _prefix = 'HTMLCS-';

    var buildOptionsInterface = function() {
    }

    var buildHeaderSection = function(standard) {
        var header       = document.createElement('div');
        header.className = _prefix + 'header';
        header.innerHTML = 'Accessibility Auditor - ' + standard;

        return header;
    }

    var buildSummaryButton = function(id, className, title) {
        var button       = document.createElement('div');
        button.id        = id;
        button.className = _prefix + 'button';
        button.setAttribute('title', title);

        var buttonInner       = document.createElement('span');
        buttonInner.className = _prefix + 'button-icon ' + className;
        button.appendChild(buttonInner);

        var nbsp = document.createTextNode(String.fromCharCode(160));
        button.appendChild(nbsp);

        return button;
    }

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
            leftPane.innerHTML = 'No errors found';
        } else {
            leftPane.innerHTML = leftContents.join(divider);
        }

        rightPane.appendChild(buildSummaryButton(_prefix + 'button-settings', 'settings', 'Audit Settings'));
        rightPane.appendChild(buildSummaryButton(_prefix + 'button-rerun', 'refresh', 'Re-run Audit'));

        return summary;
    }

    var buildIssueListSection = function(messages) {
        var issueListWidth = (Math.ceil(messages.length / 5) * 35);
        var issueList      = document.createElement('div');
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

            listSection.innerHTML += buildMessageSummary(i, messages[i]);
        }

        issueList.appendChild(listSection);

        return issueList;
    }

    var buildIssueDetailSection = function() {
    }

    var buildSettingsSection = function() {
        var settings       = document.createElement('div');
        settings.className = _prefix + 'settings';

        var listFilters       = document.createElement('div');
        listFilters.className = _prefix + 'settings';
        /*
            <div class="HTMLCS-settings">
                <div id="HTMLCS-settings-list-filters">
                    <h1>List Filters</h1>
                    <p>Errors and Warnings are always shown and cannot be hidden. Notices will be automatically shown if there are not other issues.</p>
                    <div class="HTMLCS-checkbox">
                        <span class="input-container"><input type="checkbox" id="HTMLCS-include-notices" /></span>
                        <label for="HTMLCS-include-notices">Always include Notices</label>
                    </div>
                </div>
                <div id="HTMLCS-settings-use-standard">
                    <h1>Accessibility Standard</h1>
                    <p>Choose which standard you would like to check your content against.</p>
                    <div class="HTMLCS-radio">
                        <span class="input-container"><input type="radio" id="HTMLCS-standard-WCAG2AAA" name="standard" value="WCAG2AAA" /></span>
                        <label for="HTMLCS-standard-WCAG2AAA">WCAG 2.0 AAA</label>
                    </div>
                    <div class="HTMLCS-radio">
                        <span class="input-container"><input type="radio" id="HTMLCS-standard-WCAG2AA" name="standard" value="WCAG2AA" /></span>
                        <label for="HTMLCS-standard-WCAG2AA">WCAG 2.0 AA</label>
                    </div>
                    <div class="HTMLCS-radio">
                        <span class="input-container"><input type="radio" id="HTMLCS-standard-WCAG2A" name="standard" value="WCAG2A" /></span>
                        <label for="HTMLCS-standard-WCAG2A">WCAG 2.0 A</label>
                    </div>
                </div>
                <div id="HTMLCS-settings-recheck">
                    <button class="HTMLCS-button" id="HTMLCS-recheck-content">Re-check Content</button>
                </div>
            </div>
        */
    }

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

        msg += '<li id="HTMLCS-msg-' + id + '">';
        msg += '<span class="HTMLCS-issue-type ' + typeClass + '" title="' + typeText + '"></span>';
        msg += '<span class="HTMLCS-issue-title">' + messageMsg + '</span>';
        msg += '</li>';

        return msg;
    };

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

    this.build = function(standard, messages, options) {
        options.alwaysShowNotices = options.alwaysShowNotices || false;

        // Restack the
        var errors   = [];
        var warnings = [];
        var notices  = [];
        for (var i = 0; i < messages.length; i++) {
            switch (messages[i].type) {
                case HTMLCS.ERROR:
                    errors.push(messages[i]);
                break;

                case HTMLCS.WARNING:
                    warnings.push(messages[i]);
                break;

                case HTMLCS.NOTICE:
                    notices.push(messages[i]);
                break;

                default:
                    // Not defined.
                break;
            }//end switch
        }

        if (((errors.length > 0) || (warnings.length > 0)) && (options.alwaysShowNotices === false)) {
            notices = [];
        }

        messages = errors.concat(warnings, notices);

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

        var wrapper = document.createElement('div');
        wrapper.id  = _prefix + 'wrapper';

        var header = buildHeaderSection(standard);
        wrapper.appendChild(header);

        var summary = buildSummarySection(errors.length, warnings.length, notices.length);
        wrapper.appendChild(summary);

        var innerWrapper       = document.createElement('div');
        innerWrapper.className = _prefix + 'inner-wrapper';
        wrapper.appendChild(innerWrapper);

        var issueList = buildIssueListSection(messages);
        innerWrapper.appendChild(issueList);

        return wrapper;

        var contents = '';
        contents    += '</div>';
        contents    += '<div class="HTMLCS-summary-right">';
        contents    += '<div class="HTMLCS-button" id="HTMLCS-button-settings" title="Audit Settings">';
        contents    += '<span class="HTMLCS-button-icon settings"></span>&nbsp;';
        contents    += '</div><div class="HTMLCS-button" id="HTMLCS-button-rerun" title="Re-run Audit">';
        contents    += '<span class="HTMLCS-button-icon refresh"></span>&nbsp;';
        contents    += '</div>';
        contents    += '</div>';
        contents    += '</div>';

        // Start the
        contents    += '<div class="HTMLCS-inner-wrapper">';
        contents    += '<div class="HTMLCS-details" style="width: ' + summaryWidth + 'em">';
        contents    += summaryContents;

        // Navigation items for the
        contents    += '<div class="HTMLCS-navigation">';
        contents    += '<span title="Previous Page" class="HTMLCS-nav-button previous">&nbsp;</span>';
        contents    += '<span class="HTMLCS-page-number">Page 1 of ' + Math.ceil(messages.length / 5) + '</span>';
        contents    += '<span title="Next Page" class="HTMLCS-nav-button next">&nbsp;</span>';
        contents    += '</div>';

        contents    += '</div>';

        contents    += '<div class="HTMLCS-details" style="width: ' + detailWidth + 'em">';
        contents    += '<ol class="HTMLCS-issue-detail-list" style="margin-left: 0em; width: auto;">';
        contents    += detailContents;
        contents    += '</ol>';
        contents    += '</div>';

        contents    += '</div>';
        contents    += '</div>';
        return contents;
    };

    this.run = function(standard, source, options) {
        var self   = this;
        var target = document.getElementById(_prefix + 'wrapper');

        HTMLCS.process(standard, source, function() {
            var messages = HTMLCS.getMessages();
            var wrapper = self.build(standard, messages, options);

            if (target) {
                document.body.replaceChild(wrapper, target);
            } else {
                document.body.appendChild(wrapper);
            }
        });
    }

};
