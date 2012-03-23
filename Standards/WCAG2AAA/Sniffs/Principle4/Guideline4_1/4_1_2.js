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
            this._processFormControls(element);
        }
    },

    _processLinks: function(element)
    {
        // Name is title attr or content
        // Value is href

        var nameFound = false;
        var hrefFound = false;
        var content   = this._getElementTextContent(element);

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
                // Also no content. (eg. <a id=""></a>)
                if (element.hasAttribute('id') === true) {
                    HTMLCS.addMessage(HTMLCS.ERROR, element, 'Empty anchor elements should not be used for defining a in-page link target. Consider moving its ID to a parent or nearby element.', 'H91.A.Empty');
                } else {
                    HTMLCS.addMessage(HTMLCS.ERROR, element, 'Empty anchor element found.', 'H91.A.EmptyNoId');
                }
            } else {
                // Giving a benefit of the doubt here - if a link has text and also
                // an ID, but no href, it might be because it is being manipulated by
                // a script.
                if (element.hasAttribute('id') === true) {
                    HTMLCS.addMessage(HTMLCS.WARNING, element, 'Anchor elements should not be used for defining an in-page link target. If not using the ID for other purposes (such as CSS or scripting), consider moving it to a parent element.', 'H91.A.NoHref');
                } else {
                    // HTML5 allows A elements with text but no href, "for where a
                    // link might otherwise have been placed, if it had been relevant".
                    HTMLCS.addMessage(HTMLCS.WARNING, element, 'Link found with text, but no href and ID. If this is not "where a link would have been placed if relevant", the A element should be removed.', 'H91.A.Placeholder');
                }
            }
        } else {
            if (/^\s*$/.test(content) === true) {
                // Href provided, but no content.
                // We only fire this message when there are no images in the content.
                // A link around an image with no alt text is already covered in SC
                // 1.1.1 (test H30).
                if (element.querySelectorAll('img').length === 0) {
                    HTMLCS.addMessage(HTMLCS.ERROR, element, 'Link contains a valid href attribute, but no content.', 'H91.A.NoContent');
                }
            }
        }
    },

    _processFormControls: function(element)
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
            input_text: '@value',
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
                    var content = this._getElementTextContent(element);
                    if (/^\s*$/.test(content) === false) {
                        break;
                    }
                } else if (requiredName === 'label') {
                    // Label element.
                    if (element.hasAttribute('id')) {
                        var label = top.querySelector('label[for=' + element.getAttribute('id') + ']');
                        if (label !== null) {
                            break;
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
                        var content = this._getElementTextContent(subEl);
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
            var content = this._getElementTextContent(element);
            if (/^\s*$/.test(content) === false) {
                valueFound = true;
            }
        } else if (requiredValue === 'option_selected') {
            // Select lists need a selected Option element.
            var selected = element.querySelector('option[selected]');
            if (selected !== null) {
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
                builtAttr = 'element\'s content';
            } else if (requiredValue.charAt(0) === '@') {
                builtAttr = requiredValue + ' attribute';
            } else {
                builtAttr = requiredValue + ' element';
            }

            HTMLCS.addMessage(HTMLCS.ERROR, element, 'This ' + msgNodeType + ' does not have a value available to an accessibility API. Add one using the ' + builtAttr + '.', 'H91.' + msgSubCode + '.Value');
        }
    },

    _getElementTextContent: function(element, includeAlt)
    {
        if (includeAlt === undefined) {
            includeAlt = true;
        }

        var element = element.cloneNode(true);
        var nodes  = [];
        for (var i = 0; i < element.childNodes.length; i++) {
            nodes.push(element.childNodes[i]);
        }

        var text = [];
        while (nodes.length > 0) {
            var node = nodes.shift();

            // If it's an element, add any sub-nodes to the process list.
            if (node.nodeType === 1) {
                if (node.nodeName.toLowerCase() === 'img') {
                    // If an image, include the alt text unless we are blocking it.
                    if ((includeAlt === true) && (node.hasAttribute('alt') === true)) {
                        text.push(node.getAttribute('alt'));
                    }
                } else {
                    for (var i = 0; i < node.childNodes.length; i++) {
                        nodes.push(node.childNodes[i]);
                    }
                }
            } else if (node.nodeType === 3) {
                // Text node.
                text.push(node.nodeValue);
            }
        }

        // Push the text nodes together and trim.
        text = text.join('').replace(/^\s+|\s+$/g,'');
        return text;
    }
};
