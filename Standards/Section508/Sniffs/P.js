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

_global.HTMLCS_Section508_Sniffs_P = {
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
        return [
            '_top',
            'meta'
        ];

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
            HTMLCS.addMessage(HTMLCS.NOTICE, top, 'If a timed response is required on this page, alert the user and provide sufficient time to allow them to indicate that more time is required.', 'TimeLimit');
        } else {
            if (element.hasAttribute('http-equiv') === true) {
                if ((String(element.getAttribute('http-equiv'))).toLowerCase() === 'refresh') {
                    if (/^[1-9]\d*/.test(element.getAttribute('content').toLowerCase()) === true) {
                        if (/url=/.test(element.getAttribute('content').toLowerCase()) === true) {
                            // Redirect.
                            HTMLCS.addMessage(HTMLCS.ERROR, element, 'Meta refresh tag used to redirect to another page, with a time limit that is not zero. Users cannot control this time limit.', 'MetaRedirect');
                        } else {
                            // Just a refresh.
                            HTMLCS.addMessage(HTMLCS.ERROR, element, 'Meta refresh tag used to refresh the current page. Users cannot control the time limit for this refresh.', 'MetaRefresh');
                        }
                    }
                }//end if
            }//end if
        }//end if
    }

};
