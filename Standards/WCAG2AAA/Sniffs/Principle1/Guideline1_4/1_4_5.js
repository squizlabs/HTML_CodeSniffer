var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_5 = {
    register: function()
    {
        return ['_top'];

    },

    process: function(element, top)
    {
        var imgObj = top.querySelector('img');

        if (imgObj !== null) {
            HTMLCS.addMessage(HTMLCS.NOTICE, top, 'If the technologies being used can achieve the visual presentation, check that text is used to convey information rather than images of text, except when the image of text is essential to the information being conveyed, or can be visually customised to the user\'s requirements.', 'G140,C22,C30');
        }

    }
};
