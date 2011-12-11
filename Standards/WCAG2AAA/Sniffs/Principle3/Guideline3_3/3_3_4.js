var HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_3_3_3_4 = {
    register: function()
    {
        return ['form'];

    },

    process: function(element, top)
    {
        HTMLCS.addMessage(HTMLCS.NOTICE, element, 'If this form would bind a user to a financial or legal commitment, modify/delete user-controllable data, or submit test responses, ensure that submissions are either reversible, checked for input errors, and/or confirmed by the user.', 'G98,G99,G155,G164,G168');
    }
};
