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

_global.HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_3_1_3_1 = {
    _labelNames: null,

    register: function()
    {
        return [
            '_top',
            'p',
            'div',
            'input',
            'select',
            'textarea',
            'button',
            'table',
            'fieldset',
            'form',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6'
        ];

    },

    /**
	 * Process the registered element.
	 *
	 * @param {DOMNode} element The element registered.
	 * @param {DOMNode} top     The top element of the tested code.
	 */
    process: function(element, top)
    {
        var nodeName = element.nodeName.toLowerCase();

        if (element === top) {
            this.testPresentationMarkup(top);
            this.testEmptyDupeLabelForAttrs(top);
        } else {
            switch (nodeName) {
            case 'input':
            case 'textarea':
            case 'button':
                this.testLabelsOnInputs(element, top);
                break;

            case 'form':
                this.testRequiredFieldsets(element);
                break;

            case 'select':
                this.testLabelsOnInputs(element, top);
                this.testOptgroup(element);
                break;

            case 'p':
            case 'div':
                this.testNonSemanticHeading(element);
                this.testListsWithBreaks(element);
                this.testUnstructuredNavLinks(element);
                break;

            case 'table':
                this.testGeneralTable(element);
                this.testTableHeaders(element);
                this.testTableCaptionSummary(element);
                break;

            case 'fieldset':
                this.testFieldsetLegend(element);
                break;

            case 'h1':
            case 'h2':
            case 'h3':
            case 'h4':
            case 'h5':
            case 'h6':
                this.testEmptyHeading(element);
                break;
            }//end switch
        }//end if
    },

    /**
	 * Test elements for presentation roles that also contain semantic child elements.
	 *
	 * @param {DOMNode} element The element to test.
	 */
    testSemanticPresentationRole: function(element)
    {
        var permitted = ['div', 'span', 'b', 'i'];
        if (HTMLCS.util.isAriaHidden(element) === false
			&& element.hasAttribute('role')
            && element.getAttribute('role') === 'presentation'
            && permitted.indexOf(element.nodeName.toLowerCase()) === -1
        ) {
            var children  = element.querySelectorAll('*:not('+permitted.join('):not(')+')');
            children      = [].filter.call(children, function(child) {
                return child.hasAttribute('role') === false;
            });
            if (children.length) {
                HTMLCS.addMessage(
                    HTMLCS.ERROR,
                    element,
                    _global.HTMLCS.getTranslation("1_3_1_F92,ARIA4"),
                    'F92,ARIA4'
                );
            }
        }
    },

    /**
	 * Top-level test for labels that have no for attribute, or duplicate ones.
	 *
	 * @param {DOMNode} top The top element of the tested code.
	 */
    testEmptyDupeLabelForAttrs: function(top)
    {
        this._labelNames = {};
        var labels = top.getElementsByTagName('label');
        for (var i = 0; i < labels.length; i++) {
            if ((labels[i].getAttribute('for') !== null) && (labels[i].getAttribute('for') !== '')) {
                var labelFor = labels[i].getAttribute('for');
                if ((this._labelNames[labelFor]) && (this._labelNames[labelFor] !== null)) {
                    this._labelNames[labelFor] = null;
                } else {
                    this._labelNames[labelFor] = labels[i];

                    if (top.ownerDocument) {
                        var refNode = top.ownerDocument.getElementById(labelFor);
                    } else {
                        var refNode = top.getElementById(labelFor);
                    }

                    if (refNode === null) {
                        var level = HTMLCS.ERROR;
                        var msg   = _global.HTMLCS.getTranslation("1_3_1_H44.NonExistent");
                        var code  = 'H44.NonExistent';
                        if ((HTMLCS.isFullDoc(top) === true) || (top.nodeName.toLowerCase() === 'body')) {
                            level = HTMLCS.WARNING;
                            msg   = _global.HTMLCS.getTranslation("1_3_1_H44.NonExistentFragment");
                            var code  = 'H44.NonExistentFragment';
                        }
                        HTMLCS.addMessage(level, labels[i], msg, code);
                    } else {
                        var nodeName = refNode.nodeName.toLowerCase();
                        if ('input|select|textarea|button|keygen|meter|output|progress'.indexOf(nodeName) === -1) {
                            HTMLCS.addMessage(HTMLCS.WARNING, labels[i], _global.HTMLCS.getTranslation("1_3_1_H44.NotFormControl"), 'H44.NotFormControl');
                        }
                    }
                }
            }
        }//end for
    },

    /**
	 * Test for appropriate labels on inputs.
	 *
	 * The appropriate WCAG2 techniques test is failure F68.
	 * This test uses the September 2014 version of the technique:
	 * http://www.w3.org/TR/2014/NOTE-WCAG20-TECHS-20140916/F68
	 *
	 * For all input elements of type "radio", "checkbox", "text", "file" or "password",
	 * and all textarea and select elements in the Web page:
	 *
	 * 1. Check that the visual design uses a text label that identifies the purpose of the control
	 * 2. Check that these input elements have a programmatically determined label associated in one
	 *    of the following ways:
	 *    (a) the text label is contained in a label element that is correctly associated to the
	 *        respective input element via the label's for attribute (the id given as value in the
	 *        for attribute matches the id of the input element).
	 *    (b) the control is contained within a label element that contains the label text.
	 *    (c) the text label is correctly programmatically associated with the input element via the
	 *        aria-labelledby attribute (the id given as value in the aria-labelledby attribute
	 *        matches the id of the input element).
	 *    (d) the [label] is programmatically determined through the value of either its
	 *        aria-label or title attributes.
	 *
	 * This changed in March 2014. Before then, only 2(a) was permitted or 2(d) (title attribute only).
	 * Notably, labels made through wrapping an element in a label attribute were not permitted.
	 *
	 * Associated techniques: H44 (LABEL element), H65 (title attribute),
	 * ARIA6/ARIA14 (aria-label), ARIA9/ARIA16 (aria-labelledby).
	 *
	 * @param {DOMNode} element The element registered.
	 * @param {DOMNode} top     The top element of the tested code.
	 */
    testLabelsOnInputs: function(element, top, muteErrors)
    {
        var nodeName  = element.nodeName.toLowerCase();
        var inputType = nodeName;
        if (inputType === 'input') {
            if (element.hasAttribute('type') === true) {
                inputType = element.getAttribute('type');
            } else {
                inputType = 'text';
            }
        }

        var hasLabel = false;
        var addToLabelList = function(found) {
            if (!hasLabel) hasLabel = {};
            hasLabel[found] = true;
        };

        // Firstly, work out whether it needs a label.
        var needsLabel = false;
        var inputType  = inputType.toLowerCase();
        if ((inputType === 'select' || inputType === 'textarea')) {
            needsLabel = true;
        } else if (/^(radio|checkbox|text|file|password)$/.test(inputType) === true) {
            needsLabel = true;
        }

        if (element.getAttribute('hidden') !== null) {
            needsLabel = false;
        }

        // Find an explicit label.
        var explicitLabel = element.ownerDocument.querySelector('label[for="' + element.id + '"]');
        if (explicitLabel) {
            addToLabelList('explicit');
        }

        // Find an implicit label.
        var foundImplicit = false;
        if (element.parentNode) {
            HTMLCS.util.eachParentNode(element, function(parent) {
                if (parent.nodeName.toLowerCase() === 'label') {
                    foundImplicit = true;
                }
            });
        }
        if (foundImplicit === true) {
            addToLabelList('implicit');
        }

        // Find a title attribute.
        var title = element.getAttribute('title');
        if (title !== null) {
            if ((/^\s*$/.test(title) === true) && (needsLabel === true)) {
                HTMLCS.addMessage(
                    HTMLCS.WARNING,
                    element,
                    _global.HTMLCS.getTranslation("1_3_1_H65"),
                    'H65'
                );
            } else {
                addToLabelList('title');
            }
        }

        // Find an aria-label attribute.
        if (element.hasAttribute('aria-label') === true) {
            if (HTMLCS.util.hasValidAriaLabel(element) === false) {
                HTMLCS.addMessage(
                    HTMLCS.WARNING,
                    element,
                    _global.HTMLCS.getTranslation("1_3_1_ARIA6"),
                    'ARIA6'
                );
            } else {
                addToLabelList('aria-label');
            }
        }


        // Find an aria-labelledby attribute.
        if (element.hasAttribute('aria-labelledby') === true) {
            if (HTMLCS.util.hasValidAriaLabel(element) === false) {
                HTMLCS.addMessage(
                    HTMLCS.WARNING,
                    element,
                    _global.HTMLCS.getTranslation("1_3_1_ARIA16,ARIA9").replace(/\{\{id\}\}/g, element.getAttribute('aria-labelledby')),
                    'ARIA16,ARIA9'
                );
            } else {
                addToLabelList('aria-labelledby');
            }
        }

        if (!(muteErrors === true)) {
            if ((hasLabel !== false) && (needsLabel === false)) {
                // Note that it is okay for buttons to have aria-labelledby or
                // aria-label, or title. The former two override the button text,
                // while title is a lower priority than either: the button text,
                // and in submit/reset cases, the localised name for the words
                // "Submit" and "Reset".
                // http://www.w3.org/TR/html-aapi/#accessible-name-and-description-calculation
                if (inputType === 'hidden') {
                    HTMLCS.addMessage(
                        HTMLCS.WARNING,
                        element,
                        _global.HTMLCS.getTranslation("1_3_1_F68.Hidden"),
                        'F68.Hidden'
                    );
                } else if (element.getAttribute('hidden') !== null) {
                    HTMLCS.addMessage(
                        HTMLCS.WARNING,
                        element,
                        _global.HTMLCS.getTranslation("1_3_1_F68.HiddenAttr"),
                        'F68.HiddenAttr'
                    );
                }
            } else if ((hasLabel === false) && (needsLabel === true)) {
                // Needs label.
                HTMLCS.addMessage(
                    HTMLCS.ERROR,
                    element,
                    _global.HTMLCS.getTranslation("1_3_1_F68"),
                    'F68'
                );
            }//end if
        }

        return hasLabel;
    },

    /**
	 * Test for the use of presentational elements (technique H49).
	 *
	 * In HTML4, certain elements are considered presentational code. In HTML5, they
	 * are redefined (based on "they are being used, so they shouldn't be
	 * deprecated") so they can be considered "somewhat" semantic. They should still
	 * be considered a last resort.
	 *
	 * @param [DOMNode] top The top element of the tested code.
	 */
    testPresentationMarkup: function(top)
    {
        // In HTML4, the following were marked as presentational:
        // b, i, u, s, strike, tt, big, small, center, font
        // In HTML5, the following were repurposed as pseudo-semantic:
        // b, i, u, s, small
        var _doc    = HTMLCS.util.getElementWindow(top).document;
        var doctype = HTMLCS.util.getDocumentType(_doc);

        if (doctype && (doctype === 'html5' || doctype === 'xhtml5')) {
            var tags = HTMLCS.util.getAllElements(top, 'strike, tt, big, center, font');
            for (var i = 0; i < tags.length; i++) {
                var msgCode = 'H49.' + tags[i].nodeName.substr(0, 1).toUpperCase() + tags[i].nodeName.substr(1).toLowerCase();
                HTMLCS.addMessage(HTMLCS.ERROR, tags[i],  _global.HTMLCS.getTranslation("1_3_1_H49."), msgCode);
            }

            // Align attributes, too.
            var tags = HTMLCS.util.getAllElements(top, '*[align]');

            for (var i = 0; i < tags.length; i++) {
                var msgCode = 'H49.AlignAttr';
                HTMLCS.addMessage(HTMLCS.ERROR, tags[i], 'Align attributes .', msgCode);
            }
        } else {
            var tags = HTMLCS.util.getAllElements(top, 'b, i, u, s, strike, tt, big, small, center, font');
            for (var i = 0; i < tags.length; i++) {
                var msgCode = 'H49.' + tags[i].nodeName.substr(0, 1).toUpperCase() + tags[i].nodeName.substr(1).toLowerCase();
                HTMLCS.addMessage(HTMLCS.WARNING, tags[i], _global.HTMLCS.getTranslation("1_3_1_H49.Semantic"), msgCode);
            }

            // Align attributes, too.
            var tags = HTMLCS.util.getAllElements(top, '*[align]');

            for (var i = 0; i < tags.length; i++) {
                var msgCode = 'H49.AlignAttr';
                HTMLCS.addMessage(HTMLCS.WARNING, tags[i], _global.HTMLCS.getTranslation("1_3_1_H49.AlignAttr.Semantic"), msgCode);
            }
        }
    },

    /**
	 * Test for the possible use of non-semantic headings (technique H42).
	 *
	 * Test for P|DIV > STRONG|EM|other inline styling, when said inline
	 * styling tag is the only element in the tag. It could possibly be a header
	 * that should be using h1..h6 tags instead.
	 *
	 * @param [DOMNode] element The paragraph or DIV element to test.
	 */
    testNonSemanticHeading: function(element)
    {
        // Test for P|DIV > STRONG|EM|other inline styling, when said inline
        // styling tag is the only element in the tag. It could possibly a header
        // that should be using h1..h6 tags instead.
        var tag = element.nodeName.toLowerCase();
        if (tag === 'p' || tag === 'div') {
            var children = element.childNodes;
            if ((children.length === 1) && (children[0].nodeType === 1)) {
                var childTag = children[0].nodeName.toLowerCase();

                if (/^(strong|em|b|i|u)$/.test(childTag) === true) {
                    HTMLCS.addMessage(HTMLCS.WARNING, element, _global.HTMLCS.getTranslation("1_3_1_H42"), 'H42');
                }
            }
        }
    },

    /**
	 * Test for the correct association of table data cells with their headers.
	 *
	 * This is actually a two-part test, using either the scope attribute (H63) or
	 * the headers attribute (H43). Which one(s) are required or appropriate
	 * depend on the types of headings available:
	 * - If only one row or one column header, no association is required.
	 * - If one row AND one column headers, scope or headers is suitable.
	 * - If multi-level headers of any type, use of headers (only) is required.
	 *
	 * This test takes the results of two tests - one of headers and one of scope -
	 * and works out which error messages should apply given the above type of table.
	 *
	 * Invalid or incorrect usage of scope or headers are always reported when used,
	 * and cases where scope/headers are used on some of the table but not all is
	 * also thrown.
	 *
	 * @param {DOMNode} table The table element to evaluate.
	 *
	 * @return void
	 */
    testTableHeaders: function(table)
    {
        var headersAttr = HTMLCS.util.testTableHeaders(table);
        var scopeAttr   = this._testTableScopeAttrs(table);

        // Invalid scope attribute - emit always if scope tested.
        for (var i = 0; i < scopeAttr.invalid.length; i++) {
            HTMLCS.addMessage(HTMLCS.ERROR, scopeAttr.invalid[i],  _global.HTMLCS.getTranslation("1_3_1_H63.3"), 'H63.3');
        }

        // TDs with scope attributes are obsolete in HTML5 - emit warnings if
        // scope tested, but not as errors as they are valid HTML4.
        for (var i = 0; i < scopeAttr.obsoleteTd.length; i++) {
            HTMLCS.addMessage(HTMLCS.WARNING, scopeAttr.obsoleteTd[i], _global.HTMLCS.getTranslation("1_3_1_H63.2"), 'H63.2');
        }

        if (headersAttr.allowScope === true) {
            if (scopeAttr.missing.length === 0) {
                // If all scope attributes are set, let them be used, even if the
                // attributes are in error. If the scope attrs are fixed, the table
                // will be legitimate.
                headersAttr.required === false;
            }
        } else {
            if (scopeAttr.used === true) {
                HTMLCS.addMessage(HTMLCS.WARNING, table, _global.HTMLCS.getTranslation("1_3_1_H43.ScopeAmbiguous"), 'H43.ScopeAmbiguous');
                scopeAttr = null;
            }
        }//end if

        // Incorrect usage of headers - error; emit always.
        for (var i = 0; i < headersAttr.wrongHeaders.length; i++) {
            HTMLCS.addMessage(HTMLCS.ERROR, headersAttr.wrongHeaders[i].element, _global.HTMLCS.getTranslation("1_3_1_H43.IncorrectAttr").replace(/\{\{expected\}\}/g, headersAttr.wrongHeaders[i].expected).replace(/\{\{actual\}\}/g, headersAttr.wrongHeaders[i].actual), 'H43.IncorrectAttr');
        }

        // Errors where headers are compulsory.
        if ((headersAttr.required === true) && (headersAttr.allowScope === false)) {
            if (headersAttr.used === false) {
                // Headers not used at all, and they are mandatory.
                HTMLCS.addMessage(HTMLCS.ERROR, table,  _global.HTMLCS.getTranslation("1_3_1_H43.HeadersRequired"), 'H43.HeadersRequired');
            } else {
                // Missing TH IDs - error; emit at this stage only if headers are compulsory.
                if (headersAttr.missingThId.length > 0) {
                    HTMLCS.addMessage(HTMLCS.ERROR, table, _global.HTMLCS.getTranslation("1_3_1_H43.MissingHeaderIds"), 'H43.MissingHeaderIds');
                }

                // Missing TD headers attributes - error; emit at this stage only if headers are compulsory.
                if (headersAttr.missingTd.length > 0) {
                    HTMLCS.addMessage(HTMLCS.ERROR, table, _global.HTMLCS.getTranslation("1_3_1_H43.MissingHeadersAttrs"), 'H43.MissingHeadersAttrs');
                }
            }//end if
        }//end if

        // Errors where either is permitted, but neither are done properly (missing
        // certain elements).
        // If they've only done it one way, presume that that is the way they want
        // to continue. Otherwise provide a generic message if none are done or
        // both have been done incorrectly.
        if ((headersAttr.required === true) && (headersAttr.allowScope === true) && (headersAttr.correct === false) && (scopeAttr.correct === false)) {
            if ((scopeAttr.used === false) && (headersAttr.used === false)) {
                // Nothing used at all.
                HTMLCS.addMessage(HTMLCS.ERROR, table, _global.HTMLCS.getTranslation("1_3_1_H43,H63"), 'H43,H63');
            } else if ((scopeAttr.used === false) && ((headersAttr.missingThId.length > 0) || (headersAttr.missingTd.length > 0))) {
                // Headers attribute is used, but not all th elements have ids.
                if (headersAttr.missingThId.length > 0) {
                    HTMLCS.addMessage(HTMLCS.ERROR, table, _global.HTMLCS.getTranslation("1_3_1_H43.MissingHeaderIds"), 'H43.MissingHeaderIds');
                }

                // Headers attribute is used, but not all td elements have headers attrs.
                if (headersAttr.missingTd.length > 0) {
                    HTMLCS.addMessage(HTMLCS.ERROR, table, _global.HTMLCS.getTranslation("1_3_1_H43.MissingHeadersAttrs"), 'H43.MissingHeadersAttrs');
                }
            } else if ((scopeAttr.missing.length > 0) && (headersAttr.used === false)) {
                // Scope is used rather than headers, but not all th elements have them.
                HTMLCS.addMessage(HTMLCS.ERROR, table, _global.HTMLCS.getTranslation("1_3_1_H63.1"), 'H63.1');
            } else if ((scopeAttr.missing.length > 0) && ((headersAttr.missingThId.length > 0) || (headersAttr.missingTd.length > 0))) {
                // Both are used and both were done incorrectly. Provide generic message.
                HTMLCS.addMessage(HTMLCS.ERROR, table, _global.HTMLCS.getTranslation("1_3_1_H43,H63"), 'H43,H63');
            }
        }
    },

    /**
	 * Test for the correct scope attributes on table cell elements.
	 *
	 * Return value contains the following elements:
	 * - used (Boolean):       Whether scope has been used on at least one cell.
	 * - correct (Boolean):    Whether scope has been correctly used (obsolete
	 *                         elements do not invalidate this).
	 * - missing (Array):      Array of th elements that have no scope attribute.
	 * - invalid (Array):      Array of elements with incorrect scope attributes.
	 * - obsoleteTd (Array):   Array of elements where we should throw a warning
	 *                         about scope on td being obsolete in HTML5.
	 *
	 * @param {DOMNode} element Table element to test upon.
	 *
	 * @return {Object} The above return value structure.
	 */
    _testTableScopeAttrs: function(table)
    {
        var elements = {
            th: table.getElementsByTagName('th'),
            td: table.getElementsByTagName('td')
        };

        // Types of errors:
        // - missing:    Errors that a th does not contain a scope attribute.
        // - invalid:    Errors that the scope attribute is not a valid value.
        // - obsoleteTd: Warnings that scopes on tds are obsolete in HTML5.
        var retval = {
            used: false,
            correct: true,
            missing: [],
            invalid: [],
            obsoleteTd: []
        };

        for (var tagType in elements) {
            for (var i = 0; i < elements[tagType].length; i++) {
                var element = elements[tagType][i];

                var scope = '';
                if (element.hasAttribute('scope') === true) {
                    retval.used = true;
                    if (element.getAttribute('scope')) {
                        scope = element.getAttribute('scope');
                    }
                }

                if (element.nodeName.toLowerCase() === 'th') {
                    if (/^\s*$/.test(scope) === true) {
                        // Scope empty or just whitespace.
                        retval.correct = false;
                        retval.missing.push(element);
                    } else if (/^(row|col|rowgroup|colgroup)$/.test(scope) === false) {
                        // Invalid scope value.
                        retval.correct = false;
                        retval.invalid.push(element);
                    }
                } else {
                    if (scope !== '') {
                        // Scope attribute found on TD element. This is obsolete in
                        // HTML5. Does not make it incorrect.
                        retval.obsoleteTd.push(element);

                        // Test for an invalid scope value regardless.
                        if (/^(row|col|rowgroup|colgroup)$/.test(scope) === false) {
                            retval.correct = false;
                            retval.invalid.push(element);
                        }
                    }//end if
                }//end if
            }//end for
        }//end for

        return retval;
    },

    /**
	 * Test table captions and summaries (techniques H39, H73).
	 *
	 * @param {DOMNode} table Table element to test upon.
	 */
    testTableCaptionSummary: function(table) {
        var summary   = table.getAttribute('summary') || '';
        var captionEl = table.getElementsByTagName('caption');
        var caption   = '';

        if (captionEl.length > 0) {
            caption = captionEl[0].innerHTML.replace(/^\s*(.*?)\s*$/g, '$1');
        }

        // In HTML5, Summary no longer exists, so only run this for older versions.
        var doctype = HTMLCS.util.getDocumentType(table.ownerDocument);
        if (doctype && doctype.indexOf('html5') === -1) {
            summary = summary.replace(/^\s*(.*?)\s*$/g, '$1');
            if (summary !== '') {
                if (HTMLCS.util.isLayoutTable(table) === true) {
                    HTMLCS.addMessage(HTMLCS.ERROR, table, _global.HTMLCS.getTranslation("1_3_1_H73.3.LayoutTable"), 'H73.3.LayoutTable');
                } else {
                    if (caption === summary) {
                        HTMLCS.addMessage(HTMLCS.ERROR, table, _global.HTMLCS.getTranslation("1_3_1_H39,H73.4"), 'H39,H73.4');
                    }

                    HTMLCS.addMessage(HTMLCS.NOTICE, table,  _global.HTMLCS.getTranslation("1_3_1_H73.3.Check"), 'H73.3.Check');
                }
            } else {
                if (HTMLCS.util.isLayoutTable(table) === false) {
                    HTMLCS.addMessage(HTMLCS.WARNING, table, _global.HTMLCS.getTranslation("1_3_1_H73.3.NoSummary"), 'H73.3.NoSummary');
                }
            }//end if
        }//end if

        if (caption !== '') {
            if (HTMLCS.util.isLayoutTable(table) === true) {
                HTMLCS.addMessage(HTMLCS.ERROR, table, _global.HTMLCS.getTranslation("1_3_1_H39.3.LayoutTable"), 'H39.3.LayoutTable');
            } else {
                HTMLCS.addMessage(HTMLCS.NOTICE, table, _global.HTMLCS.getTranslation("1_3_1_H39.3.Check"), 'H39.3.Check');
            }
        } else {
            if (HTMLCS.util.isLayoutTable(table) === false) {
                HTMLCS.addMessage(HTMLCS.WARNING, table, _global.HTMLCS.getTranslation("1_3_1_H39.3.NoCaption"), 'H39.3.NoCaption');
            }
        }//end if
    },

    /**
	 * Test for fieldsets without legends (technique H71)
	 *
	 * @param {DOMNode} fieldset Fieldset element to test upon.
	 */
    testFieldsetLegend: function(fieldset) {
        var legend = fieldset.querySelector('legend');

        if ((legend === null) || (legend.parentNode !== fieldset)) {
            HTMLCS.addMessage(HTMLCS.ERROR, fieldset, _global.HTMLCS.getTranslation("1_3_1_H71.NoLegend"), 'H71.NoLegend');
        }
    },

    /**
	 * Test for select fields without optgroups (technique H85).
	 *
	 * It won't always be appropriate, so the error is emitted as a warning.
	 *
	 * @param {DOMNode} select Select element to test upon.
	 */
    testOptgroup: function(select) {
        var optgroup = select.querySelector('optgroup');

        if (optgroup === null) {
            // Optgroup isn't being used.
            HTMLCS.addMessage(HTMLCS.WARNING, select, _global.HTMLCS.getTranslation("1_3_1_H85.2"), 'H85.2');
        }
    },

    /**
	 * Test for radio buttons and checkboxes with same name in a fieldset.
	 *
	 * One error will be fired at a form level, rather than firing one for each
	 * violating group of inputs (as there could be many).
	 *
	 * @param {DOMNode} form The form to test.
	 *
	 * @returns void
	 */
    testRequiredFieldsets: function(form) {
        var optionInputs = form.querySelectorAll('input[type=radio], input[type=checkbox]');
        var usedNames     = {};

        for (var i = 0; i < optionInputs.length; i++) {
            var option = optionInputs[i];

            if (option.hasAttribute('name') === true) {
                var optionName = option.getAttribute('name');

                // Now find if we are in a fieldset. Stop at the top of the DOM, or
                // at the form element.
                var fieldset = option.parentNode;
                while ((fieldset.nodeName.toLowerCase() !== 'fieldset') && (fieldset !== null) && (fieldset !== form)) {
                    fieldset = fieldset.parentNode;
                }

                if (fieldset.nodeName.toLowerCase() !== 'fieldset') {
                    // Record that this name is used, but there is no fieldset.
                    fieldset = null;
                }
            }//end if

            if (usedNames[optionName] === undefined) {
                usedNames[optionName] = fieldset;
            } else if ((fieldset === null) || (fieldset !== usedNames[optionName])) {
                // Multiple names detected = should be in a fieldset.
                // Either first instance or this one wasn't in a fieldset, or they
                // are in different fieldsets.
                HTMLCS.addMessage(HTMLCS.WARNING, form, _global.HTMLCS.getTranslation("1_3_1_H71.SameName"), 'H71.SameName');
                break;
            }//end if
        }//end for
    },

    /**
	 * Test for paragraphs that appear manually bulleted or numbered (technique H48).
	 *
	 * @param {DOMNode} element The element to test upon.
	 */
    testListsWithBreaks: function(element) {
        var firstBreak = element.querySelector('br');
        var items      = [];

        // If there is a br tag, go break up the element and see what each line
        // starts with.
        if (firstBreak !== null) {
            var nodes    = [];

            // Convert child nodes NodeList into an array.
            for (var i = 0; i < element.childNodes.length; i++) {
                nodes.push(element.childNodes[i]);
            }

            var thisItem = [];
            while (nodes.length > 0) {
                var subel = nodes.shift();

                if (subel.nodeType === 1) {
                    // Element node.
                    if (subel.nodeName.toLowerCase() === 'br') {
                        // Line break. Join and trim what we have now.
                        items.push(thisItem.join(' ').replace(/^\s*(.*?)\s*$/g, '$1'));
                        thisItem = [];
                    } else {
                        // Shift the contents of the sub element in, but in reverse.
                        for (var i = subel.childNodes.length - 1; i >= 0; --i) {
                            nodes.unshift(subel.childNodes[i]);
                        }
                    }
                } else if (subel.nodeType === 3) {
                    // Text node.
                    thisItem.push(subel.nodeValue);
                }
            }//end while

            if (thisItem.length > 0) {
                items.push(thisItem.join(' ').replace(/^\s*(.*?)\s*$/g, '$1'));
            }

            for (var i = 0; i < items.length; i++) {
                if (/^[-*]\s+/.test(items[0]) === true) {
                    // Test for "- " or "* " cases.
                    HTMLCS.addMessage(HTMLCS.WARNING, element,  _global.HTMLCS.getTranslation("1_3_1_H48.1"), 'H48.1');
                    break;
                } if (/^\d+[:/\-.]?\s+/.test(items[0]) === true) {
                    // Test for "1 " cases (or "1. ", "1: ", "1- ").
                    HTMLCS.addMessage(HTMLCS.WARNING, element, _global.HTMLCS.getTranslation("1_3_1_H48.2"), 'H48.2');
                    break;
                }
            }//end for
        }//end if
    },

    testHeadingOrder: function(top, level) {
        var lastHeading = 0;
        var headings    = HTMLCS.util.getAllElements(top, 'h1, h2, h3, h4, h5, h6');

        for (var i = 0; i < headings.length; i++) {
            var headingNum = parseInt(headings[i].nodeName.substr(1, 1));
            if (headingNum - lastHeading > 1) {
                if (lastHeading === 0) {
                    // If last heading is empty, we are at document top and we are
                    // expecting a H1, generally speaking.
                    HTMLCS.addMessage(level, headings[i], _global.HTMLCS.getTranslation("1_3_1_G141_a").replace(/\{\{headingNum\}\}/g, headingNum), 'G141');
                }

                HTMLCS.addMessage(level, headings[i], _global.HTMLCS.getTranslation("1_3_1_G141_b").replace(/\{\{headingNum\}\}/g, headingNum).replace(/\{\{properHeadingNum\}\}/g, lastHeading + 1), 'G141');
            }

            lastHeading = headingNum;
        }
    },

    /**
	 * Test for headings with no text, which should either be filled, or tags removed.
	 *
	 * @param {DOMNode} element The element to test.
	 *
	 * @returns void
	 */
    testEmptyHeading: function(element) {
        var text = HTMLCS.util.getElementTextContent(element, true);

        if (/^\s*$/.test(text) === true) {
            HTMLCS.addMessage(HTMLCS.ERROR, element, _global.HTMLCS.getTranslation("1_3_1_H42.2"), 'H42.2');
        }
    },

    /**
	 * Test for the presence of a list around common navigation links (H48).
	 *
	 * @param {DOMNode} element The element to test.
	 *
	 * @returns void
	 */
    testUnstructuredNavLinks: function(element)
    {
        var linksLength = 0;

        var childNodes  = element.childNodes;
        for (var i = 0; i < childNodes.length; i++) {
            if ((childNodes[i].nodeType === 1) && (childNodes[i].nodeName.toLowerCase() === 'a')) {
                linksLength++;
                if (linksLength > 1) {
                    break;
                }
            }
        }//end for

        if (linksLength > 1) {
            // Going to throw a warning here, mainly because we cannot easily tell
            // whether it is just a paragraph with multiple links, or a navigation
            // structure.
            var parent = element.parentNode;
            while ((parent !== null) && (parent.nodeName.toLowerCase() !== 'ul') && (parent.nodeName.toLowerCase() !== 'ol')) {
                parent = parent.parentNode;
            }

            if (parent === null) {
                HTMLCS.addMessage(HTMLCS.WARNING, element, _global.HTMLCS.getTranslation("1_3_1_H48"), 'H48');
            }
        }//end if
    },

    /**
	 * Provide generic messages for tables depending on what type of table they
	 * are - layout or data.
	 *
	 * @param {DOMNode} table The table element to test.
	 *
	 * @returns void
	 */
    testGeneralTable: function(table) {
        if (HTMLCS.util.isLayoutTable(table) === true) {
            HTMLCS.addMessage(HTMLCS.NOTICE, table, _global.HTMLCS.getTranslation("1_3_1_LayoutTable"), 'LayoutTable');
        } else {
            HTMLCS.addMessage(HTMLCS.NOTICE, table, _global.HTMLCS.getTranslation("1_3_1_DataTable"), 'DataTable');
        }
    }
};
