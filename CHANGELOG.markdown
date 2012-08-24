# HTML_CodeSniffer Bookmarklet Changelog

A list of the changes made to the HTML\_CodeSniffer bookmarklet since its initial
release. This will be updated when the bookmarklet is updated on the [official
HTML\_CodeSniffer web site](http://squizlabs.github.com/HTML_CodeSniffer).

Items prefixed with "SC" refer to changes or fixes to the tests in that Success
Criterion (or Criteria), and should be read in conjunction with the W3C's documentation
for the [Web Content Accessibility Guidelines (WCAG) 2.0](http://www.w3.org/TR/WCAG20).

## Version 24+ (TBA)

- **SC 1.4.3, 1.4.6:** New tests relating to contrast ratios between foreground and
  background colours. Instead of a general notice, HTML\_CodeSniffer will attempt to
  calculate contrast ratios where background and foreground colours are known, and
  issue errors containing the actual and required contrast ratios, and a recommended
  change in colour. Warnings will be issued where a background image makes it
  impossible to determine the actual contrast ratio. ([Issue #26](http://squizlabs.github.com/HTML_CodeSniffer/issues/26))
- **Auditor:** Fixed a bug with the "point to element" function with elements that
  are styled with a "fixed" position. ([Issue #25](http://squizlabs.github.com/HTML_CodeSniffer/issues/25))
- **SC 2.4.1:** Fixed a regression arising from [Issue #22](http://squizlabs.github.com/HTML_CodeSniffer/issues/22), where some non-
  existent named anchors were being treated as coming from a full document body (and
  thus being emitted as authoritative errors) instead of warnings.
- **SC 1.3.1:** Labels pointing to a non-existent ID will now emit either an error or
  warning depending on whether a full document (or at least a body tag) was passed,
  similar to the "named anchor" test in SC 2.4.1.

## Version 24 (20 Aug 2012)

- **SC 2.4.1:** When testing a same-page link for existence of a named anchor,
  HTML\_CodeSniffer now recognises "a" elements using the "name" attribute (as
  permitted in HTML 4.01) as named anchors, not just IDs. ([Pull Request #24](http://squizlabs.github.com/HTML_CodeSniffer/issues/24))

## Version 23 (15 Aug 2012)

- **SC 4.1.2:** HTML\_CodeSniffer no longer skips checking for explicit labels where
  a form control used an ID which was not a legal CSS selector, but is legal in
  HTML 4.01 and HTML5. These skipped checks previously resulted in an Error message.
  ([Issue #21](http://squizlabs.github.com/HTML_CodeSniffer/issues/21))
- **SC 1.3.1:** Fixed a bug where, if passed a source code fragment, Webkit-based
  browsers would emit false errors, where a label would be stated as pointing to a
  non-existent ID, where that ID actually exists. ([Issue #22](http://squizlabs.github.com/HTML_CodeSniffer/issues/22))

## Version 19 (24 Jul 2012)

- **SC 1.3.1:** Form controls that have no ID, but a non-empty title attribute, no
  longer generate errors about not being able to have an explicit label. Their title
  attribute satisfies the requirement for a form control to be named. ([Pull Request #18](http://squizlabs.github.com/HTML_CodeSniffer/issues/18))
- **Auditor:** Fixed some cosmetic bugs with the paging buttons in the Auditor when
  there was a single page of results (five or less) in the issue list view, or a
  single issue in the issue detail view. ([Pull Request #19](http://squizlabs.github.com/HTML_CodeSniffer/issues/19))

## Version 17 (10 Jul 2012)

- **Auditor:** Fixed a bug when closing the auditor in Internet Explorer 8, when
  used on a site with frames. ([Pull Request #17](http://squizlabs.github.com/HTML_CodeSniffer/issues/17))
- **Auditor:** Fixed a bug when finalising the messages displayed by the auditor in
  Internet Explorer 8, when used on a site with inline frames. ([Pull Request #16](http://squizlabs.github.com/HTML_CodeSniffer/issues/16))
- **Auditor:** Added font family to the list of styles to reset within the auditor,
  after finding sites that use it in their own "reset" style sheet, overriding the
  auditor's styling. ([Pull Request #15](http://squizlabs.github.com/HTML_CodeSniffer/issues/15))

## Version 14 (2 Jul 2012)

- **SC 1.1.1:** Messages concerning images and long text alternatives have been
  changed. They now emit a Notice instead of a Warning, as HTML\_CodeSniffer cannot
  test for the presence of a long alternative. The message text has also changed
  slightly, as the previous text made it sound like a short text alternative was
  optional when a long alternative existed. ([Pull Request #14](http://squizlabs.github.com/HTML_CodeSniffer/issues/14))

## Version 13 (19 Jun 2012)

- **SC 4.1.2:** Messages concerning "a" elements with no link text, but being used as
  a destination anchor - through the use of an ID or name attribute - now emit as a
  Warning rather than an Error. Such use is not encouraged, but it is legal in HTML
  4.01. ([Pull Request #13](http://squizlabs.github.com/HTML_CodeSniffer/issues/13))

## Version 12 (13 Jun 2012)

- **Core:** Fixed a major bug with Version 11. Full documents that were not being
  sent as source were not being tested, causing the bookmarklet to not respond.
  ([Pull Request #12](http://squizlabs.github.com/HTML_CodeSniffer/issues/12))

## Version 11 (7 Jun 2012)

- **SC 2.4.1:** Testing for same-page links now works with IDs that are not legal
  CSS selectors. Also, if this test is not passed a full document, any messages
  generated by this test will now emit a Warning rather than an Error, because the
  issue may exist or not exist depending on the document the fragment is placed.
  ([Pull Request #10](http://squizlabs.github.com/HTML_CodeSniffer/issues/10))
- **Documentation:** Updated README. ([Pull Request #8](http://squizlabs.github.com/HTML_CodeSniffer/issues/8))

## Version 6 (28 May 2012)

- **Auditor:** Fix a bug in the opacity-setting code, where the Auditor should have
  been turning half-transparent when an element is being pointed to underneath it.
  ([Pull Request #6](http://squizlabs.github.com/HTML_CodeSniffer/issues/6))
- **SC 2.4.1:** New test for the presence of working same-page links. An Error will
  be emitted if a hash link is used as a link target (eg. href="#htmlcs")
  but no element with that ID can be found in the document or fragment.
  ([Pull Request #5](http://squizlabs.github.com/HTML_CodeSniffer/issues/5))
- **SC 1.3.1:** New test that emits an Error when a heading element (h1 through h6)
  does not contain any content. ([Pull Request #4](http://squizlabs.github.com/HTML_CodeSniffer/issues/4))
- **Auditor:** Add a message to show that code snippet view is not supported in
  Mozilla Firefox 10. This feature is only supported in version 11 and later of Firefox.
  ([Pull Request #3](http://squizlabs.github.com/HTML_CodeSniffer/issues/3))
- **SC 4.1.2:** Empty text input fields are permitted to be empty without violating
  this Success Criterion, so removing the test for an Accessibility API value for
  these inputs.
  ([Pull Request #2](http://squizlabs.github.com/HTML_CodeSniffer/issues/2))
- **SC 4.1.2:** Select elements declared as "multiple selection allowed" are
  permitted to have zero selected elements without violating this Success Criterion,
  so removing the test for an Accessibility API value for these. Select elements
  not declared "multiple" must still have a selected option. ([Pull Request #2](http://squizlabs.github.com/HTML_CodeSniffer/issues/2))

## Version 1 (10 May 2012)

- Initial version of HTML_CodeSniffer bookmarklet.
