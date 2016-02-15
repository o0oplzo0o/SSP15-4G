var inputToState_render = new function()
{
	//Render loop
	this.update = function()
	{
		inputToState.context.clearRect(0, 0, inputToState.canvas.width, inputToState.canvas.width);
		
		for(var i=0; i<inputToState.sortedObject.length; i++)
		{
			inputToState.sortedObject[i].draw(inputToState.context);
		}
		
		if(index.isResize)
		{
			index.isResize = false;
			// iota.canvas.width = iota.canvas.parentElement.clientWidth-10;
			// iota.canvas.height = iota.canvas.parentElement.clientHeight-10;
			// var scale = (inputToState.canvas.parentElement.clientWidth-10)/640;
			// inputToState.context.scale(index.lastScaleValue,index.lastScaleValue);
			// index.lastScaleValue = 1/scale;
			// inputToState.context.scale(scale,scale);
		}
		
		if(inputToState.message != "")
			inputToState.m_dialog.draw(inputToState.context);
	}
}