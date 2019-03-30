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

_global.HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_5_2_5_3 = {
    /**
   * Determines the elements to register for processing.
   *
   * Each element of the returned array can either be an element name, or "_top"
   * which is the top element of the tested code.
   *
   * @returns {Array} The list of elements.
   */
    register: function() {
        return ["_top", "a", "button", "label", "input"];
    },

    /**
   * Process the registered element.
   *
   * @param {DOMNode} element The element registered.
   * @param {DOMNode} top     The top element of the tested code.
   */
    process: function(element, top) {
        function getTextContent(el) {
            if (el.textContent !== undefined) {
                return el.textContent;
            } else {
                return el.innerText;
            }
        }
        function getAccessibleName(el) {
            // See https://www.w3.org/TR/accname-1.1/#terminology
            if (el.getAttribute('hidden')) {
                return '';
            }
            else if (el.getAttribute("aria-labelledby")) {
                var nameParts = [];
                var parts = el.getAttribute("aria-labelledby").split(" ");
                for (var i = 0; i < parts.length; i++) {
                    var x = parts[i];
                    var nameEl = top.getElementById(x);
                    if (nameEl) {
                      nameParts.push(nameEl.textContent);
                    }
                }
                return nameParts.join(" ");
            } else if (el.getAttribute("aria-label")) {
                return el.getAttribute("aria-label");
            } else if (el.getAttribute("title")) {
                if (
                    el.getAttribute("role") !== "presentation" &&
        el.getAttribute("role") !== "none"
                ) {
                    return el.getAttribute("aria-label");
                }
            }
            // Give up - we only test the 3 most obvious cases.
            return "";
        }

        if (element == top) {
            HTMLCS.addMessage(
                HTMLCS.NOTICE,
                top,
                "Check that for user interface components with labels that include text or images of text, the name contains the text that is presented visually.",
                "F96"
            );
        } else {
            var nodeName = element.nodeName.toLowerCase();

            var visibleLabel = "";
            var accessibleName = "";
            switch (nodeName) {
            case "a":
                visibleLabel = getTextContent(element);
                accessibleName = getAccessibleName(element);
                break;
            case "button":
                visibleLabel = getTextContent(element);
                accessibleName = getAccessibleName(element);
                break;
            case "label":
                visibleLabel = getTextContent(element);
                var labelFor = element.getAttribute("for");
                if (labelFor) {
                    if (top.ownerDocument) {
                        var refNode = top.ownerDocument.getElementById(labelFor);
                    } else {
                        var refNode = top.getElementById(labelFor);
                    }
                    accessibleName = getAccessibleName(refNode);
                }
                break;
            case "input":
                if (element.getAttribute("type") === "submit") {
                    visibleLabel = element.getAttribute("value");
                }
                accessibleName = getAccessibleName(element);
                break;
            }
            if (!!visibleLabel && !!accessibleName) {
                var a = visibleLabel.replace(/[^A-Za-z]/g, "").toLowerCase();
                var b = accessibleName.replace(/[^A-Za-z]/g, "").toLowerCase();
                if (!!a && !!b && b.indexOf(a) === -1) {
                    HTMLCS.addMessage(
                        HTMLCS.WARNING,
                        element,
                        "Accessible name for this element does not contain the visible label text. Check that for user interface components with labels that include text or images of text, the name contains the text that is presented visually.",
                        "F96"
                    );
                }
            }
        }
    }
};
