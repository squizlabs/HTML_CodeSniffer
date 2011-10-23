var HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_1_3_1_1 = {
    register: function()
    {
        return ['html'];

    },

    process: function(element)
    {
        if ((element.hasAttribute('lang') === false) && (element.hasAttribute('xml:lang') === false)) {
            // TODO: if we can tell whether it's HTML or XHTML, we should split this
            // into two - one asking for "lang", the other for "xml:lang".
            HTMLCS.addMessage(HTMLCS.ERROR, element, 'The html element should have a lang or xml:lang attribute which describes the language of the document.', 'H57.2');
        }

    }
};
