var chi = new function()
{
	this.canvas;
	this.context;

	// track moving object
	this.speedMultiplier = 1;
	this.currentPhase = 0;
	this.hitCounter = 0;
	this.targetCounter = 0;
	this.index = 0;

	// animation sets
	this.cubes = new Array();
	this.dialogs = new Array();
	this.lines = new Array();
	this.operators = new Array();
	this.indicators = new Array(); // yellow cubes
	this.slices = new Array();
	this.tables = new Array();
	
	// storage
	this.input = new Array();

	// animation timers
	this.refresh;
	
	// display settings	
	var padding = 25;
	var spaceX = 150;
	var spaceY = 450;
	
	this.init = function(input)
	{
		this.canvas = document.getElementById("keccakCanvas");
		this.context = this.canvas.getContext("2d");
		this.context.font = "18px arial";

		this.input = input;

		// create dialog box
		var d = new dialog();
		this.dialogs.push(d.createDialog(
			this.context,
			"The Chi function operates on a single row at a time, starting from the middle most row"
		));
		
		// 60 fps update loop
		this.update();
		this.refresh = setInterval(this.update,1000/60);

		// start by showing state
		this.playAnimationPhase(this.currentPhase); // Play 0
	}
	
	this.showState = function() {
		console.log("showState");

		// draw state
		var filler = new Array();
		for (var i=0; i<25; ++i) {
			filler.push("");
		}

		var s = new slice();
		this.slices.push(s.createSlice(
			this.context,
			515,
			175,
			50,
			"#8ED6FF",
			1,
			filler
		));

		// start animation
		setTimeout(function() {
			chi.playAnimationPhase(++chi.currentPhase);
		}, 1000*this.speedMultiplier);
	}

	this.moveState = function()
	{
		console.log("moveState");

		// we want middle row (y = 0), so:
		// this.cubes[3][0]
		// this.cubes[4][0]
		// this.cubes[0][0]
		// this.cubes[1][0]
		// this.cubes[2][0]
		
		// set opacity of all unneeded cubes to 0.25
		chi.slices[0].cubes = arrayToState(chi.slices[0].cubes);
		for (var i = 0; i < 5; ++i) {
			for (var j = 0; j < 5; ++j) {
				if (j != 0) {
					this.slices[0].cubes[i][j].alpha = 0.25;
				}
			}
		}
		chi.slices[0].cubes = stateToArray(chi.slices[0].cubes);

		setTimeout(function(){
			chi.targetCounter = 5;
			
			// move all needed cubes on x axis
			chi.slices[0].cubes = arrayToState(chi.slices[0].cubes);
			for (var i=0; i<5; ++i) {
				var posX = ((i+2)%5) * spaceX;
				chi.slices[0].cubes[i][0].moveTo(
					padding+posX,
					padding,
					0.5,
					chi.objectHitTarget
				);
			}
			chi.slices[0].cubes = stateToArray(chi.slices[0].cubes);

		}, 1000*this.speedMultiplier);
	}

	this.clearSlice = function() {
		// replace with operations scene
		setTimeout(function() {
			chi.playAnimationPhase(++chi.currentPhase);
		}, 1000*this.speedMultiplier);
	}

	this.showOperations = function() {
		console.log("showing operations");

		// update dialog box
		this.dialogs[0].setMessage(this.context, "For each \"cube\" (A, B, C, D, E) in the row, 2 other succeeding cubes are used along with NOT, AND and XOR bitwise operations to calculate the final value, marked with prime (A', B', C', D', E').");

		chi.slices = [];

		// create 10 cubes
		// gonna change this to grouped operations
		var labels = [
			["D", "D'"],
			["E", "E'"],
			["A", "A'"],
			["B", "B'"],
			["C", "C'"]
		]

		for (var i = 0; i < 5; ++i) {
			this.cubes.push(new Array());

			for (var j = 0; j < 2; ++j) {
				var posX = i * spaceX;
				var posY = j * spaceY;
				var c = new cube();
				this.cubes[i].push(c.createCube(
					this.context,
					padding+posX,
					padding+posY,
					50,
					"#8ED6FF",
					1,
					labels[i][j]
				));
			}
		}
		
		for(var i=0;i<5;++i) {
			var posX = i * spaceX;

			// straight vertical line
			var v = new line();
			this.lines.push(v.createLine(
				this.context,
				padding+posX+37.5,
				padding+50,
				padding+posX+37.5,
				padding+spaceY-12.5,
				"#000000",
				1
			));

			// not group (tonot, tonot2, opnot)
			var x1 = padding+posX+37.5;
			var y1 = padding+50;

			var tonot = new line();
			this.lines.push(tonot.createLine(
				this.context,
				x1,
				y1+(spaceY/4),
				x1+(spaceX/4),
				y1+(spaceY/4),
				"#000000",
				1
			));

			var tonot2 = new line();
			this.lines.push(tonot2.createLine(
				this.context,
				x1+(spaceX/4),
				y1+(spaceY/4),
				x1+(spaceX/4),
				y1+(spaceY/4)+100,
				"#000000",
				1
			));

			var opnot = new operator();
			this.operators.push(opnot.createOperator(
				this.context,
				x1+(spaceX/4),
				y1+(spaceY/4)+50,
				60,
				"#ff5733",
				1,
				"NOT"
			));

			// and group (toand, toand2, opand)
			var x2 = x1+(spaceX/4);
			var y2 = y1+(spaceY/4)+100;

			var toand = new line();
			var toand2 = new line();
			if (i < 4) {
				this.lines.push(toand.createLine(
					this.context,
					x2+50,
					y2,
					x2+50,
					y2-150,
					"#000000",
					1
				));

				this.lines.push(toand2.createLine(
					this.context,
					x2+50,
					y2-150,
					padding+posX+37.5+spaceX,
					y2-150,
					"#000000",
					1
				));
			} else {
				this.lines.push(toand.createLine(
					this.context,
					x2+50,
					y2,
					x2+50,
					y2-175,
					"#000000",
					1
				));

				this.lines.push(toand2.createLine(
					this.context,
					x2+50,
					y2-175,
					padding+37.5,
					y2-175,
					"#000000",
					1
				));
			}

			var opand = new operator();
			this.operators.push(opand.createOperator(
				this.context,
				x2+25,
				y2+12.5,
				60,
				"#6aff75",
				1,
				"AND"
			));

			// xor group (toxor, opxor)
			var x3 = x2+spaceX+25;
			var y3 = y2+42.5;

			var toxor = new line();
			if (i < 4) {
				this.lines.push(toxor.createLine(
					this.context,
					x3,
					y3,
					x1,
					y1+(spaceY/4*3)-30,
					"#000000",
					1
				));
			} else {
				this.lines.push(toxor.createLine(
					this.context,
					padding+37.5+(spaceX/4)+25,
					y3,
					x1,
					y1+(spaceY/4*3)-30,
					"#000000",
					1
				));
			}

			var opxor = new operator();
			this.operators.push(opxor.createOperator(
				this.context,
				x1,
				y1+(spaceY/4*3),
				60,
				"#ffd66a",
				1,
				"XOR"
			));
		}

		setTimeout(function() {
			// start animation of operations
			chi.playAnimationPhase(++chi.currentPhase);
		}, 1000*this.speedMultiplier);
	}

	this.animateOperations = function() {
		console.log("animating operations for "+this.index);
		
		var k = (this.index+2)%5;
		var a = k%5;
		var b = (k+1)%5;
		var c = (k+2)%5;

		// draw 3 small cubes at a b and c
		var posX = a*spaceX+25;
		var posY = 50;
		
		var ac = new cube();
		this.indicators.push(ac.createCube(
			this.context,
			padding+posX,
			padding+posY,
			20,
			"#FFF000",
			1,
			""
		));

		posX = b*spaceX+25;
		var bc = new cube();
		this.indicators.push(bc.createCube(
			this.context,
			padding+posX,
			padding+posY,
			20,
			"#FFF000",
			1,
			""
		));

		posX = c*spaceX+25;
		var cc = new cube();
		this.indicators.push(cc.createCube(
			this.context,
			padding+posX,
			padding+posY,
			20,
			"#FFF000",
			1,
			""
		));

		// draw table
		var translate = ["E", "D", "A", "B", "C"];

		var tableInput = [[translate[a], "Default value"],
			["NOT "+translate[b], ""],
			["NOT "+translate[b]+" AND "+translate[c], ""],
			["NOT "+translate[b]+" AND "+translate[c]+" XOR "+translate[a], ""],
			[translate[a]+"'", ""],
		];

		var t = new table();
		this.tables.push(t.createTable(
			this.context,
			5*spaceX+2*padding,
			0.5*spaceY,
			tableInput
		));

		/*
		starts from 0
		a = 3
		b = 4
		c = 0
		b -> NOT b
		then AND with c
		then result XOR with a
		*/

		setTimeout(function() {
			chi.playAnimationPhase(++chi.currentPhase);
		}, 1000*this.speedMultiplier);
	}

	this.moveBC1 = function() {
		console.log("moveBC1");

		chi.targetCounter = 2;

		chi.indicators[1].moveTo(
			chi.indicators[1].pos.x,
			padding+50+(spaceY/4),
			0.5,
			chi.objectHitTarget
		);

		var a = (chi.index+2)%5;
		if (a == 3) {
			chi.indicators[2].moveTo(
				chi.indicators[2].pos.x,
				padding+(spaceY/4)-25,
				0.5,
				chi.objectHitTarget
			);
		} else {
			chi.indicators[2].moveTo(
				chi.indicators[2].pos.x,
				padding+(spaceY/4),
				0.5,
				chi.objectHitTarget
			);
		}
	}

	this.moveBC2 = function() {
		console.log("moveBC2");

		chi.targetCounter = 2;

		chi.indicators[1].moveTo(
			chi.indicators[1].pos.x+40,
			chi.indicators[1].pos.y,
			0.5,
			chi.objectHitTarget
		);

		var a = (chi.index+2)%5;
		if (a == 3) {
			chi.indicators[2].moveTo(
				chi.indicators[2].pos.x+690,
				chi.indicators[2].pos.y,
				0.5,
				chi.objectHitTarget
			);
		} else {
			chi.indicators[2].moveTo(
				chi.indicators[2].pos.x-65,
				chi.indicators[2].pos.y,
				0.5,
				chi.objectHitTarget
			);
		}
	}

	this.moveBC3 = function() {
		console.log("moveBC3");

		chi.targetCounter = 2;
		
		chi.indicators[1].moveTo(
			chi.indicators[1].pos.x,
			chi.indicators[1].pos.y+110,
			0.5,
			chi.objectHitTarget
		);

		var a = (chi.index+2)%5;
		if (a == 3) {
			chi.indicators[2].moveTo(
				chi.indicators[2].pos.x,
				chi.indicators[2].pos.y+185,
				0.5,
				chi.objectHitTarget
			);
		} else {
			chi.indicators[2].moveTo(
				chi.indicators[2].pos.x,
				chi.indicators[2].pos.y+160,
				0.5,
				chi.objectHitTarget
			);
		}

		// update table (NOT)
		var t = chi.tables[0];
		t.input[1][1] = "NOT updated";
	}

	this.moveBC4 = function() {
		console.log("moveBC4");

		chi.targetCounter = 2;
		
		chi.indicators[1].moveTo(
			chi.indicators[1].pos.x+25,
			chi.indicators[1].pos.y,
			0.5,
			chi.objectHitTarget
		);
		chi.indicators[2].moveTo(
			chi.indicators[2].pos.x-30,
			chi.indicators[2].pos.y,
			0.5,
			chi.objectHitTarget
		);
		
		// update table (AND)
		var t = chi.tables[0];
		t.input[2][1] = "AND updated";
	}

	this.moveAB = function() {
		console.log("moveAB");

		chi.targetCounter = 2;
		
		chi.indicators[0].moveTo(
			chi.indicators[0].pos.x,
			padding+50+(spaceY/4*3),
			0.5,
			chi.objectHitTarget
		);
		chi.indicators[1].moveTo(
			chi.indicators[0].pos.x,
			padding+50+(spaceY/4*3),
			0.5,
			chi.objectHitTarget
		);
		
		// update table (XOR)
		var t = chi.tables[0];
		t.input[3][1] = "XOR updated";
	}

	this.moveA = function() {
		console.log("moveA");

		chi.targetCounter = 1;
		
		chi.indicators[0].moveTo(
			chi.indicators[0].pos.x,
			padding+spaceY,
			0.5,
			chi.objectHitTarget
		);

		// update table (A')
		var t = chi.tables[0];
		t.input[4][1] = "prime updated";
	}

	this.nextSet = function() {
		console.log("nextSet");

		// start next set in series
		setTimeout(function(){
			chi.indicators = [];
			chi.tables = [];

			if (chi.index < 4) {
				chi.index += 1;
				chi.currentPhase = 4;
				chi.animateOperations();
			} else {
				chi.playAnimationPhase(++chi.currentPhase);
			}
		}, 1000*this.speedMultiplier);
	}

	this.showUpdatedRow = function() {
		console.log("showUpdatedRow");

		// change dialog msg
		this.dialogs[0].setMessage(this.context, "The row is then replaced with the computed results of each of the cubes (A', B', C', D', E').");

		// take results (primes), store in temp
		var temp = new Array();
		for (var i = 0; i<5; ++i) {
			temp.push(this.cubes[i][1]);
			console.log(temp[i].text);
		}

		// flush cubes array, and operations
		for (var i = 0; i<5; ++i) {
			this.cubes[i] = [];
		}
		this.cubes = [];
		this.operators = [];
		this.lines = [];
		this.indicators = [];
		this.tables = [];

		this.cubes = new Array();
		this.cubes.push(new Array());

		this.cubes[0] = temp;

		// show table of updated values
		var tableInput = [["E'", ""],
			["D'", ""],
			["A'", ""],
			["B'", ""],
			["C'", ""]
		];

		var t = new table();
		this.tables.push(t.createTable(
			this.context,
			5*spaceX+2*padding,
			0.5*spaceY,
			tableInput
		));

		setTimeout(function(){
			chi.playAnimationPhase(++chi.currentPhase);
		}, 3000*this.speedMultiplier);
	}

	this.moveBack = function() {
		console.log("moveBack");

		// wipe table
		this.tables = [];

		// show state
		var filler = new Array();
		for (var i=0; i<25; ++i) {
			filler.push("");
		}

		var s = new slice();
		this.slices.push(s.createSlice(
			this.context,
			515,
			175,
			50,
			"#8ED6FF",
			0.5,
			filler
		));

		// move cubes to state
		chi.targetCounter = 5;

		for (var i = 0; i<5; ++i) {
			this.cubes[0][i].moveTo(
				chi.slices[0].cubes[i][2].pos.x,
				chi.slices[0].cubes[i][2].pos.y,
				0.5,
				chi.objectHitTarget
			);
		}
	}

	this.showRepeat = function() {
		console.log("showRepeat");

		// change dialog msg
		this.dialogs[0].setMessage(this.context, "The process is then repeated for the other 4 rows in the state.");

		// show row numbers
		for (var i = 0; i < 5; ++i) {
			var index = ((i+2)%5);
			var s = new string();
			this.indicators.push(s.createString(
				this.context,
				this.slices[0].cubes[0][0].pos.x-25,
				this.slices[0].cubes[i][0].pos.y+32,
				"sans-serif, serif",
				16,
				"#000000",
				1,
				""+index
			));
		}

		// show repeats
	}

	// loop
	this.update = function()
	{
		time.updateTime();
		
		chi_render.update();
	}

	this.objectHitTarget = function()
	{
		++chi.hitCounter;
		
		if(chi.hitCounter >= chi.targetCounter)
		{
			chi.hitCounter = 0;
			chi.playAnimationPhase(++chi.currentPhase);
		}
	}

	// Animation phases
	this.playAnimationPhase = function(phase)
	{
		switch(phase)
		{
			case 0:
				this.showState();
				break;
			case 1:
				this.moveState();
				break;
			case 2:
				this.clearSlice();
				break;
			case 3:
				this.showOperations();
				break;
			case 4:
				this.animateOperations(); // and show table
				break;
			case 5:
				this.moveBC1();
				break;
			case 6:
				this.moveBC2();
				break;
			case 7:
				this.moveBC3();
				break;
			case 8:
				this.moveBC4();
				break;
			case 9:
				this.moveAB();
				break;
			case 10:
				this.moveA();
				break;
			case 11:
				this.nextSet();
				break;
			case 12:
				this.showUpdatedRow();
				break;
			case 13:
				this.moveBack();
				break;
			case 14:
				this.showRepeat();
				break;
		}
	}
}