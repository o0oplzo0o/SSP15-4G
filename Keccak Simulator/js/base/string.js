/* 31 jan 2016
	- removed set onHitTarget to null (eric's fix)
	- changed default font to monospaced
*/

var string = function()
{
	this.alpha = 1;
	this.color = "#FFFFFF";
	this.font = "monospaced";
	this.pos = {x:0,y:0};
	this.size = 0;
	this.text = "";
	this.textAlign = "start";
	this.textBaseline = "alphabetic";
	
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

		// set font settings
		context.save();
		context.font = this.size + "px " + this.font;
		context.textAlign = this.textAlign;
		context.textBaseline = this.textBaseline;
		context.globalAlpha = this.alpha;
		context.fillStyle = this.color;

		// draw text
		context.fillText(this.text,this.pos.x,this.pos.y);

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
		console.log(self.onHitTargetCB);
		if(self.onHitTargetCB != null)
			self.onHitTargetCB();
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