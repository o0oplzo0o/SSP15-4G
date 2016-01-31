/* 31 jan 2016
	- fixed graphical bug
*/

var table = function()
{
	// constructor settings
	this.pos = {x:0,y:0};
	this.input = new Array();

	// design settings
	this.alpha = 1;
	this.bgcolor = "#FFFFFF";
	this.bordercolor = "#000000";
	this.font = "Arial";
	this.fontcolor = "#000000";
	this.fontsize = 18;
	this.padding = 5;
	this.size = 50;
	
	// animation settings
	this.isMoving = false;
	this.ori = {x:0,y:0};
	this.dest = {x:0,y:0};
	this.speed = 0;
	this.factor = 0;
	
	this.onHitTargetCB = null; //Function callback when cube moveTo hit destination
	
	this.createTable = function(context, x, y, input)
	{
		// constructor settings
		this.pos.x = x;
		this.pos.y = y;
		this.input = input;
		
		this.draw(context);
		
		setInterval(this.update,1000/60, this);
		return this;
	}
	
	this.draw = function(context)
	{
		context.save();

		context.globalAlpha = this.alpha;
		context.font = this.fontsize + "px " + this.font;

		var space = this.padding * 2;

		// get largest width of available input text
		this.size = this.getLongestWidth(context);
				
		// cell settings
		context.fillStyle = this.bgcolor;
		context.strokeStyle = this.bordercolor;
		for (var r = 0; r < this.input.length; ++r) {
			for (var c = 0; c < this.input[r].length; ++c) {
				// draw cell
				context.beginPath();
				context.rect(
					this.pos.x+(c*(this.size+space)),
					this.pos.y+(r*(this.fontsize+space)),
					this.size+space,
					this.fontsize+space
				);
				context.fill();
				context.stroke();
			}
		}
				
		// text settings
		context.fillStyle = this.fontcolor;
		for (var r = 0; r < this.input.length; ++r) {
			for (var c = 0; c < this.input[r].length; ++c) {
				// draw text
				context.fillText(
					this.input[r][c],
					this.pos.x+c*(this.size+space)+this.padding,
					this.pos.y+r*(this.fontsize+space)+this.fontsize+this.padding
				);
			}
		}

		context.restore();
	}

	this.getLongestWidth = function(context)
	{
		var max = 0;

		for (var i = 0; i < this.input.length; ++i) {
			for (var j = 0; j < this.input[i].length; ++j) {
				var temp = context.measureText(this.input[i][j]).width;

				if (temp > max) {
					max = temp;
				}
			}
		}

		return max;
	}

	this.transpose = function()
	{
		// rows become columns and vice versa
		// input[r][c] becomes input[c][r]
		var array = this.input;
		this.input = [];

		for (var c = 0; c < array[0].length; ++c) {
			this.input.push(new Array());
			
			for (var r = 0; r < array.length; ++r) {
				this.input[c].push(array[r][c]);
			}
		}
	}
	
	this.getPosition = function()
	{
		return this.pos;
	}
	
	this.moveTo = function(x, y, speed, cb)
	{
		if(cb === undefined)
			this.onHitTargetCB = null;
		else
			this.onHitTargetCB = cb;
		
		this.factor = 0;
		this.ori = this.pos;
		this.dest = {x:x,y:y};
		this.speed = speed;
		this.isMoving = true;
	}
	
	this.onHitTarget = function(self)
	{
		console.log(self.onHitTargetCB);
		if(self.onHitTargetCB != null)
			self.onHitTargetCB();
		
		self.onHitTargetCB = null;
	}
	
	//Specific object update loop
	this.update = function(self)
	{
		if(self.isMoving)
		{
			self.pos.x = util.lerp(self.ori.x,self.dest.x,self.factor);
			self.pos.y = util.lerp(self.ori.y,self.dest.y,self.factor);
			
			if(self.factor >= 1)
			{
				self.isMoving = false;
				self.onHitTarget(self);
			}
			self.factor += time.dt * self.speed;
		}
	}
}