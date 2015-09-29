var animSprite = function(options)
{
	var _this = this;
	_this.canvas = null;
	_this.iterPointer = null;
	_this.iterCounter = 0;
	_this.inAnimate = false;
	
	
	_this.init = function() {
		
		_this.canvas = document.querySelector(options.container);
		_this.canvas.style.width = options.width + "px";
		_this.canvas.style.height = options.height + "px";
		_this.canvas.style.backgroundImage = "url('" + options.spriteUrl + "')";
		
		if(options.bgColor.length != -1)
		{
			_this.canvas.style.backgroundColor = options.bgColor;
		}
	}
	
	_this.setCanvasCoords = function(coords) {
		_this.canvas.style.backgroundPositionX = "-" + coords.x + "px";
		_this.canvas.style.backgroundPositionY = "-" + coords.y + "px";
	}
	
	_this.start = function() {
		_this.iterPointer = setInterval(_this.iterate, options.speed);
		_this.inAnimate = true;
	}
	
	_this.stop = function() {
		clearInterval(_this.iterPointer);
		
		_this.inAnimate = false;
		_this.iterCounter = 0;
	}
	
	_this.iterate = function() {
		_this.iterCounter++;
		
		if(_this.iterCounter == options.size)
		{
			_this.stop();
			return;
		}
		
		var coords = _this.calcCoords();
		_this.setCanvasCoords(coords);
	}
	
	_this.calcCoords = function() {
		var result = {};
		var yx = _this.iterCounter / options.cols;
		
		if(String(yx).indexOf(".") == -1)
		{
			result.y = Math.ceil(yx) * options.height;
		}
		else
		{
			result.y = Math.ceil(yx) * options.height - options.height;
		}
		
		if(String(yx).indexOf(".") == -1)
		{
			result.x = 0;
		}
		else
		{
			if(_this.iterCounter > 10)
			{
				result.x = parseInt(String(yx).split(".")[1]) * options.width;
			}
			else
			{
				result.x = parseInt(String(yx).split(".")[1]) * options.width - options.width;
			}
		}
		
		return result;
	}
	
	
	_this.init();
}