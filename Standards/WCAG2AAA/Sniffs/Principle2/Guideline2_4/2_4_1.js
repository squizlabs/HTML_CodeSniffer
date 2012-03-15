var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_1 = {
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
            'iframe',
            'p',
            'div',
            'ul',
            'ol',
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

        switch (nodeName) {
            case 'iframe':
                this.testIframeTitle(element);
            break;

            case 'p':
            case 'div':
            case 'ul':
            case 'ol':
                this.testMapElement(element);
            break;
        }
    },

    /**
     * Test for the presence of title attributes on the iframe element (technique H64).
     *
     * @param {DOMNode} element The element to test.
     *
     * @returns void
     */
    testIframeTitle: function(element)
    {
        var nodeName = element.nodeName.toLowerCase();

        if (nodeName === 'iframe') {
            var hasTitle = false;
            if (element.hasAttribute('title') === true) {
                if (element.getAttribute('title') && (/^\s+$/.test(element.getAttribute('title')) === false)) {
                    hasTitle = true;
                }
            }

            if (hasTitle === false) {
                HTMLCS.addMessage(HTMLCS.ERROR, element, 'Check this element for the presence of a title attribute that identifies the frame.', 'H64.1');
            } else {
                HTMLCS.addMessage(HTMLCS.NOTICE, element, 'Check that the title attribute of this element contains text that identifies the frame.', 'H64.2');
            }
        }//end if
    },

    /**
     * Test for the presence of the map element for grouping links (technique H50).
     *
     * @param {DOMNode} element The element to test.
     *
     * @returns void
     */
    testMapElement: function(element)
    {
        var nodeName    = element.nodeName.toLowerCase();
        var linksLength = 0;

        if (nodeName === 'li') {
            // List item. Don't fire on these.
            linksLength = 0;
        } else if (/^(ul|ol|dl)$/.test(nodeName) === true) {
            // List container. Test on everything underneath.
            linksLength = element.querySelectorAll('a').length;
        } else {
            // Everything else. Test direct links only.
            var childNodes  = element.childNodes;
            for (var i = 0; i < childNodes.length; i++) {
                if ((childNodes[i].nodeType === 1) && (childNodes[i].nodeName.toLowerCase() === 'a')) {
                    linksLength++;
                    if (linksLength > 1) {
                        break;
                    }
                }
            }//end for
        }//end if

        if (linksLength > 1) {
            // Going to throw a warning here, mainly because we cannot easily tell
            // whether it is just a paragraph with multiple links, or a navigation
            // structure.
            var mapFound = false;
            var parent   = element.parentNode;
            while ((parent !== null) && (parent.nodeName.toLowerCase() !== 'map')) {
                parent = parent.parentNode;
            }

            if (parent === null) {
                // Found no map element.
                HTMLCS.addMessage(HTMLCS.WARNING, element, 'Check that links that should be grouped into logical sets (such as a navigation bar or main menu) are grouped using map elements, so they can be bypassed.', 'H50');
            }
        }//end if
    }
};
