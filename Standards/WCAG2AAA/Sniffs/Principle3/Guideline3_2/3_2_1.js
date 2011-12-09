var HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_2_3_2_1 = {
    register: function()
    {
        return ['_top'];

    },

    process: function(element, top)
    {
        // Fire this notice if there appears to be an input field on the page.
        // We don't check for an onfocus attribute, because they could be set in
        // javascript and we could miss them.
        var inputField = top.querySelector('input, textarea, button, select');

        if (inputField !== null) {
            HTMLCS.addMessage(HTMLCS.NOTICE, top, 'Check that a change of context does not occur when any input field receives focus.', 'G107');
        }

    }
};
