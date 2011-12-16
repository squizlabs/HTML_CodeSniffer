var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_5 = {
    register: function()
    {
        return ['_top'];

    },

    process: function(element, top)
    {
        HTMLCS.addMessage(HTMLCS.NOTICE, element, 'Check that headings and labels describe topic or purpose.', 'G130,G131');

    }
};
