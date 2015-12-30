var render = new function()
{
	//Render loop
	this.update = function()
	{
		index.context.clearRect(0, 0, index.canvas.width, index.canvas.height);
		
		
		for(var i=0; i<index.indicate.length; i++){
			index.indicate[i].draw(index.context);
		}
		
		
		for(var i=0; i<index.object.length; i++)
		{
			for(var j=0; j<index.object[i].length; j++)
			{
				index.object[i][j].draw(index.context);
			}
		}
		
		
		for(var i=0; i<index.extra.length; i++)
		{
			index.extra[i].draw(index.context);
		}
		
		
	}
}