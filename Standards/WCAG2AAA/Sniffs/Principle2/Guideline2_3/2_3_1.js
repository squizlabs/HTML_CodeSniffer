var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_3_2_3_1 = {
    _labelNames: null,

    register: function()
    {
        return ['_top'];

    },

    process: function(element, top)
    {
        // The "small" flashing area is deliberately vague - users should see
        // technique G176 for more details, as the threshold depends on both the
        // size and resolution of a screen.
        // The technique gives a baseline (based on a 15-17 inch monitor read at
        // 22-26 inches, at 1024 x 768 resolution). A 10-degree field of vision is
        // approximately 341 x 256 pixels in this environment, and a flashing area
        // needs to be no more than 25% of this (not necessarily rectangular).
        HTMLCS.addMessage(HTMLCS.NOTICE, top, 'Check that no component of the content does not flash more than three times in any 1-second period, or that the size of the flashing area is sufficiently small.', 'G19,G176');

    }
};
