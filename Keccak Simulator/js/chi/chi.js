var chi = new function()
{
	this.canvas;
	this.context;

	// track moving object
	this.speedMultiplier = 1;
	this.currentPhase = 0;
	this.hitCounter = 0;
	this.targetCounter = 0;

	// animation sets
	this.cubes = new Array();
	this.dialogs = new Array();
	this.lines = new Array();
	this.operators = new Array();
	this.indicators = new Array(); // yellow cubes
	this.slices = new Array();
	this.tables = new Array();
	
	
	//ERIC: all timeouts will be stored here, when the game is pause,
	// all setTimeout(Timer function in util.js) will be handle in that function
	this.currentTimeout = new Array();
	this.object = new Array();
	this.sortedObject = new Array();
	
	// animation break points
	this.step_array = [0, 4, 11, 18, 25, 32, 39, 42];

	// storage
	this.input = new Array();

	// animation timers
	this.refresh;

	var names = ["D", "E", "A", "B", "C"];
	var pnames = [["D'", "E'", "A'", "B'", "C'"],
		["I'", "J'", "F'", "G'", "H'"],
		["N'", "O'", "K'", "L'", "M'"],
		["S'", "T'", "P'", "Q'", "R'"],
		["X'", "Y'", "U'", "V'", "W'"],
	];
	
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
			"The Chi function operates on a single row at a time, starting from the middle row"
		));
		
		// 60 fps update loop
		this.update();
		this.refresh = setInterval(this.update,1000/60);

		// start by showing state
		this.playAnimationPhase(this.currentPhase); // Play 0
	}
	
	//ERIC: Called when user skip this chi steps,
	// remove/reinitialise object so that it will not continue running
	this.stop = function()
	{	
		this.pause();
		clearInterval(this.refresh);
		
		for(var i=0; i<this.currentTimeout.length; i++)
		{
			this.currentTimeout[i].remove();
		}
		
		this.currentPhase = 0;
		this.hitCounter = 0;
		this.targetCounter = 0;
		
		this.cubes = new Array();
		this.dialogs = new Array();
		this.lines = new Array();
		this.operators = new Array();
		this.indicators = new Array(); // yellow cubes
		this.slices = new Array();
		this.tables = new Array();
		
		this.currentTimeout = new Array();
		this.object = new Array();
		this.sortedObject = new Array();
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	}
	
	//ERIC: Handle pause here
	// For each of the objects created, call pause to stop their updates (movement, etc)
	this.pause = function()
	{
		clearInterval(this.refresh);
		
		var len = Math.max(this.cubes.length,this.lines.length,this.operators.length,this.indicators.length,this.slices,this.currentTimeout.length);
		
		console.log(this.cubes);
		for(var i=0; i<len; i++)
		{
			if(this.cubes[i])
			{
				if(this.cubes[i].length > 0)
				{
					for(var j=0; j<this.cubes[i].length; j++)
					{
						this.cubes[i][j].pause();
					}
				}
				else
				{
					this.cubes[i].pause();
				}
			}
			if(this.lines[i])
				this.lines[i].pause();
			if(this.operators[i])
				this.operators[i].pause();
			if(this.indicators[i])
				this.indicators[i].pause();		
			if(this.slices[i])
				this.slices[i].pause();			
			if(this.currentTimeout[i])
				this.currentTimeout[i].pause();			
		}
	}
	
	//ERIC: Handle resume here
	// For each of the objects created, call resume to continue their updates (movement, etc)
	this.resume = function()
	{
		this.refresh = setInterval(this.update,1000/60);
		
		var len = Math.max(this.cubes.length,this.lines.length,this.operators.length,this.indicators.length,this.slices,this.currentTimeout.length);
		for(var i=0; i<len; i++)
		{
			if(this.cubes[i])
			{
				if(this.cubes[i].length > 0)
				{
					for(var j=0; j<this.cubes[i].length; j++)
					{
						this.cubes[i][j].resume();
					}
				}
				else
				{
					this.cubes[i].resume();
				}
			}
			if(this.lines[i])
				this.lines[i].resume();
			if(this.operators[i])
				this.operators[i].resume();
			if(this.indicators[i])
				this.indicators[i].resume();	
			if(this.slices[i])
				this.slices[i].resume();				
			if(this.currentTimeout[i])
				this.currentTimeout[i].resume();			
		}
	}

	// loop
	this.update = function()
	{
		time.updateTime();
		
		chi_render.update();
	}
	
	this.showState = function() {
		//console.log("showState");

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
		this.currentTimeout.push(new Timer(function() {
			chi.playAnimationPhase(++chi.currentPhase);
		}, 1000*this.speedMultiplier));
	}

	this.moveState = function()
	{
		//console.log("moveState");

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

		this.currentTimeout.push(new Timer(function(){
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

		}, 1000*this.speedMultiplier));
	}

	this.clearSlice = function() {
		// replace with operations scene
		this.currentTimeout.push(new Timer(function() {
			chi.playAnimationPhase(++chi.currentPhase);
		}, 1000*this.speedMultiplier));
	}

	this.showOperations = function() {
		//console.log("showing operations");

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

		this.currentTimeout.push(new Timer(function() {
			// start animation of operations
			chi.playAnimationPhase(++chi.currentPhase);
		}, 1000*this.speedMultiplier));
	}

	this.animateOperations = function(index) {
		//console.log("animating operations for "+this.index);

		this.indicators = [];
		this.tables = [];
		
		var k = (index+2)%5;
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
		var tableInput = [[names[a], "Default value"],
			["NOT "+names[b], ""],
			["NOT "+names[b]+" AND "+names[c], ""],
			["NOT "+names[b]+" AND "+names[c]+" XOR "+names[a], ""],
			[names[a]+"'", ""],
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

		this.currentTimeout.push(new Timer(function() {
			chi.playAnimationPhase(++chi.currentPhase);
		}, 1000*this.speedMultiplier));
	}

	this.moveBC1 = function(index) {
		//console.log("moveBC1");

		chi.targetCounter = 2;

		chi.indicators[1].moveTo(
			chi.indicators[1].pos.x,
			padding+50+(spaceY/4),
			0.5,
			chi.objectHitTarget
		);

		var a = (index+2)%5;
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

	this.moveBC2 = function(index) {
		//console.log("moveBC2");

		chi.targetCounter = 2;

		chi.indicators[1].moveTo(
			chi.indicators[1].pos.x+40,
			chi.indicators[1].pos.y,
			0.5,
			chi.objectHitTarget
		);

		var a = (index+2)%5;
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

	this.moveBC3 = function(index) {
		//console.log("moveBC3");

		chi.targetCounter = 2;
		
		chi.indicators[1].moveTo(
			chi.indicators[1].pos.x,
			chi.indicators[1].pos.y+110,
			0.5,
			chi.objectHitTarget
		);

		var a = (index+2)%5;
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

	this.moveBC4 = function(index) {
		//console.log("moveBC4");

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

	this.moveAB = function(index) {
		//console.log("moveAB");

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

	this.moveA = function(index) {
		//console.log("moveA");

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

	this.moveUpdatedRow = function() {
		//console.log("moveUpdatedRow");

		// take results (primes), store in temp
		var temp = new Array();
		for (var i = 0; i<5; ++i) {
			temp.push(this.cubes[i][1]);
			//console.log(temp[i].text);
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

		// move cubes to 1 row
		chi.targetCounter = 5;

		for (var i = 0; i<5; ++i) {
			this.cubes[0][i].moveTo(
				250+(i*50),
				275,
				0.5,
				chi.objectHitTarget
			);
		}
	}

	this.showUpdatedRow = function() {
		//console.log("showUpdatedRow");

		// change dialog msg
		this.dialogs[0].setMessage(this.context, "The row is then replaced with the computed results of each of the cubes (A', B', C', D', E').");

		// show table of updated values
		var tableInput = [["D'", ""],
			["E'", ""],
			["A'", ""],
			["B'", ""],
			["C'", ""]
		];

		var t = new table();
		this.tables.push(t.createTable(
			this.context,
			4*spaceX+2*padding,
			0.5*spaceY,
			tableInput
		));

		this.currentTimeout.push(new Timer(function(){
			chi.playAnimationPhase(++chi.currentPhase);
		}, 3000*this.speedMultiplier));
	}

	this.moveBack = function() {
		//console.log("moveBack");

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
		//console.log("showRepeat");

		// change dialog msg
		this.dialogs[0].setMessage(this.context, "The process is then repeated for the other 4 rows in the state.");

		// show row numbers
		for (var i = 0; i < 5; ++i) {
			var index = ((-i+7)%5);
			var s = new string();
			this.indicators.push(s.createString(
				this.context,
				this.slices[0].cubes[0][0].pos.x-25,
				this.slices[0].cubes[0][i].pos.y+32,
				"sans-serif, serif",
				16,
				"#000000",
				1,
				""+index
			));
		}

		// unshow primes
		this.cubes[0] = [];
		
		// mark slice
		for (var i = 0; i<5; ++i) {
			chi.slices[0].cubes[i][2].text = pnames[0][i];
			chi.slices[0].cubes[i][2].alpha = 1;
		}

		this.currentTimeout.push(new Timer(function(){
			chi.playAnimationPhase(++chi.currentPhase);
		}, 1000*this.speedMultiplier));
	}

	this.showOne = function() {
		//console.log("showOne");

		// mark slice
		for (var i = 0; i<5; ++i) {
			chi.slices[0].cubes[i][1].text = pnames[1][i];
			chi.slices[0].cubes[i][1].alpha = 1;
		}

		this.currentTimeout.push(new Timer(function(){
			chi.playAnimationPhase(++chi.currentPhase);
		}, 1000*this.speedMultiplier));
	}

	this.showTwo = function() {
		//console.log("showTwo");

		// mark slice
		for (var i = 0; i<5; ++i) {
			chi.slices[0].cubes[i][0].text = pnames[2][i];
			chi.slices[0].cubes[i][0].alpha = 1;
		}

		this.currentTimeout.push(new Timer(function(){
			chi.playAnimationPhase(++chi.currentPhase);
		}, 1000*this.speedMultiplier));
	}

	this.showThree = function() {
		//console.log("showThree");

		// mark slice
		for (var i = 0; i<5; ++i) {
			chi.slices[0].cubes[i][4].text = pnames[3][i];
			chi.slices[0].cubes[i][4].alpha = 1;
		}

		this.currentTimeout.push(new Timer(function(){
			chi.playAnimationPhase(++chi.currentPhase);
		}, 1000*this.speedMultiplier));
	}

	this.showFour = function() {
		//console.log("showFour");

		// mark slice
		for (var i = 0; i<5; ++i) {
			chi.slices[0].cubes[i][3].text = pnames[4][i];
			chi.slices[0].cubes[i][3].alpha = 1;
		}
		
		this.currentTimeout.push(new Timer(function(){
			chi.playAnimationPhase(++chi.currentPhase);
		}, 5000*this.speedMultiplier));
	}

	this.end = function() {
		//console.log("end");

		// change dialog msg
		this.dialogs[0].setMessage(this.context, "");

		// clear indicators
		this.indicators = [];

		// clear slice text
		for (var i = 0; i<5; ++i) {
			for (var j = 0; j<5; ++j) {
				chi.slices[0].cubes[i][j].text = "";
			}
		}
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
		console.log("Play: " + phase);
		
		//ERIC: If only its a new step, remove all previously created objects
		if(this.step_array.indexOf(phase) > -1)
		{
			for(var i=0; i<this.currentTimeout.length; i++)
			{
				this.currentTimeout[i].remove();
			}
			
			//ERIC: Please determine what to reinitialise on each critical steps
			// this.cubes = new Array();
			// this.dialogs = new Array();
			// this.lines = new Array();
			// this.operators = new Array();
			// this.indicators = new Array(); // yellow cubes
			// this.slices = new Array();
			// this.tables = new Array();
			this.currentTimeout = new Array();
		}
		
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
				this.animateOperations(0); // and show table
				break;
			case 5:
				this.moveBC1(0);
				break;
			case 6:
				this.moveBC2(0);
				break;
			case 7:
				this.moveBC3(0);
				break;
			case 8:
				this.moveBC4(0);
				break;
			case 9:
				this.moveAB(0);
				break;
			case 10:
				this.moveA(0);
				break;
			case 11:
				this.animateOperations(1); // and show table
				break;
			case 12:
				this.moveBC1(1);
				break;
			case 13:
				this.moveBC2(1);
				break;
			case 14:
				this.moveBC3(1);
				break;
			case 15:
				this.moveBC4(1);
				break;
			case 16:
				this.moveAB(1);
				break;
			case 17:
				this.moveA(1);
				break;
			case 18:
				this.animateOperations(2); // and show table
				break;
			case 19:
				this.moveBC1(2);
				break;
			case 20:
				this.moveBC2(2);
				break;
			case 21:
				this.moveBC3(2);
				break;
			case 22:
				this.moveBC4(2);
				break;
			case 23:
				this.moveAB(2);
				break;
			case 24:
				this.moveA(2);
				break;
			case 25:
				this.animateOperations(3); // and show table
				break;
			case 26:
				this.moveBC1(3);
				break;
			case 27:
				this.moveBC2(3);
				break;
			case 28:
				this.moveBC3(3);
				break;
			case 29:
				this.moveBC4(3);
				break;
			case 30:
				this.moveAB(3);
				break;
			case 31:
				this.moveA(3);
				break;
			case 32:
				this.animateOperations(4); // and show table
				break;
			case 33:
				this.moveBC1(4);
				break;
			case 34:
				this.moveBC2(4);
				break;
			case 35:
				this.moveBC3(4);
				break;
			case 36:
				this.moveBC4(4);
				break;
			case 37:
				this.moveAB(4);
				break;
			case 38:
				this.moveA(4);
				break;
			case 39:
				this.moveUpdatedRow();
				break;
			case 40:
				this.showUpdatedRow();
				break;
			case 41:
				this.moveBack();
				break;
			case 42:
				this.showRepeat();
				break;
			case 43:
				this.showOne();
				break;
			case 44:
				this.showTwo();
				break;
			case 45:
				this.showThree();
				break;
			case 46:
				this.showFour();
				break;
			case 47:
				this.end();
				break;
		}
	}
}