var HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_2_3_2_3 = {
    register: function()
    {
        return ['_top'];

    },

    process: function(element, top)
    {
        HTMLCS.addMessage(HTMLCS.NOTICE, top, 'Check that navigational mechanisms that are repeated on multiple Web pages occur in the same relative order each time they are repeated, unless a change is initiated by the user.', 'G61');

    }
};
