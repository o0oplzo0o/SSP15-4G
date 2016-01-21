var slice = function()
{
	this.cubes = new Array();

	this.pos = {x:0,y:0};
	this.size = 0;
	this.color = "#FFFFFF";
	this.alpha = 1;

	this.font = "Arial";
	this.fontsize = "18";
	
	this.isMoving = false;
	this.ori = {x:0,y:0};
	this.dest = {x:0,y:0};
	this.speed = 0;
	this.factor = 0;
	
	this.onHitTargetCB = null; //Function callback when cube moveTo hit destination
	
	this.createSlice = function(context, x, y, size, color, alpha, input)
	{
		this.pos.x = x;
		this.pos.y = y;
		this.size = size;
		this.color = color;
		this.alpha = alpha;

		// create new slice
		for (var i=0; i<5; ++i) {
			this.cubes.push(new Array());
		}

		// map 1d input array to 2d cubes array
		for (var i=0; i<25; ++i) {
			var x = i % 5;
			var y = Math.floor(i / 5);
			
			var text = "0000000000000000";
			if (i<input.length) {
				text = input[i];
			}

			var c = new cube();
			this.cubes[x][y] = c.createCube(
				context,
				this.pos.x,
				this.pos.y,
				this.size,
				this.color,
				this.alpha,
				text
			);
		}

		// see util.js
		this.cubes = arrayOperations.arrayToState(this.cubes);

		// update positioning
		for (var i=0; i<5; i++) {
			for (var j=0; j<5; j++) {
				var posX = i * this.size;
				var posY = j * this.size;
				this.cubes[i][j].pos.x = this.pos.x+posX;
				this.cubes[i][j].pos.y = this.pos.y+posY;
			}
		}
		
		this.draw(context);
		
		setInterval(this.update,1000/60, this);
		return this;
	}
	
	this.draw = function(context)
	{
		// force slice to draw cubes in an order that respects layering
		for (var i=0; i<5; i++) {
			for (var j=4; j>-1; j--) {
				this.cubes[i][j].draw(context);
			}
		}
	}

	this.setInput = function(i, j, text)
	{
		// see util.js
		this.cubes = arrayOperations.StateToArray(this.cubes);
		this.cubes[i][j].text = text;
		this.cubes = arrayOperations.arrayToState(this.cubes);
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