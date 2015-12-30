var chi = new function()
{
	this.canvas;
	this.context;
	this.input = new Array();
	this.object = new Array();
	this.extra = new Array();
	this.indicators = new Array();
	this.rcubes = new Array();

	this.refresh;

	var padding = 25;
	var spaceX = 150;
	var spaceY = 500;
	
	this.init = function(i)
	{
		this.canvas = document.getElementById("keccakCanvas");
		this.context = this.canvas.getContext("2d");
		this.context.font = "18px arial";

		this.input = i;

    	// resize the canvas to fill browser window dynamically
		/*
		window.addEventListener('resize', resizeCanvas, false);

		function resizeCanvas() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}
		resizeCanvas();
		*/

		// start by showing state
		this.showState();
		
		// 60 fps update loop
		this.update();
		this.refresh = setInterval(this.update,1000/60);
	}

	this.showState = function() {
		//create new slice with specific ordering
		for (var i = 0; i < 5; ++i)
		{
			this.object.push(new Array());

			for (var j = 0; j < 5; ++j)
			{
				var posX = ((i + 2) % 5) * 50;
				var posY = ((j + 2) % 5) * 50;
				var a = new cube();
				this.object[i].push(a.createCube(
					this.context,
					515+posX,
					275+posY,
					50,
					"#8ED6FF",
					" ",
					1
				));
			}
		}

		// start animation
		this.animateState(0, 0.5, 600);
	}

	this.showOperations = function() {
		// create 10 cubes
		for (var i = 0; i < 5; ++i)
		{
			this.object.push(new Array());

			for (var j = 0; j < 2; ++j)
			{
				var posX = i * spaceX;
				var posY = j * spaceY;
				var a = new cube();
				this.object[i].push(a.createCube(
					this.context,
					padding+posX,
					padding+posY,
					50,
					"#8ED6FF",
					chi.input[i][j*4],
					1
				));
			}
		}
		
		for(var i=0;i<5;++i) {
			var posX = i * spaceX;

			// straight vertical line
			var v = new line();
			this.extra.push(v.createLine(
				this.context,
				padding+posX+37.5,
				padding+50,
				padding+posX+37.5,
				padding+spaceY-12.5
			));

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
	}

	this.showRightCubes = function(i, op) {
		// animation settings
		var delay = 1000;
		var s = 0.5;
		var g = 500;

		var k = i%5;
		var a = k%5;
		var b = (k+1)%5;
		var c = (k+2)%5;

		var posX = 5 * spaceX + padding;
		var posY = 0.5 * spaceY;

		if (op != "NOT") {
			var aText;
			var bText;
			var rText;

			if (op == "AND") {
				aText = this.input[a][1];
				bText = this.input[a][2];
				rText = this.input[a][3];
			} else if (op == "XOR") {
				aText = this.input[a][0];
				bText = this.input[a][3];
				rText = this.input[a][4];
			}

			// draw 2 cubes
			var a = new cube();
			chi.rcubes.push(a.createCube(
				this.context,
				padding+posX,
				padding+posY,
				40,
				"#FFF000",
				aText,
				1
			));

			posX += spaceX*2;
			var b = new cube();
			chi.rcubes.push(b.createCube(
				this.context,
				padding+posX,
				padding+posY,
				40,
				"#FFF000",
				bText,
				1
			));

			posX = 6 * spaceX + padding;

			// result cube	
			var r = new cube();
			chi.rcubes.push(r.createCube(
				this.context,
				padding+posX,
				padding+posY,
				40,
				"#FFF000",
				rText,
				1
			));
		} else {
			// draw 1 cube
			var a = new cube();
			chi.rcubes.push(a.createCube(
				this.context,
				padding+posX,
				padding+posY,
				40,
				"#FFF000",
				this.object[b][0].text,
				1
			));

			posX = 6 * spaceX + padding;
		}
		
		posY += 5;

		// draw operator
		var o = new operator();
		chi.rcubes.push(o.createOperator(
			this.context,
			padding+posX+25,
			padding+posY,
			90,
			"#ffffff",
			op
		));

		// go into operator
		setTimeout(function(){
			chi.rcubes[0].moveTo(chi.rcubes[2].pos.x,chi.rcubes[2].pos.y,s);
			chi.rcubes[1].moveTo(chi.rcubes[2].pos.x,chi.rcubes[2].pos.y,s);
		}, delay);

		// result comes out
		delay += g;
		setTimeout(function(){
			chi.rcubes[2].moveTo(chi.rcubes[2].pos.x,chi.rcubes[2].pos.y+spaceX,s);
		}, delay);

		// continue
		delay += 1250;
		setTimeout(function(){
			chi.rcubes = [];
		}, delay);
	}
	
	this.animateState = function(y, s, g)
	{
		// animation settings
		var delay = 1000;

		// we want middle row (y = 0), so:
		// this.object[3][0]
		// this.object[4][0]
		// this.object[0][0]
		// this.object[1][0]
		// this.object[2][0]

		setTimeout(function(){
			// set opacity of all unneeded cubes to 0.25
			for (var i = 0; i < 5; ++i)
			{
				for (var j = 0; j < 5; ++j)
				{
					if (j != 0) {
						chi.object[i][j].alpha = 0.25;
					}
				}
			}
		}, delay);

		delay += g;
		setTimeout(function(){
			// move all needed cubes on x axis
			for (var i = 0; i < 5; ++i)
			{
				var posX = ((i+2)%5) * spaceX;
				chi.object[i][0].moveTo(padding+posX,chi.object[i][0].pos.y,s);
			}
		}, delay);

		delay += g;
		setTimeout(function(){
			// move all needed cubes on y axis
			for (var i = 0; i < 5; ++i)
			{
				chi.object[i][0].moveTo(chi.object[i][0].pos.x,padding,s);
			}
		}, delay);

		delay += g*2;
		setTimeout(function(){
			// clear all 25 cubes
			for (var i = 0; i < 5; ++i)
			{
				chi.object[i] = [];
			}

			// replace with operations scene
			chi.showOperations();
		}, delay);

		delay += g;
		setTimeout(function(){
			// start animation of operations
			chi.animateOperations(0, s, g);
		}, delay);
	}

	this.animateOperations = function(i, speed, gap)
	{
		// animation settings
		var delay = 1000;
		var s = speed;
		var g = gap;

		var k = (i+2)%5;
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
			" ",
			1
		));

		posX = b*spaceX+25;
		var bc = new cube();
		this.indicators.push(bc.createCube(
			this.context,
			padding+posX,
			padding+posY,
			20,
			"#FFF000",
			" ",
			1
		));

		posX = c*spaceX+25;
		var cc = new cube();
		this.indicators.push(cc.createCube(
			this.context,
			padding+posX,
			padding+posY,
			20,
			"#FFF000",
			" ",
			1
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
			chi.indicators[1].moveTo(chi.indicators[1].pos.x,chi.indicators[1].pos.y+125,s);

			if (a == 3) {
				chi.indicators[2].moveTo(chi.indicators[2].pos.x,chi.indicators[2].pos.y+50,s);
			} else {
				chi.indicators[2].moveTo(chi.indicators[2].pos.x,chi.indicators[2].pos.y+80,s);
			}
		}, delay);

		delay += g;
		setTimeout(function(){
			chi.indicators[1].moveTo(chi.indicators[1].pos.x+40,chi.indicators[1].pos.y,s);

			if (a == 3) {
				chi.indicators[2].moveTo(chi.indicators[2].pos.x+690,chi.indicators[2].pos.y,s);
			} else {
				chi.indicators[2].moveTo(chi.indicators[2].pos.x-65,chi.indicators[2].pos.y,s);
			}
		}, delay);
		
		delay += g;
		setTimeout(function(){
			chi.indicators[1].moveTo(chi.indicators[1].pos.x,chi.indicators[1].pos.y+110,s);
			if (a == 3) {
				chi.indicators[2].moveTo(chi.indicators[2].pos.x,chi.indicators[2].pos.y+190,s);
			} else {
				chi.indicators[2].moveTo(chi.indicators[2].pos.x,chi.indicators[2].pos.y+160,s);
			}
		}, delay);
		
		delay += g;
		setTimeout(function(){
			chi.indicators[1].moveTo(chi.indicators[1].pos.x+25,chi.indicators[1].pos.y,s);
			chi.indicators[2].moveTo(chi.indicators[2].pos.x-30,chi.indicators[2].pos.y,s);

			// show right cubes here (AND)
			chi.showRightCubes(k, "AND");
		}, delay);

		delay += 3000;
		setTimeout(function(){
			chi.indicators[0].moveTo(chi.indicators[0].pos.x,chi.indicators[0].pos.y+360,s);
			chi.indicators[1].moveTo(chi.indicators[0].pos.x,chi.indicators[0].pos.y+360,s);

			// show right cubes here (XOR)
			chi.showRightCubes(k, "XOR");
		}, delay);

		delay += 3000;
		setTimeout(function(){
			chi.indicators[0].moveTo(chi.indicators[0].pos.x,chi.indicators[0].pos.y+100,s);
		}, delay);

		// start next set in series
		delay += g;
		setTimeout(function(){
			chi.indicators = [];

			if (i < 4) {
				chi.animateOperations(i+1, 0.5, 500);
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