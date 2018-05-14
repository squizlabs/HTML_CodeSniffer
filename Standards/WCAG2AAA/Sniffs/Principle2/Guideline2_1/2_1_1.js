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

_global.HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_1_2_1_1 = {
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

            // Cannot detect event listeners here so only onclick attributes are checked.
            var keyboardTriggers = HTMLCS.util.getAllElements(top, '*[onclick], *[onkeyup], *[onkeydown], *[onkeypress], *[onfocus], *[onblur]');
            keyboardTriggers.forEach(function(elem) {
                if (HTMLCS.util.isKeyboardNavigable(elem) === false) {
                    HTMLCS.addMessage(
                        HTMLCS.WARNING,
                        elem,
                        _global.HTMLCS.getTranslation("2_1_1_G90"),
                        'G90'
                    );
                }
            });

            var dblClickEls = HTMLCS.util.getAllElements(top, '*[ondblclick]');
            for (var i = 0; i < dblClickEls.length; i++) {
                HTMLCS.addMessage(HTMLCS.WARNING, dblClickEls[i], _global.HTMLCS.getTranslation("2_1_1_SCR20.DblClick"), 'SCR20.DblClick');
            }

            var mouseOverEls = HTMLCS.util.getAllElements(top, '*[onmouseover]');
            for (var i = 0; i < mouseOverEls.length; i++) {
                HTMLCS.addMessage(HTMLCS.WARNING, mouseOverEls[i], _global.HTMLCS.getTranslation("2_1_1_SCR20.MouseOver"), 'SCR20.MouseOver');
            }

            var mouseOutEls = HTMLCS.util.getAllElements(top, '*[onmouseout]');
            for (var i = 0; i < mouseOutEls.length; i++) {
                HTMLCS.addMessage(HTMLCS.WARNING, mouseOutEls[i],  _global.HTMLCS.getTranslation("2_1_1_SCR20.MouseOut"), 'SCR20.MouseOut');
            }

            var mouseMoveEls = HTMLCS.util.getAllElements(top, '*[onmousemove]');
            for (var i = 0; i < mouseMoveEls.length; i++) {
                HTMLCS.addMessage(HTMLCS.WARNING, mouseMoveEls[i], _global.HTMLCS.getTranslation("2_1_1_SCR20.MouseMove"), 'SCR20.MouseMove');
            }

            var mouseDownEls = HTMLCS.util.getAllElements(top, '*[onmousedown]');
            for (var i = 0; i < mouseDownEls.length; i++) {
                HTMLCS.addMessage(HTMLCS.WARNING, mouseDownEls[i], _global.HTMLCS.getTranslation("2_1_1_SCR20.MouseDown"), 'SCR20.MouseDown');
            }

            var mouseUpEls = HTMLCS.util.getAllElements(top, '*[onmouseup]');
            for (var i = 0; i < mouseUpEls.length; i++) {
                HTMLCS.addMessage(HTMLCS.WARNING, mouseUpEls[i], _global.HTMLCS.getTranslation("2_1_1_SCR20.MouseUp"), 'SCR20.MouseUp');
            }
        }

    }
};
