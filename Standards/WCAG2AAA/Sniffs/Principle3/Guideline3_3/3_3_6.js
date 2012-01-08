var HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_3_3_3_6 = {
    register: function()
    {
        return ['form'];

    },

    process: function(element, top)
    {
        HTMLCS.addMessage(HTMLCS.NOTICE, element, 'Check that submissions to this form are either reversible, checked for input errors, and/or confirmed by the user.', 'G98,G99,G155,G164,G168.AllForms');
    }
};
