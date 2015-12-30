var line = function()
{
	this.pos = {x:0,y:0,x2:0,y2:0};
	this.size = 0;
	this.color = 0xffffff;
	
	this.isMoving = false;
	this.ori = {x:0,y:0};
	this.dest = {x:0,y:0};
	this.speed = 0;
	this.factor = 0;
	
	this.createLine = function(context, x, y, x2, y2)
	{
		this.pos.x = x;
		this.pos.y = y;
		this.pos.x2 = x2;
		this.pos.y2 = y2;
		
		this.draw(context);
		
		setInterval(this.update,1000/60, this);
		return this;
	}
	
	this.draw = function(context)
	{
		//cube
		context.save();
		context.beginPath();
		context.fillStyle = this.color; //'#8ED6FF';
		context.strokeStyle = "Black";
		context.save();

		context.beginPath();
		context.moveTo(this.pos.x,this.pos.y);
		context.lineTo(this.pos.x2,this.pos.y2);
		context.stroke();
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