
/*animation  out */

function animateOut(current,partialTo){
    moveBg(partialTo);
    switch(current){
        case START_PAGE:
            TweenMax.to($('#faces-bg'),2,{x:"-=1500",ease:Expo.easeIn});
        break;
    }
    //loadPartial(partialTo);
} 

function moveBg(partial){
    console.log('moveBg:to:'+partial);
    switch(partial){
        case START_PAGE:
        console.log('twenBg'+partial);
            TweenMax.to($('#container'),3,{backgroundPosition:'0px bottom',ease:Expo.easeOut } );
        break;
    }
}

function startAnim(){
    console.log("startAnim");
    var $box = $('.faces-bg');
    var $f1 = $('#f1');
    var $f2 = $('#f2');
    var $f3 = $('#f3');

    TweenMax.from($box, 3, {
        autoAlpha:0,
        ease:Expo.easeOut
    });
    //tween faces 
    TweenMax.staggerFrom(".f", 2, {x:'-=1150',  delay:2.5, ease:Expo.easeOut, force3D:true}, 0.6);

  var $box1 = $('.title-bar');
    TweenMax.from($box1, 2, {
        scaleY: 0.1, // Tween to the current x value minus 50
        autoAlpha:0,
        delay:1,
        ease:Expo.easeOut
    });
}


