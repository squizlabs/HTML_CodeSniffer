var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_6 = {
    _labelNames: null,

    register: function()
    {
        return ['_top'];

    },

    process: function(element, top)
    {
        HTMLCS.addMessage(HTMLCS.NOTICE, top, 'Check that a contrast ratio of at least 7.0:1 exists between text (or images of text) and its background colour, or 4.5:1 for large text.', 'G17,G18,G148,G174');

    }
};
