$.fn.curveText = function(options) {
  var defaults = {
    radius: 10,
    step: 10
  }
   var settings = $.extend({
     radius: defaults.radius,
     step: defaults.step
   }, options );
  // Create spans for each letters
  var curText = this.text();
  var angle = -90;
  var h = parseFloat(this.css('height'));
  var radius = !!options.radius == true ? options.radius : defaults.radius;
  var step = !!options.step == true ? options.step : defaults.step;
  var centerX = radius;
  var centerY = radius;
  this.text('');
  this.css({
    'display': 'block',
    'position': 'relative',
    'width': radius*2 + 'px',
    'height': radius*2 + 'px'
  });
  
  for(var i=0;i<curText.length;i++) {
    var rad = Math.PI * angle / 180;
    var pX = centerX + radius * Math.cos(rad);
    var pY = centerY + radius * Math.sin(rad);
    var styles = 'display: block; height: '+ h +'px; width: '+ step * 2 +'px; text-align: center; position:absolute; top: ' + -(h/2) +'px; left: 0; transform-origin: 50% 50%; transform: translate('+(pX - step/2)+'px, '+ pY +'px) rotate('+(angle + 90)+'deg);'
    this.append($('<span style="'+styles+'">' + curText[i] + '</span>'));
    angle += step / 2;
  }
  
  return this;
}