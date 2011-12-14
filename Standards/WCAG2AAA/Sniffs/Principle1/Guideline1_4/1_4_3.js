var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_3 = {
    _labelNames: null,

    register: function()
    {
        return ['_top'];

    },

    process: function(element, top)
    {
        HTMLCS.addMessage(HTMLCS.NOTICE, top, 'Check that a contrast ratio of at least 4.5:1 exists between text (or images of text) and its background colour, or 3.0:1 for large text.', 'G18,G145,G148,G174');

    }
};
