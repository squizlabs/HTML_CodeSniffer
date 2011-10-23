var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_9 = {
    register: function()
    {
        return ['a'];

    },

    process: function(element)
    {
        HTMLCS.addMessage(HTMLCS.NOTICE, element, 'Check that text of the link describes the purpose of the link.', 'H30');

    }
};
