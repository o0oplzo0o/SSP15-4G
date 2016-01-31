var string = function()
{
	this.pos = {x:0,y:0};
	this.font = "Arial";
	this.size = 0;
	this.color = "#FFFFFF";
	this.alpha = 1;
	this.text = "";
	
	this.isMoving = false;
	this.ori = {x:0,y:0};
	this.dest = {x:0,y:0};
	this.speed = 0;
	this.factor = 0;
	
	this.onHitTargetCB = null; //Function callback when cube moveTo hit destination
	
	this.createString = function(context, x, y, font, size, color, alpha, text)
	{
		this.pos.x = x;
		this.pos.y = y;
		this.font = font;
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
		context.save();

		//var prevAlpha = context.globalAlpha;
		//var prevFont = context.font;

		// set font settings
		context.save();
		context.font = this.size + "px " + this.font;
		context.globalAlpha = this.alpha;
		context.fillStyle = this.color;

		// draw text
		context.fillText(this.text,this.pos.x,this.pos.y);

		//context.globalAlpha = prevAlpha;
		//context.font = prevFont;

		context.restore();
	}
	
	this.getPosition = function()
	{
		return this.pos;
	}
	
	this.moveTo = function(x,y,speed,cb)
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