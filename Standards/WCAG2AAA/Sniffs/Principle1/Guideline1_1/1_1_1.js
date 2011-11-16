var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_1_1_1_1 = {
    register: function()
    {
        return [
            'img',
            'input'
        ];

    },

    process: function(element)
    {
        if (element.nodeName.toLowerCase() === 'img') {
            this.testNullAltText(element);
            this.testLinkStutter(element);
        } else if (element.nodeName.toLowerCase() === 'input') {
            // Only look for input type="image" tags.
            if ((element.hasAttribute('type') === true) && (element.getAttribute('type') === 'image')) {
                this.testNullAltText(element);
            }
        }
    },

    testNullAltText: function(element) {
        var nodeName      = element.nodeName.toLowerCase();
        var linkOnlyChild = false;

        if (element.parentNode.nodeName.toLowerCase() === 'a') {
            var prevNode = _getPreviousSiblingElement(element, null);
            var nextNode = _getNextSiblingElement(element, null);

            if ((prevNode === null) && (nextNode === null)) {
                linkOnlyChild = true;
            }
        }//end if

        if (element.hasAttribute('alt') === false) {
            // Img tags and image submit buttons must have an alt attribute.
            if (nodeName === 'input') {
                HTMLCS.addMessage(HTMLCS.ERROR, element, 'When using an image submit button, specify a short text alternative with the alt attribute that describes the function of the button.', 'H36.1');
            } else {
                if (linkOnlyChild === true) {
                    HTMLCS.addMessage(HTMLCS.ERROR, element, 'If an img element is the only content of the a element, check that its text alternative describes the purpose of the link.', 'H30.2');
                } else {
                    HTMLCS.addMessage(HTMLCS.ERROR, element, 'When using the img element, specify a short text alternative with the alt attribute.', 'H37');
                }
            }
        } else if (!element.getAttribute('alt') || /^\s*$/.test(element.getAttribute('alt')) === true) {
            if (nodeName === 'input') {
                // Image submit buttons cannot have an empty alt text.
                HTMLCS.addMessage(HTMLCS.ERROR, element, 'Image submit button must contain alt text that describes the function of the button.', 'H36.2');
            } else {
                if (element.hasAttribute('title') === true) {
                    HTMLCS.addMessage(HTMLCS.ERROR, element, 'Img element with empty alt text must have absent or empty title attribute.', 'H67.1');
                } else {
                    // Img tags cannot have an empty alt text if it is the only
                    // content in a link (as the link requires text). Otherwise, it
                    // can have empty alt text but it must be an image that should be
                    // ignored.
                    if (linkOnlyChild === true) {
                        HTMLCS.addMessage(HTMLCS.ERROR, element, 'If an img element is the only content of the a element, check that its text alternative describes the purpose of the link.', 'H30.2');
                    } else {
                        HTMLCS.addMessage(HTMLCS.WARNING, element, 'Img element is marked so that it is ignored by Assistive Technology.', 'H67.2');
                    }
                }
            }
        } else {
            // Filled in alt text. Throw a notice to flag that the alt text should be
            // in line with the content of the image, or the purpose of the submit
            // button (in case it is not kept up to date, for instance).
            if (nodeName === 'input') {
                HTMLCS.addMessage(HTMLCS.NOTICE, element, 'Ensure that the image submit button\'s alt text identifies the purpose of the button.', 'G94');
            } else {
                HTMLCS.addMessage(HTMLCS.NOTICE, element, 'Ensure that the img element\'s alt text serves the same purpose and presents the same information as the image.', 'G94');
            }
        }
    },

    testLinkStutter: function(element) {
        if (element.parentNode.nodeName.toLowerCase() === 'a') {
            var anchor = element.parentNode;

            // If contained by an "a" link, check that the alt text does not duplicate
            // the link text, or if no link text, check an adjacent link does not
            // duplicate it.
            var nodes = {
                anchor: {
                    href: anchor.getAttribute('href'),
                    text: this._getLinkTextContent(anchor),
                    alt: this._getLinkAltText(anchor)
                }
            }

            if ((nodes.anchor.alt !== null) && (nodes.anchor.alt !== '')) {
                if (nodes.anchor.alt.trim().toLowerCase() === nodes.anchor.text.trim().toLowerCase()) {
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
                        text: this._getLinkTextContent(prevLink),
                        alt: this._getLinkAltText(prevLink)
                    }
                }

                if (nextLink !== null) {
                    nodes.next = {
                        href: nextLink.getAttribute('href'),
                        text: this._getLinkTextContent(nextLink),
                        alt: this._getLinkAltText(nextLink)
                    }
                }

                // Test against the following link, if any.
                if (nodes.next && (nodes.next.href !== '') && (nodes.next.href !== null) && (nodes.anchor.href === nodes.next.href)) {
                    if ((nodes.next.text !== '') && (nodes.anchor.alt === '')) {
                        HTMLCS.addMessage(HTMLCS.ERROR, element, 'Img element inside a link has empty alt text when a link beside it contains link text; consider combining the links.', 'H2.EG4');
                    } else if (nodes.next.text.toLowerCase() === nodes.anchor.alt.toLowerCase()) {
                        HTMLCS.addMessage(HTMLCS.ERROR, element, 'Img element inside a link must not use alt text that duplicates the content of a text link beside it.', 'H2.EG3');
                    }
                }

                // Test against the preceding link, if any.
                if (nodes.previous && (nodes.previous.href !== '') && (nodes.previous.href !== null) && (nodes.anchor.href === nodes.previous.href)) {
                    if ((nodes.previous.text !== '') && (nodes.anchor.alt === '')) {
                        HTMLCS.addMessage(HTMLCS.ERROR, element, 'Img element inside a link has empty alt text when a link beside it contains link text; consider combining the links.', 'H2.EG4');
                    } else if (nodes.previous.text.toLowerCase() === nodes.anchor.alt.toLowerCase()) {
                        HTMLCS.addMessage(HTMLCS.ERROR, element, 'Img element inside a link must not use alt text that duplicates the content of a text link beside it.', 'H2.EG3');
                    }
                }
            }//end if
        }//end if
    },

    _getLinkTextContent: function(anchor) {
        var anchor = anchor.cloneNode(true);
        var nodes  = [];
        for (var i = 0; i < anchor.childNodes.length; i++) {
            nodes.push(anchor.childNodes[i]);
        }

        var text = [];
        while (nodes.length > 0) {
            var node = nodes.shift();

            // If it's an element, add any sub-nodes to the process list.
            if (node.nodeType === 1) {
                if (node.nodeName.toLowerCase() !== 'img') {
                    for (var i = 0; i < node.childNodes.length; i++) {
                        nodes.push(node.childNodes[i]);
                    }
                }
            } else if (node.nodeType === 3) {
                // Text node.
                text.push(node.nodeValue);
            }
        }

        // Push the text nodes together and trim.
        text = text.join('').replace(/^\s+|\s+$/g,'');
        return text;
    },

    _getLinkAltText: function(anchor) {
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
                if ((/^\s*$/.test(prevNode.nodeValue) === false) && (immediate === truee)) {
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
                if ((/^\s*$/.test(nextNode.nodeValue) === false) && (immediate === truee)) {
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
