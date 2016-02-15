var squeezing = new function()
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
	this.indicators = new Array();
	this.lines = new Array();
	this.operators = new Array();
	this.slices = new Array();
	this.strings = new Array();
	
	//ERIC: all timeouts will be stored here, when the game is pause,
	// all setTimeout(Timer function in util.js) will be handle in that function
	this.currentTimeout = new Array();
	
	//ERIC: Insert all critical steps into this array
	// Objects will be cleared automatically in playAnimationPhase() on critical steps
	this.step_array = [];

	// animation timers
	this.refresh;
	
	this.init = function()
	{
		this.canvas = document.getElementById("keccakCanvas");
		this.context = this.canvas.getContext("2d");
		
		/*
		for(var i=0; i<Math.floor(Math.floor((P.length*8)/2)/r); i++)
		{
			var Pi = this.convertStrToTable(P.slice(i*(2*Math.floor(r/8)),(i+1)*Math.floor(2*r/8)) + common.padWith("00",Math.floor(c/8)));
			for(var y=0; y<5; y++)
			{
				for(var x=0; x<5; x++)
				{
					S[x][y] = bigInt(S[x][y]).xor(Pi[x][y]).toString();
				}
			}
			S = this.KeccakF(S, verbose, "squeezing");
		}
		*/

		// r = fixed width (1024)
		// P = the string, so inside the for loop:
		// string length * 8 / 2 / width, first for loop checks how many slices there are

		// Pi = convert sliced r/8 bits of string to table, pad with 000000, length c (capacity) where c = fixed width (576)
		// for y from 0 to 4, x from 0 to 4:
		// state[x][y] = biginteger(state[x][y]) xor Pi[x][y], convert result to string
		// state is initially 0, when xor'ed with Pi, will get Pi (equivalent to setting state[x][y] = Pi[x][y])
		// need to xor because of subsequent rounds
		// then run round function f on state

		// animation plan:
		// - draw inputToState state (called Pi)
		// - animate movement of Pi to position for animation
		// - draw state S
		// - animate [x][y] of S xor with [x][y] of Pi
		// - animate moving [x][y] to new state S
		// - fade old S and Pi, draw round functions
		// - animate moving new S through round functions
		// - animate new S as the state S for next round
		// - repeat

		// create dialog box
		var d = new dialog();
		this.dialog = (d.createDialog(
			this.context,
			"The squeezing phase is the extraction of the final hash value from the state."
		));
		
		// 60 fps update loop
		this.update();
		this.refresh = setInterval(this.update,1000/60);

		// start by showing state
		this.playAnimationPhase(this.currentPhase); // Play 0
	}
	
	//ERIC: Called when user skip this squeezing steps,
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
		this.indicators = new Array();
		this.lines = new Array();
		this.operators = new Array();
		this.slices = new Array();
		this.strings = new Array();
		
		this.currentTimeout = new Array();
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	}
	
	//ERIC: Handle pause here
	// For each of the objects created, call pause to stop their updates (movement, etc)
	this.pause = function()
	{
		clearInterval(this.refresh);
		
		var len = Math.max(this.cubes.length,this.lines.length,this.operators.length,this.indicators.length,this.currentTimeout);
		for(var i=0; i<len; i++)
		{
			if(this.cubes[i])
				this.cubes[i].pause();
			if(this.lines[i])
				this.lines[i].pause();
			if(this.operators[i])
				this.operators[i].pause();
			if(this.indicators[i])
				this.indicators[i].pause();			
			if(this.currentTimeout[i])
				this.currentTimeout[i].pause();			
		}
	}
	
	//ERIC: Handle resume here
	// For each of the objects created, call resume to continue their updates (movement, etc)
	this.resume = function()
	{
		this.refresh = setInterval(this.update,1000/60);
		
		var len = Math.max(this.cubes.length,this.lines.length,this.operators.length,this.indicators.length,this.currentTimeout);
		for(var i=0; i<len; i++)
		{
			if(this.cubes[i])
				this.cubes[i].resume();
			if(this.lines[i])
				this.lines[i].resume();
			if(this.operators[i])
				this.operators[i].resume();
			if(this.indicators[i])
				this.indicators[i].resume();			
			if(this.currentTimeout[i])
				this.currentTimeout[i].resume();			
		}
	}
	
	this.showState = function() {
		console.log("showInputToState");

		var abc = new Array();
		for (var i=0; i<25; ++i) {
			abc.push(String.fromCharCode(97+i));
		}

		//draw inputToState state (Pi)
		console.log("PUSH");
		var s = new slice();
		this.slices.push(s.createSlice(
			this.context,
			515,
			175,
			50,
			"#8ED6FF",
			1,
			abc
		));

		// label
		var str = new string();
		this.strings.push(str.createString(
			this.context,
			515,
			425+16,
			"sans-serif, serif",
			16,
			"#000000",
			1,
			"State S"
		));

		this.currentTimeout.push(new Timer(function() {
			squeezing.playAnimationPhase(++squeezing.currentPhase);
		}, 1000*this.speedMultiplier));
	}
	
	this.moveState = function() {
		console.log("moveInputToState");

		squeezing.targetCounter = 26;

		//move inputToState state to somewhere
		this.slices[0].moveTo(
			215,
			175,
			0.5,
			squeezing.objectHitTarget
		);

		// move label
		this.strings[0].moveTo(
			215,
			425+16,
			0.5,
			squeezing.objectHitTarget
		);
	}

	this.showTable = function() {
		console.log("showTable");

		var tableInput = new Array();
		for (var i = 0; i<25; ++i) {
			tableInput.push(new Array());

			tableInput[tableInput.length-1].push(String.fromCharCode(97+i));
			tableInput[tableInput.length-1].push(""); // value of state cube
		}

		var t = new table();
		this.tables.push(t.createTable(
			this.context,
			515,
			400,
			tableInput
		));

		this.currentTimeout.push(new Timer(function() {
			squeezing.playAnimationPhase(++squeezing.currentPhase);
		}, 1000*this.speedMultiplier));
	}

	this.hideTable = function() {
		console.log("hideTable");

		this.tables = [];

		squeezing.targetCounter = 26;

		//move inputToState state to somewhere
		this.slices[0].moveTo(
			515,
			50,
			0.5,
			squeezing.objectHitTarget
		);

		// move label
		this.strings[0].moveTo(
			515,
			300+16,
			0.5,
			squeezing.objectHitTarget
		);
	}

	this.extractOutput = function() {
		console.log("extractOutput");

		this.dialogs[0].setMessage(this.context,
			"Depending on the size of the output (which differs depending on the type of KECCAK hash function used), a certain number of \"cubes\" is extracted from the state to be used as the output."
		);

		// take first 16 cubes
		for (var i=0; i<16; ++i) {
			this.slices[0].cubes = arrayToState(this.slices[0].cubes);

		}
	}

	this.extractHash = function() {
		console.log("extractHash");

		// output 128 or 256
		this.dialogs[0].setMessage(this.context,
			"The final actual hash value is then extracted from the output."
		);

	}

	this.showLongOutput = function() {
		console.log("extractOutput");

	}

	// loop
	this.update = function()
	{
		time.updateTime();
		
		squeezing_render.update();
	}

	this.objectHitTarget = function()
	{
		++squeezing.hitCounter;
		
		if(squeezing.hitCounter >= squeezing.targetCounter)
		{
			squeezing.hitCounter = 0;
			squeezing.playAnimationPhase(++squeezing.currentPhase);
		}
	}

	// Animation phases
	this.playAnimationPhase = function(phase)
	{
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
				this.showTable();
				break;
			case 3:
				this.hideTable();
				break;
			case 3:
				this.extractOutput();
				break;
			case 3:
				this.extractHash();
				break;
			case 4:
				this.showLongOutput();
				break;
		}
	}
}