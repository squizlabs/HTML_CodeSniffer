var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_2_1_2_4 = {
    register: function()
    {
        return ['_top'];

    },

    process: function(element, top)
    {
        // Check for elements that could potentially contain video.
        var mediaObjs = top.querySelectorAll('object, embed, applet, video');

        for (var i = 0; i < mediaObjs.length; i++) {
            HTMLCS.addMessage(HTMLCS.NOTICE, mediaObjs[i], 'If this embedded object contains synchronised media, check that captions are provided for live audio content.', 'G9,G87,G93');
        }

    }
};
