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
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['htmlcs'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        var exports = factory();
        for (var prop in exports) {
            root[prop] = exports[prop];
        }
    }
}(this, function () {
    var _global = {}
