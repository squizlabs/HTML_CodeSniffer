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
            'textarea',
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
        var requiredNames = {
            a: ['@title', '_content'],
            button: ['@title', '_content'],
            fieldset: ['legend'],
            input_button: ['@value'],
            input_text: ['label', '@title'],
            input_password: ['label', '@title'],
            input_checkbox: ['label', '@title'],
            input_radio: ['label', '@title'],
            input_image: ['@alt', '@title'],
            select: ['label', '@title'],
            textarea: ['label', '@title'],
        }

        var requiredValues = {
            a: '@href',
            input_text: '@value',
            select: 'option_selected',
        };

        var nodeName = element.nodeName.toLowerCase();
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
                var msgNodeType = 'form control';
                if (nodeName === 'a') {
                    msgNodeType = 'link';
                }

                HTMLCS.addMessage(HTMLCS.ERROR, element, 'Check that this ' + msgNodeType + ' has a name that is available to an accessibility API.', 'H91.Name');
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
            var msgNodeType = 'form control';
            if (nodeName === 'a') {
                msgNodeType = 'link';
            }

            HTMLCS.addMessage(HTMLCS.ERROR, element, 'Check that this ' + msgNodeType + ' has a value that is available to an accessibility API.', 'H91.Value');
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
    },
};
