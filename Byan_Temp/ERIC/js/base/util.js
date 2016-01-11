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

// converts input array to state-based coordinates (where 0,0 is at the center)
var arrayOperations = new function()
{
	this.arrayToState = function(array) {
		var state = new Array();
		for (var i=0; i<5; i++) {
			state.push(new Array());

			for (var j=0; j<5; j++) {
				//console.log("map "+i+","+j+" to "+((i+2)%5)+","+((4-j+3)%5));
				state[i][j] = array[(i+2)%5][(-j+7)%5];
			}
		}

		return state;
	}

	this.stateToArray = function(state) {
		var array = new Array();
		for (var i=0; i<5; i++) {
			array.push(new Array());

			for (var j=0; j<5; j++) {
				//console.log("map "+i+","+j+" to "+((i+3)%5)+","+((4-j+3)%5));
				array[i][j] = state[(i-2+5)%5][(j+3)%5];
			}
		}

		return array;
	}
}

// converts color to a darker/lighter shade
function convertColor(hex, lum) {
	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}