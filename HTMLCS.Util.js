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
_global.HTMLCS.util = function() {
    var self = {};

    /**
     * Trim off excess spaces on either side.
     *
     * @param {String} string The string with potentially extraneous whitespace.
     *
     * @returns {String}
     */
    self.trim = function(string) {
        return string.replace(/^\s*(.*)\s*$/g, '$1');
    };

    /**
     * Returns true if the string is "empty" according to WCAG standards.
     *
     * We can test for whether the string is entirely composed of whitespace, but
     * WCAG standards explicitly state that non-breaking spaces (&nbsp;, &#160;)
     * are not considered "empty". So we need this function to filter out that
     * situation.
     *
     * @param {String} string The potentially empty string.
     *
     * @returns {Boolean}
     */
    self.isStringEmpty = function(string) {
        if (typeof string !== 'string') {
            return true;
        }

        var empty = true;

        if (string.indexOf(String.fromCharCode(160)) !== -1) {
            // Has an NBSP, therefore cannot be empty.
            empty = false;
        } else if (/^\s*$/.test(string) === false) {
            // Not spacing.
            empty = false;
        }

        return empty;
    };

    /**
     * Get the document type being tested.
     *
     * Possible values: html5, xhtml5, xhtml11, xhtml10, html401, html40
     * ... or empty string if it couldn't work out the doctype.
     *
     * This will only give the thumbs-up to the "strict" doctypes.
     *
     * @param {Document} The document being tested.
     *
     * @return {String}
     */
    self.getDocumentType = function(document)
    {
        var retval  = null;
        var doctype = document.doctype;
        if (doctype) {
            var doctypeName = doctype.name;
            var publicId    = doctype.publicId;
            var systemId    = doctype.systemId;

            if (doctypeName === null) {
                doctypeName = '';
            }

            if (systemId === null) {
                systemId = '';
            }

            if (publicId === null) {
                publicId = '';
            }

            if (doctypeName.toLowerCase() === 'html') {
                if (publicId === '' && systemId === '') {
                    retval = 'html5';
                } else if (publicId.indexOf('//DTD HTML 4.01') !== -1 || systemId.indexOf('w3.org/TR/html4/strict.dtd') !== -1) {
                    retval = 'html401';
                } else if (publicId.indexOf('//DTD HTML 4.0') !== -1 || systemId.indexOf('w3.org/TR/REC-html40/strict.dtd') !== -1) {
                    retval = 'html40';
                } else if (publicId.indexOf('//DTD XHTML 1.0 Strict') !== -1 && systemId.indexOf('w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd') !== -1) {
                    retval = 'xhtml10';
                } else if (publicId.indexOf('//DTD XHTML 1.1') !== -1 && systemId.indexOf('w3.org/TR/xhtml11/DTD/xhtml11.dtd') !== -1) {
                    retval = 'xhtml11';
                } if (systemId.indexOf('about:legacy-compat') !== -1) {
                    // Some tools don't like the lack of doctype for XHTML5 so permit
                    // an "about:legacy-compat" SYSTEM doctype.
                    if (document.contentType === 'application/xhtml+xml') {
                        var htmlElement = document.querySelector('html');
                        if (htmlElement.getAttribute('xmlns') === 'http://www.w3.org/1999/xhtml') {
                            retval = 'xhtml5';
                        }
                    }
                }
            }
        } else {
            // XHTML5 has no doctype (at all) normally, but it only counts if the
            // content type it was sent as is set correctly
            if (document.contentType === 'application/xhtml+xml') {
                var htmlElement = document.querySelector('html');
                if (htmlElement.getAttribute('xmlns') === 'http://www.w3.org/1999/xhtml') {
                    retval = 'xhtml5';
                }
            }
        }

        return retval;
    };//end getDocumentType()

    /**
     * Get the window object relating to the passed element.
     *
     * @param {Node|Document} element The element (or document) to pass.
     *
     * @returns {Window}
     */
    self.getElementWindow = function(element)
    {
        if (element.ownerDocument) {
            var doc = element.ownerDocument;
        } else {
            var doc = element;
        }

        var window = null;
        if (doc.defaultView) {
            window = doc.defaultView;
        } else {
            window = doc.parentWindow;
        }

        return window;

    };

    /**
     * Returns true if the element has a valid aria label.
     *
     * @param {Node} element The element we are checking.
     *
     * @return {Boolean}
     */
    self.hasValidAriaLabel = function(element)
    {
        var found = false;
        if (element.hasAttribute('aria-labelledby') === true) {
            // Checking aria-labelled by where the label exists AND it has text available
            // to an accessibility API.
            var labelledByIds = element.getAttribute('aria-labelledby').split(/\s+/);
            labelledByIds.forEach(function(id) {
                var elem = document.getElementById(id);
                if (elem) {
                    var text = self.getElementTextContent(elem);
                    if (/^\s*$/.test(text) === false) {
                        found = true;
                    }
                }
            });
        } else if (element.hasAttribute('aria-label') === true) {
            var text = element.getAttribute('aria-label');
            if (/^\s*$/.test(text) === false) {
                found = true;
            }
        }

        return found;
    };

    /**
     * Return the appropriate computed style object for an element.
     *
     * It's accessed in different ways depending on whether it's IE or not.
     *
     * @param {Node} element An element with style.
     *
     * @returns {Object}
     */
    self.style = function(element, pseudo) {
        var computedStyle = null;
        var window        = self.getElementWindow(element);
        var pseudo        = pseudo || null;

        if (element.currentStyle) {
            computedStyle = element.currentStyle;
        } else if (window.getComputedStyle) {
            computedStyle = window.getComputedStyle(element, pseudo);
        }

        return computedStyle;
    };

    /**
     * Return true if an element is hidden visually.
     *
     * If the computed style of an element cannot be determined for some reason,
     * it is presumed it is NOT hidden.
     *
     * @param {Node} element The element that is hiding, or not.
     *
     * @returns {Boolean}
     */
    self.isVisuallyHidden = function(element) {
        var hidden = false;

        // Handle titles in svg as a special visually hidden case (hidden by browsers but
        // available to accessibility apis.
        if (element.nodeName.toLowerCase() === 'title' && self.findParentNode(element, 'svg') !== null) {
            return true;
        }

        // Do not point to elem if its hidden. Use computed styles.
        var style = self.style(element);
        if (style !== null) {
            if ((style.visibility === 'hidden') || (style.display === 'none')) {
                hidden = true;
            }

            if ((parseInt(style.left, 10) + parseInt(style.width, 10)) < 0) {
                hidden = true;
            }

            if ((parseInt(style.top, 10) + parseInt(style.height, 10)) < 0) {
                hidden = true;
            }
        }

        return hidden;
    };

    /**
     * Returns true if the element is deliberately hidden from Accessibility APIs using ARIA hidden.
     *
     * Not: This is separate to isAccessibilityHidden() due to a need to check specifically for aria hidden.
     *
     * @param {Node} element The element to check.
     *
     * @return {Boolean}
     */
    self.isAriaHidden = function(element) {
        do {
            // WAI-ARIA hidden attribute.
            if (element.hasAttribute('aria-hidden') && element.getAttribute('aria-hidden') === 'true') {
                return true;
            }
        } while (element = element.parentElement);

        return false;
    };


    /**
     * Returns true if the element is deliberately hidden from Accessibility APIs.
     *
     * @param {Node} element The element to check.
     *
     * @return {Boolean}
     */
    self.isAccessibilityHidden = function(element) {
        do {
            // WAI-ARIA presentation role.
            if (element.hasAttribute('role') && element.getAttribute('role') === 'presentation') {
                return true;
            }

            // WAI-ARIA hidden attribute.
            if (element.hasAttribute('aria-hidden') && element.getAttribute('aria-hidden') === 'true') {
                return true;
            }
        } while (element = element.parentElement);

        return false;
    };


    /**
     * Returns TRUE if the element is able to be focused .
     *
     * @param {Node} element DOM Node to test.
     *
     * @return {Boolean}
     */
    self.isFocusable = function(element)
    {
        var nodeName = element.nodeName.toLowerCase();
        if (self.isDisabled(element) === true) {
            return false;
        }

        if (self.isVisuallyHidden(element) === true) {
            return false;
        }

        // Form elements.
        if (/^(input|select|textarea|button|object)$/.test(nodeName)) {
            return true;
        }

        // Hyperlinks without empty hrefs are focusable.
        if (nodeName === 'a' && element.hasAttribute('href') && /^\s*$/.test(element.getAttribute('href')) === false) {
            return true;
        }

        return false;
    };

    /**
     * Returns TRUE if the element is able to be focused by keyboard tabbing.
     *
     * @param {Node} element DOM Node to test.
     *
     * @return {Boolean}
     */
    self.isKeyboardTabbable = function(element)
    {
        if (element.hasAttribute('tabindex') === true) {
            var index = element.getAttribute('tabindex');
            if (index === "-1") {
                return false;
            } else {
                return true;
            }
        }

        return self.isFocusable(element);
    };

    /**
     * Returns TRUE if the element is able to be accessed via the keyboard.
     *
     * @param {Node} element DOM Node to test.
     *
     * @return {Boolean}
     */
    self.isKeyboardNavigable = function(element)
    {
        if (element.hasAttribute('accesskey') && /^\s*$/.test(element.getAttribute('accesskey')) === false) {
            return true;
        }

        return self.isKeyboardTabbable(element);
    };

    /**
     * Return true if an element is disabled.
     *
     * If the computed style of an element cannot be determined for some reason,
     * it is presumed it is NOT hidden.
     *
     * @param {Node} element The element that is hiding, or not.
     *
     * @returns {Boolean}
     */
    self.isDisabled = function(element) {
        var disabled = false;

        // Do not point to elem if its hidden. Use computed styles.
        if ((element.disabled === true) || (element.getAttribute('aria-disabled') === 'true')) {
            disabled = true;
        }

        return disabled;
    };

    /**
     * Return true if an element is in a document.
     *
     * @param {Node} element The element that is in a doc, or not.
     *
     * @returns {Boolean}
     */
    self.isInDocument = function(element) {
        // Check whether the element is in the document, by looking up its
        // DOM tree for a document object.
        var parent = element.parentNode;
        while (parent && parent.ownerDocument) {
            parent = parent.parentNode;
        }//end while

        // If we didn't hit a document, the element must not be in there.
        if (parent === null) {
            return false;
        }

        return true;
    };

    /**
     * Returns all elements that are visible to the accessibility API.
     *
     * @param {Node}   element  The parent element to search.
     * @param {String} selector Optional selector to pass to
     *
     * @return {Array}
     */
    self.getAllElements = function(element, selector) {
        element      = element || document;
        selector     = selector || '*';
        var elements = Array.prototype.slice.call(element.querySelectorAll(selector));
        var visible  = elements.filter(function(elem) {
            return HTMLCS.util.isAccessibilityHidden(elem) === false;
        });

        // We shouldn't be testing elements inside the injected auditor code if it's present.
        var auditor = document.getElementById('HTMLCS-wrapper');
        if (auditor) {
            visible = visible.filter(function(elem) {
                return auditor.contains(elem) === false;
            });
        }

        return visible;
    };

    /**
     * Returns true if the passed child is contained by the passed parent.
     *
     * Uses either the IE contains() method or the W3C compareDocumentPosition()
     * method, as appropriate.
     *
     * @param {Node|Document} parent The parent element or document.
     * @param {Node|Document} child  The child.
     *
     * @returns {Boolean}
     */
    self.contains = function(parent, child) {
        var contained = false;

        // If the parent and the child are the same, they can't contain each
        // other.
        if (parent !== child) {
            if (!parent.ownerDocument) {
                // Parent is the document. Short-circuiting because contains()
                // doesn't exist on the document element.
                // We check whether the child can be contained, and whether the
                // child is in the same document as the parent.
                if ((child.ownerDocument) && (child.ownerDocument === parent)) {
                    contained = true;
                }
            } else {
                if ((parent.contains) && (parent.contains(child) === true)) {
                    contained = true;
                } else if ((parent.compareDocumentPosition) && ((parent.compareDocumentPosition(child) & 16) > 0)) {
                    contained = true;
                }
            }//end if
        }//end if

        return contained;
    };

    /**
     * Returns true if the table passed is a layout table.
     *
     * If the passed table contains headings - through the use of the th
     * element - HTML_CodeSniffer will assume it is a data table. This is in line
     * with most other online checkers.
     *
     * @param {Node} table The table to check.
     *
     * @returns {Boolean}
     */
    self.isLayoutTable = function(table) {
        var th = table.querySelector('th');
        if (th === null) {
            return true;
        }

        return false;
    };

    /**
     * Calculate the contrast ratio between two colours.
     *
     * Colours should be in rgb() or 3/6-digit hex format; order does not matter
     * (ie. it doesn't matter which is the lighter and which is the darker).
     * Values should be in the range [1.0, 21.0]... a ratio of 1.0 means "they're
     * exactly the same contrast", 21.0 means it's white-on-black or v.v.
     * Formula as per WCAG 2.0 definitions.
     *
     * @param {String} colour1 The first colour to compare.
     * @param {String} colour2 The second colour to compare.
     *
     * @returns {Number}
     */
    self.contrastRatio = function(colour1, colour2) {
        var ratio = (0.05 + self.relativeLum(colour1)) / (0.05 + self.relativeLum(colour2));
        if (ratio < 1) {
            ratio = 1 / ratio;
        }

        return ratio;
    };

    /**
     * Calculate relative luminescence for a colour in the sRGB colour profile.
     *
     * Supports rgb() and hex colours. rgba() also supported but the alpha
     * channel is currently ignored.
     * Hex colours can have an optional "#" at the front, which is stripped.
     * Relative luminescence formula is defined in the definitions of WCAG 2.0.
     * It can be either three or six hex digits, as per CSS conventions.
     * It should return a value in the range [0.0, 1.0].
     *
     * @param {String} colour The colour to calculate from.
     *
     * @returns {Number}
     */
    self.relativeLum = function(colour) {
        if (colour.charAt) {
            var colour = self.colourStrToRGB(colour);
        }

        var transformed = {};
        for (var x in colour) {
            if (colour[x] <= 0.03928) {
                transformed[x] = colour[x] / 12.92;
            } else {
                transformed[x] = Math.pow(((colour[x] + 0.055) / 1.055), 2.4);
            }
        }//end for

        var lum = ((transformed.red * 0.2126) + (transformed.green * 0.7152) + (transformed.blue * 0.0722));
        return lum;
    };

    /**
     * Convert a colour string to a structure with red/green/blue/alpha elements.
     *
     * Supports rgb() and hex colours (3, 4, 6 or 8 hex digits, optional "#").
     * Each red/green/blue element is in the range [0.0, 1.0].
     *
     * @param {String} colour The colour to convert.
     *
     * @returns {Object}
     */
    self.colourStrToRGB = function(colour) {
        colour = colour.toLowerCase();

        if (colour.substring(0, 3) === 'rgb') {
            // rgb[a](0, 0, 0[, 0]) format.
            var matches = /^rgba?\s*\((\d+),\s*(\d+),\s*(\d+)([^)]*)\)$/.exec(colour);
            colour = {
                red: (matches[1] / 255),
                green: (matches[2] / 255),
                blue: (matches[3] / 255),
                alpha: 1.0
            };
            if (matches[4]) {
                colour.alpha = parseFloat(/^,\s*(.*)$/.exec(matches[4])[1]);
            }
        } else {
            // Hex digit format.
            if (colour.charAt(0) === '#') {
                colour = colour.substr(1);
            }

            if (colour.length === 3) {
                colour = colour.replace(/^(.)(.)(.)$/, '$1$1$2$2$3$3');
            }

            if (colour.length === 4) {
                colour = colour.replace(/^(.)(.)(.)(.)$/, '$1$1$2$2$3$3$4$4');
            }

            var alpha = 1; // Default if alpha is not specified
            if (colour.length === 8) {
                alpha = parseInt(colour.substr(6, 2), 16) / 255;
            }

            colour = {
                red: (parseInt(colour.substr(0, 2), 16) / 255),
                green: (parseInt(colour.substr(2, 2), 16) / 255),
                blue: (parseInt(colour.substr(4, 2), 16) / 255),
                alpha: alpha,
            };
        }

        return colour;
    };

    /**
     * Convert an RGB colour structure to a hex colour.
     *
     * The red/green/blue colour elements should be on a [0.0, 1.0] scale.
     * Colours that can be converted into a three Hex-digit string will be
     * converted as such (eg. rgb(34,34,34) => #222). Others will be converted
     * to a six-digit string (eg. rgb(48,48,48) => #303030).
     *
     * @param {Object} colour Structure with "red", "green" and "blue" elements.
     *
     * @returns {String}
     */
    self.RGBtoColourStr = function(colour) {
        colourStr = '#';
        colour.red   = Math.round(colour.red * 255);
        colour.green = Math.round(colour.green * 255);
        colour.blue  = Math.round(colour.blue * 255);

        if ((colour.red % 17 === 0) && (colour.green % 17 === 0) && (colour.blue % 17 === 0)) {
            // Reducible to three hex digits.
            colourStr += (colour.red / 17).toString(16);
            colourStr += (colour.green / 17).toString(16);
            colourStr += (colour.blue / 17).toString(16);
        } else {
            if (colour.red < 16) {
                colourStr += '0';
            }
            colourStr += colour.red.toString(16);

            if (colour.green < 16) {
                colourStr += '0';
            }
            colourStr += colour.green.toString(16);

            if (colour.blue < 16) {
                colourStr += '0';
            }
            colourStr += colour.blue.toString(16);
        }

        return colourStr;
    };

    /**
     * Convert an RGB colour into hue-saturation-value.
     *
     * This is used for calculations changing the colour (for colour contrast
     * purposes) to ensure that the hue is maintained.
     * The parameter accepts either a string (hex or rgb() format) or a
     * red/green/blue structure.
     * The returned structure has hue, saturation, and value components: the
     * latter two are in the range [0.0, 1.0]; hue is in degrees,
     * range [0.0, 360.0).
     * If there is no saturation then hue is technically undefined.
     *
     * @param {String|Object} colour A colour to convert.
     *
     * @returns {Object}
     */
    self.sRGBtoHSV = function(colour) {
        // If this is a string, then convert to a colour structure.
        if (colour.charAt) {
            colour = self.colourStrToRGB(colour);
        }

        var hsvColour = {
            hue: 0,
            saturation: 0,
            value: 0
        };

        var maxColour = Math.max(colour.red, colour.green, colour.blue);
        var minColour = Math.min(colour.red, colour.green, colour.blue);
        var chroma    = maxColour - minColour;

        if (chroma === 0) {
            hsvColour.value = colour.red;
        } else {
            hsvColour.value = maxColour;
            if (maxColour === colour.red) {
                hsvColour.hue = ((colour.green - colour.blue) / chroma);
            } else if (maxColour === colour.green) {
                hsvColour.hue = (2.0 + ((colour.blue - colour.red) / chroma));
            } else {
                hsvColour.hue = (4.0 + ((colour.red - colour.green) / chroma));
            }//end if

            hsvColour.hue = (hsvColour.hue * 60.0);
            if (hsvColour.hue >= 360.0) {
                hsvColour.hue -= 360.0;
            }

            hsvColour.saturation = chroma / hsvColour.value;
        }//end if

        return hsvColour;
    };

    /**
     * Convert a hue-saturation-value structure into an RGB structure.
     *
     * The hue element should be a degree value in the region of [0.0, 360.0).
     * The saturation and value elements should be in the range [0.0, 1.0].
     * Use RGBtoColourStr to convert back into a hex colour.
     *
     * @param {Object} hsvColour A HSV structure to convert.
     *
     * @returns {Object}
     */
    self.HSVtosRGB = function(hsvColour) {
        var colour = {
            red: 0,
            green: 0,
            blue: 0
        };

        if (hsvColour.saturation === 0) {
            colour.red = hsvColour.value;
            colour.green = hsvColour.value;
            colour.blue = hsvColour.value;
        } else {
            var chroma      = hsvColour.value * hsvColour.saturation;
            var minColour   = hsvColour.value - chroma;
            var interHue    = hsvColour.hue / 60.0;
            var interHueMod = interHue - 2 * (Math.floor(interHue / 2));
            var interCol    = chroma * (1 - Math.abs(interHueMod - 1));

            switch(Math.floor(interHue)) {
            case 0:
                colour.red   = chroma;
                colour.green = interCol;
                break;

            case 1:
                colour.green = chroma;
                colour.red   = interCol;
                break;

            case 2:
                colour.green = chroma;
                colour.blue  = interCol;
                break;

            case 3:
                colour.blue  = chroma;
                colour.green = interCol;
                break;

            case 4:
                colour.blue = chroma;
                colour.red  = interCol;
                break;

            case 5:
                colour.red  = chroma;
                colour.blue = interCol;
                break;
            }//end switch

            colour.red   = (colour.red + minColour);
            colour.green = (colour.green + minColour);
            colour.blue  = (colour.blue + minColour);
        }//end if

        return colour;
    };

    /**
     * Gets the text contents of an element.
     *
     * @param {Node}    element           The element being inspected.
     * @param {Boolean} [includeAlt=true] Include alt text from images.
     *
     * @returns {String} The text contents.
     */
    self.getElementTextContent = function(element, includeAlt)
    {
        if (includeAlt === undefined) {
            includeAlt = true;
        }

        var element = element.cloneNode(true);
        var nodes  = [];
        for (var i = 0; i < element.childNodes.length; i++) {
            nodes.push(element.childNodes[i]);
        }

        var text = [element.textContent];
        while (nodes.length > 0) {
            var node = nodes.shift();

            // If it's an element, add any sub-nodes to the process list.
            if (node.nodeType === 1) {
                if (node.nodeName.toLowerCase() === 'img') {
                    // If an image, include the alt text unless we are blocking it.
                    if ((includeAlt === true) && (node.hasAttribute('alt') === true)) {
                        text.push(node.getAttribute('alt'));
                    }
                } else {
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
    };


    /**
     * Find a parent node matching a selector.
     *
     * @param {DOMNode} node     Node to search from.
     * @param {String}  selector The selector to search.
     *
     * @return DOMNode|null
     */
    self.findParentNode = function(node, selector) {
        if (node && node.matches && node.matches(selector)) {
            return node;
        }

        while (node && node.parentNode) {
            node = node.parentNode;

            if (node && node.matches && node.matches(selector)) {
                return node;
            }
        }

        return null;
    };


    /**
     * Iterate parent nodes of an element.
     *
     * @param {DOMNode}  node Node to search from.
     * @param {Function} cb    Callback function providing each parent node.
     *
     * @return void
     */
    self.eachParentNode = function(node, cb) {
        while (node && node.parentNode) {
            cb(node);
            node = node.parentNode;
        }
    };


    /**
     * Returns TRUE if the provided node name is not a valid phrasing node.
     *
     * @param {String} nodeName The node name to test.
     *
     * @return {Boolean}
     */
    self.isPhrasingNode = function(nodeName) {
        var nodeNames = [ 'abbr', 'audio', 'b', 'bdo', 'br', 'button', 'canvas', 'cite', 'code', 'command', 'data',
            'datalist', 'dfn', 'em', 'embed', 'i', 'iframe', 'img', 'input', 'kbd', 'keygen', 'label', 'mark', 'math',
            'meter', 'noscript', 'object', 'output', 'progress', 'q', 'ruby', 'samp', 'script', 'select', 'small',
            'span', 'strong', 'sub', 'sup', 'svg', 'textarea', 'time', 'var', 'video', 'wbr'];

        return nodeNames.indexOf(nodeName.toLowerCase()) !== -1;
    };


    self.getChildrenForTable = function(table, childNodeName)
    {
        if (table.nodeName.toLowerCase() !== 'table') {
            return null;
        }

        var rows    = [];
        var allRows = table.getElementsByTagName(childNodeName);

        // Filter out rows that don't belong to this table.
        for (var i = 0, l = allRows.length; i<l; i++) {
            if (self.findParentNode(allRows[i], 'table') === table) {
                rows.push(allRows[i]);
            }
        }

        return rows;

    };


    /**
     * Test for the correct headers attributes on table cell elements.
     *
     * Return value contains the following elements:
     * - required (Boolean):   Whether header association at all is required.
     * - used (Boolean):       Whether headers attribute has been used on at least
     *                         one table data (td) cell.
     * - allowScope (Boolean): Whether scope is allowed to satisfy the association
     *                         requirement (ie. max one row/one column).
     * - correct (Boolean):    Whether headers have been correctly used.
     * - missingThId (Array):  Array of th elements without IDs.
     * - missingTd (Array):    Array of elements without headers attribute.
     * - wrongHeaders (Array): Array of elements where headers attr is incorrect.
     *                         Each is a structure with following keys: element,
     *                         expected [headers attr], actual [headers attr].
     *
     * @param {DOMNode} element Table element to test upon.
     *
     * @return {Object} The above return value structure.
     */
    self.testTableHeaders = function(element)
    {
        var retval = {
            required: true,
            used: false,
            correct: true,
            allowScope: true,
            missingThId: [],
            missingTd: [],
            wrongHeaders: []
        };

        var rows      = self.getChildrenForTable(element, 'tr');
        var tdCells   = {};
        var skipCells = [];

        // Header IDs already used.
        var headerIds = {
            rows: [],
            cols: []
        };
        var multiHeaders = {
            rows: 0,
            cols: 0
        };
        var missingIds = false;

        for (var rownum = 0; rownum < rows.length; rownum++) {
            var row    = rows[rownum];
            var colnum = 0;

            for (var item = 0; item < row.childNodes.length; item++) {
                var cell = row.childNodes[item];
                if (cell.nodeType === 1) {
                    // Skip columns that are skipped due to rowspan.
                    if (skipCells[rownum]) {
                        while (skipCells[rownum][0] === colnum) {
                            skipCells[rownum].shift();
                            colnum++;
                        }
                    }

                    var nodeName = cell.nodeName.toLowerCase();
                    var rowspan  = Number(cell.getAttribute('rowspan')) || 1;
                    var colspan  = Number(cell.getAttribute('colspan')) || 1;

                    // If rowspanned, mark columns as skippable in the following
                    // row(s).
                    if (rowspan > 1) {
                        for (var i = rownum + 1; i < rownum + rowspan; i++) {
                            if (!skipCells[i]) {
                                skipCells[i] = [];
                            }

                            for (var j = colnum; j < colnum + colspan; j++) {
                                skipCells[i].push(j);
                            }
                        }
                    }

                    if (nodeName === 'th') {
                        var id = (cell.getAttribute('id') || '');

                        // Save the fact that we have a missing ID on the header.
                        if (id === '') {
                            retval.correct = false;
                            retval.missingThId.push(cell);
                        }

                        if ((rowspan > 1) && (colspan > 1)) {
                            // Multi-column AND multi-row header. Abandon all hope,
                            // As it must span across more than one row+column
                            retval.allowScope = false;
                        } else if (retval.allowScope === true) {
                            // If we haven't had a th in this column (row) yet,
                            // record it. if we find another th in this column (row),
                            // record that has multi-ths. If we already have a column
                            // (row) with multi-ths, we cannot use scope.
                            if (headerIds.cols[colnum] === undefined) {
                                headerIds.cols[colnum] = 0;
                            }

                            if (headerIds.rows[rownum] === undefined) {
                                headerIds.rows[rownum] = 0;
                            }

                            headerIds.rows[rownum] += colspan;
                            headerIds.cols[colnum] += rowspan;
                        }//end if
                    } else if ((nodeName === 'td')) {
                        if ((cell.hasAttribute('headers') === true) && (/^\s*$/.test(cell.getAttribute('headers')) === false)) {
                            retval.used = true;
                        }
                    }//end if

                    colnum += colspan;
                }//end if
            }//end for
        }//end for

        for (var i = 0; i < headerIds.rows.length; i++) {
            if (headerIds.rows[i] > 1) {
                multiHeaders.rows++;
            }
        }

        for (var i = 0; i < headerIds.cols.length; i++) {
            if (headerIds.cols[i] > 1) {
                multiHeaders.cols++;
            }
        }

        if ((multiHeaders.rows > 1) || (multiHeaders.cols > 1)) {
            retval.allowScope = false;
        } else if ((retval.allowScope === true) && ((multiHeaders.rows === 0) || (multiHeaders.cols === 0))) {
            // If only one column OR one row header.
            retval.required = false;
        }//end if

        // Calculate expected heading IDs. If they are not there or incorrect, flag
        // them.
        var cells = HTMLCS.util.getCellHeaders(element);
        for (var i = 0; i < cells.length; i++) {
            var cell     = cells[i].cell;
            var expected = cells[i].headers;

            if (cell.hasAttribute('headers') === false) {
                retval.correct = false;
                retval.missingTd.push(cell);
            } else {
                var actual = (cell.getAttribute('headers') || '').split(/\s+/);
                if (actual.length === 0) {
                    retval.correct = false;
                    retval.missingTd.push(cell);
                } else {
                    actual = ' ' + actual.sort().join(' ') + ' ';
                    actual = actual.replace(/\s+/g, ' ').replace(/(\w+\s)\1+/g, '$1').replace(/^\s*(.*?)\s*$/g, '$1');
                    if (expected !== actual) {
                        retval.correct = false;
                        var val = {
                            element: cell,
                            expected: expected,
                            actual: (cell.getAttribute('headers') || '')
                        };
                        retval.wrongHeaders.push(val);
                    }
                }//end if
            }//end if
        }//end for

        return retval;
    };

    /**
     * Return expected cell headers from a table.
     *
     * Returns null if not a table.
     *
     * Returns an array of objects with two properties:
     * - cell (Object) - the TD element referred to,
     * - headers (String) - the normalised list of expected headers.
     *
     * Cells are returned in DOM order. This may mean cells in a tfoot (which
     * normally precedes tbody if used) would come before tbody cells.
     *
     * If there are missing IDs on relevant table header (th) elements, this
     * method won't complain about it - it will just return them as empty. Its
     * job is to take the IDs it can get, not to complain about it (see, eg. the
     * test in WCAG2's sniff 1_3_1). If there are no headers for a cell, it
     * won't be included.
     *
     * @param {Object} table The table to test.
     *
     * @returns {Array}
     */
    self.getCellHeaders = function(table) {
        if (typeof table !== 'object') {
            return null;
        } else if (table.nodeName.toLowerCase() !== 'table') {
            return null;
        }


        var rows       = self.getChildrenForTable(table, 'tr');
        var skipCells  = [];
        var headingIds = {
            rows: {},
            cols: {}
        };

        // List of cells and headers. Each item should be a two-property object:
        // a "cell" object, and a normalised string of "headers".
        var cells = [];

        // Now determine the row and column headers for the table.
        // Go through once, first finding the th's to load up the header names,
        // then finding the td's to dump them off.
        var targetNodeNames = ['th', 'td'];
        for (var k = 0; k < targetNodeNames.length; k++) {
            var targetNode = targetNodeNames[k];
            for (var rownum = 0; rownum < rows.length; rownum++) {
                var row    = rows[rownum];
                var colnum = 0;

                for (var item = 0; item < row.childNodes.length; item++) {
                    var thisCell = row.childNodes[item];
                    if (thisCell.nodeType === 1) {
                        // Skip columns that are skipped due to rowspan.
                        if (skipCells[rownum]) {
                            while (skipCells[rownum][colnum]) {
                                colnum++;
                            }
                        }

                        var nodeName = thisCell.nodeName.toLowerCase();
                        var rowspan  = Number(thisCell.getAttribute('rowspan')) || 1;
                        var colspan  = Number(thisCell.getAttribute('colspan')) || 1;

                        // If rowspanned, mark columns as skippable in the following
                        // row(s).
                        if (rowspan > 1) {
                            for (var i = rownum + 1; i < rownum + rowspan; i++) {
                                if (!skipCells[i]) {
                                    skipCells[i] = [];
                                }

                                for (var j = colnum; j < colnum + colspan; j++) {
                                    skipCells[i][j] = true;
                                }
                            }
                        }

                        if (nodeName === targetNode) {
                            if (nodeName === 'th') {
                                // Build up the cell headers.
                                var id = (thisCell.getAttribute('id') || '');

                                for (var i = rownum; i < rownum + rowspan; i++) {
                                    headingIds.rows[i] = headingIds.rows[i] || {
                                        first: colnum,
                                        ids: []
                                    };
                                    headingIds.rows[i].ids.push(id);
                                }

                                for (var i = colnum; i < colnum + colspan; i++) {
                                    headingIds.cols[i] = headingIds.cols[i] || {
                                        first: rownum,
                                        ids: []
                                    };
                                    headingIds.cols[i].ids.push(id);
                                }
                            } else if (nodeName === 'td') {
                                // Dump out the headers and cells.
                                var exp = [];
                                for (var i = rownum; i < rownum + rowspan; i++) {
                                    for (var j = colnum; j < colnum + colspan; j++) {
                                        if ((headingIds.rows[i]) && (j >= headingIds.rows[i].first)) {
                                            exp = exp.concat(headingIds.rows[i].ids);
                                        }

                                        if ((headingIds.cols[j]) && (i >= headingIds.cols[j].first)) {
                                            exp = exp.concat(headingIds.cols[j].ids);
                                        }
                                    }//end for
                                }//end for

                                if (exp.length > 0) {
                                    // Sort and filter expected ids by unique value.
                                    var filteredExp = exp.sort().filter(function(value, index, self) {
                                        return self.indexOf(value) === index;
                                    });
                                    exp = ' ' + filteredExp.join(' ') + ' ';
                                    exp = exp.replace(/\s+/g, ' ').replace(/(\w+\s)\1+/g, '$1').replace(/^\s*(.*?)\s*$/g, '$1');
                                    cells.push({
                                        cell: thisCell,
                                        headers: exp
                                    });
                                }
                            }
                        }

                        colnum += colspan;
                    }//end if
                }//end for
            }//end for
        }//end for

        // Build the column and row headers that we expect.
        return cells;
    };

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
    self.getPreviousSiblingElement = function(element, tagName, immediate) {
        if (tagName === undefined) {
            tagName = null;
        }

        if (immediate === undefined) {
            immediate = false;
        }

        var prevNode = element.previousSibling;
        while (prevNode !== null) {
            if (prevNode.nodeType === 3) {
                if ((HTMLCS.util.isStringEmpty(prevNode.nodeValue) === false) && (immediate === true)) {
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
    };

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
    self.getNextSiblingElement = function(element, tagName, immediate) {
        if (tagName === undefined) {
            tagName = null;
        }

        if (immediate === undefined) {
            immediate = false;
        }

        var nextNode = element.nextSibling;
        while (nextNode !== null) {
            if (nextNode.nodeType === 3) {
                if ((HTMLCS.util.isStringEmpty(nextNode.nodeValue) === false) && (immediate === true)) {
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
    };


    /**
     * Get the text content of a DOM node.
     * 
     * @param {DOMNode} element           Element to process.
     * 
     * @returns {String} The text content.
     */
    self.getTextContent = function(element) {
        if (element.textContent !== undefined) {
            return element.textContent;
        } else {
            return element.innerText;
        }
    };


    /**
     * Get the accessible name.
     *
     * @param {DOMNode} element Element to process.
     * @param {DOMNode} top     Scoped container element.
     *
     * @returns {String} The accessible name.
     */
    self.getAccessibleName = function(element, top) {
        // See https://www.w3.org/TR/accname-1.1/#terminology
        if (self.isVisuallyHidden(element)) {
            return '';
        }
        else if (element.getAttribute("aria-labelledby")) {
            var nameParts = [];
            var parts = element.getAttribute("aria-labelledby").split(" ");
            for (var i = 0; i < parts.length; i++) {
                var x = parts[i];
                var nameElement = top.getElementById(x);
                if (nameElement) {
                    nameParts.push(nameElement.textContent);
                }
            }
            return nameParts.join(" ");
        } else if (element.getAttribute("aria-label")) {
            return element.getAttribute("aria-label");
        } else if (element.getAttribute("title")) {
            if (
                element.getAttribute("role") !== "presentation" &&
                element.getAttribute("role") !== "none"
            ) {
                return element.getAttribute("aria-label");
            }
        }
        // Give up - we only test the 3 most obvious cases.
        return "";
    };

    return self;
}();
