var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_2_1_2_5 = {
    register: function()
    {
        return ['_top'];

    },

    process: function(element, top)
    {
        // Check for elements that could potentially contain video.
        var mediaObjs = top.querySelectorAll('object, embed, applet, video');

        for (var i = 0; i < mediaObjs.length; i++) {
            HTMLCS.addMessage(HTMLCS.NOTICE, mediaObjs[i], 'If this embedded object contains pre-recorded synchronised media, check that an audio description is provided for its video content.', 'G78,G173,G8');
        }

    }
};
