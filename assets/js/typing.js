var captionLength = 0;
var caption = '';
var erased = 0;


$(document).ready(function() {
    setInterval ('cursorAnimation()', 600);
    captionEl = $('#caption');

    testTypingEffect();

});

function testTypingEffect() {
    //caption = $('input#user-caption').val();
    caption = "Hello... Welcome to my personal website";
    type();
}

function type() {
    captionEl.html(caption.substr(0, captionLength++));
    if(captionLength < caption.length+1) {
        setTimeout('type()', 150);
        if (captionLength == 130){
          captionLength = 22;
        }
        if (captionLength == 240){
          captionLength = 30;
        }
    } else {
        captionLength = 0;
        caption = '';
    }
}
function cursorAnimation() {
    $('#cursor').animate({
        opacity: 0
    }, 'fast', 'swing').animate({
        opacity: 1
    }, 'fast', 'swing');
}
