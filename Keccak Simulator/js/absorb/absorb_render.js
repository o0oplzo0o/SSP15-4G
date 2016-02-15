var absorb_render = new function()
{
	//Render loop
	this.update = function()
	{
		absorb.context.clearRect(0, 0, absorb.canvas.width, absorb.canvas.height);

		// cubes set
		for (var i=0; i<absorb.cubes.length; ++i) {
			for(var j=0; j<absorb.cubes[i].length; ++j) {
				absorb.cubes[i][j].draw(absorb.context);
			}
		}

		// lines set
		for(var i=0; i<absorb.lines.length; ++i) {
			absorb.lines[i].draw(absorb.context);
		}

		// indicators set
		for(var i=0; i<absorb.indicators.length; ++i) {
			absorb.indicators[i].draw(absorb.context);
		}
		
		// slices set
		for(var i=0; i<absorb.slices.length; ++i) {
			absorb.slices[i].draw(absorb.context);
		}
		
		// operators set
		for(var i=0; i<absorb.operators.length; ++i) {
			absorb.operators[i].draw(absorb.context);
		}

		// strings set
		for(var i=0; i<absorb.strings.length; ++i) {
			absorb.strings[i].draw(absorb.context);
		}

		// dialog set
		for(var i=0; i<absorb.dialogs.length; ++i) {
			absorb.dialogs[i].draw(absorb.context);
		}
	}
}