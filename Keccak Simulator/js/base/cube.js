var cube = function()
{
	this.pos = {x:0,y:0};
	this.size = 0;
	this.color = "#FFFFFF";
	this.alpha = 1;
	this.text = "";

	this.font = "monospaced";
	this.fontsize = "18";
	
	this.isMoving = false;
	this.ori = {x:0,y:0};
	this.dest = {x:0,y:0};
	this.speed = 0;
	this.factor = 0;
	
	this.onHitTargetCB = null; //Function callback when cube moveTo hit destination
	
	this.createCube = function(context, x, y, size, color, alpha, text)
	{
		this.pos.x = x;
		this.pos.y = y;
		this.size = size;
		this.color = color;
		this.alpha = alpha;
		this.text = text;
		
		this.draw(context);
		
		setInterval(this.update,1000/60,this);

		return this;
	}
	
	this.draw = function(context)
	{
		context.save();

		//cube
		context.fillStyle = this.color;
		context.strokeStyle = "#000000";
		context.globalAlpha = this.alpha;
		
		//actual face
		context.beginPath();
		context.rect(this.pos.x, this.pos.y, this.size, this.size);
		context.fill();
		context.stroke();

		context.save();

		//right face
		context.fillStyle = convertColor(this.color, -0.25);
		context.beginPath();
		context.moveTo((this.pos.x+this.size),this.pos.y);
		context.lineTo((this.pos.x+this.size+(this.size/2)),(this.pos.y-(this.size/2)));
		context.lineTo((this.pos.x+this.size+(this.size/2)),(this.pos.y+(this.size/2)));
		context.lineTo((this.pos.x+this.size),(this.pos.y+this.size));
		context.closePath();
		context.fill();
		context.stroke();

		context.restore();
		context.save();

		//top face
		context.fillStyle = convertColor(this.color, 0.10);
		context.beginPath();
		context.moveTo(this.pos.x,this.pos.y);
		context.lineTo((this.pos.x+(this.size/2)),(this.pos.y-(this.size/2)));
		context.lineTo((this.pos.x+this.size+(this.size/2)),(this.pos.y-(this.size/2)));
		context.lineTo((this.pos.x+this.size),this.pos.y);
		context.closePath();
		context.fill();
		context.stroke();

		context.restore();

		//text
		context.fillStyle = "#000000";
		context.font = this.fontsize + "px " + this.font;
		context.fillText(this.text,
			this.pos.x+(0.15 * this.size),
			this.pos.y+(0.70 * this.size)
		);

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