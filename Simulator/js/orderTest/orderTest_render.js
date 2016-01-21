var render = new function()
{
	//Render loop
	this.update = function()
	{
		orderTest.context.clearRect(0, 0, orderTest.canvas.width, orderTest.canvas.height);

		// object set
		for(var i=0; i<orderTest.sortedObject.length; i++)
		{
			orderTest.sortedObject[i].draw(orderTest.context);
		}
	}
}