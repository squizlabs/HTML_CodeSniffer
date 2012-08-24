/* Copyright Squiz - For full terms see licence.txt */
var HTMLCS=new function(){var a={},b=[],c={},d=null,e=null,g=[],f={};this.ERROR=1;this.WARNING=2;this.NOTICE=3;this.process=function(w,v,e){a={};b=[];c={};d=null;if(!v)return!1;a[p(w)]?HTMLCS.run(e,v):this.loadStandard(w,function(){HTMLCS.run(e,v)})};this.loadStandard=function(a,b){if(!a)return!1;j(a,function(){d=a;b.call(this)})};this.run=function(a,b){var c=null,d=!1;if("string"===typeof b){var d=!0,e=document.createElement("iframe");e.style.display="none";e=document.body.insertBefore(e,null);e.contentDocument?
c=e.contentDocument:c.contentWindow&&(c=e.contentWindow.document);e.load=function(){this.onload=this.onreadystatechange=null;if(HTMLCS.isFullDoc(b)===false){c=c.getElementsByTagName("body")[0];var d=c.getElementsByTagName("div")[0];if(d&&d.id==="__HTMLCS-source-wrap"){d.id="";c=d}}d=s(c);d.unshift(c);h(d,c,a)};e.onreadystatechange=function(){if(/^(complete|loaded)$/.test(this.readyState)===true){this.onreadystatechange=null;this.load()}};e.onload=e.load;!1===HTMLCS.isFullDoc(b)&&-1===b.indexOf("<body")?
c.write('<div id="__HTMLCS-source-wrap">'+b+"</div>"):c.write(b);c.close()}else c=b;c?(a=a||function(){},g=[],e=s(c),e.unshift(c),!1===d&&h(e,c,a)):a.call(this)};this.isFullDoc=function(a){var b=!1;if("string"===typeof a)-1!==a.toLowerCase().indexOf("<html")?b=!0:-1!==a.toLowerCase().indexOf("<head")&&-1!==a.toLowerCase().indexOf("<body")&&(b=!0);else if("html"===a.nodeName.toLowerCase()||a.documentElement)b=!0;return b};this.addMessage=function(a,b,c,t,h){t=d+"."+e._name+"."+t;g.push({type:a,element:b,
msg:f[t]||c,code:t,data:h})};this.getMessages=function(){return g.concat([])};var h=function(a,b,d){for(;0<a.length;){var e=a.shift(),f=e===b?"_top":e.tagName.toLowerCase();c[f]&&0<c[f].length&&i(e,c[f].concat([]),b)}!0===d instanceof Function&&d.call(this)},i=function(a,b,c,d){for(;0<b.length;){var f=b.shift();e=f;!0===f.useCallback?f.process(a,c,function(){i(a,b,c);b=[]}):f.process(a,c)}!0===d instanceof Function&&d.call(this)},j=function(a,b,c){0!==a.indexOf("http")&&(a=p(a));var d=a.split("/");
window["HTMLCS_"+d[d.length-2]]?o(a,b,c):k(a,function(){o(a,b,c)})},o=function(b,c,d){var e=b.split("/"),f=window["HTMLCS_"+e[e.length-2]],e={},g;for(g in f)!0===f.hasOwnProperty(g)&&(e[g]=f[g]);if(!e)return!1;a[b]=e;if(d)if(d.include&&0<d.include.length)e.sniffs=d.include;else if(d.exclude)for(g=0;g<d.exclude.length;g++)f=e.sniffs.find(d.exclude[g]),0<=f&&e.sniffs.splice(f,1);d=e.sniffs.slice(0,e.sniffs.length);l(b,d,c)},l=function(a,b,c){if(0===b.length)c.call(this);else{var d=b.shift();m(a,d,function(){l(a,
b,c)})}},m=function(a,d,e){if("string"===typeof d){var g=function(){var f=q(a,d);if(f){if(f.register)var g=f.register();if(g&&0<g.length)for(var h=0;h<g.length;h++)c[g[h]]||(c[g[h]]=[]),c[g[h]].push(f);b.push(f)}e.call(this)};q(a,d)?g():k(u(a,d),g)}else j(d.standard,function(){if(d.messages)for(var a in d.messages)f[a]=d.messages[a];e.call(this)},{exclude:d.exclude,include:d.include})},u=function(a,b){var d=a.split("/");d.pop();return d.join("/")+"/Sniffs/"+b.replace(/\./g,"/")+".js"},p=function(a){for(var b=
document.getElementsByTagName("script"),d=null,c=0;c<b.length;c++)if(b[c].src&&b[c].src.match(/HTMLCS\.js/)){d=b[c].src.replace(/HTMLCS\.js/,"");break}return d+"Standards/"+a+"/ruleset.js"},q=function(b,d){var c;c="HTMLCS_"+(a[b].name+"_Sniffs_");c+=d.split(".").join("_");if(!window[c])return null;window[c]._name=d;return window[c]},k=function(a,b){var c=document.createElement("script");c.onload=function(){c.onload=null;c.onreadystatechange=null;b.call(this)};c.onreadystatechange=function(){!0===
/^(complete|loaded)$/.test(this.readyState)&&(c.onreadystatechange=null,c.onload())};c.src=a;document.head?document.head.appendChild(c):document.getElementsByTagName("head")[0].appendChild(c)},s=function(a){for(var a=(a||document).getElementsByTagName("*"),b=[],c=0;c<a.length;c++)b.push(a[c]);return b};this.isStringEmpty=function(a){var b=!0;-1!==a.indexOf(String.fromCharCode(160))?b=!1:!1===/^\s*$/.test(a)&&(b=!1);return b};this.util=new function(){this.trim=function(a){return a.replace(/^\s*(.*)\s*$/g,
"$1")};this.isStringEmpty=function(a){var b=!0;-1!==a.indexOf(String.fromCharCode(160))?b=!1:!1===/^\s*$/.test(a)&&(b=!1);return b};this.getElementWindow=function(a){var a=a.ownerDocument?a.ownerDocument:a,b=null;return b=a.defaultView?a.defaultView:a.parentWindow};this.style=function(a){var b=null,c=this.getElementWindow(a);a.currentStyle?b=a.currentStyle:c.getComputedStyle&&(b=c.getComputedStyle(a,null));return b};this.isHidden=function(a){var b=!1,a=this.style(a);if(null!==a){if("hidden"===a.visibility||
"none"===a.display)b=!0;0>parseInt(a.left,10)+parseInt(a.width,10)&&(b=!0);0>parseInt(a.top,10)+parseInt(a.height,10)&&(b=!0)}return b};this.contains=function(a,b){var c=!1;a!==b&&(a.ownerDocument?a.contains&&!0===a.contains(b)?c=!0:a.compareDocumentPosition&&0<(a.compareDocumentPosition(b)&16)&&(c=!0):b.ownerDocument&&b.ownerDocument===a&&(c=!0));return c};this.isLayoutTable=function(a){return null===a.querySelector("th")?!0:!1};this.contrastRatio=function(a,b){var c=(0.05+this.relativeLum(a))/(0.05+
this.relativeLum(b));1>c&&(c=1/c);return c};this.relativeLum=function(a){a.charAt&&(a=this.colourStrToRGB(a));var b={},c;for(c in a)b[c]=0.03928>=a[c]?a[c]/12.92:Math.pow((a[c]+0.055)/1.055,2.4);return 0.2126*b.red+0.7152*b.green+0.0722*b.blue};this.colourStrToRGB=function(a){a=a.toLowerCase();"rgb"===a.substring(0,3)?(a=/^rgba?\s*\((\d+),\s*(\d+),\s*(\d+)([^)]*)\)$/.exec(a),a={red:a[1]/255,green:a[2]/255,blue:a[3]/255}):("#"===a.charAt(0)&&(a=a.substr(1)),3===a.length&&(a=a.replace(/^(.)(.)(.)$/,
"$1$1$2$2$3$3")),a={red:parseInt(a.substr(0,2),16)/255,green:parseInt(a.substr(2,2),16)/255,blue:parseInt(a.substr(4,2),16)/255});return a};this.RGBtoColourStr=function(a){colourStr="#";a.red=Math.round(255*a.red);a.green=Math.round(255*a.green);a.blue=Math.round(255*a.blue);0===a.red%17&&0===a.green%17&&0===a.blue%17?(colourStr+=(a.red/17).toString(16),colourStr+=(a.green/17).toString(16),colourStr+=(a.blue/17).toString(16)):(16>a.red&&(colourStr+="0"),colourStr+=a.red.toString(16),16>a.green&&(colourStr+=
"0"),colourStr+=a.green.toString(16),16>a.blue&&(colourStr+="0"),colourStr+=a.blue.toString(16));return colourStr};this.sRGBtoHSV=function(a){a.charAt&&(a=this.colourStrToRGB(a));var b={hue:0,saturation:0,value:0},c=Math.max(a.red,a.green,a.blue),d=Math.min(a.red,a.green,a.blue),d=c-d;0===d?b.value=a.red:(b.value=c,b.hue=c===a.red?(a.green-a.blue)/d:c===a.green?2+(a.blue-a.red)/d:4+(a.red-a.green)/d,b.hue*=60,360<=b.hue&&(b.hue-=360),b.saturation=d/b.value);return b};this.HSVtosRGB=function(a){var b=
{red:0,green:0,blue:0};if(0===a.saturation)b.red=a.value,b.green=a.value,b.blue=a.value;else{var c=a.value*a.saturation,d=a.value-c,a=a.hue/60,e=c*(1-Math.abs(a-2*Math.floor(a/2)-1));switch(Math.floor(a)){case 0:b.red=c;b.green=e;break;case 1:b.green=c;b.red=e;break;case 2:b.green=c;b.blue=e;break;case 3:b.blue=c;b.green=e;break;case 4:b.blue=c;b.red=e;break;case 5:b.red=c,b.blue=e}b.red+=d;b.green+=d;b.blue+=d}return b};this.getElementTextContent=function(a,b){void 0===b&&(b=!0);for(var a=a.cloneNode(!0),
c=[],d=0;d<a.childNodes.length;d++)c.push(a.childNodes[d]);for(var e=[];0<c.length;){var f=c.shift();if(1===f.nodeType)if("img"===f.nodeName.toLowerCase())!0===b&&!0===f.hasAttribute("alt")&&e.push(f.getAttribute("alt"));else for(d=0;d<f.childNodes.length;d++)c.push(f.childNodes[d]);else 3===f.nodeType&&e.push(f.nodeValue)}return e=e.join("").replace(/^\s+|\s+$/g,"")};this.getCellHeaders=function(a){if("object"!==typeof a||"table"!==a.nodeName.toLowerCase())return null;for(var a=a.getElementsByTagName("tr"),
b=[],c={},d={},e=[],f=["th","td"],g=0;g<f.length;g++)for(var h=f[g],i=0;i<a.length;i++)for(var j=a[i],k=0,o=0;o<j.childNodes.length;o++){var m=j.childNodes[o];if(1===m.nodeType){if(b[i])for(;b[i][0]===k;)b[i].shift(),k++;var l=m.nodeName.toLowerCase(),p=Number(m.getAttribute("rowspan"))||1,q=Number(m.getAttribute("colspan"))||1;if(1<p)for(var n=i+1;n<i+p;n++){b[n]||(b[n]=[]);for(var r=k;r<k+q;r++)b[n].push(r)}if(l===h)if("th"===l){m=m.getAttribute("id")||"";for(n=i;n<i+p;n++)c[n]=c[n]||{first:k,ids:[]},
c[n].ids.push(m);for(n=k;n<k+q;n++)d[n]=d[n]||{first:i,ids:[]},d[n].ids.push(m)}else if("td"===l){l=[];for(n=i;n<i+p;n++)for(r=k;r<k+q;r++)c[n]&&r>=c[n].first&&(l=l.concat(c[n].ids)),d[r]&&n>=d[r].first&&(l=l.concat(d[r].ids));0<l.length&&(l=" "+l.sort().join(" ")+" ",l=l.replace(/\s+/g," ").replace(/(\w+\s)\1+/g,"$1").replace(/^\s*(.*?)\s*$/g,"$1"),e.push({cell:m,headers:l}))}k+=q}}return e}}},HTMLCS_WCAG2AAA={name:"WCAG2AAA",description:"Web Content Accessibility Guidelines (WCAG) 2.0 AAA",sniffs:"Principle1.Guideline1_1.1_1_1,Principle1.Guideline1_2.1_2_1,Principle1.Guideline1_2.1_2_2,Principle1.Guideline1_2.1_2_4,Principle1.Guideline1_2.1_2_5,Principle1.Guideline1_2.1_2_6,Principle1.Guideline1_2.1_2_7,Principle1.Guideline1_2.1_2_8,Principle1.Guideline1_2.1_2_9,Principle1.Guideline1_3.1_3_1,Principle1.Guideline1_3.1_3_1_AAA,Principle1.Guideline1_3.1_3_2,Principle1.Guideline1_3.1_3_3,Principle1.Guideline1_4.1_4_1,Principle1.Guideline1_4.1_4_2,Principle1.Guideline1_4.1_4_3_F24,Principle1.Guideline1_4.1_4_3_Contrast,Principle1.Guideline1_4.1_4_6,Principle1.Guideline1_4.1_4_7,Principle1.Guideline1_4.1_4_8,Principle1.Guideline1_4.1_4_9,Principle2.Guideline2_1.2_1_1,Principle2.Guideline2_1.2_1_2,Principle2.Guideline2_2.2_2_2,Principle2.Guideline2_2.2_2_3,Principle2.Guideline2_2.2_2_4,Principle2.Guideline2_2.2_2_5,Principle2.Guideline2_3.2_3_2,Principle2.Guideline2_4.2_4_1,Principle2.Guideline2_4.2_4_2,Principle2.Guideline2_4.2_4_3,Principle2.Guideline2_4.2_4_5,Principle2.Guideline2_4.2_4_6,Principle2.Guideline2_4.2_4_7,Principle2.Guideline2_4.2_4_8,Principle2.Guideline2_4.2_4_9,Principle3.Guideline3_1.3_1_1,Principle3.Guideline3_1.3_1_2,Principle3.Guideline3_1.3_1_3,Principle3.Guideline3_1.3_1_4,Principle3.Guideline3_1.3_1_5,Principle3.Guideline3_1.3_1_6,Principle3.Guideline3_2.3_2_1,Principle3.Guideline3_2.3_2_2,Principle3.Guideline3_2.3_2_3,Principle3.Guideline3_2.3_2_4,Principle3.Guideline3_2.3_2_5,Principle3.Guideline3_3.3_3_1,Principle3.Guideline3_3.3_3_2,Principle3.Guideline3_3.3_3_3,Principle3.Guideline3_3.3_3_5,Principle3.Guideline3_3.3_3_6,Principle4.Guideline4_1.4_1_1,Principle4.Guideline4_1.4_1_2".split(",")},
HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_2_2_2_1={register:function(){return["meta"]},process:function(a){!0===a.hasAttribute("http-equiv")&&"refresh"===(""+a.getAttribute("http-equiv")).toLowerCase()&&!0===/^[1-9]\d*/.test(a.getAttribute("content").toLowerCase())&&(!0===/url=/.test(a.getAttribute("content").toLowerCase())?HTMLCS.addMessage(HTMLCS.ERROR,a,"Meta refresh tag used to redirect to another page, with a time limit that is not zero. Users cannot control this time limit.","F40.2"):HTMLCS.addMessage(HTMLCS.ERROR,
a,"Meta refresh tag used to refresh the current page. Users cannot control the time limit for this refresh.","F41.2"))}},HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_2_2_2_4={register:function(){return["_top"]},process:function(a){HTMLCS.addMessage(HTMLCS.NOTICE,a,"Check that all interruptions (including updates to content) can be postponed or suppressed by the user, except interruptions involving an emergency.","SCR14")}},HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_2_2_2_2={register:function(){return["_top",
"blink"]},process:function(a,b){if(a===b){HTMLCS.addMessage(HTMLCS.NOTICE,a,"If any part of the content moves, scrolls or blinks for more than 5 seconds, or auto-updates, check that there is a mechanism available to pause, stop, or hide the content.","SCR33,SCR22,G187,G152,G186,G191");for(var c=b.querySelectorAll("*"),d=0;d<c.length;d++)!0===/blink/.test(HTMLCS.util.style(c[d])["text-decoration"])&&HTMLCS.addMessage(HTMLCS.WARNING,c[d],"Ensure there is a mechanism available to stop this blinking element in less than five seconds.",
"F4")}else"blink"===a.nodeName.toLowerCase()&&HTMLCS.addMessage(HTMLCS.ERROR,a,"Blink elements cannot satisfy the requirement that blinking information can be stopped within five seconds.","F47")}},HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_2_2_2_5={register:function(){return["_top"]},process:function(a){HTMLCS.addMessage(HTMLCS.NOTICE,a,"If this Web page is part of a set of Web pages with an inactivity time limit, check that an authenticated user can continue the activity without loss of data after re-authenticating.",
"G105,G181")}},HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_2_2_2_3={register:function(){return["_top"]},process:function(a){HTMLCS.addMessage(HTMLCS.NOTICE,a,"Check that timing is not an essential part of the event or activity presented by the content, except for non-interactive synchronized media and real-time events.","G5")}},HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_5={register:function(){return["_top"]},process:function(a){HTMLCS.addMessage(HTMLCS.NOTICE,a,"If this Web page is not part of a linear process, check that there is more than one way of locating this Web page within a set of Web pages.",
"G125,G64,G63,G161,G126,G185")}},HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_4={register:function(){return["a"]},process:function(a){!0===a.hasAttribute("title")?HTMLCS.addMessage(HTMLCS.NOTICE,a,"Check that the link text combined with programmatically determined link context, or its title attribute, identifies the purpose of the link.","H77,H78,H79,H80,H81,H33"):HTMLCS.addMessage(HTMLCS.NOTICE,a,"Check that the link text combined with programmatically determined link context identifies the purpose of the link.",
"H77,H78,H79,H80,H81")}},HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_3={register:function(){return["_top"]},process:function(a,b){a===b&&b.querySelector("*[tabindex]")&&HTMLCS.addMessage(HTMLCS.NOTICE,a,"If tabindex is used, check that the tab order specified by the tabindex attributes follows relationships in the content.","H4.2")}},HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_7={register:function(){return["_top"]},process:function(a,b){null!==b.querySelector("input, textarea, button, select, a")&&
HTMLCS.addMessage(HTMLCS.NOTICE,b,"Check that there is at least one mode of operation where the keyboard focus indicator can be visually located on user interface controls.","G149,G165,G195,C15,SCR31")}},HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_8={register:function(){return["link"]},process:function(a){"head"!==a.parentNode.nodeName.toLowerCase()&&HTMLCS.addMessage(HTMLCS.ERROR,a,"Link elements can only be located in the head section of the document.","H59.1");(!1===a.hasAttribute("rel")||
!a.getAttribute("rel")||!0===/^\s*$/.test(a.getAttribute("rel")))&&HTMLCS.addMessage(HTMLCS.ERROR,a,"Link element is missing a non-empty rel attribute identifying the link type.","H59.2a");(!1===a.hasAttribute("href")||!a.getAttribute("href")||!0===/^\s*$/.test(a.getAttribute("href")))&&HTMLCS.addMessage(HTMLCS.ERROR,a,"Link element is missing a non-empty href attribute pointing to the resource being linked.","H59.2b")}},HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_2={register:function(){return["html"]},
process:function(a){for(var b=a.childNodes,c=null,d=0;d<b.length;d++)if("head"===b[d].nodeName.toLowerCase()){c=b[d];break}if(null===c)HTMLCS.addMessage(HTMLCS.ERROR,a,"There is no head section in which to place a descriptive title element.","H25.1.NoHeadEl");else{b=c.childNodes;a=null;for(d=0;d<b.length;d++)if("title"===b[d].nodeName.toLowerCase()){a=b[d];break}null===a?HTMLCS.addMessage(HTMLCS.ERROR,c,"A title should be provided for the document, using a non-empty title element in the head section.",
"H25.1.NoTitleEl"):!0===/^\s*$/.test(a.innerHTML)?HTMLCS.addMessage(HTMLCS.ERROR,a,"The title element in the head section should be non-empty.","H25.1.EmptyTitle"):HTMLCS.addMessage(HTMLCS.NOTICE,a,"Check that the title element describes the document.","H25.2")}}},HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_6={register:function(){return["_top"]},process:function(a){HTMLCS.addMessage(HTMLCS.NOTICE,a,"Check that headings and labels describe topic or purpose.","G130,G131")}},HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_1=
{register:function(){return["iframe","a","area","_top"]},process:function(a,b){if(a===b)this.testGenericBypassMsg(b);else switch(a.nodeName.toLowerCase()){case "iframe":this.testIframeTitle(a);break;case "a":case "area":this.testSameDocFragmentLinks(a,b)}},testIframeTitle:function(a){if("iframe"===a.nodeName.toLowerCase()){var b=!1;!0===a.hasAttribute("title")&&a.getAttribute("title")&&!1===/^\s+$/.test(a.getAttribute("title"))&&(b=!0);!1===b?HTMLCS.addMessage(HTMLCS.ERROR,a,"Iframe element requires a non-empty title attribute that identifies the frame.",
"H64.1"):HTMLCS.addMessage(HTMLCS.NOTICE,a,"Check that the title attribute of this element contains text that identifies the frame.","H64.2")}},testGenericBypassMsg:function(a){HTMLCS.addMessage(HTMLCS.NOTICE,a,"Ensure that any common navigation elements can be bypassed; for instance, by use of skip links, header elements, or ARIA landmark roles.","G1,G123,G124,H69")},testSameDocFragmentLinks:function(a,b){if(!0===a.hasAttribute("href")){var c=a.getAttribute("href"),c=HTMLCS.util.trim(c);if(1<c.length&&
"#"===c.charAt(0)){c=c.substr(1);try{var d=b;d.ownerDocument&&(d=d.ownerDocument);var e=d.getElementById(c);null===e&&(e=d.querySelector('a[name="'+c+'"]'));if(null===e||!1===HTMLCS.util.contains(b,e))!0===HTMLCS.isFullDoc(b)||"body"===b.nodeName.toLowerCase()?HTMLCS.addMessage(HTMLCS.ERROR,a,'This link points to a named anchor "'+c+'" within the document, but no anchor exists with that name.',"G1,G123,G124.NoSuchID"):HTMLCS.addMessage(HTMLCS.WARNING,a,'This link points to a named anchor "'+c+'" within the document, but no anchor exists with that name in the fragment tested.',
"G1,G123,G124.NoSuchIDFragment")}catch(g){}}}}},HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_9={register:function(){return["a"]},process:function(a){HTMLCS.addMessage(HTMLCS.NOTICE,a,"Check that text of the link describes the purpose of the link.","H30")}},HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_1_2_1_2={register:function(){return["object","applet","embed"]},process:function(a){HTMLCS.addMessage(HTMLCS.WARNING,a,"Check that this applet or plugin provides the ability to move the focus away from itself when using the keyboard.",
"F10")}},HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_1_2_1_1={register:function(){return["_top"]},process:function(a,b){if(a===b){for(var c=b.querySelectorAll("*[ondblclick]"),d=0;d<c.length;d++)HTMLCS.addMessage(HTMLCS.WARNING,c[d],"Ensure the functionality provided by double-clicking on this element is available through the keyboard.","SCR20.DblClick");c=b.querySelectorAll("*[onmouseover]");for(d=0;d<c.length;d++)HTMLCS.addMessage(HTMLCS.WARNING,c[d],"Ensure the functionality provided by mousing over this element is available through the keyboard; for instance, using the focus event.",
"SCR20.MouseOver");c=b.querySelectorAll("*[onmouseout]");for(d=0;d<c.length;d++)HTMLCS.addMessage(HTMLCS.WARNING,c[d],"Ensure the functionality provided by mousing out of this element is available through the keyboard; for instance, using the blur event.","SCR20.MouseOut");c=b.querySelectorAll("*[onmousemove]");for(d=0;d<c.length;d++)HTMLCS.addMessage(HTMLCS.WARNING,c[d],"Ensure the functionality provided by moving the mouse on this element is available through the keyboard.","SCR20.MouseMove");c=
b.querySelectorAll("*[onmousedown]");for(d=0;d<c.length;d++)HTMLCS.addMessage(HTMLCS.WARNING,c[d],"Ensure the functionality provided by mousing down on this element is available through the keyboard; for instance, using the keydown event.","SCR20.MouseDown");c=b.querySelectorAll("*[onmouseup]");for(d=0;d<c.length;d++)HTMLCS.addMessage(HTMLCS.WARNING,c[d],"Ensure the functionality provided by mousing up on this element is available through the keyboard; for instance, using the keyup event.","SCR20.MouseUp")}}},
HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_3_2_3_1={register:function(){return["_top"]},process:function(a,b){HTMLCS.addMessage(HTMLCS.NOTICE,b,"Check that no component of the content flashes more than three times in any 1-second period, or that the size of any flashing area is sufficiently small.","G19,G176")}},HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_3_2_3_2={register:function(){return["_top"]},process:function(a,b){HTMLCS.addMessage(HTMLCS.NOTICE,b,"Check that no component of the content flashes more than three times in any 1-second period.",
"G19")}},HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_3={register:function(){return["_top"]},process:function(a,b){if(a===b)for(var c=HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_3_Contrast.testContrastRatio(b,4.5,3),d=0;d<c.length;d++){var a=c[d].element,e=Math.round(100*c[d].value)/100,g=c[d].required,f=c[d].recommendation,h=c[d].hasBgImage||!1;if(4.5===g)var i="G18";else 3===g&&(i="G145");var j=[];f&&(f.fore.from!==f.fore.to&&j.push("text colour to "+f.fore.to),f.back.from!==f.back.to&&
j.push("background to "+f.back.to));0<j.length&&(j=" Recommendation: change "+j.join(", ")+".");!0===h?(i+=".BgImage",HTMLCS.addMessage(HTMLCS.WARNING,a,"This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least "+g+":1.",i)):(i+=".Fail",HTMLCS.addMessage(HTMLCS.ERROR,a,"This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least "+g+":1, but text in this element has a contrast ratio of "+
e+":1."+j,i))}}},HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_7={register:function(){return["_top"]},process:function(a,b){null!==b.querySelector("object, embed, applet, bgsound, audio")&&HTMLCS.addMessage(HTMLCS.NOTICE,b,"For pre-recorded audio-only content that is primarily speech (such as narration), any background sounds should be muteable, or be at least 20 dB (or about 4 times) quieter than the speech.","G56")}},HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_8={register:function(){return["_top"]},
process:function(a,b){HTMLCS.addMessage(HTMLCS.NOTICE,b,"Check that a mechanism is available for the user to select foreground and background colours for blocks of text, either through the Web page or the browser.","G148,G156,G175");HTMLCS.addMessage(HTMLCS.NOTICE,b,"Check that a mechanism exists to reduce the width of a block of text to no more than 80 characters (or 40 in Chinese, Japanese or Korean script).","H87,C20");HTMLCS.addMessage(HTMLCS.NOTICE,b,"Check that blocks of text are not fully justified - that is, to both left and right edges - or a mechanism exists to remove full justification.",
"C19,G172,G169");HTMLCS.addMessage(HTMLCS.NOTICE,b,"Check that line spacing in blocks of text are at least 150% in paragraphs, and paragraph spacing is at least 1.5 times the line spacing, or that a mechanism is available to achieve this.","G188,C21");HTMLCS.addMessage(HTMLCS.NOTICE,b,"Check that text can be resized without assistive technology up to 200 percent without requiring the user to scroll horizontally on a full-screen window.","H87,G146,C26")}},HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_2=
{register:function(){return["_top"]},process:function(a,b){null!==b.querySelector("object, embed, applet, bgsound, audio, video")&&HTMLCS.addMessage(HTMLCS.NOTICE,b,"If any audio plays automatically for longer than 3 seconds, check that there is the ability to pause, stop or mute the audio.","F23")}},HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_3_F24={register:function(){return["_top"]},process:function(a,b){for(var c=b.querySelectorAll("*"),d=0;d<c.length;d++)this.testColourComboFail(c[d])},
testColourComboFail:function(a){var b=a.hasAttribute("color"),b=(b=(b=b||a.hasAttribute("link"))||a.hasAttribute("vlink"))||a.hasAttribute("alink"),c=a.hasAttribute("bgcolor");if(a.style){var d=a.style.color,e=a.style.background;""!==d&&"auto"!==d&&(b=!0);""!==e&&"auto"!==e&&(c=!0)}c!==b&&(!0===c?HTMLCS.addMessage(HTMLCS.WARNING,a,"Check that this element has an inherited foreground colour to complement the corresponding inline background colour or image.","F24.BGColour"):HTMLCS.addMessage(HTMLCS.WARNING,
a,"Check that this element has an inherited background colour or image to complement the corresponding inline foreground colour.","F24.FGColour"))}},HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_3_Contrast={testContrastRatio:function(a,b,c){for(var d=[],a=a.ownerDocument?[a]:[a.getElementsByTagName("body")[0]];0<a.length;){var e=a.shift();if(1===e.nodeType&&!1===HTMLCS.util.isHidden(e)){for(var g=!1,f=0;f<e.childNodes.length;f++)1===e.childNodes[f].nodeType?a.push(e.childNodes[f]):3===e.childNodes[f].nodeType&&
""!==HTMLCS.util.trim(e.childNodes[f].nodeValue)&&(g=!0);if(!0===g&&(g=HTMLCS.util.style(e))){var f=g.backgroundColor,h=!1;"none"!==g.backgroundImage&&(h=!0);var i=e.parentNode,j=0.75*parseInt(g.fontSize,10),o=18;if("bold"===g.fontWeight||600<=parseInt(g.fontWeight,10))o=14;var l=b;for(j>=o&&(l=c);("transparent"===f||"rgba(0, 0, 0, 0)"===f)&&i&&i.ownerDocument;)j=HTMLCS.util.style(i),f=j.backgroundColor,"none"!==j.backgroundImage&&(h=!0),i=i.parentNode;!0===h?d.push({element:e,colour:g.color,bgColour:void 0,
value:void 0,required:l,hasBgImage:!0}):"transparent"===f||"rgba(0, 0, 0, 0)"===f||(h=HTMLCS.util.contrastRatio(f,g.color),h<l&&(i=this.recommendColour(f,g.color,l),d.push({element:e,colour:g.color,bgColour:f,value:h,required:l,recommendation:i})))}}}return d},recommendColour:function(a,b,c){var b=HTMLCS.util.RGBtoColourStr(HTMLCS.util.colourStrToRGB(b)),a=HTMLCS.util.RGBtoColourStr(HTMLCS.util.colourStrToRGB(a)),d=HTMLCS.util.contrastRatio(b,a),e=Math.abs(HTMLCS.util.relativeLum(b)-0.5),g=Math.abs(HTMLCS.util.relativeLum(a)-
0.5),f=null;if(d<c){f=1.0025;if(e<=g){var e="back",h=a;0.5>HTMLCS.util.relativeLum(a)&&(f=1/f)}else e="fore",h=b,0.5>HTMLCS.util.relativeLum(b)&&(f=1/f);for(var g=HTMLCS.util.sRGBtoHSV(h),i=b,j=a,o=!1,l=0;d<c;){if("#fff"===h||"#000"===h)if(!0===o)if("fore"===e){h=j;for(d=1;j===h;)j=multiplyColour(j,Math.pow(1/f,d)),d++}else{h=i;for(d=1;i===h;)i=multiplyColour(i,Math.pow(1/f,d)),d++}else i=b,j=a,f=1/f,"fore"===e?(e="back",g=a):(e="fore",g=b),g=HTMLCS.util.sRGBtoHSV(g),o=!0;l++;h=HTMLCS.util.HSVtosRGB(g);
h=this.multiplyColour(h,Math.pow(f,l));"fore"===e?i=h:j=h;d=HTMLCS.util.contrastRatio(i,j)}f={fore:{from:b,to:i},back:{from:a,to:j}}}return f},multiplyColour:function(a,b){var c=HTMLCS.util.sRGBtoHSV(a),d=c.saturation*c.value;0===c.value&&(c.value=1/255);c.value*=b;c.saturation=0===c.value?0:d/c.value;c.value=Math.min(1,c.value);c.saturation=Math.min(1,c.saturation);return HTMLCS.util.RGBtoColourStr(HTMLCS.util.HSVtosRGB(c))}},HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_4={register:function(){return["_top"]},
process:function(a,b){HTMLCS.addMessage(HTMLCS.NOTICE,b,"Check that text can be resized without assistive technology up to 200 percent without loss of content or functionality.","G142")}},HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_9={register:function(){return["_top"]},process:function(a,b){null!==b.querySelector("img")&&HTMLCS.addMessage(HTMLCS.NOTICE,b,"Check that images of text are only used for pure decoration or where a particular presentation of text is essential to the information being conveyed.",
"G140,C22,C30.NoException")}},HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_5={register:function(){return["_top"]},process:function(a,b){null!==b.querySelector("img")&&HTMLCS.addMessage(HTMLCS.NOTICE,b,"If the technologies being used can achieve the visual presentation, check that text is used to convey information rather than images of text, except when the image of text is essential to the information being conveyed, or can be visually customised to the user's requirements.","G140,C22,C30.AALevel")}},
HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_1={register:function(){return["_top"]},process:function(a,b){HTMLCS.addMessage(HTMLCS.NOTICE,b,"Check that any information conveyed using colour alone is also available in text, or through other visual cues.","G14,G182")}},HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_6={register:function(){return["_top"]},process:function(a,b){if(a===b)for(var c=HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_3_Contrast.testContrastRatio(b,7,4.5),d=0;d<c.length;d++){var a=
c[d].element,e=Math.round(100*c[d].value)/100,g=c[d].required,f=c[d].recommendation,h=c[d].hasBgImage||!1;if(4.5===g)var i="G18";else 7===g&&(i="G17");var j=[];f&&(f.fore.from!==f.fore.to&&j.push("text colour to "+f.fore.to),f.back.from!==f.back.to&&j.push("background to "+f.back.to));0<j.length&&(j=" Recommendation: change "+j.join(", ")+".");!0===h?(i+=".BgImage",HTMLCS.addMessage(HTMLCS.WARNING,a,"This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least "+
g+":1.",i)):(i+=".Fail",HTMLCS.addMessage(HTMLCS.ERROR,a,"This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least "+g+":1, but text in this element has a contrast ratio of "+e+":1."+j,i))}}},HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_2_1_2_9={register:function(){return["_top"]},process:function(a,b){for(var c=b.querySelectorAll("object, embed, applet, bgsound, audio"),d=0;d<c.length;d++)HTMLCS.addMessage(HTMLCS.NOTICE,c[d],"If this embedded object contains live audio-only content, check that an alternative text version of the content is provided.",
"G150,G151,G157")}},HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_2_1_2_2={register:function(){return["_top"]},process:function(a,b){for(var c=b.querySelectorAll("object, embed, applet, video"),d=0;d<c.length;d++)HTMLCS.addMessage(HTMLCS.NOTICE,c[d],"If this embedded object contains pre-recorded synchronised media and is not provided as an alternative for text content, check that captions are provided for audio content.","G87,G93")}},HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_2_1_2_6={register:function(){return["_top"]},
process:function(a,b){for(var c=b.querySelectorAll("object, embed, applet, video"),d=0;d<c.length;d++)HTMLCS.addMessage(HTMLCS.NOTICE,c[d],"If this embedded object contains pre-recorded synchronised media, check that a sign language interpretation is provided for its audio.","G54,G81")}},HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_2_1_2_8={register:function(){return["_top"]},process:function(a,b){for(var c=b.querySelectorAll("object, embed, applet, video"),d=0;d<c.length;d++)HTMLCS.addMessage(HTMLCS.NOTICE,
c[d],"If this embedded object contains pre-recorded synchronised media or video-only content, check that an alternative text version of the content is provided.","G69,G159")}},HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_2_1_2_7={register:function(){return["_top"]},process:function(a,b){for(var c=b.querySelectorAll("object, embed, applet, video"),d=0;d<c.length;d++)HTMLCS.addMessage(HTMLCS.NOTICE,c[d],"If this embedded object contains synchronised media, and where pauses in foreground audio is not sufficient to allow audio descriptions to convey the sense of pre-recorded video, check that an extended audio description is provided, either through scripting or an alternate version.",
"G8")}},HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_2_1_2_1={register:function(){return["_top"]},process:function(a,b){for(var c=b.querySelectorAll("object, embed, applet, bgsound, audio, video"),d=0;d<c.length;d++){var e=c[d].nodeName.toLowerCase();"video"!==e&&HTMLCS.addMessage(HTMLCS.NOTICE,c[d],"If this embedded object contains pre-recorded audio only, and is not provided as an alternative for text content, check that an alternative text version is available.","G158");"bgsound"!==e&&"audio"!==
e&&HTMLCS.addMessage(HTMLCS.NOTICE,c[d],"If this embedded object contains pre-recorded video only, and is not provided as an alternative for text content, check that an alternative text version is available, or an audio track is provided that presents equivalent information.","G159,G166")}}},HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_2_1_2_3={register:function(){return["_top"]},process:function(a,b){for(var c=b.querySelectorAll("object, embed, applet, video"),d=0;d<c.length;d++)HTMLCS.addMessage(HTMLCS.NOTICE,
c[d],"If this embedded object contains pre-recorded synchronised media and is not provided as an alternative for text content, check that an audio description of its video, and/or an alternative text version of the content is provided.","G69,G78,G173,G8")}},HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_2_1_2_4={register:function(){return["_top"]},process:function(a,b){for(var c=b.querySelectorAll("object, embed, applet, video"),d=0;d<c.length;d++)HTMLCS.addMessage(HTMLCS.NOTICE,c[d],"If this embedded object contains synchronised media, check that captions are provided for live audio content.",
"G9,G87,G93")}},HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_2_1_2_5={register:function(){return["_top"]},process:function(a,b){for(var c=b.querySelectorAll("object, embed, applet, video"),d=0;d<c.length;d++)HTMLCS.addMessage(HTMLCS.NOTICE,c[d],"If this embedded object contains pre-recorded synchronised media, check that an audio description is provided for its video content.","G78,G173,G8")}},HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_1_1_1_1={register:function(){return["img","input","area","object",
"applet"]},process:function(a){switch(a.nodeName.toLowerCase()){case "img":this.testNullAltText(a);this.testLinkStutter(a);this.testLongdesc(a);break;case "input":!0===a.hasAttribute("type")&&"image"===a.getAttribute("type")&&this.testNullAltText(a);break;case "area":this.testNullAltText(a);break;case "object":this.testObjectTextAlternative(a);break;case "applet":this.testAppletTextAlternative(a)}},testNullAltText:function(a){var b=a.nodeName.toLowerCase(),c=!1,d=!1,e=!1;if("a"===a.parentNode.nodeName.toLowerCase()){var g=
this._getPreviousSiblingElement(a,null),f=this._getNextSiblingElement(a,null);null===g&&null===f&&(c=!0)}if(!1===a.hasAttribute("alt"))d=!0;else if(!a.getAttribute("alt")||!0===HTMLCS.isStringEmpty(a.getAttribute("alt")))e=!0;switch(b){case "img":!0===c&&(!0===d||!0===e)?HTMLCS.addMessage(HTMLCS.ERROR,a.parentNode,"Img element is the only content of the link, but is missing alt text. The alt text should describe the purpose of the link.","H30.2"):!0===d?HTMLCS.addMessage(HTMLCS.ERROR,a,"Img element missing an alt attribute. Use the alt attribute to specify a short text alternative.",
"H37"):!0===e?!0===a.hasAttribute("title")&&!1===HTMLCS.isStringEmpty(a.getAttribute("title"))?HTMLCS.addMessage(HTMLCS.ERROR,a,"Img element with empty alt text must have absent or empty title attribute.","H67.1"):HTMLCS.addMessage(HTMLCS.WARNING,a,"Img element is marked so that it is ignored by Assistive Technology.","H67.2"):HTMLCS.addMessage(HTMLCS.NOTICE,a,"Ensure that the img element's alt text serves the same purpose and presents the same information as the image.","G94.Image");break;case "input":!0===
d||!0===e?HTMLCS.addMessage(HTMLCS.ERROR,a,"Image submit button missing an alt attribute. Specify a text alternative that describes the button's function, using the alt attribute.","H36"):HTMLCS.addMessage(HTMLCS.NOTICE,a,"Ensure that the image submit button's alt text identifies the purpose of the button.","G94.Button");break;case "area":!0===d||!0===e?HTMLCS.addMessage(HTMLCS.ERROR,a,"Area element in an image map missing an alt attribute. Each area element must have a text alternative that describes the function of the image map area.",
"H24"):HTMLCS.addMessage(HTMLCS.NOTICE,a,"Ensure that the area element's text alternative serves the same purpose as the part of image map image it references.","H24.2")}},testLongdesc:function(a){HTMLCS.addMessage(HTMLCS.NOTICE,a,"If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.","G73,G74")},testLinkStutter:function(a){if("a"===a.parentNode.nodeName.toLowerCase()){var b=a.parentNode,
c=b.getAttribute("href"),d=HTMLCS.util.getElementTextContent(b,!1),e=this._getLinkAltText(b),g,f;null===e&&(e="");null!==e&&""!==e&&HTMLCS.util.trim(e).toLowerCase()===HTMLCS.util.trim(d).toLowerCase()&&HTMLCS.addMessage(HTMLCS.ERROR,a,"Img element inside a link must not use alt text that duplicates the text content of the link.","H2.EG5");""===d&&(d=this._getPreviousSiblingElement(b,"a",!0),b=this._getNextSiblingElement(b,"a",!0),null!==d&&(g={href:d.getAttribute("href"),text:HTMLCS.util.getElementTextContent(d,
!1),alt:this._getLinkAltText(d)},null===g.alt&&(g.alt="")),null!==b&&(f={href:b.getAttribute("href"),text:HTMLCS.util.getElementTextContent(b,!1),alt:this._getLinkAltText(b)},null===f.alt&&(f.alt="")),f&&""!==f.href&&null!==f.href&&c===f.href&&(""!==f.text&&""===e?HTMLCS.addMessage(HTMLCS.ERROR,a,"Img element inside a link has empty or missing alt text when a link beside it contains link text. Consider combining the links.","H2.EG4"):f.text.toLowerCase()===e.toLowerCase()&&HTMLCS.addMessage(HTMLCS.ERROR,
a,"Img element inside a link must not use alt text that duplicates the content of a text link beside it.","H2.EG3")),g&&""!==g.href&&null!==g.href&&c===g.href&&(""!==g.text&&""===e?HTMLCS.addMessage(HTMLCS.ERROR,a,"Img element inside a link has empty or missing alt text when a link beside it contains link text. Consider combining the links.","H2.EG4"):g.text.toLowerCase()===e.toLowerCase()&&HTMLCS.addMessage(HTMLCS.ERROR,a,"Img element inside a link must not use alt text that duplicates the content of a text link beside it.",
"H2.EG3")))}},testObjectTextAlternative:function(a){null===a.querySelector("object")&&(""===HTMLCS.util.getElementTextContent(a,!0)?HTMLCS.addMessage(HTMLCS.ERROR,a,"Object elements must contain a text alternative after all other alternatives are exhausted.","H53"):HTMLCS.addMessage(HTMLCS.NOTICE,a,"Check that short (and if appropriate, long) text alternatives are available for non-text content that serve the same purpose and present the same information.","G94,G92.Object"))},testAppletTextAlternative:function(a){var b=
!1;if(null===a.querySelector("object")){var c=HTMLCS.util.getElementTextContent(a,!0);!0===HTMLCS.isStringEmpty(c)&&(HTMLCS.addMessage(HTMLCS.ERROR,a,"Applet elements must contain a text alternative in the element's body, for browsers without support for the applet element.","H35.3"),b=!0)}c=a.getAttribute("alt")||"";!0===HTMLCS.isStringEmpty(c)&&(HTMLCS.addMessage(HTMLCS.ERROR,a,"Applet elements must contain an alt attribute, to provide a text alternative to browsers supporting the element but are unable to load the applet.",
"H35.2"),b=!0);!1===b&&HTMLCS.addMessage(HTMLCS.NOTICE,a,"Check that short (and if appropriate, long) text alternatives are available for non-text content that serve the same purpose and present the same information.","G94,G92.Applet")},_getLinkAltText:function(a){for(var a=a.cloneNode(!0),b=[],c=0;c<a.childNodes.length;c++)b.push(a.childNodes[c]);for(a=null;0<b.length;)if(c=b.shift(),1===c.nodeType&&"img"===c.nodeName.toLowerCase()&&!0===c.hasAttribute("alt")){a=(a=c.getAttribute("alt"))?a.replace(/^\s+|\s+$/g,
""):"";break}return a},_getPreviousSiblingElement:function(a,b,c){void 0===b&&(b=null);void 0===c&&(c=!1);for(a=a.previousSibling;null!==a;){if(3===a.nodeType){if(!1===HTMLCS.isStringEmpty(a.nodeValue)&&!0===c){a=null;break}}else if(1===a.nodeType){if(null===b||a.nodeName.toLowerCase()===b)break;else if(!0===c){a=null;break}break}a=a.previousSibling}return a},_getNextSiblingElement:function(a,b,c){void 0===b&&(b=null);void 0===c&&(c=!1);for(a=a.nextSibling;null!==a;){if(3===a.nodeType){if(!1===HTMLCS.isStringEmpty(a.nodeValue)&&
!0===c){a=null;break}}else if(1===a.nodeType){if(null===b||a.nodeName.toLowerCase()===b)break;else if(!0===c){a=null;break}break}a=a.nextSibling}return a}},HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_3_1_3_2={register:function(){return["_top"]},process:function(a,b){HTMLCS.addMessage(HTMLCS.NOTICE,b,"Check that the content is ordered in a meaningful sequence when linearised, such as when style sheets are disabled.","G57")}},HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_3_1_3_1_AAA={_labelNames:null,
register:function(){return["_top"]},process:function(a,b){var c=HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_3_1_3_1;a===b&&c.testHeadingOrder(b,HTMLCS.ERROR)}},HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_3_1_3_1_A={_labelNames:null,register:function(){return["_top"]},process:function(a,b){var c=HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_3_1_3_1;a===b&&c.testHeadingOrder(b,HTMLCS.WARNING)}},HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_3_1_3_1={_labelNames:null,register:function(){return"_top,p,div,input,select,textarea,button,table,fieldset,form,h1,h2,h3,h4,h5,h6".split(",")},
process:function(a,b){var c=a.nodeName.toLowerCase();if(a===b)this.testPresentationMarkup(b),this.testEmptyDupeLabelForAttrs(b);else switch(c){case "input":case "textarea":case "button":this.testLabelsOnInputs(a,b);break;case "form":this.testRequiredFieldsets(a);break;case "select":this.testLabelsOnInputs(a,b);this.testOptgroup(a);break;case "p":case "div":this.testNonSemanticHeading(a);this.testListsWithBreaks(a);this.testUnstructuredNavLinks(a);break;case "table":this.testGeneralTable(a);this.testTableHeaders(a);
this.testTableCaptionSummary(a);break;case "fieldset":this.testFieldsetLegend(a);break;case "h1":case "h2":case "h3":case "h4":case "h5":case "h6":this.testEmptyHeading(a)}},testEmptyDupeLabelForAttrs:function(a){this._labelNames={};for(var b=a.getElementsByTagName("label"),c=0;c<b.length;c++)if(!0===b[c].hasAttribute("for")&&""!==b[c].getAttribute("for")){var d=b[c].getAttribute("for");if(this._labelNames[d]&&null!==this._labelNames[d])HTMLCS.addMessage(HTMLCS.ERROR,b[c],'Multiple labels exist with the same "for" attribute. If these labels refer to different form controls, the controls should have unique "id" attributes.',
"H93"),this._labelNames[d]=null;else if(this._labelNames[d]=b[c],d=a.ownerDocument?a.ownerDocument.getElementById(d):a.getElementById(d),null===d){var d=HTMLCS.ERROR,e='This label\'s "for" attribute contains an ID that does not exist in the document.',g="H44.NonExistent";if(!0===HTMLCS.isFullDoc(a)||"body"===a.nodeName.toLowerCase())d=HTMLCS.WARNING,e='This label\'s "for" attribute contains an ID that does not exist in the document fragment.',g="H44.NonExistentFragment";HTMLCS.addMessage(d,b[c],e,
g)}else d=d.nodeName.toLowerCase(),"input"!==d&&"select"!==d&&"textarea"!==d&&HTMLCS.addMessage(HTMLCS.ERROR,b[c],'This label\'s "for" attribute contains an ID that points to an element that is not a form control.',"H44.NotFormControl")}else HTMLCS.addMessage(HTMLCS.ERROR,b[c],'Label found without a "for" attribute, and therefore not explicitly associated with a form control.',"H44.NoForAttr")},testLabelsOnInputs:function(a,b){var c=a.nodeName.toLowerCase();"input"===c&&(c=a.getAttribute("type"));
var d=!1;!0===/^(submit|reset|image|hidden|button)$/.test(c)&&(d=!0);this._labelNames={};for(var e=b.getElementsByTagName("label"),g=0;g<e.length;g++)!0===e[g].hasAttribute("for")&&(this._labelNames[e[g].getAttribute("for")]=e[g]);if(!1===a.hasAttribute("id")&&!1===d)!0===a.hasAttribute("title")?!0===/^\s*$/.test(a.getAttribute("title"))&&HTMLCS.addMessage(HTMLCS.ERROR,a,"Form control without a label contains an empty title attribute. The title attribute should identify the purpose of the control.",
"H65.3"):HTMLCS.addMessage(HTMLCS.ERROR,a,"Form control does not have an ID, therefore it cannot have an explicit label.","H44.NoId");else if(e=a.getAttribute("id"),this._labelNames[e])if(!0===d)HTMLCS.addMessage(HTMLCS.ERROR,a,"Label element should not be used for this type of form control.","H44.NoLabelAllowed");else{d=!1;!0===/^(checkbox|radio)$/.test(c)&&(d=!0);if(a.compareDocumentPosition)if(c=a.compareDocumentPosition(this._labelNames[e]),2===(c&2))var f=1;else 4===(c&4)&&(f=-1);else a.sourceIndex&&
(f=a.sourceIndex-this._labelNames[e].sourceIndex);!0===d&&0<f?HTMLCS.addMessage(HTMLCS.ERROR,a,"The label element for this control should be placed after this element.","H44.1.After"):!1===d&&0>f&&HTMLCS.addMessage(HTMLCS.ERROR,a,"The label element for this control should be placed before this element.","H44.1.Before")}else!1===d&&(!0===a.hasAttribute("title")?!0===/^\s*$/.test(a.getAttribute("title"))?HTMLCS.addMessage(HTMLCS.ERROR,a,"Form control without a label contains an empty title attribute. The title attribute should identify the purpose of the control.",
"H65.3"):HTMLCS.addMessage(HTMLCS.WARNING,a,"Check that the title attribute identifies the purpose of the control, and that a label element is not appropriate.","H65"):HTMLCS.addMessage(HTMLCS.ERROR,a,"Form control does not have an explicit label or title attribute, identifying the purpose of the control.","H44.2"))},testPresentationMarkup:function(a){for(var b=a.querySelectorAll("b, i, u, s, strike, tt, big, small, center, font"),c=0;c<b.length;c++){var d="H49."+b[c].nodeName.substr(0,1).toUpperCase()+
b[c].nodeName.substr(1).toLowerCase();HTMLCS.addMessage(HTMLCS.WARNING,b[c],"Semantic markup should be used to mark emphasised or special text so that it can be programmatically determined.",d)}b=a.querySelectorAll("*[align]");for(c=0;c<b.length;c++)d="H49.AlignAttr",HTMLCS.addMessage(HTMLCS.WARNING,b[c],"Semantic markup should be used to mark emphasised or special text so that it can be programmatically determined.",d)},testNonSemanticHeading:function(a){var b=a.nodeName.toLowerCase();if("p"===b||
"div"===b)b=a.childNodes,1===b.length&&1===b[0].nodeType&&!0===/^(strong|em|b|i|u)$/.test(b[0].nodeName.toLowerCase())&&HTMLCS.addMessage(HTMLCS.WARNING,a,"Heading markup should be used if this content is intended as a heading.","H42")},testTableHeaders:function(a){for(var b=this._testTableHeadersAttrs(a),c=this._testTableScopeAttrs(a),d=0;d<c.invalid.length;d++)HTMLCS.addMessage(HTMLCS.ERROR,c.invalid[d],"Table cell has an invalid scope attribute. Valid values are row, col, rowgroup, or colgroup.",
"H63.3");for(d=0;d<c.obsoleteTd.length;d++)HTMLCS.addMessage(HTMLCS.WARNING,c.obsoleteTd[d],"Scope attributes on td elements that act as headings for other elements are obsolete in HTML5. Use a th element instead.","H63.2");!0===b.allowScope?0===c.missing.length&&!1===b.required:!0===c.used&&(HTMLCS.addMessage(HTMLCS.WARNING,a,"Scope attributes on th elements are ambiguous in a table with multiple levels of headings. Use the headers attribute on td elements instead.","H43.ScopeAmbiguous"),c=null);
for(d=0;d<b.wrongHeaders.length;d++)HTMLCS.addMessage(HTMLCS.ERROR,b.wrongHeaders[d].element,'Incorrect headers attribute on this td element. Expected "'+b.wrongHeaders[d].expected+'" but found "'+b.wrongHeaders[d].actual+'"',"H43.IncorrectAttr");!0===b.required&&!1===b.allowScope&&(!1===b.used?HTMLCS.addMessage(HTMLCS.ERROR,a,"The relationship between td elements and their associated th elements is not defined. As this table has multiple levels of th elements, you must use the headers attribute on td elements.",
"H43.HeadersRequired"):(0<b.missingThId.length&&HTMLCS.addMessage(HTMLCS.ERROR,a,"Not all th elements in this table contain an id attribute. These cells should contain ids so that they may be referenced by td elements' headers attributes.","H43.MissingHeaderIds"),0<b.missingTd.length&&HTMLCS.addMessage(HTMLCS.ERROR,a,"Not all td elements in this table contain a headers attribute. Each headers attribute should list the ids of all th elements associated with that cell.","H43.MissingHeadersAttrs")));
!0===b.required&&!0===b.allowScope&&!1===b.correct&&!1===c.correct&&(!1===c.used&&!1===b.used?HTMLCS.addMessage(HTMLCS.ERROR,a,"The relationship between td elements and their associated th elements is not defined. Use either the scope attribute on th elements, or the headers attribute on td elements.","H43,H63"):!1===c.used&&(0<b.missingThId.length||0<b.missingTd.length)?(0<b.missingThId.length&&HTMLCS.addMessage(HTMLCS.ERROR,a,"Not all th elements in this table contain an id attribute. These cells should contain ids so that they may be referenced by td elements' headers attributes.",
"H43.MissingHeaderIds"),0<b.missingTd.length&&HTMLCS.addMessage(HTMLCS.ERROR,a,"Not all td elements in this table contain a headers attribute. Each headers attribute should list the ids of all th elements associated with that cell.","H43.MissingHeadersAttrs")):0<c.missing.length&&!1===b.used?HTMLCS.addMessage(HTMLCS.ERROR,a,"Not all th elements in this table have a scope attribute. These cells should contain a scope attribute to identify their association with td elements.","H63.1"):0<c.missing.length&&
(0<b.missingThId.length||0<b.missingTd.length)&&HTMLCS.addMessage(HTMLCS.ERROR,a,"The relationship between td elements and their associated th elements is not defined. Use either the scope attribute on th elements, or the headers attribute on td elements.","H43,H63"))},_testTableScopeAttrs:function(a){var a={th:a.getElementsByTagName("th"),td:a.getElementsByTagName("td")},b={used:!1,correct:!0,missing:[],invalid:[],obsoleteTd:[]},c;for(c in a)for(var d=0;d<a[c].length;d++){element=a[c][d];var e="";
!0===element.hasAttribute("scope")&&(b.used=!0,element.getAttribute("scope")&&(e=element.getAttribute("scope")));"th"===element.nodeName.toLowerCase()?!0===/^\s*$/.test(e)?(b.correct=!1,b.missing.push(element)):!1===/^(row|col|rowgroup|colgroup)$/.test(e)&&(b.correct=!1,b.invalid.push(element)):""!==e&&(b.obsoleteTd.push(element),!1===/^(row|col|rowgroup|colgroup)$/.test(e)&&(b.correct=!1,b.invalid.push(element)))}return b},_testTableHeadersAttrs:function(a){for(var b={required:!0,used:!1,correct:!0,
allowScope:!0,missingThId:[],missingTd:[],wrongHeaders:[]},c=a.getElementsByTagName("tr"),d=[],e=[],g=[],f=0,h=0,i=0;i<c.length;i++)for(var j=c[i],o=0,l=0;l<j.childNodes.length;l++){var m=j.childNodes[l];if(1===m.nodeType){if(d[i])for(;d[i][0]===o;)d[i].shift(),o++;var u=m.nodeName.toLowerCase(),p=Number(m.getAttribute("rowspan"))||1,q=Number(m.getAttribute("colspan"))||1;if(1<p)for(var k=i+1;k<i+p;k++){d[k]||(d[k]=[]);for(var s=o;s<o+q;s++)d[k].push(s)}if("th"===u){if(""===(m.getAttribute("id")||
""))b.correct=!1,b.missingThId.push(m);1<p&&1<q?b.allowScope=!1:!0===b.allowScope&&(void 0===g[o]&&(g[o]=0),void 0===e[i]&&(e[i]=0),e[i]+=q,g[o]+=p)}else"td"===u&&!0===m.hasAttribute("headers")&&!1===/^\s*$/.test(m.getAttribute("headers"))&&(b.used=!0);o+=q}}for(k=0;k<e.length;k++)1<e[k]&&f++;for(k=0;k<g.length;k++)1<g[k]&&h++;if(1<f||1<h)b.allowScope=!1;else if(!0===b.allowScope&&(0===f||0===h))b.required=!1;a=HTMLCS.util.getCellHeaders(a);for(k=0;k<a.length;k++)m=a[k].cell,c=a[k].headers,!1===m.hasAttribute("headers")?
(b.correct=!1,b.missingTd.push(m)):(d=(m.getAttribute("headers")||"").split(/\s+/),0===d.length?(b.correct=!1,b.missingTd.push(m)):(d=" "+d.sort().join(" ")+" ",d=d.replace(/\s+/g," ").replace(/(\w+\s)\1+/g,"$1").replace(/^\s*(.*?)\s*$/g,"$1"),c!==d&&(b.correct=!1,m={element:m,expected:c,actual:m.getAttribute("headers")||""},b.wrongHeaders.push(m))));return b},testTableCaptionSummary:function(a){var b=a.getAttribute("summary")||"",c=a.getElementsByTagName("caption"),d="";0<c.length&&(d=c[0].innerHTML.replace(/^\s*(.*?)\s*$/g,
"$1"));b=b.replace(/^\s*(.*?)\s*$/g,"$1");""!==b?!0===HTMLCS.util.isLayoutTable(a)?HTMLCS.addMessage(HTMLCS.ERROR,a,"This table appears to be used for layout, but contains a summary attribute. Layout tables must not contain summary attributes, or if supplied, must be empty.","H73.3.LayoutTable"):(d===b&&HTMLCS.addMessage(HTMLCS.ERROR,a,"If this table is a data table, and both a summary attribute and a caption element are present, the summary should not duplicate the caption.","H39,H73.4"),HTMLCS.addMessage(HTMLCS.NOTICE,
a,"If this table is a data table, check that the summary attribute describes the table's organization or explains how to use the table.","H73.3.Check")):!1===HTMLCS.util.isLayoutTable(a)&&HTMLCS.addMessage(HTMLCS.WARNING,a,"If this table is a data table, consider using the summary attribute of the table element to give an overview of this table.","H73.3.NoSummary");""!==d?!0===HTMLCS.util.isLayoutTable(a)?HTMLCS.addMessage(HTMLCS.ERROR,a,"This table appears to be used for layout, but contains a caption element. Layout tables must not contain captions.",
"H39.3.LayoutTable"):HTMLCS.addMessage(HTMLCS.NOTICE,a,"If this table is a data table, check that the caption element accurately describes this table.","H39.3.Check"):!1===HTMLCS.util.isLayoutTable(a)&&HTMLCS.addMessage(HTMLCS.WARNING,a,"If this table is a data table, consider using a caption element to the table element to identify this table.","H39.3.NoCaption")},testFieldsetLegend:function(a){var b=a.querySelector("legend");(null===b||b.parentNode!==a)&&HTMLCS.addMessage(HTMLCS.ERROR,a,"Fieldset does not contain a legend element. All fieldsets should contain a legend element that describes a description of the field group.",
"H71.3")},testOptgroup:function(a){null===a.querySelector("optgroup")&&HTMLCS.addMessage(HTMLCS.WARNING,a,"If this selection list contains groups of related options, they should be grouped with optgroup.","H85.2")},testRequiredFieldsets:function(a){for(var b=a.querySelectorAll("input[type=radio], input[type=checkbox]"),c={},d=0;d<b.length;d++){var e=b[d];if(!0===e.hasAttribute("name")){for(var g=e.getAttribute("name"),f=e.parentNode;"fieldset"!==f.nodeName.toLowerCase()&&null!==f&&f!==a;)f=f.parentNode;
"fieldset"!==f.nodeName.toLowerCase()&&(f=null)}if(void 0===c[g])c[g]=f;else if(null===f||f!==c[g]){HTMLCS.addMessage(HTMLCS.ERROR,a,"Radio buttons or check boxes with the same name attribute must be contained within a fieldset element.","H71.2");break}}},testListsWithBreaks:function(a){var b=[];if(null!==a.querySelector("br")){for(var c=[],d=0;d<a.childNodes.length;d++)c.push(a.childNodes[d]);for(var e=[];0<c.length;){var g=c.shift();if(1===g.nodeType)if("br"===g.nodeName.toLowerCase())b.push(e.join(" ").replace(/^\s*(.*?)\s*$/g,
"$1")),e=[];else for(d=g.childNodes.length-1;0<=d;--d)c.unshift(g.childNodes[d]);else 3===g.nodeType&&e.push(g.nodeValue)}0<e.length&&b.push(e.join(" ").replace(/^\s*(.*?)\s*$/g,"$1"));for(d=0;d<b.length;d++){if(!0===/^[\-*]\s+/.test(b[0])){HTMLCS.addMessage(HTMLCS.WARNING,a,"Content appears to have the visual appearance of a bulleted list. It may be appropriate to mark this content up using a ul element.","H48.1");break}if(!0===/^\d+[:\/\-.]?\s+/.test(b[0])){HTMLCS.addMessage(HTMLCS.WARNING,a,"Content appears to have the visual appearance of a numbered list. It may be appropriate to mark this content up using an ol element.",
"H48.2");break}}}},testHeadingOrder:function(a,b){for(var c=0,d=a.querySelectorAll("h1, h2, h3, h4, h5, h6"),e=0;e<d.length;e++){var g=parseInt(d[e].nodeName.substr(1,1));if(1<g-c){var f="should be an h"+(c+1)+" to be properly nested";0===c&&(f="appears to be the primary document heading, so should be an h1 element");HTMLCS.addMessage(b,d[e],"The heading structure is not logically nested. This h"+g+" element "+f+".","G141")}c=g}},testEmptyHeading:function(a){var b=a.textContent;void 0===b&&(b=a.innerText);
!0===/^\s*$/.test(b)&&HTMLCS.addMessage(HTMLCS.ERROR,a,"Heading tag found with no content. Text that is not intended as a heading should not be marked up with heading tags.","H42.2")},testUnstructuredNavLinks:function(a){a.nodeName.toLowerCase();for(var b=0,c=a.childNodes,d=0;d<c.length&&(!(1===c[d].nodeType&&"a"===c[d].nodeName.toLowerCase())||!(b++,1<b));d++);if(1<b){for(b=a.parentNode;null!==b&&"ul"!==b.nodeName.toLowerCase()&&"ol"!==b.nodeName.toLowerCase();)b=b.parentNode;null===b&&HTMLCS.addMessage(HTMLCS.WARNING,
a,"If this element contains a navigation section, it is recommended that it be marked up as a list.","H48")}},testGeneralTable:function(a){!0===HTMLCS.util.isLayoutTable(a)?HTMLCS.addMessage(HTMLCS.NOTICE,a,"This table appears to be a layout table. If it is meant to instead be a data table, ensure header cells are identified using th elements.","LayoutTable"):HTMLCS.addMessage(HTMLCS.NOTICE,a,"This table appears to be a data table. If it is meant to instead be a layout table, ensure there are no th elements, and no summary or caption.",
"DataTable")}},HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_3_1_3_3={register:function(){return["_top"]},process:function(a,b){HTMLCS.addMessage(HTMLCS.NOTICE,b,"Where instructions are provided for understanding the content, do not rely on sensory characteristics alone (such as shape, size or location) to describe objects.","G96")}},HTMLCS_WCAG2AAA_Sniffs_Principle4_Guideline4_1_4_1_1={register:function(){return["_top"]},process:function(a,b){if(a===b)for(var c=b.querySelectorAll("*[id]"),d={},e=
0;e<c.length;e++){var g=c[e].getAttribute("id");void 0!==d[g]?HTMLCS.addMessage(HTMLCS.ERROR,c[e],'Duplicate id attribute value "'+g+'" found on the web page.',"F77"):d[g]=!0}}},HTMLCS_WCAG2AAA_Sniffs_Principle4_Guideline4_1_4_1_2={register:function(){return"a,button,fieldset,input,select,textarea".split(",")},process:function(a,b){"a"===a.nodeName.toLowerCase()?this._processLinks(a):this._processFormControls(a,b)},_processLinks:function(a){var b=!1,c=HTMLCS.util.getElementTextContent(a);!0===a.hasAttribute("title")&&
!1===/^\s*$/.test(a.getAttribute("title"))||/^\s*$/.test(c);!0===a.hasAttribute("href")&&!1===/^\s*$/.test(a.getAttribute("href"))&&(b=!0);!1===b?!0===/^\s*$/.test(c)?!0===a.hasAttribute("id")?HTMLCS.addMessage(HTMLCS.WARNING,a,"Anchor element found with an ID but without a href or link text. Consider moving its ID to a parent or nearby element.","H91.A.Empty"):!0===a.hasAttribute("name")?HTMLCS.addMessage(HTMLCS.WARNING,a,"Anchor element found with a name attribute but without a href or link text. Consider moving the name attribute to become an ID of a parent or nearby element.",
"H91.A.EmptyWithName"):HTMLCS.addMessage(HTMLCS.ERROR,a,"Anchor element found with no link content and no name and/or ID attribute.","H91.A.EmptyNoId"):!0===a.hasAttribute("id")?HTMLCS.addMessage(HTMLCS.WARNING,a,"Anchor elements should not be used for defining in-page link targets. If not using the ID for other purposes (such as CSS or scripting), consider moving it to a parent element.","H91.A.NoHref"):HTMLCS.addMessage(HTMLCS.WARNING,a,"Anchor element found with link content, but no href and/or ID attribute has been supplied.",
"H91.A.Placeholder"):!0===/^\s*$/.test(c)&&0===a.querySelectorAll("img").length&&HTMLCS.addMessage(HTMLCS.ERROR,a,"Anchor element found with a valid href attribute, but no link content has been supplied.","H91.A.NoContent")},_processFormControls:function(a,b){var c={button:["@title","_content"],fieldset:["legend"],input_button:["@value"],input_text:["label","@title"],input_file:["label","@title"],input_password:["label","@title"],input_checkbox:["label","@title"],input_radio:["label","@title"],input_image:["@alt",
"@title"],select:["label","@title"],textarea:["label","@title"]},d={select:"option_selected"},e=a.nodeName.toLowerCase(),g=a.nodeName.substr(0,1).toUpperCase()+a.nodeName.substr(1).toLowerCase();if("input"===e){e=!1===a.hasAttribute("type")?e+"_text":e+("_"+a.getAttribute("type").toLowerCase());if("input_submit"===e||"input_reset"===e)e="input_button";g="Input"+e.substr(6,1).toUpperCase()+e.substr(7).toLowerCase()}var f=c[e],h=d[e];if(f){for(h=0;h<c[e].length;h++)if(f=c[e][h],"_content"===f){if(f=
HTMLCS.util.getElementTextContent(a),!1===/^\s*$/.test(f))break}else if("label"===f){if(a.hasAttribute("id")&&!1===/^\s*$/.test(a.getAttribute("id")))if(!0===/^\-?[A-Za-z][A-Za-z0-9\-_]*$/.test(a.getAttribute("id"))){if(null!==b.querySelector("label[for="+a.getAttribute("id")+"]"))break}else{for(var f=b.getElementsByTagName("label"),i=!1,j=0;j<f.length;j++)if(!0===f[j].hasAttribute("for")&&f[j].getAttribute("for")===a.getAttribute("id")){i=!0;break}if(!0===i)break}}else if("@"===f.charAt(0)){if(f=
f.substr(1,f.length),!0===a.hasAttribute(f)&&!1===/^\s*$/.test(a.getAttribute(f)))break}else if(f=a.querySelector(f),null!==f&&(f=HTMLCS.util.getElementTextContent(f),!1===/^\s*$/.test(f)))break;if(h===c[e].length){f=e+" element";"input_"===e.substr(0,6)&&(f=e.substr(6)+" input element");c=c[e].slice(0,c[e].length);for(h=0;h<c.length;h++)c[h]="_content"===c[h]?"element content":"@"===c[h].charAt(0)?c[h].substr(1)+" attribute":c[h]+" element";HTMLCS.addMessage(HTMLCS.ERROR,a,"This "+f+" does not have a name available to an accessibility API. Valid names are: "+
c.join(", ")+".","H91."+g+".Name")}}h=d[e];d=!1;void 0===h?d=!0:"_content"===h?(f=HTMLCS.util.getElementTextContent(a),!1===/^\s*$/.test(f)&&(d=!0)):"option_selected"===h?!1===a.hasAttribute("multiple")?null!==a.querySelector("option[selected]")&&(d=!0):d=!0:"@"===h.charAt(0)&&(h=h.substr(1,h.length),!0===a.hasAttribute(h)&&(d=!0));!1===d&&(f=e+" element","input_"===e.substr(0,6)&&(f=e.substr(6)+" input element"),e="",e="_content"===h?"by adding content to the element":"option_selected"===h?'by adding a "selected" attribute to one of its options':
"@"===h.charAt(0)?"using the "+h+" attribute":"using the "+h+" element",HTMLCS.addMessage(HTMLCS.ERROR,a,"This "+f+" does not have a value available to an accessibility API. Add one "+e+".","H91."+g+".Value"))}},HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_3_3_3_5={register:function(){return["form"]},process:function(a){HTMLCS.addMessage(HTMLCS.NOTICE,a,"Check that context-sensitive help is available for this form, at a Web-page and/or control level.","G71,G184,G193")}},HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_3_3_3_1=
{register:function(){return["form"]},process:function(a){HTMLCS.addMessage(HTMLCS.NOTICE,a,"If an input error is automatically detected in this form, check that the item(s) in error are identified and the error(s) are described to the user in text.","G83,G84,G85")}},HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_3_3_3_6={register:function(){return["form"]},process:function(a){HTMLCS.addMessage(HTMLCS.NOTICE,a,"Check that submissions to this form are either reversible, checked for input errors, and/or confirmed by the user.",
"G98,G99,G155,G164,G168.AllForms")}},HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_3_3_3_2={register:function(){return["form"]},process:function(a){HTMLCS.addMessage(HTMLCS.NOTICE,a,"Check that descriptive labels or instructions (including for required fields) are provided for user input in this form.","G131,G89,G184,H90")}},HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_3_3_3_3={register:function(){return["form"]},process:function(a){HTMLCS.addMessage(HTMLCS.NOTICE,a,"Check that this form provides suggested corrections to errors in user input, unless it would jeopardize the security or purpose of the content.",
"G177")}},HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_3_3_3_4={register:function(){return["form"]},process:function(a){HTMLCS.addMessage(HTMLCS.NOTICE,a,"If this form would bind a user to a financial or legal commitment, modify/delete user-controllable data, or submit test responses, ensure that submissions are either reversible, checked for input errors, and/or confirmed by the user.","G98,G99,G155,G164,G168.LegalForms")}},HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_2_3_2_3={register:function(){return["_top"]},
process:function(a,b){HTMLCS.addMessage(HTMLCS.NOTICE,b,"Check that navigational mechanisms that are repeated on multiple Web pages occur in the same relative order each time they are repeated, unless a change is initiated by the user.","G61")}},HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_2_3_2_4={register:function(){return["_top"]},process:function(a,b){HTMLCS.addMessage(HTMLCS.NOTICE,b,"Check that components that have the same functionality within this Web page are identified consistently in the set of Web pages to which it belongs.",
"G197")}},HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_2_3_2_2={register:function(){return["form"]},process:function(a){"form"===a.nodeName.toLowerCase()&&this.checkFormSubmitButton(a)},checkFormSubmitButton:function(a){null===a.querySelector("input[type=submit], input[type=image], button[type=submit]")&&HTMLCS.addMessage(HTMLCS.ERROR,a,'Form does not contain a submit button (input type="submit", input type="image", or button type="submit").',"H32.2")}},HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_2_3_2_5=
{register:function(){return["a"]},process:function(a){"a"===a.nodeName.toLowerCase()&&this.checkNewWindowTarget(a)},checkNewWindowTarget:function(a){!0===a.hasAttribute("target")&&"_blank"===(a.getAttribute("target")||"")&&!1===/new window/i.test(a.innerHTML)&&HTMLCS.addMessage(HTMLCS.WARNING,a,"Check that this link's link text contains information indicating that the link will open in a new window.","H83.3")}},HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_2_3_2_1={register:function(){return["_top"]},
process:function(a,b){null!==b.querySelector("input, textarea, button, select")&&HTMLCS.addMessage(HTMLCS.NOTICE,b,"Check that a change of context does not occur when any input field receives focus.","G107")}},HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_1_3_1_2={register:function(){return["_top"]},process:function(a,b){HTMLCS.addMessage(HTMLCS.NOTICE,b,"Ensure that any change in language is marked using the lang and/or xml:lang attribute on an element, as appropriate.","H58");for(var c=HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_1_3_1_1,
d=b.querySelectorAll("*[lang]"),e=0;e<=d.length;e++){var g=e===d.length?b:d[e];if(!g.documentElement&&"html"!==g.nodeName.toLowerCase()){if(!0===g.hasAttribute("lang")){var f=g.getAttribute("lang");!1===c.isValidLanguageTag(f)&&HTMLCS.addMessage(HTMLCS.ERROR,g,"The language specified in the lang attribute of this element does not appear to be well-formed.","H58.1.Lang")}!0===g.hasAttribute("xml:lang")&&(f=g.getAttribute("xml:lang"),!1===c.isValidLanguageTag(f)&&HTMLCS.addMessage(HTMLCS.ERROR,g,"The language specified in the xml:lang attribute of this element does not appear to be well-formed.",
"H58.1.XmlLang"))}}}},HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_1_3_1_6={register:function(){return["ruby"]},process:function(a){var b=a.querySelectorAll("rb");0===a.querySelectorAll("rt").length&&(0===b.length?HTMLCS.addMessage(HTMLCS.ERROR,a,"Ruby element does not contain an rt element containing pronunciation information for its body text.","H62.1.HTML5"):HTMLCS.addMessage(HTMLCS.ERROR,a,"Ruby element does not contain an rt element containing pronunciation information for the text inside the rb element.",
"H62.1.XHTML11"));0===a.querySelectorAll("rp").length&&HTMLCS.addMessage(HTMLCS.ERROR,a,"Ruby element does not contain rp elements, which provide extra punctuation to browsers not supporting ruby text.","H62.2")}},HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_1_3_1_5={register:function(){return["_top"]},process:function(a,b){HTMLCS.addMessage(HTMLCS.NOTICE,b,"Where the content requires reading ability more advanced than the lower secondary education level, supplemental content or an alternative version should be provided.",
"G86,G103,G79,G153,G160")}},HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_1_3_1_3={register:function(){return["_top"]},process:function(a,b){HTMLCS.addMessage(HTMLCS.NOTICE,b,"Check that there is a mechanism available for identifying specific definitions of words or phrases used in an unusual or restricted way, including idioms and jargon.","H40,H54,H60,G62,G70")}},HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_1_3_1_4={register:function(){return["_top"]},process:function(a,b){HTMLCS.addMessage(HTMLCS.NOTICE,
b,"Check that a mechanism for identifying the expanded form or meaning of abbreviations is available.","G102,G55,G62,H28,G97")}},HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_1_3_1_1={register:function(){return["html"]},process:function(a,b){if(!1===a.hasAttribute("lang")&&!1===a.hasAttribute("xml:lang"))HTMLCS.addMessage(HTMLCS.ERROR,a,"The html element should have a lang or xml:lang attribute which describes the language of the document.","H57.2");else{if(!0===a.hasAttribute("lang")){var c=a.getAttribute("lang");
!1===this.isValidLanguageTag(c)&&HTMLCS.addMessage(HTMLCS.ERROR,b,"The language specified in the lang attribute of the document element does not appear to be well-formed.","H57.3.Lang")}!0===a.hasAttribute("xml:lang")&&(c=a.getAttribute("xml:lang"),!1===this.isValidLanguageTag(c)&&HTMLCS.addMessage(HTMLCS.ERROR,b,"The language specified in the xml:lang attribute of the document element does not appear to be well-formed.","H57.3.XmlLang"))}},isValidLanguageTag:function(a){var b=!0;!1===RegExp("^([ix](-[a-z0-9]{1,8})+)$|^[a-z]{2,8}(-[a-z]{3}){0,3}(-[a-z]{4})?(-[a-z]{2}|-[0-9]{3})?(-[0-9][a-z0-9]{3}|-[a-z0-9]{5,8})*(-[a-wy-z0-9](-[a-z0-9]{2,8})+)*(-x(-[a-z0-9]{1,8})+)?$",
"i").test(a)&&(b=!1);return b}},HTMLCS_WCAG2AA={name:"WCAG2AA",description:"Web Content Accessibility Guidelines (WCAG) 2.0 AA",sniffs:[{standard:"WCAG2AAA",include:"Principle1.Guideline1_1.1_1_1,Principle1.Guideline1_2.1_2_1,Principle1.Guideline1_2.1_2_2,Principle1.Guideline1_2.1_2_4,Principle1.Guideline1_2.1_2_5,Principle1.Guideline1_3.1_3_1,Principle1.Guideline1_3.1_3_1_A,Principle1.Guideline1_3.1_3_2,Principle1.Guideline1_3.1_3_3,Principle1.Guideline1_4.1_4_1,Principle1.Guideline1_4.1_4_2,Principle1.Guideline1_4.1_4_3,Principle1.Guideline1_4.1_4_3_F24,Principle1.Guideline1_4.1_4_3_Contrast,Principle1.Guideline1_4.1_4_4,Principle1.Guideline1_4.1_4_5,Principle2.Guideline2_1.2_1_1,Principle2.Guideline2_1.2_1_2,Principle2.Guideline2_2.2_2_1,Principle2.Guideline2_2.2_2_2,Principle2.Guideline2_3.2_3_1,Principle2.Guideline2_4.2_4_1,Principle2.Guideline2_4.2_4_2,Principle2.Guideline2_4.2_4_3,Principle2.Guideline2_4.2_4_4,Principle2.Guideline2_4.2_4_5,Principle2.Guideline2_4.2_4_6,Principle2.Guideline2_4.2_4_7,Principle3.Guideline3_1.3_1_1,Principle3.Guideline3_1.3_1_2,Principle3.Guideline3_2.3_2_1,Principle3.Guideline3_2.3_2_2,Principle3.Guideline3_2.3_2_3,Principle3.Guideline3_2.3_2_4,Principle3.Guideline3_3.3_3_1,Principle3.Guideline3_3.3_3_2,Principle3.Guideline3_3.3_3_3,Principle3.Guideline3_3.3_3_4,Principle4.Guideline4_1.4_1_1,Principle4.Guideline4_1.4_1_2".split(",")}]},
HTMLCS_WCAG2A={name:"WCAG2A",description:"Web Content Accessibility Guidelines (WCAG) 2.0 A",sniffs:[{standard:"WCAG2AAA",include:"Principle1.Guideline1_1.1_1_1,Principle1.Guideline1_2.1_2_1,Principle1.Guideline1_2.1_2_2,Principle1.Guideline1_2.1_2_3,Principle1.Guideline1_3.1_3_1,Principle1.Guideline1_3.1_3_1_A,Principle1.Guideline1_3.1_3_2,Principle1.Guideline1_3.1_3_3,Principle1.Guideline1_4.1_4_1,Principle1.Guideline1_4.1_4_2,Principle2.Guideline2_1.2_1_1,Principle2.Guideline2_1.2_1_2,Principle2.Guideline2_2.2_2_1,Principle2.Guideline2_2.2_2_2,Principle2.Guideline2_3.2_3_1,Principle2.Guideline2_4.2_4_1,Principle2.Guideline2_4.2_4_2,Principle2.Guideline2_4.2_4_3,Principle2.Guideline2_4.2_4_4,Principle3.Guideline3_1.3_1_1,Principle3.Guideline3_2.3_2_1,Principle3.Guideline3_2.3_2_2,Principle3.Guideline3_3.3_3_1,Principle3.Guideline3_3.3_3_2,Principle4.Guideline4_1.4_1_1,Principle4.Guideline4_1.4_1_2".split(",")}]};


var HTMLCSAuditor = new function()
{
    var _prefix   = 'HTMLCS-';
    var _screen   = '';
    var _standard = '';
    var _sources  = [];
    var _options  = {};
    var _doc      = null;
    var _messages = [];
    var _page     = 1;

    var self = this;

    this.pointerContainer = null;

    
    var buildSummaryButton = function(id, className, title, onclick) {
        var button       = _doc.createElement('div');
        button.id        = id;
        button.className = _prefix + 'button';
        button.setAttribute('title', title);

        var buttonInner       = _doc.createElement('span');
        buttonInner.className = _prefix + 'button-icon ' + _prefix + 'button-' + className;
        button.appendChild(buttonInner);

        var nbsp = _doc.createTextNode(String.fromCharCode(160));
        button.appendChild(nbsp);

        if ((onclick instanceof Function) === true) {
            button.onclick = function() {
                if (/disabled/.test(button.className) === false) {
                    onclick(button);
                }
            };
        }

        return button;
    };

    
    var buildCheckbox = function(id, title, checked, disabled, onclick) {
        if (checked === undefined) {
            checked = false;
        }

        var isIE = new RegExp('msie', 'i').test(navigator.userAgent);

        var label   = _doc.createElement('label');
        var content = '';
        label.className = _prefix + 'checkbox';

        content    += '<span class="' + _prefix + 'checkbox-switch">';
        content    += '<span class="' + _prefix + 'checkbox-slider"></span>';
        content    += '<input id="' + id + '" type="checkbox"';

        if (checked === true) {
            content += ' checked="checked"';
            label.className += ' active';
        }

        if (disabled === true) {
            content += ' disabled="disabled"';
            label.className += ' disabled';
        }

        content += ' title="' + title + '" /></span>';

        label.innerHTML = content;

        var input = label.getElementsByTagName('input')[0];
        input.onclick = function() {
            if (input.checked === true) {
                label.className += ' active';
            } else {
                label.className = label.className.replace('active', '');
            }

            if (onclick instanceof Function === true) {
                onclick(input);
            }
        };

        if (isIE === true) {
            label.onclick = function() {
                input.click();
            }
        }

        return label;
    };

    
    var buildRadioButton = function(groupName, value, title, checked) {
        if (checked === undefined) {
            checked = false;
        }

        var label   = _doc.createElement('label');
        label.className = _prefix + 'radio';
        var content = '<span class="' + _prefix + 'radio-title">' + title + '</span>';
        content    += '<span class="' + _prefix + 'radio-switch">';
        content    += '<span class="' + _prefix + 'radio-slider"></span>';
        content    += '<input type="radio" name="' + _prefix + groupName + '" ';
        content    += 'class="' + _prefix + 'radiobtn"';
        content    += 'value="' + value + '"';

        if (checked === true) {
            content    += ' checked="true"';
        }

        content += ' /></span>';

        label.innerHTML = content;

        return label;
    };

    
    var buildHeaderSection = function(standard, wrapper) {
        var header       = _doc.createElement('div');
        header.className = _prefix + 'header';
        header.innerHTML = 'HTML_CodeSniffer by Squiz';
        header.setAttribute('title', 'Using standard ' + standard);

        var dragging = false;
        var prevX    = 0;
        var prevY    = 0;
        var mouseX   = 0;
        var mouseY   = 0;

        header.onmousedown = function(e) {
            e = e || window.event;

            dragging = true;
            mouseX   = e.clientX;
            mouseY   = e.clientY;
            return false;
        };

        _doc.onmousemove = function(e) {
            e = e || window.event;

            if (dragging === true) {
                var top = wrapper.offsetTop;
                var left = wrapper.offsetLeft;

                if (mouseY < e.clientY) {
                    top += (e.clientY - mouseY);
                    wrapper.style.top = top + 'px';
                } else if (mouseY > e.clientY) {
                    top -= (mouseY - e.clientY);
                    wrapper.style.top = top + 'px';
                }

                if (mouseX < e.clientX) {
                    left += (e.clientX - mouseX);
                    wrapper.style.left = left + 'px';
                } else if (mouseX > e.clientX) {
                    left -= (mouseX - e.clientX);
                    wrapper.style.left = left + 'px';
                }

                mouseX = e.clientX;
                mouseY = e.clientY;
            }//end if
        };

        _doc.onmouseup = function(e) {
            dragging = false;
        };

        var closeIcon       = _doc.createElement('div');
        closeIcon.className = _prefix + 'close';
        closeIcon.setAttribute('title', 'Close');
        closeIcon.onmousedown = function() {
            self.close.call(self);
        }

        header.appendChild(closeIcon);

        return header;
    };

    
    var buildSummarySection = function(errors, warnings, notices) {
        var summary       = _doc.createElement('div');
        summary.className = _prefix + 'summary';

        var leftPane       = _doc.createElement('div');
        leftPane.className = _prefix + 'summary-left';
        summary.appendChild(leftPane);

        var rightPane       = _doc.createElement('div');
        rightPane.className = _prefix + 'summary-right';
        summary.appendChild(rightPane);

        var leftContents = [];

        var divider = ', &nbsp;<span class="' + _prefix + 'divider"></span>';

        if (errors > 0) {
            var typeName = 'Errors';
            if (errors === 1) {
                typeName = 'Error';
            }
            leftContents.push('<strong>' + errors + '</strong> ' + typeName);
        }

        if (warnings > 0) {
            var typeName = 'Warnings';
            if (warnings === 1) {
                typeName = 'Warning';
            }
            leftContents.push('<strong>' + warnings + '</strong> ' + typeName);
        }

        if (notices > 0) {
            var typeName = 'Notices';
            if (notices === 1) {
                typeName = 'Notice';
            }
            leftContents.push('<strong>' + notices + '</strong> ' + typeName);
        }

        // Start lineage in left pane.
        var lineage       = _doc.createElement('ol');
        lineage.className = _prefix + 'lineage';

        // Back to summary item.
        var lineageHomeItem       = _doc.createElement('li');
        lineageHomeItem.className = _prefix + 'lineage-item';

        var lineageHomeLink       = _doc.createElement('a');
        lineageHomeLink.className = _prefix + 'lineage-link';
        lineageHomeLink.href      = 'javascript:';

        var lineageHomeSpan       = _doc.createElement('span');
        lineageHomeSpan.innerHTML = 'Home';
        lineageHomeLink.appendChild(lineageHomeSpan);

        lineageHomeLink.onmousedown = function() {
            self.run(_standard, _sources, _options);
        };

        // Issue totals.
        var lineageTotalsItem       = _doc.createElement('li');
        lineageTotalsItem.className = _prefix + 'lineage-item';
        lineageTotalsItem.innerHTML = leftContents.join(divider);

        lineageHomeItem.appendChild(lineageHomeLink);
        lineage.appendChild(lineageHomeItem);
        lineage.appendChild(lineageTotalsItem);
        leftPane.appendChild(lineage);

        rightPane.appendChild(_doc.createTextNode(String.fromCharCode(160)));

        return summary;
    };

    
    var buildDetailSummarySection = function(issue, totalIssues) {
        var summary       = _doc.createElement('div');
        summary.className = _prefix + 'summary-detail';

        var leftPane       = _doc.createElement('div');
        leftPane.className = _prefix + 'summary-left';

        var rightPane       = _doc.createElement('div');
        rightPane.className = _prefix + 'summary-right';

        // Start lineage.
        var lineage       = _doc.createElement('ol');
        lineage.className = _prefix + 'lineage';

        var lineageHomeItem       = _doc.createElement('li');
        lineageHomeItem.className = _prefix + 'lineage-item';

        var lineageHomeLink       = _doc.createElement('a');
        lineageHomeLink.className = _prefix + 'lineage-link';
        lineageHomeLink.href      = 'javascript:';

        var lineageHomeSpan       = _doc.createElement('span');
        lineageHomeSpan.innerHTML = 'Home';
        lineageHomeLink.appendChild(lineageHomeSpan);

        lineageHomeLink.onmousedown = function() {
            self.run(_standard, _sources, _options);
        };

        // Back to Report item.
        var lineageReportItem       = _doc.createElement('li');
        lineageReportItem.className = _prefix + 'lineage-item';

        var lineageReportLink       = _doc.createElement('a');
        lineageReportLink.className = _prefix + 'lineage-link';
        lineageReportLink.href      = 'javascript:';
        lineageReportLink.innerHTML = 'Report';
        lineageReportLink.setAttribute('title', 'Back to Report');

        lineageReportLink.onmousedown = function() {
            var list = _doc.querySelectorAll('.HTMLCS-inner-wrapper')[0];
            list.style.marginLeft = '0px';
            list.style.maxHeight  = null;

            summary.style.display = 'none';
            var listSummary = _doc.querySelectorAll('.HTMLCS-summary')[0];
            listSummary.style.display = 'block';
        };

        // Issue Count item.
        var lineageTotalsItem       = _doc.createElement('li');
        lineageTotalsItem.className = _prefix + 'lineage-item';
        lineageTotalsItem.innerHTML = 'Issue ' + issue + ' of ' + totalIssues;

        lineageHomeItem.appendChild(lineageHomeLink);
        lineageReportItem.appendChild(lineageReportLink);
        lineage.appendChild(lineageHomeItem);
        lineage.appendChild(lineageReportItem);
        lineage.appendChild(lineageTotalsItem);
        leftPane.appendChild(lineage);

        var buttonGroup       = _doc.createElement('div');
        buttonGroup.className = _prefix + 'button-group';

        var prevButton = buildSummaryButton(_prefix + 'button-previous-issue', 'previous', 'Previous Issue', function(target) {
            var newIssue = Number(issue) - 1;

            if (newIssue >= 1) {
                setCurrentDetailIssue(newIssue - 1);
                wrapper = summary.parentNode;
                var newSummary = buildDetailSummarySection(newIssue, totalIssues);
                wrapper.replaceChild(newSummary, summary);
                newSummary.style.display = 'block';

                var issueList = _doc.querySelectorAll('.HTMLCS-issue-detail-list')[0];
                issueList.firstChild.style.marginLeft = (parseInt(issueList.firstChild.style.marginLeft, 10) + 300) + 'px';
                pointToIssueElement(newIssue - 1);
            }//end if
        });

        var nextButton = buildSummaryButton(_prefix + 'button-next-issue', 'next', 'Next Issue', function(target) {
            var newIssue = Number(issue) + 1;

            if (newIssue <= _messages.length) {
                setCurrentDetailIssue(newIssue - 1);
                wrapper = summary.parentNode;
                var newSummary = buildDetailSummarySection(newIssue, totalIssues);
                wrapper.replaceChild(newSummary, summary);
                newSummary.style.display = 'block';

                var issueList = _doc.querySelectorAll('.HTMLCS-issue-detail-list')[0];
                issueList.firstChild.style.marginLeft = (parseInt(issueList.firstChild.style.marginLeft, 10) - 300) + 'px';
                pointToIssueElement(newIssue - 1);
            }//end if
        });

        if (issue === 1) {
            prevButton.className += ' disabled';
        }

        if (issue === totalIssues) {
            nextButton.className += ' disabled';
        }

        buttonGroup.appendChild(prevButton);
        buttonGroup.appendChild(nextButton);
        rightPane.appendChild(buttonGroup);

        summary.appendChild(leftPane);
        summary.appendChild(rightPane);

        return summary;
    };

    
    var buildIssueListSection = function(messages) {
        var issueListWidth = (Math.ceil(messages.length / 5) * 300);
        var issueList      = _doc.createElement('div');
        issueList.id        = _prefix + 'issues';
        issueList.className = _prefix + 'details';
        issueList.setAttribute('style', 'width: ' + issueListWidth + 'px');

        var listSection = _doc.createElement('ol');
        listSection.className = _prefix + 'issue-list';
        listSection.setAttribute('style', 'margin-left: 0');

        for (var i = 0; i < messages.length; i++) {
            if ((i > 0) && ((i % 5) === 0)) {
                issueList.appendChild(listSection);
                var listSection = _doc.createElement('ol');
                listSection.className = _prefix + 'issue-list';
            }

            var msg = buildMessageSummary(i, messages[i]);
            listSection.appendChild(msg);
        }

        issueList.appendChild(listSection);

        return issueList;
    };

    var buildIssueDetailSection = function(messages) {
        var issueListWidth  = (messages.length * 300);
        var issueList       = _doc.createElement('div');
        issueList.id        = _prefix + 'issues-detail';
        issueList.className = _prefix + 'details';
        issueList.setAttribute('style', 'width: ' + issueListWidth + 'px');

        var listSection = _doc.createElement('ol');
        listSection.className = _prefix + 'issue-detail-list';
        listSection.setAttribute('style', 'margin-left: 0');

        for (var i = 0; i < messages.length; i++) {
            var msg = buildMessageDetail(i, messages[i]);
            listSection.appendChild(msg);
        }

        issueList.appendChild(listSection);

        return issueList;
    };

    var buildSettingsSection = function() {
        var settingsDiv       = _doc.createElement('div');
        settingsDiv.className = _prefix + 'settings';

        var useStandardDiv = _doc.createElement('div');
        useStandardDiv.id = _prefix + 'settings-use-standard';

        var useStandardLabel       = _doc.createElement('label');
        useStandardLabel.innerHTML = 'Standards:';
        useStandardLabel.setAttribute('for', _prefix + 'settings-use-standard-select');

        var useStandardSelect       = _doc.createElement('select');
        useStandardSelect.id        = _prefix + 'settings-use-standard-select';
        useStandardSelect.innerHTML = '';

        var standards = ['WCAG2AAA', 'WCAG2AA', 'WCAG2A'];
        for (var i = 0; i < standards.length; i++) {
            var standard     = standards[i];
            var option       = _doc.createElement('option');
            option.value     = standard;
            option.innerHTML = window['HTMLCS_' + standard].name;

            if (standard === _standard) {
                option.selected = true;
            }

            useStandardSelect.appendChild(option);
            useStandardSelect.onchange = function() {
                _standard = this.options[this.selectedIndex].value;
                self.run(_standard, _sources, _options);
            }
        }

        var issueCountDiv = _doc.createElement('div');
        issueCountDiv.id  = _prefix + 'settings-issue-count';

        var issueCountHelpDiv       = _doc.createElement('div');
        issueCountHelpDiv.id        = _prefix + 'settings-issue-count-help';
        issueCountHelpDiv.innerHTML = 'Select the types of issues to include in the report';

        var viewReportDiv       = _doc.createElement('div');
        viewReportDiv.id        = _prefix + 'settings-view-report';
        viewReportDiv.innerHTML = 'View Report';

        viewReportDiv.onclick = function() {
            if (/disabled/.test(this.className) === false) {
                _options.show = {
                    error: _doc.getElementById(_prefix + 'include-error').checked,
                    warning: _doc.getElementById(_prefix + 'include-warning').checked,
                    notice: _doc.getElementById(_prefix + 'include-notice').checked
                }

                var wrapper    = _doc.getElementById(_prefix + 'wrapper');
                var newWrapper = self.build(_standard, _messages, _options);

                if (_options.parentElement) {
                    _options.parentElement.replaceChild(newWrapper, wrapper);
                } else {
                    newWrapper.style.left = wrapper.style.left;
                    newWrapper.style.top  = wrapper.style.top;
                    _doc.body.replaceChild(newWrapper, wrapper);
                }

                if (_options.listUpdateCallback) {
                    _options.listUpdateCallback.call(this, _messages);
                }
            }//end if
        };

        var wrapper = _doc.getElementById(_prefix + 'wrapper');
        var levels  = self.countIssues(_messages);

        // Set default show options based on the first run. Don't re-do these, let
        // the user's settings take priority, unless there is no message.
        if ((_options.show === undefined) && (_messages.length > 0)) {
            _options.show = {
                error: true,
                warning: true,
                notice: false
            }

            if ((levels.error === 0) && (levels.warning === 0)) {
                _options.show.notice = true;
            }
        }

        for (var level in levels) {
            var msgCount       = levels[level];
            var levelDiv       = _doc.createElement('div');
            levelDiv.className = _prefix + 'issue-tile ' + _prefix + level.toLowerCase();

            var levelCountDiv       = _doc.createElement('div');
            levelCountDiv.className = 'HTMLCS-tile-text';

            var content = '<strong>' + msgCount + '</strong> ' + level.substr(0, 1).toUpperCase() + level.substr(1);
            if (msgCount !== 1) {
                content += 's';
            }

            levelCountDiv.innerHTML = content;

            if (_options.show === undefined) {
                var checked  = false;
                var disabled = true;
            } else {
                var checked  = _options.show[level];
                var disabled = false;

                if (msgCount === 0) {
                    disabled = true;
                }
            }

            var levelSwitch = buildCheckbox(_prefix + 'include-' + level, 'Toggle display of ' + level + ' messages', checked, disabled, function(input) {
                // Only change checkboxes that haven't been disabled.
                var enable = false;

                if (_doc.getElementById(_prefix + 'include-error').disabled === false) {
                    _options.show.error = _doc.getElementById(_prefix + 'include-error').checked;
                    enable = enable || _options.show.error;
                }

                if (_doc.getElementById(_prefix + 'include-warning').disabled === false) {
                    _options.show.warning = _doc.getElementById(_prefix + 'include-warning').checked;
                    enable = enable || _options.show.warning;
                }

                if (_doc.getElementById(_prefix + 'include-notice').disabled === false) {
                    _options.show.notice = _doc.getElementById(_prefix + 'include-notice').checked;
                    enable = enable || _options.show.notice;
                }

                if (enable === true) {
                    viewReportDiv.className = viewReportDiv.className.replace(/ disabled/, '');
                } else {
                    viewReportDiv.className += ' disabled';
                }
            });

            levelDiv.appendChild(levelCountDiv);
            levelDiv.appendChild(levelSwitch);
            issueCountDiv.appendChild(levelDiv);
        }

        // Only disable if we have "currently showing" setting on.
        if (_options.show !== undefined) {
            var enable = (_options.show.error || _options.show.warning || _options.show.notice);
            if (enable === false) {
                viewReportDiv.className += ' disabled';
            }
        } else {
            viewReportDiv.className += ' disabled';
        }

        useStandardDiv.appendChild(useStandardLabel);
        useStandardDiv.appendChild(useStandardSelect);

        settingsDiv.appendChild(useStandardDiv);
        settingsDiv.appendChild(issueCountDiv);
        settingsDiv.appendChild(issueCountHelpDiv);
        settingsDiv.appendChild(viewReportDiv);

        return settingsDiv;
    };

    var buildMessageSummary = function(id, message) {
        var msg       = '';
        var typeText  = '';
        var typeClass = '';

        switch (message.type) {
            case HTMLCS.ERROR:
                typeText = 'Error';
            break;

            case HTMLCS.WARNING:
                typeText = 'Warning';
            break;

            case HTMLCS.NOTICE:
                typeText = 'Notice';
            break;

            default:
                // Not defined.
            break;
        }//end switch

        var typeClass  = typeText.toLowerCase();
        var messageMsg = message.msg;
        if (messageMsg.length > 115) {
            messageMsg = messageMsg.substr(0, 115) + '...';
        }

        var msg = _doc.createElement('li');
        msg.id  = _prefix + 'msg-' + id;

        var typeIcon       = _doc.createElement('span');
        typeIcon.className = _prefix + 'issue-type ' + _prefix + typeClass;
        typeIcon.setAttribute('title', typeText);
        msg.appendChild(typeIcon);

        var msgTitle       = _doc.createElement('span');
        msgTitle.className = _prefix + 'issue-title';
        msgTitle.innerHTML = messageMsg;
        msg.appendChild(msgTitle);

        msg.onclick = function() {
            var id = this.id.replace(new RegExp(_prefix + 'msg-'), '');
            setCurrentDetailIssue(id);

            var detailList = _doc.querySelectorAll('.HTMLCS-issue-detail-list')[0];
            detailList.className += ' ' + _prefix + 'transition-disabled';
            detailList.firstChild.style.marginLeft = (id * -300) + 'px';

            pointToIssueElement(id);

            setTimeout(function() {
                detailList.className = detailList.className.replace(new RegExp(' ' + _prefix + 'transition-disabled'), '');
            }, 500);

            var list = _doc.querySelectorAll('.HTMLCS-inner-wrapper')[0];
            list.style.marginLeft = '-300px';
            list.style.maxHeight  = '15em';

            summary = _doc.querySelectorAll('.HTMLCS-summary-detail')[0];
            var newSummary = buildDetailSummarySection(parseInt(id) + 1, _messages.length);
            summary.parentNode.replaceChild(newSummary, summary);
            newSummary.style.display = 'block';

            var oldSummary = _doc.querySelectorAll('.HTMLCS-summary')[0];
            oldSummary.style.display = 'none';
        }

        return msg;
    };

    var setCurrentDetailIssue = function(id) {
        var detailList = _doc.querySelectorAll('.HTMLCS-issue-detail-list')[0];
        var items      = detailList.getElementsByTagName('li');
        for (var i = 0; i < items.length; i++) {
            items[i].className = items[i].className.replace(new RegExp(' ' + _prefix + 'current'), '');
        }

        var currentItem = _doc.getElementById('HTMLCS-msg-detail-' + id);
        currentItem.className += ' ' + _prefix + 'current';

        if (_options.showIssueCallback) {
            _options.showIssueCallback.call(this, id);
        }
    }

    var buildMessageDetail = function(id, message, standard) {
        var typeText  = '';

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

        switch (message.type) {
            case HTMLCS.ERROR:
                typeText = 'Error';
            break;

            case HTMLCS.WARNING:
                typeText = 'Warning';
            break;

            case HTMLCS.NOTICE:
                typeText = 'Notice';
            break;

            default:
                // Not defined.
            break;
        }//end switch

        var typeClass     = _prefix + typeText.toLowerCase();
        var msgCodeParts  = message.code.split('.', 5);
        var principle     = msgCodeParts[1];
        var techniques    = msgCodeParts[4].split(',');
        var techniquesStr = [];

        for (var i = 0; i < techniques.length; i++) {
            techniques[i]  = techniques[i].split('.');
            techniquesStr.push('<a href="http://www.w3.org/TR/WCAG20-TECHS/' + techniques[i][0] + '" target="_blank">' + techniques[i][0] + '</a>');
        }

        var msgDiv = _doc.createElement('li');
        msgDiv.id  = _prefix + 'msg-detail-' + id;

        var msgDetailsDiv       = _doc.createElement('div');
        msgDetailsDiv.className = _prefix + 'issue-details';

        var msgType       = _doc.createElement('span');
        msgType.className = _prefix + 'issue-type ' + typeClass;
        msgType.setAttribute('title', typeText);

        var msgTitle       = _doc.createElement('div');
        msgTitle.className = _prefix + 'issue-title';
        msgTitle.innerHTML = message.msg;

        var msgWcagRef       = _doc.createElement('div');
        msgWcagRef.className = _prefix + 'issue-wcag-ref';

        var refContent       = '<em>Principle:</em> <a href="' + principles[principle].link + '" target="_blank">' + principles[principle].name + '</a><br/>';
        refContent          += '<em>Technique:</em> ' + techniquesStr.join(' '); + '<br/>';
        msgWcagRef.innerHTML = refContent;

        msgDetailsDiv.appendChild(msgType);
        msgDetailsDiv.appendChild(msgTitle);
        msgDetailsDiv.appendChild(msgWcagRef);
        msgDiv.appendChild(msgDetailsDiv);

        // Build the source view, if outerHTML exists (Firefox >= 11, Webkit, IE),
        // and applies to the particular element (ie. document doesn't have it).
        if (_options.customIssueSource) {
            var msgElementSource       = _doc.createElement('div');
            msgElementSource.className = _prefix + 'issue-source';
            msgDiv.appendChild(msgElementSource);
            _options.customIssueSource.call(this, id, message, standard, msgElementSource, msgDetailsDiv);
        } else {
            var msgElementSource       = _doc.createElement('div');
            msgElementSource.className = _prefix + 'issue-source';

            // Header row.
            var msgElementSourceHeader       = _doc.createElement('div');
            msgElementSourceHeader.className = _prefix + 'issue-source-header';

            var msgSourceHeaderText       = _doc.createElement('strong');
            msgSourceHeaderText.innerHTML = 'Code Snippet';

            var btnPointTo = buildSummaryButton(_prefix + 'button-point-to-element-' + id, 'pointer', 'Point to Element', function() {
                self.pointToElement(message.element);
            });

            msgElementSourceHeader.appendChild(msgSourceHeaderText);
            msgElementSourceHeader.appendChild(btnPointTo);
            msgElementSource.appendChild(msgElementSourceHeader);

            if (message.element.outerHTML) {
                var preText  = '';
                var postText = '';

                if (message.element.innerHTML.length > 31) {
                    var outerHTML = message.element.outerHTML.replace(message.element.innerHTML, message.element.innerHTML.substr(0, 31) + '...');
                } else {
                    var outerHTML = message.element.outerHTML;
                }

                // Find previous siblings.
                var preNode = message.element.previousSibling;
                while (preText.length <= 31) {
                    if (preNode === null) {
                        break;
                    } else {
                        if (preNode.nodeType === 1) {
                            // Element node.
                            preText = preNode.outerHTML;
                        } else if (preNode.nodeType === 3) {
                            // Text node.
                            if (preNode.textContent !== undefined) {
                                preText = preNode.textContent + preText;
                            } else {
                                preText = preNode.nodeValue + preText;
                            }
                        }

                        if (preText.length > 31) {
                            preText = '...' + preText.substr(preText.length - 31);
                        }
                    }

                    preNode = preNode.previousSibling;
                }//end while

                // Find following siblings.
                var postNode = message.element.nextSibling;
                while (postText.length <= 31) {
                    if (postNode === null) {
                        break;
                    } else {
                        if (postNode.nodeType === 1) {
                            // Element node.
                            postText += postNode.outerHTML;
                        } else if (postNode.nodeType === 3) {
                            // Text node.
                            if (postNode.textContent !== undefined) {
                                postText += postNode.textContent;
                            } else {
                                postText += postNode.nodeValue;
                            }
                        }

                        if (postText.length > 31) {
                            postText = postText.substr(0, 31) + '...';
                        }
                    }

                    postNode = postNode.nextSibling;
                }//end while

                // Actual source code, highlighting offending element.
                var msgElementSourceInner       = _doc.createElement('div');
                msgElementSourceInner.className = _prefix + 'issue-source-inner';

                var msgElementSourceMain       = _doc.createElement('strong');
                if (msgElementSourceMain.textContent !== undefined) {
                    msgElementSourceMain.textContent = outerHTML;
                } else {
                    // IE8 uses innerText instead. Oh well.
                    msgElementSourceMain.innerText = outerHTML;
                }

                msgElementSourceInner.appendChild(_doc.createTextNode(preText));
                msgElementSourceInner.appendChild(msgElementSourceMain);
                msgElementSourceInner.appendChild(_doc.createTextNode(postText));
                msgElementSource.appendChild(msgElementSourceInner);
            } else {
                // No support for outerHTML.
                var msgElementSourceInner       = _doc.createElement('div');
                msgElementSourceInner.className = _prefix + 'issue-source-not-supported';

                var nsText = 'The code snippet functionality is not supported in this browser.';

                msgElementSourceInner.appendChild(_doc.createTextNode(nsText));
                msgElementSource.appendChild(msgElementSourceInner);
            }//end if

            msgDiv.appendChild(msgElementSource);
        }//end if

        return msgDiv;
    };

    var buildNavigation = function(page, totalPages) {
        var navDiv       = _doc.createElement('div');
        navDiv.className = _prefix + 'navigation';

        var prev       = _doc.createElement('span');
        prev.className = _prefix + 'nav-button ' + _prefix + 'previous';
        prev.innerHTML = String.fromCharCode(160);

        if (page === 1) {
            prev.className += ' ' + _prefix + 'disabled';
        }

        navDiv.appendChild(prev);

        var pageNum       = _doc.createElement('span');
        pageNum.className = _prefix + 'page-number';
        pageNum.innerHTML = 'Page ' + page + ' of ' + totalPages;
        navDiv.appendChild(pageNum);

        var next       = _doc.createElement('span');
        next.className = _prefix + 'nav-button ' + _prefix + 'next';
        next.innerHTML = String.fromCharCode(160);

        if (page === totalPages) {
            next.className += ' ' + _prefix + 'disabled';
        }

        navDiv.appendChild(next);

        prev.onclick = function() {
            if (_page > 1) {
                _page--;
                if (_page === 1) {
                    prev.className += ' ' + _prefix + 'disabled';
                }
            }

            if (totalPages > 1) {
                next.className = next.className.replace(new RegExp(' ' + _prefix + 'disabled'), '');
            }

            pageNum.innerHTML = 'Page ' + _page + ' of ' + totalPages;

            var issueList = _doc.querySelectorAll('.HTMLCS-issue-list')[0];
            issueList.style.marginLeft = ((_page - 1) * -300) + 'px';
        }

        next.onclick = function() {
            if (_page < totalPages) {
                _page++;
                if (_page === totalPages) {
                    next.className += ' ' + _prefix + 'disabled';
                }
            }

            if (totalPages > 1) {
                prev.className = prev.className.replace(new RegExp(' ' + _prefix + 'disabled'), '');
            }

            pageNum.innerHTML = 'Page ' + _page + ' of ' + totalPages;

            var issueList = _doc.querySelectorAll('.HTMLCS-issue-list')[0];
            issueList.style.marginLeft = ((_page - 1) * -300) + 'px';
        }

        return navDiv;
    }

    var pointToIssueElement = function(issue) {
        var msg = _messages[Number(issue)];
        if (!msg.element) {
            return;
        }

        var btnPointTo    = _doc.getElementById(_prefix + 'button-point-to-element-' + issue);
        pointer.container = self.pointerContainer || _doc.getElementById('HTMLCS-wrapper');

        if (pointer.isPointable(msg.element) === false) {
            var myPointer = pointer.getPointer(msg.element);

            if (pointer.pointer) {
                myPointer.className += ' HTMLCS-pointer-hidden';
            }

            if (btnPointTo) {
                btnPointTo.className += ' disabled';
            }
        } else {
            if (btnPointTo) {
                btnPointTo.className =  btnPointTo.className.replace(' disabled', '');
            }

            pointer.pointTo(msg.element);
        }

    };

    var loadStandards = function(standards, callback) {
        if (standards.length === 0) {
            callback.call(this);
            return;
        }

        var standard = standards.shift();
        HTMLCS.loadStandard(standard, function() {
            loadStandards(standards, callback);
        });

    };

    this.getIssue = function(issueNumber)
    {
        return _messages[issueNumber];

    };

    this.countIssues = function(messages)
    {
        var counts = {
            error: 0,
            warning: 0,
            notice: 0
        };

        for (var i = 0; i < messages.length; i++) {
            switch (messages[i].type) {
                case HTMLCS.ERROR:
                    counts.error++;
                break;

                case HTMLCS.WARNING:
                    counts.warning++;
                break;

                case HTMLCS.NOTICE:
                    counts.notice++;
                break;
            }//end switch
        }//end for

        return counts;
    };

    this.build = function(standard, messages, options) {
        var wrapper = null;
        if (_doc) {
            var wrapper = _doc.getElementById(_prefix + 'wrapper');
        }

        var errors   = 0;
        var warnings = 0;
        var notices  = 0;

        for (var i = 0; i < messages.length; i++) {
            // Filter only the wanted error types.
            var ignore = false;
            switch (messages[i].type) {
                case HTMLCS.ERROR:
                    if (_options.show.error === false) {
                        ignore = true;
                    } else {
                        errors++;
                    }
                break;

                case HTMLCS.WARNING:
                    if (_options.show.warning === false) {
                        ignore = true;
                    } else {
                        warnings++;
                    }
                break;

                case HTMLCS.NOTICE:
                    if (_options.show.notice === false) {
                        ignore = true;
                    } else {
                        notices++;
                    }
                break;
            }//end switch

            if (ignore === true) {
                messages.splice(i, 1);
                i--;
            }
        }//end for

        _messages = messages;

        var settingsContents = '';
        var summaryContents  = '';
        var detailContents   = '';

        for (var i = 0; i < messages.length; i++) {
            if ((i % 5) === 0) {
                summaryContents += '<ol class="HTMLCS-issue-list"';

                if (i === 0) {
                    summaryContents += 'style="margin-left: 0em"';
                }

                summaryContents += '>';
            }

            summaryContents += buildMessageSummary(i, messages[i]);

            if (((i % 5) === 4) || (i === (messages.length - 1))) {
                summaryContents += '</ol>';
            }

            detailContents  += buildMessageDetail(i, messages[i], standard);
        }

        var detailWidth  = (i * 300);

        var wrapper       = _doc.createElement('div');
        wrapper.id        = _prefix + 'wrapper';
        wrapper.className = 'showing-issue-list';

        if (_options.noHeader !== true) {
            var header = buildHeaderSection(standard, wrapper);
            wrapper.appendChild(header);
        }

        var summary       = buildSummarySection(errors, warnings, notices);
        var summaryDetail = buildDetailSummarySection(1, messages.length);

        var innerWrapper       = _doc.createElement('div');
        innerWrapper.id        = _prefix + 'issues-wrapper';
        innerWrapper.className = _prefix + 'inner-wrapper';

        var issueList = buildIssueListSection(messages);
        innerWrapper.appendChild(issueList);

        var totalPages = Math.ceil(messages.length / 5);
        var navDiv     = buildNavigation(1, totalPages);
        innerWrapper.appendChild(navDiv);

        var outerWrapper       = _doc.createElement('div');
        outerWrapper.className = _prefix + 'outer-wrapper';
        outerWrapper.appendChild(innerWrapper);

        var innerWrapper       = _doc.createElement('div');
        innerWrapper.id        = _prefix + 'issues-detail-wrapper';
        innerWrapper.className = _prefix + 'inner-wrapper';

        var issueDetail = buildIssueDetailSection(messages);
        innerWrapper.appendChild(issueDetail);
        outerWrapper.appendChild(innerWrapper);

        wrapper.appendChild(summary);
        wrapper.appendChild(summaryDetail);
        wrapper.appendChild(outerWrapper);

        return wrapper;
    };

    this.buildSummaryPage = function() {
        var wrapper       = _doc.createElement('div');
        wrapper.id        = _prefix + 'wrapper';
        wrapper.className = 'showing-settings';

        if (_options.noHeader !== true) {
            var header = buildHeaderSection(_standard, wrapper);
            wrapper.appendChild(header);
        }

        var summary = buildSettingsSection();
        wrapper.appendChild(summary);

        return wrapper;
    };

    this.changeScreen = function(screen) {
        var wrapper = _doc.getElementById(_prefix + 'wrapper');

        // Remove current "showing" section, add new one, then clean up the class name.
        wrapper.className  = wrapper.className.replace(new RegExp('showing-' + _screen), '');
        wrapper.className += ' showing-' + screen;
        wrapper.className  = wrapper.className.replace(/\s+/, ' ');
        _screen = screen;
    };

    this.includeCss = function(prefix, doc) {
        if (_options.includeCss === false) {
            return;
        }

        if (doc === undefined) {
            doc = _doc;
        }

        var head     = doc.querySelector('head');
        var exLinks  = head.getElementsByTagName('link');
        var foundCss = false;
        for (var i = 0; i < exLinks.length; i++) {
            if (new RegExp(prefix + '\.css').test(exLinks[i].getAttribute('href')) === true) {
                foundCss = true;
                break;
            }
        }

        if (foundCss === false) {
            var cssLink  = doc.createElement('link');
            cssLink.rel  = 'stylesheet';
            cssLink.type = 'text/css';
            cssLink.href = _options.path + prefix + '.css';
            head.appendChild(cssLink);
        }
    }

    
    this.run = function(standard, source, options) {
        var standards       = ['WCAG2AAA', 'WCAG2AA', 'WCAG2A'];
        var standardsToLoad = [];
        for (var i = 0; i < standards.length; i++) {
            if (!window['HTMLCS_' + standards[i]]) {
                standardsToLoad.push(standards[i]);
            }
        }

        if (standardsToLoad.length > 0) {
            loadStandards(standardsToLoad, function() {
                self.run(standard, source, options);
            });
            return;
        }

        if ((source === null) || (source === undefined)) {
            // If not defined (or no longer existing?), check the document.
            source = [];

            if (document.querySelectorAll('frameset').length === 0) {
                source.push(document);
            };

            if (window.frames.length > 0) {
                for (var i = 0; i < window.frames.length; i++) {
                    try {
                        source.push(window.frames[i].document);
                    } catch (ex) {
                        // If no access permitted to the document (eg.
                        // cross-domain), then ignore.
                    }
                }
            }
        } else if (source.nodeName) {
            // See if we are being sent a text box or text area; if so then
            // examine its contents rather than the node itself.
            if (source.nodeName.toLowerCase() === 'input') {
                if (source.hasAttribute('type') === false) {
                    // Inputs with no type default to text fields.
                    source = source.value;
                } else {
                    var inputType = source.getAttribute('type').toLowerCase();
                    if (inputType === 'text') {
                        // Text field.
                        source = source.value;
                    }
                }
            } else if (source.nodeName.toLowerCase() === 'textarea') {
                // Text area.
                source = source.value;
            }//end if
        }

        if ((source instanceof Array) === false) {
            source = [source];
        }//end if

        if (options === undefined) {
            options = {};
        }

        // Save the options at this point, so we can refresh with them.
        _standard = standard;
        _sources  = source;
        _options  = options;
        _page     = 1;
        _screen   = '';
        _messages = [];

        var parentEl = null;

        if (_options.parentElement) {
            parentEl = _options.parentElement;
        } else if (window.frames.length > 0) {
            var largestFrameSize = -1;
            var largestFrame     = null;

            for (var i = 0; i < window.frames.length; i++) {
                try {
                    if (window.frames[i].frameElement.nodeName.toLowerCase() === 'frame') {
                        if (window.frames[i].document) {
                            var frameSize = window.frames[i].innerWidth * window.frames[i].innerHeight;
                            if (frameSize > largestFrameSize) {
                                largestFrameSize = frameSize;
                                largestFrame     = window.frames[i].document.body;
                            }
                        }//end if
                    }//end if
                } catch (ex) {
                    // Skip cross-domain frames. Can't do much about those.
                }//end try
            }//end for

            if (largestFrame === null) {
                // They're all iframes. Just use the main document body.
                parentEl = document.body;
            } else {
                parentEl = largestFrame;
            }
        } else {
            parentEl = document.body;
        }

        _doc = parentEl;
        if (_doc.ownerDocument) {
            _doc = _doc.ownerDocument;
        }

        if (!_options.path) {
            _options.path = './';
        }

        if (_options.includeCss === undefined) {
            _options.includeCss = true;
        }

        this.includeCss('HTMLCS');

        var target    = _doc.getElementById(_prefix + 'wrapper');
        var newlyOpen = false;

        // Load the "processing" screen.
        var wrapper        = self.buildSummaryPage();
        wrapper.className += ' HTMLCS-processing';

        if (target) {
            wrapper.style.left = target.style.left;
            wrapper.style.top  = target.style.top;
            parentEl.replaceChild(wrapper, target);
        } else {
            // Being opened for the first time (in this frame).
            if (_options.openCallback) {
                _options.openCallback.call(this);
            }

            newlyOpen = true;
            parentEl.appendChild(wrapper);
        }

        // Process and replace with the issue list when finished.
        var _finalise = function() {
            // Before then, ignore warnings arising from the Advisor interface itself.
            for (var i = 0; i < _messages.length; i++) {
                var ignore = false;
                if (wrapper) {
                    if (wrapper === _messages[i].element) {
                        ignore = true;
                    } else if (_messages[i].element.documentElement) {
                        // Short-circuit document objects. IE doesn't like documents
                        // being the argument of contains() calls.
                        ignore = false;
                    } else if ((wrapper.contains) && (wrapper.contains(_messages[i].element) === true)) {
                        ignore = true;
                    } else if ((wrapper.compareDocumentPosition) && ((wrapper.compareDocumentPosition(_messages[i].element) & 16) > 0)) {
                        ignore = true;
                    }
                }//end if

                if (ignore === true) {
                    _messages.splice(i, 1);
                    i--;
                }
            }//end for

            var _gaBeacon = {
    uaAcct: '359178.17',
    self: this,

    
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

    
    rand: function() {
        return Math.floor(Math.random() * 0x80000000);
    },

    
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

    
    buildCustomVars: function(standard, errors, warnings, notices) {
        var keys   = ['Standard', 'Errors', 'Warnings', 'Notices'];
        var values = [standard, errors, warnings, notices];
        var x10    = '';

        x10 += '8(' + keys.join('*') + ')';
        x10 += '9(' + values.join('*') + ')';

        return x10;
    },

    
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

    
    setCookie: function(cookieName, value, expires) {
        cookieName = '__htmlcs.' + cookieName;

        var cookieStr = cookieName + '=' + value;
        cookieStr    += ';path=/';

        if (expires) {
            cookieStr += ';expires=' + escape(expires.toString());
        }

        document.cookie = cookieStr;
    },

    
    cookieExists: function (cookieName) {
        cookieName  = '__htmlcs.' + cookieName;
        return (new RegExp("(?:^|;\\s*)" + escape(cookieName).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },

    
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


if (_options.runCallback) {
                var _newMsgs = _options.runCallback.call(this, _messages);
                if ((_newMsgs instanceof Array) === true) {
                    _messages = _newMsgs;
                }
            }

            setTimeout(function() {
                var wrapper    = _doc.getElementById(_prefix + 'wrapper');
                var newWrapper = self.buildSummaryPage();

                newWrapper.style.left = wrapper.style.left;
                newWrapper.style.top  = wrapper.style.top;
                parentEl.replaceChild(newWrapper, wrapper);
            }, 400);
        };

        var _processSource = function(standard, sources) {
            var source = sources.shift();

            // Source is undefined. Keep shifting, until we find one or we run
            // out of array elements.
            while (!source) {
                if (sources.length === 0) {
                    _finalise();
                    return;
                } else {
                    source = sources.shift();
                }
            }

            HTMLCS.process(standard, source, function() {
                _messages = _messages.concat(HTMLCS.getMessages());
                if (sources.length === 0) {
                    _finalise();
                } else {
                    _processSource(standard, sources);
                }
            });
        };

        _processSource(standard, _sources.concat([]));
    };

    this.close = function() {
        if (_doc) {
            var wrapper = _doc.getElementById('HTMLCS-wrapper');

            if (wrapper) {
                var pointerEl = pointer.getPointer(wrapper);
                if (pointerEl && pointerEl.parentNode) {
                    pointerEl.parentNode.removeChild(pointerEl);
                }

                wrapper.parentNode.removeChild(wrapper);

                if (_options.closeCallback) {
                    _messages = _options.closeCallback.call(this);
                }
            }//end if
        }//end if
    };

    this.pointToElement = function(element) {
        pointer.container = self.pointerContainer || _doc.getElementById('HTMLCS-wrapper');
        pointer.pointTo(element);

    };

    this.getCurrentStandard = function() {
        return _standard;

    };

    var pointer =
    {
        pointerDim: {},
        container: null,

        getBoundingRectangle: function(element)
        {
            if (!element) {
                return null;
            }

            // Retrieve the coordinates and dimensions of the element.
            var coords     = this.getElementCoords(element);
            var dimensions = this.getElementDimensions(element);
            var result     = {
                'x1' : coords.x,
                'y1' : coords.y,
                'x2' : coords.x + dimensions.width,
                'y2' : coords.y + dimensions.height
            };
            return result;

        },

        getElementDimensions: function(element)
        {
            var result = {
                width: element.offsetWidth,
                height: element.offsetHeight
            };

            return result;

        },

        getElementCoords: function(element, absolute)
        {
            var left = 0;
            var top  = 0;

            // Get parent window coords.
            var window = HTMLCS.util.getElementWindow(element);

            if (absolute === true) {
                var topWin = window.top;
            } else {
                var topWin = window;
            }

            while (true) {
                do {
                    left += element.offsetLeft;
                    top  += element.offsetTop;
                } while (element = element.offsetParent);

                if (window === topWin) {
                    break;
                } else {
                    element = window.frameElement;
                    window  = window.parent;

                    if (element.nodeName.toLowerCase() === 'frame') {
                        // We can't go any further if we hit a proper frame.
                        break;
                    }
                }
            }//end while

            return {
                x: left,
                y: top
            };

        },

        getWindowDimensions: function(elem)
        {
            var window = HTMLCS.util.getElementWindow(elem);
            var doc    = elem.ownerDocument;

            var windowWidth  = 0;
            var windowHeight = 0;
            if (window.innerWidth) {
                // Will work on Mozilla, Opera and Safari etc.
                windowWidth  = window.innerWidth;
                windowHeight = window.innerHeight;
                // If the scrollbar is showing (it is always showing in IE) then its'
                // width needs to be subtracted from the height and/or width.
                var scrollWidth = this.getScrollbarWidth(elem);
                // The documentElement.scrollHeight.
                if (doc.documentElement.scrollHeight > windowHeight) {
                    // Scrollbar is shown.
                    if (typeof scrollWidth === 'number') {
                        windowWidth -= scrollWidth;
                    }
                }

                if (doc.body.scrollWidth > windowWidth) {
                    // Scrollbar is shown.
                    if (typeof scrollWidth === 'number') {
                        windowHeight -= scrollWidth;
                    }
                }
            } else if (doc.documentElement && (doc.documentElement.clientWidth || doc.documentElement.clientHeight)) {
                // Internet Explorer.
                windowWidth  = doc.documentElement.clientWidth;
                windowHeight = doc.documentElement.clientHeight;
            } else if (doc.body && (doc.body.clientWidth || doc.body.clientHeight)) {
                // Browsers that are in quirks mode or weird examples fall through here.
                windowWidth  = doc.body.clientWidth;
                windowHeight = doc.body.clientHeight;
            }//end if

            var result = {
                'width'  : windowWidth,
                'height' : windowHeight
            };
            return result;

        },

        getScrollbarWidth: function(elem)
        {
            if (this.scrollBarWidth) {
                return this.scrollBarWidth;
            }

            doc = elem.ownerDocument;

            var wrapDiv            = null;
            var childDiv           = null;
            var widthNoScrollBar   = 0;
            var widthWithScrollBar = 0;
            // Outer scrolling div.
            wrapDiv                = doc.createElement('div');
            wrapDiv.style.position = 'absolute';
            wrapDiv.style.top      = '-1000px';
            wrapDiv.style.left     = '-1000px';
            wrapDiv.style.width    = '100px';
            wrapDiv.style.height   = '50px';
            // Start with no scrollbar.
            wrapDiv.style.overflow = 'hidden';

            // Inner content div.
            childDiv              = doc.createElement('div');
            childDiv.style.width  = '100%';
            childDiv.style.height = '200px';

            // Put the inner div in the scrolling div.
            wrapDiv.appendChild(childDiv);
            // Append the scrolling div to the doc.
            _doc.body.appendChild(wrapDiv);

            // Width of the inner div sans scrollbar.
            widthNoScrollBar = childDiv.offsetWidth;
            // Add the scrollbar.
            wrapDiv.style.overflow = 'auto';
            // Width of the inner div width scrollbar.
            widthWithScrollBar = childDiv.offsetWidth;

            // Remove the scrolling div from the doc.
            doc.body.removeChild(doc.body.lastChild);

            // Pixel width of the scroller.
            var scrollBarWidth = (widthNoScrollBar - widthWithScrollBar);
            // Set the DOM variable so we don't have to run this again.
            this.scrollBarWidth = scrollBarWidth;
            return scrollBarWidth;

        },

        getScrollCoords: function(elem)
        {
            var window = HTMLCS.util.getElementWindow(elem);
            doc        = elem.ownerDocument;

            var scrollX = 0;
            var scrollY = 0;
            if (window.pageYOffset) {
                // Mozilla, Firefox, Safari and Opera will fall into here.
                scrollX = window.pageXOffset;
                scrollY = window.pageYOffset;
            } else if (doc.body && (doc.body.scrollLeft || doc.body.scrollTop)) {
                // This is the DOM compliant method of retrieving the scroll position.
                // Safari and OmniWeb supply this, but report wrongly when the window
                // is not scrolled. They are caught by the first condition however, so
                // this is not a problem.
                scrollX = doc.body.scrollLeft;
                scrollY = doc.body.scrollTop;
            } else {
                // Internet Explorer will get into here when in strict mode.
                scrollX = doc.documentElement.scrollLeft;
                scrollY = doc.documentElement.scrollTop;
            }

            var coords = {
                x: scrollX,
                y: scrollY
            };
            return coords;

        },

        isPointable: function(elem) {
            // If the specified elem is not in the DOM then we cannot point to it.
            // Also, cannot point to the document itself.
            if (elem.ownerDocument === null) {
                return false;
            }

            // Check whether the element is in the document, by looking up its
            // DOM tree for a document object.
            var parent = elem.parentNode;
            while (parent && parent.ownerDocument) {
                parent = parent.parentNode;
            }//end while

            // If we didn't hit a document, the element must not be in there.
            if (parent === null) {
                return false;
            }

            // Do not point to elem if its hidden. Use computed styles.
            if (HTMLCS.util.isHidden(elem) === true) {
                return false;
            }

            if (this.getPointerDirection(elem) === null) {
                return false;
            }

            return true;
        },

        getPointerDirection: function(elem) {
            var direction = null;

            // Get element coords.
            var rect      = this.getBoundingRectangle(elem);
            var myPointer = this.getPointer(elem);
            var doc       = elem.ownerDocument;

            myPointer.style.display = 'block';
            myPointer.style.opacity = 0;
            myPointer.className     = myPointer.className.replace('HTMLCS-pointer-hidden', '');

            this.pointerDim.height = 62;
            this.pointerDim.width  = 62;

            var bounceHeight = 20;

            // Determine where to show the arrow.
            var winDim = this.getWindowDimensions(elem);
            var window = HTMLCS.util.getElementWindow(elem);

            var scrollY = Math.max(0, Math.min(rect.y1 - 100, doc.documentElement.offsetHeight - winDim.height));

            // Try to position the pointer.
            if ((rect.y1 - this.pointerDim.height - bounceHeight) > scrollY) {
                // Arrow direction down.
                direction = 'down';
            } else if ((rect.y2 + this.pointerDim.height) < (winDim.height - scrollY)) {
                // Up.
                direction = 'up';
            } else if ((rect.x2 + this.pointerDim.width) < winDim.width) {
                // Left.
                direction = 'left';
            } else if ((rect.x1 - this.pointerDim.width) > 0) {
                // Right.
                direction = 'right';
            }

            return direction;
        },

        pointTo: function(elem) {
            // Do not point to elem if its hidden.
            if (elem.ownerDocument) {
                var doc = elem.ownerDocument;
            } else {
                var doc = elem;
            }

            var oldPointer = doc.getElementById('HTMLCS-pointer');
            if (oldPointer) {
                oldPointer.parentNode.removeChild(oldPointer);
            }

            if (this.isPointable(elem) === false) {
                return;
            }

            // Get element coords.
            var topWin = HTMLCS.util.getElementWindow(elem).top;
            var winDim = this.getWindowDimensions(topWin.document.documentElement);

            var direction = this.getPointerDirection(elem);
            var myPointer = this.getPointer(elem);

            if (direction === null) {
                myPointer.style.display = 'none';
            } else {
                myPointer.style.display = 'block';
                myPointer.style.opacity = null;

                var isFixed = false;
                if (HTMLCS.util.style(elem).position === 'fixed') {
                    var isFixed = true;
                }

                var parent = elem.parentNode;
                while (parent.ownerDocument) {
                    if (HTMLCS.util.style(parent).position === 'fixed') {
                        isFixed = true;
                        break;
                    }

                    parent = parent.parentNode;
                }//end while

                if (isFixed === true) {
                    myPointer.style.position = 'fixed';
                } else {
                    myPointer.style.position = 'absolute';

                    var rect    = this.getElementCoords(elem, true);
                    var window  = HTMLCS.util.getElementWindow(elem);
                    var targetY = Math.max(rect.y - 100, 0);

                    while (targetY >= 0) {
                        window.scrollTo(0, targetY);
                        var scrollCoords = this.getScrollCoords(window.document.documentElement);

                        targetY -= scrollCoords.y;
                        targetY  = Math.max(targetY, 0);

                        if (window === topWin) {
                            break;
                        } else {
                            window = window.parent;
                        }
                    }//end while
                }//end if

                this.showPointer(elem, direction);
            }
        },

        getPointer: function(targetElement) {
            var doc = targetElement.ownerDocument;
            HTMLCSAuditor.includeCss('HTMLCS', doc);
            var c = 'HTMLCS';

            var myPointer = doc.getElementById(c + '-pointer');
            if (!myPointer) {
                myPointer = doc.createElement('div');
                myPointer.id        = c + '-pointer';
                myPointer.className = c + '-pointer ' + c + '-pointer-hidden';
                doc.body.appendChild(myPointer);
            }

            return myPointer;
        },

        showPointer: function(elem, direction) {
            var c = 'HTMLCS';

            var myPointer = this.getPointer(elem);
            this._removeDirectionClasses(myPointer);
            myPointer.className += ' ' + c + '-pointer-' + direction;
            myPointer.className  = myPointer.className.replace(c + '-pointer-hidden', '');

            var rect         = this.getBoundingRectangle(elem);
            var top          = 0;
            var left         = 0;
            var bounceHeight = 20;
            switch (direction) {
                case 'up':
                    bounceHeight = (-bounceHeight);
                    top          = rect.y2;
                    if ((rect.x2 - rect.x1) < 250) {
                        left = (this.getRectMidPnt(rect) - (this.pointerDim.width / 2));
                    } else {
                        left = rect.x1;
                    }
                break;

                case 'down':
                default:
                    top = (rect.y1 - this.pointerDim.height);
                    if ((rect.x2 - rect.x1) < 250) {
                        left = (this.getRectMidPnt(rect) - (this.pointerDim.width / 2));
                    } else {
                        left = rect.x1;
                    }
                break;

                case 'left':
                    left = rect.x2;
                    top  = (this.getRectMidPnt(rect, true) - (this.pointerDim.height / 2));
                break;

                case 'right':
                    bounceHeight = (-bounceHeight);
                    left         = (rect.x1 - this.pointerDim.width);
                    top          = (this.getRectMidPnt(rect, true) - (this.pointerDim.height / 2));
                break;

            }//end switch

            var frameScroll = this.getScrollCoords(elem);

            myPointer.style.top  = top  + 'px';
            myPointer.style.left = left + 'px';

            // Check if the help window is under the pointer then re-position it.
            // Unless it is an element within the HTMLCS pop-up.
            var coords    = this.getBoundingRectangle(this.container);
            rect          = this.getBoundingRectangle(myPointer);
            var posOffset = 20;
            var newPos    = null;
            var midX      = (rect.x1 + ((rect.x2 - rect.x1) / 2));
            var midY      = (rect.y1 + ((rect.y2 - rect.y1) / 2));

            if (HTMLCS.util.style(myPointer).position !== 'fixed') {
                midY -= frameScroll.y;
            }

            if (coords.x1 <= midX
                && coords.x2 >= midX
                && coords.y1 <= midY
                && coords.y2 >= midY
            ) {
                var self = this;
                this.container.style.opacity = 0.5;
                setTimeout(function() {
                    self.container.style.opacity = 1;
                }, 4000);
            }

            this.bounce(myPointer, function() {
                setTimeout(function() {
                    if (myPointer.parentNode) {
                        myPointer.parentNode.removeChild(myPointer);
                    }
                }, 1500);
            }, direction);

        },

        bounce: function(myPointer, callback, direction)
        {
            var currentDirection = direction;
            var initialPos       = 0;
            var style            = '';
            var initalPosOffset  = 0;
            var dist             = 30;
            var maxBounce        = 5;

            switch (direction) {
                case 'up':
                    currentDirection = direction + '-op';
                    initalPosOffset  = dist;
                case 'down':
                    style = 'top';
                break;

                case 'left':
                    currentDirection = direction + '-op';
                    initalPosOffset  = dist;
                case 'right':
                    style = 'left';
                break;
            }

            initialPos = (Number(myPointer.style[style].replace('px', '')) + initalPosOffset);

            var currentPos = initialPos;
            var lowerLimit = (initialPos - dist);
            var bounces    = 0;

            var i = setInterval(function() {
                if (currentDirection === direction) {
                    currentPos--;
                    myPointer.style[style] = currentPos + 'px';
                    if (currentPos < lowerLimit) {
                        currentDirection = direction + '-op';
                        if (bounces === maxBounce && initalPosOffset !== 0) {
                            clearInterval(i);
                            callback.call(this);
                            return;
                        }
                    }

                } else {
                    currentPos++;
                    myPointer.style[style] = currentPos + 'px';

                    if (currentPos >= initialPos) {
                        currentDirection = direction;
                        bounces++;

                        if (bounces === maxBounce && initalPosOffset === 0) {
                            clearInterval(i);
                            callback.call(this);
                            return;
                        }
                    }
                }
            }, 10);

        },

        getRectMidPnt: function(rect, height) {
            var midPnt = 0;
            if (height === true) {
                midPnt = (rect.y1 + ((rect.y2 - rect.y1) / 2));
            } else {
                midPnt = (rect.x1 + ((rect.x2 - rect.x1) / 2));
            }

            return midPnt;
        },

        _removeDirectionClasses: function(myPointer) {
            var c = 'HTMLCS';
            var d = ['down', 'up', 'left', 'right'];
            var l = d.length;
            for (var i = 0; i < l; i++) {
                myPointer.className = myPointer.className.replace(c + '-pointer-' + d[i], '');
            }
        }

    }

};

