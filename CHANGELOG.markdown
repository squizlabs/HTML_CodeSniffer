# HTML_CodeSniffer Bookmarklet Changelog

A list of the changes made to the HTML\_CodeSniffer bookmarklet since its initial
release. This will be updated when the bookmarklet is updated on the [official
HTML\_CodeSniffer web site](http://squizlabs.github.io/HTML_CodeSniffer).

Items prefixed with "SC" by itself refer to changes or fixes to the tests in that
WCAG 2.0 Success Criterion (or Criteria), and should be read in conjunction with the
W3C's documentation for the [Web Content Accessibility Guidelines (WCAG) 2.0](http://www.w3.org/TR/WCAG20).
Changes in other standards will be referenced by their standard name.

## Release 64 (8 Jan 2013)

- **Auditor:** Significant updates to allow Section 508 standards to fit within the
  auditor interface. This includes removing WCAG 2.0-related assumptions about what
  standards are available, and allowing standards to specify what is displayed an
  auditor message (in place of WCAG 2.0's "principle and technique").
- **Section 508:** First release of U.S. Section 508 standards for HTML_CodeSniffer.
- **SC 1.3.1:** Fixed a bug in the sniff that checked for presence and position of labels,
  concerning input elements that did not have a "type"
  attribute. HTML\_CodeSniffer did not correctly interpret them as the default "text"
  input type, and instead emitted errors. ([Issue #57](http://squizlabs.github.io/HTML_CodeSniffer/issues/57))
- **Auditor:** Removed an "nbsp" and replaced with its numeric unicode value, so that
  the auditor would run correctly on XHTML pages properly served as "application/xhtml+xml".
  The nbsp entity does not exist in XHTML served as XML by default, as XML itself does not
  define it. ([Issue #53](http://squizlabs.github.io/HTML_CodeSniffer/issues/53))
- **SC 1.1.1:** Fixed a bug in the sniff that fails links containing an image with
  no alt text. It produced a false positive if such an image were in the same link along
  with text that was all outside another element (such as a span). ([Issue #52](http://squizlabs.github.io/HTML_CodeSniffer/issues/52))
- **SC 1.1.1:** Applet elements with a missing body were being misdiagnosed as a Notice. It
  is now properly considered an Error.

## Version 49 (15 Oct 2012)

- **Auditor:** Fixed an issue where the auditor popup would not become semi-transparent
in IE8 when the pointer is underneath the popup. ([Pull Request #47](http://squizlabs.github.io/HTML_CodeSniffer/issues/47))
- **Auditor:** Fixed a bug where IE8 would throw an "Unknown runtime error" when
attempting to change pages in the issue list if placed inside invalid HTML, such as
nested forms. ([Pull Request #46](http://squizlabs.github.io/HTML_CodeSniffer/issues/46))
- **Various Sniffs:** Certain sniffs that emit notices now fire on each found
element, rather than one fired at the top of the document. This includes audio/video tag sniffs in
Guidelines 1.2 and 1.4, as well as input fields in SC 3.2.1 ([Pull Request #42](http://squizlabs.github.io/HTML_CodeSniffer/issues/42))
- **Auditor:** HTML_CodeSniffer now provides a reason as to why an element cannot be
pointed to using the pointer. ([Pull Request #39](http://squizlabs.github.io/HTML_CodeSniffer/issues/39))
- **Core:** Messages from sniffs that start from the top of the document are now
listed in DOM order, like sniffs that focus on certain elements directly. This should reduce the amount of "bouncing"
up and down a document due to elements being pointed to in different parts. ([Pull Request #38](http://squizlabs.github.io/HTML_CodeSniffer/issues/38))
- **Auditor:** The bookmarklet can now accept an option, "ignoreMsgCodes", which allows
for filtering of messages by one or more Perl-compatible regular expressions (either
as strings or RegExp objects). ([Pull Request #37](http://squizlabs.github.io/HTML_CodeSniffer/issues/37))
- **SC 1.3.1:** Updated the test for technique [H71: Providing a description for
groups of form controls using fieldset and legend elements](http://www.w3.org/TR/WCAG20-TECHS/H71)
to the version in the 3 January 2012 version of the *Techniques for WCAG 2.0*
document. Fieldsets are no longer required if each element in a radio or checkbox
group "includes clear instructions [in a label] and distinct selections". As such,
these tests have been rewritten and messages reduced from an Error to a Warning. ([Pull Request #36](http://squizlabs.github.io/HTML_CodeSniffer/issues/36))
- **Auditor:** Fixed an issue where it was still possible to operate the toggle
switch for a category of messages that was empty, and related issues that caused
to the View Report button being not correctly enabled. ([Pull Request #35](http://squizlabs.github.io/HTML_CodeSniffer/issues/35))
- **SC 1.3.1:** Fixed an issue in the test for lack of an ID on an input. Buttons
and hidden inputs weren't being correctly detected when the type attribute was not
all lowercase. ([Pull Request #34](http://squizlabs.github.io/HTML_CodeSniffer/issues/34))

## Version 33 (31 Aug 2012)

- **Auditor:** Fixed an issue in Internet Explorer 9+ where the message type switches
  would not work properly. ([Pull Request #32](http://squizlabs.github.io/HTML_CodeSniffer/issues/32))
- **Auditor:** Fixed some auditor styling issues in Internet Explorer 8, mainly
  relating to opacity issues - for instance, correctly showing that message type
  switches and the "View Report" button is disabled when necessary. ([Pull Request #32](http://squizlabs.github.io/HTML_CodeSniffer/issues/32))

## Version 31 (27 Aug 2012)

- **SC 2.2.2:** Fixed a bug that was causing testing on sites using Twitter's "Tweet
  button" to hang in Firefox. The lack of style on a sourceless, hidden inline frame
  it creates caused issues with a test for detecting blinking elements.
  ([Pull Request #30](http://squizlabs.github.io/HTML_CodeSniffer/issues/30))

## Version 29 (24 Aug 2012)

- **SC 1.4.3, 1.4.6:** New tests relating to contrast ratios between foreground and
  background colours. Instead of a general notice, HTML\_CodeSniffer will attempt to
  calculate contrast ratios where background and foreground colours are known, and
  issue errors containing the actual and required contrast ratios, and a recommended
  change in colour. Warnings will be issued where a background image makes it
  impossible to determine the actual contrast ratio. ([Issue #26](http://squizlabs.github.io/HTML_CodeSniffer/issues/26))
- **Auditor:** Fixed a bug with the "point to element" function with elements that
  are styled with a "fixed" position. ([Issue #25](http://squizlabs.github.io/HTML_CodeSniffer/issues/25))
- **SC 2.4.1:** Fixed a regression arising from [Issue #22](http://squizlabs.github.io/HTML_CodeSniffer/issues/22), where some non-
  existent named anchors were being treated as coming from a full document body (and
  thus being emitted as authoritative errors) instead of warnings.
- **SC 1.3.1:** Labels pointing to a non-existent ID will now emit either an error or
  warning depending on whether a full document (or at least a body tag) was passed,
  similar to the "named anchor" test in SC 2.4.1.

## Version 24 (20 Aug 2012)

- **SC 2.4.1:** When testing a same-page link for existence of a named anchor,
  HTML\_CodeSniffer now recognises "a" elements using the "name" attribute (as
  permitted in HTML 4.01) as named anchors, not just IDs. ([Pull Request #24](http://squizlabs.github.io/HTML_CodeSniffer/issues/24))

## Version 23 (15 Aug 2012)

- **SC 4.1.2:** HTML\_CodeSniffer no longer skips checking for explicit labels where
  a form control used an ID which was not a legal CSS selector, but is legal in
  HTML 4.01 and HTML5. These skipped checks previously resulted in an Error message.
  ([Issue #21](http://squizlabs.github.io/HTML_CodeSniffer/issues/21))
- **SC 1.3.1:** Fixed a bug where, if passed a source code fragment, Webkit-based
  browsers would emit false errors, where a label would be stated as pointing to a
  non-existent ID, where that ID actually exists. ([Issue #22](http://squizlabs.github.io/HTML_CodeSniffer/issues/22))

## Version 19 (24 Jul 2012)

- **SC 1.3.1:** Form controls that have no ID, but a non-empty title attribute, no
  longer generate errors about not being able to have an explicit label. Their title
  attribute satisfies the requirement for a form control to be named. ([Pull Request #18](http://squizlabs.github.io/HTML_CodeSniffer/issues/18))
- **Auditor:** Fixed some cosmetic bugs with the paging buttons in the Auditor when
  there was a single page of results (five or less) in the issue list view, or a
  single issue in the issue detail view. ([Pull Request #19](http://squizlabs.github.io/HTML_CodeSniffer/issues/19))

## Version 17 (10 Jul 2012)

- **Auditor:** Fixed a bug when closing the auditor in Internet Explorer 8, when
  used on a site with frames. ([Pull Request #17](http://squizlabs.github.io/HTML_CodeSniffer/issues/17))
- **Auditor:** Fixed a bug when finalising the messages displayed by the auditor in
  Internet Explorer 8, when used on a site with inline frames. ([Pull Request #16](http://squizlabs.github.io/HTML_CodeSniffer/issues/16))
- **Auditor:** Added font family to the list of styles to reset within the auditor,
  after finding sites that use it in their own "reset" style sheet, overriding the
  auditor's styling. ([Pull Request #15](http://squizlabs.github.io/HTML_CodeSniffer/issues/15))

## Version 14 (2 Jul 2012)

- **SC 1.1.1:** Messages concerning images and long text alternatives have been
  changed. They now emit a Notice instead of a Warning, as HTML\_CodeSniffer cannot
  test for the presence of a long alternative. The message text has also changed
  slightly, as the previous text made it sound like a short text alternative was
  optional when a long alternative existed. ([Pull Request #14](http://squizlabs.github.io/HTML_CodeSniffer/issues/14))

## Version 13 (19 Jun 2012)

- **SC 4.1.2:** Messages concerning "a" elements with no link text, but being used as
  a destination anchor - through the use of an ID or name attribute - now emit as a
  Warning rather than an Error. Such use is not encouraged, but it is legal in HTML
  4.01. ([Pull Request #13](http://squizlabs.github.io/HTML_CodeSniffer/issues/13))

## Version 12 (13 Jun 2012)

- **Core:** Fixed a major bug with Version 11. Full documents that were not being
  sent as source were not being tested, causing the bookmarklet to not respond.
  ([Pull Request #12](http://squizlabs.github.io/HTML_CodeSniffer/issues/12))

## Version 11 (7 Jun 2012)

- **SC 2.4.1:** Testing for same-page links now works with IDs that are not legal
  CSS selectors. Also, if this test is not passed a full document, any messages
  generated by this test will now emit a Warning rather than an Error, because the
  issue may exist or not exist depending on the document the fragment is placed.
  ([Pull Request #10](http://squizlabs.github.io/HTML_CodeSniffer/issues/10))
- **Documentation:** Updated README. ([Pull Request #8](http://squizlabs.github.io/HTML_CodeSniffer/issues/8))

## Version 6 (28 May 2012)

- **Auditor:** Fix a bug in the opacity-setting code, where the Auditor should have
  been turning half-transparent when an element is being pointed to underneath it.
  ([Pull Request #6](http://squizlabs.github.io/HTML_CodeSniffer/issues/6))
- **SC 2.4.1:** New test for the presence of working same-page links. An Error will
  be emitted if a hash link is used as a link target (eg. href="#htmlcs")
  but no element with that ID can be found in the document or fragment.
  ([Pull Request #5](http://squizlabs.github.io/HTML_CodeSniffer/issues/5))
- **SC 1.3.1:** New test that emits an Error when a heading element (h1 through h6)
  does not contain any content. ([Pull Request #4](http://squizlabs.github.io/HTML_CodeSniffer/issues/4))
- **Auditor:** Add a message to show that code snippet view is not supported in
  Mozilla Firefox 10. This feature is only supported in version 11 and later of Firefox.
  ([Pull Request #3](http://squizlabs.github.io/HTML_CodeSniffer/issues/3))
- **SC 4.1.2:** Empty text input fields are permitted to be empty without violating
  this Success Criterion, so removing the test for an Accessibility API value for
  these inputs.
  ([Pull Request #2](http://squizlabs.github.io/HTML_CodeSniffer/issues/2))
- **SC 4.1.2:** Select elements declared as "multiple selection allowed" are
  permitted to have zero selected elements without violating this Success Criterion,
  so removing the test for an Accessibility API value for these. Select elements
  not declared "multiple" must still have a selected option. ([Pull Request #2](http://squizlabs.github.io/HTML_CodeSniffer/issues/2))

## Version 1 (10 May 2012)

- Initial version of HTML_CodeSniffer bookmarklet.
