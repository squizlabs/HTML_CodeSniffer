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

_global.HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_8 = {
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
        // This Success Criterion has five prongs, and each should be thrown as a
        // separate notice as separate techniques apply to each.
        HTMLCS.addMessage(HTMLCS.NOTICE, top, _global.HTMLCS.getTranslation("1_4_8_G148,G156,G175"), 'G148,G156,G175');
        HTMLCS.addMessage(HTMLCS.NOTICE, top, _global.HTMLCS.getTranslation("1_4_8_H87,C20"), 'H87,C20');
        HTMLCS.addMessage(HTMLCS.NOTICE, top, _global.HTMLCS.getTranslation("1_4_8_C19,G172,G169"), 'C19,G172,G169');
        HTMLCS.addMessage(HTMLCS.NOTICE, top, _global.HTMLCS.getTranslation("1_4_8_G188,C21"), 'G188,C21');
        HTMLCS.addMessage(HTMLCS.NOTICE, top, _global.HTMLCS.getTranslation("1_4_8_H87,G146,C26"), 'H87,G146,C26');

    }
};
