var squeezing_render = new function()
{
	//Render loop
	this.update = function()
	{
		squeezing.context.clearRect(0, 0, squeezing.canvas.width, squeezing.canvas.height);

		// cubes set
		for (var i=0; i<squeezing.cubes.length; ++i) {
			for(var j=0; j<squeezing.cubes[i].length; ++j) {
				squeezing.cubes[i][j].draw(squeezing.context);
			}
		}

		// lines set
		for(var i=0; i<squeezing.lines.length; ++i) {
			squeezing.lines[i].draw(squeezing.context);
		}

		// indicators set
		for(var i=0; i<squeezing.indicators.length; ++i) {
			squeezing.indicators[i].draw(squeezing.context);
		}
		
		// slices set
		for(var i=0; i<squeezing.slices.length; ++i) {
			squeezing.slices[i].draw(squeezing.context);
		}
		
		// operators set
		for(var i=0; i<squeezing.operators.length; ++i) {
			squeezing.operators[i].draw(squeezing.context);
		}

		// strings set
		for(var i=0; i<squeezing.strings.length; ++i) {
			squeezing.strings[i].draw(squeezing.context);
		}

		// dialog set
		for(var i=0; i<squeezing.dialogs.length; ++i) {
			squeezing.dialogs[i].draw(squeezing.context);
		}
	}
}