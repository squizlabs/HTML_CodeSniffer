var HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_3_3_3_2 = {
    register: function()
    {
        return ['form'];

    },

    process: function(element, top)
    {
        // Only the generic message will be displayed here. If there were problems
        // with input boxes not having labels, it will be pulled up as errors in
        // other Success Criteria (eg. 1.3.1, 4.1.2).
        HTMLCS.addMessage(HTMLCS.NOTICE, element, 'Check that descriptive labels or instructions (including for required fields) are provided for user input in this form.', 'G131,G89,G184,H90');
    }
};
