var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guidline1_1_1_1_1 = {
    register: function()
    {
        return ['img'];

    },

    process: function(element)
    {
        if (element.hasAttribute('alt') === false) {
            // Img tags must have an alt attribute.
            HTMLCS.addMessage(HTMLCS.ERROR, element, 'When using the img element, specify a short text alternative with the alt attribute.', 'H37');
        } else if (!element.getAttribute('alt') || /^\s*$/.test(element.getAttribute('alt')) === true) {
            if (element.hasAttribute('title') === true) {
                HTMLCS.addMessage(HTMLCS.ERROR, element, 'Img element with empty alt text must have absent or empty title attribute.', 'H67.1');
            } else {
                // Img tags cannot have an empty alt attribute.
                HTMLCS.addMessage(HTMLCS.WARNING, element, 'Img element is marked so that it is ignored by Assistive Technology.', 'H67.2');
            }
        }

    }
};
