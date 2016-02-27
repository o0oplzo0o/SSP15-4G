var chi_render = new function()
{
	//Render loop
	this.update = function()
	{
		chi.context.clearRect(0, 0, chi.canvas.width, chi.canvas.height);
		
		// slices set
		for (var i=0; i<chi.slices.length; ++i) {
			chi.slices[i].draw(chi.context);
		}
		
		// lines set
		for(var i=0; i<chi.lines.length; ++i) {
			chi.lines[i].draw(chi.context);
		}

		// indicators set (should draw above lines but under operators and cubes)
		for (var i=0; i<chi.indicators.length; ++i) {
			chi.indicators[i].draw(chi.context);
		}

		// operators set
		for (var i=0; i<chi.operators.length; ++i) {
			chi.operators[i].draw(chi.context);
		}

		// cubes set
		for (var i=0; i<chi.cubes.length; ++i) {
			for(var j=0; j<chi.cubes[i].length; ++j) {
				chi.cubes[i][j].draw(chi.context);
			}
		}

		// strings set
		for (var i=0; i<chi.strings.length; ++i) {
			chi.strings[i].draw(chi.context);
		}

		// tables set
		for (var i=0; i<chi.tables.length; ++i) {
			chi.tables[i].draw(chi.context);
		}
		
		// dialog
		chi.dialog.draw(chi.context);

		// resize code (17 feb 2016)
		if(index.isResize)
		{
			index.isResize = false;
			//var scale = (chi.canvas.parentElement.clientWidth-10)/640;
			//chi.context.scale(index.lastScaleValue,index.lastScaleValue);
			//index.lastScaleValue = 1/scale;
			//chi.context.scale(scale,scale);
		}
	}
}