var operator = function()
{
	this.pos = {x:0,y:0};
	this.size = 0;
	this.color = 0xffffff;
	this.text = "";
	
	this.isMoving = false;
	this.ori = {x:0,y:0};
	this.dest = {x:0,y:0};
	this.speed = 0;
	this.factor = 0;
	
	this.createOperator = function(context, x, y, size, color, text)
	{
		this.pos.x = x;
		this.pos.y = y;
		this.size = size;
		this.color = color;
		this.text = text;
		
		this.draw(context);
		
		setInterval(this.update,1000/60, this);
		return this;
	}
	
	this.draw = function(context)
	{
		// circle
		context.beginPath();
		context.arc(this.pos.x, this.pos.y, this.size/2, 0, 2 * Math.PI, false);
		context.fillStyle = this.color;
		context.fill();
		context.strokeStyle = '#000000';
		context.stroke();

		context.fillStyle = 'Black'; //'#8ED6FF';
		context.fillText(this.text,this.pos.x-25,this.pos.y+8);
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