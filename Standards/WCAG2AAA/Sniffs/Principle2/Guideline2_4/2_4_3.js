var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_3 = {
    register: function()
    {
        return ['_top'];

    },

    process: function(element, top)
    {
        if (element === top) {
            var tabIndexExists = top.querySelector('*[tabindex]');

            if (tabIndexExists) {
                HTMLCS.addMessage(HTMLCS.NOTICE, element, 'If tabindex is used, check that the tab order specified by the tabindex attributes follows relationships in the content.', 'H4.2');
            }
        }
    }
};
