var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_3_1_3_3 = {
    register: function()
    {
        return ['_top'];

    },

    process: function(element, top)
    {
        HTMLCS.addMessage(HTMLCS.NOTICE, top, 'Where instructions are provided for understanding the content, do not rely on sensory characteristics alone (such as shape, size or location) to describe objects.', 'G96');

    }
};
