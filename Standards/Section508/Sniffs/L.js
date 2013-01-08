/**
 * +--------------------------------------------------------------------+
 * | This HTML_CodeSniffer file is Copyright (c)                        |
 * | Squiz Australia Pty Ltd ABN 53 131 581 247                         |
 * +--------------------------------------------------------------------+
 * | IMPORTANT: Your use of this Software is subject to the terms of    |
 * | the Licence provided in the file licence.txt. If you cannot find   |
 * | this file please contact Squiz (www.squiz.com.au) so we may        |
 * | provide you a copy.                                                |
 * +--------------------------------------------------------------------+
 *
 */

var HTMLCS_Section508_Sniffs_L = {
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
        return ['_top'];

    },

    /**
     * Process the registered element.
     *
     * @param {DOMNode} element The element registered.
     * @param {DOMNode} top     The top element of the tested code.
     */
    process: function(element, top)
    {
        if (element === top) {
            this.addProcessLinksMessages(top);
            this.testKeyboard(top);
        }
    },

    addProcessLinksMessages: function(top)
    {
        var errors = HTMLCS_WCAG2AAA_Sniffs_Principle4_Guideline4_1_4_1_2.processLinks(top);
        for (var i = 0; i < errors.emptyNoId.length; i++) {
            HTMLCS.addMessage(HTMLCS.ERROR, errors.emptyNoId[i], 'Anchor element found with no link content and no name and/or ID attribute.', 'EmptyAnchorNoId');
        }

        for (var i = 0; i < errors.placeholder.length; i++) {
            HTMLCS.addMessage(HTMLCS.WARNING, errors.placeholder[i], 'Anchor element found with link content, but no href, ID, or name attribute has been supplied.', 'PlaceholderAnchor');
        }

        for (var i = 0; i < errors.noContent.length; i++) {
            HTMLCS.addMessage(HTMLCS.ERROR, errors.noContent[i], 'Anchor element found with a valid href attribute, but no link content has been supplied.', 'NoContentAnchor');
        }
    },

    /**
     * Process mouse-specific functions.
     *
     * @param {DOMNode} top The top element of the tested code.
     */
    testKeyboard: function(top)
    {
        // Testing for elements that have explicit attributes for mouse-specific
        // events. Note: onclick is considered keyboard accessible, as it is actually
        // tied to the default action of a link or button - not merely a click.
        var dblClickEls = top.querySelectorAll('*[ondblclick]');
        for (var i = 0; i < dblClickEls.length; i++) {
            HTMLCS.addMessage(HTMLCS.WARNING, dblClickEls[i], 'Ensure the functionality provided by double-clicking on this element is available through the keyboard.', 'DblClick');
        }

        var mouseOverEls = top.querySelectorAll('*[onmouseover]');
        for (var i = 0; i < mouseOverEls.length; i++) {
            HTMLCS.addMessage(HTMLCS.WARNING, mouseOverEls[i], 'Ensure the functionality provided by mousing over this element is available through the keyboard; for instance, using the focus event.', 'MouseOver');
        }

        var mouseOutEls = top.querySelectorAll('*[onmouseout]');
        for (var i = 0; i < mouseOutEls.length; i++) {
            HTMLCS.addMessage(HTMLCS.WARNING, mouseOutEls[i], 'Ensure the functionality provided by mousing out of this element is available through the keyboard; for instance, using the blur event.', 'MouseOut');
        }

        var mouseMoveEls = top.querySelectorAll('*[onmousemove]');
        for (var i = 0; i < mouseMoveEls.length; i++) {
            HTMLCS.addMessage(HTMLCS.WARNING, mouseMoveEls[i], 'Ensure the functionality provided by moving the mouse on this element is available through the keyboard.', 'MouseMove');
        }

        var mouseDownEls = top.querySelectorAll('*[onmousedown]');
        for (var i = 0; i < mouseDownEls.length; i++) {
            HTMLCS.addMessage(HTMLCS.WARNING, mouseDownEls[i], 'Ensure the functionality provided by mousing down on this element is available through the keyboard; for instance, using the keydown event.', 'MouseDown');
        }

        var mouseUpEls = top.querySelectorAll('*[onmouseup]');
        for (var i = 0; i < mouseUpEls.length; i++) {
            HTMLCS.addMessage(HTMLCS.WARNING, mouseUpEls[i], 'Ensure the functionality provided by mousing up on this element is available through the keyboard; for instance, using the keyup event.', 'MouseUp');
        }
    }

};
