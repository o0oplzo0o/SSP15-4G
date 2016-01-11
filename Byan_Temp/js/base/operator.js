var operator = function()
{
	this.pos = {x:0,y:0};
	this.size = 0;
	this.color = "#FFFFFF";
	this.alpha = 1;
	this.text = "";
	
	this.font = "Arial";
	this.fontsize = "18";
	
	this.isMoving = false;
	this.ori = {x:0,y:0};
	this.dest = {x:0,y:0};
	this.speed = 0;
	this.factor = 0;
	
	this.createOperator = function(context, x, y, size, color, alpha, text)
	{
		this.pos.x = x;
		this.pos.y = y;
		this.size = size;
		this.color = color;
		this.alpha = alpha;
		this.text = text;
		
		this.draw(context);
		
		setInterval(this.update,1000/60, this);
		return this;
	}
	
	this.draw = function(context)
	{
		var prevAlpha = context.globalAlpha;
		var prevFont = context.font;

		// settings
		context.fillStyle = this.color;
		context.strokeStyle = "#000000";
		context.globalAlpha = this.alpha;

		// circle
		context.beginPath();
		context.arc(this.pos.x, this.pos.y, this.size/2, 0, 2 * Math.PI, false);
		context.fill();
		context.stroke();

		// text
		context.font = this.fontsize + "px " + this.font;
		context.fillStyle = "#000000";
		context.fillText(this.text,this.pos.x-20,this.pos.y+8);

		context.globalAlpha = prevAlpha;
		context.font = prevFont;
	}
	
	this.getPosition = function()
	{
		return this.pos;
	}
	
	this.moveTo = function(x,y,speed)
	{
		this.factor = 0;
		this.ori = this.pos;
		this.dest = {x:x,y:y};
		this.speed = speed;
		this.isMoving = true;
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
			}
			self.factor += time.dt * self.speed;
		}
	}
}