var HTMLCS_RUNNER = new function() {
    this.run = function(standard) {
        var self = this;

        // At the moment, it passes the whole DOM document.
        HTMLCS.process(standard, document, function() {
            var messages = HTMLCS.getMessages();
            var length   = messages.length;
            for (var i = 0; i < length; i++) {
                self.output(messages[i]);
            }

            console.log('done');
        });
    };

    this.output = function(msg) {
        // Simple output for now.
        var typeName = 'UNKNOWN';
        switch (msg.type) {
            case HTMLCS.ERROR:
                typeName = 'ERROR';
            break;

            case HTMLCS.WARNING:
                typeName = 'WARNING';
            break;

            case HTMLCS.NOTICE:
                typeName = 'NOTICE';
            break;
        }//end switch

        console.log(typeName + '|' + msg.code + '|' + msg.msg);
    };

};