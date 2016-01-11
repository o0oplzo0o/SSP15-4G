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
	this.speedMultiplier = 1;
	
	// track moving object
	this.currentPhase = 0;
	this.hitCounter = 0;
	this.targetCounter = 0;
	
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
		//this.showInput();
		this.playAnimationPhase(this.currentPhase); // Play 0
		
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
		//this.splitInput(1000, 750, 0.5);
		setTimeout(function(){
			inputToState.playAnimationPhase(++inputToState.currentPhase); // Play 1
		},1000*this.speedMultiplier);
	}
	this.splitInput = function() {
		// delay is the time before the first animation plays
		// gap is the gap between consecutive animations
		// speed is the speed in which the animation plays

		inputToState.targetCounter = inputToState.numBlocks;
		// animation showing string being split
		for (var i=0; i<inputToState.numBlocks; ++i) {
			inputToState.input[i].moveTo(i*250,inputToState.input[i].pos.y,0.5,inputToState.objectHitTarget);
		}

		// continue
		// delay += gap;
		// setTimeout(function(){
			// inputToState.showConversion();
		// }, delay);
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
			this.input.push(str.createString(
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
		//this.replaceInput(1000, 750, 0.5);
		setTimeout(function(){
			inputToState.playAnimationPhase(++inputToState.currentPhase) // Play 3
		}, 2000*this.speedMultiplier);
	}
	this.invertConversion = function()
	{
		// show inverted hex after conversion
		for (var i=0; i<this.numBlocks; ++i) {
			var str = new string();
			var substr = this.input[i].text;
			var hex = "";
			for (var j=0; j<substr.length; ++j) {
				hex = substr.charCodeAt(j).toString(16) + hex;
			}

			// (context, x, y, font, size, color, alpha, text)
			this.extra.push(str.createString(
				this.context,
				i*250, // my measurements are exact!
				100,
				"Consolas",
				24,
				"#000000",
				1,
				hex
			));
		}
		
		setTimeout(function(){
			inputToState.playAnimationPhase(++inputToState.currentPhase) // Play 4
		}, 1500*this.speedMultiplier);
	}
	this.replaceInput = function() {
		// clear original input array
		for (var i=0; i<inputToState.input.length; ++i) {
			inputToState.input[i] = null;
		}
		inputToState.input = [];

		// add hex to original input array
		inputToState.input = inputToState.extra;
		inputToState.extra = [];
		
		setTimeout(function(){
			inputToState.playAnimationPhase(++inputToState.currentPhase) // Play 5
		}, 1000*this.speedMultiplier);
	}
	this.moveReplaceInput = function()
	{
		inputToState.targetCounter = inputToState.numBlocks;
		
		for (var i=0; i<inputToState.numBlocks; ++i) {
			inputToState.input[i].moveTo(i*250,50,0.5,inputToState.objectHitTarget);
		}
	}
	this.paddingAnimation = function()
	{
		var lastBlock = inputToState.input[inputToState.input.length-1];
		if (lastBlock.text.length < 16) {
			inputToState.padRemainder(750, 100);
		} else {
			inputToState.playAnimationPhase(++inputToState.currentPhase) // Play 7
		}
	}
	this.padRemainder = function(delay, gap) {
		var lastBlock = this.input[this.input.length-1];

		for (var i = lastBlock.text.length; i <= 16; ++i) {
			setTimeout(function(){
				lastBlock.text += "0";
			}, delay);

			delay += gap;
		}

		setTimeout(function(){
			// continue
			//inputToState.showCubes();
			inputToState.playAnimationPhase(++inputToState.currentPhase) // Play 7
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
		//this.moveInput(1000,750,0.5);
		setTimeout(function(){
			inputToState.playAnimationPhase(++inputToState.currentPhase) // Play 8
		}, 1000*this.speedMultiplier);
	}
	this.moveInput = function() {
		inputToState.targetCounter = inputToState.numBlocks;
		// moves the input into cubes
		for (var i=0; i<inputToState.numBlocks; ++i) {
			inputToState.input[i].moveTo(inputToState.input[i].pos.x, 125, 0.5, inputToState.objectHitTarget);
		}
	}
	this.moveInput1 = function() {
		// set cube text to original input array
		for (var i=0; i<inputToState.numBlocks; ++i) {
			inputToState.object[i].text = bigInt(inputToState.input[i].text,16).toString();
		}

		// clear original input array
		for (var i=0; i<inputToState.input.length; ++i) {
			inputToState.input[i] = null;
		}
		inputToState.input = [];

		// continue
		//inputToState.showStateSkeleton();
		setTimeout(function(){
			inputToState.playAnimationPhase(++inputToState.currentPhase) // Play 10
		}, 1000*this.speedMultiplier);
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
			515,
			175,
			50,
			"#8ED6FF",
			0.25,
			filler
		));

		//this.moveCubes(1000, 750, 0.5);
		
		setTimeout(function(){
			inputToState.playAnimationPhase(++inputToState.currentPhase) // Play 11
		}, 1000*this.speedMultiplier);
	}
	this.moveCubes = function() {
		inputToState.targetCounter = inputToState.numBlocks;
		// shifts cubes to form 5x5
		for (var i=0; i<inputToState.numBlocks; ++i) {
			var x = i % 5;
			var y = Math.floor(i / 5);

			var stateX = (x+2)%5;
			var stateY = (-y+7)%5;
				
			inputToState.object[i].moveTo(stateX*50+515,stateY*50+175,0.5, inputToState.objectHitTarget);
		}
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
				"0"
			));
		}

		//this.movePadCubes(1000, 1000, 0.5);
		
		setTimeout(function(){
			inputToState.playAnimationPhase(++inputToState.currentPhase) // Play 13
		}, 1000*this.speedMultiplier);
	}
	this.movePadCubes = function() {
		inputToState.targetCounter = 25 - inputToState.numBlocks;
		// adds required padding
		for (var i=inputToState.numBlocks; i<25; ++i) {
			var x = i % 5;
			var y = Math.floor(i / 5);

			var stateX = (x+2)%5;
			var stateY = (-y+7)%5;
				
			inputToState.object[i].moveTo(stateX*50+515,stateY*50+175,0.5, inputToState.objectHitTarget);
		}
	}
	
	this.destroySkeleton = function()
	{
		// destroy skeleton
		for (var i=0; i<inputToState.extra.length; ++i) {
			inputToState.extra[i] = null;
		}
		inputToState.extra = [];

		// remove text on all blocks
		for (var i=0; i<25; ++i) {
			inputToState.object[i].text = "";
		}
		
		setTimeout(function(){
			inputToState.playAnimationPhase(++inputToState.currentPhase) // Play 15
		}, 1000*this.speedMultiplier);
	}
	this.endAnimation = function()
	{
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
	}

	// loop
	this.update = function()
	{
		time.updateTime();
		
		render.update();
	}
	
	// Function to keep track of the number of cubes reaching the destination
	this.objectHitTarget = function()
	{
		inputToState.hitCounter++;
		if(inputToState.hitCounter >= inputToState.targetCounter)
		{
			inputToState.reorderCube();
			inputToState.hitCounter = 0;
			inputToState.playAnimationPhase(++inputToState.currentPhase);
		}
	}
	this.reorderCube = function()
	{
		var newSortedListX = new Array();
		var newSortedList = new Array();
		//Reorder X 
		for(var i=0; i<inputToState.object.length; i++)
		{
			var pos = 0;
			if(newSortedListX.length == 0)
			{
				newSortedListX.push(inputToState.object[i]);
				continue;
			}
			for(var j=0; j<newSortedListX.length; j++)
			{
				if(inputToState.object[i].pos.x >= newSortedListX[j].pos.x)
					pos = j+1;
			}
			newSortedListX.splice(pos,0,inputToState.object[i]);
		}
		//Reorder Y
		//newSortedList = newSortedListX.slice();
		for(var i=0; i<newSortedListX.length;i++)
		{
			var pos = 0;
			var isFirst = false;
			if(newSortedList.length == 0)
			{
				newSortedList.push(newSortedListX[i]);
				continue;
			}
			for(var j=0; j<newSortedList.length; j++)
			{
				//if x pos is the same then order
				if(newSortedListX[i].pos.x == newSortedList[j].pos.x)
				{
					if(!isFirst)
					{
						pos = j;
						isFirst = true;
					}
					if(newSortedListX[i].pos.y > newSortedList[j].pos.y)
					{
						pos = j+1;
					}
					
				}
			}
			newSortedList.splice(pos,0,newSortedListX[i]);
		}
		
		inputToState.object = newSortedList.slice().reverse();
		newSortedListX = null;
		newSortedList = null;
	}
	
	// Animation phases
	this.playAnimationPhase = function(phase)
	{
		switch(phase)
		{
			case 0:
				this.showInput();
				break;
			case 1:
				this.splitInput();
				break;
			case 2:
				this.showConversion();
				break;
			case 3:
				this.invertConversion();
				break;
			case 4:
				this.replaceInput();
				break;
			case 5:
				this.moveReplaceInput();
				break;
			case 6:
				this.paddingAnimation();
				break;
			case 7:
				this.showCubes();
				break;
			case 8:
				this.moveInput();
				break;
			case 9:
				this.moveInput1();
				break;
			case 10:
				this.showStateSkeleton();
				break;
			case 11:
				this.moveCubes();
				break;
			case 12:
				this.showPadCubes();
				break;
			case 13:
				this.movePadCubes();
				break;
			case 14:
				this.destroySkeleton();
				break;
			case 15:
				this.endAnimation();
				break;
		}
	}
}

inputToState.init();