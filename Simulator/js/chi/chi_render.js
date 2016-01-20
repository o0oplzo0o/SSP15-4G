var chi_render = new function()
{
	//Render loop
	this.update = function()
	{
		chi.context.clearRect(0, 0, chi.canvas.width, chi.canvas.height);
		
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

		// tables set
		for (var i=0; i<chi.tables.length; ++i) {
			chi.tables[i].draw(chi.context);
		}
	}
}