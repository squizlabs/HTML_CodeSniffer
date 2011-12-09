var HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_1_3_1_6 = {
    register: function()
    {
        return ['ruby'];

    },

    process: function(element)
    {
        var rb = element.querySelectorAll('rb');
        var rt = element.querySelectorAll('rt');
        if (rt.length === 0) {
            // Vary the message depending on whether an rb element exists. If it doesn't,
            // the presumption is that we are using HTML5 that uses the body of the ruby
            // element for the same purpose (otherwise, assume XHTML 1.1 with rb element).
            if (rb.length === 0) {
                HTMLCS.addMessage(HTMLCS.ERROR, top, 'Check that a rt element contains pronunciation information for each run of text defined by the body of the ruby element.', 'H62.1');
            } else {
                HTMLCS.addMessage(HTMLCS.ERROR, top, 'Check that a rt element contains pronunciation information for each run of text defined by the rb element.', 'H62.1');
            }
        }

        var rp = element.querySelectorAll('rp');
        if (rp.length === 0) {
            // No "ruby parentheses" tags for those user agents that don't support
            // ruby at all.
            HTMLCS.addMessage(HTMLCS.ERROR, top, 'If simple Ruby markup is used, check that the rp element is present to indicate to user agents that do not support Ruby annotations that the text in the rt element provides the pronunciation information.', 'H62.2');
        }
    }
};
