/* 18 feb 2016
- "monospaced" to "monospace"

15 feb 2016
- applied eric's onHitTargetCB = null fix

31 jan 2016
	- removed set onHitTarget to null (eric's fix)
	- changed default font to monospaced
*/

var string = function()
{
	this.uid = 0;
	this.alpha = 1;
	this.color = "#FFFFFF";
	this.font = "monospace";
	this.pos = {x:0,y:0};
	this.size = 0;
	this.text = "";
	
	this.isMoving = false;
	this.ori = {x:0,y:0};
	this.dest = {x:0,y:0};
	this.speed = 0;
	this.factor = 0;
	
	this.updateID = null;
	
	this.onHitTargetCB = null; //Function callback when cube moveTo hit destination
	
	this.createString = function(context, x, y, font, size, color, alpha, text)
	{
		this.uid = uid++;
		this.pos.x = x;
		this.pos.y = y;
		this.font = font;
		this.size = size;
		this.color = color;
		this.alpha = alpha;
		this.text = text;
		
		this.draw(context);
		
		this.updateID = setInterval(this.update,1000/60, this);
		return this;
	}
	
	this.draw = function(context)
	{
		context.save();

		// set font settings
		context.save();
		context.font = this.size + "px " + this.font;
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
		this.ori = {x:this.pos.x,y:this.pos.y};
		this.dest = {x:x,y:y};
		this.speed = speed;
		this.isMoving = true;
	}
	
	this.onHitTarget = function(self)
	{
		var targetCB = self.onHitTargetCB;

		self.onHitTargetCB = null;

		if(targetCB != null)
			targetCB();
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
				self.pos.x = self.dest.x;
				self.pos.y = self.dest.y;
				self.isMoving = false;
				self.onHitTarget(self);
			}
			self.factor += time.dt * self.speed;
		}
	}
	
	this.pause = function()
	{
		clearInterval(this.updateID);
		this.updateID = null;
	}
	
	this.resume = function()
	{
		this.updateID = setInterval(this.update,1000/60, this);
	}
}