var rho_render = new function()
{
	//Render loop
	this.update = function()
	{
		rho.context.clearRect(0, 0, rho.canvas.width, rho.canvas.height);
		
		// input set
		for(var i=0; i<rho.input.length; i++){
			rho.input[i].draw(rho.context);
		}

		//shiftcube stuff
		for(var i=0; i<rho.shiftcube.length; i++){
			rho.shiftcube[i].draw(rho.context);
		}
		
		//title texts
		for(var i=0; i<rho.Ttexts.length; i++){
			rho.Ttexts[i].draw(rho.context);
		}
		
		//texts
		for(var i=0; i<rho.texts.length; i++){
			rho.texts[i].draw(rho.context);
		}
		
		// object set
		for(var i=0; i<rho.object.length; i++)
		{
			rho.object[i].draw(rho.context);
		}
		
		// extra set
		for(var i=0; i<rho.extra.length; i++)
		{
			rho.extra[i].draw(rho.context);
		}
		
		for(var i=0; i<rho.bitcubes.length; i++) {
			rho.bitcubes[i].draw(rho.context);
		}
		
		if(index.isResize)
		{
			index.isResize = false;
			//rho.canvas.width =rho.canvas.parentElement.clientWidth-10;
			//rho.canvas.height =rho.canvas.parentElement.clientHeight-10;
			var scale = (rho.canvas.parentElement.clientWidth-10)/640;
			rho.context.scale(index.lastScaleValue,index.lastScaleValue);
			index.lastScaleValue = 1/scale;
			rho.context.scale(scale,scale);
		}
		
		if(rho.message != "")
			rho.m_dialog.draw(rho.context);
	}
		
}