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

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_3_Contrast = {
    testContrastRatio: function (top, minContrast, minLargeContrast)
    {
        var startDate = new Date();
        var count     = 0;
        var xcount    = 0;
        var failures  = [];

        if (!top.ownerDocument) {
            var toProcess = [top.getElementsByTagName('body')[0]];
        } else {
            var toProcess = [top];
        }

        while (toProcess.length > 0) {
            var node = toProcess.pop();

            // This is an element.
            if ((node.nodeType === 1) && (HTMLCS.util.isHidden(node) === false)) {
                var processNode = false;
                for (var i = 0; i < node.childNodes.length; i++) {
                    // Load up new nodes, but also only process this node when
                    // there are direct text elements.
                    if (node.childNodes[i].nodeType === 1) {
                        toProcess.push(node.childNodes[i]);
                    } else if (node.childNodes[i].nodeType === 3) {
                        if (HTMLCS.util.trim(node.childNodes[i].nodeValue) !== '') {
                            processNode = true;
                        }
                    }
                }

                if (processNode === true) {
                    var style = HTMLCS.util.style(node);

                    if (style) {
                        var bgColour = style.backgroundColor;
                        var parent   = node.parentNode;

                        while ((bgColour === 'transparent') || (bgColour === 'rgba(0, 0, 0, 0)')) {
                            if ((!parent) || (!parent.ownerDocument)) {
                                break;
                            }

                            var parentStyle = HTMLCS.util.style(parent);
                            var bgColour    = parentStyle.backgroundColor;
                            parent          = parent.parentNode;
                        }//end while

                        var contrastRatio = HTMLCS.util.contrastRatio(bgColour, style.color);

                        // Calculate font size. Note that CSS 2.1 fixes a reference pixel
                        // as 96 dpi (hence "pixel ratio" workarounds for Hi-DPI devices)
                        // so this calculation should be safe.
                        var fontSize      = parseInt(style.fontSize, 10) * (72 / 96);
                        var minLargeSize  = 18;

                        if ((style.fontWeight === 'bold') || (parseInt(style.fontWeight, 10) >= 600)) {
                            var minLargeSize = 14;
                        }

                        var reqRatio = minContrast;
                        if (fontSize >= minLargeSize) {
                            reqRatio = minLargeContrast;
                        }

                        if (contrastRatio < reqRatio) {


                            failures.push({
                                element: node,
                                colour: style.color,
                                bgColour: bgColour,
                                value: contrastRatio,
                                required: reqRatio
                            });
                        }//end if
                    }//end if
                }//end if
            }//end if
        }//end while

        return failures;
    }
}
