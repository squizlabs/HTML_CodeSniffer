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

_global.HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_5_2_5_2 = {
  /**
   * Determines the elements to register for processing.
   *
   * Each element of the returned array can either be an element name, or "_top"
   * which is the top element of the tested code.
   *
   * @returns {Array} The list of elements.
   */
  register: function() {
    return ["_top"];
  },

  /**
   * Process the registered element.
   *
   * @param {DOMNode} element The element registered.
   * @param {DOMNode} top     The top element of the tested code.
   */
  process: function(element, top) {
    HTMLCS.addMessage(
      HTMLCS.NOTICE,
      top,
      "Check that for functionality that can be operated using a single pointer, at least one of the following is true: \
        <ul> \
            <li>No Down-Event: The down-event of the pointer is not used to execute any part of the function;</li> \
            <li>Abort or Undo: Completion of the function is on the up-event, and a mechanism is available to abort the function before completion or to undo the function after completion;</li> \
            <li>Up Reversal: The up-event reverses any outcome of the preceding down-event;</li> \
            <li>Essential: Completing the function on the down-event is essential.</li> \
        </ul>",
      ""
    );

    if (element == top) {
      var allMousedown = HTMLCS.util.getAllElements(top, "*[onmousedown]");
      for (var i = 0; i < allMousedown.length; i++) {
        var x = allMousedown[i];
        HTMLCS.addMessage(
          HTMLCS.NOTICE,
          x,
          "This element has an mousedown event listener. Check that for functionality that can be operated using a single pointer, at least one of the following is true: \
                      <ul> \
                          <li>No Down-Event: The down-event of the pointer is not used to execute any part of the function;</li> \
                          <li>Abort or Undo: Completion of the function is on the up-event, and a mechanism is available to abort the function before completion or to undo the function after completion;</li> \
                          <li>Up Reversal: The up-event reverses any outcome of the preceding down-event;</li> \
                          <li>Essential: Completing the function on the down-event is essential.</li> \
                      </ul>",
          ""
        );
      }
      var allTouchstart = HTMLCS.util.getAllElements(top, "*[ontouchstart]");
      for (var i = 0; i < allTouchstart.length; i++) {
        var x = allTouchstart[i];
        HTMLCS.addMessage(
          HTMLCS.NOTICE,
          x,
          "This element has a touchstart event listener. Check that for functionality that can be operated using a single pointer, at least one of the following is true: \
                      <ul> \
                          <li>No Down-Event: The down-event of the pointer is not used to execute any part of the function;</li> \
                          <li>Abort or Undo: Completion of the function is on the up-event, and a mechanism is available to abort the function before completion or to undo the function after completion;</li> \
                          <li>Up Reversal: The up-event reverses any outcome of the preceding down-event;</li> \
                          <li>Essential: Completing the function on the down-event is essential.</li> \
                      </ul>",
          ""
        );
      }
    }
  }
};
