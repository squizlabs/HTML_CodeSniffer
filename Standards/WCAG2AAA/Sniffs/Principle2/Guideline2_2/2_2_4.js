var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_2_2_2_4 = {
    register: function()
    {
        return ['_top'];

    },

    process: function(element, top)
    {
        HTMLCS.addMessage(HTMLCS.NOTICE, element, 'Check that all interruptions (including updates to content) can be postponed or suppressed by the user, except interruptions involving an emergency.', 'SCR14');

    }
};
