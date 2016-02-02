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
	
	this.dec2bin = function(val)
	{
		var initVal = 128; //8 bits
		var bin = "";
		
		for(var i=0; i<8; i++)
		{
			if(val >= initVal)
			{
				bin += "1";
				val -= initVal;
			}
			else
			{
				bin += "0";
			}
			initVal /= 2;
		}
		return bin;
	}
}

function Timer(cb, delay)
{
	this.tId;
	this.start;
	this.remaining = delay;
	
	this.resume = function()
	{
		this.start = new Date();
		clearTimeout(this.tId);
		this.tId = setTimeout(cb,this.remaining);
	};
	
	this.pause = function()
	{
		clearTimeout(this.tId);
		this.remaining -= new Date() - this.start;
	};
	
	this.resume();
}

// converts input array to state-based coordinates (where 0,0 is at the center)
function arrayToState(array) {
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
function stateToArray(state) {
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

// re-ordering function by eric
function zSort5x5(slice) {
	this.sortFunctionY = function(a,b)
	{
		return a.pos.y - b.pos.y;
	}
	
	this.sortFunctionX = function(a,b)
	{
		return a.pos.x - b.pos.x;
	}
	
	this.zSort25 = function()
	{
		var tempArray = {};
		
		for(var x=0; x<this.object.length; x++)
		{
			for(var y=0; y<this.object[x].length; i++)
			{
			}
		}
		
		this.sortedObject = tempArray.slice();
		tempArray = null;
	}

	var tempArray1 = new Array();
	
	// Flatten unsorted array
	for(var x=0; x<slice.length; x++)
	{
		for(var y=0; y<slice[x].length; y++)
		{
			tempArray1.push(slice[x][y]);
		}
	}
		
	/* UNCOMMENT THIS PART TO VIEW UNSORTED ARRAY */
	// this.sortedObject = tempArray1.slice();
	// return;
	/* UNCOMMENT THIS PART TO VIEW UNSORTED ARRAY */
	
	// Order array by object y pos
	tempArray1.sort(this.sortFunctionY);
	
	var tempArray2 = new Array();
	var currentIndex = 0;
	var lastY = 0;
	
	//if empty, don't bother
	if(tempArray1.length <= 0)
		return slice;
	
	//Do 1st item
	tempArray2[currentIndex] = new Array();
	tempArray2[currentIndex].push(tempArray1[0]);
	lastY = tempArray1[0].pos.y;
	
	for(var x=1; x<tempArray1.length; x++)
	{
		if(tempArray1[x].pos.y == lastY)
		{
			tempArray2[currentIndex].push(tempArray1[x]);
		}
		else
		{
			currentIndex++;
			lastY = tempArray1[x].pos.y;
			tempArray2[currentIndex] = new Array();
			tempArray2[currentIndex].push(tempArray1[x]);
		}
	}
	
	//Order each set by object x pos
	for(var x=0; x<tempArray2.length; x++)
	{
		tempArray2[x].sort(this.sortFunctionX);
	}
	
	tempArray1 = null;
	tempArray1 = new Array();
	
	//Flatten sorted array
	for(var x=tempArray2.length-1; x>=0; x--)
	{
		for(var y=0; y<tempArray2[x].length; y++)
		{
			tempArray1.push(tempArray2[x][y]);
		}
	}
	
	return tempArray1.slice();
}

// converts color to a darker/lighter shade
function convertColor(hex,lum) {
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