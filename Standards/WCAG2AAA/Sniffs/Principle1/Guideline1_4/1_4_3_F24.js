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

_global.HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_3_F24 = {
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
        // Test for background/foreground stuff.
        var elements = HTMLCS.util.getAllElements(top, '*');
        for (var i = 0; i < elements.length; i++) {
            this.testColourComboFail(elements[i]);
        }
    },

    /**
     * Tests for setting foreground without background, or vice versa (failure F24).
     *
     * It is a failure for a background colour to be set without a foreground colour,
     * or vice versa. A user agent style sheet could try and set both, and because
     * one is overridden, the result could be unreadable.
     *
     * This is being thrown as a warning, not an error. The failure allows the FG
     * and BG colours to be set further up the chain, as long as the content has both
     * foreground and background colours set by  the time.

     * Further, we can only test inline styles (either through attributes, CSS, or
     * JavaScript setting through eg. jQuery) because computed styles cause issues.
     * For instance, if no user style sheet is set, the default stylesheet (in
     * Firefox) at least is "transparent background/black text", and this would show
     * up in the computed style (and fail, since transparent is "not set"). The F24
     * description (by my reading) allows the colours to be set further up the chain,
     * as long as the content has -a- BG and -a- FG colour.
     *
     * @param Node element The element to test.
     */
    testColourComboFail: function(element)
    {
        var hasFg = element.hasAttribute('color');
        hasFg     = hasFg || element.hasAttribute('link');
        hasFg     = hasFg || element.hasAttribute('vlink');
        hasFg     = hasFg || element.hasAttribute('alink');
        var hasBg = element.hasAttribute('bgcolor');

        if (element.style) {
            var fgStyle = element.style.color;
            var bgStyle = element.style.background;

            if ((fgStyle !== '') && (fgStyle !== 'auto')) {
                hasFg = true;
            }

            if ((bgStyle !== '') && (bgStyle !== 'auto')) {
                hasBg = true;
            }
        }//end if

        if (hasBg !== hasFg) {
            if (hasBg === true) {
                HTMLCS.addMessage(HTMLCS.WARNING, element, _global.HTMLCS.getTranslation("1_4_3_F24.BGColour"), 'F24.BGColour');
            } else {
                HTMLCS.addMessage(HTMLCS.WARNING, element, _global.HTMLCS.getTranslation("1_4_3_F24.FGColour"), 'F24.FGColour');
            }
        }
    }
};
