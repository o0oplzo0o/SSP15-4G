var pi_render = new function()
{
	//Render loop
	this.update = function()
	{
		pi.context.clearRect(0, 0, pi.canvas.width, pi.canvas.height);
		
		for(var i=0; i<pi.indicators.length; i++){
			pi.indicators[i].draw(pi.context);
		}
		

		// object set
			for(var i=0; i<pi.object.length; i++)
		{
			pi.object[i].draw(pi.context);
		}
		
		for(var i=0; i<pi.object1.length; i++)
		{
			pi.object1[i].draw(pi.context);
		}
		
		// extra set
		for(var i=0; i<pi.extra.length; i++)
		{
			pi.extra[i].draw(pi.context);
		}
		for(var i=0; i<pi.indexX.length; i++){
			pi.indexX[i].draw(pi.context);
		}
		for(var i=0; i<pi.indexX2.length; i++){
			pi.indexX2[i].draw(pi.context);
		}
		
		for(var i=0; i<pi.indexY.length; i++){
			pi.indexY[i].draw(pi.context);
		}
		for(var i=0; i<pi.oparray.length; i++){
			pi.oparray[i].draw(pi.context);
		}
		
		
		
	}
}