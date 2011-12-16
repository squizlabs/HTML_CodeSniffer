var HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_1_3_1_4 = {
    register: function()
    {
        return ['_top'];

    },

    process: function(element, top)
    {
        HTMLCS.addMessage(HTMLCS.NOTICE, top, 'Check that a mechanism for identifying the expanded form or meaning of abbreviations is available.', 'G102,G55,G62,H28,G97');

    }
};
