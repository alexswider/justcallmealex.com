var pickedQuestions = [];
var questions;
var currentQuestion = 0;
var chances;
var unitTime;
var timer;
var img;

$(document).ready(function() {
        loadPartial(START_PAGE);
//     if(window.location.hash === "#tumblr") {
//         return loadPartial(TUMBLR_PAGE);
//     }
//     if(getCookie("visited") != 1) {
//         loadPartial(TRAILER_PAGE);
//         setCookie("visited", 1, 365);
//     } else {
//         loadPartial(START_PAGE);
//     }
// //    $(window).on("hashchange", function() {
//        if(window.location.hash === "#tumblr") {
//            loadPartial(TUMBLR_PAGE);
//        }
//    });
});

function loadPartial(partial) {
   /// console.log("partial !!");
    switch(partial){
        case START_PAGE:
          $("#container").load(partial,startAnim);
        break;
       
    }
    CURRENT_PAGE = partial;
    //ANIMATION BASED  ON  STAGE
    //TweenMax.fromTo("#container", 1.9, {autoAlpha: 0}, {autoAlpha: 1});
}
 
function backHome() {
    loadPartial(START_PAGE);
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
