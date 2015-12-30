var time = new function()
{
	this.fps = 0;
	this.fps_temp = 0;
	this.fps_time = 0;
	this.dt = 0;
	this.previousTime = 0;
	
	this.updateTime = function()
	{
		var timenow = Date.now();
		this.dt = (timenow - this.previousTime) / 1000;
		this.previousTime = timenow;
		this.fps_time += this.dt;
		
		this.fps_temp += 1;
		if(this.fps_time > 1000)
		{
			this.fps = this.fps_temp;
			this.fps_temp = 0;
			this.fps_time = 0;
		}
	}
}

var util = new function()
{
	this.lerp = function(a, b, t)
	{
		return a + t * (b - a);
	}
}
