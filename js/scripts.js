$(document).ready(function () {
    $(".mask").css({
        "height": ($(".item-gallery").height() - $(".title-on-item").height()) + "px"
    });
    $(".item-gallery").css({
        "height": $(".item-gallery").width() + "px"
    });

    $('.circular-menu li').each(function (index) {
    $(this).find('a').prepend(index + 1 + '. ');
        }); 
    $('.circular-menu li').removeClass('focus');
    $('.circular-menu li').on('click', function () {
        $('.circular-menu li').removeClass('focus');
        $(this).addClass('focus');
        return false;
    });
    $('.modal-menu-container').removeClass('page-current');
    $(".circular-menu li").click(function () {
        $('.modal-menu-container').fadeOut(0);
        var target = $(this).find("a").attr("href");
        $('.page-current').add(target).fadeIn(700);
    });
    $('.choose-block').removeClass('active');
    $('.choose-block').on('click', function () {
        $('.choose-block').removeClass('active');
        $(this).addClass('active');
    });
    function showCircles(currentProj) {
        var radius = 170;       
        var fields = $(currentProj + ' .field'),
            width = $(currentProj).width(),
            height = $(currentProj).height();
        var angle = 0,
            step = (2 * Math.PI) / 6;
        if (fields.length > 6) {
            width = 750;      
            height = 750;       
        }
        fields.each(function (index) {
            if (index > 5) {
                radius = 350;
                $(currentProj).addClass("double-circle");
            } else if (index > 11) {
                $(this).remove();
            }
            if (($(window).width() > 992)) {
                var x = Math.round(width / 2 + radius * Math.cos(angle) - $(this).width() / 2);
                var y = Math.round(height / 2 + radius * Math.sin(angle) - $(this).height() / 2);
                $(this).css({
                    left: x,
                    top: y                  
                });
                angle += step;
            }
        });
    }
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        if ($($(e.target).attr('href') + ' .container-proj .field').length > 0) {

            showCircles($(e.target).attr('href') + ' .container-proj');
        }
    });
    $('.modal-menu-container').removeClass('page-current');
    $(".container-proj > a").click(function () {
        $('.modal-menu-container').fadeOut(0);
        var target = $(this).attr("href");
        $('.page-current').add(target).fadeIn(700);
        return false;
    });

    $('.circular-menu').circleMenu({
        widthOfFirstCircle: 250,
        heightOfLine: 150,
        defaultBackground: 'eee',
        firstColor: 'afafaf',
        secondColor: 'b4b4b4',
        activeColor: 'aaaaaa',
        boxShadow: '5px 5px 20px rgba(0,0,0,.5)',
        beginAngle: 0
      });

      function recalcHeightOnMobile() {
        if ($(window).width() < 993) {
            $('.circular-menu-wrapper').css({
                "height": $('.circular-menu-wrapper').height() / 2 + 'px'
                
            });
        }
    }
    recalcHeightOnMobile();

    var devider = 1;
        if ($(window).width() < 993) {
            devider = 2;
        } else {
            devider = 1;
        }
        $(".scrollTo").on('click', function (e) {
            e.preventDefault();
            var current = $(this).parent();
            $('html, body').animate({
                scrollTop: current.offset().top + current.outerHeight() / devider
            }, 300);
        });
        $(".nav-tabs li a").on("touchstart", function () {
            $(this).trigger('click');
        });
});