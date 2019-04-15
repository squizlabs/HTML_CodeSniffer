_global.translation['it'] = {

    //HTMLCSAuditor.js
    "auditor_name" : 'HTML_CodeSniffer di Squiz'
    ,"auditor_using_standard" : 'Standard in uso: '
    ,"auditor_standards" : 'Standard'
    ,"auditor_code_snippet" : 'Codice coinvolto'
    ,"auditor_close" : 'Chiudi'
    ,"auditor_select_types" : 'Seleziona il tipo di verifiche da includere nel report'
    ,"auditor_home" : 'Inizio'
    ,"auditor_view_report" : 'Risultati del report'
    ,"auditor_report" : 'Report'
    ,"auditor_back_to_report" : 'Torna al report'
    ,"auditor_previous_issue" : 'Problema Precedente'
    ,"auditor_next_issue" : 'Problema Successivo'
    ,"auditor_issue" : 'Problema'
    ,"auditor_of" : 'di'
    ,"auditor_errors" : 'Errori'
    ,"auditor_error" : 'Errore'
    ,"auditor_warnings" : 'Avvisi'
    ,"auditor_warning" : 'Avviso'
    ,"auditor_notices" : 'Note'
    ,"auditor_notice" : 'Nota'
    ,"auditor_toggle_display_of" : 'Visibilità di'
    ,"auditor_messages" : 'messaggi'
    ,"auditor_unable_to_point" : 'Unable to point to the element associated with this issue.'
    ,"auditor_unable_to_point_entire" : 'Unable to point to this issue, as it relates to the entire document.'
    ,"auditor_unable_to_point_removed" : 'Unable to point to this element as it has been removed from the document since the report was generated.'
    ,"auditor_unable_to_point_outside" : 'Unable to point to this element because it is located outside the document\'s body element.'
    ,"auditor_unable_to_point_hidden" : 'Unable to point to this element because it is hidden from view, or does not have a visual representation.'
    ,"auditor_point_to_element" : 'Point to Element'
    ,"auditor_unsupported_browser" : 'La funzionalità «parte di codice» non funziona su questo browser.'
    ,"auditor_page" : 'Pagina'
    ,"auditor_updated_to" : 'Abbiamo aggiornato HTML_CodeSniffer alla versione'
    ,"auditor_view_the_changelog" : 'Elenco delle modifiche'
    ,"auditor_success_criterion" : "Requisito di successo"
    ,"auditor_suggested_techniques" : "Tecniche suggerite"
    ,"auditor_applies_entire_document" : "Si applica a tutto il documento"

    //1_1_1.js
    ,"1_1_1_H30.2" : 'Img element is the only content of the link, but is missing alt text. The alt text should describe the purpose of the link.'
    ,"1_1_1_H67.1" : 'Img element with empty alt text must have absent or empty title attribute.'
    ,"1_1_1_H67.2" : 'Img element is marked so that it is ignored by Assistive Technology.'
    ,"1_1_1_H37" : 'Img element missing an alt attribute. Use the alt attribute to specify a short text alternative.'
    ,"1_1_1_G94.Image" : 'Ensure that the img element\'s alt text serves the same purpose and presents the same information as the image.'
    ,"1_1_1_H36" : 'Image submit button missing an alt attribute. Specify a text alternative that describes the button\'s function, using the alt attribute.'
    ,"1_1_1_G94.Button" : 'Ensure that the image submit button\'s alt text identifies the purpose of the button.'
    ,"1_1_1_H24" : 'Area element in an image map missing an alt attribute. Each area element must have a text alternative that describes the function of the image map area.'
    ,"1_1_1_H24.2" : 'Ensure that the area element\'s text alternative serves the same purpose as the part of image map image it references.'
    ,"1_1_1_G73,G74" : 'If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.'
    ,"1_1_1_H2.EG5" : 'Img element inside a link must not use alt text that duplicates the text content of the link.'
    ,"1_1_1_H2.EG4" : 'Img element inside a link has empty or missing alt text when a link beside it contains link text. Consider combining the links.'
    ,"1_1_1_H2.EG3" : 'Img element inside a link must not use alt text that duplicates the content of a text link beside it.'
    ,"1_1_1_H53,ARIA6" : 'Object elements must contain a text alternative after all other alternatives are exhausted.'
    ,"1_1_1_G94,G92.Object,ARIA6" : 'Check that short (and if appropriate, long) text alternatives are available for non-text content that serve the same purpose and present the same information.'
    ,"1_1_1_H35.3" : 'Applet elements must contain a text alternative in the element\'s body, for browsers without support for the applet element.'
    ,"1_1_1_H35.2" : 'Applet elements must contain an alt attribute, to provide a text alternative to browsers supporting the element but are unable to load the applet.'
    ,"1_1_1_G94,G92.Applet" : 'Check that short (and if appropriate, long) text alternatives are available for non-text content that serve the same purpose and present the same information.'


    //1_2_1.js
    ,"1_2_1_G158" : 'If this embedded object contains pre-recorded audio only, and is not provided as an alternative for text content, check that an alternative text version is available.'
    ,"1_2_1_G159,G166" : 'If this embedded object contains pre-recorded video only, and is not provided as an alternative for text content, check that an alternative text version is available, or an audio track is provided that presents equivalent information.'


    //1_2_2.js
    ,"1_2_2_G87,G93" : 'If this embedded object contains pre-recorded synchronised media and is not provided as an alternative for text content, check that captions are provided for audio content.'


    //1_2_3.js
    ,"1_2_3_G69,G78,G173,G8" : 'If this embedded object contains pre-recorded synchronised media and is not provided as an alternative for text content, check that an audio description of its video, and/or an alternative text version of the content is provided.'


    //1_2_4.js
    ,"1_2_4_G9,G87,G93" : 'If this embedded object contains synchronised media, check that captions are provided for live audio content.'


    //1_2_5.js
    ,"1_2_5_G78,G173,G8" : 'If this embedded object contains pre-recorded synchronised media, check that an audio description is provided for its video content.'


    //1_2_6.js
    ,"1_2_6_G54,G81" : 'If this embedded object contains pre-recorded synchronised media, check that a sign language interpretation is provided for its audio.'


    //1_2_7.js
    ,"1_2_7_G8" : 'If this embedded object contains synchronised media, and where pauses in foreground audio is not sufficient to allow audio descriptions to convey the sense of pre-recorded video, check that an extended audio description is provided, either through scripting or an alternate version.'


    //1_2_8.js
    ,"1_2_8_G69,G159" : 'If this embedded object contains pre-recorded synchronised media or video-only content, check that an alternative text version of the content is provided.'


    //1_2_9.js
    ,"1_2_9_G150,G151,G157" : 'If this embedded object contains live audio-only content, check that an alternative text version of the content is provided.'


    //1_3_1.js
    ,"1_3_1_F92,ARIA4" : 'This element\'s role is "presentation" but contains child elements with semantic meaning.'
    ,"1_3_1_H44.NonExistent" : 'This label\'s "for" attribute contains an ID that does not exist in the document.'
    ,"1_3_1_H44.NonExistentFragment" : 'This label\'s "for" attribute contains an ID that does not exist in the document fragment.'
    ,"1_3_1_H44.NotFormControl" : 'This label\'s "for" attribute contains an ID for an element that is not a form control. Ensure that you have entered the correct ID for the intended element.'
    ,"1_3_1_H65" : 'This form control has a "title" attribute that is empty or contains only spaces. It will be ignored for labelling test purposes.'
    ,"1_3_1_ARIA6" : 'This form control has an "aria-label" attribute that is empty or contains only spaces. It will be ignored for labelling test purposes.'
    //{{id}} will be replace with element ID:
    ,"1_3_1_ARIA16,ARIA9" : 'This form control contains an aria-labelledby attribute, however it includes an ID "{{id}}" that does not exist on an element. The aria-labelledby attribute will be ignored for labelling test purposes.'

    ,"1_3_1_F68.Hidden" : 'This hidden form field is labelled in some way. There should be no need to label a hidden form field.'
    ,"1_3_1_F68.HiddenAttr" : 'This form field is intended to be hidden (using the "hidden" attribute), but is also labelled in some way. There should be no need to label a hidden form field.'
    ,"1_3_1_F68" : 'This form field should be labelled in some way. Use the label element (either with a "for" attribute or wrapped around the form field), or "title", "aria-label" or "aria-labelledby" attributes as appropriate.'

    ,"1_3_1_H49." : 'Presentational markup used that has become obsolete in HTML5.'
    ,"1_3_1_H49.AlignAttr" : 'Align attributes.'
    ,"1_3_1_H49.Semantic" : 'Semantic markup should be used to mark emphasised or special text so that it can be programmatically determined.'
    ,"1_3_1_H49.AlignAttr.Semantic" : 'Semantic markup should be used to mark emphasised or special text so that it can be programmatically determined.'

    ,"1_3_1_H42" : 'Heading markup should be used if this content is intended as a heading.'

    ,"1_3_1_H63.3" : 'Table cell has an invalid scope attribute. Valid values are row, col, rowgroup, or colgroup.'
    ,"1_3_1_H63.2" : 'Scope attributes on td elements that act as headings for other elements are obsolete in HTML5. Use a th element instead.'
    ,"1_3_1_H43.ScopeAmbiguous" : 'Scope attributes on th elements are ambiguous in a table with multiple levels of headings. Use the headers attribute on td elements instead.'
    ,"1_3_1_H43.IncorrectAttr" : 'Incorrect headers attribute on this td element. Expected "{{expected}}" but found "{{actual}}"'

    ,"1_3_1_H43.HeadersRequired" : 'The relationship between td elements and their associated th elements is not defined. As this table has multiple levels of th elements, you must use the headers attribute on td elements.'
    ,"1_3_1_H43.MissingHeaderIds" : 'Not all th elements in this table contain an id attribute. These cells should contain ids so that they may be referenced by td elements\' headers attributes.'
    ,"1_3_1_H43.MissingHeadersAttrs" : 'Not all td elements in this table contain a headers attribute. Each headers attribute should list the ids of all th elements associated with that cell.'
    ,"1_3_1_H43,H63" : 'The relationship between td elements and their associated th elements is not defined. Use either the scope attribute on th elements, or the headers attribute on td elements.'
    ,"1_3_1_H63.1" : 'Not all th elements in this table have a scope attribute. These cells should contain a scope attribute to identify their association with td elements.'

    ,"1_3_1_H73.3.LayoutTable" : 'This table appears to be used for layout, but contains a summary attribute. Layout tables must not contain summary attributes, or if supplied, must be empty.'
    ,"1_3_1_H39,H73.4" : 'If this table is a data table, and both a summary attribute and a caption element are present, the summary should not duplicate the caption.'
    ,"1_3_1_H73.3.Check" : 'If this table is a data table, check that the summary attribute describes the table\'s organization or explains how to use the table.'
    ,"1_3_1_H73.3.NoSummary" : 'If this table is a data table, consider using the summary attribute of the table element to give an overview of this table.'
    ,"1_3_1_H39.3.LayoutTable" : 'This table appears to be used for layout, but contains a caption element. Layout tables must not contain captions.'
    ,"1_3_1_H39.3.Check" : 'If this table is a data table, check that the caption element accurately describes this table.'
    ,"1_3_1_H39.3.NoCaption" : 'If this table is a data table, consider using a caption element to the table element to identify this table.'

    ,"1_3_1_H71.NoLegend" : 'Fieldset does not contain a legend element. All fieldsets should contain a legend element that describes a description of the field group.'
    ,"1_3_1_H85.2" : 'If this selection list contains groups of related options, they should be grouped with optgroup.'

    ,"1_3_1_H71.SameName" : 'If these radio buttons or check boxes require a further group-level description, they should be contained within a fieldset element.'

    ,"1_3_1_H48.1" : 'This content looks like it is simulating an unordered list using plain text. If so, marking up this content with a ul element would add proper structure information to the document.'
    ,"1_3_1_H48.2" : 'This content looks like it is simulating an ordered list using plain text. If so, marking up this content with an ol element would add proper structure information to the document.'

    ,"1_3_1_G141_a" : 'The heading structure is not logically nested. This h{{headingNum}} element appears to be the primary document heading, so should be an h1 element.'
    ,"1_3_1_G141_b" : 'The heading structure is not logically nested. This h{{headingNum}} element should be an h{{properHeadingNum}} to be properly nested.'

    ,"1_3_1_H42.2" : 'Heading tag found with no content. Text that is not intended as a heading should not be marked up with heading tags.'
    ,"1_3_1_H48" : 'If this element contains a navigation section, it is recommended that it be marked up as a list.'

    ,"1_3_1_LayoutTable" : 'This table appears to be a layout table. If it is meant to instead be a data table, ensure header cells are identified using th elements.'
    ,"1_3_1_DataTable" : 'This table appears to be a data table. If it is meant to instead be a layout table, ensure there are no th elements, and no summary or caption.'


    //1_3_2.js
    ,"1_3_2_G57" : 'Check that the content is ordered in a meaningful sequence when linearised, such as when style sheets are disabled.'


    //1_3_3.js
    ,"1_3_3_G96" : 'Where instructions are provided for understanding the content, do not rely on sensory characteristics alone (such as shape, size or location) to describe objects.'


    //1_4_1.js
    ,"1_4_1_G14,G18" : 'Check that any information conveyed using colour alone is also available in text, or through other visual cues.'


    //1_4_2.js
    ,"1_4_2_F23" : 'If this element contains audio that plays automatically for longer than 3 seconds, check that there is the ability to pause, stop or mute the audio.'


    //1_4_3_F24.js
    ,"1_4_3_F24.BGColour" : 'Check that this element has an inherited foreground colour to complement the corresponding inline background colour or image.'
    ,"1_4_3_F24.FGColour" : 'Check that this element has an inherited background colour or image to complement the corresponding inline foreground colour.'


    //1_4_3.js
    ,"1_4_3_G18_or_G145.Abs" : 'This element is absolutely positioned and the background color can not be determined. Ensure the contrast ratio between the text and all covered parts of the background are at least {{required}}:1.'
    ,"1_4_3_G18_or_G145.BgImage" : 'This element\'s text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least {{required}}:1.'
    ,"1_4_3_G18_or_G145.Alpha" : 'This element\'s text or background contains transparency. Ensure the contrast ratio between the text and background are at least {{required}}:1.'
    ,"1_4_3_G18_or_G145.Fail" : 'This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least {{required}}:1, but text in this element has a contrast ratio of {{value}}:1.'
    ,"1_4_3_G18_or_G145.Fail.Recomendation" : 'Recommendation: change'
    ,"1_4_3_G18_or_G145.Fail.Recomendation.Text" : 'text colour to'
    ,"1_4_3_G18_or_G145.Fail.Recomendation.Background" : 'background to'


    //1_4_4.js
    ,"1_4_4_G142" : 'Check that text can be resized without assistive technology up to 200 percent without loss of content or functionality.'


    //1_4_5.js
    ,"1_4_5_G140,C22,C30.AALevel" : 'If the technologies being used can achieve the visual presentation, check that text is used to convey information rather than images of text, except when the image of text is essential to the information being conveyed, or can be visually customised to the user\'s requirements.'


    //1_4_6.js
    ,"1_4_6_G18_or_G17.Abs" : 'This element is absolutely positioned and the background color can not be determined. Ensure the contrast ratio between the text and all covered parts of the background are at least {{required}}:1.'
    ,"1_4_6_G18_or_G17.BgImage" : 'This element\'s text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least {{required}}:1.'
    ,"1_4_6_G18_or_G17.Fail" : 'This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least {{required}}:1, but text in this element has a contrast ratio of {{value}}:1.'
    ,"1_4_6_G18_or_G17.Fail.Recomendation" : 'Recommendation: change'
    ,"1_4_6_G18_or_G17.Fail.Recomendation.Text" : 'text colour to'
    ,"1_4_6_G18_or_G17.Fail.Recomendation.Background" : 'background to'



    //1_4_7.js
    ,"1_4_7_G56" : 'For pre-recorded audio-only content in this element that is primarily speech (such as narration), any background sounds should be muteable, or be at least 20 dB (or about 4 times) quieter than the speech.'


    //1_4_8.js
    ,"1_4_8_G148,G156,G175" : 'Check that a mechanism is available for the user to select foreground and background colours for blocks of text, either through the Web page or the browser.'
    ,"1_4_8_H87,C20" : 'Check that a mechanism exists to reduce the width of a block of text to no more than 80 characters (or 40 in Chinese, Japanese or Korean script).'
    ,"1_4_8_C19,G172,G169" : 'Check that blocks of text are not fully justified - that is, to both left and right edges - or a mechanism exists to remove full justification.'
    ,"1_4_8_G188,C21" : 'Check that line spacing in blocks of text are at least 150% in paragraphs, and paragraph spacing is at least 1.5 times the line spacing, or that a mechanism is available to achieve this.'
    ,"1_4_8_H87,G146,C26" : 'Check that text can be resized without assistive technology up to 200 percent without requiring the user to scroll horizontally on a full-screen window.'


    //1_4_9.js
    ,"1_4_9_G140,C22,C30.NoException" : 'Check that images of text are only used for pure decoration or where a particular presentation of text is essential to the information being conveyed.'


    //2_1_1.js
    ,"2_1_1_G90" : 'Ensure the functionality provided by an event handler for this element is available through the keyboard'
    ,"2_1_1_SCR20.DblClick" : 'Ensure the functionality provided by double-clicking on this element is available through the keyboard.'
    ,"2_1_1_SCR20.MouseOver" : 'Ensure the functionality provided by mousing over this element is available through the keyboard; for instance, using the focus event.'
    ,"2_1_1_SCR20.MouseOut" : 'Ensure the functionality provided by mousing out of this element is available through the keyboard; for instance, using the blur event.'
    ,"2_1_1_SCR20.MouseMove" : 'Ensure the functionality provided by moving the mouse on this element is available through the keyboard.'
    ,"2_1_1_SCR20.MouseDown" : 'Ensure the functionality provided by mousing down on this element is available through the keyboard; for instance, using the keydown event.'
    ,"2_1_1_SCR20.MouseUp" : 'Ensure the functionality provided by mousing up on this element is available through the keyboard; for instance, using the keyup event.'


    //2_1_2.js
    ,"2_1_2_F10" : 'Check that this applet or plugin provides the ability to move the focus away from itself when using the keyboard.'


    //2_2_1.js
    ,"2_2_1_F40.2" : 'Meta refresh tag used to redirect to another page, with a time limit that is not zero. Users cannot control this time limit.'
    ,"2_2_1_F41.2" : 'Meta refresh tag used to refresh the current page. Users cannot control the time limit for this refresh.'


    //2_2_2.js
    ,"2_2_2_SCR33,SCR22,G187,G152,G186,G191" : 'If any part of the content moves, scrolls or blinks for more than 5 seconds, or auto-updates, check that there is a mechanism available to pause, stop, or hide the content.'
    ,"2_2_2_F4" : 'Ensure there is a mechanism available to stop this blinking element in less than five seconds.'
    ,"2_2_2_F47" : 'Blink elements cannot satisfy the requirement that blinking information can be stopped within five seconds.'


    //2_2_3.js
    ,"2_2_3_G5" : 'Check that timing is not an essential part of the event or activity presented by the content, except for non-interactive synchronized media and real-time events.'


    //2_2_4.js
    ,"2_2_4_SCR14" : 'Check that all interruptions (including updates to content) can be postponed or suppressed by the user, except interruptions involving an emergency.'


    //2_2_5.js
    ,"2_2_5_G105,G181" : 'If this Web page is part of a set of Web pages with an inactivity time limit, check that an authenticated user can continue the activity without loss of data after re-authenticating.'


    //2_3_1.js
    ,"2_3_1_G19,G176" : 'Check that no component of the content flashes more than three times in any 1-second period, or that the size of any flashing area is sufficiently small.'


    //2_3_2.js
    ,"2_3_2_G19" : 'Check that no component of the content flashes more than three times in any 1-second period.'


    //2_4_1.js
    ,"2_4_1_H64.1" : 'Iframe element requires a non-empty title attribute that identifies the frame.'
    ,"2_4_1_H64.2" : 'Check that the title attribute of this element contains text that identifies the frame.'
    ,"2_4_1_G1,G123,G124,H69" : 'Ensure that any common navigation elements can be bypassed; for instance, by use of skip links, header elements, or ARIA landmark roles.'
    ,"2_4_1_G1,G123,G124.NoSuchID" : 'This link points to a named anchor "{{id}}" within the document, but no anchor exists with that name.'
    ,"2_4_1_G1,G123,G124.NoSuchIDFragment" : 'This link points to a named anchor "{{id}}" within the document, but no anchor exists with that name in the fragment tested.'


    //2_4_2.js
    ,"2_4_2_H25.1.NoHeadEl" : 'There is no head section in which to place a descriptive title element.'
    ,"2_4_2_H25.1.NoTitleEl" : 'A title should be provided for the document, using a non-empty title element in the head section.'
    ,"2_4_2_H25.1.EmptyTitle" : 'The title element in the head section should be non-empty.'
    ,"2_4_2_H25.2" : 'Check that the title element describes the document.'


    //2_4_3.js
    ,"2_4_3_H4.2" : 'If tabindex is used, check that the tab order specified by the tabindex attributes follows relationships in the content.'


    //2_4_4.js
    ,"2_4_4_H77,H78,H79,H80,H81,H33" : 'Check that the link text combined with programmatically determined link context, or its title attribute, identifies the purpose of the link.'
    ,"2_4_4_H77,H78,H79,H80,H81" : 'Check that the link text combined with programmatically determined link context identifies the purpose of the link.'


    //2_4_5.js
    ,"2_4_5_G125,G64,G63,G161,G126,G185" : 'If this Web page is not part of a linear process, check that there is more than one way of locating this Web page within a set of Web pages.'


    //2_4_6.js
    ,"2_4_6_G130,G131" : 'Check that headings and labels describe topic or purpose.'


    //2_4_7.js
    ,"2_4_7_G149,G165,G195,C15,SCR31" : 'Check that there is at least one mode of operation where the keyboard focus indicator can be visually located on user interface controls.'


    //2_4_8.js
    ,"2_4_8_H59.1" : 'Link elements can only be located in the head section of the document.'
    ,"2_4_8_H59.2a" : 'Link element is missing a non-empty rel attribute identifying the link type.'
    ,"2_4_8_H59.2b" : 'Link element is missing a non-empty href attribute pointing to the resource being linked.'


    //2_4_9.js
    ,"2_4_9_H30" : 'Check that text of the link describes the purpose of the link.'



    //3_1_1.js
    ,"3_1_1_H57.2" : 'The html element should have a lang or xml:lang attribute which describes the language of the document.'
    ,"3_1_1_H57.3.Lang" : 'The language specified in the lang attribute of the document element does not appear to be well-formed.'
    ,"3_1_1_H57.3.XmlLang" : 'The language specified in the xml:lang attribute of the document element does not appear to be well-formed.'


    //3_1_2.js
    ,"3_1_2_H58" : 'Ensure that any change in language is marked using the lang and/or xml:lang attribute on an element, as appropriate.'
    ,"3_1_2_H58.1.Lang" : 'The language specified in the lang attribute of this element does not appear to be well-formed.'
    ,"3_1_2_H58.1.XmlLang" : 'The language specified in the xml:lang attribute of this element does not appear to be well-formed.'


    //3_1_3.js
    ,"3_1_3_H40,H54,H60,G62,G70" : 'Check that there is a mechanism available for identifying specific definitions of words or phrases used in an unusual or restricted way, including idioms and jargon.'


    //3_1_4.js
    ,"3_1_4_G102,G55,G62,H28,G97" : 'Check that a mechanism for identifying the expanded form or meaning of abbreviations is available.'


    //3_1_5.js
    ,"3_1_5_G86,G103,G79,G153,G160" : 'Where the content requires reading ability more advanced than the lower secondary education level, supplemental content or an alternative version should be provided.'


    //3_1_6.js
    ,"3_1_6_H62.1.HTML5" : 'Ruby element does not contain an rt element containing pronunciation information for its body text.'
    ,"3_1_6_H62.1.XHTML11" : 'Ruby element does not contain an rt element containing pronunciation information for the text inside the rb element.'
    ,"3_1_6_H62.2" : 'Ruby element does not contain rp elements, which provide extra punctuation to browsers not supporting ruby text.'


    //3_2_1.js
    ,"3_2_1_G107" : 'Check that a change of context does not occur when this input field receives focus.'


    //3_2_2.js
    ,"3_2_2_H32.2" : 'This form does not contain a submit button, which creates issues for those who cannot submit the form using the keyboard. Submit buttons are INPUT elements with type attribute "submit" or "image", or BUTTON elements with type "submit" or omitted/invalid.'


    //3_2_3.js
    ,"3_2_3_G61" : 'Check that navigational mechanisms that are repeated on multiple Web pages occur in the same relative order each time they are repeated, unless a change is initiated by the user.'


    //3_2_4.js
    ,"3_2_4_G197" : 'Check that components that have the same functionality within this Web page are identified consistently in the set of Web pages to which it belongs.'


    //3_2_5.js
    ,"3_2_5_H83.3" : 'Check that this link\'s link text contains information indicating that the link will open in a new window.'


    //3_3_1.js
    ,"3_3_1_G83,G84,G85" : 'If an input error is automatically detected in this form, check that the item(s) in error are identified and the error(s) are described to the user in text.'


    //3_3_2.js
    ,"3_3_2_G131,G89,G184,H90" : 'Check that descriptive labels or instructions (including for required fields) are provided for user input in this form.'


    //3_3_3.js
    ,"3_3_3_G177" : 'Check that this form provides suggested corrections to errors in user input, unless it would jeopardize the security or purpose of the content.'


    //3_3_4.js
    ,"3_3_4_G98,G99,G155,G164,G168.LegalForms" : 'If this form would bind a user to a financial or legal commitment, modify/delete user-controllable data, or submit test responses, ensure that submissions are either reversible, checked for input errors, and/or confirmed by the user.'


    //3_3_5.js
    ,"3_3_5_G71,G184,G193" : 'Check that context-sensitive help is available for this form, at a Web-page and/or control level.'


    //3_3_6.js
    ,"3_3_6_G98,G99,G155,G164,G168.AllForms" : 'Check that submissions to this form are either reversible, checked for input errors, and/or confirmed by the user.'



    //4_1_1.js
    ,"4_1_1_F77" : 'Duplicate id attribute value "{{id}}" found on the web page.'


    //4_1_2.js
    ,"4_1_2_H91.A.Empty" : 'Anchor element found with an ID but without a href or link text. Consider moving its ID to a parent or nearby element.'
    ,"4_1_2_H91.A.EmptyWithName" : 'Anchor element found with a name attribute but without a href or link text. Consider moving the name attribute to become an ID of a parent or nearby element.'
    ,"4_1_2_H91.A.EmptyNoId" : 'Anchor element found with no link content and no name and/or ID attribute.'
    ,"4_1_2_H91.A.NoHref" : 'Anchor elements should not be used for defining in-page link targets. If not using the ID for other purposes (such as CSS or scripting), consider moving it to a parent element.'
    ,"4_1_2_H91.A.Placeholder" : 'Anchor element found with link content, but no href, ID or name attribute has been supplied.'
    ,"4_1_2_H91.A.NoContent" : 'Anchor element found with a valid href attribute, but no link content has been supplied.'


    ,"4_1_2_input_element" : 'input element'
    ,"4_1_2_role_of_button" : 'element has a role of "button" but'
    ,"4_1_2_element_content" : 'element content'
    ,"4_1_2_element" : 'element'
    ,"4_1_2_msg_pattern" : 'This {{msgNodeType}} does not have a name available to an accessibility API. Valid names are: {{builtAttrs}}.'
    ,"4_1_2_msg_pattern2" : 'This {{msgNodeType}} does not have a value available to an accessibility API.'
    ,"4_1_2_msg_add_one" : 'Add one by adding content to the element.'
    ,"4_1_2_msg_pattern3" : 'This {{msgNodeType}} does not have an initially selected option. Depending on your HTML version, the value exposed to an accessibility API may be undefined.'
    ,"4_1_2_value_exposed_using_attribute" : 'A value is exposed using the {{requiredValue}} attribute.'
    ,"4_1_2_value_exposed_using_element" : 'A value is exposed using the {{requiredValue}} element.'

};
