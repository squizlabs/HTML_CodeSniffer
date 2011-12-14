var HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_3_3_3_3 = {
    register: function()
    {
        return ['form'];

    },

    process: function(element, top)
    {
        // Only G177 (about providing suggestions) is flagged as a technique.
        // The techniques in 3.3.1 are also listed in this Success Criterion.
        HTMLCS.addMessage(HTMLCS.NOTICE, element, 'Check that this form provides suggested corrections to errors in user input, unless it would jeopardize the security or purpose of the content.', 'G177');
    }
};
