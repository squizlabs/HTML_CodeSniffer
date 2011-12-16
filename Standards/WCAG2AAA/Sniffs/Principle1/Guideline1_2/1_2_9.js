var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_2_1_2_9 = {
    register: function()
    {
        return ['_top'];

    },

    process: function(element, top)
    {
        // Check for elements that could potentially contain audio.
        var mediaObjs = top.querySelectorAll('object, embed, applet, bgsound, audio');

        for (var i = 0; i < mediaObjs.length; i++) {
            HTMLCS.addMessage(HTMLCS.NOTICE, mediaObjs[i], 'If this embedded object contains live audio-only content, check that an alternative text version of the content is provided.', 'G150,G151,G157');
        }

    }
};
