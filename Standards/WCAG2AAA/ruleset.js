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

_global.HTMLCS_WCAG2AAA = {
    name: 'WCAG2AAA',
    description: 'Web Content Accessibility Guidelines (WCAG) 2.1 AAA',
    sniffs: [
        'Principle1.Guideline1_1.1_1_1',
        'Principle1.Guideline1_2.1_2_1',
        'Principle1.Guideline1_2.1_2_2',
        'Principle1.Guideline1_2.1_2_4',
        'Principle1.Guideline1_2.1_2_5',
        'Principle1.Guideline1_2.1_2_6',
        'Principle1.Guideline1_2.1_2_7',
        'Principle1.Guideline1_2.1_2_8',
        'Principle1.Guideline1_2.1_2_9',
        'Principle1.Guideline1_3.1_3_1',
        'Principle1.Guideline1_3.1_3_1_AAA',
        'Principle1.Guideline1_3.1_3_2',
        'Principle1.Guideline1_3.1_3_3',
        'Principle1.Guideline1_3.1_3_4',
        'Principle1.Guideline1_3.1_3_5',
        'Principle1.Guideline1_3.1_3_6',
        'Principle1.Guideline1_4.1_4_1',
        'Principle1.Guideline1_4.1_4_2',
        'Principle1.Guideline1_4.1_4_3_F24',
        'Principle1.Guideline1_4.1_4_3_Contrast',
        'Principle1.Guideline1_4.1_4_6',
        'Principle1.Guideline1_4.1_4_7',
        'Principle1.Guideline1_4.1_4_8',
        'Principle1.Guideline1_4.1_4_9',
        'Principle1.Guideline1_4.1_4_10',
        'Principle1.Guideline1_4.1_4_11',
        'Principle1.Guideline1_4.1_4_12',
        'Principle1.Guideline1_4.1_4_13',
        'Principle2.Guideline2_1.2_1_1',
        'Principle2.Guideline2_1.2_1_2',
        'Principle2.Guideline2_1.2_1_4',
        'Principle2.Guideline2_2.2_2_2',
        'Principle2.Guideline2_2.2_2_3',
        'Principle2.Guideline2_2.2_2_4',
        'Principle2.Guideline2_2.2_2_5',
        'Principle2.Guideline2_2.2_2_6',
        'Principle2.Guideline2_3.2_3_2',
        'Principle2.Guideline2_3.2_3_3',
        'Principle2.Guideline2_4.2_4_1',
        'Principle2.Guideline2_4.2_4_2',
        'Principle2.Guideline2_4.2_4_3',
        'Principle2.Guideline2_4.2_4_5',
        'Principle2.Guideline2_4.2_4_6',
        'Principle2.Guideline2_4.2_4_7',
        'Principle2.Guideline2_4.2_4_8',
        'Principle2.Guideline2_4.2_4_9',
        'Principle2.Guideline2_5.2_5_1',
        'Principle2.Guideline2_5.2_5_2',
        'Principle2.Guideline2_5.2_5_3',
        'Principle2.Guideline2_5.2_5_4',
        'Principle2.Guideline2_5.2_5_5',
        'Principle2.Guideline2_5.2_5_6',
        'Principle3.Guideline3_1.3_1_1',
        'Principle3.Guideline3_1.3_1_2',
        'Principle3.Guideline3_1.3_1_3',
        'Principle3.Guideline3_1.3_1_4',
        'Principle3.Guideline3_1.3_1_5',
        'Principle3.Guideline3_1.3_1_6',
        'Principle3.Guideline3_2.3_2_1',
        'Principle3.Guideline3_2.3_2_2',
        'Principle3.Guideline3_2.3_2_3',
        'Principle3.Guideline3_2.3_2_4',
        'Principle3.Guideline3_2.3_2_5',
        'Principle3.Guideline3_3.3_3_1',
        'Principle3.Guideline3_3.3_3_2',
        'Principle3.Guideline3_3.3_3_3',
        'Principle3.Guideline3_3.3_3_5',
        'Principle3.Guideline3_3.3_3_6',
        'Principle4.Guideline4_1.4_1_1',
        'Principle4.Guideline4_1.4_1_2',
        'Principle4.Guideline4_1.4_1_3'
    ],
    getMsgInfo: function(code) {
        var principles = {
            'Principle1': {
                name: 'Perceivable',
                link: 'http://www.w3.org/TR/WCAG21/#perceivable'
            },
            'Principle2': {
                name: 'Operable',
                link: 'http://www.w3.org/TR/WCAG21/#operable'
            },
            'Principle3': {
                name: 'Understandable',
                link: 'http://www.w3.org/TR/WCAG21/#understandable'
            },
            'Principle4': {
                name: 'Robust',
                link: 'http://www.w3.org/TR/WCAG21/#robust'
            }
        };

        /**
         * List of success criteria, their links in the WCAG21 doc, and their
         * "priority" (to use a WCAG1 term)... priority 1 = single-A, 3 = triple-A.
         *
         * Priority 0 indicates a conformance requirement. CR1 isn't shown because
         * all it says is "to conform to each level, it must pass all at that level".
         */
        var successCritList = {
            'CR2': {
                name: 'Full pages',
                landmark: 'cc2',
                priority: 0,
            },
            'CR3': {
                name: 'Complete processes',
                landmark: 'cc3',
                priority: 0,
            },
            'CR4': {
                name: 'Only Accessibility-Supported Ways of Using Technologies',
                landmark: 'cc4',
                priority: 0,
            },
            'CR5': {
                name: 'Non-Interference',
                landmark: 'cc5',
                priority: 0,
            },
            '1.1.1': {
                name: 'Non-Text Content',
                landmark: 'non-text-content',
                priority: 1,
            },
            '1.2.1': {
                name: 'Audio-only and Video-only (Prerecorded)',
                landmark: 'audio-only-and-video-only-prerecorded',
                priority: 1,
            },
            '1.2.2': {
                name: 'Captions (Prerecorded)',
                landmark: 'captions-prerecorded',
                priority: 1,
            },
            '1.2.3': {
                name: 'Audio Description or Media Alternative (Prerecorded)',
                landmark: 'audio-description-or-media-alternative-prerecorded',
                priority: 1,
            },
            '1.2.4': {
                name: 'Captions (Live)',
                landmark: 'captions-live',
                priority: 2,
            },
            '1.2.5': {
                name: 'Audio Description (Prerecorded)',
                landmark: 'audio-description-prerecorded',
                priority: 2,
            },
            '1.2.6': {
                name: 'Sign Language (Prerecorded)',
                landmark: 'sign-language-prerecorded',
                priority: 3,
            },
            '1.2.7': {
                name: 'Extended Audio Description (Prerecorded)',
                landmark: 'extended-audio-description-prerecorded',
                priority: 3,
            },
            '1.2.8': {
                name: 'Media Alternative (Prerecorded)',
                landmark: 'media-alternative-prerecorded',
                priority: 3,
            },
            '1.2.9': {
                name: 'Audio-only (Live)',
                landmark: 'audio-only-live',
                priority: 3,
            },
            '1.3.1': {
                name: 'Info and Relationships',
                landmark: 'info-and-relationships',
                priority: 1,
            },
            '1.3.2': {
                name: 'Meaningful Sequence',
                landmark: 'meaningful-sequence',
                priority: 1,
            },
            '1.3.3': {
                name: 'Sensory Characteristics',
                landmark: 'sensory-characteristics',
                priority: 1,
            },
            '1.3.4': {
                name: 'Orientation',
                landmark: 'orientation',
                priority: 2,
            },
            '1.3.5': {
                name: 'Identify Input Purpose',
                landmark: 'identify-input-purpose',
                priority: 2,
            },
            '1.3.6': {
                name: 'Identify Purpose',
                landmark: 'identify-purpose',
                priority: 3,
            },
            '1.4.1': {
                name: 'Use of Colour',
                landmark: 'use-of-color',
                priority: 1,
            },
            '1.4.2': {
                name: 'Audio Control',
                landmark: 'audio-control',
                priority: 1,
            },
            '1.4.3': {
                name: 'Contrast (Minimum)',
                landmark: 'contrast-minimum',
                priority: 1,
            },
            '1.4.4': {
                name: 'Resize Text',
                landmark: 'resize-text',
                priority: 1,
            },
            '1.4.5': {
                name: 'Images of Text',
                landmark: 'images-of-text',
                priority: 1,
            },
            '1.4.6': {
                name: 'Contrast (Enhanced)',
                landmark: 'contrast-enhanced',
                priority: 3,
            },
            '1.4.7': {
                name: 'Low or No Background Audio',
                landmark: 'low-or-no-background-audio',
                priority: 3,
            },
            '1.4.8': {
                name: 'Visual Presentation',
                landmark: 'visual--presentation',
                priority: 3,
            },
            '1.4.9': {
                name: 'Images of Text (No Exception)',
                landmark: 'images-of-text-no-exception',
                priority: 3,
            },
            '1.4.10': {
                name: 'Reflow',
                landmark: 'reflow',
                priority: 2,
            },
            '1.4.11': {
                name: 'Non-text Contrast',
                landmark: 'non-text-contrast',
                priority: 2,
            },
            '1.4.12': {
                name: 'Text Spacing',
                landmark: 'text-spacing',
                priority: 2,
            },
            '1.4.13': {
                name: 'Content on Hover or Focus',
                landmark: 'content-on-hover-or-focus',
                priority: 2,
            },
            '2.1.1': {
                name: 'Keyboard',
                landmark: 'keyboard',
                priority: 1,
            },
            '2.1.2': {
                name: 'No Keyboard Trap',
                landmark: 'no-keyboard-trap',
                priority: 1,
            },
            '2.1.3': {
                name: 'Keyboard (No Exception)',
                landmark: 'keyboard-no-exception',
                priority: 3,
            },
            '2.1.4': {
                name: 'Character Key Shortcuts',
                landmark: 'character-key-shortcuts',
                priority: 1,
            },
            '2.2.1': {
                name: 'Timing Adjustable',
                landmark: 'timing-adjustable',
                priority: 1,
            },
            '2.2.2': {
                name: 'Pause, Stop, Hide',
                landmark: 'pause-stop-hide',
                priority: 1,
            },
            '2.2.3': {
                name: 'No Timing',
                landmark: 'no-timing',
                priority: 3,
            },
            '2.2.4': {
                name: 'Interruptions',
                landmark: 'interruptions',
                priority: 3,
            },
            '2.2.5': {
                name: 'Re-authenticating',
                landmark: 're-authenticating',
                priority: 3,
            },
            '2.2.6': {
                name: 'Timeouts',
                landmark: 'timeouts',
                priority: 3,
            },
            '2.3.1': {
                name: 'Three Flashes or Below Threshold',
                landmark: 'three-flashes-or-below-threshold',
                priority: 1,
            },
            '2.3.2': {
                name: 'Three Flashes',
                landmark: 'three-flashes',
                priority: 3,
            },
            '2.3.3': {
                name: 'Animation from Interactions',
                landmark: 'animation-from-interactions',
                priority: 3,
            },
            '2.4.1': {
                name: 'Bypass Blocks',
                landmark: 'bypass-blocks',
                priority: 1,
            },
            '2.4.2': {
                name: 'Page Titled',
                landmark: 'page-titled',
                priority: 1,
            },
            '2.4.3': {
                name: 'Focus Order',
                landmark: 'focus-order',
                priority: 1,
            },
            '2.4.4': {
                name: 'Link Purpose (In Context)',
                landmark: 'link-purpose-in-context',
                priority: 1,
            },
            '2.4.5': {
                name: 'Multiple Ways',
                landmark: 'multiple-ways',
                priority: 2,
            },
            '2.4.6': {
                name: 'Headings and Labels',
                landmark: 'headings-and-labels',
                priority: 2,
            },
            '2.4.7': {
                name: 'Focus Visible',
                landmark: 'focus-visible',
                priority: 2,
            },
            '2.4.8': {
                name: 'Location',
                landmark: 'location',
                priority: 3,
            },
            '2.4.9': {
                name: 'Link Purpose (Link Only)',
                landmark: 'link-purpose-link-only',
                priority: 3,
            },
            '2.4.10': {
                name: 'Section Headings',
                landmark: 'section-headings',
                priority: 3,
            },
            '2.5.1': {
                name: 'Pointer Gestures',
                landmark: 'pointer-gestures',
                priority: 1,
            },
            '2.5.2': {
                name: 'Pointer Cancellation',
                landmark: 'pointer-cancellation',
                priority: 1,
            },
            '2.5.3': {
                name: 'Label In Name',
                landmark: 'label-in-name',
                priority: 1,
            },
            '2.5.4': {
                name: 'Motion Actuation',
                landmark: 'motion-actuation',
                priority: 1,
            },
            '2.5.5': {
                name: 'Target Size',
                landmark: 'target-size',
                priority: 3,
            },
            '2.5.6': {
                name: 'Concurrent Input Mechanisms',
                landmark: 'concurrent-input-mechanisms',
                priority: 3,
            },
            '3.1.1': {
                name: 'Language of Page',
                landmark: 'language-of-page',
                priority: 1,
            },
            '3.1.2': {
                name: 'Language of Parts',
                landmark: 'language-of-parts',
                priority: 2,
            },
            '3.1.3': {
                name: 'Unusual Words',
                landmark: 'unusual-words',
                priority: 3,
            },
            '3.1.4': {
                name: 'Abbreviations',
                landmark: 'abbreviations',
                priority: 3,
            },
            '3.1.5': {
                name: 'Reading Level',
                landmark: 'reading-level',
                priority: 3,
            },
            '3.1.6': {
                name: 'Pronunciation',
                landmark: 'pronunciation',
                priority: 3,
            },
            '3.2.1': {
                name: 'On Focus',
                landmark: 'on-focus',
                priority: 1,
            },
            '3.2.2': {
                name: 'On Input',
                landmark: 'on-input',
                priority: 1,
            },
            '3.2.3': {
                name: 'Consistent Navigation',
                landmark: 'consistent-navigation',
                priority: 2,
            },
            '3.2.4': {
                name: 'Consistent Identification',
                landmark: 'consistent-identification',
                priority: 2,
            },
            '3.2.5': {
                name: 'Change on Request',
                landmark: 'change-on-request',
                priority: 3,
            },
            '3.3.1': {
                name: 'Error Identification',
                landmark: 'error-identification',
                priority: 1,
            },
            '3.3.2': {
                name: 'Labels or Instructions',
                landmark: 'labels-or-instructions',
                priority: 1,
            },
            '3.3.3': {
                name: 'Error Suggestion',
                landmark: 'error-suggestion',
                priority: 2,
            },
            '3.3.4': {
                name: 'Error Prevention (Legal, Financial, Data)',
                landmark: 'error-prevention-legal-financial-data',
                priority: 2,
            },
            '3.3.5': {
                name: 'Help',
                landmark: 'help',
                priority: 3,
            },
            '3.3.6': {
                name: 'Error Prevention (All)',
                landmark: 'error-prevention-all',
                priority: 3,
            },
            '4.1.1': {
                name: 'Parsing',
                landmark: 'parsing',
                priority: 1,
            },
            '4.1.2': {
                name: 'Name, Role, Value',
                landmark: 'name-role-value',
                priority: 1,
            },
            '4.1.3': {
                name: 'Status Messages',
                landmark: 'status-messages',
                priority: 2,
            },
        };

        var msgCodeParts  = code.split('.', 5);
        var principle     = msgCodeParts[1];
        var successCrit   = msgCodeParts[3].split('_').slice(0, 3).join('.');
        var techniques    = msgCodeParts[4].split(',');
        var techniquesStr = [];
        function getPrefix(x) {
            // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
            function startsWith(str, search, rawPos) {
                var pos = rawPos > 0 ? rawPos|0 : 0;
                return str.substring(pos, pos + search.length) === search;
            }

            if (startsWith(x, 'ARIA')) {
                return 'aria/';
            }
            if (startsWith(x, 'SCR')) {
                return 'client-side-script/';
            }
            if (startsWith(x, 'C')) {
                return 'css/';
            }
            if (startsWith(x, 'FLASH')) {
                return 'flash/';
            }
            if (startsWith(x, 'F')) {
                return 'failures/';
            }
            if (startsWith(x, 'G')) {
                return 'general/';
            }
            if (startsWith(x, 'H')) {
                return 'html/';
            }
            if (startsWith(x, 'PDF')) {
                return 'pdf/';
            }
            if (startsWith(x, 'SVR')) {
                return 'server-side-script/';
            }
            if (startsWith(x, 'SL')) {
                return 'silverlight/';
            }
            if (startsWith(x, 'SM')) {
                return 'smil/';
            }
            if (startsWith(x, 'T')) {
                return 'text/';
            }
            return '';
        }

        for (var i = 0; i < techniques.length; i++) {
            techniques[i]  = techniques[i].split('.');
            if (techniques[i][0] !== '') {
                techniquesStr.push('<a href="https://www.w3.org/WAI/WCAG21/Techniques/' + getPrefix(techniques[i][0]) + techniques[i][0] + '" target="_blank">' + techniques[i][0] + '</a>');
            }
        }

        var successCritStr = ['<a href="http://www.w3.org/TR/WCAG21/#' + successCritList[successCrit].landmark, '" target="_blank">', successCrit, ': ', successCritList[successCrit].name, '</a>'].join('');
        /* eslint-disable-next-line no-unused-vars */
        var principleStr   = ['<a href="', principles[principle].link, '" target="_blank">', principles[principle].name, '</a>'].join('');
        var retval = [
            [_global.HTMLCS.getTranslation("auditor_success_criterion"), successCritStr],
        ];
        if (techniquesStr.length > 0) {
            retval.push([_global.HTMLCS.getTranslation("auditor_suggested_techniques"), techniquesStr.join(' ')]);
        }

        return retval;
    }
};
