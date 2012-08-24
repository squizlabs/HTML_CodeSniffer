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

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_6 = {
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
            var failures = HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_3_Contrast.testContrastRatio(top, 7.0, 4.5);

            for (var i = 0; i < failures.length; i++) {
                var element   = failures[i].element;
                var value     = (Math.round(failures[i].value * 100) / 100);
                var required  = failures[i].required;
                var recommend = failures[i].recommendation;
                var hasBgImg  = failures[i].hasBgImage || false;

                if (required === 4.5) {
                    var code = 'G18';
                } else if (required === 7.0) {
                    var code = 'G17';
                }

                var recommendText = [];
                if (recommend) {
                    if (recommend.fore.from !== recommend.fore.to) {
                        recommendText.push('text colour to ' + recommend.fore.to);
                    }
                    if (recommend.back.from !== recommend.back.to) {
                        recommendText.push('background to ' + recommend.back.to);
                    }
                }//end if

                if (recommendText.length > 0) {
                    recommendText = ' Recommendation: change ' + recommendText.join(', ') + '.';
                }

                if (hasBgImg === true) {
                    code += '.BgImage';
                    HTMLCS.addMessage(HTMLCS.WARNING, element, 'This element\'s text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least ' + required + ':1.', code);
                } else {
                    code += '.Fail';
                    HTMLCS.addMessage(HTMLCS.ERROR, element, 'This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least ' + required + ':1, but text in this element has a contrast ratio of ' + value + ':1.' + recommendText, code);
                }//end if
            }//end for
        }//end if
    }
};
