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

var HTMLCS_WCAG2AAA_Sniffs_Principle4_Guideline4_1_4_1_2 = {
    /**
     * Determines the elements to register for processing.
     *
     * Each element of the returned array can either be an element name, or "_top"
     * which is the top element of the tested code.
     *
     * @returns {Array} The list of elements.
     */
    register: function()
    {
        return ['_top'];

    },

    /**
     * Process the registered element.
     *
     * @param {DOMNode} element The element registered.
     * @param {DOMNode} top     The top element of the tested code.
     */
    process: function(element, top)
    {
        if (element === top) {
            var messages = this.processFormControls(top);
            for (var i = 0; i < messages.errors.length; i++) {
                HTMLCS.addMessage(HTMLCS.ERROR, messages.errors[i].element, messages.errors[i].msg, 'H91.' + messages.errors[i].subcode);
            }

            for (var i = 0; i < messages.warnings.length; i++) {
                HTMLCS.addMessage(HTMLCS.WARNING, messages.warnings[i].element, messages.warnings[i].msg, 'H91.' + messages.warnings[i].subcode);
            }

            this.addProcessLinksMessages(top);
        }//end if
    },

    addProcessLinksMessages: function(top)
    {
        var errors = this.processLinks(top);
        for (var i = 0; i < errors.empty.length; i++) {
            HTMLCS.addMessage(HTMLCS.WARNING, errors.empty[i], 'Anchor element found with an ID but without a href or link text. Consider moving its ID to a parent or nearby element.', 'H91.A.Empty');
        }

        for (var i = 0; i < errors.emptyWithName.length; i++) {
            HTMLCS.addMessage(HTMLCS.WARNING, errors.emptyWithName[i], 'Anchor element found with a name attribute but without a href or link text. Consider moving the name attribute to become an ID of a parent or nearby element.', 'H91.A.EmptyWithName');
        }

        for (var i = 0; i < errors.emptyNoId.length; i++) {
            HTMLCS.addMessage(HTMLCS.ERROR, errors.emptyNoId[i], 'Anchor element found with no link content and no name and/or ID attribute.', 'H91.A.EmptyNoId');
        }

        for (var i = 0; i < errors.noHref.length; i++) {
            HTMLCS.addMessage(HTMLCS.WARNING, errors.noHref[i], 'Anchor elements should not be used for defining in-page link targets. If not using the ID for other purposes (such as CSS or scripting), consider moving it to a parent element.', 'H91.A.NoHref');
        }

        for (var i = 0; i < errors.placeholder.length; i++) {
            HTMLCS.addMessage(HTMLCS.WARNING, errors.placeholder[i], 'Anchor element found with link content, but no href, ID or name attribute has been supplied.', 'H91.A.Placeholder');
        }

        for (var i = 0; i < errors.noContent.length; i++) {
            HTMLCS.addMessage(HTMLCS.ERROR, errors.noContent[i], 'Anchor element found with a valid href attribute, but no link content has been supplied.', 'H91.A.NoContent');
        }
    },

    processLinks: function(top)
    {
        var errors   = {
            empty: [],
            emptyWithName: [],
            emptyNoId: [],
            noHref: [],
            placeholder: [],
            noContent: []
        };

        var elements = top.querySelectorAll('a');

        for (var el = 0; el < elements.length; el++) {
            var element = elements[el];

            var nameFound = false;
            var hrefFound = false;
            var content   = HTMLCS.util.getElementTextContent(element);

            if ((element.hasAttribute('title') === true) && (/^\s*$/.test(element.getAttribute('title')) === false)) {
                nameFound = true;
            } else if (/^\s*$/.test(content) === false) {
                nameFound = true;
            }

            if ((element.hasAttribute('href') === true) && (/^\s*$/.test(element.getAttribute('href')) === false)) {
                hrefFound = true;
            }

            if (hrefFound === false) {
                // No href. We don't want these because, although they are commonly used
                // to create targets, they can be picked up by screen readers and
                // displayed to the user as empty links. A elements are defined by H91 as
                // having an (ARIA) role of "link", and using them as targets are
                // essentially misusing them. Place an ID on a parent element instead.
                if (/^\s*$/.test(content) === true) {
                    // Also no content. (eg. <a id=""></a> or <a name=""></a>)
                    if (element.hasAttribute('id') === true) {
                        errors.empty.push(element);
                    } else if (element.hasAttribute('name') === true) {
                        errors.emptyWithName.push(element);
                    } else {
                        errors.emptyNoId.push(element);
                    }
                } else {
                    // Giving a benefit of the doubt here - if a link has text and also
                    // an ID, but no href, it might be because it is being manipulated by
                    // a script.
                    if ((element.hasAttribute('id') === true) || (element.hasAttribute('name') === true)) {
                        errors.noHref.push(element);
                    } else {
                        // HTML5 allows A elements with text but no href, "for where a
                        // link might otherwise have been placed, if it had been relevant".
                        // Hence, thrown as a warning, not an error.
                        errors.placeholder.push(element);
                    }
                }//end if
            } else {
                if (nameFound === false) {
                    // Href provided, but no content or title.
                    // We only fire this message when there are no images in the content.
                    // A link around an image with no alt text is already covered in SC
                    // 1.1.1 (test H30).
                    if (element.querySelectorAll('img').length === 0) {
                        errors.noContent.push(element);
                    }
                }//end if
            }//end if
        }//end for

        return errors;
    },

    processFormControls: function(top)
    {
        var elements = top.querySelectorAll('button, fieldset, input, select, textarea');
        var errors   = [];
        var warnings = [];

        var requiredNames = {
            button: ['@title', '_content'],
            fieldset: ['legend'],
            input_button: ['@value'],
            input_text: ['label', '@title'],
            input_file: ['label', '@title'],
            input_password: ['label', '@title'],
            input_checkbox: ['label', '@title'],
            input_radio: ['label', '@title'],
            input_image: ['@alt', '@title'],
            select: ['label', '@title'],
            textarea: ['label', '@title']
        }

        var requiredValues = {
            select: 'option_selected'
        };

        for (var el = 0; el < elements.length; el++) {
            var element    = elements[el];
            var nodeName   = element.nodeName.toLowerCase();
            var msgSubCode = element.nodeName.substr(0, 1).toUpperCase() + element.nodeName.substr(1).toLowerCase();
            if (nodeName === 'input') {
                if (element.hasAttribute('type') === false) {
                    // If no type attribute, default to text.
                    nodeName += '_text';
                } else {
                    nodeName += '_' + element.getAttribute('type').toLowerCase();
                }

                // Treat all input buttons as the same
                if ((nodeName === 'input_submit') || (nodeName === 'input_reset')) {
                    nodeName = 'input_button';
                }

                // Get a format like "InputText".
                var msgSubCode = 'Input' + nodeName.substr(6, 1).toUpperCase() + nodeName.substr(7).toLowerCase();
            }//end if

            var requiredName  = requiredNames[nodeName];
            var requiredValue = requiredValues[nodeName];

            // Check all possible combinations of names to ensure that one exists.
            if (requiredName) {
                for (var i = 0; i < requiredNames[nodeName].length; i++) {
                    var requiredName = requiredNames[nodeName][i];
                    if (requiredName === '_content') {
                        // Work with content.
                        var content = HTMLCS.util.getElementTextContent(element);
                        if (/^\s*$/.test(content) === false) {
                            break;
                        }
                    } else if (requiredName === 'label') {
                        // Label element. Re-use the label associating
                        // functions in SC 1.3.1.
                        var hasLabel = HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_3_1_3_1.testLabelsOnInputs(element, top, true);
                        if (hasLabel !== false) {
                            found = true;
                            break;
                        }
                    } else if (requiredName.charAt(0) === '@') {
                        // Attribute.
                        requiredName = requiredName.substr(1, requiredName.length);
                        if ((element.hasAttribute(requiredName) === true) && (/^\s*$/.test(element.getAttribute(requiredName)) === false)) {
                            break;
                        }
                    } else {
                        // Sub-element contents.
                        var subEl = element.querySelector(requiredName);
                        if (subEl !== null) {
                            var content = HTMLCS.util.getElementTextContent(subEl);
                            if (/^\s*$/.test(content) === false) {
                                break;
                            }
                        }
                    }//end if
                }//end for

                if (i === requiredNames[nodeName].length) {
                    var msgNodeType = nodeName + ' element';
                    if (nodeName.substr(0, 6) === 'input_') {
                        msgNodeType = nodeName.substr(6) + ' input element';
                    }

                    var builtAttrs = requiredNames[nodeName].slice(0, requiredNames[nodeName].length);
                    for (var a = 0; a < builtAttrs.length; a++) {
                        if (builtAttrs[a] === '_content') {
                            builtAttrs[a] = 'element content';
                        } else if (builtAttrs[a].charAt(0) === '@') {
                            builtAttrs[a] = builtAttrs[a].substr(1) + ' attribute';
                        } else {
                            builtAttrs[a] = builtAttrs[a] + ' element';
                        }
                    }

                    var msg = 'This ' + msgNodeType + ' does not have a name available to an accessibility API. Valid names are: ' + builtAttrs.join(', ') + '.';
                    errors.push({
                        element: element,
                        msg: msg,
                        subcode: (msgSubCode + '.Name')
                    });
                }
            }//end if

            var requiredValue = requiredValues[nodeName];
            var valueFound    = false;

            if (requiredValue === undefined) {
                // Nothing required of us.
                valueFound = true;
            } else if (requiredValue === '_content') {
                // Work with content.
                var content = HTMLCS.util.getElementTextContent(element);
                if (/^\s*$/.test(content) === false) {
                    valueFound = true;
                }
            } else if (requiredValue === 'option_selected') {
                // Select lists are recommended to have a selected Option element.
                if (element.hasAttribute('multiple') === false) {
                    var selected = element.querySelector('option[selected]');
                    if (selected !== null) {
                        valueFound = true;
                    }
                } else {
                    // Allow zero element selection to be valid where the SELECT
                    // element has been declared as a multiple selection.
                    valueFound = true;
                }
            } else if (requiredValue.charAt(0) === '@') {
                // Attribute.
                requiredValue = requiredValue.substr(1, requiredValue.length);
                if ((element.hasAttribute(requiredValue) === true)) {
                    valueFound = true;
                }
            }//end if

            if (valueFound === false) {
                var msgNodeType = nodeName + ' element';
                if (nodeName.substr(0, 6) === 'input_') {
                    msgNodeType = nodeName.substr(6) + ' input element';
                }

                var msg = 'This ' + msgNodeType + ' does not have a value available to an accessibility API.';
                
                var builtAttr = '';
                var warning   = false;
                if (requiredValue === '_content') {
                    builtAttr = ' Add one by adding content to the element.';
                } else if (requiredValue === 'option_selected') {
                    // Change the message instead. The value is only undefined in HTML 4/XHTML 1;
                    // in HTML5 the first option in a single select dropdown is automatically selected.
                    // Because of this, it should also be sent out as a warning, not an error.
                    warning = true;
                    msg = 'This ' + msgNodeType + ' does not have an initially selected option.' + ' ' +
                        'Depending on your HTML version, the value exposed to an accessibility API may be undefined.';
                } else if (requiredValue.charAt(0) === '@') {
                    builtAttr = ' A value is exposed using the "' + requiredValue + '" attribute.';
                } else {
                    builtAttr = ' A value is exposed using the "' + requiredValue + '" element.';
                }

                msg += builtAttr;
                if (warning === false) {
                    errors.push({
                        element: element,
                        msg: msg,
                        subcode: (msgSubCode + '.Value')
                    });
                } else {
                    warnings.push({
                        element: element,
                        msg: msg,
                        subcode: (msgSubCode + '.Value')
                    });
                }
            }//end if
        }//end for

        return {
            errors: errors,
            warnings: warnings
        };
    }
};
