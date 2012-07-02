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

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_1_1_1_1 = {
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
            'img',
            'input',
            'area',
            'object',
            'applet'
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
        var nodeName = element.nodeName.toLowerCase();

        switch (nodeName) {
            case 'img':
                this.testNullAltText(element);
                this.testLinkStutter(element);
                this.testLongdesc(element);
            break;

            case 'input':
                // Only look for input type="image" tags.
                if ((element.hasAttribute('type') === true) && (element.getAttribute('type') === 'image')) {
                    this.testNullAltText(element);
                }
            break;

            case 'area':
                // Client-side image maps.
                this.testNullAltText(element);
            break;

            case 'object':
                this.testObjectTextAlternative(element);
            break;

            case 'applet':
                this.testAppletTextAlternative(element);
            break;
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
     * @returns void
     */
    testNullAltText: function(element)
    {
        var nodeName      = element.nodeName.toLowerCase();
        var linkOnlyChild = false;
        var missingAlt    = false;
        var nullAlt       = false;

        if (element.parentNode.nodeName.toLowerCase() === 'a') {
            var prevNode = this._getPreviousSiblingElement(element, null);
            var nextNode = this._getNextSiblingElement(element, null);

            if ((prevNode === null) && (nextNode === null)) {
                linkOnlyChild = true;
            }
        }//end if

        if (element.hasAttribute('alt') === false) {
            missingAlt = true;
        } else if (!element.getAttribute('alt') || HTMLCS.isStringEmpty(element.getAttribute('alt')) === true) {
            nullAlt = true;
        }

        // Now determine which test(s) should fire.
        switch (nodeName) {
            case 'img':
                if ((linkOnlyChild === true) && ((missingAlt === true) || (nullAlt === true))) {
                    // Img tags cannot have an empty alt text if it is the
                    // only content in a link (as the link would not have a text
                    // alternative).
                    HTMLCS.addMessage(HTMLCS.ERROR, element.parentNode, 'Img element is the only content of the link, but is missing alt text. The alt text should describe the purpose of the link.', 'H30.2');
                } else if (missingAlt === true) {
                    HTMLCS.addMessage(HTMLCS.ERROR, element, 'Img element missing an alt attribute. Use the alt attribute to specify a short text alternative.', 'H37');
                } else if (nullAlt === true) {
                    if ((element.hasAttribute('title') === true) && (HTMLCS.isStringEmpty(element.getAttribute('title')) === false)) {
                        // Title attribute present and not empty. This is wrong when
                        // an image is marked as ignored.
                        HTMLCS.addMessage(HTMLCS.ERROR, element, 'Img element with empty alt text must have absent or empty title attribute.', 'H67.1');
                    } else {
                        HTMLCS.addMessage(HTMLCS.WARNING, element, 'Img element is marked so that it is ignored by Assistive Technology.', 'H67.2');
                    }
                } else {
                    HTMLCS.addMessage(HTMLCS.NOTICE, element, 'Ensure that the img element\'s alt text serves the same purpose and presents the same information as the image.', 'G94.Image');
                }
            break;

            case 'input':
                // Image submit buttons.
                if ((missingAlt === true) || (nullAlt === true)) {
                    HTMLCS.addMessage(HTMLCS.ERROR, element, 'Image submit button missing an alt attribute. Specify a text alternative that describes the button\'s function, using the alt attribute.', 'H36');
                } else {
                    HTMLCS.addMessage(HTMLCS.NOTICE, element, 'Ensure that the image submit button\'s alt text identifies the purpose of the button.', 'G94.Button');
                }
            break;

            case 'area':
                // Area tags in a client-side image map.
                if ((missingAlt === true) || (nullAlt === true)) {
                    HTMLCS.addMessage(HTMLCS.ERROR, element, 'Area element in an image map missing an alt attribute. Each area element must have a text alternative that describes the function of the image map area.', 'H24');
                } else {
                    HTMLCS.addMessage(HTMLCS.NOTICE, element, 'Ensure that the area element\'s text alternative serves the same purpose as the part of image map image it references.', 'H24.2');
                }
            break;

            default:
                // No other tags defined.
            break;
        }//end switch
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
        HTMLCS.addMessage(HTMLCS.NOTICE, element, 'If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.', 'G73,G74');

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
            }

            if (nodes.anchor.alt === null) {
                nodes.anchor.alt = '';
            }

            if ((nodes.anchor.alt !== null) && (nodes.anchor.alt !== '')) {
                if (HTMLCS.util.trim(nodes.anchor.alt).toLowerCase() === HTMLCS.util.trim(nodes.anchor.text).toLowerCase()) {
                    // H2 "Failure Example 5": they're in one link, but the alt text
                    // duplicates the link text. Trimmed and lowercased because they
                    // would sound the same to a screen reader.
                    HTMLCS.addMessage(HTMLCS.ERROR, element, 'Img element inside a link must not use alt text that duplicates the text content of the link.', 'H2.EG5');
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
                var prevLink = this._getPreviousSiblingElement(anchor, 'a', true);
                var nextLink = this._getNextSiblingElement(anchor, 'a', true);

                if (prevLink !== null) {
                    nodes.previous = {
                        href: prevLink.getAttribute('href'),
                        text: HTMLCS.util.getElementTextContent(prevLink, false),
                        alt: this._getLinkAltText(prevLink)
                    }

                    if (nodes.previous.alt === null) {
                        nodes.previous.alt = '';
                    }
                }

                if (nextLink !== null) {
                    nodes.next = {
                        href: nextLink.getAttribute('href'),
                        text: HTMLCS.util.getElementTextContent(nextLink, false),
                        alt: this._getLinkAltText(nextLink)
                    }

                    if (nodes.next.alt === null) {
                        nodes.next.alt = '';
                    }
                }

                // Test against the following link, if any.
                if (nodes.next && (nodes.next.href !== '') && (nodes.next.href !== null) && (nodes.anchor.href === nodes.next.href)) {
                    if ((nodes.next.text !== '') && (nodes.anchor.alt === '')) {
                        HTMLCS.addMessage(HTMLCS.ERROR, element, 'Img element inside a link has empty or missing alt text when a link beside it contains link text. Consider combining the links.', 'H2.EG4');
                    } else if (nodes.next.text.toLowerCase() === nodes.anchor.alt.toLowerCase()) {
                        HTMLCS.addMessage(HTMLCS.ERROR, element, 'Img element inside a link must not use alt text that duplicates the content of a text link beside it.', 'H2.EG3');
                    }
                }

                // Test against the preceding link, if any.
                if (nodes.previous && (nodes.previous.href !== '') && (nodes.previous.href !== null) && (nodes.anchor.href === nodes.previous.href)) {
                    if ((nodes.previous.text !== '') && (nodes.anchor.alt === '')) {
                        HTMLCS.addMessage(HTMLCS.ERROR, element, 'Img element inside a link has empty or missing alt text when a link beside it contains link text. Consider combining the links.', 'H2.EG4');
                    } else if (nodes.previous.text.toLowerCase() === nodes.anchor.alt.toLowerCase()) {
                        HTMLCS.addMessage(HTMLCS.ERROR, element, 'Img element inside a link must not use alt text that duplicates the content of a text link beside it.', 'H2.EG3');
                    }
                }
            }//end if
        }//end if
    },

    /**
     * Test the inclusion of a text alternative on OBJECT tags (technique H53).
     *
     * OBJECT tags can be nested inside themselves to provide lesser-functioning
     * alternatives to the primary (outermost) tag, but a text alternative must be
     * provided inside. Alt text from an image is sufficient.
     *
     * @param {DOMNode} element The element to test.
     *
     * @returns void
     */
    testObjectTextAlternative: function(element)
    {
        // Test firstly for whether we have an object alternative.
        var childObject = element.querySelector('object');

        // If we have an object as our alternative, skip it. Pass the blame onto
        // the child.
        if (childObject === null) {
            var textAlt = HTMLCS.util.getElementTextContent(element, true);
            if (textAlt === '') {
                HTMLCS.addMessage(HTMLCS.ERROR, element, 'Object elements must contain a text alternative after all other alternatives are exhausted.', 'H53');
            } else {
                HTMLCS.addMessage(HTMLCS.NOTICE, element, 'Check that short (and if appropriate, long) text alternatives are available for non-text content that serve the same purpose and present the same information.', 'G94,G92.Object');
            }
        }//end if
    },

    /**
     * Test the inclusion of a text alternative on APPLET tags (technique H35).
     *
     * These might still be used in HTML 4.01 and XHTML 1.0 Transitional DTDs. Both
     * alt text and body text alternative are required: Oracle's docs state that
     * "alt" is for those that understand APPLET but not Java; the body text for
     * those that don't understand APPLET. WCAG 2.0 suggests support for either alt
     * method is inconsistent and therefore to use both.
     *
     * @param {DOMNode} element The element to test.
     *
     * @returns void
     */
    testAppletTextAlternative: function(element)
    {
        // Test firstly for whether we have an object alternative.
        var childObject = element.querySelector('object');
        var hasError    = false;

        // If we have an object as our alternative, skip it. Pass the blame onto
        // the child. (This is a special case: those that don't understand APPLET
        // may understand OBJECT, but APPLET shouldn't be nested.)
        if (childObject === null) {
            var textAlt = HTMLCS.util.getElementTextContent(element, true);
            if (HTMLCS.isStringEmpty(textAlt) === true) {
                HTMLCS.addMessage(HTMLCS.ERROR, element, 'Applet elements must contain a text alternative in the element\'s body, for browsers without support for the applet element.', 'H35.3');
                hasError = true;
            }
        }//end if

        var altAttr = element.getAttribute('alt') || '';
        if (HTMLCS.isStringEmpty(altAttr) === true) {
            HTMLCS.addMessage(HTMLCS.ERROR, element, 'Applet elements must contain an alt attribute, to provide a text alternative to browsers supporting the element but are unable to load the applet.', 'H35.2');
            hasError = true;
        }

        if (hasError === false) {
            // No error? Remind of obligations about equivalence of alternatives.
            HTMLCS.addMessage(HTMLCS.NOTICE, element, 'Check that short (and if appropriate, long) text alternatives are available for non-text content that serve the same purpose and present the same information.', 'G94,G92.Applet');
        }
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
    },

    /**
     * Get the previous sibling element.
     *
     * This is a substitute for previousSibling where there are text, comment and
     * other nodes between elements.
     *
     * If tagName is null, immediate is ignored and effectively defaults to true: the
     * previous element will be returned regardless of what it is.
     *
     * @param {DOMNode} element           Element to start from.
     * @param {String}  [tagName=null]    Only match this tag. If null, match any.
     *                                    Not case-sensitive.
     * @param {Boolean} [immediate=false] Only match if the tag in tagName is the
     *                                    immediately preceding non-whitespace node.
     *
     * @returns {DOMNode} The appropriate node or null if none is found.
     */
    _getPreviousSiblingElement: function(element, tagName, immediate) {
        if (tagName === undefined) {
            tagName = null;
        }

        if (immediate === undefined) {
            immediate = false;
        }

        var prevNode = element.previousSibling;
        while (prevNode !== null) {
            if (prevNode.nodeType === 3) {
                if ((HTMLCS.isStringEmpty(prevNode.nodeValue) === false) && (immediate === true)) {
                    // Failed. Immediate node requested and we got text instead.
                    prevNode = null;
                    break;
                }
            } else if (prevNode.nodeType === 1) {
                // If this an element, we break regardless. If it's an "a" node,
                // it's the one we want. Otherwise, there is no adjacent "a" node
                // and it can be ignored.
                if ((tagName === null) || (prevNode.nodeName.toLowerCase() === tagName)) {
                    // Correct element, or we aren't picky.
                    break;
                } else if (immediate === true) {
                    // Failed. Immediate node requested and not correct tag name.
                    prevNode = null;
                    break;
                }

                break;
            }//end if

            prevNode = prevNode.previousSibling;
        }//end if

        return prevNode;
    },

    /**
     * Get the next sibling element.
     *
     * This is a substitute for nextSibling where there are text, comment and
     * other nodes between elements.
     *
     * If tagName is null, immediate is ignored and effectively defaults to true: the
     * next element will be returned regardless of what it is.
     *
     * @param {DOMNode} element           Element to start from.
     * @param {String}  [tagName=null]    Only match this tag. If null, match any.
     *                                    Not case-sensitive.
     * @param {Boolean} [immediate=false] Only match if the tag in tagName is the
     *                                    immediately following non-whitespace node.
     *
     * @returns {DOMNode} The appropriate node or null if none is found.
     */
    _getNextSiblingElement: function(element, tagName, immediate) {
        if (tagName === undefined) {
            tagName = null;
        }

        if (immediate === undefined) {
            immediate = false;
        }

        var nextNode = element.nextSibling;
        while (nextNode !== null) {
            if (nextNode.nodeType === 3) {
                if ((HTMLCS.isStringEmpty(nextNode.nodeValue) === false) && (immediate === true)) {
                    // Failed. Immediate node requested and we got text instead.
                    nextNode = null;
                    break;
                }
            } else if (nextNode.nodeType === 1) {
                // If this an element, we break regardless. If it's an "a" node,
                // it's the one we want. Otherwise, there is no adjacent "a" node
                // and it can be ignored.
                if ((tagName === null) || (nextNode.nodeName.toLowerCase() === tagName)) {
                    // Correct element, or we aren't picky.
                    break;
                } else if (immediate === true) {
                    // Failed. Immediate node requested and not correct tag name.
                    nextNode = null;
                    break;
                }

                break;
            }//end if

            nextNode = nextNode.nextSibling;
        }//end if

        return nextNode;
    }
};
