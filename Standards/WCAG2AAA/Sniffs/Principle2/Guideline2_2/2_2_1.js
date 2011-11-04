var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_2_2_2_1 = {
    register: function()
    {
        return ['meta'];

    },

    process: function(element)
    {
        // Meta refresh testing under H76. Fails if a non-zero timeout is provided.
        // NOTE: this technique lists only 3.2.5, however the related failure -
        // F41 - also lists 2.2.1 (as meta refresh times are not adjustable).
        // Hence this is important at A level and not just AAA.
        if (element.hasAttribute('http-equiv') === true) {
            if ((String(element.getAttribute('http-equiv'))).toLowerCase() === 'refresh')) {
                if (/^[1-9]\d*;\s+url=/.test(element.getAttribute('content').toLowerCase()) === false) {
                    HTMLCS.addMessage(HTMLCS.ERROR, element, 'When using a client-side redirect using meta refresh, the time-out must be zero.', 'H76.2');
                }
            }//end if
        }//end if

    }
};
