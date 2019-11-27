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

_global.HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_1_1_1_1 = {
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
            'img'
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
            this.addNullAltTextResults(top);
            this.addMediaAlternativesResults(top);
        } else {
            var nodeName = element.nodeName.toLowerCase();

            switch (nodeName) {
            case 'img':
                this.testLinkStutter(element);
                this.testLongdesc(element);
                break;
            }//end if
        }//end if
    },

    /**
     * Driver function for the null alt text tests.
     *
     * This takes the generic result given by the alt text testing functions,
     * and converts them into WCAG 2.1-specific messages.
     *
     * @param {DOMNode} element The element to test.
     */
    addNullAltTextResults: function(top)
    {
        var errors = this.testNullAltText(top);

        for (var i = 0; i < errors.img.emptyAltInLink.length; i++) {
            HTMLCS.addMessage(HTMLCS.ERROR, errors.img.emptyAltInLink[i], _global.HTMLCS.getTranslation("1_1_1_H30.2"), 'H30.2');
        }

        for (var i = 0; i < errors.img.nullAltWithTitle.length; i++) {
            HTMLCS.addMessage(HTMLCS.ERROR, errors.img.nullAltWithTitle[i], _global.HTMLCS.getTranslation("1_1_1_H67.1"), 'H67.1');
        }

        for (var i = 0; i < errors.img.ignored.length; i++) {
            HTMLCS.addMessage(HTMLCS.WARNING, errors.img.ignored[i], _global.HTMLCS.getTranslation("1_1_1_H67.2"), 'H67.2');
        }

        for (var i = 0; i < errors.img.missingAlt.length; i++) {
            HTMLCS.addMessage(HTMLCS.ERROR, errors.img.missingAlt[i],  _global.HTMLCS.getTranslation("1_1_1_H37"), 'H37');
        }

        for (var i = 0; i < errors.img.generalAlt.length; i++) {
            HTMLCS.addMessage(HTMLCS.NOTICE, errors.img.generalAlt[i], _global.HTMLCS.getTranslation("1_1_1_G94.Image"), 'G94.Image');
        }

        for (var i = 0; i < errors.inputImage.missingAlt.length; i++) {
            HTMLCS.addMessage(HTMLCS.ERROR, errors.inputImage.missingAlt[i], _global.HTMLCS.getTranslation("1_1_1_H36"), 'H36');
        }

        for (var i = 0; i < errors.inputImage.generalAlt.length; i++) {
            HTMLCS.addMessage(HTMLCS.NOTICE, errors.inputImage.generalAlt[i], _global.HTMLCS.getTranslation("1_1_1_G94.Button"), 'G94.Button');
        }

        for (var i = 0; i < errors.area.missingAlt.length; i++) {
            HTMLCS.addMessage(HTMLCS.ERROR, errors.area.missingAlt[i], _global.HTMLCS.getTranslation("1_1_1_H24"), 'H24');
        }

        for (var i = 0; i < errors.area.generalAlt.length; i++) {
            HTMLCS.addMessage(HTMLCS.NOTICE, errors.area.generalAlt[i], _global.HTMLCS.getTranslation("1_1_1_H24.2"), 'H24.2');
        }
    },

    /**
     * Test for missing or null alt text in certain elements.
     *
     * Tested elements are:
     * - IMG elements
     * - INPUT elements with type="image" (ie. image submit buttons).
     * - AREA elements (ie. in client-side image maps).
     *
     * @param {DOMNode} element The element to test.
     *
     * @returns {Object} A structured list of errors.
     */
    testNullAltText: function(top)
    {
        var errors = {
            img: {
                generalAlt: [],
                missingAlt: [],
                ignored: [],
                nullAltWithTitle: [],
                emptyAltInLink: []
            },
            inputImage: {
                generalAlt: [],
                missingAlt: []
            },
            area: {
                generalAlt: [],
                missingAlt: []
            }
        };

        elements = HTMLCS.util.getAllElements(top, 'img, area, input[type="image"]');

        for (var el = 0; el < elements.length; el++) {
            var element = elements[el];

            var nodeName      = element.nodeName.toLowerCase();
            var linkOnlyChild = false;
            var missingAlt    = false;
            var nullAlt       = false;

            if (element.parentNode.nodeName.toLowerCase() === 'a') {
                var prevNode = HTMLCS.util.getPreviousSiblingElement(element, null);
                var nextNode = HTMLCS.util.getNextSiblingElement(element, null);

                if ((prevNode === null) && (nextNode === null)) {
                    var textContent = element.parentNode.textContent;

                    if (element.parentNode.textContent !== undefined) {
                        var textContent = element.parentNode.textContent;
                    } else {
                        // Keep IE8 happy.
                        var textContent = element.parentNode.innerText;
                    }

                    if (HTMLCS.util.isStringEmpty(textContent) === true) {
                        linkOnlyChild = true;
                    }
                }
            }//end if

            if (element.hasAttribute('alt') === false) {
                missingAlt = true;
            } else if (!element.getAttribute('alt') || HTMLCS.util.isStringEmpty(element.getAttribute('alt')) === true) {
                nullAlt = true;
            }

            // Now determine which test(s) should fire.
            switch (nodeName) {
            case 'img':
                if ((linkOnlyChild === true) && ((missingAlt === true) || (nullAlt === true))) {
                    // Img tags cannot have an empty alt text if it is the
                    // only content in a link (as the link would not have a text
                    // alternative).
                    errors.img.emptyAltInLink.push(element.parentNode);
                } else if (missingAlt === true) {
                    errors.img.missingAlt.push(element);
                } else if (nullAlt === true) {
                    if ((element.hasAttribute('title') === true) && (HTMLCS.util.isStringEmpty(element.getAttribute('title')) === false)) {
                        // Title attribute present and not empty. This is wrong when
                        // an image is marked as ignored.
                        errors.img.nullAltWithTitle.push(element);
                    } else {
                        errors.img.ignored.push(element);
                    }
                } else {
                    errors.img.generalAlt.push(element);
                }
                break;

            case 'input':
                // Image submit buttons.
                if ((missingAlt === true) || (nullAlt === true)) {
                    errors.inputImage.missingAlt.push(element);
                } else {
                    errors.inputImage.generalAlt.push(element);
                }
                break;

            case 'area':
                // Area tags in a client-side image map.
                if ((missingAlt === true) || (nullAlt === true)) {
                    errors.area.missingAlt.push(element);
                } else {
                    errors.inputImage.generalAlt.push(element);
                }
                break;

            default:
                // No other tags defined.
                break;
            }//end switch
        }//end for

        return errors;
    },

    /**
     * Test for longdesc attributes on images (technique H45).
     *
     * We throw a notice to ensure that a longdesc is available in an accessible
     * way - ie. using body text or a link. Longdesc is specifically ignored as it
     * is not accessible to sighted users.
     *
     * @param {DOMNode} element The element to test.
     *
     * @returns void
     */
    testLongdesc: function(element)
    {
        HTMLCS.addMessage(HTMLCS.NOTICE, element, _global.HTMLCS.getTranslation("1_1_1_G73,G74"), 'G73,G74');
    },

    /**
     * Test for link stutter with adjacent images and text (technique H2).
     *
     * Only runs on IMG elements contained inside an anchor (A) element. We test that
     * its alt text does not duplicate the text content of a link directly beside it.
     * We also test that the technique hasn't been applied incorrectly (Failure
     * Examples 4 and 5 in technique H2).
     *
     * Error messages are given codes in the form "H2.EG5", meaning it is a case of
     * the applicable failure example (3, 4, or 5).
     *
     * @param {DOMNode} element The image element to test.
     */
    testLinkStutter: function(element)
    {
        if (element.parentNode.nodeName.toLowerCase() === 'a') {
            var anchor = element.parentNode;

            // If contained by an "a" link, check that the alt text does not duplicate
            // the link text, or if no link text, check an adjacent link does not
            // duplicate it.
            var nodes = {
                anchor: {
                    href: anchor.getAttribute('href'),
                    text: HTMLCS.util.getElementTextContent(anchor, false),
                    alt: this._getLinkAltText(anchor)
                }
            };

            if (nodes.anchor.alt === null) {
                nodes.anchor.alt = '';
            }

            if ((nodes.anchor.alt !== null) && (nodes.anchor.alt !== '')) {
                if (HTMLCS.util.trim(nodes.anchor.alt).toLowerCase() === HTMLCS.util.trim(nodes.anchor.text).toLowerCase()) {
                    // H2 "Failure Example 5": they're in one link, but the alt text
                    // duplicates the link text. Trimmed and lowercased because they
                    // would sound the same to a screen reader.
                    HTMLCS.addMessage(HTMLCS.ERROR, element, _global.HTMLCS.getTranslation("1_1_1_H2.EG5"), 'H2.EG5');
                }
            }

            // If there is no supplementary text, try to catch H2 "Failure Examples"
            // in cases where there are adjacent links with the same href:
            // 3 - img text that duplicates link text in an adjacent link. (Screen
            //     readers will stutter.)
            // 4 - img text is blank when another link adjacent contains link text.
            //     (This leaves one link with no text at all - the two should be
            //      combined into one link.)
            if (nodes.anchor.text === '') {
                var prevLink = HTMLCS.util.getPreviousSiblingElement(anchor, 'a', true);
                var nextLink = HTMLCS.util.getNextSiblingElement(anchor, 'a', true);

                if (prevLink !== null) {
                    nodes.previous = {
                        href: prevLink.getAttribute('href'),
                        text: HTMLCS.util.getElementTextContent(prevLink, false),
                        alt: this._getLinkAltText(prevLink)
                    };

                    if (nodes.previous.alt === null) {
                        nodes.previous.alt = '';
                    }
                }

                if (nextLink !== null) {
                    nodes.next = {
                        href: nextLink.getAttribute('href'),
                        text: HTMLCS.util.getElementTextContent(nextLink, false),
                        alt: this._getLinkAltText(nextLink)
                    };

                    if (nodes.next.alt === null) {
                        nodes.next.alt = '';
                    }
                }

                // Test against the following link, if any.
                if (nodes.next && (nodes.next.href !== '') && (nodes.next.href !== null) && (nodes.anchor.href === nodes.next.href)) {
                    if ((nodes.next.text !== '') && (nodes.anchor.alt === '')) {
                        HTMLCS.addMessage(HTMLCS.ERROR, element, _global.HTMLCS.getTranslation("1_1_1_H2.EG4"), 'H2.EG4');
                    } else if (nodes.next.text.toLowerCase() === nodes.anchor.alt.toLowerCase()) {
                        HTMLCS.addMessage(HTMLCS.ERROR, element, _global.HTMLCS.getTranslation("1_1_1_H2.EG3"), 'H2.EG3');
                    }
                }

                // Test against the preceding link, if any.
                if (nodes.previous && (nodes.previous.href !== '') && (nodes.previous.href !== null) && (nodes.anchor.href === nodes.previous.href)) {
                    if ((nodes.previous.text !== '') && (nodes.anchor.alt === '')) {
                        HTMLCS.addMessage(HTMLCS.ERROR, element, _global.HTMLCS.getTranslation("1_1_1_H2.EG4"), 'H2.EG4');
                    } else if (nodes.previous.text.toLowerCase() === nodes.anchor.alt.toLowerCase()) {
                        HTMLCS.addMessage(HTMLCS.ERROR, element, _global.HTMLCS.getTranslation("1_1_1_H2.EG3"));
                    }
                }
            }//end if
        }//end if
    },

    /**
     * Driver function for the media alternative (object/applet) tests.
     *
     * This takes the generic result given by the media alternative testing function,
     * and converts them into WCAG 2.1-specific messages.
     *
     * @param {DOMNode} element The element to test.
     */
    addMediaAlternativesResults: function(top)
    {
        var errors = this.testMediaTextAlternatives(top);

        for (var i = 0; i < errors.object.missingBody.length; i++) {
            HTMLCS.addMessage(HTMLCS.ERROR, errors.object.missingBody[i], _global.HTMLCS.getTranslation("1_1_1_H53,ARIA6"), 'H53,ARIA6');
        }

        for (var i = 0; i < errors.object.generalAlt.length; i++) {
            HTMLCS.addMessage(HTMLCS.NOTICE, errors.object.generalAlt[i], _global.HTMLCS.getTranslation("1_1_1_G94,G92.Object,ARIA6"), 'G94,G92.Object,ARIA6');
        }

        for (var i = 0; i < errors.applet.missingBody.length; i++) {
            HTMLCS.addMessage(HTMLCS.ERROR, errors.applet.missingBody[i], _global.HTMLCS.getTranslation("1_1_1_H35.3"), 'H35.3');
        }

        for (var i = 0; i < errors.applet.missingAlt.length; i++) {
            HTMLCS.addMessage(HTMLCS.ERROR, errors.applet.missingAlt[i], _global.HTMLCS.getTranslation("1_1_1_H35.2"), 'H35.2');
        }

        for (var i = 0; i < errors.applet.generalAlt.length; i++) {
            HTMLCS.addMessage(HTMLCS.NOTICE, errors.applet.generalAlt[i], _global.HTMLCS.getTranslation("1_1_1_G94,G92.Applet"), 'G94,G92.Applet');
        }
    },

    testMediaTextAlternatives: function(top)
    {
        var errors = {
            object: {
                missingBody: [],
                generalAlt: []
            },
            applet: {
                missingBody: [],
                missingAlt: [],
                generalAlt: []
            }
        };

        var elements = HTMLCS.util.getAllElements(top, 'object');

        for (var el = 0; el < elements.length; el++) {
            var element  = elements[el];

            var childObject = element.querySelector('object');

            // If we have an object as our alternative, skip it. Pass the blame onto
            // the child.
            if (childObject === null) {
                if (HTMLCS.util.isStringEmpty(HTMLCS.util.getElementTextContent(element, true)) === true) {
                    if (HTMLCS.util.hasValidAriaLabel(element) === false) {
                        errors.object.missingBody.push(element);
                    }
                } else {
                    if (HTMLCS.util.hasValidAriaLabel(element) === false) {
                        errors.object.generalAlt.push(element);
                    }
                }
            }//end if
        }//end if

        var elements = HTMLCS.util.getAllElements(top, 'applet');

        for (var el = 0; el < elements.length; el++) {
            // Test firstly for whether we have an object alternative.
            var childObject = element.querySelector('object');
            var hasError    = false;

            // If we have an object as our alternative, skip it. Pass the blame onto
            // the child. (This is a special case: those that don't understand APPLET
            // may understand OBJECT, but APPLET shouldn't be nested.)
            if (childObject === null) {
                var textAlt = HTMLCS.util.getElementTextContent(element, true);
                if (HTMLCS.util.isStringEmpty(textAlt) === true) {
                    errors.applet.missingBody.push(element);
                    hasError = true;
                }
            }//end if

            var altAttr = element.getAttribute('alt') || '';
            if (HTMLCS.util.isStringEmpty(altAttr) === true) {
                errors.applet.missingAlt.push(element);
                hasError = true;
            }

            // Catch anything with a valid aria label.
            if (HTMLCS.util.hasValidAriaLabel(element) === true) {
                hasError = false;
            }

            if (hasError === false) {
                // No error? Remind of obligations about equivalence of alternatives.
                errors.applet.generalAlt.push(element);
            }
        }//end if

        return errors;
    },

    /**
     * Gets just the alt text from any images on a link.
     *
     * @param {DOMNode} anchor The link element being inspected.
     *
     * @returns {String} The alt text.
     */
    _getLinkAltText: function(anchor)
    {
        var anchor = anchor.cloneNode(true);
        var nodes  = [];
        for (var i = 0; i < anchor.childNodes.length; i++) {
            nodes.push(anchor.childNodes[i]);
        }

        var alt = null;
        while (nodes.length > 0) {
            var node = nodes.shift();

            // If it's an element, add any sub-nodes to the process list.
            if (node.nodeType === 1) {
                if (node.nodeName.toLowerCase() === 'img') {
                    if (node.hasAttribute('alt') === true) {
                        alt = node.getAttribute('alt');
                        if (!alt) {
                            alt = '';
                        } else {
                            // Trim the alt text.
                            alt = alt.replace(/^\s+|\s+$/g,'');
                        }

                        break;
                    }
                }
            }
        }

        return alt;
    }
};
