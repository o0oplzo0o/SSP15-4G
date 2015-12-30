/*	inputToState.js
	---------------
	info: shows a hard coded function which translates
		  input into 5x5 matrix for use in keccak
		  
		  sequence:
		  - showInput() // shows the input string
		  - splitInput() // animation showing string being split
		  - showConversion() // show converted hex under string
		  - padRemainder() // pads last block if needed
		  - replaceInput() // replace input with hex version
		  - showCubes() // shows the state cubes
		  - showStateSkeleton() // shows faded state
		  - moveInput() // moves the input into cubes
		  - showPadCubes() // show cubes used for padding only
		  - movePadCubes() // shifts cubes to form 5x5

		  uses:
		  - inputToState_render.js
		  - relevant base "classes" (cube.js, line.js, etc)
*/

var inputToState = new function()
{
	this.canvas;
	this.context;
	
	// input
	this.inputString;
	this.numBlocks;
	
	// animation sets
	this.input = new Array();
	this.object = new Array();
	this.extra = new Array();

	// animation loop
	this.refresh;

	// display metrics
	this.padding = 25;
	this.spaceX = 150;
	this.spaceY = 500;
	
	this.init = function(inputString)
	{
		this.canvas = document.getElementById("keccakCanvas");
		this.context = this.canvas.getContext("2d");

		// store input string
		this.inputString = inputString;

		// hardcoded default
		this.inputString = "abcdefghijklmnopqrstuvwxyz1234567890";

		// get number of blocks
		this.numBlocks = Math.floor(this.inputString.length / 8);
		if (this.inputString.length % 8 > 0) {
			this.numBlocks += 1;
		}

		// start by showing state
		this.showInput();
		
		// 60 fps update loop
		this.update();
		this.refresh = setInterval(this.update,1000/60);
	}

	this.showInput = function() {
		// show input string
		for (var i=0; i<this.numBlocks; ++i) {
			var str = new string();

			// (context, x, y, font, size, color, alpha, text)
			this.input.push(str.createString(
				this.context,
				i*105, // my measurements are exact!
				50,
				"Consolas",
				24,
				"#000000",
				1,
				this.inputString.substring(i*8, (i*8)+8)
			));
		}

		// continue by showing split input animation
		this.splitInput(1000, 750, 0.5);
	}
	this.splitInput = function(delay, gap, speed) {
		// delay is the time before the first animation plays
		// gap is the gap between consecutive animations
		// speed is the speed in which the animation plays

		// animation showing string being split
		setTimeout(function(){
			for (var i=0; i<inputToState.numBlocks; ++i) {
				inputToState.input[i].moveTo(i*250,inputToState.input[i].pos.y,speed);
			}
		}, delay);

		// continue
		delay += gap;
		setTimeout(function(){
			inputToState.showConversion();
		}, delay);
	}
	this.showConversion = function() {
		// show converted input in hex format
		for (var i=0; i<this.numBlocks; ++i) {
			var str = new string();
			var substr = this.input[i].text;
			var hex = "";
			for (var j=0; j<substr.length; ++j) {
				hex += substr.charCodeAt(j).toString(16);
			}

			// (context, x, y, font, size, color, alpha, text)
			this.extra.push(str.createString(
				this.context,
				i*250, // my measurements are exact!
				75,
				"Consolas",
				24,
				"#000000",
				1,
				hex
			));
		}

		// continue
		this.replaceInput(1000, 750, 0.5);
	}
	this.replaceInput = function(delay, gap, speed) {
		setTimeout(function(){
			// clear original input array
			for (var i=0; i<inputToState.input.length; ++i) {
				inputToState.input[i] = null;
			}
			inputToState.input = [];

			// add hex to original input array
			inputToState.input = inputToState.extra;
			inputToState.extra = [];
		}, delay);

		// move hex to original input location
		delay += gap;
		setTimeout(function(){
			for (var i=0; i<inputToState.numBlocks; ++i) {
				inputToState.input[i].moveTo(i*250,50,speed);
			}
		}, delay);

		// continue
		delay += gap;
		setTimeout(function(){
			var lastBlock = inputToState.input[inputToState.input.length-1];
			if (lastBlock.text.length < 16) {
				inputToState.padRemainder(750, 100, 0.5);
			} else {
				inputToState.showCubes();
			}
		}, delay);

	}
	this.padRemainder = function(delay, gap, speed) {
		var lastBlock = this.input[this.input.length-1];

		for (var i = lastBlock.text.length; i <= 16; ++i) {
			setTimeout(function(){
				lastBlock.text += "0";
			}, delay);

			delay += gap;
		}

		setTimeout(function(){
			// continue
			inputToState.showCubes();
		}, delay);
	}
	this.showCubes = function() {
		// shows the state cubes
		var width = 5;
		var height = this.numBlocks / 5;
		if (this.numBlocks % 5 > 0) {
			height += 1;
		}

		// map input array to object array
		for (var i=0; i<this.numBlocks; ++i) {
			var c = new cube();
			this.object.push(c.createCube(
				this.context,
				this.input[i].pos.x,
				100,
				50,
				"#8ED6FF",
				1,
				""
			));
		}

		// continue 
		this.moveInput(1000,750,0.5);
	}
	this.moveInput = function(delay, gap, speed) {
		// moves the input into cubes
		setTimeout(function(){
			for (var i=0; i<inputToState.numBlocks; ++i) {
				inputToState.input[i].moveTo(inputToState.input[i].pos.x, 125, speed);
			}
		}, delay);

		delay += gap;
		setTimeout(function(){
			// set cube text to original input array
			for (var i=0; i<inputToState.numBlocks; ++i) {
				inputToState.object[i].text = inputToState.input[i].text;
			}

			// clear original input array
			for (var i=0; i<inputToState.input.length; ++i) {
				inputToState.input[i] = null;
			}
			inputToState.input = [];

			// continue
			inputToState.showStateSkeleton();
		}, delay);
	}
	this.showStateSkeleton = function() {
		var filler = new Array();
		for (var i=0; i<25; ++i) {
			filler.push("");
		}

		// (context, x, y, size, color, alpha, input)
		var skeleton = new slice();
		this.extra.push(skeleton.createSlice(
			this.context,
			640,
			300,
			50,
			"#8ED6FF",
			0.25,
			filler
		));

		this.moveCubes(1000, 750, 0.5);
	}
	this.moveCubes = function(delay, gap, speed) {
		// shifts cubes to form 5x5
		setTimeout(function(){
			for (var i=0; i<inputToState.numBlocks; ++i) {
				var x = i % 5;
				var y = Math.floor(i / 5);

				var stateX = (x+2)%5;
				var stateY = (-y+7)%5;
					
				inputToState.object[i].moveTo(stateX*50+640,stateY*50+300,speed);
			}
		}, delay);

		delay += gap;
		setTimeout(function(){
			// continue
			inputToState.showPadCubes();
		}, delay);
	}
	this.showPadCubes = function() {
		// show required padding
		for (var i=this.numBlocks; i<25; ++i) {
			var c = new cube();
			this.object.push(c.createCube(
				this.context,
				50,
				50,
				50,
				"#8ED6FF",
				1,
				"0000000000000000"
			));
		}

		this.movePadCubes(1000, 1000, 0.5);
	}
	this.movePadCubes = function(delay, gap, speed) {
		// adds required padding
		setTimeout(function(){
			for (var i=inputToState.numBlocks; i<25; ++i) {
				var x = i % 5;
				var y = Math.floor(i / 5);

				var stateX = (x+2)%5;
				var stateY = (-y+7)%5;
					
				inputToState.object[i].moveTo(stateX*50+640,stateY*50+300,speed);
			}
		}, delay);

		delay += gap;
		setTimeout(function(){
			// destroy skeleton
			for (var i=0; i<inputToState.extra.length; ++i) {
				inputToState.extra[i] = null;
			}
			inputToState.extra = [];

			// remove text on all blocks
			for (var i=0; i<25; ++i) {
				inputToState.object[i].text = "";
			}
		}, delay);

		delay += gap;
		setTimeout(function(){
			// stop update loop
			clearInterval(inputToState.refresh);

			// destroy all objects
			for (var i=0; i<inputToState.input.length; ++i) {
				inputToState.input[i] = null;
			}
			inputToState.input = [];

			for (var i=0; i<inputToState.object.length; ++i) {
				inputToState.object[i] = null;
			}
			inputToState.object = [];
		}, delay);
	}

	// loop
	this.update = function()
	{
		time.updateTime();
		
		render.update();
	}
}

inputToState.init();