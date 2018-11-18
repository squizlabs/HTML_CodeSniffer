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

_global.HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_2_3_2_2 = {
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
        return ['form'];

    },

    /**
     * Process the registered element.
     *
     * @param {DOMNode} element The element registered.
     * @param {DOMNode} top     The top element of the tested code.
     */
    process: function(element, top)
    {
        var nodeName = element.nodeName.toLowerCase();

        if (nodeName === 'form') {
            this.checkFormSubmitButton(element);
        }
    },

    /**
     * Test for forms that don't have a submit button of some sort (technique H32).
     *
     * @param {DOMNode} form The form to test.
     */
    checkFormSubmitButton: function(form)
    {
        var ok = false;

        // Test for INPUT-based submit buttons. The type must be specified, as
        // the default for INPUT is text.
        var inputButtons = form.querySelectorAll('input[type=submit], input[type=image]');
        if (inputButtons.length > 0) {
            ok = true;
        } else {
            // Check for BUTTONs that aren't reset buttons, or normal buttons.
            // If they're blank or invalid, they are submit buttons.
            var buttonButtons    = form.querySelectorAll('button');
            var nonSubmitButtons = form.querySelectorAll('button[type=reset], button[type=button]');
            if (buttonButtons.length > nonSubmitButtons.length) {
                ok = true;
            }
        }//end if

        if (ok === false) {
            // Look for buttons with form attributes, outside of the form.
            if (form.id) {
                var externalButtons = document.querySelectorAll('button[form], input[form][type=submit], input[form][type=image]');
                Array.prototype.slice.call(externalButtons).forEach(
                    function(el) {
                        // Check they aren't reset buttons, or normal buttons.
                        switch (el.getAttribute('type')) {
                        case 'reset':
                        case 'button':
                            return;
                        }

                        // Confirm they are associated with the form.
                        if (el.attributes['form'].value === form.id) {
                            ok = true;
                        }
                    }
                );
            }
        }

        if (ok === false) {
            HTMLCS.addMessage(
                HTMLCS.ERROR,
                form,
                _global.HTMLCS.getTranslation("3_2_2_H32.2"),
                'H32.2'
            );
        }
    }
};
