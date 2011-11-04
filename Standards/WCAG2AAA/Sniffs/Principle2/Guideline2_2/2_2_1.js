var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_2_2_2_1 = {
    register: function()
    {
        return ['meta'];

    },

    process: function(element)
    {
        // Meta refresh testing under H76/F41. Fails if a non-zero timeout is provided.
        // NOTE: H76 only lists criterion 3.2.5, but F41 also covers refreshes to
        // same page (no URL content), which is covered by non-adjustable timeouts
        // in criterion 2.2.1.
        if (element.hasAttribute('http-equiv') === true) {
            if ((String(element.getAttribute('http-equiv'))).toLowerCase() === 'refresh')) {
                if (/^[1-9]\d*/.test(element.getAttribute('content').toLowerCase()) === false) {
                    HTMLCS.addMessage(HTMLCS.ERROR, element, 'When using meta refresh to periodically refresh pages or cause a client-side redirect, the time-out must be zero.', 'F41.2');
                }
            }//end if
        }//end if

    }
};
