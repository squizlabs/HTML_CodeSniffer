/* exported HTMLCS_RUNNER */
var HTMLCS_RUNNER = _global.HTMLCS_RUNNER = new function() {
    this.run = function(standard, callback) {
        var self = this;

        // At the moment, it passes the whole DOM document.
        HTMLCS.process(standard, document, function() {
            var messages = HTMLCS.getMessages();
            var length   = messages.length;
            var msgCount = {};
            msgCount[HTMLCS.ERROR]   = 0;
            msgCount[HTMLCS.WARNING] = 0;
            msgCount[HTMLCS.NOTICE]  = 0;

            for (var i = 0; i < length; i++) {
                self.output(messages[i]);
                msgCount[messages[i].type]++;
            }
            console.log('done');
        }, function() {
            console.log('Something in HTML_CodeSniffer failed to parse. Cannot run.');
            console.log('done');
        }, 'en');
    };

    this.output = function(msg) {
        // Simple output for now.
        var typeName = 'UNKNOWN';
        switch (msg.type) {
        case HTMLCS.ERROR:
            typeName = _global.HTMLCS.getTranslation("auditor_error");
            break;

        case HTMLCS.WARNING:
            typeName = _global.HTMLCS.getTranslation("auditor_warning");
            break;

        case HTMLCS.NOTICE:
            typeName = _global.HTMLCS.getTranslation("auditor_notice");
            break;
        }//end switch

        var nodeName = '';
        if (msg.element) {
            nodeName = msg.element.nodeName.toLowerCase();
        }

        var elementId = '';
        if (msg.element.id && (msg.element.id !== '')) {
            elementId = '#' + msg.element.id;
        }

        // Clone the node to get it's outerHTML (with inner replaced with ... for brevity)
        var html = '';
        if (msg.element.outerHTML) {
            var node = msg.element.cloneNode(true);
            node.innerHTML = '...';
            html = node.outerHTML;
        }

        console.log('[HTMLCS] ' + typeName + '|' + msg.code + '|' + nodeName + '|' + elementId + '|' + msg.msg + '|' + html);
    };

};
