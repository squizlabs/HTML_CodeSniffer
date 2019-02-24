/**
 * +--------------------------------------------------------------------+
 * | This HTML_CodeSniffer file is Copyright (c)                        |
 * | Squiz Pty Ltd (ABN 77 084 670 600)                                 |
 * +--------------------------------------------------------------------+
 * | IMPORTANT: Your use of this Software is subject to the terms of    |
 * | the Licence provided in the file licence.txt. If you cannot find   |
 * | this file please contact Squiz (www.squiz.com.au) so we may        |
 * | provide you a copy.                                                |
 * +--------------------------------------------------------------------+
 *
 */

_global.HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_2 = {
    /**
     * Determines the elements to register for processing.
     *
     * Each element of the returned array can either be an element name, or "_top"
     * which is the top element of the tested code.
     *
     * @returns {Array} The list of elements.
     */
    register: function()
    {
        return ['html'];

    },

    /**
     * Process the registered element.
     *
     * @param {DOMNode} element The element registered.
     * @param {DOMNode} top     The top element of the tested code.
     */
    process: function(element, top)
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
            HTMLCS.addMessage(HTMLCS.ERROR, element,  _global.HTMLCS.getTranslation("2_4_2_H25.1.NoHeadEl"), 'H25.1.NoHeadEl');
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
                HTMLCS.addMessage(HTMLCS.ERROR, head, _global.HTMLCS.getTranslation("2_4_2_H25.1.NoTitleEl"), 'H25.1.NoTitleEl');
            } else {
                if (/^\s*$/.test(title.innerHTML) === true) {
                    HTMLCS.addMessage(HTMLCS.ERROR, title,  _global.HTMLCS.getTranslation("2_4_2_H25.1.EmptyTitle"), 'H25.1.EmptyTitle');
                } else {
                    HTMLCS.addMessage(HTMLCS.NOTICE, title,  _global.HTMLCS.getTranslation("2_4_2_H25.2"), 'H25.2');
                }
            }//end if
        }//end if

    }
};
