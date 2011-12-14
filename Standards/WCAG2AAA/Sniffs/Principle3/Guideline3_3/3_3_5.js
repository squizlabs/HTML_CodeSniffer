var HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_3_3_3_5 = {
    register: function()
    {
        return ['form'];

    },

    process: function(element, top)
    {
        HTMLCS.addMessage(HTMLCS.NOTICE, element, 'Check that context-sensitive help is available for this form, at a Web-page and/or control level.', 'G71,G184,G193');
    }
};
