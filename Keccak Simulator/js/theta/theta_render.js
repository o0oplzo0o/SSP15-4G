var theta_render = new function()
{
	//Render loop
	this.update = function()
	{
		theta.context.clearRect(0, 0, theta.canvas.width, theta.canvas.height);
		
		for(var i=0; i<theta.indicators.length; i++){
			theta.indicators[i].draw(theta.context);
		}
		

		// object set
			for(var i=0; i<theta.object.length; i++)
		{
			theta.object[i].draw(theta.context);
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
		}
		for(var i=0; i<theta.oparray.length; i++){
			theta.oparray[i].draw(theta.context);
		}
		
		
		
	}
}