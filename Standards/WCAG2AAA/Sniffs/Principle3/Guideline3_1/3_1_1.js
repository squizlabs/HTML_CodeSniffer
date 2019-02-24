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

_global.HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_1_3_1_1 = {
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
        if ((element.hasAttribute('lang') === false) && (element.hasAttribute('xml:lang') === false)) {
            // TODO: if we can tell whether it's HTML or XHTML, we should split this
            // into two - one asking for "lang", the other for "xml:lang".
            HTMLCS.addMessage(HTMLCS.ERROR, element, _global.HTMLCS.getTranslation("3_1_1_H57.2"), 'H57.2');
        } else {
            if (element.hasAttribute('lang') === true) {
                var lang = element.getAttribute('lang');
                if (this.isValidLanguageTag(lang) === false) {
                    HTMLCS.addMessage(HTMLCS.ERROR, top, _global.HTMLCS.getTranslation("3_1_1_H57.3.Lang"), 'H57.3.Lang');
                }
            }

            if (element.hasAttribute('xml:lang') === true) {
                var lang = element.getAttribute('xml:lang');
                if (this.isValidLanguageTag(lang) === false) {
                    HTMLCS.addMessage(HTMLCS.ERROR, top, _global.HTMLCS.getTranslation("3_1_1_H57.3.XmlLang"), 'H57.3.XmlLang');
                }
            }
        }

    },


    /**
     * Test for well-formed language tag as per IETF BCP 47.
     *
     * Note that this checks only for well-formedness, not whether the subtags are
     * actually on the registered subtags list.
     *
     * @param {String} langTag The language tag to test.
     *
     * @returns {Boolean} the result of the regex test.
     */
    isValidLanguageTag: function(langTag)
    {
        // Allow irregular or private-use tags starting with 'i' or 'x'.
        // Values after it are 1-8 alphanumeric characters.
        var regexStr = '^([ix](-[a-z0-9]{1,8})+)$|';

        // Core language tags - 2 to 8 letters
        regexStr += '^[a-z]{2,8}';

        // Extlang subtags - three letters, repeated 0 to 3 times
        regexStr += '(-[a-z]{3}){0,3}';

        // Script subtag - four letters, optional.
        regexStr += '(-[a-z]{4})?';

        // Region subtag - two letters for a country or a three-digit region; optional.
        regexStr += '(-[a-z]{2}|-[0-9]{3})?';

        // Variant subtag - either digit + 3 alphanumeric, or
        // 5-8 alphanumeric where it doesn't start with a digit; optional
        // but repeatable.
        regexStr += '(-[0-9][a-z0-9]{3}|-[a-z0-9]{5,8})*';

        // Extension subtag - one single alphanumeric character (but not "x"),
        // followed by at least one value of 2-8 alphanumeric characters.
        // The whole thing is optional but repeatable (for different extensions).
        regexStr += '(-[a-wy-z0-9](-[a-z0-9]{2,8})+)*';

        // Private use subtag, starting with an "x" and containing at least one
        // value of 1-8 alphanumeric characters. It must come last.
        regexStr += '(-x(-[a-z0-9]{1,8})+)?$';

        // Make a regex out of it, and make it all case-insensitive.
        var regex = new RegExp(regexStr, 'i');

        // Throw the correct lang code depending on whether this is a document
        // element or not.
        var valid = true;
        if (regex.test(langTag) === false) {
            valid = false;
        }

        return valid;
    }
};
