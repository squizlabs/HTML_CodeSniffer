# HTML Codesniffer Development Guide

## Standards, Rulesets, and Sniffs

A **standard** provides an option in the dropdown against which to check your code. The default standards are WCAG2A, WCAG2AA, WCAG2AAA, and Section508. Each standard has a subdirectory in the Standards directory.

A **ruleset** is a JavaScript object that defines the rules for a standard. The object is named window.HTMLCS_Foo, where Foo is the name of the standard. A ruleset is defined by a file called ruleset.js in the directory for that standard. A ruleset maps to a set of **sniffs** which may be defined in the same standard or other standards.

Under the Standards directory is a directory called **Sniffs**, which in turn contains several JavaScript files (possibly within subdirectories). Within that file a JavaScript object is defined which contains a set of tests to run. The object is named window.HTMLCS_Foo_path_to_filename. (Note that forward slashes are replaced with underscores, which can be confusing as many of the file names also contain underscores.)

## ruleset.js

The following is an example of a ruleset object.


	HTMLCS_mystandard = {
	    name: 'mystandard',
	    description: 'An Example Standard',
	    sniffs: [
	    	{
	            standard: 'mystandard',
	            include: [
	                'cap1_formfields',
	                'cap1_anchors'
	            ]
	        },
	        {
	            standard: 'WCAG2AAA',
	            include: [
	            	'Principle1.Guideline1_1.1_1_1',
	            	'Principle1.Guideline1_3.1_3_1',
	            	'Principle1.Guideline1_3.1_3_1_A'
	            ]
	        }
	    ],
	    getMsgInfo: function(code) {
	        var msgCodeParts  = code.split('.', 3);
	        var paragraph     = msgCodeParts[1].toLowerCase();

	        var retval = [
	            ['Section', '1194.22 (' + paragraph + ')']
	        ];

	        return retval;
	    }
	};

	})();

The **name** (in this case "mystandard") must match the directory name containing the copy of ruleset.js. It also must match the variable name ("HTMLCS_mystandard").

The **description** can be anything you want.

The **sniffs** array contains a list of standards and the rules that should be included from those standards.

The **getMsgInfo** function takes a code (explanation to come) and returns an array of arrays containing key/value pairs. These key/value pairs correlate to additional information in the UI when you drill down to a specific problem. If the value contains a link the HTML code for the link is included in the value.

## Sniffs

The actual tests for validity are found in the sniff files, which look like this:

	var HTMLCS_webseries_Sniffs_cap1_anchors   = {

	    register: function()
	    {
	        return [
	            'a',
	            'iframe'
	        ];

	    },

	    /**
	     * Process the registered element.
	     *
	     * @param {DOMNode} element The element registered.
	     * @param {DOMNode} top     The top element of the tested code.
	     */
	    process: function(element, top)
	    {
	        this.testShouldHaveHref(element, top);
	        this.testShouldHaveText(element, top);
	    },

	    testShouldHaveHref: function (element, top) {
	        if (!element.href) {
	            HTMLCS.addMessage(HTMLCS.WARNING, element, '&lt;a&gt; tags should have an href attribute.', 'anchors');
	        }
	    },


	    testShouldHaveText: function (element, top) {
	        if (!element.text) {
	            HTMLCS.addMessage(HTMLCS.WARNING, element, 'Anchor is empty. It should contain some text.', 'anchors');
	        }
	    }

	};

The **register** array contains a list of elements that should be checked.

The **process** function is run for each instance of each registered element. From this point, you have the freedom to implement the code as you see fit. Look for problems and report them with the HTMLCS.addMessage() function.

## HTMLCS.addMessage()

The addMessage function takes four arguments:
- *severity* (HTMLCS.ERROR, HTMLCS.WARNING, or HTMLCS.INFO)
- **element** the affected element
- **message** the message to display
- **code** A code for additional information, used by get getMsgInfo function in ruleset.js






