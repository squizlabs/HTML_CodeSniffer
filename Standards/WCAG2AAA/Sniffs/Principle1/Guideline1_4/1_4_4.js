var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_4 = {
    register: function()
    {
        return ['_top'];

    },

    process: function(element, top)
    {
        HTMLCS.addMessage(HTMLCS.NOTICE, top, 'Check that text can be resized without assistive technology up to 200 percent without loss of content or functionality.', 'G142');

    }
};
