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
    description: 'Web Content Accessibility Guidelines (WCAG) 2.0 AAA',
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
        'Principle1.Guideline1_4.1_4_1',
        'Principle1.Guideline1_4.1_4_2',
        'Principle1.Guideline1_4.1_4_3_F24',
        'Principle1.Guideline1_4.1_4_3_Contrast',
        'Principle1.Guideline1_4.1_4_6',
        'Principle1.Guideline1_4.1_4_7',
        'Principle1.Guideline1_4.1_4_8',
        'Principle1.Guideline1_4.1_4_9',
        'Principle2.Guideline2_1.2_1_1',
        'Principle2.Guideline2_1.2_1_2',
        'Principle2.Guideline2_2.2_2_2',
        'Principle2.Guideline2_2.2_2_3',
        'Principle2.Guideline2_2.2_2_4',
        'Principle2.Guideline2_2.2_2_5',
        'Principle2.Guideline2_3.2_3_2',
        'Principle2.Guideline2_4.2_4_1',
        'Principle2.Guideline2_4.2_4_2',
        'Principle2.Guideline2_4.2_4_3',
        'Principle2.Guideline2_4.2_4_5',
        'Principle2.Guideline2_4.2_4_6',
        'Principle2.Guideline2_4.2_4_7',
        'Principle2.Guideline2_4.2_4_8',
        'Principle2.Guideline2_4.2_4_9',
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
        'Principle4.Guideline4_1.4_1_2'
    ],
    getMsgInfo: function(code) {
        var principles = {
            'Principle1': {
                name: 'Perceivable',
                link: 'http://www.w3.org/TR/WCAG20/#perceivable'
               },
            'Principle2': {
                name: 'Operable',
                link: 'http://www.w3.org/TR/WCAG20/#operable'
               },
            'Principle3': {
                name: 'Understandable',
                link: 'http://www.w3.org/TR/WCAG20/#understandable'
               },
            'Principle4': {
                name: 'Robust',
                link: 'http://www.w3.org/TR/WCAG20/#robust'
               }
        }

        /**
         * List of success criteria, their links in the WCAG20 doc, and their
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
                landmark: 'text-equiv-all',
                priority: 1,
            },
            '1.2.1': {
                name: 'Audio-only and Video-only (Prerecorded)',
                landmark: 'media-equiv-av-only-alt',
                priority: 1,
            },
            '1.2.2': {
                name: 'Captions (Prerecorded)',
                landmark: 'media-equiv-captions',
                priority: 1,
            },
            '1.2.3': {
                name: 'Audio Description or Media Alternative (Prerecorded)',
                landmark: 'media-equiv-audio-desc',
                priority: 1,
            },
            '1.2.4': {
                name: 'Captions (Live)',
                landmark: 'media-equiv-captions',
                priority: 2,
            },
            '1.2.5': {
                name: 'Audio Description (Prerecorded)',
                landmark: 'media-equiv-audio-desc',
                priority: 2,
            },
            '1.2.6': {
                name: 'Sign Language (Prerecorded)',
                landmark: 'media-equiv-sign',
                priority: 3,
            },
            '1.2.7': {
                name: 'Extended Audio Description (Prerecorded)',
                landmark: 'media-equiv-extended-ad',
                priority: 3,
            },
            '1.2.8': {
                name: 'Media Alternative (Prerecorded)',
                landmark: 'media-equiv-text-doc',
                priority: 3,
            },
            '1.2.9': {
                name: 'Audio-only (Live)',
                landmark: 'media-equiv-live-audio-only',
                priority: 3,
            },
            '1.3.1': {
                name: 'Info and Relationships',
                landmark: 'content-structure-separation-programmatic',
                priority: 1,
            },
            '1.3.2': {
                name: 'Meaningful Sequence',
                landmark: 'content-structure-separation-sequence',
                priority: 1,
            },
            '1.3.3': {
                name: 'Sensory Characteristics',
                landmark: 'content-structure-separation-understanding',
                priority: 1,
            },
            '1.4.1': {
                name: 'Use of Colour',
                landmark: 'visual-audio-contrast-without-color',
                priority: 1,
            },
            '1.4.2': {
                name: 'Audio Control',
                landmark: 'visual-audio-contrast-dis-audio',
                priority: 1,
            },
            '1.4.3': {
                name: 'Contrast (Minimum)',
                landmark: 'visual-audio-contrast-contrast',
                priority: 1,
            },
            '1.4.4': {
                name: 'Resize Text',
                landmark: 'visual-audio-contrast-scale',
                priority: 1,
            },
            '1.4.5': {
                name: 'Images of Text',
                landmark: 'visual-audio-contrast-text-presentation',
                priority: 1,
            },
            '1.4.6': {
                name: 'Contrast (Enhanced)',
                landmark: 'visual-audio-contrast7',
                priority: 3,
            },
            '1.4.7': {
                name: 'Low or No Background Audio',
                landmark: 'visual-audio-contrast-noaudio',
                priority: 3,
            },
            '1.4.8': {
                name: 'Visual Presentation',
                landmark: 'visual-audio-contrast-visual-presentation',
                priority: 3,
            },
            '1.4.9': {
                name: 'Images of Text (No Exception)',
                landmark: 'visual-audio-contrast-text-images',
                priority: 3,
            },
            '2.1.1': {
                name: 'Keyboard',
                landmark: 'keyboard-operation-keyboard-operable',
                priority: 1,
            },
            '2.1.2': {
                name: 'No Keyboard Trap',
                landmark: 'keyboard-operation-trapping',
                priority: 1,
            },
            '2.1.3': {
                name: 'Keyboard (No Exception)',
                landmark: 'keyboard-operation-all-funcs',
                priority: 3,
            },
            '2.2.1': {
                name: 'Timing Adjustable',
                landmark: 'time-limits-required-behaviors',
                priority: 1,
            },
            '2.2.2': {
                name: 'Pause, Stop, Hide',
                landmark: 'time-limits-pause',
                priority: 1,
            },
            '2.2.3': {
                name: 'No Timing',
                landmark: 'time-limits-no-exceptions',
                priority: 3,
            },
            '2.2.4': {
                name: 'Interruptions',
                landmark: 'time-limits-postponed',
                priority: 3,
            },
            '2.2.5': {
                name: 'Re-authenticating',
                landmark: 'time-limits-server-timeout',
                priority: 3,
            },
            '2.3.1': {
                name: 'Three Flashes or Below Threshold',
                landmark: 'seizure-does-not-violate',
                priority: 1,
            },
            '2.3.2': {
                name: 'Three Flashes',
                landmark: 'seizure-three-times',
                priority: 3,
            },
            '2.4.1': {
                name: 'Bypass Blocks',
                landmark: 'navigation-mechanisms-skip',
                priority: 1,
            },
            '2.4.2': {
                name: 'Page Titled',
                landmark: 'navigation-mechanisms-title',
                priority: 1,
            },
            '2.4.3': {
                name: 'Focus Order',
                landmark: 'navigation-mechanisms-focus-order',
                priority: 1,
            },
            '2.4.4': {
                name: 'Link Purpose (In Context)',
                landmark: 'navigation-mechanisms-refs',
                priority: 1,
            },
            '2.4.5': {
                name: 'Multiple Ways',
                landmark: 'navigation-mechanisms-mult-loc',
                priority: 2,
            },
            '2.4.6': {
                name: 'Headings and Labels',
                landmark: 'navigation-mechanisms-descriptive',
                priority: 2,
            },
            '2.4.7': {
                name: 'Focus Visible',
                landmark: 'navigation-mechanisms-focus-visible',
                priority: 2,
            },
            '2.4.8': {
                name: 'Location',
                landmark: 'navigation-mechanisms-location',
                priority: 3,
            },
            '2.4.9': {
                name: 'Link Purpose (Link Only)',
                landmark: 'navigation-mechanisms-link',
                priority: 3,
            },
            '2.4.10': {
                name: 'Section Headings',
                landmark: 'navigation-mechanisms-headings',
                priority: 3,
            },
            '3.1.1': {
                name: 'Language of Page',
                landmark: 'meaning-doc-lang-id',
                priority: 1,
            },
            '3.1.2': {
                name: 'Language of Parts',
                landmark: 'meaning-other-lang-id',
                priority: 2,
            },
            '3.1.3': {
                name: 'Unusual Words',
                landmark: 'meaning-idioms',
                priority: 3,
            },
            '3.1.4': {
                name: 'Abbreviations',
                landmark: 'meaning-located',
                priority: 3,
            },
            '3.1.5': {
                name: 'Reading Level',
                landmark: 'meaning-supplements',
                priority: 3,
            },
            '3.1.6': {
                name: 'Pronunciation',
                landmark: 'meaning-pronunciation',
                priority: 3,
            },
            '3.2.1': {
                name: 'On Focus',
                landmark: 'consistent-behavior-receive-focus',
                priority: 1,
            },
            '3.2.2': {
                name: 'On Input',
                landmark: 'consistent-behavior-unpredictable-change',
                priority: 1,
            },
            '3.2.3': {
                name: 'Consistent Navigation',
                landmark: 'consistent-behavior-consistent-locations',
                priority: 2,
            },
            '3.2.4': {
                name: 'Consistent Navigation',
                landmark: 'consistent-behavior-consistent-functionality',
                priority: 2,
            },
            '3.2.5': {
                name: 'Change on Request',
                landmark: 'consistent-behavior-no-extreme-changes-context',
                priority: 3,
            },
            '3.3.1': {
                name: 'Error Identification',
                landmark: 'minimize-error-identified',
                priority: 1,
            },
            '3.3.2': {
                name: 'Labels or Instructions',
                landmark: 'minimize-error-cues',
                priority: 1,
            },
            '3.3.3': {
                name: 'Error Suggestion',
                landmark: 'minimize-error-suggestions',
                priority: 2,
            },
            '3.3.4': {
                name: 'Error Prevention (Legal, Financial, Data)',
                landmark: 'minimize-error-reversible',
                priority: 2,
            },
            '3.3.5': {
                name: 'Help',
                landmark: 'minimize-error-context-help',
                priority: 3,
            },
            '3.3.6': {
                name: 'Error Prevention (All)',
                landmark: 'minimize-error-reversible-all',
                priority: 3,
            },
            '4.1.1': {
                name: 'Parsing',
                landmark: 'ensure-compat-parses',
                priority: 1,
            },
            '4.1.2': {
                name: 'Name, Role, Value',
                landmark: 'ensure-compat-rsv',
                priority: 1,
            },
        };

        var msgCodeParts  = code.split('.', 5);
        var principle     = msgCodeParts[1];
        var successCrit   = msgCodeParts[3].split('_').slice(0, 3).join('.');
        var techniques    = msgCodeParts[4].split(',');
        var techniquesStr = [];

        for (var i = 0; i < techniques.length; i++) {
            techniques[i]  = techniques[i].split('.');
            techniquesStr.push('<a href="http://www.w3.org/TR/WCAG20-TECHS/' + techniques[i][0] + '" target="_blank">' + techniques[i][0] + '</a>');
        }

        var successCritStr = ['<a href="http://www.w3.org/TR/WCAG20/#' + successCritList[successCrit].landmark, '" target="_blank">', successCrit, ': ', successCritList[successCrit].name, '</a>'].join('');
        var principleStr   = ['<a href="', principles[principle].link, '" target="_blank">', principles[principle].name, '</a>'].join('');
        var retval = [
            [_global.translation["auditor_success_criterion"], successCritStr],
            [_global.translation["auditor_suggested_techniques"], techniquesStr.join(' ')]
        ];

        return retval;
    }
};
