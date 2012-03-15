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
     * NOTE: The separate test file for failure F24 (foreground colour without
     * background colour, or vice versa) also applies to 1.4.6 at Triple-A level.
     *
     * @param {DOMNode} element The element registered.
     * @param {DOMNode} top     The top element of the tested code.
     */
    process: function(element, top)
    {
        HTMLCS.addMessage(HTMLCS.NOTICE, top, 'Check that a contrast ratio of at least 7.0:1 exists between text (or images of text) and its background colour, or 4.5:1 for large text.', 'G17,G18,G148,G174');

    }
};
