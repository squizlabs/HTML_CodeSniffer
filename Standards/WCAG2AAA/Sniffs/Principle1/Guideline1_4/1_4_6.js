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

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_6 = {
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
            var failures = HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_3_Contrast.testContrastRatio(top, 7.0, 4.5);

            for (var i = 0; i < failures.length; i++) {
                var element  = failures[i].element;
                var value    = (Math.round(failures[i].value * 100) / 100);
                var required = failures[i].required;

                if (required === 4.5) {
                    var code = 'G18';
                } else if (required === 7.0) {
                    var code = 'G17';
                }

                HTMLCS.addMessage(HTMLCS.ERROR, element, 'This element has insufficient contrast at this level. Expected a contrast ratio of at least ' + required + ':1, but text in this element has a contrast ratio of ' + value + ':1.', code);
            }
        }
    }
};
