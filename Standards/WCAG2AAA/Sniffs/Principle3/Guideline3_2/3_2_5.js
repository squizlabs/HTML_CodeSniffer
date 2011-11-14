var HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_2_3_2_5 = {
    register: function()
    {
        return ['a'];

    },

    process: function(element, top)
    {
        var nodeName = element.nodeName.toLowerCase();

        if (nodeName === 'a') {
            this.checkNewWindowTarget(element);
        }
    },

    checkNewWindowTarget: function(link)
    {
        var hasTarget = link.hasAttribute('target');

        if (hasTarget === true) {
            var target = link.getAttribute('target') || '';
            if ((target === '_blank') && (/new window/i.test(link.innerHTML) === false)) {
                HTMLCS.addMessage(HTMLCS.WARNING, link, 'Check that this link\'s link text contains information indicating that the link will open in a new window.', 'H83.3');
            }
        }
    }
};
