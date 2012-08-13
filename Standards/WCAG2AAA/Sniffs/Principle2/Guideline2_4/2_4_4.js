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

var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_4 = {
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
        return ['a'];

    },

    /**
     * Process the registered element.
     *
     * @param {DOMNode} element The element registered.
     * @param {DOMNode} top     The top element of the tested code.
     */
    process: function(element, top)
    {
        if (element.hasAttribute('title') === true) {
            HTMLCS.addMessage(HTMLCS.NOTICE, element, 'Check that the link text combined with programmatically determined link context, or its title attribute, identifies the purpose of the link.', 'H77,H78,H79,H80,H81,H33');
        } else {
            HTMLCS.addMessage(HTMLCS.NOTICE, element, 'Check that the link text combined with programmatically determined link context identifies the purpose of the link.', 'H77,H78,H79,H80,H81');
        }

    }
};
