var cube = function()
{
	this.pos = {x:0,y:0};
	this.size = 0;
	this.color = "#FFFFFF";
	this.alpha = 1;
	this.text = "";
	
	this.isMoving = false;
	this.ori = {x:0,y:0};
	this.dest = {x:0,y:0};
	this.speed = 0;
	this.factor = 0;
	
	this.createCube = function(context, x, y, size, color, alpha, text)
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

		//cube
		context.fillStyle = this.color; //'#8ED6FF';
		context.strokeStyle = "#000000";
		context.globalAlpha = this.alpha;
		
		//actual face
		context.beginPath();
		context.rect(this.pos.x, this.pos.y, this.size, this.size);
		context.fill();
		context.stroke();

		//top face
		context.beginPath();
		context.moveTo(this.pos.x,this.pos.y);
		context.lineTo((this.pos.x+(this.size/2)),(this.pos.y-(this.size/2)));
		context.lineTo((this.pos.x+this.size+(this.size/2)),(this.pos.y-(this.size/2)));
		context.lineTo((this.pos.x+this.size+(this.size/2)),(this.pos.y-(this.size/2)));
		context.lineTo((this.pos.x+this.size),this.pos.y);
		context.closePath();
		context.fill();
		context.stroke();

		//right face
		context.beginPath();
		context.moveTo((this.pos.x+this.size),this.pos.y);
		context.lineTo((this.pos.x+this.size+(this.size/2)),(this.pos.y-(this.size/2)));
		context.lineTo((this.pos.x+this.size+(this.size/2)),(this.pos.y+(this.size/2)));
		context.lineTo((this.pos.x+this.size+(this.size/2)),(this.pos.y+(this.size/2)));
		context.lineTo((this.pos.x+this.size),(this.pos.y+this.size));
		context.closePath();
		context.fill();
		context.stroke();
		
		//text
		context.fillStyle = "#000000";
		context.fillText(this.text,this.pos.x+(0.15 * this.size),this.pos.y+(0.70 * this.size));

		context.globalAlpha = prevAlpha;
	}
	
	this.getPosition = function()
	{
		return this.pos;
	}
	
	this.moveTo = function(x, y, speed)
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