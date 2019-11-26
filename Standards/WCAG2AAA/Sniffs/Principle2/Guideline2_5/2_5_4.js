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

_global.HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_5_2_5_4 = {
    /**
   * Determines the elements to register for processing.
   *
   * Each element of the returned array can either be an element name, or "_top"
   * which is the top element of the tested code.
   *
   * @returns {Array} The list of elements.
   */
    register: function() {
        return ["_top"];
    },

    /**
   * Process the registered element.
   *
   * @param {DOMNode} element The element registered.
   * @param {DOMNode} top     The top element of the tested code.
   */
    process: function(element, top) {
        HTMLCS.addMessage(
            HTMLCS.NOTICE,
            top,
            _global.HTMLCS.getTranslation("2_5_4.Check"),
            ""
        );

        if (element == top) {
            var all = HTMLCS.util.getAllElements(element, "*[ondevicemotion]");
            for (var i = 0; i < all.length; i++) {
                var x = all[i];
                HTMLCS.addMessage(
                    HTMLCS.WARNING,
                    x,
                    _global.HTMLCS.getTranslation("2_5_4.Devicemotion"),
                    ""
                );
            }
        }
    }
};
