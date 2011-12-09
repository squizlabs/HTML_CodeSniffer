var HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_1_3_1_5 = {
    _labelNames: null,

    register: function()
    {
        return ['_top'];

    },

    process: function(element, top)
    {
        HTMLCS.addMessage(HTMLCS.NOTICE, top, 'Where the content requires reading ability more advanced than the lower secondary education level, supplemental content or an alternative version should be provided.', 'G86,G103,G79,G153,G160');

    }
};
