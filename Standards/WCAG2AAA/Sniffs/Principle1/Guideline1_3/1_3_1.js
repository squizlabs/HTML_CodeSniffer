var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_3_1_3_1 = {
    _labelNames: null,

    register: function()
    {
        return [
            'p',
            'div',
            'b',
            'i',
            'u',
            's',
            'input',
            'select',
            'textarea',
            'button',
        ];

    },

    process: function(element, top)
    {
        var nodeName = element.nodeName.toLowerCase();

        switch (nodeName) {
            case 'input':
            case 'select':
            case 'textarea':
            case 'button':
                this.testLabelsOnInputs(element, top);
            break;

            case 'p':
            case 'div':
                this.testNonSemanticHeading(element);
            break;

            case 'b':
            case 'i':
            case 'u':
            case 's':
                this.testPresentationMarkup(element);
            break;
        }//end switch
    },

    testLabelsOnInputs: function(element, top)
    {
        var nodeName = element.nodeName.toLowerCase();

        this._labelNames = {};
        var labels = top.getElementsByTagName('label');
        for (var i = 0; i < labels.length; i++) {
            if (labels[i].hasAttribute('for') === false) {
                // Implicit labels (ie. labels with no "for" attribute but instead
                // surround a label) fail this test, due to not having enough
                // support from assistive technology.
                HTMLCS.addMessage(HTMLCS.ERROR, element, 'Use the label element to explicitly associate a form control with a label, through the use of the "for" attribute.', 'H44.1');
            } else {
                var labelFor = labels[i].getAttribute('for');
                if (this._labelNames[labelFor]) {
                    // Multiple labels with same "for" attribute shouldn't exist.
                    // They could be a sign of duplicate form controls, and ife
                    // they are not, it's not good practice to have multiple labels
                    // for the one control.
                    HTMLCS.addMessage(HTMLCS.ERROR, element, 'Multiple labels exist with the same "for" attribute. If these labels refer to different form controls, the controls should have unique "id" attributes.', 'H93');
                } else {
                    this._labelNames[labelFor] = labels[i];
                }
            }//end if
        }//end for

        if (element.hasAttribute('id') === false) {
            // There is no id attribute at all on the control.
            HTMLCS.addMessage(HTMLCS.ERROR, element, 'Form control does not have an id, therefore it cannot have an explicit label.', 'H44');
        } else {
            var inputType = nodeName;

            if (inputType === 'input') {
                inputType = element.getAttribute('type');
            }

            var id = element.getAttribute('id');
            if (!this._labelNames[id]) {
                // There is no label for this form control. For certain types of
                // input, "no label" is not an error.
                if (/^(submit|reset|image|hidden|button)$/.test(inputType) === false) {
                    // If there is a title, we presume that H65 applies - the label
                    // element cannot be used, and the title should be used as the
                    // descriptive label instead.
                    if (element.hasAttribute('title') === true) {
                        if (/^\s*$/.test(element.getAttribute('title') === true) {
                            // But the title attribute is empty. Whoops.
                            HTMLCS.addMessage(HTMLCS.ERROR, element, 'Check that the title attribute identifies the purpose of the control.', 'H65.3');
                        } else {
                            // Manual check required as to the title. Making this a
                            // warning because a manual tester also needs to confirm
                            // that a label element is not feasible for the control.
                            HTMLCS.addMessage(HTMLCS.WARNING, element, 'Check that the title attribute identifies the purpose of the control, and that a label element is not appropriate.', 'H65');
                        }
                    } else {
                        HTMLCS.addMessage(HTMLCS.ERROR, element, 'Attach a label to this form control through the use of the for attribute.', 'H44.2');
                    }
                }
            } else {
                // There is a label for a form control that should not have a label,
                // because the label is provided through other means (value of select
                // reset, alt on image submit, button's content), or there is no
                // visible field (hidden).
                if (/^(submit|reset|image|hidden|button)$/.test(inputType) === true) {
                    HTMLCS.addMessage(HTMLCS.ERROR, element, 'Label element should not be used for this type of form control.', 'H44');
                } else {
                    var labelOnRight = false;
                    if (/^(checkbox|radio)$/.test(inputType) === true) {
                        labelOnRight = true;
                    }

                    // Work out the position of the element in comparison to its
                    // label. A positive number means the element comes after the
                    // label (correct where label is on left). Negative means element
                    // is before the label (correct for "label on right").
                    if (element.compareDocumentPosition) {
                        // Firefox, Opera, IE 9+ standards mode.
                        var pos = element.compareDocumentPosition(this._labelNames[id]);
                        if ((pos & 0x02) === 0x02) {
                            // Label precedes element.
                            var posDiff = 1;
                        } else if ((pos & 0x04) === 0x04) {
                            // Label follows element.
                            var posDiff = -1;
                        }
                    } else if (element.sourceIndex) {
                        // IE < 9.
                        var posDiff = element.sourceIndex - this._labelNames[id].sourceIndex;
                    }

                    if ((labelOnRight === true) && (posDiff > 0)) {
                        HTMLCS.addMessage(HTMLCS.ERROR, element, 'The label element for this control should be placed after this element.', 'H44.1');
                    } else if ((labelOnRight === false) && (posDiff < 0)) {
                        HTMLCS.addMessage(HTMLCS.ERROR, element, 'The label element for this control should be placed before this element.', 'H44.1');
                    }
                }//end if
            }//end if
        }//end if
    },

    testPresentationMarkup: function(element)
    {
        // Presentation tags that should have no place in modern HTML.
        var tag = element.nodeName.toLowerCase();
        if (/^(b|i|u|s)$/.test(tag) === true) {
            HTMLCS.addMessage(HTMLCS.ERROR, element, 'Semantic markup should be used to mark emphasised or special text so that it can be programmatically determined.', 'H49');
        }
    },

    testNonSemanticHeading: function(element)
    {
        // Test for P|DIV > STRONG|EM|other inline styling, when said inline
        // styling tag is the only element in the tag. It could possibly a header
        // that should be using h1..h6 tags instead.
        var tag = element.nodeName.toLowerCase();
        if (tag === 'p' || tag === 'div') {
            var children = element.childNodes;
            if ((children.length === 1) && (children[0].nodeType === Node.ELEMENT_NODE)) {
                var childTag = children[0].nodeName.toLowerCase();

                if (/^(strong|em|b|i|u)$/.test(childTag) === true) {
                    HTMLCS.addMessage(HTMLCS.WARNING, element, 'Heading markup should be used if this content is intended as a heading.', 'H42');
                }
            }
        }
    },
};
