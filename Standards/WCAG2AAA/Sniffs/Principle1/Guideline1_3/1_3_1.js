var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_3_1_3_1 = {
    register: function()
    {
        return [
            'p',
            'div',
            'b',
            'i',
            'u',
            's'
        ];

    },

    process: function(element)
    {
        this.checkPresentationMarkup(element);
        this.checkNonSemanticHeading(element);
    },

    checkPresentationMarkup: function(element)
    {
        // Presentation tags that should have no place in modern HTML.
        var tag = element.nodeName.toLowerCase();
        if (/^(b|i|u|s)$/.test(tag) === true) {
            HTMLCS.addMessage(HTMLCS.ERROR, element, 'Semantic markup should be used to mark emphasised or special text so that it can be programmatically determined.', 'H49');
        }
    },

    checkNonSemanticHeading: function(element)
    {
        // Test for P|DIV > STRONG|EM|other inline styling, when said inline
        // styling tag is the only element in the tag. It could possibly a header
        // that should be using h1..h6 tags instead.
        var tag = element.nodeName.toLowerCase();
        if (tag === 'p' || tag === 'div') {
            var children = element.childNodes;
            if ((children.length === 1) && (children[0].nodeType === Node.ELEMENT_NODE)) {
                var childTag = children[0].nodeName.toLowerCase();

                if (/^(strong|em|b|i)$/.test(childTag) === true) {
                    HTMLCS.addMessage(HTMLCS.WARNING, element, 'Heading markup should be used if this content is intended as a heading.', 'H42');
                }
            }
        }
    },
};
