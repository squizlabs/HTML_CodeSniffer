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

var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_1_2_1_1 = {
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
        // Testing for elements that have explicit attributes for mouse-specific
        // events. Note: onclick is considered keyboard accessible, as it is actually
        // tied to the default action of a link or button - not merely a click.
        if (element === top) {
            var dblClickEls = top.querySelectorAll('*[ondblclick]');
            for (var i = 0; i < dblClickEls.length; i++) {
                HTMLCS.addMessage(HTMLCS.WARNING, dblClickEls[i], 'Ensure the functionality provided by double-clicking on this element is available through the keyboard.', 'SCR20.DblClick');
            }

            var mouseOverEls = top.querySelectorAll('*[onmouseover]');
            for (var i = 0; i < mouseOverEls.length; i++) {
                HTMLCS.addMessage(HTMLCS.WARNING, mouseOverEls[i], 'Ensure the functionality provided by mousing over this element is available through the keyboard; for instance, using the focus event.', 'SCR20.MouseOver');
            }

            var mouseOutEls = top.querySelectorAll('*[onmouseout]');
            for (var i = 0; i < mouseOutEls.length; i++) {
                HTMLCS.addMessage(HTMLCS.WARNING, mouseOutEls[i], 'Ensure the functionality provided by mousing out of this element is available through the keyboard; for instance, using the blur event.', 'SCR20.MouseOut');
            }

            var mouseMoveEls = top.querySelectorAll('*[onmousemove]');
            for (var i = 0; i < mouseMoveEls.length; i++) {
                HTMLCS.addMessage(HTMLCS.WARNING, mouseMoveEls[i], 'Ensure the functionality provided by moving the mouse on this element is available through the keyboard.', 'SCR20.MouseMove');
            }

            var mouseDownEls = top.querySelectorAll('*[onmousedown]');
            for (var i = 0; i < mouseDownEls.length; i++) {
                HTMLCS.addMessage(HTMLCS.WARNING, mouseDownEls[i], 'Ensure the functionality provided by mousing down on this element is available through the keyboard; for instance, using the keydown event.', 'SCR20.MouseDown');
            }

            var mouseUpEls = top.querySelectorAll('*[onmouseup]');
            for (var i = 0; i < mouseUpEls.length; i++) {
                HTMLCS.addMessage(HTMLCS.WARNING, mouseUpEls[i], 'Ensure the functionality provided by mousing up on this element is available through the keyboard; for instance, using the keyup event.', 'SCR20.MouseUp');
            }
        }

    }
};
