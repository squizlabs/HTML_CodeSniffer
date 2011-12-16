var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_2 = {
    register: function()
    {
        return ['html'];

    },

    process: function(element)
    {
        // Find a head first.
        var children = element.childNodes;
        var head     = null;

        for (var i = 0; i < children.length; i++) {
            if (children[i].nodeName.toLowerCase() === 'head') {
                head = children[i];
                break;
            }
        }

        if (head === null) {
            HTMLCS.addMessage(HTMLCS.ERROR, element, 'There is no head section in which to place a descriptive title element.', 'H25.1');
        } else {
            var children = head.childNodes;
            var title    = null;

            for (var i = 0; i < children.length; i++) {
                if (children[i].nodeName.toLowerCase() === 'title') {
                    title = children[i];
                    break;
                }
            }

            if (title === null) {
                HTMLCS.addMessage(HTMLCS.ERROR, head, 'A title should be provided for the document, using a non-empty title element in the head section.', 'H25.1');
            } else {
                if (/^\s*$/.test(title.innerHTML) === true) {
                    HTMLCS.addMessage(HTMLCS.ERROR, title, 'The title element in the head section should be non-empty.', 'H25.1');
                } else {
                    HTMLCS.addMessage(HTMLCS.NOTICE, title, 'Check that the title element describes the document.', 'H25.2');
                }
            }//end if
        }//end if

    }
};
