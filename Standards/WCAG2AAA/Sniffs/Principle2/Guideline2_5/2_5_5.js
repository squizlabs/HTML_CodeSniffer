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

_global.HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_5_2_5_5 = {
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
        HTMLCS.addMessage(HTMLCS.NOTICE, top, 'Check that the size of the target for pointer inputs is at least 44 by 44 CSS pixels except when: \
        <ul> \
            <li>Equivalent: The target is available through an equivalent link or control on the same page that is at least 44 by 44 CSS pixels;</li> \
            <li>Inline: The target is in a sentence or block of text;</li> \
            <li>User Agent Control: The size of the target is determined by the user agent and is not modified by the author;</li> \
            <li>Essential: A particular presentation of the target is essential to the information being conveyed.</li> \
        </ul>', '');
    }
};
