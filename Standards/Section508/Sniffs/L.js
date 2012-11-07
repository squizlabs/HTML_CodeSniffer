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

var HTMLCS_Section508_Sniffs_L = {
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
            // Grab "accessibility API name/value" tests from WCAG 2.0 SC 4.1.2.
            var errors = HTMLCS_WCAG2AAA_Sniffs_Principle4_Guideline4_1_4_1_2.processFormControls(element, top);
            for (var i = 0; i < errors.length; i++) {
                HTMLCS.addMessage(HTMLCS.ERROR, errors[i].element, errors[i].msg, 'FunctionalText.' + errors[i].subcode);
            }
        }
    }

};
