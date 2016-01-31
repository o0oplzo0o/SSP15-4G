var line = function()
{
	this.pos = {x:0,y:0,x2:0,y2:0};
	this.size = 0;
	this.color = "#FFFFFF";
	this.alpha = 1;
	
	this.isMoving = false;
	this.ori = {x:0,y:0};
	this.dest = {x:0,y:0};
	this.speed = 0;
	this.factor = 0;
	
	this.onHitTargetCB = null; //Function callback when cube moveTo hit destination
	
	this.createLine = function(context, x, y, x2, y2, color, alpha)
	{
		this.pos.x = x;
		this.pos.y = y;
		this.pos.x2 = x2;
		this.pos.y2 = y2;
		this.color = color;
		this.alpha = alpha;
		
		this.draw(context);
		
		setInterval(this.update,1000/60, this);
		return this;
	}
	
	this.draw = function(context)
	{
		context.save();

		// settings
		context.strokeStyle = this.color;
		context.globalAlpha = this.alpha;

		// line
		context.beginPath();
		context.moveTo(this.pos.x,this.pos.y);
		context.lineTo(this.pos.x2,this.pos.y2);
		context.stroke();

		context.restore();
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