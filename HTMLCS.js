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
     * Loads the specifid standard and run the sniffs.
     *
     * @param {string}         standard The name of the standard to load.
     * @param {string|DOMNode} An HTML string or a DOMNode.
     * @param {function}       The function that will be called when the testing is completed.
     */
    this.process = function(standard, content, callback) {
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
            });
        }
    };

    /**
     * Loads the specified standard and its sniffs.
     *
     * @param {string}   standard The name of the standard to load.
     * @param {function} callback The function to call once the standard is loaded.
     *
     * @return void
     */
    this.loadStandard = function(standard, callback) {
        if (!standard) {
            return false;
        }

        _includeStandard(standard, function() {
            _standard = standard;
            callback.call(this);
        });
    };

    /**
     * Runs the sniffs for the loaded standard.
     *
     * @param {function}       callback The function to call once all sniffs are completed.
     * @param {string|DOMNode} content  An HTML string or a DOMNode.
     *
     * @return void
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

            element.write(content);
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
     * @param {string|DOMNode} content  An HTML string or a DOMNode.
     *
     * @return {boolean}
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
     * @param {integer} type The type of the message.
     * @param {DOMNode} element The element that the message is related to.
     * @param {string}  msg     The message string.
     * @param {string}  code    Unique code for the message.
     * @param {object}  data    Extra data to store for the message.
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
     * @return {array} Array of message objects.
     */
    this.getMessages = function() {
        return _messages.concat([]);
    };

    /**
     * Runs the sniffs in the loaded standard for the specified element.
     *
     * @param {DOMNode}  element  The element to test.
     * @param {function} callback The function to call once all tests are run.
     */
    var _run = function(elements, topElement, callback) {
        while (elements.length > 0) {
            var element = elements.shift();

            if (element === topElement) {
                var tagName = '_top';
            } else {
                var tagName = element.tagName.toLowerCase();
            }

            if (_tags[tagName] && _tags[tagName].length > 0) {
                _processSniffs(element, _tags[tagName].concat([]), topElement);
            }
        }//end while

        if (callback instanceof Function === true) {
            callback.call(this);
        }
    };

    /**
     * Process the sniffs.
     *
     * @param {DOMNode}  element  The element to test.
     * @param {array}    sniffs   Array of sniffs.
     * @param {function} callback The function to call once the processing is completed.
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
     * @param {string}   standard The name of the standard.
     * @param {function} callback The function to call once the standard is included.
     * @param {object}   options  The options for the standard (e.g. exclude sniffs).
     */
    var _includeStandard = function(standard, callback, options) {
        if (standard.indexOf('http') !== 0) {
            standard = _getStandardPath(standard);
        }//end id

        // See if the ruleset object is already included (eg. if minified).
        var parts   = standard.split('/');
        var ruleSet = window['HTMLCS_' + parts[(parts.length - 2)]];
        if (ruleSet) {
            // Already included.
            _registerStandard(standard, callback, options);
        } else {
            _includeScript(standard, function() {
                // Script is included now register the standard.
                _registerStandard(standard, callback, options);
            });
        }//end if
    };

    /**
     * Registers the specified standard and its sniffs.
     *
     * @param {string}   standard The name of the standard.
     * @param {function} callback The function to call once the standard is registered.
     * @param {object}   options  The options for the standard (e.g. exclude sniffs).
     */
    var _registerStandard = function(standard, callback, options) {
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
        _registerSniffs(standard, sniffs, callback);
    };

    /**
     * Registers the sniffs for the specified standard.
     *
     * @param {string}   standard The name of the standard.
     * @param {array}    sniffs   List of sniffs to register.
     * @param {function} callback The function to call once the sniffs are registered.
     */
    var _registerSniffs = function(standard, sniffs, callback) {
        if (sniffs.length === 0) {
            callback.call(this);
            return;
        }

        // Include and register sniffs.
        var sniff = sniffs.shift();
        _loadSniffFile(standard, sniff, function() {
            _registerSniffs(standard, sniffs, callback);
        });
    };

    /**
     * Includes the sniff's JS file and registers it.
     *
     * @param {string}        standard The name of the standard.
     * @param {string|object} sniff    The sniff to register, can be a string or
     *                                 and object specifying another standard.
     * @param {function}      callback The function to call once the sniff is included and registered.
     */
    var _loadSniffFile = function(standard, sniff, callback) {
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
                _includeScript(_getSniffPath(standard, sniff), cb);
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
            }, {
                exclude: sniff.exclude,
                include: sniff.include
            });
        }
    };

    /**
     * Registers the specified sniff.
     *
     * @param {string} standard The name of the standard.
     * @param {string} sniff    The name of the sniff.
     */
    var _registerSniff = function(standard, sniff) {
        // Get the sniff object.
        var sniffObj = _getSniff(standard, sniff);
        if (!sniffObj) {
            return false;
        }

        // Call the register method of the sniff, it should return an array of tags.
        var watchedTags = sniffObj.register();
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
     * @param {string} standard The name of the standard.
     * @param {string} sniff    The name of the sniff.
     *
     * @return {string} The path to the JS file of the sniff.
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
     * @param {string} standard The name of the standard.
     *
     * @return {string} The path to the local standard.
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
     * @param {string} standard The name of the standard.
     * @param {string} sniff    The name of the sniff.
     *
     * @return {object} The sniff object.
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
     * @return {string} The full message code.
     */
    var _getMessageCode = function(code) {
        code = _standard + '.' + _currentSniff._name + '.' + code;
        return code;
    };

    /**
     * Includes the specified JS file.
     *
     * @param {string}   src      The URL to the JS file.
     * @param {function} callback The function to call once the script is loaded.
     */
    var _includeScript = function(src, callback) {
        var script    = document.createElement('script');
        script.onload = function() {
            script.onload = null;
            script.onreadystatechange = null;
            callback.call(this);
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
     * @param {DOMNode} element The parent element.
     *
     * @return {array} Array of DOMNode.
     */
    var _getAllTags = function(element) {
        element      = element || document;
        var elements = element.getElementsByTagName('*');

        // Convert to array. We can't use array features on a DOMNodeList.
        var elArray = [];
        for (var i = 0; i < elements.length; i++) {
            elArray.push(elements[i]);
        }

        return elArray;
    };

    /**
     * Returns whether a string is considered "empty" in HTML terms.
     *
     * A simple regex on whitespace is not enough, because it does not take into
     * account non-breaking spaces (&nbsp;), which are NOT considered empty.
     *
     * @param {String} string The string to test.
     *
     * @returns {Boolean} True if empty.
     */
    this.isStringEmpty = function(string) {
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

    this.util = new function() {
        this.trim = function(string) {
            return string.replace(/^\s*(.*)\s*$/g, '$1');
        };

        this.isStringEmpty = function(string) {
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

        this.isHidden = function(element) {
            var hidden = false;

            // Do not point to elem if its hidden. Use computed styles.
            if (elem.currentStyle) {
                // IE 8.
                var style = elem.currentStyle;
            } else if (window.getComputedStyle) {
                var style = window.getComputedStyle(elem);
            } else {
                return false;
            }

            if ((style.visibility === 'hidden') || (style.display === 'none')) {
                hidden = true;
            }

            return hidden;
        };

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

        this.isLayoutTable = function(table) {
            var th = table.querySelector('th');
            if (th === null) {
                return true;
            }

            return false;
        };

        /**
         * Gets the text contents of an element.
         *
         * @param {DOMNode} element           The element being inspected.
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
