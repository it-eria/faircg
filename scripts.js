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

var sizeOfFirst = 210;
var heightOfLine = 30;
var menuSize = $('.circular-menu li').length * heightOfLine * 4 + sizeOfFirst;
var zIndex = 1;
var color1 = '3d649a';
var colorDiff = 329741;
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
    var svgObj = '<svg class="progress" width="'+size+'" height="'+size+'" viewBox="0 0 '+size+' '+size+'" style="transform: rotate(-'+ currentRotate +'deg);"><circle class="progress__value" cx="'+size/2+'" cy="'+size/2+'" r="'+(size/2 - heightOfLine - 16)+'" stroke-width="'+(heightOfLine + 64) +'" stroke="'+bg+'" style="stroke-dasharray: '+circleLength+'; stroke-dashoffset: '+dashoffset+';"/></svg>';
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
    var currentRadius = parseFloat($(this).width())/2;
    var l = $(this).find('a').width();
    var angle = (parseFloat(l)*360)/(2*Math.PI*currentRadius);
    $(this).css({
        'transform': 'translate(-50%, -50%) rotate('+angle/2+'deg)'
    });
    $(this).find('a').arctext({radius:  currentRadius});
    if(index != $('.circular-menu li').length -1) {
        generateSVG($(this), '#'+color1, startRadius, 90 + angle/2);
    }
    color1 = (parseInt(color1, 16) - colorDiff).toString(16)
    ++zIndex;
    startRadius -= step;
});

$('.circular-menu li').css({
    'transition': 'all .3s ease-in-out'
});

$('.circular-menu li').on('click', function(){
    $('.circular-menu li').removeClass('focus');
    $(this).addClass('focus');
    return false;
});

$('.modal-menu-container').removeClass('page-current');
$(".circular-menu li a").click(function() {
    $('.modal-menu-container').fadeOut(0);

    var target = $(this).attr("href");
    $('.page-current').add(target).fadeIn(700);
    return false;
});