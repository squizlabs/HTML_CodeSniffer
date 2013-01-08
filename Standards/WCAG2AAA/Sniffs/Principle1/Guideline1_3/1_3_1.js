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

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_3_1_3_1 = {
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
     * Top-level test for labels that have no for attribute, or duplicate ones.
     *
     * @param {DOMNode} top The top element of the tested code.
     */
    testEmptyDupeLabelForAttrs: function(top)
    {
        this._labelNames = {};
        var labels = top.getElementsByTagName('label');
        for (var i = 0; i < labels.length; i++) {
            if ((labels[i].hasAttribute('for') === true) && (labels[i].getAttribute('for') !== '')) {
                var labelFor = labels[i].getAttribute('for');
                if ((this._labelNames[labelFor]) && (this._labelNames[labelFor] !== null)) {
                    // Multiple labels with same "for" attribute shouldn't exist.
                    // They could be a sign of duplicate form controls, and ife
                    // they are not, it's not good practice to have multiple labels
                    // for the one control.
                    HTMLCS.addMessage(HTMLCS.ERROR, labels[i], 'Multiple labels exist with the same "for" attribute. If these labels refer to different form controls, the controls should have unique "id" attributes.', 'H93');
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
                        var msg   = 'This label\'s "for" attribute contains an ID that does not exist in the document.';
                        var code  = 'H44.NonExistent';
                        if ((HTMLCS.isFullDoc(top) === true) || (top.nodeName.toLowerCase() === 'body')) {
                            level = HTMLCS.WARNING;
                            msg   = 'This label\'s "for" attribute contains an ID that does not exist in the document fragment.';
                            var code  = 'H44.NonExistentFragment';
                        }
                        HTMLCS.addMessage(level, labels[i], msg, code);
                    } else {
                        var nodeName = refNode.nodeName.toLowerCase();
                        if ((nodeName !== 'input') && (nodeName !== 'select') && (nodeName !== 'textarea')) {
                            HTMLCS.addMessage(HTMLCS.ERROR, labels[i], 'This label\'s "for" attribute contains an ID that points to an element that is not a form control.', 'H44.NotFormControl');
                        }
                    }
                }
            } else {
                HTMLCS.addMessage(HTMLCS.ERROR, labels[i], 'Label found without a "for" attribute, and therefore not explicitly associated with a form control.', 'H44.NoForAttr');
            }//end if
        }//end for
    },

    /**
     * Test for appropriate labels on inputs.
     *
     * HTML_CodeSniffer tests:
     * - whether a form control has a label associated with it,
     * - how it is associated (implicit labels are not accessible - only use
     *   explicit labels, ie. "for" attribute),
     * - whether said form control should have a label at all (buttons shouldn't),
     * - whether the label is placed correctly (it should be after radio buttons and
     *   check boxes, but before text boxes and select lists).
     *
     * The label position test is just "is it on the correct side". Proximity is
     * not tested.
     *
     * @param {DOMNode} element The element registered.
     * @param {DOMNode} top     The top element of the tested code.
     */
    testLabelsOnInputs: function(element, top)
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

        var isNoLabelControl = false;
        if (/^(submit|reset|image|hidden|button)$/.test(inputType.toLowerCase()) === true) {
            isNoLabelControl = true;
        }

        this._labelNames = {};
        var labels = top.getElementsByTagName('label');
        for (var i = 0; i < labels.length; i++) {
            if (labels[i].hasAttribute('for') === true) {
                var labelFor = labels[i].getAttribute('for');
                this._labelNames[labelFor] = labels[i];
            }//end if
        }//end for

        if ((element.hasAttribute('id') === false) && (isNoLabelControl === false)) {
            // There is no id attribute at all on the control.
            if (element.hasAttribute('title') === true) {
                if (/^\s*$/.test(element.getAttribute('title')) === true) {
                    // But the title attribute is empty. Whoops.
                    HTMLCS.addMessage(HTMLCS.ERROR, element, 'Form control without a label contains an empty title attribute. The title attribute should identify the purpose of the control.', 'H65.3');
                }
            } else {
                HTMLCS.addMessage(HTMLCS.ERROR, element, 'Form control does not have an ID, therefore it cannot have an explicit label.', 'H44.NoId');
            }//end if
        } else {
            var id = element.getAttribute('id');
            if (!this._labelNames[id]) {
                // There is no label for this form control. For certain types of
                // input, "no label" is not an error.
                if (isNoLabelControl === false) {
                    // If there is a title, we presume that H65 applies - the label
                    // element cannot be used, and the title should be used as the
                    // descriptive label instead.
                    if (element.hasAttribute('title') === true) {
                        if (/^\s*$/.test(element.getAttribute('title')) === true) {
                            // But the title attribute is empty. Whoops.
                            HTMLCS.addMessage(HTMLCS.ERROR, element, 'Form control without a label contains an empty title attribute. The title attribute should identify the purpose of the control.', 'H65.3');
                        } else {
                            // Manual check required as to the title. Making this a
                            // warning because a manual tester also needs to confirm
                            // that a label element is not feasible for the control.
                            HTMLCS.addMessage(HTMLCS.WARNING, element, 'Check that the title attribute identifies the purpose of the control, and that a label element is not appropriate.', 'H65');
                        }
                    } else {
                        HTMLCS.addMessage(HTMLCS.ERROR, element, 'Form control does not have an explicit label or title attribute, identifying the purpose of the control.', 'H44.2');
                    }
                }
            } else {
                // There is a label for a form control that should not have a label,
                // because the label is provided through other means (value of select
                // reset, alt on image submit, button's content), or there is no
                // visible field (hidden).
                if (isNoLabelControl === true) {
                    HTMLCS.addMessage(HTMLCS.ERROR, element, 'Label element should not be used for this type of form control.', 'H44.NoLabelAllowed');
                } else {
                    var labelOnRight = false;
                    if (/^(checkbox|radio)$/.test(inputType) === true) {
                        labelOnRight = true;
                    }

                    // Work out the position of the element in comparison to its
                    // label. A positive number means the element comes after the
                    // label (correct where label is on left). Negative means element
                    // is before the label (correct for "label on right").
                    if (element.compareDocumentPosition) {
                        // Firefox, Opera, IE 9+ standards mode.
                        var pos = element.compareDocumentPosition(this._labelNames[id]);
                        if ((pos & 0x02) === 0x02) {
                            // Label precedes element.
                            var posDiff = 1;
                        } else if ((pos & 0x04) === 0x04) {
                            // Label follows element.
                            var posDiff = -1;
                        }
                    } else if (element.sourceIndex) {
                        // IE < 9.
                        var posDiff = element.sourceIndex - this._labelNames[id].sourceIndex;
                    }

                    if ((labelOnRight === true) && (posDiff > 0)) {
                        HTMLCS.addMessage(HTMLCS.ERROR, element, 'The label element for this control should be placed after this element.', 'H44.1.After');
                    } else if ((labelOnRight === false) && (posDiff < 0)) {
                        HTMLCS.addMessage(HTMLCS.ERROR, element, 'The label element for this control should be placed before this element.', 'H44.1.Before');
                    }
                }//end if
            }//end if
        }//end if
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
        // Presentation tags that should have no place in modern HTML.
        var tags = top.querySelectorAll('b, i, u, s, strike, tt, big, small, center, font');

        for (var i = 0; i < tags.length; i++) {
            var msgCode = 'H49.' + tags[i].nodeName.substr(0, 1).toUpperCase() + tags[i].nodeName.substr(1).toLowerCase();
            HTMLCS.addMessage(HTMLCS.WARNING, tags[i], 'Semantic markup should be used to mark emphasised or special text so that it can be programmatically determined.', msgCode);
        }

        // Align attributes, too.
        var tags = top.querySelectorAll('*[align]');

        for (var i = 0; i < tags.length; i++) {
            var msgCode = 'H49.AlignAttr';
            HTMLCS.addMessage(HTMLCS.WARNING, tags[i], 'Semantic markup should be used to mark emphasised or special text so that it can be programmatically determined.', msgCode);
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
                    HTMLCS.addMessage(HTMLCS.WARNING, element, 'Heading markup should be used if this content is intended as a heading.', 'H42');
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
            HTMLCS.addMessage(HTMLCS.ERROR, scopeAttr.invalid[i], 'Table cell has an invalid scope attribute. Valid values are row, col, rowgroup, or colgroup.', 'H63.3');
        }

        // TDs with scope attributes are obsolete in HTML5 - emit warnings if
        // scope tested, but not as errors as they are valid HTML4.
        for (var i = 0; i < scopeAttr.obsoleteTd.length; i++) {
            HTMLCS.addMessage(HTMLCS.WARNING, scopeAttr.obsoleteTd[i], 'Scope attributes on td elements that act as headings for other elements are obsolete in HTML5. Use a th element instead.', 'H63.2');
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
                HTMLCS.addMessage(HTMLCS.WARNING, table, 'Scope attributes on th elements are ambiguous in a table with multiple levels of headings. Use the headers attribute on td elements instead.', 'H43.ScopeAmbiguous');
                scopeAttr = null;
            }
        }//end if

        // Incorrect usage of headers - error; emit always.
        for (var i = 0; i < headersAttr.wrongHeaders.length; i++) {
            HTMLCS.addMessage(HTMLCS.ERROR, headersAttr.wrongHeaders[i].element, 'Incorrect headers attribute on this td element. Expected "' + headersAttr.wrongHeaders[i].expected + '" but found "' + headersAttr.wrongHeaders[i].actual + '"', 'H43.IncorrectAttr');
        }

        // Errors where headers are compulsory.
        if ((headersAttr.required === true) && (headersAttr.allowScope === false)) {
            if (headersAttr.used === false) {
                // Headers not used at all, and they are mandatory.
                HTMLCS.addMessage(HTMLCS.ERROR, table, 'The relationship between td elements and their associated th elements is not defined. As this table has multiple levels of th elements, you must use the headers attribute on td elements.', 'H43.HeadersRequired');
            } else {
                // Missing TH IDs - error; emit at this stage only if headers are compulsory.
                if (headersAttr.missingThId.length > 0) {
                    HTMLCS.addMessage(HTMLCS.ERROR, table, 'Not all th elements in this table contain an id attribute. These cells should contain ids so that they may be referenced by td elements\' headers attributes.', 'H43.MissingHeaderIds');
                }

                // Missing TD headers attributes - error; emit at this stage only if headers are compulsory.
                if (headersAttr.missingTd.length > 0) {
                    HTMLCS.addMessage(HTMLCS.ERROR, table, 'Not all td elements in this table contain a headers attribute. Each headers attribute should list the ids of all th elements associated with that cell.', 'H43.MissingHeadersAttrs');
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
                HTMLCS.addMessage(HTMLCS.ERROR, table, 'The relationship between td elements and their associated th elements is not defined. Use either the scope attribute on th elements, or the headers attribute on td elements.', 'H43,H63');
            } else if ((scopeAttr.used === false) && ((headersAttr.missingThId.length > 0) || (headersAttr.missingTd.length > 0))) {
                // Headers attribute is used, but not all th elements have ids.
                if (headersAttr.missingThId.length > 0) {
                    HTMLCS.addMessage(HTMLCS.ERROR, table, 'Not all th elements in this table contain an id attribute. These cells should contain ids so that they may be referenced by td elements\' headers attributes.', 'H43.MissingHeaderIds');
                }

                // Headers attribute is used, but not all td elements have headers attrs.
                if (headersAttr.missingTd.length > 0) {
                    HTMLCS.addMessage(HTMLCS.ERROR, table, 'Not all td elements in this table contain a headers attribute. Each headers attribute should list the ids of all th elements associated with that cell.', 'H43.MissingHeadersAttrs');
                }
            } else if ((scopeAttr.missing.length > 0) && (headersAttr.used === false)) {
                // Scope is used rather than headers, but not all th elements have them.
                HTMLCS.addMessage(HTMLCS.ERROR, table, 'Not all th elements in this table have a scope attribute. These cells should contain a scope attribute to identify their association with td elements.', 'H63.1');
            } else if ((scopeAttr.missing.length > 0) && ((headersAttr.missingThId.length > 0) || (headersAttr.missingTd.length > 0))) {
                // Both are used and both were done incorrectly. Provide generic message.
                HTMLCS.addMessage(HTMLCS.ERROR, table, 'The relationship between td elements and their associated th elements is not defined. Use either the scope attribute on th elements, or the headers attribute on td elements.', 'H43,H63');
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
                element = elements[tagType][i];

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
        summary = summary.replace(/^\s*(.*?)\s*$/g, '$1');

        if (summary !== '') {
            if (HTMLCS.util.isLayoutTable(table) === true) {
                HTMLCS.addMessage(HTMLCS.ERROR, table, 'This table appears to be used for layout, but contains a summary attribute. Layout tables must not contain summary attributes, or if supplied, must be empty.', 'H73.3.LayoutTable');
            } else {
                if (caption === summary) {
                    HTMLCS.addMessage(HTMLCS.ERROR, table, 'If this table is a data table, and both a summary attribute and a caption element are present, the summary should not duplicate the caption.', 'H39,H73.4');
                }

                HTMLCS.addMessage(HTMLCS.NOTICE, table, 'If this table is a data table, check that the summary attribute describes the table\'s organization or explains how to use the table.', 'H73.3.Check');
            }
        } else {
            if (HTMLCS.util.isLayoutTable(table) === false) {
                HTMLCS.addMessage(HTMLCS.WARNING, table, 'If this table is a data table, consider using the summary attribute of the table element to give an overview of this table.', 'H73.3.NoSummary');
            }
        }//end if

        if (caption !== '') {
            if (HTMLCS.util.isLayoutTable(table) === true) {
                HTMLCS.addMessage(HTMLCS.ERROR, table, 'This table appears to be used for layout, but contains a caption element. Layout tables must not contain captions.', 'H39.3.LayoutTable');
            } else {
                HTMLCS.addMessage(HTMLCS.NOTICE, table, 'If this table is a data table, check that the caption element accurately describes this table.', 'H39.3.Check');
            }
        } else {
            if (HTMLCS.util.isLayoutTable(table) === false) {
                HTMLCS.addMessage(HTMLCS.WARNING, table, 'If this table is a data table, consider using a caption element to the table element to identify this table.', 'H39.3.NoCaption');
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
            HTMLCS.addMessage(HTMLCS.ERROR, fieldset, 'Fieldset does not contain a legend element. All fieldsets should contain a legend element that describes a description of the field group.', 'H71.NoLegend');
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
            HTMLCS.addMessage(HTMLCS.WARNING, select, 'If this selection list contains groups of related options, they should be grouped with optgroup.', 'H85.2');
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
                HTMLCS.addMessage(HTMLCS.WARNING, form, 'If these radio buttons or check boxes require a further group-level description, they should be contained within a fieldset element.', 'H71.SameName');
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
                if (/^[\-*]\s+/.test(items[0]) === true) {
                    // Test for "- " or "* " cases.
                    HTMLCS.addMessage(HTMLCS.WARNING, element, 'Content appears to have the visual appearance of a bulleted list. It may be appropriate to mark this content up using a ul element.', 'H48.1');
                    break;
                } if (/^\d+[:\/\-.]?\s+/.test(items[0]) === true) {
                    // Test for "1 " cases (or "1. ", "1: ", "1- ").
                    HTMLCS.addMessage(HTMLCS.WARNING, element, 'Content appears to have the visual appearance of a numbered list. It may be appropriate to mark this content up using an ol element.', 'H48.2');
                    break;
                }
            }//end for
        }//end if
    },

    testHeadingOrder: function(top, level) {
        var lastHeading = 0;
        var headings    = top.querySelectorAll('h1, h2, h3, h4, h5, h6');

        for (var i = 0; i < headings.length; i++) {
            var headingNum = parseInt(headings[i].nodeName.substr(1, 1));
            if (headingNum - lastHeading > 1) {
                var exampleMsg = 'should be an h' + (lastHeading + 1) + ' to be properly nested';
                if (lastHeading === 0) {
                    // If last heading is empty, we are at document top and we are
                    // expecting a H1, generally speaking.
                    exampleMsg = 'appears to be the primary document heading, so should be an h1 element';
                }

                HTMLCS.addMessage(level, headings[i], 'The heading structure is not logically nested. This h' + headingNum + ' element ' + exampleMsg + '.', 'G141');
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
        var text = element.textContent;

        if (text === undefined) {
            text = element.innerText;
        }

        if (/^\s*$/.test(text) === true) {
            HTMLCS.addMessage(HTMLCS.ERROR, element, 'Heading tag found with no content. Text that is not intended as a heading should not be marked up with heading tags.', 'H42.2');
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
        var nodeName    = element.nodeName.toLowerCase();
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
                HTMLCS.addMessage(HTMLCS.WARNING, element, 'If this element contains a navigation section, it is recommended that it be marked up as a list.', 'H48');
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
            HTMLCS.addMessage(HTMLCS.NOTICE, table, 'This table appears to be a layout table. If it is meant to instead be a data table, ensure header cells are identified using th elements.', 'LayoutTable');
        } else {
            HTMLCS.addMessage(HTMLCS.NOTICE, table, 'This table appears to be a data table. If it is meant to instead be a layout table, ensure there are no th elements, and no summary or caption.', 'DataTable');
        }
    }
};
