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

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_8 = {
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
        HTMLCS.addMessage(HTMLCS.NOTICE, top, 'Check that a mechanism is available for the user to select foreground and background colours for blocks of text, either through the Web page or the browser.', 'G148,G156,G175');
        HTMLCS.addMessage(HTMLCS.NOTICE, top, 'Check that a mechanism exists to reduce the width of a block of text to no more than 80 characters (or 40 in Chinese, Japanese or Korean script).', 'H87,C20');
        HTMLCS.addMessage(HTMLCS.NOTICE, top, 'Check that blocks of text are not fully justified - that is, to both left and right edges - or a mechanism exists to remove full justification.', 'C19,G172,G169');
        HTMLCS.addMessage(HTMLCS.NOTICE, top, 'Check that line spacing in blocks of text are at least 150% in paragraphs, and paragraph spacing is at least 1.5 times the line spacing, or that a mechanism is available to achieve this.', 'G188,C21');
        HTMLCS.addMessage(HTMLCS.NOTICE, top, 'Check that text can be resized without assistive technology up to 200 percent without requiring the user to scroll horizontally on a full-screen window.', 'H87,G146,C26');

    }
};
