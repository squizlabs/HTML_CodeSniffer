var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_2_2_2_3 = {
    register: function()
    {
        return ['_top'];

    },

    process: function(element, top)
    {
        HTMLCS.addMessage(HTMLCS.NOTICE, element, 'Check that timing is not an essential part of the event or activity presented by the content, except for non-interactive synchronized media and real-time events.', 'G5');

    }
};
