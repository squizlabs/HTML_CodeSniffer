var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_8 = {
    register: function()
    {
        return ['link'];

    },

    process: function(element)
    {
        var linkParentName = element.parentNode.nodeName.toLowerCase();
        var correctLoc     = false;
        
        // Check for the correct location. HTML4 states "it may only appear in the
        // HEAD element". HTML5 states it appears "wherever metadata content is
        // expected", which only includes the head element.
        if (linkParentName === 'head') {
            correctLoc = true;
        } else if (linkParentName === 'noscript') {
            // In HTML5, link elements are also explicitly allowed to be in a
            // "head > noscript > link" structure.
            var grandParentName = element.parentNode.parentNode.nodeName.toLowerCase();
            if (grandParentName === 'head') {
                correctLoc = true;
            }
        }
            
        if (correctLoc === false) {
            HTMLCS.addMessage(HTMLCS.ERROR, element, 'Check that all link elements pertaining to navigation occur in the head section of the document.', 'H59.1');
        }
        
        // Check for mandatory elements.
        if ((element.hasAttribute('rel') === false) || (!element.getAttribute('rel')) || (/^\s*$/.test(element.getAttribute('rel')) === true)) {
            HTMLCS.addMessage(HTMLCS.ERROR, element, 'Check that this link element contains a rel attribute identifying the link type.', 'H59.2a');
        }
        
        if ((element.hasAttribute('href') === false) || (!element.getAttribute('href')) || (/^\s*$/.test(element.getAttribute('href')) === true)) {
            HTMLCS.addMessage(HTMLCS.ERROR, element, 'Check that this link element contains a valid href attribute to locate the appropriate resource being linked.', 'H59.2b');
        }
    }
};
