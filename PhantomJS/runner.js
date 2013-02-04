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
        console.log(msg.type + '|' + msg.code + '|' + msg.msg);
    };

};