var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_2 = {
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
            HTMLCS.addMessage(HTMLCS.NOTICE, top, 'If any audio plays automatically for longer than 3 seconds, check that there is the ability to pause, stop or mute the audio.', 'F23');
        }

    }
};
