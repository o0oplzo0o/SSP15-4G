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
	this.dialog;
	this.slices = new Array();
	this.strings = new Array();
	this.tables = new Array();
	
	//all timeouts will be stored here, when the game is pause,
	// all setTimeout(Timer function in util.js) will be handle in that function
	this.currentTimeout = new Array();
	
	//Insert all critical steps into this array
	// Objects will be cleared automatically in playAnimationPhase() on critical steps
	this.step_array = [0,2,4,38];

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
		this.dialog = d.createDialog(
			this.context,
			"The squeezing phase is the extraction of the final hash value from the state."
		);
		audio.play("squeeze1");
		
		// 60 fps update loop
		this.update();
		this.refresh = setInterval(this.update,1000/60);

		// start by showing state
		this.playAnimationPhase(this.currentPhase); // Play 0
	}
	
	//Called when user skip this squeezing steps,
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
		this.slices = new Array();
		this.strings = new Array();
		this.tables = new Array();
		
		this.currentTimeout = new Array();
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	}
	
	//Handle pause here
	// For each of the objects created, call pause to stop their updates (movement, etc)
	this.pause = function()
	{
		clearInterval(this.refresh);
		
		var len = Math.max(this.cubes.length,this.slices.length,this.strings.length,this.tables.length,this.currentTimeout.length);
		for(var i=0; i<len; i++)
		{
			if(this.cubes[i])
				this.cubes[i].pause();
			if(this.slices[i])
				this.slices[i].pause();
			if(this.strings[i])
				this.strings[i].pause();
			if(this.tables[i])
				this.tables[i].pause();

			if(this.currentTimeout[i])
				this.currentTimeout[i].pause();			
		}
	}
	
	//Handle resume here
	// For each of the objects created, call resume to continue their updates (movement, etc)
	this.resume = function()
	{
		this.refresh = setInterval(this.update,1000/60);
		
		var len = Math.max(this.cubes.length,this.slices.length,this.strings.length,this.tables.length,this.currentTimeout.length);
		for(var i=0; i<len; i++)
		{
			if(this.cubes[i])
				this.cubes[i].resume();
			if(this.slices[i])
				this.slices[i].resume();
			if(this.strings[i])
				this.strings[i].resume();
			if(this.tables[i])
				this.tables[i].resume();

			if(this.currentTimeout[i])
				this.currentTimeout[i].resume();			
		}
	}
	
	this.showState = function() {
		console.log("showState");

		var abc = [
			"N", "I", "D", "X", "S",
			"O", "J", "E", "Y", "T",
			"K", "F", "A", "U", "P",
			"L", "G", "B", "V", "Q",
			"M", "H", "C", "W", "R"
		];

		//draw inputToState state (Pi)
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
			if (squeezing.currentPhase != 0)
				return;

			squeezing.playAnimationPhase(++squeezing.currentPhase);
		}, 1000*this.speedMultiplier));
	}
	
	this.moveState = function() {
		console.log("moveState");

		squeezing.targetCounter = 26;

		//move inputToState state to somewhere
		this.slices[0].moveTo(
			100,
			175,
			0.5,
			squeezing.objectHitTarget
		);

		// move label
		this.strings[0].moveTo(
			100,
			425+16,
			0.5,
			squeezing.objectHitTarget
		);
	}

	this.showTable = function() {
		console.log("showTable");

		var abc = [
			"N", "I", "D", "X", "S",
			"O", "J", "E", "Y", "T",
			"K", "F", "A", "U", "P",
			"L", "G", "B", "V", "Q",
			"M", "H", "C", "W", "R"
		];

		//draw inputToState state (Pi)
		var s = new slice();
		this.slices.push(s.createSlice(
			this.context,
			100,
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
			100,
			425+16,
			"sans-serif, serif",
			16,
			"#000000",
			1,
			"State S"
		));

		var label = new string();
		this.strings.push(label.createString(
			this.context,
			400,
			100-8,
			"sans-serif, serif",
			24,
			"#000000",
			1,
			"State Values"
		));

		var tableInput = new Array();
		for (var i = 0; i<13; ++i) {
			tableInput.push(new Array());

			tableInput[i].push(String.fromCharCode(65+i));
			if (i == 0) {
				tableInput[i].push(KECCAK.data["absorb_round23"]["iota_step1"][2]); // value of state cube
			} else {
				tableInput[i].push(KECCAK.data["absorb_round23"]["chi_step1"][i*4+3]); // value of state cube
			}
			if ((i+13) < 25) {
				tableInput[i].push(String.fromCharCode(78+i));
				tableInput[i].push(KECCAK.data["absorb_round23"]["chi_step1"][(i+13)*4+3]); // value of state cube
			}
		}

		var t = new table();
		this.tables.push(t.createTable(
			this.context,
			400,
			100,
			tableInput
		));

		this.currentTimeout.push(new Timer(function() {
			if (squeezing.currentPhase != 2)
				return;

			squeezing.playAnimationPhase(++squeezing.currentPhase);
		}, 3000*this.speedMultiplier));
	}

	this.hideTable = function() {
		console.log("hideTable");

		this.strings.pop();
		this.tables = new Array();

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

		this.dialog.setMessage(this.context,
			"Depending on the size of the output (which differs depending on the type of KECCAK hash function used), a certain number of \"cubes\" is extracted from the state to be used as the output."
		);
		audio.play("squeeze2");

		var abc = [
			"N", "I", "D", "X", "S",
			"O", "J", "E", "Y", "T",
			"K", "F", "A", "U", "P",
			"L", "G", "B", "V", "Q",
			"M", "H", "C", "W", "R"
		];

		//draw inputToState state (Pi)
		var s = new slice();
		this.slices.push(s.createSlice(
			this.context,
			515,
			50,
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
			300+16,
			"sans-serif, serif",
			16,
			"#000000",
			1,
			"State S"
		));

		// take first 16 cubes
		// we want first 3 rows (y = 0, 1, 2)
		// middle of 4th row (y = 3, x = 2);

		squeezing.playAnimationPhase(++squeezing.currentPhase);
	}

	this.moveCube = function(x, y, i) {
		this.targetCounter = 1;

		this.slices[0].cubes[x][y].moveTo(
			50+i*50,
			400,
			1,
			squeezing.objectHitTarget
		);
	}
	this.moveEnd = function(x, y, i) {
		var c = new cube();
		this.cubes.push(c.createCube(
			this.context,
			50+i*50,
			400,
			50,
			"#8ED6FF",
			1,
			String.fromCharCode(65+i)
		));

		squeezing.playAnimationPhase(++squeezing.currentPhase);
	}

	this.delayExtract = function() {
		this.currentTimeout.push(new Timer(function() {
			if (squeezing.currentPhase != 37)
				return;

			squeezing.playAnimationPhase(++squeezing.currentPhase);
		}, 3000*this.speedMultiplier));
	}

	this.extractHash = function() {
		console.log("extractHash");

		// output 128 or 256
		this.dialog.setMessage(this.context,
			"The final hash value is \"squeezed\" from the values of the 16 cubes according to how long the hash value is expected to be."
		);
		audio.play("squeeze3");

		// create 16 cubes
		for (var i = 0; i<16; ++i) {
			var c = new cube();
			this.cubes.push(c.createCube(
				this.context,
				50+i*50,
				400,
				50,
				"#8ED6FF",
				1,
				String.fromCharCode(65+i)
			));
		}

		// move 16 cubes up
		this.targetCounter = 16;
		for (var i = 0; i<16; ++i) {
			this.cubes[i].moveTo(
				50+i*50,
				150,
				0.5,
				squeezing.objectHitTarget
			);
		}
	}

	this.showLongOutput = function() {
		console.log("extractOutput");

		var s = KECCAK.data["output"][0];
		var n = Math.ceil(s.length / 4);

		var s1 = s.substring(0, n);
		var s2 = s.substring(n, 2*n);
		var s3 = s.substring(2*n, 3*n);
		var s4 = s.substring(3*n, s.length);

		var label1 = new string();
		this.strings.push(label1.createString(
			this.context,
			50,
			250,
			"sans-serif, serif",
			24,
			"#000000",
			1,
			"Squeezed hash output:"
		));

		var str = new string();
		this.strings.push(str.createString(
			this.context,
			50,
			275,
			"monospace",
			24,
			"#000000",
			1,
			s1
		));

		var str2 = new string();
		this.strings.push(str2.createString(
			this.context,
			50,
			300,
			"monospace",
			24,
			"#000000",
			1,
			s2
		));

		var str3 = new string();
		this.strings.push(str3.createString(
			this.context,
			50,
			325,
			"monospace",
			24,
			"#000000",
			1,
			s3
		));

		var str4 = new string();
		this.strings.push(str4.createString(
			this.context,
			50,
			350,
			"monospace",
			24,
			"#000000",
			1,
			s4
		));

		var label2 = new string();
		this.strings.push(label2.createString(
			this.context,
			50,
			400,
			"sans-serif, serif",
			24,
			"#000000",
			1,
			"Final hash output (256 or 512 bits):"
		));


		var ss = KECCAK.data["output"][1];
		if (ss.length > 64) {
			var nn = Math.ceil(ss.length / 2);
			var s5 = ss.substring(0, nn);
			var s6 = ss.substring(nn, 2*nn);

			var str5 = new string();
			this.strings.push(str5.createString(
				this.context,
				50,
				425,
				"monospace",
				24,
				"#000000",
				1,
				s5
			));

			var str6 = new string();
			this.strings.push(str6.createString(
				this.context,
				50,
				450,
				"monospace",
				24,
				"#000000",
				1,
				s6
			));
		} else {
			var str5 = new string();
			this.strings.push(str5.createString(
				this.context,
				50,
				425,
				"monospace",
				24,
				"#000000",
				1,
				ss
			));
		}
	}

	this.extractExactOutput = function() {
		this.cubes = new Array();


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
	this.playAnimationPhase = function(phase, skipAudio)
	{
		if(!skipAudio)
		{
			if(audio.durationLeft() > 0)
			{
				squeezing.currentTimeout.push(new Timer(squeezing.playAnimationPhase, (audio.durationLeft() + 2) * 1000, phase));
				return;
			}
		}
		else
		{
			audio.stop();
		}
		//If only its a new step, remove all previously created objects
		if(squeezing.step_array.indexOf(phase) > -1)
		{
			for(var i=0; i<squeezing.currentTimeout.length; i++)
			{
				squeezing.currentTimeout[i].remove();
			}
			
			//Please determine what to reinitialise on each critical steps
			squeezing.cubes = new Array();
			squeezing.slices = new Array();
			squeezing.tables = new Array();
			squeezing.strings = new Array();

			squeezing.currentTimeout = new Array();
		}
		
		switch(phase)
		{
			case 0: // !
				squeezing.showState();
				break;
			case 1:
				squeezing.moveState();
				break;
			case 2: // !
				squeezing.showTable();
				break;
			case 3:
				squeezing.hideTable();
				break;
			case 4: // !
				squeezing.extractOutput();
				break;
			case 5:
				squeezing.moveCube(2,2,0);
				break;
			case 6:
				squeezing.moveEnd(2,2,0);
				break;
			case 7:
				squeezing.moveCube(3,2,1);
				break;
			case 8:
				squeezing.moveEnd(3,2,1);
				break;
			case 9:
				squeezing.moveCube(4,2,2);
				break;
			case 10:
				squeezing.moveEnd(4,2,2);
				break;
			case 11:
				squeezing.moveCube(0,2,3);
				break;
			case 12:
				squeezing.moveEnd(0,2,3);
				break;
			case 13:
				squeezing.moveCube(1,2,4);
				break;
			case 14:
				squeezing.moveEnd(1,2,4);
				break;
			case 15:
				squeezing.moveCube(2,1,5);
				break;
			case 16:
				squeezing.moveEnd(2,1,5);
				break;
			case 17:
				squeezing.moveCube(3,1,6);
				break;
			case 18:
				squeezing.moveEnd(3,1,6);
				break;
			case 19:
				squeezing.moveCube(4,1,7);
				break;
			case 20:
				squeezing.moveEnd(4,1,7);
				break;
			case 21:
				squeezing.moveCube(0,1,8);
				break;
			case 22:
				squeezing.moveEnd(0,1,8);
				break;
			case 23:
				squeezing.moveCube(1,1,9);
				break;
			case 24:
				squeezing.moveEnd(1,1,9);
				break;
			case 25:
				squeezing.moveCube(2,0,10);
				break;
			case 26:
				squeezing.moveEnd(2,0,10);
				break;
			case 27:
				squeezing.moveCube(3,0,11);
				break;
			case 28:
				squeezing.moveEnd(3,0,11);
				break;
			case 29:
				squeezing.moveCube(4,0,12);
				break;
			case 30:
				squeezing.moveEnd(4,0,12);
				break;
			case 31:
				squeezing.moveCube(0,0,13);
				break;
			case 32:
				squeezing.moveEnd(0,0,13);
				break;
			case 33:
				squeezing.moveCube(1,0,14);
				break;
			case 34:
				squeezing.moveEnd(1,0,14);
				break;
			case 35:
				squeezing.moveCube(2,3,15);
				break;
			case 36:
				squeezing.moveEnd(2,3,15);
				break;
			case 37:
				squeezing.delayExtract();
				break;
			case 38: // !
				squeezing.extractHash();
				break;
			case 39:
				squeezing.showLongOutput();
				break;
		}
	}
}