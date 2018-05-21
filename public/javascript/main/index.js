console.log('LOADED: javascript/index.js');
// Sets rellax
var rellax = new Rellax('.rellax', {

});

$(document).ready(function () {
    $("a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 1200, 'easeInOutSine', function () {
                window.location.hash = hash;
            });
        } // End if
    });
})



