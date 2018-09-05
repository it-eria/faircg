$( document ).ready(function() {
    $(".mask").css({
        "height": ($(".item-gallery").height() - $(".title-on-item").height()) + "px"
    });
    $(".item-gallery").css({
        "height": $(".item-gallery").width() + "px"
    });
    //MENU CIRCULAR
    $.fn.rotationDegrees = function () {
        var matrix = this.css("-webkit-transform") ||
            this.css("-moz-transform")    ||
            this.css("-ms-transform")     ||
            this.css("-o-transform")      ||
            this.css("transform");
        if(typeof matrix === 'string' && matrix !== 'none') {
            var values = matrix.split('(')[1].split(')')[0].split(',');
            var a = values[0];
            var b = values[1];
            var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
        } else { var angle = 0; }
        return angle;
    };

    var sizeOfFirst = 110;
    var heightOfLine = 30;
    var menuSize = $('.circular-menu li').length * heightOfLine * 4 + sizeOfFirst;
    var zIndex = 1;
    var color1 = 'A2C2E0';
    var color2 = '9BBEDD';
    var colorDiff = parseInt(color2, 16) - parseInt(color1, 16);
    var startRadius = 9 * $('.circular-menu li').length;
    var step = startRadius / $('.circular-menu li').length - 1;

    $('.circular-menu').css({
        "width": menuSize + 'px',
        "height": menuSize + 'px'
    });

    function generateSVG(prependTo, bg, value, currentRotate) {
        var radius = parseFloat(prependTo.width())/2 - 30;
        var size = parseFloat(prependTo.width());
        var circleLength = 2 * Math.PI * radius;
        var progress = value / 100;
        var dashoffset = circleLength * (1 - progress);
        var svgObj = '<svg version="1.1" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="progress" width="'+size+'" height="'+size+'" viewBox="0 0 '+size+' '+size+'" style="transform: rotate(-'+ currentRotate +'deg);"><circle class="progress__value" cx="'+size/2+'" cy="'+size/2+'" r="'+(size/2 - heightOfLine - 16)+'" stroke-width="'+(heightOfLine + 64) +'" stroke="'+bg+'" style="stroke-dasharray: '+circleLength+'; stroke-dashoffset: '+dashoffset+';"/></svg>';
        prependTo.prepend(svgObj);
    }

    $('.circular-menu li').each(function(index) {
        $(this).find('a').css({
            'top': heightOfLine
        });
        $(this).find('a').prepend(index+1+'. ');
        $(this).css({
            "width": heightOfLine * 4 * ($('.circular-menu li').length - index) + sizeOfFirst,
            "height": heightOfLine * 4 * ($('.circular-menu li').length - index) + sizeOfFirst,
            "z-index": zIndex
        });
        var currentRadius = parseFloat($(this).width()/2.8);
        var l = $(this).find('a').width();
        var angle = (parseFloat(l)*360)/(2*Math.PI*currentRadius);
        $(this).css({
            'transform': 'translate(-50%, -50%) rotate3d(0, 0, 1, '+angle/2+'deg)'
        });
        $(this).find('a').arctext({radius: currentRadius});
        if(index != $('.circular-menu li').length -1) {
            generateSVG($(this), '#'+color1, startRadius, 90 + angle/2);
        }
        color1 = (parseInt(color1, 16) - colorDiff).toString(16);
        ++zIndex;
        startRadius -= step;
    });
    $('.circular-menu li').css({
        'transition': 'all .3s ease-in-out'
    });
    $('.circular-menu li').removeClass('focus');
    $('.circular-menu li').on('click', function(){
        $('.circular-menu li').removeClass('focus');
        $(this).addClass('focus');
        return false;
    });
    $('.modal-menu-container').removeClass('page-current');
    $(".circular-menu li").click(function() {
        $('.modal-menu-container').fadeOut(0);
        var target = $(this).find("a").attr("href");
        $('.page-current').add(target).fadeIn(700);
    });
    $('.choose-block').removeClass('active');
    $('.choose-block').on('click', function(){
        $('.choose-block').removeClass('active');
        $(this).addClass('active');
    });
       function showCircles(currentProj) {
           var radius = ($(window).height() > 760) ? 170 : 100;
           var fields = $(currentProj + ' .field'),
               width = $(currentProj).width(),
               height = $(currentProj).height();
           var angle = 0,
               step = (2*Math.PI) / 6;
           if(fields.length > 6) {
               width = ($(window).height() > 760) ? 750 : 450;
               height = ($(window).height() > 760) ? 750 : 450;
           }
           fields.each(function(index) {
               if(index > 5) {
                   radius = ($(window).height() > 760) ? 350 : 220;
                   $(currentProj).addClass("double-circle");
               } else if(index > 11) {
                   $(this).remove();
               }
               if(($(window).width() > 992)) {
                   var x = Math.round(width/2 + radius * Math.cos(angle) - $(this).width()/2);
                   var y = Math.round(height/2 + radius * Math.sin(angle) - $(this).height()/2);
                   $(this).css({
                       left: ($(window).height() > 760) ? 'calc('+ (x - 10) +'px)' : 'calc('+ (x - 10) +'px)',
                       top: ($(window).height() > 760) ? 'calc('+ (y - 10) +'px)' : 'calc('+ (y - 10) +'px)'
                   });
                   angle += step;
               }
           });
       }
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        if($($(e.target).attr('href') + ' .container-proj .field').length > 0) {
            $('.circular-projects').css({
                "height": "100vh"
            });
            showCircles($(e.target).attr('href') + ' .container-proj');
        } else {
            $('.circular-projects').css({
                "height": "auto"
            });
        }
    });
    $('.modal-menu-container').removeClass('page-current');
    $(".container-proj > a").click(function() {
        $('.modal-menu-container').fadeOut(0);
        var target = $(this).attr("href");
        $('.page-current').add(target).fadeIn(700);
        return false;
    });
    calculateNewScale();
    $(window).resize(function ()
    {
        calculateNewScale();
    });
    function calculateNewScale() {
        var percentageOn1 = ($(".service-height").height()) / ($(".circular-menu").height() + 50);
        $(".circular-menu").css(
            {
                "-moz-transform": "scale("+percentageOn1 +")",
                "-webkit-transform": "scale("+percentageOn1 +")",
                "transform": "scale("+percentageOn1 +")"
            });
        }
    $( ".nav-tabs li a" ).on("click", function(){
        $(".circular-projects").css({
            "height":"100vh"
        });
    });
    function recalcHeightOnMobile() {
        $('.circular-menu-wrapper').css({
            "height": 'auto'
        });
        if($(window).width() < 993) {
            $('.circular-menu-wrapper').css({
                "height": $('.circular-menu-wrapper').height() / 2 + 'px'
            });
        }
    }
    recalcHeightOnMobile();
    $( window ).on('resize', function() {
        recalcHeightOnMobile();
    });
    if($(window).width() < 993) {
        $('.service-height').removeClass('container');
    }
    
});