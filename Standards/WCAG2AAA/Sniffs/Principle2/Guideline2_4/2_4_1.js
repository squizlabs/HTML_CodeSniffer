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

_global.HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_1 = {
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
            'iframe',
            'a',
            'area',
            '_top'
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
            this.testGenericBypassMsg(top);
        } else {
            var nodeName = element.nodeName.toLowerCase();

            switch (nodeName) {
                case 'iframe':
                    this.testIframeTitle(element);
                break;

                case 'a':
                case 'area':
                    this.testSameDocFragmentLinks(element, top);
                break;
            }
        }
    },

    /**
     * Test for the presence of title attributes on the iframe element (technique H64).
     *
     * @param {DOMNode} element The element to test.
     *
     * @returns void
     */
    testIframeTitle: function(element)
    {
        var nodeName = element.nodeName.toLowerCase();

        if (nodeName === 'iframe') {
            var hasTitle = false;
            if (element.hasAttribute('title') === true) {
                if (element.getAttribute('title') && (/^\s+$/.test(element.getAttribute('title')) === false)) {
                    hasTitle = true;
                }
            }

            if (hasTitle === false) {
                HTMLCS.addMessage(HTMLCS.ERROR, element, _global.translation["2_4_1_H64.1"], 'H64.1');
            } else {
                HTMLCS.addMessage(HTMLCS.NOTICE, element, _global.translation["2_4_1_H64.2"], 'H64.2');
            }
        }//end if
    },

    /**
     * Throw a generic bypass blocks message.
     *
     * @param {DOMNode} top Top element of the testing source.
     *
     * @returns void
     */
    testGenericBypassMsg: function(top)
    {
        HTMLCS.addMessage(HTMLCS.NOTICE, top, _global.translation["2_4_1_G1,G123,G124,H69"], 'G1,G123,G124,H69');
    },

    /**
     * Test for document fragment links to IDs that do not exist.
     *
     * These are links of the form "<a href="#content">", where the ID "content" does
     * not exist. Area elements in image maps are also tested, as they are also
     * likely to contain these attributes.
     *
     * @param {DOMNode} element The element to test.
     * @param {DOMNode} top     Top element of the testing source.
     *
     * @returns void
     */
    testSameDocFragmentLinks: function(element, top)
    {
        if (element.hasAttribute('href') === true) {
            var href = element.getAttribute('href');
            href     = HTMLCS.util.trim(href);
            if ((href.length > 1) && (href.charAt(0) === '#')) {
                var id = href.substr(1);

                try {
                    var doc = top;
                    if (doc.ownerDocument) {
                        doc = doc.ownerDocument;
                    }

                    // First search for an element with the appropriate ID, then search for a
                    // named anchor using the name attribute.
                    var target = doc.getElementById(id);
                    if (target === null) {
                        var _doc         = HTMLCS.util.getElementWindow(top).document;
                        var doctype      = HTMLCS.util.getDocumentType(_doc);
                        var nameSelector = 'a';

                        if (doctype && doctype.indexOf('html5') === -1) {
                            nameSelector = '*';
                        }

                        target = doc.querySelector(nameSelector + '[name="' + id + '"]');
                    }

                    if ((target === null) || (HTMLCS.util.contains(top, target) === false)) {
                        if ((HTMLCS.isFullDoc(top) === true) || (top.nodeName.toLowerCase() === 'body')) {
                            HTMLCS.addMessage(HTMLCS.ERROR, element, _global.translation["2_4_1_G1,G123,G124.NoSuchID"].replace(/\{\{id\}\}/g, id), 'G1,G123,G124.NoSuchID');
                        } else {
                            HTMLCS.addMessage(HTMLCS.WARNING, element, _global.translation["2_4_1_G1,G123,G124.NoSuchIDFragment"].replace(/\{\{id\}\}/g, id), 'G1,G123,G124.NoSuchIDFragment');
                        }
                    }
                } catch (ex) {
                }//end try
            }//end if
        }
    }
};
