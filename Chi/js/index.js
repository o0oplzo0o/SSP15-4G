var index = new function()
{
	this.canvas;
	this.context;
	this.object = new Array();
	this.extra = new Array();
	this.indicators = new Array();
	this.rcubes = new Array();

	this.refresh;

	var padding = 50;
	var spaceX = 150;
	var spaceY = 500;
	
	this.init = function()
	{
		this.canvas = document.getElementById("keccakCanvas");
		this.context = this.canvas.getContext("2d");
		this.context.font = "24px arial";

    	// resize the canvas to fill browser window dynamically
		/*
		window.addEventListener('resize', resizeCanvas, false);

		function resizeCanvas() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}
		resizeCanvas();
		*/
		
		// create 10 cubes
		for (var i = 0; i < 5; ++i)
		{
			var axisY = new Array();
			this.object.push(axisY);

			for (var j = 0; j < 2; ++j)
			{
				var posX = i * spaceX;
				var posY = j * spaceY;
				var a = new cube();
				axisY.push(a.createCube(this.context,padding+posX,padding+posY,50,"#8ED6FF",i+","+j));
			}
		}
		
		for(var i=0;i<5;++i) {
			// straight vertical line
			var posX = i * spaceX;
			var vertical = new line();
			this.extra.push(vertical.createLine(this.context,padding+posX+37.5,padding+50,padding+posX+37.5,padding+spaceY-12.5));

			// not group (tonot, tonot2, opnot)
			var x1 = padding+posX+37.5;
			var y1 = padding+50;

			var tonot = new line();
			this.extra.push(tonot.createLine(
				this.context,
				x1,
				y1+(spaceY/4),
				x1+(spaceX/4),
				y1+(spaceY/4)
			));

			var tonot2 = new line();
			this.extra.push(tonot2.createLine(
				this.context,
				x1+(spaceX/4),
				y1+(spaceY/4),
				x1+(spaceX/4),
				y1+(spaceY/4)+100
			));

			var opnot = new operator();
			this.extra.push(opnot.createOperator(
				this.context,
				x1+(spaceX/4),
				y1+(spaceY/4)+50,
				60,
				"#ff5733",
				"NOT"
			));

			// and group (toand, toand2, opand)
			var x2 = x1+(spaceX/4);
			var y2 = y1+(spaceY/4)+100;

			var toand = new line();
			var toand2 = new line();
			if (i < 4) {
				this.extra.push(toand.createLine(
					this.context,
					x2+50,
					y2,
					x2+50,
					y2-150
				));

				this.extra.push(toand2.createLine(
					this.context,
					x2+50,
					y2-150,
					padding+posX+37.5+spaceX,
					y2-150
				));
			} else {
				this.extra.push(toand.createLine(
					this.context,
					x2+50,
					y2,
					x2+50,
					y2-175
				));

				this.extra.push(toand2.createLine(
					this.context,
					x2+50,
					y2-175,
					padding+37.5,
					y2-175
				));
			}

			var opand = new operator();
			this.extra.push(opand.createOperator(
				this.context,
				x2+25,
				y2+12.5,
				60,
				"#6aff75",
				"AND"
			));

			// xor group (toxor, opxor)
			var x3 = x2+spaceX+25;
			var y3 = y2+42.5;

			var toxor = new line();
			if (i < 4) {
				this.extra.push(toxor.createLine(
					this.context,
					x3,
					y3,
					x1,
					y1+(spaceY/4*3)-30
				));
			} else {
				this.extra.push(toxor.createLine(
					this.context,
					padding+37.5+(spaceX/4)+25,
					y3,
					x1,
					y1+(spaceY/4*3)-30
				));
			}

			var opxor = new operator();
			this.extra.push(opxor.createOperator(
				this.context,
				x1,
				y1+(spaceY/4*3),
				60,
				"#ffd66a",
				"XOR"
			));
		}

		// draw cubes on right
		
		// 60 fps update loop
		this.update();
		this.refresh = setInterval(this.update,1000/60);
		
		// start animation
		this.animate(0, 0.5, 500);
	}

	this.showRightCubes = function(i, op) {
		// animation settings
		var delay = 1000;
		var s = 0.5;
		var g = 500;

		var k = i;
		var a = k%5;
		var b = (k+1)%5;
		var c = (k+2)%5;

		var posX = 5 * spaceX + padding;
		var posY = 0.5 * spaceY;

		if (op != "NOT") {
			var aText;
			var bText;

			if (op == "AND") {
				aText = this.object[b][0].text;
				bText = this.object[c][0].text;
			} else if (op == "XOR") {
				aText = this.object[a][0].text;
				bText = this.object[b][0].text;
			}

			// draw 2 cubes
			var a = new cube();
			index.rcubes.push(a.createCube(
				this.context,
				padding+posX,
				padding+posY,
				40,
				"#FFF000",
				aText
			));

			posX += spaceX*2;
			var b = new cube();
			index.rcubes.push(b.createCube(
				this.context,
				padding+posX,
				padding+posY,
				40,
				"#FFF000",
				bText
			));
		} else {
			// draw 1 cube
			var a = new cube();
			index.rcubes.push(a.createCube(
				this.context,
				padding+posX,
				padding+posY,
				40,
				"#FFF000",
				this.object[b][0].text
			));
		}
		posX = 6 * spaceX + padding;

		// result cube	
		var r = new cube();
		index.rcubes.push(r.createCube(
			this.context,
			padding+posX,
			padding+posY,
			40,
			"#FFF000",
			"result"
		));
		
		posY += 5;

		// draw operator
		var o = new operator();
		index.rcubes.push(o.createOperator(
			this.context,
			padding+posX+25,
			padding+posY,
			90,
			"#ffffff",
			op
		));

		// go into operator
		setTimeout(function(){
			index.rcubes[0].moveTo(index.rcubes[2].pos.x,index.rcubes[2].pos.y,s);
			index.rcubes[1].moveTo(index.rcubes[2].pos.x,index.rcubes[2].pos.y,s);
		}, delay);

		// result comes out
		delay += g;
		setTimeout(function(){
			index.rcubes[2].moveTo(index.rcubes[2].pos.x,index.rcubes[2].pos.y+spaceX,s);
		}, delay);

		// continue
		delay += 1250;
		setTimeout(function(){
			index.rcubes = [];
		}, delay);
	}

	this.animate = function(i, speed, gap)
	{
		// animation settings
		var delay = 1000;
		var s = speed;
		var g = gap;

		var k = i;
		var a = k%5;
		var b = (k+1)%5;
		var c = (k+2)%5;

		// draw 3 small cubes at a b and c
		var posX = a*spaceX+25;
		var posY = spaceY-450;
		
		var ac = new cube();
		this.indicators.push(ac.createCube(
			this.context,
			padding+posX,
			padding+posY,
			20,
			"#FFF000",
			" "
		));

		posX = b*spaceX+25;
		var bc = new cube();
		this.indicators.push(bc.createCube(
			this.context,
			padding+posX,
			padding+posY,
			20,
			"#FFF000",
			" "
		));

		posX = c*spaceX+25;
		var cc = new cube();
		this.indicators.push(cc.createCube(
			this.context,
			padding+posX,
			padding+posY,
			20,
			"#FFF000",
			" "
		));

		/*
		starts from 0
		a = 4
		b = 0
		c = 1
		b -> NOT b
		then AND with c
		then result XOR with a
		*/
		
		setTimeout(function(){
			index.indicators[1].moveTo(index.indicators[1].pos.x,index.indicators[1].pos.y+125,s);

			if (a == 3) {
				index.indicators[2].moveTo(index.indicators[2].pos.x,index.indicators[2].pos.y+50,s);
			} else {
				index.indicators[2].moveTo(index.indicators[2].pos.x,index.indicators[2].pos.y+80,s);
			}
		}, delay);

		delay += g;
		setTimeout(function(){
			index.indicators[1].moveTo(index.indicators[1].pos.x+40,index.indicators[1].pos.y,s);

			if (a == 3) {
				index.indicators[2].moveTo(index.indicators[2].pos.x+690,index.indicators[2].pos.y,s);
			} else {
				index.indicators[2].moveTo(index.indicators[2].pos.x-65,index.indicators[2].pos.y,s);
			}
		}, delay);
		
		delay += g;
		setTimeout(function(){
			index.indicators[1].moveTo(index.indicators[1].pos.x,index.indicators[1].pos.y+110,s);
			if (a == 3) {
				index.indicators[2].moveTo(index.indicators[2].pos.x,index.indicators[2].pos.y+190,s);
			} else {
				index.indicators[2].moveTo(index.indicators[2].pos.x,index.indicators[2].pos.y+160,s);
			}
		}, delay);
		
		delay += g;
		setTimeout(function(){
			index.indicators[1].moveTo(index.indicators[1].pos.x+25,index.indicators[1].pos.y,s);
			index.indicators[2].moveTo(index.indicators[2].pos.x-30,index.indicators[2].pos.y,s);

			// show right cubes here (AND)
			index.showRightCubes(k, "AND");
		}, delay);

		delay += 3000;
		setTimeout(function(){
			index.indicators[0].moveTo(index.indicators[0].pos.x,index.indicators[0].pos.y+360,s);
			index.indicators[1].moveTo(index.indicators[0].pos.x,index.indicators[0].pos.y+360,s);

			// show right cubes here (XOR)
			index.showRightCubes(k, "XOR");
		}, delay);

		delay += 3000;
		setTimeout(function(){
			index.indicators[0].moveTo(index.indicators[0].pos.x,index.indicators[0].pos.y+100,s);
		}, delay);

		// start next set in series
		delay += g;
		setTimeout(function(){
			index.indicators = [];

			if (k < 4) {
				index.animate(k+1, 0.5, 500);
			} else {
				clearInterval(this.refresh);
			}
		}, delay);
	}
	
	// loop
	this.update = function()
	{
		time.updateTime();
		
		render.update();
	}
}

index.init();