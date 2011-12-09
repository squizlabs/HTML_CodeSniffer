var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_3_2_3_2 = {
    _labelNames: null,

    register: function()
    {
        return ['_top'];

    },

    process: function(element, top)
    {
        HTMLCS.addMessage(HTMLCS.NOTICE, top, 'Check that no component of the content does not flash more than three times in any 1-second period.', 'G19');

    }
};
