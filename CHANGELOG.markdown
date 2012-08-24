# HTML_CodeSniffer Bookmarklet Changelog

A list of the changes made to the HTML\_CodeSniffer bookmarklet since its initial
release.

Items prefixed with "SC" refer to changes or fixes to the tests in that Success
Criterion (or Criteria), and should be read in conjunction with the W3C's documentation
for the [Web Content Accessibility Guidelines (WCAG) 2.0](http://www.w3.org/TR/WCAG20).

## Version 27 (TBA)

- **SC 1.4.3, 1.4.6:** New test relating to Contrast ratios. (Issue #26)
- **Auditor:** Fixed a bug with the "point to element" function with elements that
  are styled with a "fixed" position. (Issue #25)
- **SC 2.4.1:** Fixed a regression arising from Issue #22, where some non-
  existent named anchors were being treated as coming from a full document body (and
  thus being emitted as authoritative errors) instead of warnings.
- **SC 1.3.1:** Labels pointing to a non-existent ID will now emit either an error or
  warning depending on whether, similar to the "named anchor" test in SC 2.4.1.

## Version 24 (20 Aug 2012)

- **SC 2.4.1:** When testing a same-page link for existence of a named anchor,
  HTML\_CodeSniffer now recognises "a" elements using the "name" attribute (as
  permitted in HTML 4.01) as a named anchors, not just IDs. (Issue #24)

## Version 23 (15 Aug 2012)

- **SC 4.1.2:** HTML\_CodeSniffer no longer skips checking for explicit labels where
  a form control did not have an ID which was also a valid CSS selector (which is a
  subset of what is valid in HTML 4.01 and HTML5). These skipped checks resulted in
  an error message. (Issue #21)
- **SC 1.3.1:** Fixed a bug where, if passed a source code fragment, Webkit-based
  browsers would emit false errors, where a label would be stated as pointing to a
  non-existent ID where they are not (Issue #22)

## Version 19 (24 Jul 2012)

- **SC 1.3.1:** Form controls that have no ID, but a non-empty title attribute, no
  longer generate errors about not being able to have an explicit label. Their title
  attribute satisfies the requirement for a form control to be named. (Issue #18)
- **Auditor:** Fixed some cosmetic bugs with the paging buttons in the Auditor when
  there was a single page of results (five or less) in the issue list view, or a
  single issue in the issue detail view. (Issue #19)

## Version 17 (10 Jul 2012)

- Initial released version of HTML_CodeSniffer bookmarklet.
