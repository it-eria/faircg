$.fn.circleMenu = function(options) {
  var current = this;

  var defaults = {
    widthOfFirstCircle: 110,
    heightOfLine: 57,
    defaultBackground: 'transparent',
    firstColor: 'afafaf',
    secondColor: 'b4b4b4',
    activeColor: 'aaaaaa',
    boxShadow: '3px 3px 15px rgba(0,0,0,.3)',
    beginAngle: 0
  }
  var settings = $.extend({
    widthOfFirstCircle: defaults.widthOfFirstCircle,
    heightOfLine: defaults.heightOfLine,
    defaultBackground: defaults.defaultBackground,
    firstColor: defaults.firstColor,
    secondColor: defaults.secondColor,
    boxShadow: defaults.boxShadow,
    activeColor: defaults.activeColor,
    beginAngle: defaults.beginAngle
  }, options );

  var widthOfFirstCircle = defaults.widthOfFirstCircle;
  var heightOfLine = defaults.heightOfLine;
  var defaultBackground = defaults.defaultBackground;
  var firstColor = defaults.firstColor;
  var secondColor = defaults.secondColor;
  var boxShadow = defaults.boxShadow;
  var activeColor = defaults.activeColor;
  var beginAngle = defaults.beginAngle;
  var textAtCenter = this.attr('data-text-at-center') || '';

  if(!!options) {
    !!options.widthOfFirstCircle ? widthOfFirstCircle = options.widthOfFirstCircle : null;
    !!options.heightOfLine ? heightOfLine = options.heightOfLine : null;
    !!options.defaultBackground ? defaultBackground = options.defaultBackground : null;
    !!options.firstColor ? firstColor = options.firstColor : null;
    !!options.secondColor ? secondColor = options.secondColor : null;
    !!options.boxShadow ? boxShadow = options.boxShadow : null;
    !!options.activeColor ? activeColor = options.activeColor : null;
    !!options.beginAngle ? beginAngle = options.beginAngle - 90 : null;
  }

  var colorDiff = parseInt(firstColor, 16) - parseInt(secondColor, 16);
  var color = firstColor;
  var colors = [];
  var step = parseFloat(current.find('li a').css('font-size')) / 1.4;
  var angleFirst = 0;

  var heightOfMenu = current.children('li').length * heightOfLine + widthOfFirstCircle;

  current.addClass('circleMenu circleMenu--init');
  current.append($('<li style="display: flex; width: '+ widthOfFirstCircle +'px; height: '+ widthOfFirstCircle +'px; justify-content: center; align-items: center; background-color: #'+ defaultBackground +';">'+textAtCenter+'</li>'));

  current.css({
    'width': heightOfMenu + 'px',
    'height': heightOfMenu + 'px'
  });

  function generateSVG(prependTo, radius, bg, value) {
    var size = radius * 2 + heightOfLine;
    var circleLength = 2 * Math.PI * radius;
    var dashoffset = value * circleLength / 360;

    var svgObj = '<svg version="1.1" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="progress" width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '"><circle class="progress__value" cx="' + size/2 + '" cy="' + size/2 + '" r="' + radius + '" stroke-width="' + heightOfLine + '" stroke="' + bg + '" style="stroke-dasharray: ' + circleLength + '; stroke-dashoffset: ' + -1*(dashoffset - circleLength/1.5) + ';"/></svg>';

    prependTo.prepend(svgObj);
  }

  function getCurrentCharWidth(char, fontSize) {
    var elementWidth = fontSize/2;
    if(char != ' ') {
      $('body').append('<span id="tempElem" style="font-size: '+fontSize+'px;">'+char+'</span>');
      var elementWidth = parseFloat($('#tempElem').width());
      $('#tempElem').remove();
    }
    return elementWidth;
  }

  current.children('li').each(function(index) {
    var curText = $(this).children('a').text();
    var radius = (heightOfMenu - heightOfLine) / 2;
    var centerX = radius;
    var centerY = radius;
    var tempAngle = beginAngle;
    var lastColor = '';
    
    $(this).children('a').text('');

    (index < current.children('li').length - 1) ? lastColor = color : lastColor = defaultBackground;

    $(this).css({
      'width': heightOfMenu + 'px',
      'height': heightOfMenu + 'px',
      'z-index': 9000 + index,
      'box-shadow': boxShadow
    });

    colors.push(color);
    
    for(var i=0; i<curText.length; i++) {
      var radians = Math.PI * tempAngle / 180;
      var pX = centerX + radius * Math.cos(radians);
      var pY = centerY + radius * Math.sin(radians);
      var styles = 'height: '+ heightOfLine +'px; line-height: '+ heightOfLine/2 +'px; width: 1px; top: 0; transform: translate(' + (pX + heightOfLine/2) + 'px, '+ pY +'px) rotate('+(tempAngle + 90)+'deg);';
      $(this).children('a').append($('<span style="'+styles+'">' + curText[i] + '</span>'));
      var char = $(this).find('a > span:last-child').text();
      var fontSize = parseFloat($(this).children('a').find('span:last-child').css('font-size'));
      var step = getCurrentCharWidth(char, fontSize);
      tempAngle += 360 * step / (2 * Math.PI * radius);
    }

    (index < current.children('li').length-1)
      ?  generateSVG($(this), radius, '#'+lastColor, tempAngle)
      : null;

    heightOfMenu -= heightOfLine;
    color = (parseInt(color, 16) - colorDiff).toString(16);
    
  });
  current.find('li').css('background-color', '#'+defaultBackground);
  current.find('li:last-child').css('background-color', '#fff');
  
  return this;
}