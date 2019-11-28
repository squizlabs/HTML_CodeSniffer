# HTML_CodeSniffer

## What is HTML_CodeSniffer?

HTML_CodeSniffer is a JavaScript application that checks a HTML document
or source code, and detects violations of a defined presentation or accessibility
standard, such as Section508 or WCAG2.1.

## Standards included

By default, HTML_CodeSniffer comes with standards that cover the three conformance
levels of the <abbr title="World Wide Web Consortium">W3C</abbr> [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/),
and the <abbr title="United States of America">U.S.</abbr> [Section 508](http://section508.gov/index.cfm?fuseAction=stdsdoc) legislation.
It also provides tools to write your own standards, which can be useful in situations
where you wish to enforce consistency across a web site.

## Using HTML_CodeSniffer

HTML_CodeSniffer can be called in multiple ways:
* Called directly in JavaScript source, HTML_CodeSniffer will provide a list of known
  and potential violations to the calling script.
* It also comes with a pop-up auditor interface, accessible via a bookmarklet,
  letting you browse through messages emitted from one of the defined standards.
  Where possible, the auditor also points you to the HTML element causing the problem.
* It can also be run on the command line with the assistance of a headless browser app.
* Using as a Node.js module, installed with npm: `npm i --save html_codesniffer`


## Using the source code

### Building the auditor

The HTML_CodeSniffer auditor can be built using [Node.js](https://nodejs.org/) and [Grunt
task runner](http://gruntjs.com/). It has been tested with the recent version of Node.js
(starting from version 6.0) and Grunt.

* Install Node.js with your package manager of choice, for example `sudo apt-get install nodejs`
* You may need to update the Node.js package manager (npm) itself: `npm install -g npm`
* Install the Grunt CLI helper if you haven't already done so: `npm install -g grunt-cli`
* Get Node.js to install the dependencies Grunt needs: `npm install`
* Run Grunt to build the auditor: `grunt build`

You should see two new directories: `node_modules` (containing the Node.js
dependencies), and `build` (containing your auditor). You can then move
(or symlink as appropriate) your `build` directory to a web-accessible
location.

Then grab or copy the JavaScript from the auditor bookmarklet from the [HTML_CodeSniffer site](https://squizlabs.github.io/HTML_CodeSniffer),
replace the directory at the start (//squizlabs.github.io/HTML_CodeSniffer/build) with your local URL, and save as a new bookmarklet.

### Debug build

If you are developing using HTML_CodeSniffer and require the code not minified for
debugging purposes, follow the above steps, but run `grunt build-debug`
(instead of just build). This will combine the files as normal, but not minify them.

## Command-Line processing

**Note:** These examples assume a built version of HTMLCS exported to `./build/HTMLCS.js`

### PhantomJS

You will need [PhantomJS](http://www.phantomjs.org/) installed if you wish to
use the contributed command-line script. PhantomJS provides a headless Webkit-based
browser to run the scripts in, so it should provide results that are similar to
recent (or slightly less than recent) versions of Safari.

See the `Contrib/PhantomJS/HTMLCS_Run.js` file for more information.

### Headless Google Chrome via Puppeteer

[Puppeteer](https://developers.google.com/web/tools/puppeteer/get-started) offers an
easy way to interact with the page via Google Chrome.

This example assumes that there is the latest version of Google Chrome installed,
hence only the `puppeteer-core` will be needed:

```sh
npm i puppeteer-core
```

The test script assumes a recent version of Node.js to be available.

```javascript
const puppeteer = require('puppeteer-core');

// Replace with the path to the chrome executable in your file system. This one assumes MacOSX.
const executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

// Replace with the url you wish to test.
const url = 'https://www.squiz.net';

(async () => {
  const browser = await puppeteer.launch({
    executablePath
  });

  const page = await browser.newPage();

  page.on('console', msg => {
    console.log(msg.text())
  });

  await page.goto(url);

  await page.addScriptTag({
    path: 'build/HTMLCS.js'
  });

  await page.evaluate(function () {
    HTMLCS_RUNNER.run('WCAG2AA');
  });

  await browser.close();
})();
```

### Node.js & JSDom

HTML_CodeSniffer requires a DOM to run, however, it is possible to run it entirely
server side without a headless browser using Node.js on arbitrary fragments of HTML using
an environment wrapper like [JSDom](https://github.com/jsdom/jsdom).

An example Node.js script:

```javascript
var jsdom = require('jsdom');
var { JSDOM } = jsdom;
var fs = require('fs');

var HTMLCS = fs.readFileSync('./build/HTMLCS.js', 'utf-8');
var vConsole = new jsdom.VirtualConsole();

// Forward messages to the console.
vConsole.on('log', function(message) {
    console.log(message)
});

var dom = new JSDOM('<img src="test.png" />', {
    runScripts: "dangerously",
    virtualConsole: vConsole
});

dom.window.eval(HTMLCS);
dom.window.HTMLCS_RUNNER.run('WCAG2AA');
```

## Translations

HTML_CodeSniffer supports _very_ basic string translations. The auditor will use the current language of the document it is being run in (e.g. `<html lang="en">`). A language code can be supplied if you need to tell HTML_CodeSniffer which language you want to use.

Example usage:
```javascript
HTMLCSAuditor.run('WCAG2AA', null, {
  lang: 'pl'
});
```

**Note:** HTML_CodeSniffer only has English (default), French, and Polish languages.

If other language support is required a custom version can be built by adding more translations in `Translations/*.js` and using the grunt build process described above.

## Contributing and reporting issues

To report any issues with using HTML_CodeSniffer, please use the
[HTML_CodeSniffer Issue Tracker](http://github.com/squizlabs/HTML_CodeSniffer/issues).

Contributions to the HTML_CodeSniffer code base are also welcome: please create a
fork of the main repository, then submit your modified code through a
[Pull Request](http://help.github.com/send-pull-requests/) for review. A Pull Request
also automatically creates an issue in the Issue Tracker, so if you have code to
contribute, you do not need to do both.

## More Information

More information on HTML_CodeSniffer can be found on its GitHub site,
[http://squizlabs.github.io/HTML_CodeSniffer/](http://squizlabs.github.io/HTML_CodeSniffer/). This site provides:

* Information on the tests performed (and messages emitted) by HTML_CodeSniffer's standards, organised by conformance level and Success Criterion;
* A source test area that allows you to try out HTML_CodeSniffer with your own HTML source code; and
* A link to the HTML_CodeSniffer bookmarklet, letting you check other pages using the pop-up auditor interface.

## Translation Contributors

Special thanks to:

* [nsulzycki](https://github.com/nsulzycki) (Polish Translation)
* [dmassiani](https://github.com/dmassiani) (French Translation)
* [jamadam](https://github.com/jamadam) (Japanese Translation)
* [tassoman](https://github.com/tassoman) (Italian Translation)
* [bdeclerc](https://github.com/bdeclerc) (Dutch Translation)

## License

Licensed under [the BSD 3-Clause "New" or "Revised" License](https://opensource.org/licenses/BSD-3-Clause).

License text also available in [the `license.txt` file](./license.txt).
