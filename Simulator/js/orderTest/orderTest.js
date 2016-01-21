var orderTest = new function()
{
	this.canvas;
	this.context;
	
	this.object = new Array();
	this.sortedObject = new Array();
	
	this.init = function()
	{
		this.canvas = document.getElementById("keccakCanvas");
		this.context = this.canvas.getContext("2d");

		// for(var x=0; x<5; x++)
		// {
			// var tempArray = new Array();
			// for(var y=0; y<5; y++)
			// {
				// var c = new cube();
				// tempArray.push(c.createCube(
					// this.context,
					// 50*y,
					// 50*x + 50,
					// 50,
					// "#8ED6FF",
					// 1,
					// "["+x+"]["+y+"]"
				// ));
			// }
			// this.object[x] = tempArray.slice();
		// }
		for (var i = 0; i < 5; ++i)
		{
			this.object.push(new Array());

			for (var j = 0; j < 5; ++j)
			{
				var posX = ((i + 2) % 5) * 50;
				var posY = ((j + 2) % 5) * 50;
				var a = new cube();
				this.object[i].push(a.createCube(
					this.context,
					515+posX,
					275+posY,
					50,
					"#8ED6FF",
					1,
					" "
				));
			}
		}
		
		this.object = zSort5x5(this.object);
		
		// 60 fps update loop
		this.update();
	}
	
	this.update = function()
	{
		render.update();
	}
}

orderTest.init();