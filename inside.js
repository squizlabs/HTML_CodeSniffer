window.onload = function() {
    // Set the back-to-top div to appear only when a certain amount of pixels down.
    var topDiv = document.getElementById('back-to-top');
    window.onscroll = function() {
        var offset = window.pageYOffset || document.documentElement.scrollTop;

        if (offset >= 200) {
            topDiv.className = 'on';
        } else {
            topDiv.className = 'off';
        }
    }

    window.onscroll();
}
