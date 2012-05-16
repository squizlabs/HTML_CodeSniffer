/**
 * +--------------------------------------------------------------------+
 * | This HTML_CodeSniffer file is Copyright (c)                        |
 * | Squiz Australia Pty Ltd ABN 53 131 581 247                         |
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
        return [
            'a',
            'button',
            'fieldset',
            'input',
            'select',
            'textarea'
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
        if (element.nodeName.toLowerCase() === 'a') {
            this._processLinks(element);
        } else {
            this._processFormControls(element, top);
        }
    },

    _processLinks: function(element)
    {
        // Name is title attr or content
        // Value is href

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
                    HTMLCS.addMessage(HTMLCS.ERROR, element, 'Empty anchor elements should not be used for defining in-page link targets. Consider moving its ID to a parent or nearby element.', 'H91.A.Empty');
                } else if (element.hasAttribute('name') === true) {
                    HTMLCS.addMessage(HTMLCS.ERROR, element, 'Empty anchor elements should not be used for defining in-page link targets. Consider moving the name attribute to become an ID of a parent or nearby element.', 'H91.A.EmptyWithName');
                } else {
                    HTMLCS.addMessage(HTMLCS.ERROR, element, 'Anchor element found with no link content and no name and/or ID attribute.', 'H91.A.EmptyNoId');
                }
            } else {
                // Giving a benefit of the doubt here - if a link has text and also
                // an ID, but no href, it might be because it is being manipulated by
                // a script.
                if (element.hasAttribute('id') === true) {
                    HTMLCS.addMessage(HTMLCS.WARNING, element, 'Anchor elements should not be used for defining in-page link targets. If not using the ID for other purposes (such as CSS or scripting), consider moving it to a parent element.', 'H91.A.NoHref');
                } else {
                    // HTML5 allows A elements with text but no href, "for where a
                    // link might otherwise have been placed, if it had been relevant".
                    // Hence, thrown as a warning, not an error.
                    HTMLCS.addMessage(HTMLCS.WARNING, element, 'Anchor element found with link content, but no href and/or ID attribute has been supplied.', 'H91.A.Placeholder');
                }
            }
        } else {
            if (/^\s*$/.test(content) === true) {
                // Href provided, but no content.
                // We only fire this message when there are no images in the content.
                // A link around an image with no alt text is already covered in SC
                // 1.1.1 (test H30).
                if (element.querySelectorAll('img').length === 0) {
                    HTMLCS.addMessage(HTMLCS.ERROR, element, 'Anchor element found with a valid href attribute, but no link content has been supplied.', 'H91.A.NoContent');
                }
            }
        }
    },

    _processFormControls: function(element, top)
    {
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
                    // Label element.
                    if ((element.hasAttribute('id')) && (/^\s*$/.test(element.getAttribute('id')) === false)) {
                        // Only test if the ID is valid CSS identifier, otherwise querySelector will complain.
                        if (/^\-?[A-Za-z][A-Za-z0-9\-_]*$/.test(element.getAttribute('id')) === true) {
                            var label = top.querySelector('label[for=' + element.getAttribute('id') + ']');
                            if (label !== null) {
                                break;
                            }
                        } else {
                            HTMLCS.addMessage(HTMLCS.ERROR, element, 'Unable to automatically test for a label for element ID "' + element.getAttribute('id') + '".', 'H91.' + msgSubCode + '.NameInvalid');
                        }
                    }
                } if (requiredName.charAt(0) === '@') {
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

                HTMLCS.addMessage(HTMLCS.ERROR, element, 'This ' + msgNodeType + ' does not have a name available to an accessibility API. Valid names are: ' + builtAttrs.join(', ') + '.', 'H91.' + msgSubCode + '.Name');
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
            // Select lists need a selected Option element.
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

            var builtAttr = '';
            if (requiredValue === '_content') {
                builtAttr = 'by adding content to the element';
            } else if (requiredValue === 'option_selected') {
                builtAttr = 'by adding a "selected" attribute to one of its options';
            } else if (requiredValue.charAt(0) === '@') {
                builtAttr = 'using the ' + requiredValue + ' attribute';
            } else {
                builtAttr = 'using the ' + requiredValue + ' element';
            }

            HTMLCS.addMessage(HTMLCS.ERROR, element, 'This ' + msgNodeType + ' does not have a value available to an accessibility API. Add one ' + builtAttr + '.', 'H91.' + msgSubCode + '.Value');
        }
    }
};
