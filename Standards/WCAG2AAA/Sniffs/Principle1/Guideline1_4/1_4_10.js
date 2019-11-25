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

_global.HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_10 = {
    /**
   * Determines the elements to register for processing.
   *
   * Each element of the returned array can either be an element name, or "_top"
   * which is the top element of the tested code.
   *
   * @returns {Array} The list of elements.
   */
    register: function() {
        return ["_top", "pre", "meta"];
    },

    /**
   * Process the registered element.
   *
   * @param {DOMNode} element The element registered.
   * @param {DOMNode} top     The top element of the tested code.
   */
    process: function(element, top) {
        if (element === top) {
            HTMLCS.addMessage(
                HTMLCS.NOTICE,
                top,
                _global.HTMLCS.getTranslation("1_4_10_C32,C31,C33,C38,SCR34,G206.Check"),
                "C32,C31,C33,C38,SCR34,G206"
            );

            var all = HTMLCS.util.getAllElements(top, '*');
            for (var i = 0; i < all.length; i++) {
                var x = all[i];
                if (
                    window.getComputedStyle(x, null).getPropertyValue("position") ==
          "fixed"
                ) {
                    HTMLCS.addMessage(
                        HTMLCS.WARNING,
                        x,
                        _global.HTMLCS.getTranslation("1_4_10_C32,C31,C33,C38,SCR34,G206.Fixed"),
                        "C32,C31,C33,C38,SCR34,G206"
                    );
                }
            }
        } else {
            var nodeName = element.nodeName.toLowerCase();

            switch (nodeName) {
            case "pre":
                HTMLCS.addMessage(
                    HTMLCS.WARNING,
                    top,
                    _global.HTMLCS.getTranslation("1_4_10_C32,C31,C33,C38,SCR34,G206.Scrolling"),
                    "C32,C31,C33,C38,SCR34,G206"
                );
                break;
            case "meta":
                var content = element.getAttribute('content');
                var name = element.getAttribute('name');
                if (name === 'viewport' && !!content &&
                    (content.indexOf("maximum-scale") > -1 ||
                    content.indexOf("minimum-scale") > -1 ||
                    content.indexOf("user-scalable=no") > -1 ||
                    content.indexOf("user-scalable=0") > -1)
                ) {
                    HTMLCS.addMessage(
                        HTMLCS.WARNING,
                        element,
                        _global.HTMLCS.getTranslation("1_4_10_C32,C31,C33,C38,SCR34,G206.Zoom"),
                        "C32,C31,C33,C38,SCR34,G206"
                    );
                }
            }
        }
    }
};
