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

_global.HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_5_2_5_4 = {
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
      "Check that functionality that can be operated by device motion or user motion can also be operated by user interface components and responding to the motion can be disabled to prevent accidental actuation, except when: \
        <ul> \
            <li>Supported Interface: The motion is used to operate functionality through an accessibility supported interface;</li> \
            <li>Essential: The motion is essential for the function and doing so would invalidate the activity.</li> \
        </ul>",
      ""
    );

    if (element == top) {
      element.getElementsByTagName("*").forEach(function(x) {
        if (!!x.ondevicemotion || !!x.getAttribute("ondevicemotion")) {
          HTMLCS.addMessage(
            HTMLCS.WARNING,
            element,
            "This element has a devicemotion event listener. Check that functionality that can be operated by device motion or user motion can also be operated by user interface components and responding to the motion can be disabled to prevent accidental actuation, except when: \
                    <ul> \
                        <li>Supported Interface: The motion is used to operate functionality through an accessibility supported interface;</li> \
                        <li>Essential: The motion is essential for the function and doing so would invalidate the activity.</li> \
                    </ul>",
            ""
          );
        }
      });
    }
  }
};
