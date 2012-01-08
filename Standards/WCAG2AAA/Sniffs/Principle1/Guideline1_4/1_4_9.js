var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_9 = {
    register: function()
    {
        return ['_top'];

    },

    process: function(element, top)
    {
        var imgObj = top.querySelector('img');

        if (imgObj !== null) {
            HTMLCS.addMessage(HTMLCS.NOTICE, top, 'Check that images of text are only used for pure decoration or where a particular presentation of text is essential to the information being conveyed.', 'G140,C22,C30.NoException');
        }
    }
};
