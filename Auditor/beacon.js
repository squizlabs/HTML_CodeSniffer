var _gaBeacon = {
    uaAcct: '359178.17',
    self: this,

    /**
     * Build a GA domain hash.
     */
    domainHash: function(domain) {
        var hash = 0;
        var c    = 0;

        for (var pos = domain.length - 1; pos >= 0; pos--) {
            var ord = domain.charCodeAt(pos);
            hash    = (hash << 6 & 0xfffffff) + ord + (ord << 14);
            c       = hash & 0xfe00000;
            hash    = (c != 0) ? (hash ^ c >> 21) : hash;
        }

        return hash;
    },

    /**
     * Get a random number.
     */
    rand: function() {
        return Math.floor(Math.random() * 0x80000000);
    },

    /**
     * Build a new utma cookie.
     */
    buildUtma: function() {
        var utma = [];

        utma.push(this.domainHash(document.location.hostname));
        utma.push(this.rand());
        utma.push(Math.floor((new Date().getTime()) / 1000));
        utma.push(utma[2]);
        utma.push(utma[2]);
        utma.push(1);

        return utma.join('.');
    },

    /**
     * Renew a utma cookie (potentially).
     */
    renewUtma: function(utma, force) {
        var utmc = this.getCookie('utmc');

        if ((force === true) || (!utmc)) {
            utma = utma.split('.');
            utma[5]++;
            utma[3] = utma[4];
            utma[4] = Math.floor((new Date().getTime()) / 1000);
            utma = utma.join('.');
        }

        return utma;
    },

    /**
     * Build custom vars "X10" code.
     */
    buildCustomVars: function(standard, errors, warnings, notices) {
        var keys   = ['Standard', 'Errors', 'Warnings', 'Notices'];
        var values = [standard, errors, warnings, notices];
        var x10    = '';

        x10 += '8(' + keys.join('*') + ')';
        x10 += '9(' + values.join('*') + ')';

        return x10;
    },

    /**
     * Build a URL.
     */
    url: function(standard, errors, warnings, notices, force) {
        var url = 'http://www.google-analytics.com/__utm.gif?';
        if (location.protocol === 'https:') {
            url = 'https://ssl.google-analytics.com/__utm.gif?';
        }

        var utma = this.getCookie('utma');
        if (!utma) {
            utma = this.buildUtma();
        } else {
            utma = this.renewUtma(utma, force);
        }

        var expires = new Date();
        expires.setFullYear(expires.getFullYear() + 2);

        this.setCookie('utma', utma, expires);
        this.setCookie('utmc', this.domainHash(document.location.hostname));

        var getVars = {
            utmwv: '0.0',
            utmn: this.rand(),
            utmhn: document.location.hostname,
            utmp: document.location.pathname,
            utmac: 'UA-' + this.uaAcct.split('.').join('-'),
            utme: this.buildCustomVars(standard, errors, warnings, notices),
            utmcc: '__utma=' + utma + ';'
        }

        for (varName in getVars) {
            url += escape(varName) + '=' + escape(getVars[varName]) + '&';
        }

        return url;
    },

    /**
     * Set cookie.
     */
    setCookie: function(cookieName, value, expires) {
        cookieName = '__htmlcs.' + cookieName;

        var cookieStr = cookieName + '=' + value;
        cookieStr    += ';path=/';

        if (expires) {
            cookieStr += ';expires=' + escape(expires.toString());
        }

        document.cookie = cookieStr;
    },

    /**
     * Check whether cookie exists.
     * (Based on Mozilla Developer Network page example on "document.cookie").
     */
    cookieExists: function (cookieName) {
        cookieName  = '__htmlcs.' + cookieName;
        return (new RegExp("(?:^|;\\s*)" + escape(cookieName).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },

    /**
     * Get cookie.
     * (Based on Mozilla Developer Network page example on "document.cookie").
     */
    getCookie: function(cookieName) {
        if (this.cookieExists(cookieName) === false) {
            return null;
        }

        cookieName = '__htmlcs.' + cookieName;
        return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(cookieName).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
    }
};

var counts = self.countIssues(_messages);
var gaImg  = _doc.createElement('img');
gaImg.src  = _gaBeacon.url(standard, counts.error, counts.warning, counts.notice, newlyOpen);
gaImg.style.display = 'none';