var absorb_render = new function()
{
	//Render loop
	this.update = function()
	{
		absorb.context.clearRect(0, 0, absorb.canvas.width, absorb.canvas.height);

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
		absorb.dialog.draw(absorb.context);

		// resize code (17 feb 2016)
		if(index.isResize) {
			index.isResize = false;
			//var scale = (absorb.canvas.parentElement.clientWidth-10)/640;
			//absorb.context.scale(index.lastScaleValue,index.lastScaleValue);
			//index.lastScaleValue = 1/scale;
			//absorb.context.scale(scale,scale);
		}
	}
}