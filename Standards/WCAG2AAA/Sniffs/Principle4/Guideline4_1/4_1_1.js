var HTMLCS_WCAG2AAA_Sniffs_Principle4_Guideline4_1_4_1_1 = {
    register: function()
    {
        return [
            '_top',
        ];

    },

    process: function(element, top)
    {
        if (element === top) {
            var elsWithIds = top.querySelectorAll('*[id]');
            var usedIds    = {};
            
            for (var i = 0; i < elsWithIds.length; i++) {
                var id = elsWithIds[i].getAttribute('id');
                if (usedIds[id] !== undefined) {
                    // F77 = "Failure of SC 4.1.1 due to duplicate values of type ID".
                    // Appropriate technique in HTML is H93.
                    HTMLCS.addMessage(HTMLCS.ERROR, elsWithIds[i], 'Check that all id attribute values are unique on the web page.', 'F77'); 
                } else {
                    usedIds[id] = true;
                }
            }
        }
    },
};
