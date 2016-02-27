var squeezing_render = new function()
{
	//Render loop
	this.update = function()
	{
		squeezing.context.clearRect(0, 0, squeezing.canvas.width, squeezing.canvas.height);
		
		// slices set
		for(var i=0; i<squeezing.slices.length; ++i) {
			squeezing.slices[i].draw(squeezing.context);
		}

		// cubes set
		for (var i=0; i<squeezing.cubes.length; ++i) {
			squeezing.cubes[i].draw(squeezing.context);
		}

		// strings set
		for(var i=0; i<squeezing.strings.length; ++i) {
			squeezing.strings[i].draw(squeezing.context);
		}

		// tables set
		for(var i=0; i<squeezing.tables.length; ++i) {
			squeezing.tables[i].draw(squeezing.context);
		}

		// dialog
		squeezing.dialog.draw(squeezing.context);

		// resize code (17 feb 2016)
		if(index.isResize)
		{
			index.isResize = false;
			//var scale = (squeezing.canvas.parentElement.clientWidth-10)/640;
			//squeezing.context.scale(index.lastScaleValue,index.lastScaleValue);
			//index.lastScaleValue = 1/scale;
			//squeezing.context.scale(scale,scale);
		}
	}
}