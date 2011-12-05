var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_1_2_1_2 = {
    register: function()
    {
        return [
            'object',
            'applet',
            'embed'
        ];

    },

    process: function(element)
    {
        HTMLCS.addMessage(HTMLCS.WARNING, element, 'Check that this applet or plugin provides the ability to move the focus away from itself when using the keyboard.', 'F10');

    }
};
