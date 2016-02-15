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
		for(var i=0; i<theta.dialogs.length; ++i) {
			theta.dialogs[i].draw(theta.context);
		}
		
			//if(theta.message != "")
			//theta.m_dialog.draw(theta.context);
		//for(var i=0; i<theta.drawObject.length; i++)
		//{
		//	theta.drawObject[i].draw(theta.context);
		//}
		/*for(var i=0; i<theta.indicators.length; i++){
			theta.indicators[i].draw(theta.context);
		}
		for(var i=0; i<theta.oparray.length; i++){
			theta.oparray[i].draw(theta.context);
		}
		
		for(var i=0; i<theta.sortedObject.length; i++)
		{
			theta.sortedObject[i].draw(theta.context);
		}
		for(var i=0; i<theta.dialogs.length; ++i) {
			theta.dialogs[i].draw(theta.context);
		}
		
		for(var i=0; i<theta.tables.length; i++)
		{
			theta.tables[i].draw(theta.context);
		}
		
		
		for(var i=0; i<theta.object1.length; i++)
		{
			theta.object1[i].draw(theta.context);
		}
		
		// extra set
		for(var i=0; i<theta.extra.length; i++)
		{
			theta.extra[i].draw(theta.context);
		}
		for(var i=0; i<theta.indexX.length; i++){
			theta.indexX[i].draw(theta.context);
		}
		for(var i=0; i<theta.indexX2.length; i++){
			theta.indexX2[i].draw(theta.context);
		}
		
		for(var i=0; i<theta.indexY.length; i++){
			theta.indexY[i].draw(theta.context);
		}*/
		if(index.isResize)
		{
			index.isResize = false;
			var scale = (theta.canvas.parentElement.clientWidth-10)/640;
			theta.context.scale(index.lastScaleValue,index.lastScaleValue);
			index.lastScaleValue = 1/scale;
			theta.context.scale(scale,scale);
		}
		
		
	}
}