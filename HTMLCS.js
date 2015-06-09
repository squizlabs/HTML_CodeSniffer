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

var HTMLCS = new function()
{
    var _standards    = {};
    var _sniffs       = [];
    var _tags         = {};
    var _standard     = null;
    var _currentSniff = null;

    var _messages     = [];
    var _msgOverrides = {};

    /*
        Message type constants.
    */
    this.ERROR   = 1;
    this.WARNING = 2;
    this.NOTICE  = 3;

    /**
     * Loads the specified standard and run the sniffs.
     *
     * @param {String}      standard The name of the standard to load.
     * @param {String|Node} An HTML string or a DOM node object.
     * @param {Function}    The function that will be called when the testing is completed.
     */
    this.process = function(standard, content, callback, failCallback) {
        // Clear previous runs.
        _standards    = {};
        _sniffs       = [];
        _tags         = {};
        _standard     = null;

        if (!content) {
            return false;
        }

        if (_standards[_getStandardPath(standard)]) {
            HTMLCS.run(callback, content);
        } else {
            this.loadStandard(standard, function() {
                HTMLCS.run(callback, content);
            }, failCallback);
        }
    };

    /**
     * Loads the specified standard and its sniffs.
     *
     * @param {String}   standard The name of the standard to load.
     * @param {Function} callback The function to call once the standard is loaded.
     */
    this.loadStandard = function(standard, callback, failCallback) {
        if (!standard) {
            return false;
        }

        _includeStandard(standard, function() {
            _standard = standard;
            callback.call(this);
        }, failCallback);
    };

    /**
     * Runs the sniffs for the loaded standard.
     *
     * @param {Function}    callback The function to call once all sniffs are completed.
     * @param {String|Node} content  An HTML string or a DOM node object.
     */
    this.run = function(callback, content) {
        var element      = null;
        var loadingFrame = false;
        if (typeof content === 'string') {
            loadingFrame = true;
            var elementFrame = document.createElement('iframe');
            elementFrame.style.display = 'none';
            elementFrame = document.body.insertBefore(elementFrame, null);

            if (elementFrame.contentDocument) {
                element = elementFrame.contentDocument;
            } else if (element.contentWindow) {
                element = elementFrame.contentWindow.document;
            }

            elementFrame.load = function() {
                this.onreadystatechange = null;
                this.onload = null;

                if (HTMLCS.isFullDoc(content) === false) {
                    element = element.getElementsByTagName('body')[0];
                    var div = element.getElementsByTagName('div')[0];
                    if (div && (div.id === '__HTMLCS-source-wrap')) {
                        div.id  = '';
                        element = div;
                    }
                }

                var elements = _getAllTags(element);
                elements.unshift(element);
                _run(elements, element, callback);
            }

            // Satisfy IE which doesn't like onload being set dynamically.
            elementFrame.onreadystatechange = function() {
                if (/^(complete|loaded)$/.test(this.readyState) === true) {
                    this.onreadystatechange = null;
                    this.load();
                }
            }

            elementFrame.onload = elementFrame.load;

            if ((HTMLCS.isFullDoc(content) === false) && (content.indexOf('<body') === -1)) {
                element.write('<div id="__HTMLCS-source-wrap">' + content + '</div>');
            } else {
                element.write(content);
            }

            element.close();
        } else {
            element = content;
        }

        if (!element) {
            callback.call(this);
            return;
        }

        callback  = callback || function() {};
        _messages = [];

        // Get all the elements in the parent element.
        // Add the parent element too, which will trigger "_top" element codes.
        var elements = _getAllTags(element);
        elements.unshift(element);

        // Run the sniffs.
        if (loadingFrame === false) {
            _run(elements, element, callback);
        }
    };

    /**
     * Returns true if the content passed appears to be from a full document.
     *
     * With string content, we consider a full document as the presence of <html>,
     * or <head> + <body> elements. For an element, only the 'html' element (the
     * document element) is accepted.
     *
     * @param {String|Node} content An HTML string or a DOM node object.
     *
     * @returns {Boolean}
     */
    this.isFullDoc = function(content) {
        var fullDoc = false;
        if (typeof content === 'string') {
            if (content.toLowerCase().indexOf('<html') !== -1) {
                fullDoc = true;
            } else if ((content.toLowerCase().indexOf('<head') !== -1) && (content.toLowerCase().indexOf('<body') !== -1)) {
                fullDoc = true;
            }
        } else {
            // If we are the document, or the document element.
            if ((content.nodeName.toLowerCase() === 'html') || (content.documentElement)) {
                fullDoc = true;
            }
        }

        return fullDoc;
    }

    /**
     * Adds a message.
     *
     * @param {Number}  type    The type of the message.
     * @param {Node}    element The element that the message is related to.
     * @param {String}  msg     The message string.
     * @param {String}  code    Unique code for the message.
     * @param {Object}  [data]  Extra data to store for the message.
     */
    this.addMessage = function(type, element, msg, code, data) {
        code = _getMessageCode(code);

        _messages.push({
            type: type,
            element: element,
            msg: _msgOverrides[code] || msg,
            code: code,
            data: data
        });
    };

    /**
     * Returns all the messages for the last run.
     *
     * Return a copy of the array so the class variable doesn't get modified by
     * future modification (eg. splicing).
     *
     * @returns {Array} Array of message objects.
     */
    this.getMessages = function() {
        return _messages.concat([]);
    };

    /**
     * Runs the sniffs in the loaded standard for the specified element.
     *
     * @param {Node}     element    The element to test.
     * @param {Node}     topElement The top element of the processing.
     * @param {Function} [callback] The function to call once all tests are run.
     */
    var _run = function(elements, topElement, callback) {
        var topMsgs = [];
        while (elements.length > 0) {
            var element = elements.shift();

            if (element === topElement) {
                var tagName = '_top';
            } else {
                var tagName = element.tagName.toLowerCase();
            }

            // First check whether any "top" messages need to be shifted off for this
            // element. If so, dump off into the main messages.
            for (var i = 0; i < topMsgs.length;) {
                if (element === topMsgs[i].element) {
                    _messages.push(topMsgs[i]);
                    topMsgs.splice(i, 1);
                } else {
                    i++;
                }
            }//end for

            if (_tags[tagName] && _tags[tagName].length > 0) {
                _processSniffs(element, _tags[tagName].concat([]), topElement);

                // Save "top" messages, and reset the messages array.
                if (tagName === '_top') {
                    topMsgs   = _messages;
                    _messages = [];
                }
            }
        }//end while

        if (callback instanceof Function === true) {
            callback.call(this);
        }
    };

    /**
     * Process the sniffs.
     *
     * @param {Node}     element    The element to test.
     * @param {Array}    sniffs     Array of sniffs.
     * @param {Node}     topElement The top element of the processing.
     * @param {Function} [callback] The function to call once the processing is completed.
     */
    var _processSniffs = function(element, sniffs, topElement, callback) {
        while (sniffs.length > 0) {
            var sniff     = sniffs.shift();
            _currentSniff = sniff;

            if (sniff.useCallback === true) {
                // If the useCallback property is set:
                // - Process the sniff.
                // - Recurse into ourselves with remaining sniffs, with no callback.
                // - Clear out the list of sniffs (so they aren't run again), so the
                //   callback (if not already recursed) can run afterwards.
                sniff.process(element, topElement, function() {
                    _processSniffs(element, sniffs, topElement);
                    sniffs = [];
                });
            } else {
                // Process the sniff.
                sniff.process(element, topElement);
            }
        }//end while

        if (callback instanceof Function === true) {
            callback.call(this);
        }
    };

    /**
     * Includes the specified standard file.
     *
     * @param {String}   standard The name of the standard.
     * @param {Function} callback The function to call once the standard is included.
     * @param {Object}   options  The options for the standard (e.g. exclude sniffs).
     */
    var _includeStandard = function(standard, callback, failCallback, options) {
        if (standard.indexOf('http') !== 0) {
            standard = _getStandardPath(standard);
        }//end id

        // See if the ruleset object is already included (eg. if minified).
        var parts   = standard.split('/');
        var ruleSet = window['HTMLCS_' + parts[(parts.length - 2)]];
        if (ruleSet) {
            // Already included.
            _registerStandard(standard, callback, failCallback, options);
        } else {
            _includeScript(standard, function() {
                // Script is included now register the standard.
                _registerStandard(standard, callback, failCallback, options);
            }, failCallback);
        }//end if
    };

    /**
     * Registers the specified standard and its sniffs.
     *
     * @param {String}   standard The name of the standard.
     * @param {Function} callback The function to call once the standard is registered.
     * @param {Object}   options  The options for the standard (e.g. exclude sniffs).
     */
    var _registerStandard = function(standard, callback, failCallback, options) {
        // Get the object name.
        var parts = standard.split('/');

        // Get a copy of the ruleset object.
        var oldRuleSet = window['HTMLCS_' + parts[(parts.length - 2)]];
        var ruleSet    = {};

        for (var x in oldRuleSet) {
            if (oldRuleSet.hasOwnProperty(x) === true) {
                ruleSet[x] = oldRuleSet[x];
            }
        }

        if (!ruleSet) {
            return false;
        }

        _standards[standard] = ruleSet;

        // Process the options.
        if (options) {
            if (options.include && options.include.length > 0) {
                // Included sniffs.
                ruleSet.sniffs = options.include;
            } else if (options.exclude) {
                // Excluded sniffs.
                for (var i = 0; i < options.exclude.length; i++) {
                    var index = ruleSet.sniffs.find(options.exclude[i]);
                    if (index >= 0) {
                        ruleSet.sniffs.splice(index, 1);
                    }
                }
            }
        }//end if

        // Register the sniffs for this standard.
        var sniffs = ruleSet.sniffs.slice(0, ruleSet.sniffs.length);
        _registerSniffs(standard, sniffs, callback, failCallback);
    };

    /**
     * Registers the sniffs for the specified standard.
     *
     * @param {String}   standard The name of the standard.
     * @param {Array}    sniffs   List of sniffs to register.
     * @param {Function} callback The function to call once the sniffs are registered.
     */
    var _registerSniffs = function(standard, sniffs, callback, failCallback) {
        if (sniffs.length === 0) {
            callback.call(this);
            return;
        }

        // Include and register sniffs.
        var sniff = sniffs.shift();
        _loadSniffFile(standard, sniff, function() {
            _registerSniffs(standard, sniffs, callback, failCallback);
        }, failCallback);
    };

    /**
     * Includes the sniff's JS file and registers it.
     *
     * @param {String}        standard The name of the standard.
     * @param {String|Object} sniff    The sniff to register, can be a string or
     *                                 and object specifying another standard.
     * @param {Function}      callback The function to call once the sniff is included and registered.
     */
    var _loadSniffFile = function(standard, sniff, callback, failCallback) {
        if (typeof sniff === 'string') {
            var sniffObj = _getSniff(standard, sniff);
            var cb       = function() {
                _registerSniff(standard, sniff);
                callback.call(this);
            }

            // Already loaded.
            if (sniffObj) {
                cb();
            } else {
                _includeScript(_getSniffPath(standard, sniff), cb, failCallback);
            }
        } else {
            // Including a whole other standard.
            _includeStandard(sniff.standard, function() {
                if (sniff.messages) {
                    // Add message overrides.
                    for (var msg in sniff.messages) {
                        _msgOverrides[msg] = sniff.messages[msg];
                    }
                }

                callback.call(this);
            }, failCallback, {
                exclude: sniff.exclude,
                include: sniff.include
            });
        }
    };

    /**
     * Registers the specified sniff.
     *
     * @param {String} standard The name of the standard.
     * @param {String} sniff    The name of the sniff.
     */
    var _registerSniff = function(standard, sniff) {
        // Get the sniff object.
        var sniffObj = _getSniff(standard, sniff);
        if (!sniffObj) {
            return false;
        }

        // Call the register method of the sniff, it should return an array of tags.
        if (sniffObj.register) {
            var watchedTags = sniffObj.register();
        }

        if (watchedTags && watchedTags.length > 0) {
            for (var i = 0; i < watchedTags.length; i++) {
                if (!_tags[watchedTags[i]]) {
                    _tags[watchedTags[i]] = [];
                }

                _tags[watchedTags[i]].push(sniffObj);
            }
        }

        _sniffs.push(sniffObj);
    };

    /**
     * Returns the path to the sniff file.
     *
     * @param {String} standard The name of the standard.
     * @param {String} sniff    The name of the sniff.
     *
     * @returns {String} The path to the JS file of the sniff.
     */
    var _getSniffPath = function(standard, sniff) {
        var parts = standard.split('/');
        parts.pop();
        var path = parts.join('/') + '/Sniffs/' + sniff.replace(/\./g, '/') + '.js';
        return path;
    };

    /**
     * Returns the path to a local standard.
     *
     * @param {String} standard The name of the standard.
     *
     * @returns {String} The path to the local standard.
     */
    var _getStandardPath = function(standard)
    {
        // Get the include path of a local standard.
        var scripts = document.getElementsByTagName('script');
        var path    = null;

        // Loop through all the script tags that exist in the document and find the one
        // that has included this file.
        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].src) {
                if (scripts[i].src.match(/HTMLCS\.js/)) {
                    // We have found our appropriate <script> tag that includes
                    // this file, we can extract the path.
                    path = scripts[i].src.replace(/HTMLCS\.js/,'');
                    break;
                }
            }
        }

        return path + 'Standards/' + standard + '/ruleset.js';

    };

    /**
     * Returns the sniff object.
     *
     * @param {String} standard The name of the standard.
     * @param {String} sniff    The name of the sniff.
     *
     * @returns {Object} The sniff object.
     */
    var _getSniff = function(standard, sniff) {
        var name = 'HTMLCS_';
        name    += _standards[standard].name + '_Sniffs_';
        name    += sniff.split('.').join('_');

        if (!window[name]) {
            return null;
        }

        window[name]._name = sniff;
        return window[name];
    };

    /**
     * Returns the full message code.
     *
     * A full message code includes the standard name, the sniff name and the given code.
     *
     * @returns {String} The full message code.
     */
    var _getMessageCode = function(code) {
        code = _standard + '.' + _currentSniff._name + '.' + code;
        return code;
    };

    /**
     * Includes the specified JS file.
     *
     * @param {String}   src      The URL to the JS file.
     * @param {Function} callback The function to call once the script is loaded.
     */
    var _includeScript = function(src, callback, failCallback) {
        var script    = document.createElement('script');
        script.onload = function() {
            script.onload = null;
            script.onreadystatechange = null;
            callback.call(this);
        };

        script.onerror = function() {
            script.onload = null;
            script.onreadystatechange = null;
            if (failCallback) {
                failCallback.call(this);
            }
        };

        script.onreadystatechange = function() {
            if (/^(complete|loaded)$/.test(this.readyState) === true) {
                script.onreadystatechange = null;
                script.onload();
            }
        }

        script.src = src;

        if (document.head) {
            document.head.appendChild(script);
        } else {
            document.getElementsByTagName('head')[0].appendChild(script);
        }
    };

    /**
     * Returns all the child elements in the given element.
     *
     * @param {Node|Document} [element=document] The parent element.
     *
     * @returns {Array} Array of Node objects.
     */
    var _getAllTags = function(element) {
        element      = element || document;
        var elements = element.getElementsByTagName('*');

        // Convert to array. We can't use array features on a NodeList.
        var elArray = [];
        for (var i = 0; i < elements.length; i++) {
            elArray.push(elements[i]);
        }

        return elArray;
    };

    this.util = new function() {
        /**
         * Trim off excess spaces on either side.
         *
         * @param {String} string The string with potentially extraneous whitespace.
         *
         * @returns {String}
         */
        this.trim = function(string) {
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
        this.isStringEmpty = function(string) {
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
         * Get the window object relating to the passed element.
         *
         * @param {Node|Document} element The element (or document) to pass.
         *
         * @returns {Window}
         */
        this.getElementWindow = function(element)
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
         * Return the appropriate computed style object for an element.
         *
         * It's accessed in different ways depending on whether it's IE or not.
         *
         * @param {Node} element An element with style.
         *
         * @returns {Object}
         */
        this.style = function(element) {
            var computedStyle = null;
            var window        = this.getElementWindow(element);

            if (element.currentStyle) {
                computedStyle = element.currentStyle;
            } else if (window.getComputedStyle) {
                computedStyle = window.getComputedStyle(element, null);
            }

            return computedStyle;
        };

        /**
         * Return true if an element is hidden.
         *
         * If the computed style of an element cannot be determined for some reason,
         * it is presumed it is NOT hidden.
         *
         * @param {Node} element The element that is hiding, or not.
         *
         * @returns {Boolean}
         */
        this.isHidden = function(element) {
            var hidden = false;

            // Do not point to elem if its hidden. Use computed styles.
            var style = this.style(element);
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
         * Return true if an element is disabled.
         *
         * If the computed style of an element cannot be determined for some reason,
         * it is presumed it is NOT hidden.
         *
         * @param {Node} element The element that is hiding, or not.
         *
         * @returns {Boolean}
         */
        this.isDisabled = function(element) {
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
        this.isInDocument = function(element) {
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
        this.contains = function(parent, child) {
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
        this.isLayoutTable = function(table) {
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
        this.contrastRatio = function(colour1, colour2) {
            var ratio = (0.05 + this.relativeLum(colour1)) / (0.05 + this.relativeLum(colour2));
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
        this.relativeLum = function(colour) {
            if (colour.charAt) {
                var colour = this.colourStrToRGB(colour);
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
        }

        /**
         * Convert a colour string to a structure with red/green/blue elements.
         *
         * Supports rgb() and hex colours (3 or 6 hex digits, optional "#").
         * rgba() also supported but the alpha channel is currently ignored.
         * Each red/green/blue element is in the range [0.0, 1.0].
         *
         * @param {String} colour The colour to convert.
         *
         * @returns {Object}
         */
        this.colourStrToRGB = function(colour) {
            colour = colour.toLowerCase();

            if (colour.substring(0, 3) === 'rgb') {
                // rgb[a](0, 0, 0[, 0]) format.
                var matches = /^rgba?\s*\((\d+),\s*(\d+),\s*(\d+)([^)]*)\)$/.exec(colour);
                colour = {
                    red: (matches[1] / 255),
                    green: (matches[2] / 255),
                    blue: (matches[3] / 255)
                }
            } else {
                // Hex digit format.
                if (colour.charAt(0) === '#') {
                    colour = colour.substr(1);
                }

                if (colour.length === 3) {
                    colour = colour.replace(/^(.)(.)(.)$/, '$1$1$2$2$3$3');
                }

                colour = {
                    red: (parseInt(colour.substr(0, 2), 16) / 255),
                    green: (parseInt(colour.substr(2, 2), 16) / 255),
                    blue: (parseInt(colour.substr(4, 2), 16) / 255)
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
        this.RGBtoColourStr = function(colour) {
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
        this.sRGBtoHSV = function(colour) {
            // If this is a string, then convert to a colour structure.
            if (colour.charAt) {
                colour = this.colourStrToRGB(colour);
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
        this.HSVtosRGB = function(hsvColour) {
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
        this.getElementTextContent = function(element, includeAlt)
        {
            if (includeAlt === undefined) {
                includeAlt = true;
            }

            var element = element.cloneNode(true);
            var nodes  = [];
            for (var i = 0; i < element.childNodes.length; i++) {
                nodes.push(element.childNodes[i]);
            }

            var text = [];
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
        this.testTableHeaders = function(element)
        {
            var retval = {
                required: true,
                used: false,
                correct: true,
                allowScope: true,
                missingThId: [],
                missingTd: [],
                wrongHeaders: []
            }

            var rows      = element.getElementsByTagName('tr');
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
            }
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
                            }
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
        this.getCellHeaders = function(table) {
            if (typeof table !== 'object') {
                return null;
            } else if (table.nodeName.toLowerCase() !== 'table') {
                return null;
            }


            var rows       = table.getElementsByTagName('tr');
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
                                while (skipCells[rownum][0] === colnum) {
                                    skipCells[rownum].shift();
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
                                        skipCells[i].push(j);
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
                                        exp = ' ' + exp.sort().join(' ') + ' ';
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
    };

};
