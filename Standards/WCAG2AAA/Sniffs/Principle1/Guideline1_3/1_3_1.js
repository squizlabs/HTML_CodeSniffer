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
        ];

    },

    process: function(element, top)
    {
        var nodeName = element.nodeName.toLowerCase();

        if (element === top) {
            this.testPresentationMarkup(top);
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
                break;

                case 'table':
                    this.testTableHeaders(element);
                    this.testTableCaptionSummary(element);
                break;

                case 'fieldset':
                    this.testFieldsetLegend(element);
                break;
            }//end switch
        }//end if
    },

    testLabelsOnInputs: function(element, top)
    {
        var nodeName  = element.nodeName.toLowerCase();
        var inputType = nodeName;
        if (inputType === 'input') {
            inputType = element.getAttribute('type');
        }

        var isNoLabelControl = false;
        if (/^(submit|reset|image|hidden|button)$/.test(inputType) === true) {
            isNoLabelControl = true;
        }

        this._labelNames = {};
        var labels = top.getElementsByTagName('label');
        for (var i = 0; i < labels.length; i++) {
            if (labels[i].hasAttribute('for') === false) {
                // Implicit labels (ie. labels with no "for" attribute but instead
                // surround a label) fail this test, due to not having enough
                // support from assistive technology.
                HTMLCS.addMessage(HTMLCS.ERROR, element, 'Use the label element to explicitly associate a form control with a label, through the use of the "for" attribute.', 'H44.1.Implicit');
            } else {
                var labelFor = labels[i].getAttribute('for');
                if (this._labelNames[labelFor]) {
                    // Multiple labels with same "for" attribute shouldn't exist.
                    // They could be a sign of duplicate form controls, and ife
                    // they are not, it's not good practice to have multiple labels
                    // for the one control.
                    HTMLCS.addMessage(HTMLCS.ERROR, element, 'Multiple labels exist with the same "for" attribute. If these labels refer to different form controls, the controls should have unique "id" attributes.', 'H93');
                } else {
                    this._labelNames[labelFor] = labels[i];
                }
            }//end if
        }//end for

        if ((element.hasAttribute('id') === false) && (isNoLabelControl === false)) {
            // There is no id attribute at all on the control.
            HTMLCS.addMessage(HTMLCS.ERROR, element, 'Form control does not have an id, therefore it cannot have an explicit label.', 'H44.NoId');
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
                            HTMLCS.addMessage(HTMLCS.ERROR, element, 'Check that the title attribute identifies the purpose of the control.', 'H65.3');
                        } else {
                            // Manual check required as to the title. Making this a
                            // warning because a manual tester also needs to confirm
                            // that a label element is not feasible for the control.
                            HTMLCS.addMessage(HTMLCS.WARNING, element, 'Check that the title attribute identifies the purpose of the control, and that a label element is not appropriate.', 'H65');
                        }
                    } else {
                        HTMLCS.addMessage(HTMLCS.ERROR, element, 'Attach a label to this form control through the use of the for attribute.', 'H44.2');
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

    testPresentationMarkup: function(top)
    {
        // Presentation tags and attributes that should have no place in modern HTML.
        var tags = top.querySelectorAll('b, i, u, s, strike, tt, big, small, center, font, *[align]');

        for (var i = 0; i < tags.length; i++) {
            HTMLCS.addMessage(HTMLCS.ERROR, tags[i], 'Semantic markup should be used to mark emphasised or special text so that it can be programmatically determined.', 'H49');
        }
    },

    testNonSemanticHeading: function(element)
    {
        // Test for P|DIV > STRONG|EM|other inline styling, when said inline
        // styling tag is the only element in the tag. It could possibly a header
        // that should be using h1..h6 tags instead.
        var tag = element.nodeName.toLowerCase();
        if (tag === 'p' || tag === 'div') {
            var children = element.childNodes;
            if ((children.length === 1) && (children[0].nodeType === Node.ELEMENT_NODE)) {
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
        var headersAttr = this._testTableHeadersAttrs(table);
        var scopeAttr   = this._testTableScopeAttrs(table);

        // Invalid scope attribute - emit always if scope tested.
        for (var i = 0; i < scopeAttr.invalid.length; i++) {
            HTMLCS.addMessage(HTMLCS.ERROR, scopeAttr.invalid[i], 'Check that all scope attributes have the value row, col, rowgroup, or colgroup.', 'H63.3');
        }

        // TDs with scope attributes are obsolete in HTML5 - emit warnings if
        // scope tested, but not as errors as they are valid HTML4.
        for (var i = 0; i < scopeAttr.obsoleteTd.length; i++) {
            HTMLCS.addMessage(HTMLCS.WARNING, scopeAttr.obsoleteTd[i], 'Scope attributes on td elements that act as headers for other elements are obsolete in HTML5; use a th element instead.', 'H63.2');
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
                HTMLCS.addMessage(HTMLCS.WARNING, table, 'Scope attributes are ambiguous in a multi-level structure. Use the headers attribute on td elements instead.', 'H43.ScopeAmbiguous');
                scopeAttr = null;
            }
        }//end if

        // Incorrect usage of headers - error; emit always.
        for (var i = 0; i < headersAttr.wrongHeaders.length; i++) {
            HTMLCS.addMessage(HTMLCS.ERROR, headersAttr.wrongHeaders[i].element, 'Incorrect headers attribute, expected "' + headersAttr.wrongHeaders[i].expected + '" but found "' + headersAttr.wrongHeaders[i].actual + '"', 'H43.IncorrectAttr');
        }

        // Errors where headers are compulsory.
        if ((headersAttr.required === true) && (headersAttr.allowScope === false)) {
            if (headersAttr.used === false) {
                // Headers not used at all, and they are mandatory.
                HTMLCS.addMessage(HTMLCS.ERROR, table, 'Associate data cells with multi-level table headings using the headers attribute.', 'H43.HeadersRequired');
            } else {
                // Missing TH IDs - error; emit at this stage only if headers are compulsory.
                if (headersAttr.missingThId.length > 0) {
                    HTMLCS.addMessage(HTMLCS.ERROR, table, 'Check that all th elements contain an id attribute, so that they may be referenced by the headers attribute.', 'H43.MissingHeaderIds');
                }

                // Missing TD headers attributes - error; emit at this stage only if headers are compulsory.
                if (headersAttr.missingTd.length > 0) {
                    HTMLCS.addMessage(HTMLCS.ERROR, table, 'Check that all td elements contain a headers attribute that lists the id for all headers associated with that cell.', 'H43.MissingHeadersAttrs');
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
                HTMLCS.addMessage(HTMLCS.ERROR, table, 'Associate data cells with table headings using either the scope or headers attribute techniques.', 'H43,H63');
            } else if ((scopeAttr.used === false) && ((headersAttr.missingThId.length > 0) || (headersAttr.missingTd.length > 0))) {
                // Headers attribute is used, but not all th elements have ids.
                if (headersAttr.missingThId.length > 0) {
                    HTMLCS.addMessage(HTMLCS.ERROR, table, 'Check that all th elements contain an id attribute, so that they may be referenced by the headers attribute.', 'H43.MissingHeaderIds');
                }

                // Headers attribute is used, but not all td elements have headers attrs.
                if (headersAttr.missingTd.length > 0) {
                    HTMLCS.addMessage(HTMLCS.ERROR, table, 'Check that all td elements contain a headers attribute that lists the id for all headers associated with that cell.', 'H43.MissingHeadersAttrs');
                }
            } else if ((scopeAttr.missing.length > 0) && (headersAttr.used === false)) {
                // Scope is used rather than headers, but not all th elements have them.
                HTMLCS.addMessage(HTMLCS.ERROR, table, 'Check that all th elements have a scope attribute.', 'H63.1');
            } else if ((scopeAttr.missing.length > 0) && ((headersAttr.missingThId.length > 0) || (headersAttr.missingTd.length > 0))) {
                // Both are used and both were done incorrectly. Provide generic message.
                HTMLCS.addMessage(HTMLCS.ERROR, table, 'Associate data cells with table headings using either the scope or headers attribute techniques.', 'H43,H63');
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
     * Test for the correct headers attributes on table cell elements.
     *
     * Return value contains the following elements:
     * - required (Boolean):   Whether header association at all is required.
     * - used (Boolean):       Whether headers attribute has been used on at least
     *                         one table data (td) cell.
     * - allowScope (Boolean): Whether scope is allowed to satisfy the association
     *                         requirement (ie. max one row/one column).
     * - correct (Boolean):    Whether headers have been correctly used.
     * - missingThId (Array):  Array of th elements without IDs.
     * - missingTd (Array):    Array of elements without headers attribute.
     * - wrongHeaders (Array): Array of elements where headers attr is incorrect.
     *                         Each is a structure with following keys: element,
     *                         expected [headers attr], actual [headers attr].
     *
     * @param {DOMNode} element Table element to test upon.
     *
     * @return {Object} The above return value structure.
     */
    _testTableHeadersAttrs: function(element)
    {
        var retval = {
            required: true,
            used: false,
            correct: true,
            allowScope: true,
            missingThId: [],
            missingTd: [],
            wrongHeaders: [],
        }

        var tdCells    = {};
        var rows       = element.getElementsByTagName('tr');
        var skipCells  = [];
        var headingIds = {
            rows: {},
            cols: {}
        };
        var missingIds = false;

        for (var rownum = 0; rownum < rows.length; rownum++) {
            var row    = rows[rownum];
            var colnum = 0;

            for (var item = 0; item < row.childNodes.length; item++) {
                var cell = row.childNodes[item];
                if (cell.nodeType === 1) {
                    // Skip columns that are skipped due to rowspan.
                    if (skipCells[rownum]) {
                        while (skipCells[rownum][0] === colnum) {
                            skipCells[rownum].shift();
                            colnum++;
                        }
                    }

                    var nodeName = cell.nodeName.toLowerCase();
                    var rowspan  = Number(cell.getAttribute('rowspan')) || 1;
                    var colspan  = Number(cell.getAttribute('colspan')) || 1;

                    // If rowspanned, mark columns as skippable in the following
                    // row(s).
                    if (rowspan > 1) {
                        for (var i = rownum + 1; i < rownum + rowspan; i++) {
                            if (!skipCells[i]) {
                                skipCells[i] = [];
                            }

                            for (var j = colnum; j < colnum + colspan; j++) {
                                skipCells[i].push(j);
                            }
                        }
                    }

                    if (nodeName === 'th') {
                        var id = (cell.getAttribute('id') || '');

                        // Save the fact that we have a missing ID on the header.
                        if (id === '') {
                            retval.correct = false;
                            retval.missingThId.push(cell);
                        }

                        for (var i = rownum; i < rownum + rowspan; i++) {
                            headingIds.rows[i] = headingIds.rows[i] || [];
                            headingIds.rows[i].push(id);
                        }

                        for (var i = colnum; i < colnum + colspan; i++) {
                            headingIds.cols[i] = headingIds.cols[i] || [];
                            headingIds.cols[i].push(id);
                        }
                    } else if (nodeName === 'td') {
                        var headers = (cell.getAttribute('headers') || '').split(/\s+/);

                        if ((headers.length > 1) || (headers[0] !== '')) {
                            retval.used = true;
                        } else {
                            headers = [];
                        }

                        tdCells[rownum]         = tdCells[rownum] || [];
                        tdCells[rownum][colnum] = {
                            cellObj: cell,
                            rowspan: rowspan,
                            colspan: colspan,
                            headers: headers
                        }
                    }//end if

                    colnum += colspan;
                }//end if
            }//end for
        }//end for

        // Next, work out whether we need headers to pass this technique.
        // With only one single row OR column of headers, nothing is required.
        // .. one row -and- one column, accept either headers or scope.
        // .. 2+ rows or 2+ columns, accept headers only. (Break out once we know
        //    that one of the two is true - we don't need to go any further.)
        var requiresHeaders = true;
        var multiHeaders    = {
            rows: 0,
            cols: 0
        }

        for (var rownum in headingIds.rows) {
            if (headingIds.rows.hasOwnProperty(rownum) === true) {
                if (headingIds.rows[rownum].length > 1) {
                    multiHeaders.rows++;
                    if (multiHeaders.rows >= 2) {
                        break;
                    }
                }
            }
        }//end for

        if (multiHeaders.rows < 2) {
            for (var colnum in headingIds.cols) {
                if (headingIds.cols.hasOwnProperty(colnum) === true) {
                    if (headingIds.cols[colnum].length > 1) {
                        multiHeaders.cols++;
                        if (multiHeaders.cols >= 2) {
                            break;
                        }
                    }
                }
            }//end for
        }//end if

        if (multiHeaders.cols + multiHeaders.rows <= 1) {
            // If only one column OR one row header.
            retval.required = false;
        } else if ((multiHeaders.cols > 1) || (multiHeaders.rows > 1)) {
            // If more than one column, disable checking of scope attribute.
            retval.allowScope = false;
        }//end if

        // Calculate expected heading IDs. If they are not there or incorrect, flag
        // them
        for (var rownum in tdCells) {
            if (tdCells.hasOwnProperty(rownum) === true) {
                for (var colnum in tdCells[rownum]) {
                    if (tdCells[rownum].hasOwnProperty(colnum) === true) {
                        // Valid cell.
                        var cell     = tdCells[rownum][colnum];
                        var expected = [];

                        rownum = Number(rownum);
                        colnum = Number(colnum);

                        if (cell.headers.length === 0) {
                            // Headers attribute is not there.
                            retval.correct = false;
                            retval.missingTd.push(cell);
                        } else {
                            // Add the column and row headers that we expect.
                            for (var i = colnum; i < colnum + cell.colspan; i++) {
                                if (headingIds.cols[i]) {
                                    expected = expected.concat(headingIds.cols[i]);
                                }
                            }

                            for (var i = rownum; i < rownum + cell.rowspan; i++) {
                                if (headingIds.rows[i]) {
                                    expected = expected.concat(headingIds.rows[i]);
                                }
                            }

                            // Constructed a normalised expected and actual headers list:
                            // a sorted, trimmed, space-normalised list of IDs with
                            // duplicates removed (in case of colspans).
                            var exp    = ' ' + expected.sort().join(' ') + ' ';
                            var actual = ' ' + cell.headers.sort().join(' ') + ' ';
                            exp        = exp.replace(/\s+/g, ' ').replace(/(\w+\s)\1+/g, '$1').replace(/^\s*(.*?)\s*$/g, '$1');
                            actual     = actual.replace(/\s+/g, ' ').replace(/(\w+\s)\1+/g, '$1').replace(/^\s*(.*?)\s*$/g, '$1');

                            if (actual !== exp) {
                                // Incorrect headers.
                                retval.correct = false;
                                var val = {
                                    element: cell.cellObj,
                                    expected: exp,
                                    actual: (cell.cellObj.getAttribute('headers') || '')
                                }
                                retval.wrongHeaders.push(val);
                            }
                        }//end if
                    }//end if
                }//end for
            }//end if
        }//end for

        return retval;
    },

    testTableCaptionSummary: function(table) {
        var summary   = table.getAttribute('summary') || '';
        var captionEl = table.getElementsByTagName('caption');
        var caption   = '';

        if (captionEl.length > 0) {
            caption = captionEl[0].innerHTML.replace(/^\s*(.*?)\s*$/g, '$1');
        }
        summary = summary.replace(/^\s*(.*?)\s*$/g, '$1');

        if (summary !== '') {
            if (caption === summary) {
                HTMLCS.addMessage(HTMLCS.ERROR, table, 'If both a summary attribute and a caption element are present for this data table, the summary should not duplicate the caption.', 'H39,H73.4');
            }

            HTMLCS.addMessage(HTMLCS.NOTICE, table, 'Check that the summary attribute describes the table\'s organization or explains how to use the table.', 'H73.3.Check');
        } else {
            HTMLCS.addMessage(HTMLCS.NOTICE, table, 'Consider using the summary attribute of the table element to give an overview of this data table.', 'H73.3.NoSummary');
        }//end if

        if (caption !== '') {
            HTMLCS.addMessage(HTMLCS.NOTICE, table, 'Check that the caption attribute accurately describes this table.', 'H39.3.Check');
        } else {
            HTMLCS.addMessage(HTMLCS.NOTICE, table, 'Consider using a caption element to the table element to identify this data table.', 'H39.3.NoCaption');
        }
    },

    testFieldsetLegend: function(fieldset) {
        var legend = fieldset.querySelector('legend');

        if ((legend === null) || (legend.parentNode !== fieldset)) {
            HTMLCS.addMessage(HTMLCS.ERROR, fieldset, 'Check that this fieldset has a legend element that includes a description of that group.', 'H71.3');
        }
    },

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
                HTMLCS.addMessage(HTMLCS.ERROR, form, 'Check that any group of input elements of type="radio" or type="checkbox" with the same name attribute is contained within a fieldset element.', 'H71.2');
                break;
            }//end if
        }//end for
    },

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
                    HTMLCS.addMessage(HTMLCS.ERROR, element, 'Check that content that has the visual appearance of a list (with or without bullets) is marked as an unordered list.', 'H48.1');
                    break;
                } if (/^\d+[:\/\-.]?\s+/.test(items[0]) === true) {
                    // Test for "1 " cases (or "1. ", "1: ", "1- ").
                    HTMLCS.addMessage(HTMLCS.ERROR, element, 'Check that content that has the visual appearance of a numbered list is marked as an ordered list.', 'H48.2');
                    break;
                }
            }//end for
        }//end if
    }
};
