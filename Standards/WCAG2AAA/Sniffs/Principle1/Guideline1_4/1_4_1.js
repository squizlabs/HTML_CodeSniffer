var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_1 = {
    _labelNames: null,

    register: function()
    {
        return ['_top'];

    },

    process: function(element, top)
    {
        HTMLCS.addMessage(HTMLCS.NOTICE, top, 'Check that any information conveyed using colour alone is also available in text, or through other visual cues.', 'G14,G182');

    }
};
