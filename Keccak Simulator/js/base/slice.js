/* 31 jan 2016
	- added eric's reordering (slice should render nicely now)
	- fixed graphical bug
*/

var slice = function()
{
	this.cubes = new Array();

	this.pos = {x:0,y:0};
	this.size = 0;
	this.color = "#FFFFFF";
	this.alpha = 1;
	this.input = new Array();

	this.sortedObject = new Array();
	
	this.createSlice = function(context, x, y, size, color, alpha, input)
	{
		this.pos.x = x;
		this.pos.y = y;
		this.size = size;
		this.color = color;
		this.alpha = alpha;
		this.input = input;

		// create new slice
		var x = 0;
		for (var i=0; i<5; ++i) {
			this.cubes.push(new Array());
			for (var j=0; j<5; ++j) {
				var c = new cube();
				this.cubes[i].push(c.createCube(
					context,
					this.pos.x+(i*this.size),
					this.pos.y+(j*this.size),
					this.size,
					this.color,
					this.alpha,
					this.input[x]
				));
				++x;
			}
		}
		this.zSort5x5();

		return this;
	}
	
	this.draw = function(context)
	{
		for (var i=0; i<this.sortedObject.length; ++i) {
			this.sortedObject[i].draw(context);
		}
	}

	this.setInput = function(i, j, text)
	{
		this.cubes[i][j].text = text;
	}
	
	this.getPosition = function()
	{
		return this.pos;
	}


	this.zSort5x5 = function()
	{
		var tempArray1 = new Array();
		
		// Flatten unsorted array
		for(var x=0; x<this.cubes.length; ++x)
		{
			for(var y=0; y<this.cubes[x].length; ++y)
			{
				tempArray1.push(this.cubes[x][y]);
			}
		}
		
		// Order array by object y pos
		tempArray1.sort(this.sortFunctionY);
		
		var tempArray2 = new Array();
		var currentIndex = 0;
		var lastY = 0;
		
		//if empty, don't bother
		if(tempArray1.length <= 0)
			return;
		
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
		
		this.sortedObject = tempArray1.slice();
		tempArray1 = null;
	}
	
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
		
		for(var x=0; x<this.cubes.length; x++)
		{
			for(var y=0; y<this.cubes[x].length; i++)
			{
			}
		}
		
		this.sortedObject = tempArray.slice();
		tempArray = null;
	}
	
	this.moveTo = function(x, y, speed, cb)
	{
		for (var i=0; i<5; ++i) {
			for (var j=0; j<5; ++j) {
				this.cubes[i][j].moveTo(
					x+(i*this.size),
					y+(j*this.size),
					speed,
					cb
				);
			}
		}
	}
}