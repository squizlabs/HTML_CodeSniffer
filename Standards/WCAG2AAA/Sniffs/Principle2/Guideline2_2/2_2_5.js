var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_2_2_2_5 = {
    register: function()
    {
        return ['_top'];

    },

    process: function(element, top)
    {
        HTMLCS.addMessage(HTMLCS.NOTICE, element, 'If this Web page is part of a set of Web pages with an inactivity time limit, check that an authenticated user can continue the activity without loss of data after re-authenticating..', 'G105,G181');

    }
};
