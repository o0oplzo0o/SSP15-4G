var iota_render = new function()
{
	//Render loop
	this.update = function()
	{
		iota.context.clearRect(0, 0, iota.canvas.width, iota.canvas.width);
		
		for(var i=0; i<iota.sortedObject.length; i++)
		{
			iota.sortedObject[i].draw(iota.context);
		}
		
		if(index.isResize)
		{
			index.isResize = false;
			// iota.canvas.width = iota.canvas.parentElement.clientWidth-10;
			// iota.canvas.height = iota.canvas.parentElement.clientHeight-10;
			// var scale = (iota.canvas.parentElement.clientWidth-10)/640;
			// iota.context.scale(index.lastScaleValue,index.lastScaleValue);
			// index.lastScaleValue = 1/scale;
			// iota.context.scale(scale,scale);
		}
		
		if(iota.message != "")
			iota.m_dialog.draw(iota.context);
	}
}