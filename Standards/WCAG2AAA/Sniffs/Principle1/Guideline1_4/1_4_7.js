var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_7 = {
    _labelNames: null,

    register: function()
    {
        return ['_top'];

    },

    process: function(element, top)
    {
        // Check for elements that could potentially contain audio.
        var mediaObj = top.querySelector('object, embed, applet, bgsound, audio, video');

        if (mediaObj !== null) {
            HTMLCS.addMessage(HTMLCS.NOTICE, top, 'For pre-recorded audio-only content that is primarily speech (such as narration), any background sounds should be muteable, or be at least 20 dB (or about 4 times) quieter than the speech.', 'G56');
        }

    }
};
