/* 31 jan 2016
	- changed default fontspacing to 4
	- some code optimizations
	- fixed graphical bug
	- removed moveTo and relevant loops (optimization)
*/

var dialog = function()
{
	// constructor settings
	this.pos = {x:5,y:535};
	this.message = new Array();

	// design settings
	this.alpha = 1;
	this.bgcolor = "#000000";
	this.bordercolor = "#FFFFFF";
	this.font = "sans-serif, serif";
	this.fontcolor = "#FFFFFF";
	this.fontsize = 16;
	this.width = 1270;
	this.height = 60;
	this.fontspacing = 4;
	
	this.createDialog = function(context, m)
	{
		// constructor settings
		this.setMessage(context, m);
		this.draw(context);
		
		return this;
	}
	
	this.draw = function(context)
	{
		context.save();

		context.globalAlpha = this.alpha;
		context.font = this.fontsize + "px " + this.font;
				
		// background settings
		context.fillStyle = this.bgcolor;
		context.strokeStyle = this.bordercolor;
		
		// draw background
		context.beginPath();
		context.rect(
			this.pos.x,
			this.pos.y,
			this.width,
			this.height
		);
		context.fill();
		context.stroke();
		
		// text settings
		context.textAlign = "center";
		context.textBaseline = "middle";
		context.fillStyle = this.fontcolor;

		// draw text
		var totalHeight = this.message.length * (this.fontsize + this.fontspacing);
		var y = (this.height - totalHeight)/2 + this.pos.y + this.fontspacing*this.message.length;
		for (var i = 0; i < this.message.length; ++i) {
			context.fillText(
				this.message[i],
				this.width/2+this.pos.x,
				y
			);
			y+=this.fontsize+this.fontspacing;
		}

		context.restore();
	}

	this.setMessage = function(context, m) {
		context.save();
		
		context.font = this.fontsize + "px " + this.font;

		// split the text by words 
		var words = m.split(' ');
		var new_line = words[0];
		var lines = new Array();
		for(var i = 1; i < words.length; ++i) {
		   if (context.measureText(new_line + " " + words[i]).width < this.width) {
			   new_line += " "+words[i];
		   } else {
			   lines.push(new_line);
			   new_line = words[i];
		   }
		}
		lines.push(new_line);

		this.message = lines;

		context.restore();
	}
}