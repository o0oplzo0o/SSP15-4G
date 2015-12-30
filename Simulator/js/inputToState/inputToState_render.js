var render = new function()
{
	//Render loop
	this.update = function()
	{
		inputToState.context.clearRect(0, 0, inputToState.canvas.width, inputToState.canvas.height);
		
		// input set
		for(var i=0; i<inputToState.input.length; i++){
			inputToState.input[i].draw(inputToState.context);
		}

		// object set
		for(var i=0; i<inputToState.object.length; i++)
		{
			inputToState.object[i].draw(inputToState.context);
		}
		
		// extra set
		for(var i=0; i<inputToState.extra.length; i++)
		{
			inputToState.extra[i].draw(inputToState.context);
		}
	}
}