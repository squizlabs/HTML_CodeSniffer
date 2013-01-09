# HTML_CodeSniffer README

HTML_CodeSniffer is a client-side JavaScript that checks a HTML document or source code, and detects violations of a defined coding standard.

It can be used in two ways. Called directly in JavaScript source, HTML_CodeSniffer will provide a list of known and potential violations to the calling script. It also comes with a pop-up auditor interface, accessible via a bookmarklet, letting you browse through messages emitted from one of the defined standards. Where possible, the auditor also points you to the HTML element causing the problem.

HTML_CodeSniffer is released under a BSD-style licence. For more information, please see the file "licence.txt".

## Which standards and sniffs does HTML_CodeSniffer include?

HTML_CodeSniffer comes with standards and sniffs that cover the three conformance levels of the W3C [Web Content Accessibility Guidelines (WCAG) 2.0](http://www.w3.org/TR/WCAG20), and the U.S. [Section 508](http://section508.gov/index.cfm?fuseAction=stdsdoc) legislation.

## Contributing and reporting issues

To report any issues with using HTML_CodeSniffer, please use the [HTML_CodeSniffer Issue Tracker](http://github.com/squizlabs/HTML_CodeSniffer/issues).

Contributions to the HTML_CodeSniffer code base are also welcome: please create a fork of the main repository, then submit your modified code through a [Pull Request](http://help.github.com/send-pull-requests/) for review. A Pull Request also automatically creates an issue in the Issue Tracker, so if you have code to contribute, you do not need to do both.

## More Information

More information on HTML_CodeSniffer can be found on its GitHub site, [http://squizlabs.github.com/HTML_CodeSniffer/](http://squizlabs.github.com/HTML_CodeSniffer/). This site provides:

- Information on the tests performed (and messages emitted) by HTML_CodeSniffer's standards, organised by conformance level and Success Criterion;
- A source test area that allows you to try out HTML_CodeSniffer with your own HTML source code; and
- A link to the HTML_CodeSniffer bookmarklet, letting you check other pages using the pop-up auditor interface.
