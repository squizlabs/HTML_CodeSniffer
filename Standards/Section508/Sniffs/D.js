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

_global.HTMLCS_Section508_Sniffs_D = {
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
            HTMLCS.addMessage(HTMLCS.NOTICE, top, 'Ensure that content is ordered in a meaningful sequence when linearised, such as when style sheets are disabled.', 'Linearised');
            this.testPresentationMarkup(top);
            this.testHeadingOrder(top);

            // Look for any script elements, and fire off another notice regarding
            // potentially hidden text (eg. "click to expand" sections). For instance,
            // such text should be stored semantically in the page, not loaded into
            // a container through AJAX (and thus not accessible with scripting off).
            var hasScript = HTMLCS.util.getAllElements(top, 'script, link[rel="stylesheet"]');
            if (hasScript.length > 0) {
                HTMLCS.addMessage(HTMLCS.NOTICE, top, 'If content is hidden and made visible using scripting (such as "click to expand" sections), ensure this content is readable when scripts and style sheets are disabled.', 'HiddenText');
            }
        }
    },

    /**
     * Test for the use of presentational elements.
     *
     * @param [DOMNode] top The top element of the tested code.
     */
    testPresentationMarkup: function(top)
    {
        _global.HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_3_1_3_1.testPresentationMarkup(top);
    },

    testHeadingOrder: function(top) {
        var lastHeading = 0;
        var headings    = HTMLCS.util.getAllElements(top, 'h1, h2, h3, h4, h5, h6');

        for (var i = 0; i < headings.length; i++) {
            var headingNum = parseInt(headings[i].nodeName.substr(1, 1));
            if (headingNum - lastHeading > 1) {
                var exampleMsg = 'should be an h' + (lastHeading + 1) + ' to be properly nested';
                if (lastHeading === 0) {
                    // If last heading is empty, we are at document top and we are
                    // expecting a H1, generally speaking.
                    exampleMsg = 'appears to be the primary document heading, so should be an h1 element';
                }

                HTMLCS.addMessage(HTMLCS.ERROR, headings[i], 'The heading structure is not logically nested. This h' + headingNum + ' element ' + exampleMsg + '.', 'HeadingOrder');
            }

            lastHeading = headingNum;
        }
    }

};
