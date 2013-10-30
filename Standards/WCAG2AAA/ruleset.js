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

window.HTMLCS_WCAG2AAA = {
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

        var msgCodeParts  = code.split('.', 5);
        var principle     = msgCodeParts[1];
        var techniques    = msgCodeParts[4].split(',');
        var techniquesStr = [];

        for (var i = 0; i < techniques.length; i++) {
            techniques[i]  = techniques[i].split('.');
            techniquesStr.push('<a href="http://www.w3.org/TR/WCAG20-TECHS/' + techniques[i][0] + '" target="_blank">' + techniques[i][0] + '</a>');
        }

        var principleStr = ['<a href="', principles[principle].link, '" target="_blank">', principles[principle].name, '</a>'].join('');
        var retval = [
            ['Principle', principleStr],
            ['Techniques', techniquesStr.join(' ')]
        ];

        return retval;
    }
};
