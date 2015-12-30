var render = new function()
{
	//Render loop
	this.update = function()
	{
		index.context.clearRect(0, 0, index.canvas.width, index.canvas.height);
		
		// animation set
		for(var i=0; i<index.indicators.length; i++){
			index.indicators[i].draw(index.context);
		}

		// cubes set
		for(var i=0; i<index.object.length; i++)
		{
			for(var j=0; j<index.object[i].length; j++)
			{
				index.object[i][j].draw(index.context);
			}
		}
		
		// lines / operators set
		for(var i=0; i<index.extra.length; i++)
		{
			index.extra[i].draw(index.context);
		}

		// right cubes set
		for (var i = 0; i < index.rcubes.length; ++i)
		{
			index.rcubes[i].draw(index.context);
		}
	}
}