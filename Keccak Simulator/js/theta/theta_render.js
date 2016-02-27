var theta_render = new function()
{
	//Render loop
	this.update = function()
	{
		theta.context.clearRect(0, 0, theta.canvas.width, theta.canvas.height);
		for(var i=0; i<theta.sortedObject.length; i++)
		{
			theta.sortedObject[i].draw(theta.context);
		}
		if(index.isResize)
		{
			index.isResize = false;
			//var scale = (theta.canvas.parentElement.clientWidth-10)/640;
			//theta.context.scale(index.lastScaleValue,index.lastScaleValue);
			//index.lastScaleValue = 1/scale;
			//theta.context.scale(scale,scale);
		}
		if(theta.message != "")
			theta.m_dialog.draw(theta.context);
	
		
	}
}