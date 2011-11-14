var HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_2_3_2_2 = {
    register: function()
    {
        return ['form'];

    },

    process: function(element, top)
    {
        var nodeName = element.nodeName.toLowerCase();

        if (nodeName === 'form') {
            this.checkFormSubmitButton(element);
        }
    },

    checkFormSubmitButton: function(form)
    {
        // Test for one of the three types of submit buttons.
        var submitButton = form.querySelector('input[type=submit], input[type=image], button[type=submit]');

        if (submitButton === null) {
            HTMLCS.addMessage(HTMLCS.ERROR, form, 'Check that this form has a submit button (input type="submit", input type="image", or button type="submit").', 'H32.2');
        }
    }
};
