var absorb = new function()
{
	this.canvas;
	this.context;

	// track moving object
	this.speedMultiplier = 1;
	this.currentPhase = 0;
	this.hitCounter = 0;
	this.targetCounter = 0;

	// animation sets
	this.dialog;
	this.indicators = new Array();
	this.lines = new Array();
	this.operators = new Array();
	this.slices = new Array();
	this.strings = new Array();
	
	//all timeouts will be stored here, when the game is pause,
	// all setTimeout(Timer function in util.js) will be handle in that function
	this.currentTimeout = new Array();
	
	// animation break points
	this.step_array = [0, 4, 55, 57, 63, 67];

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
			S = this.KeccakF(S, verbose, "absorb");
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
		this.dialog = d.createDialog(
			this.context,
			"The absorption phase is the main underlying process in which the hash function takes place."
		);
		audio.play("absorb1");
		
		// 60 fps update loop
		this.update();
		this.refresh = setInterval(this.update,1000/60);

		// start by showing state
		this.playAnimationPhase(this.currentPhase); // Play 0
	}
	
	//Called when user skip this absorb steps,
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
		
		this.dialog;
		this.indicators = new Array();
		this.lines = new Array();
		this.operators = new Array();
		this.slices = new Array();
		this.strings = new Array();
		
		this.currentTimeout = new Array();
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	}
	
	//Handle pause here
	// For each of the objects created, call pause to stop their updates (movement, etc)
	this.pause = function()
	{
		clearInterval(this.refresh);
		
		/*
		var len = Math.max(this.cubes.length,this.lines.length,this.operators.length,this.indicators.length,
							this.slices.length,this.strings.length,this.currentTimeout);
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
			if(this.slices[i])
				this.slices[i].pause();	
			if(this.strings[i])
				this.strings[i].pause();			
			if(this.currentTimeout[i])
				this.currentTimeout[i].pause();			
		}
		*/

		for(var i=0; i<this.indicators.length; i++)
		{
			this.indicators[i].pause();
		}
		for(var i=0; i<this.lines.length; i++)
		{
			this.lines[i].pause();
		}
		for(var i=0; i<this.operators.length; i++)
		{
			this.operators[i].pause();
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
		
		/*
		var len = Math.max(this.cubes.length,this.lines.length,this.operators.length,this.indicators.length,
							this.slices.length,this.strings.length,this.currentTimeout);
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
			if(this.slices[i])
				this.slices[i].resume();	
			if(this.strings[i])
				this.strings[i].resume();					
			if(this.currentTimeout[i])
				this.currentTimeout[i].resume();			
		}
		*/

		for(var i=0; i<this.indicators.length; i++)
		{
			this.indicators[i].resume();
		}
		for(var i=0; i<this.lines.length; i++)
		{
			this.lines[i].resume();
		}
		for(var i=0; i<this.operators.length; i++)
		{
			this.operators[i].resume();
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
	
	this.showInputToState = function() {

		var filler = new Array();
		for (var i=0; i<25; ++i) {
			filler.push("");
		}

		//draw inputToState state (Pi)
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
			"Input State (P)"
		));

		this.currentTimeout.push(new Timer(function() {
			absorb.playAnimationPhase(++absorb.currentPhase);
		}, 1000*this.speedMultiplier));
	}
	
	this.moveInputToState = function() {
		console.log("moveInputToState");

		absorb.targetCounter = 26;

		//move inputToState state to somewhere
		this.slices[0].moveTo(
			100,
			100,
			0.5,
			absorb.objectHitTarget
		);

		// move label
		this.strings[0].moveTo(
			100,
			350+16,
			0.5,
			absorb.objectHitTarget
		);
	}
	
	this.showOriginalState = function() {
		console.log("showOriginalState");

		// update dialog box
		this.dialog.setMessage(this.context, "At the start of the absorption phase, a new initial state O is created and is initialized to 0.");
		audio.play("absorb2");

		var input = new Array();
		for (var i=0; i<25; ++i) {
			input.push("0");
		}

		//draw original state (S)
		var s = new slice();
		this.slices.push(s.createSlice(
			this.context,
			515,
			175,
			50, 
			"#8ED6FF",
			1,
			input
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
			"Initial State (O)"
		));
		
		// start animation
		this.currentTimeout.push(new Timer(function() {
			absorb.playAnimationPhase(++absorb.currentPhase);
		}, 1000*this.speedMultiplier));
	}

	this.moveOriginalState = function() {
		console.log("moveOriginalState");

		this.targetCounter = 26;

		//move inputToState state to somewhere
		this.slices[1].moveTo(
			400,
			100,
			0.5,
			absorb.objectHitTarget
		);

		//move label
		this.strings[1].moveTo(
			400,
			350+16,
			0.5,
			absorb.objectHitTarget
		);
	}

	this.showXOR = function() {
		console.log("showXOR");

		// update dialog box
		this.dialog.setMessage(
			this.context,
			"Each element from the input state P undergoes XOR with each respective element from the initial state O to give the resulting state S."
		);
		audio.play("absorb3");

		//draw inputToState state (Pi)
		var filler = new Array();
		for (var i=0; i<25; ++i) {
			filler.push("");
		}
		var s = new slice();
		this.slices.push(s.createSlice(
			this.context,
			100,
			100,
			50,
			"#8ED6FF",
			1,
			filler
		));

		// label
		var str = new string();
		this.strings.push(str.createString(
			this.context,
			100,
			350+16,
			"sans-serif, serif",
			16,
			"#000000",
			1,
			"Input State (P)"
		));

		//draw original state (S)
		var input = new Array();
		for (var i=0; i<25; ++i) {
			input.push("0");
		}
		var s = new slice();
		this.slices.push(s.createSlice(
			this.context,
			400,
			100,
			50, 
			"#8ED6FF",
			1,
			input
		));

		// label
		var str = new string();
		this.strings.push(str.createString(
			this.context,
			400,
			350+16,
			"sans-serif, serif",
			16,
			"#000000",
			1,
			"Initial State (O)"
		));

		// draw XOR
		var o = new operator();
		this.operators.push(o.createOperator(
			this.context,
			780,
			225,
			110,
			"#ffd66a",
			1,
			"XOR"
		));

		// draw label
		var str = new string();
		this.strings.push(str.createString(
			this.context,
			900,
			350+16,
			"sans-serif, serif",
			16,
			"#000000",
			1,
			"Resulting State (S)"
		));

		this.currentTimeout.push(new Timer(function() {
			absorb.playAnimationPhase(++absorb.currentPhase);
		}, 1000*this.speedMultiplier));
	}

	this.moveXOR = function(i, j) {
		// move 0, 0 of each state to xor
		this.targetCounter = 2;
		this.slices[0].cubes[i][j].moveTo(
			742.5,
			212.5,
			2.5,
			absorb.objectHitTarget
		);
		this.slices[1].cubes[i][j].moveTo(
			742.5,
			212.5,
			2.5,
			absorb.objectHitTarget
		);
	}
	this.moveEnd = function(i, j) {
		this.targetCounter = 1;
		this.slices[0].cubes[i][j].moveTo(
			900+(i*50),
			100+(j*50),
			2.5,
			absorb.objectHitTarget
		);
	}

	this.fadeStates = function() {
		// wipe arrays
		this.operators = [];
		this.strings = [];
		this.slices = [];

		// create a new slice for resulting state
		var input = new Array();
		for (var i=0; i<25; ++i) {
			input.push("");
		}
		var s = new slice();
		this.slices.push(s.createSlice(
			this.context,
			900,
			100,
			50, 
			"#8ED6FF",
			1,
			input
		));

		// draw label
		var str = new string();
		this.strings.push(str.createString(
			this.context,
			900,
			350+16,
			"sans-serif, serif",
			16,
			"#000000",
			1,
			"Resulting State (S)"
		));

		// move resulting state to center
		absorb.targetCounter = 26;

		//move inputToState state to somewhere
		this.slices[0].moveTo(
			515,
			175,
			0.5,
			absorb.objectHitTarget
		);

		// move label
		this.strings[0].moveTo(
			515,
			425+16,
			0.5,
			absorb.objectHitTarget
		);
	}

	this.compressState = function() {
		// wipe label
		this.strings = [];

		absorb.targetCounter = 25;

		// compress cubes
		for (var i=0; i<5; ++i) {
			for (var j=0; j<5; ++j) {
				this.slices[0].cubes[i][j].moveTo(
					615,
					100,
					0.5,
					absorb.objectHitTarget
				);
			}
		}
	}

	this.showRoundFunctions = function() {
		console.log("showRoundFunctions");

		this.dialog.setMessage(
			this.context,
			"The resulting state S then undergoes the KECCAK round function, consisting of 5 steps (in order): Theta, Rho, Pi, Chi, Iota"
		);
		audio.play("absorb4");

		// wipe slice
		this.slices = [];

		// replace slice with cube
		var c = new cube();
		this.indicators.push(c.createCube(
			this.context,
			615,
			100,
			50,
			"#8ED6FF",
			1,
			"S"
		));

		// show round functions
		var theta = new operator();
		this.operators.push(theta.createOperator(
			this.context,
			340,
			250,
			120,
			"#f78181",
			1,
			"Theta (\u0398)"
		));

		var rho = new operator();
		this.operators.push(rho.createOperator(
			this.context,
			340+150,
			250,
			120,
			"#f79f81",
			1,
			"Rho (\u03a1)"
		));

		var pi = new operator();
		this.operators.push(pi.createOperator(
			this.context,
			340+300,
			250,
			120,
			"#d8f781",
			1,
			"Pi (\u03a0)"
		));

		var chi = new operator();
		this.operators.push(chi.createOperator(
			this.context,
			340+450,
			250,
			120,
			"#81f79f",
			1,
			"Chi (\u03a7)"
		));

		var iota = new operator();
		this.operators.push(iota.createOperator(
			this.context,
			340+600,
			250,
			120,
			"#f5a9d0",
			1,
			"Iota (\u0399)"
		));

		// draw lines
		var top = new line();
		this.lines.push(top.createLine(
			this.context,
			200,
			125,
			1080,
			125,
			"#000000",
			1
		));
		var left = new line();
		this.lines.push(left.createLine(
			this.context,
			200,
			125,
			200,
			250,
			"#000000",
			1
		));
		var right = new line();
		this.lines.push(right.createLine(
			this.context,
			1080,
			125,
			1080,
			250,
			"#000000",
			1
		));
		var bottom = new line();
		this.lines.push(bottom.createLine(
			this.context,
			200,
			250,
			1080,
			250,
			"#000000",
			1
		));

		this.currentTimeout.push(new Timer(function() {
			absorb.playAnimationPhase(++absorb.currentPhase);
		}, 1000*this.speedMultiplier));
	}

	this.moveThroughRound1 = function() {
		absorb.targetCounter = 1;

		this.indicators[0].moveTo(
			175,
			100,
			0.5,
			absorb.objectHitTarget
		);
	}

	this.moveThroughRound2 = function() {
		absorb.targetCounter = 1;

		this.indicators[0].moveTo(
			175,
			225,
			0.5,
			absorb.objectHitTarget
		);
	}

	this.moveThroughRound3 = function() {
		absorb.targetCounter = 1;

		this.indicators[0].moveTo(
			1055,
			225,
			0.5,
			absorb.objectHitTarget
		);
	}

	this.moveThroughRound4 = function() {
		absorb.targetCounter = 1;

		this.indicators[0].moveTo(
			1055,
			100,
			0.5,
			absorb.objectHitTarget
		);
	}

	this.moveThroughRound5 = function() {
		absorb.targetCounter = 1;

		this.indicators[0].moveTo(
			615,
			100,
			0.5,
			absorb.objectHitTarget
		);
	}

	this.moveStateToXOR = function() {
		this.dialog.setMessage(
			this.context,
			"After it undergoes the round function, the (modified) state S is then used as the new initial state O and is XOR-ed with P to get another new state S, which then undergoes the round function yet again."
		);
		audio.play("absorb5");

		this.lines = [];
		this.operators = [];
		this.indicators = [];

		// replace slice with cube
		var c = new cube();
		this.indicators.push(c.createCube(
			this.context,
			615,
			100,
			50,
			"#8ED6FF",
			1,
			"O"
		));

		this.indicators[0].moveTo(
			400,
			212.5,
			0.5,
			absorb.objectHitTarget
		);
	}

	this.showXOR2 = function() {
		var c = new cube();
		this.indicators.push(c.createCube(
			this.context,
			100,
			212.5,
			50,
			"#8ED6FF",
			1,
			"P"
		));

		// draw XOR
		var o = new operator();
		this.operators.push(o.createOperator(
			this.context,
			700,
			225,
			110,
			"#ffd66a",
			1,
			"XOR"
		));

		this.currentTimeout.push(new Timer(function() {
			absorb.playAnimationPhase(++absorb.currentPhase);
		}, 1000*this.speedMultiplier));
	}
	
	this.moveXOR2 = function() {
		this.targetCounter = 2;
		this.indicators[0].moveTo(
			662.5,
			212.5,
			0.5,
			absorb.objectHitTarget
		);
		this.indicators[1].moveTo(
			662.5,
			212.5,
			0.5,
			absorb.objectHitTarget
		);
	}

	this.moveEnd2 = function() {
		this.indicators[0].text = "S";

		this.targetCounter = 1;

		this.indicators[0].moveTo(
			900,
			212.5,
			0.5,
			absorb.objectHitTarget
		);
	}

	this.moveStateAgain = function() {
		this.operators = [];
		this.indicators = [];

		// replace slice with cube
		var c = new cube();
		this.indicators.push(c.createCube(
			this.context,
			900,
			212.5,
			50,
			"#8ED6FF",
			1,
			"S"
		));

		this.indicators[0].moveTo(
			615,
			100,
			0.5,
			absorb.objectHitTarget
		);
	}


	this.showRoundFunctions2 = function() {
		console.log("showRoundFunctions2");

		this.dialog.setMessage(
			this.context,
			"In total, state S undergoes the round function 24 times (on top of XOR-ing with P as O before the start of every round). This whole process is known as the absorption phase."
		);
		audio.play("absorb6");

		// show round functions
		var theta = new operator();
		this.operators.push(theta.createOperator(
			this.context,
			340,
			250,
			120,
			"#f78181",
			1,
			"Theta (\u0398)"
		));

		var rho = new operator();
		this.operators.push(rho.createOperator(
			this.context,
			340+150,
			250,
			120,
			"#f79f81",
			1,
			"Rho (\u03a1)"
		));

		var pi = new operator();
		this.operators.push(pi.createOperator(
			this.context,
			340+300,
			250,
			120,
			"#d8f781",
			1,
			"Pi (\u03a0)"
		));

		var chi = new operator();
		this.operators.push(chi.createOperator(
			this.context,
			340+450,
			250,
			120,
			"#81f79f",
			1,
			"Chi (\u03a7)"
		));

		var iota = new operator();
		this.operators.push(iota.createOperator(
			this.context,
			340+600,
			250,
			120,
			"#f5a9d0",
			1,
			"Iota (\u0399)"
		));

		// draw lines
		var top = new line();
		this.lines.push(top.createLine(
			this.context,
			200,
			125,
			1080,
			125,
			"#000000",
			1
		));
		var left = new line();
		this.lines.push(left.createLine(
			this.context,
			200,
			125,
			200,
			250,
			"#000000",
			1
		));
		var right = new line();
		this.lines.push(right.createLine(
			this.context,
			1080,
			125,
			1080,
			250,
			"#000000",
			1
		));
		var bottom = new line();
		this.lines.push(bottom.createLine(
			this.context,
			200,
			250,
			1080,
			250,
			"#000000",
			1
		));

		this.currentTimeout.push(new Timer(function() {
			absorb.playAnimationPhase(++absorb.currentPhase);
		}, 1000*this.speedMultiplier));
	}

	// loop
	this.update = function()
	{
		time.updateTime();
		
		absorb_render.update();
	}

	this.objectHitTarget = function()
	{
		++absorb.hitCounter;
		
		if(absorb.hitCounter >= absorb.targetCounter)
		{
			console.log("objectHitTarget triggered, target = "+absorb.targetCounter);
			absorb.hitCounter = 0;
			absorb.playAnimationPhase(++absorb.currentPhase);
		}
	}

	// Animation phases
	this.playAnimationPhase = function(phase, skipAudio)
	{
		if(!skipAudio)
		{
			if(audio.durationLeft() > 0)
			{
				absorb.currentTimeout.push(new Timer(absorb.playAnimationPhase, (audio.durationLeft() + 2) * 1000, phase));
				return;
			}
		}
		else
		{
			audio.stop();
		}
		//If only its a new step, remove all previously created objects
		if(absorb.step_array.indexOf(phase) > -1)
		{
			for(var i=0; i<absorb.currentTimeout.length; i++)
			{
				absorb.currentTimeout[i].remove();
			}
			
			//Please determine what to reinitialise on each critical steps
			absorb.indicators = new Array();
			absorb.lines = new Array();
			absorb.operators = new Array();
			absorb.slices = new Array();
			absorb.strings = new Array();
		
			absorb.currentTimeout = new Array();
		}
		
		switch(phase)
		{
			case 0: // !
				absorb.showInputToState();
				break;
			case 1:
				absorb.moveInputToState();
				break;
			case 2:
				absorb.showOriginalState();
				break;
			case 3:
				absorb.moveOriginalState();
				break;
			case 4: // !
				absorb.showXOR();
				break;
			case 5:
			 	absorb.moveXOR(2,2);
			 	break;
			case 6:
			 	absorb.moveEnd(2,2);
			 	break;
			case 7:
			 	absorb.moveXOR(3,2);
			 	break;
			case 8:
			 	absorb.moveEnd(3,2);
			 	break;
			case 9:
			 	absorb.moveXOR(4,2);
			 	break;
			case 10:
			 	absorb.moveEnd(4,2);
			 	break;
			case 11:
			 	absorb.moveXOR(0,2);
			 	break;
			case 12:
			 	absorb.moveEnd(0,2);
			 	break;
			case 13:
			 	absorb.moveXOR(1,2);
			 	break;
			case 14:
			 	absorb.moveEnd(1,2);
			 	break;
			case 15:
			 	absorb.moveXOR(2,3);
			 	break;
			case 16:
			 	absorb.moveEnd(2,3);
			 	break;
			case 17:
			 	absorb.moveXOR(3,3);
			 	break;
			case 18:
			 	absorb.moveEnd(3,3);
			 	break;
			case 19:
			 	absorb.moveXOR(4,3);
			 	break;
			case 20:
			 	absorb.moveEnd(4,3);
			 	break;
			case 21:
			 	absorb.moveXOR(0,3);
			 	break;
			case 22:
			 	absorb.moveEnd(0,3);
			 	break;
			case 23:
			 	absorb.moveXOR(1,3);
			 	break;
			case 24:
			 	absorb.moveEnd(1,3);
			 	break;
			case 25:
			 	absorb.moveXOR(2,4);
			 	break;
			case 26:
			 	absorb.moveEnd(2,4);
			 	break;
			case 27:
			 	absorb.moveXOR(3,4);
			 	break;
			case 28:
			 	absorb.moveEnd(3,4);
			 	break;
			case 29:
			 	absorb.moveXOR(4,4);
			 	break;
			case 30:
			 	absorb.moveEnd(4,4);
			 	break;
			case 31:
			 	absorb.moveXOR(0,4);
			 	break;
			case 32:
			 	absorb.moveEnd(0,4);
			 	break;
			case 33:
			 	absorb.moveXOR(1,4);
			 	break;
			case 34:
			 	absorb.moveEnd(1,4);
			 	break;
			case 35:
			 	absorb.moveXOR(2,0);
			 	break;
			case 36:
			 	absorb.moveEnd(2,0);
			 	break;
			case 37:
			 	absorb.moveXOR(3,0);
			 	break;
			case 38:
			 	absorb.moveEnd(3,0);
			 	break;
			case 39:
			 	absorb.moveXOR(4,0);
			 	break;
			case 40:
			 	absorb.moveEnd(4,0);
			 	break;
			case 41:
			 	absorb.moveXOR(0,0);
			 	break;
			case 42:
			 	absorb.moveEnd(0,0);
			 	break;
			case 43:
			 	absorb.moveXOR(1,0);
			 	break;
			case 44:
			 	absorb.moveEnd(1,0);
			 	break;
			case 45:
			 	absorb.moveXOR(2,1);
			 	break;
			case 46:
			 	absorb.moveEnd(2,1);
			 	break;
			case 47:
			 	absorb.moveXOR(3,1);
			 	break;
			case 48:
			 	absorb.moveEnd(3,1);
			 	break;
			case 49:
			 	absorb.moveXOR(4,1);
			 	break;
			case 50:
			 	absorb.moveEnd(4,1);
			 	break;
			case 51:
			 	absorb.moveXOR(0,1);
			 	break;
			case 52:
			 	absorb.moveEnd(0,1);
			 	break;
			case 53:
			 	absorb.moveXOR(1,1);
			 	break;
			case 54:
			 	absorb.moveEnd(1,1);
			 	break;
			case 55: // !
				absorb.fadeStates();
				break;
			case 56:
				absorb.compressState();
				break;
			case 57: // !
				absorb.showRoundFunctions();
				break;
			case 58:
				absorb.moveThroughRound1();
				break;
			case 59:
				absorb.moveThroughRound2();
				break;
			case 60:
				absorb.moveThroughRound3();
				break;
			case 61:
				absorb.moveThroughRound4();
				break;
			case 62:
				absorb.moveThroughRound5();
				break;
			case 63: // !
				absorb.moveStateToXOR();
				break;
			case 64:
				absorb.showXOR2();
				break;
			case 65:
				absorb.moveXOR2();
				break;
			case 66:
				absorb.moveEnd2();
				break;
			case 67: // !
				absorb.moveStateAgain();
				break;
			case 68:
				absorb.showRoundFunctions2();
				break;
			case 69:
				absorb.moveThroughRound1();
				break;
			case 70:
				absorb.moveThroughRound2();
				break;
			case 71:
				absorb.moveThroughRound3();
				break;
			case 72:
				absorb.moveThroughRound4();
				break;
			case 73:
				absorb.moveThroughRound5();
				break;
		}
	}
}