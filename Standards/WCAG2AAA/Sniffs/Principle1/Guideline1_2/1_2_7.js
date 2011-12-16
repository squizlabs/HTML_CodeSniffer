var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_2_1_2_7 = {
    register: function()
    {
        return ['_top'];

    },

    process: function(element, top)
    {
        // Check for elements that could potentially contain video.
        var mediaObjs = top.querySelectorAll('object, embed, applet, video');

        for (var i = 0; i < mediaObjs.length; i++) {
            HTMLCS.addMessage(HTMLCS.NOTICE, mediaObjs[i], 'If this embedded object contains synchronised media, and where pauses in foreground audio is not sufficient to allow audio descriptions to convey the sense of pre-recorded video, check that an extended audio description is provided, either through scripting or an alternate version.', 'G8');
        }

    }
};
