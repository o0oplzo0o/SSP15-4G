var pi_render = new function()
{
	//Render loop
	this.update = function()
	{
		pi.context.clearRect(0, 0, pi.canvas.width, pi.canvas.height);
		for(var i=0; i<pi.sortedObject.length; i++)
		{
			pi.sortedObject[i].draw(pi.context);
		}
		if(index.isResize)
		{
			index.isResize = false;
			//var scale = (pi.canvas.parentElement.clientWidth-10)/640;
			//pi.context.scale(index.lastScaleValue,index.lastScaleValue);
			//index.lastScaleValue = 1/scale;
			//pi.context.scale(scale,scale);
		}
		if(pi.message != "")
			pi.m_dialog.draw(pi.context);
	
		
	}
}