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
	this.dialog;
	this.lines = new Array();
	this.operators = new Array();
	this.indicators = new Array(); // yellow cubes
	this.slices = new Array();
	this.strings = new Array();
	this.tables = new Array();
	
	//all timeouts will be stored here, when the game is pause,
	// all setTimeout(Timer function in util.js) will be handle in that function
	this.currentTimeout = new Array();
	this.object = new Array();
	this.sortedObject = new Array();
	
	// animation break points
	this.step_array = [0, 2, 10, 18, 26, 34, 42, 45];

	// animation timers
	this.refresh;

	this.names = ["D", "E", "A", "B", "C"];
	this.pnames = [["D'", "E'", "A'", "B'", "C'"],
		["I'", "J'", "F'", "G'", "H'"],
		["N'", "O'", "K'", "L'", "M'"],
		["S'", "T'", "P'", "Q'", "R'"],
		["X'", "Y'", "U'", "V'", "W'"],
	];
	
	// display settings	
	this.padding = 25;
	this.spaceX = 150;
	this.spaceY = 400;
	
	this.init = function()
	{
		this.canvas = document.getElementById("keccakCanvas");
		this.context = this.canvas.getContext("2d");
		this.context.font = "18px arial";


		// create dialog box
		var d = new dialog();
		this.dialog = d.createDialog(
			this.context,
			"The Chi function operates on a single row at a time, starting from the middle row"
		);
		audio.play("chi1");
		
		// 60 fps update loop
		this.update();
		this.refresh = setInterval(this.update,1000/60);

		// start by showing state
		this.playAnimationPhase(this.currentPhase); // Play 0
	}
	
	//Called when user skip this chi steps,
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
		this.dialog;
		this.lines = new Array();
		this.operators = new Array();
		this.indicators = new Array(); // yellow cubes
		this.slices = new Array();
		this.strings = new Array();
		this.tables = new Array();
		
		this.currentTimeout = new Array();
		this.object = new Array();
		this.sortedObject = new Array();
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	}
	
	//Handle pause here
	// For each of the objects created, call pause to stop their updates (movement, etc)
	this.pause = function()
	{
		clearInterval(this.refresh);
		
		for(var i=0; i<this.cubes.length; i++)
		{
			for(var j=0; j<this.cubes[i].length; j++)
			{
				this.cubes[i][j].pause();
			}
		}

		for(var i=0; i<this.lines.length; i++)
		{
			this.lines[i].pause();
		}
		for(var i=0; i<this.operators.length; i++)
		{
			this.operators[i].pause();
		}
		for(var i=0; i<this.indicators.length; i++)
		{
			this.indicators[i].pause();
		}
		for(var i=0; i<this.slices.length; i++)
		{
			this.slices[i].pause();
		}
		for(var i=0; i<this.strings.length; i++)
		{
			this.strings[i].pause();
		}
		for(var i=0; i<this.currentTimeout.length; i++)
		{
			this.currentTimeout[i].pause();
		}
	}
	
	//Handle resume here
	// For each of the objects created, call resume to continue their updates (movement, etc)
	this.resume = function()
	{
		this.refresh = setInterval(this.update,1000/60);

		for(var i=0; i<this.cubes.length; i++)
		{
			for(var j=0; j<this.cubes[i].length; j++)
			{
				this.cubes[i][j].resume();
			}
		}

		for(var i=0; i<this.lines.length; i++)
		{
			this.lines[i].resume();
		}
		for(var i=0; i<this.operators.length; i++)
		{
			this.operators[i].resume();
		}
		for(var i=0; i<this.indicators.length; i++)
		{
			this.indicators[i].resume();
		}
		for(var i=0; i<this.slices.length; i++)
		{
			this.slices[i].resume();
		}
		for(var i=0; i<this.strings.length; i++)
		{
			this.strings[i].resume();
		}
		for(var i=0; i<this.currentTimeout.length; i++)
		{
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
		for (var i = 0; i < 5; ++i) {
			for (var j = 0; j < 5; ++j) {
				if (j != 2) {
					this.slices[0].cubes[i][j].alpha = 0.25;
				} else {
					this.slices[0].cubes[i][j].alpha = 0;
				}
			}
		}

		// create 5 cubes
		for (var i=0; i<5; ++i) {
			var c = new cube();
			this.indicators.push(c.createCube(
				this.context,
				this.slices[0].cubes[i][2].pos.x,
				this.slices[0].cubes[i][2].pos.y,
				50,
				"#8ED6FF",
				1,
				""
			));
		}

		this.currentTimeout.push(new Timer(function(){
			chi.targetCounter = 5;
			
			// move all needed cubes on x axis
			for (var i=0; i<5; ++i) {
				chi.indicators[i].moveTo(
					chi.padding+(i*chi.spaceX),
					chi.padding,
					0.5,
					chi.objectHitTarget
				);
			}

		}, 1000*this.speedMultiplier));
	}

	this.showOperations = function() {
		//console.log("showing operations");

		// update dialog box
		this.dialog.setMessage(this.context, "For each \"cube\" (A, B, C, D, E) in the row, 2 other succeeding cubes are used along with NOT, AND and XOR bitwise operations to calculate the final value, marked with prime (A', B', C', D', E').");
		
		if (this.currentPhase == 2) {
			audio.play("chi2");
		}

		this.slices = [];
		this.indicators = [];

		// create 10 cubes
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
				var posX = i * this.spaceX;
				var posY = j * this.spaceY;
				var c = new cube();
				this.cubes[i].push(c.createCube(
					this.context,
					this.padding+posX,
					this.padding+posY,
					50,
					"#8ED6FF",
					1,
					labels[i][j]
				));
			}
		}
		
		for(var i=0;i<5;++i) {
			var posX = i * this.spaceX;

			// straight vertical line
			var v = new line();
			this.lines.push(v.createLine(
				this.context,
				this.padding+posX+37.5,
				this.padding+50,
				this.padding+posX+37.5,
				this.padding+this.spaceY-12.5,
				"#000000",
				1
			));

			// not group (tonot, tonot2, opnot)
			var x1 = this.padding+posX+37.5;
			var y1 = this.padding+50;

			var tonot = new line();
			this.lines.push(tonot.createLine(
				this.context,
				x1,
				y1+(this.spaceY/4),
				x1+(this.spaceX/4),
				y1+(this.spaceY/4),
				"#000000",
				1
			));

			var tonot2 = new line();
			this.lines.push(tonot2.createLine(
				this.context,
				x1+(this.spaceX/4),
				y1+(this.spaceY/4),
				x1+(this.spaceX/4),
				y1+(this.spaceY/4)+100,
				"#000000",
				1
			));

			var opnot = new operator();
			this.operators.push(opnot.createOperator(
				this.context,
				x1+(this.spaceX/4),
				y1+(this.spaceY/4)+50,
				60,
				"#ff5733",
				1,
				"NOT"
			));

			// and group (toand, toand2, opand)
			var x2 = x1+(this.spaceX/4);
			var y2 = y1+(this.spaceY/4)+100;

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
					this.padding+posX+37.5+this.spaceX,
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
					this.padding+37.5,
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
			var x3 = x2+this.spaceX+25;
			var y3 = y2+42.5;

			var toxor = new line();
			if (i < 4) {
				this.lines.push(toxor.createLine(
					this.context,
					x3,
					y3,
					x1,
					y1+(this.spaceY/4*3)-30,
					"#000000",
					1
				));
			} else {
				this.lines.push(toxor.createLine(
					this.context,
					this.padding+37.5+(this.spaceX/4)+25,
					y3,
					x1,
					y1+(this.spaceY/4*3)-30,
					"#000000",
					1
				));
			}

			var opxor = new operator();
			this.operators.push(opxor.createOperator(
				this.context,
				x1,
				y1+(this.spaceY/4*3),
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
		var posX = a*this.spaceX+25;
		var posY = 50;
		
		var ac = new cube();
		this.indicators.push(ac.createCube(
			this.context,
			this.padding+posX,
			this.padding+posY,
			20,
			"#FFF000",
			1,
			""
		));

		posX = b*this.spaceX+25;
		var bc = new cube();
		this.indicators.push(bc.createCube(
			this.context,
			this.padding+posX,
			this.padding+posY,
			20,
			"#FFF000",
			1,
			""
		));

		posX = c*this.spaceX+25;
		var cc = new cube();
		this.indicators.push(cc.createCube(
			this.context,
			this.padding+posX,
			this.padding+posY,
			20,
			"#FFF000",
			1,
			""
		));

		// draw table label
		var s = new string();
		this.strings.push(s.createString(
			this.context,
			5*this.spaceX+2*this.padding,
			(0.5*this.spaceY)-8,
			"sans-serif, serif",
			24,
			"#000000",
			1,
			"Computation of "+this.names[a]+"'"
		));

		// draw table
		var tableInput = [[this.names[a], KECCAK.data["absorb_round0"]["chi_step1"][index*4]],
			["NOT "+this.names[b], ""],
			["NOT "+this.names[b]+" AND "+this.names[c], ""],
			["NOT "+this.names[b]+" AND "+this.names[c]+" XOR "+this.names[a], ""],
			[this.names[a]+"'", ""],
		];

		var t = new table();
		this.tables.push(t.createTable(
			this.context,
			5*this.spaceX+2*this.padding,
			0.5*this.spaceY,
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

		this.targetCounter = 2;

		this.indicators[1].moveTo(
			this.indicators[1].pos.x,
			this.padding+50+(this.spaceY/4),
			1,
			this.objectHitTarget
		);

		var a = (index+2)%5;
		if (a == 3) {
			this.indicators[2].moveTo(
				this.indicators[2].pos.x,
				this.padding+(this.spaceY/4)-25,
				1,
				this.objectHitTarget
			);
		} else {
			this.indicators[2].moveTo(
				this.indicators[2].pos.x,
				this.padding+(this.spaceY/4),
				1,
				this.objectHitTarget
			);
		}
	}

	this.moveBC2 = function(index) {
		//console.log("moveBC2");

		this.targetCounter = 2;

		this.indicators[1].moveTo(
			this.indicators[1].pos.x+40,
			this.indicators[1].pos.y,
			1,
			this.objectHitTarget
		);

		var a = (index+2)%5;
		if (a == 3) {
			this.indicators[2].moveTo(
				this.indicators[2].pos.x+690,
				this.indicators[2].pos.y,
				1,
				this.objectHitTarget
			);
		} else {
			this.indicators[2].moveTo(
				this.indicators[2].pos.x-65,
				this.indicators[2].pos.y,
				1,
				this.objectHitTarget
			);
		}
	}

	this.moveBC3 = function(index) {
		//console.log("moveBC3");

		this.targetCounter = 2;
		
		this.indicators[1].moveTo(
			this.indicators[1].pos.x,
			this.indicators[1].pos.y+110,
			1,
			this.objectHitTarget
		);

		var a = (index+2)%5;
		if (a == 3) {
			this.indicators[2].moveTo(
				this.indicators[2].pos.x,
				this.indicators[2].pos.y+185,
				1,
				this.objectHitTarget
			);
		} else {
			this.indicators[2].moveTo(
				this.indicators[2].pos.x,
				this.indicators[2].pos.y+160,
				1,
				this.objectHitTarget
			);
		}

		// update table (NOT)
		var t = this.tables[0];
		t.input[1][1] = KECCAK.data["absorb_round0"]["chi_step1"][index*4+1];
	}

	this.moveBC4 = function(index) {
		//console.log("moveBC4");

		this.targetCounter = 2;
		
		this.indicators[1].moveTo(
			this.indicators[1].pos.x+25,
			this.indicators[1].pos.y,
			1,
			this.objectHitTarget
		);
		this.indicators[2].moveTo(
			this.indicators[2].pos.x-30,
			this.indicators[2].pos.y,
			1,
			this.objectHitTarget
		);
		
		// update table (AND)
		var t = this.tables[0];
		t.input[2][1] = KECCAK.data["absorb_round0"]["chi_step1"][index*4+2];
	}

	this.moveAB = function(index) {
		//console.log("moveAB");

		this.targetCounter = 2;
		
		this.indicators[0].moveTo(
			this.indicators[0].pos.x,
			this.padding+50+(this.spaceY/4*3),
			1,
			this.objectHitTarget
		);
		this.indicators[1].moveTo(
			this.indicators[0].pos.x,
			this.padding+50+(this.spaceY/4*3),
			1,
			this.objectHitTarget
		);
		
		// update table (XOR)
		var t = this.tables[0];
		t.input[3][1] = KECCAK.data["absorb_round0"]["chi_step1"][index*4+3];
	}

	this.moveA = function(index) {
		//console.log("moveA");

		this.targetCounter = 1;
		
		this.indicators[0].moveTo(
			this.indicators[0].pos.x,
			this.padding+this.spaceY,
			1,
			this.objectHitTarget
		);

		// update table (A')
		var t = this.tables[0];
		t.input[4][1] = KECCAK.data["absorb_round0"]["chi_step1"][index*4+3];
	}

	this.moveUpdatedRow = function() {
		//console.log("moveUpdatedRow");

		// create 5 cubes
		for (var i=0; i<5; ++i) {
			var c = new cube();
			this.indicators.push(c.createCube(
				this.context,
				this.padding+(i*this.spaceX),
				this.padding+this.spaceY,
				50,
				"#8ED6FF",
				1,
				this.pnames[0][i]
			));
		}

		// move cubes to 1 row
		this.targetCounter = 5;

		for (var i = 0; i<5; ++i) {
			this.indicators[i].moveTo(
				250+(i*50),
				275,
				0.5,
				this.objectHitTarget
			);
		}
	}

	this.showUpdatedRow = function() {
		//console.log("showUpdatedRow");

		// change dialog msg
		this.dialog.setMessage(this.context, "The row is then replaced with the computed results of each of the cubes (A', B', C', D', E').");
		audio.play("chi3");

		// show table of updated values
		var s = new string();
		this.strings.push(s.createString(
			this.context,
			4*this.spaceX+2*this.padding,
			0.5*this.spaceY-8,
			"sans-serif, serif",
			24,
			"#000000",
			1,
			"Updated Row Values"
		));

		var tableInput = [["D'", KECCAK.data["absorb_round0"]["chi_step1"][3]],
			["E'", KECCAK.data["absorb_round0"]["chi_step1"][7]],
			["A'", KECCAK.data["absorb_round0"]["chi_step1"][11]],
			["B'", KECCAK.data["absorb_round0"]["chi_step1"][15]],
			["C'", KECCAK.data["absorb_round0"]["chi_step1"][19]]
		];

		var t = new table();
		this.tables.push(t.createTable(
			this.context,
			4*this.spaceX+2*this.padding,
			0.5*this.spaceY,
			tableInput
		));

		this.currentTimeout.push(new Timer(function(){
			chi.playAnimationPhase(++chi.currentPhase);
		}, 3000*this.speedMultiplier));
	}

	this.moveBack = function() {
		//console.log("moveBack");

		// wipe table
		this.strings = new Array();
		this.tables = new Array();

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
			this.indicators[i].moveTo(
				chi.slices[0].cubes[i][2].pos.x,
				chi.slices[0].cubes[i][2].pos.y,
				0.5,
				chi.objectHitTarget
			);
		}
	}

	this.showRepeat = function() {
		//console.log("showRepeat");

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

		// change dialog msg
		this.dialog.setMessage(this.context, "The process is then repeated for the other 4 rows in the state.");
		audio.play("chi4");

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
			chi.slices[0].cubes[i][2].text = this.pnames[0][i];
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
			chi.slices[0].cubes[i][1].text = this.pnames[1][i];
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
			chi.slices[0].cubes[i][0].text = this.pnames[2][i];
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
			chi.slices[0].cubes[i][4].text = this.pnames[3][i];
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
			chi.slices[0].cubes[i][3].text = this.pnames[4][i];
			chi.slices[0].cubes[i][3].alpha = 1;
		}
		
		this.currentTimeout.push(new Timer(function(){
			chi.playAnimationPhase(++chi.currentPhase);
		}, 5000*this.speedMultiplier));
	}

	this.objectHitTarget = function()
	{
		++chi.hitCounter;
		
		if(chi.hitCounter >= chi.targetCounter)
		{
			console.log("Target hit, playing next ("+(chi.currentPhase+1)+")");
			chi.hitCounter = 0;
			chi.playAnimationPhase(++chi.currentPhase);
		}
	}

	// Animation phases
	this.playAnimationPhase = function(phase, skipAudio)
	{
		if(!skipAudio)
		{
			if(audio.durationLeft() > 0)
			{
				chi.currentTimeout.push(new Timer(chi.playAnimationPhase, (audio.durationLeft() + 2) * 1000, phase));
				return;
			}
		}
		else
		{
			audio.stop();
		}
		
		//If only its a new step, remove all previously created objects
		if(chi.step_array.indexOf(phase) > -1)
		{
			for(var i=0; i<chi.currentTimeout.length; i++)
			{
				chi.currentTimeout[i].remove();
			}
			
			//Please determine what to reinitialise on each critical steps
			chi.cubes = new Array();
			chi.lines = new Array();
			chi.operators = new Array();
			chi.indicators = new Array(); // yellow cubes
			chi.slices = new Array();
			chi.strings = new Array();
			chi.tables = new Array();

			chi.currentTimeout = new Array();
		}
		
		switch(phase)
		{
			case 0: // !
				chi.showState();
				break;
			case 1:
				chi.moveState();
				break;
			case 2: // !
				chi.showOperations();
				break;
			case 3:
				chi.animateOperations(0);
				break;
			case 4:
				chi.moveBC1(0);
				break;
			case 5:
				chi.moveBC2(0);
				break;
			case 6:
				chi.moveBC3(0);
				break;
			case 7:
				chi.moveBC4(0);
				break;
			case 8:
				chi.moveAB(0);
				break;
			case 9:
				chi.moveA(0);
				break;
			case 10: // !
				chi.showOperations();
				break;
			case 11:
				chi.animateOperations(1);
				break;
			case 12:
				chi.moveBC1(1);
				break;
			case 13:
				chi.moveBC2(1);
				break;
			case 14:
				chi.moveBC3(1);
				break;
			case 15:
				chi.moveBC4(1);
				break;
			case 16:
				chi.moveAB(1);
				break;
			case 17:
				chi.moveA(1);
				break;
			case 18: // !
				chi.showOperations();
				break;
			case 19:
				chi.animateOperations(2);
				break;
			case 20:
				chi.moveBC1(2);
				break;
			case 21:
				chi.moveBC2(2);
				break;
			case 22:
				chi.moveBC3(2);
				break;
			case 23:
				chi.moveBC4(2);
				break;
			case 24:
				chi.moveAB(2);
				break;
			case 25:
				chi.moveA(2);
				break;
			case 26: // !
				chi.showOperations();
				break;
			case 27:
				chi.animateOperations(3);
				break;
			case 28:
				chi.moveBC1(3);
				break;
			case 29:
				chi.moveBC2(3);
				break;
			case 30:
				chi.moveBC3(3);
				break;
			case 31:
				chi.moveBC4(3);
				break;
			case 32:
				chi.moveAB(3);
				break;
			case 33:
				chi.moveA(3);
				break;
			case 34: // !
				chi.showOperations();
				break;
			case 35:
				chi.animateOperations(4);
				break;
			case 36:
				chi.moveBC1(4);
				break;
			case 37:
				chi.moveBC2(4);
				break;
			case 38:
				chi.moveBC3(4);
				break;
			case 39:
				chi.moveBC4(4);
				break;
			case 40:
				chi.moveAB(4);
				break;
			case 41:
				chi.moveA(4);
				break;
			case 42: // !
				chi.moveUpdatedRow();
				break;
			case 43:
				chi.showUpdatedRow();
				break;
			case 44:
				chi.moveBack();
				break;
			case 45: // !
				chi.showRepeat();
				break;
			case 46:
				chi.showOne();
				break;
			case 47:
				chi.showTwo();
				break;
			case 48:
				chi.showThree();
				break;
			case 49:
				chi.showFour();
				break;
		}
	}
}