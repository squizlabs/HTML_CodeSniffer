var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_4 = {
    register: function()
    {
        return ['a'];

    },

    process: function(element)
    {
        HTMLCS.addMessage(HTMLCS.NOTICE, element, 'Check that the link text combined with programmatically determined link context identifies the purpose of the link.', 'H77-81');

    }
};
