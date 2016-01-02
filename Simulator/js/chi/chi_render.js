var chi_render = new function()
{
	//Render loop
	this.update = function()
	{
		chi.context.clearRect(0, 0, chi.canvas.width, chi.canvas.height);
		
		// animation set
		for(var i=0; i<chi.indicators.length; i++){
			chi.indicators[i].draw(chi.context);
		}

		// cubes set
		for(var i=0; i<chi.object.length; i++)
		{
			for(var j=0; j<chi.object[i].length; j++)
			{
				chi.object[i][j].draw(chi.context);
			}
		}
		
		// lines / operators set
		for(var i=0; i<chi.extra.length; i++)
		{
			chi.extra[i].draw(chi.context);
		}

		// right cubes set
		for (var i = 0; i < chi.rcubes.length; ++i)
		{
			chi.rcubes[i].draw(chi.context);
		}
	}
}