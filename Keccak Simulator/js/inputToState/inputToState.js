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

	this.speedMultiplier = 0.1;
	
	// track moving object
	this.currentPhase = 0;
	this.hitCounter = 0;
	this.targetCounter = 0;
	
	this.step_array = [0,5,6,8];
	
	// input
	this.inputString;
	this.suffix;
	this.numBlocks;
	this.additionalBlocks = 0;
	
	// animation sets
	this.dialogs = new Array();
	this.input = new Array();
	this.object = new Array();
	this.extra = new Array();

	// animation loop
	this.refresh;

	// display metrics
	this.padding = 25;
	this.spaceX = 150;
	this.spaceY = 500;
	
	this.currentTimeout = new Array();
	this.m_dialog;
	this.message = "";
	
	this.speedMultiplier = 1;
	
	this.init = function()
	{
		this.canvas = document.getElementById("keccakCanvas");
		this.context = this.canvas.getContext("2d");

		// store input string
		this.inputString = KECCAK.data["init"]["step1"][0];
		this.suffix = KECCAK.data["init"]["step1"][2];

		// get number of blocks
		this.numBlocks = Math.floor(this.inputString.length / 8);
		if (this.inputString.length % 8 > 0) {
			this.numBlocks += 1;
		}
		
		// create dialog box
		this.m_dialog = new dialog();
		this.m_dialog.createDialog(this.context,this.message);

		// start by showing state
		//this.showInput();
		this.playAnimationPhase(this.currentPhase); // Play 0
		
		// 60 fps update loop
		this.update();
		this.refresh = setInterval(this.update,1000/60);
	}
	
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
		this.additionalBlocks = 0;
		
		this.currentTimeout = new Array();
		this.object = new Array();
		this.sortedObject = new Array();
		
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	}
	
	this.pause = function()
	{
		clearInterval(this.refresh);
		//Stop objects update
		for(var i=0; i<this.object.length; i++)
		{
			this.object[i].pause();
		}
		for(var i=0; i<this.currentTimeout.length; i++)
		{
			this.currentTimeout[i].pause();
		}
	}
	
	this.resume = function()
	{
		//Resume main update
		this.refresh = setInterval(this.update,1000/60);
		//Resume objects update
		for(var i=0; i<this.object.length; i++)
		{
			this.object[i].resume();
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
		
		inputToState_render.update();
	}

	this.step1 = function() {
		this.message = "The init function converts the input string into array of hex value";
		this.m_dialog.setMessage(this.context,this.message);
		audio.play("init1");
		
		for (var i=0; i<this.numBlocks; ++i) {
			var str = new string();

			// (context, x, y, font, size, color, alpha, text)
			this.object.push(str.createString(
				this.context,
				this.padding+i*112,
				50,
				"monospace",
				24,
				"#000000",
				1,
				this.inputString.substring(i*8, (i*8)+8)
			));
		}
		
		this.sortedObject = this.object;

		// continue split input animation (play 1)
		this.currentTimeout.push(new Timer(function() {
			inputToState.playAnimationPhase(++inputToState.currentPhase);
		}, 3000*this.speedMultiplier));
	}
	
	this.step2 = function() {
		this.message = "Split the string into groups of 8 characters";
		this.m_dialog.setMessage(this.context,this.message);
		audio.play("init2");
		
		this.targetCounter = this.numBlocks;

		// animation showing string being split
		for (var i=0; i<this.numBlocks; ++i) {
			this.object[i].moveTo(
				this.padding+i*250,
				this.object[i].pos.y,
				0.5,
				this.objectHitTarget
			);
		}
		
		this.sortedObject = this.object;
	}

	this.step3 = function() {
		this.message = "Convert each of the characters into hex representation";
		this.m_dialog.setMessage(this.context,this.message);
		audio.play("init3");
		
		// show converted input in hex format
		for (var i=0; i<this.numBlocks; ++i) {
			var str = new string();
			var substr = this.inputString.substring(i*8, (i*8)+8);
			var hex = "";
			for (var j=0; j<substr.length; ++j) {
				hex += substr.charCodeAt(j).toString(16);
			}

			// (context, x, y, font, size, color, alpha, text)
			this.object.push(str.createString(
				this.context,
				this.padding+i*250, // my measurements are exact!
				75,
				"monospace",
				24,
				"#000000",
				1,
				hex
			));
		}
		
		this.sortedObject = this.object;

		// continue
		//this.replaceInput(1000, 750, 0.5);
		this.currentTimeout.push(new Timer(function(){
			inputToState.playAnimationPhase(++inputToState.currentPhase) // Play 3
		}, 3000*this.speedMultiplier));
	}
	this.step4 = function()
	{
		this.message = "For each group, reverse the order of hex value";
		this.m_dialog.setMessage(this.context,this.message);
		audio.play("init4");
		
		// show inverted hex after conversion
		for (var i=0; i<this.numBlocks; ++i) {
			var str = new string();
			var substr = this.inputString.substring(i*8, (i*8)+8);
			var hex = "";
			for (var j=0; j<substr.length; ++j) {
				hex = substr.charCodeAt(j).toString(16) + hex;
			}

			// (context, x, y, font, size, color, alpha, text)
			this.object.push(str.createString(
				this.context,
				this.padding+i*250, // my measurements are exact!
				100,
				"monospace",
				24,
				"#000000",
				1,
				hex
			));
		}
		
		this.sortedObject = this.object;
		
		this.currentTimeout.push(new Timer(function(){
			inputToState.playAnimationPhase(++inputToState.currentPhase) // Play 4
		}, 3000*this.speedMultiplier));
	}
	this.step5 = function() {
		this.object = new Array();
		this.sortedObject = new Array();
			
		for (var i=0; i<this.numBlocks; ++i) {
			var str = new string();
			var substr = this.inputString.substring(i*8, (i*8)+8);
			var hex = "";
			for (var j=0; j<substr.length; ++j) {
				hex = substr.charCodeAt(j).toString(16) + hex;
			}

			// (context, x, y, font, size, color, alpha, text)
			this.object.push(str.createString(
				this.context,
				this.padding+i*250, // my measurements are exact!
				100,
				"monospace",
				24,
				"#000000",
				1,
				hex
			));
		}
		
		this.sortedObject = this.object;
		
		inputToState.targetCounter = inputToState.numBlocks;
		
		for (var i=0; i<inputToState.numBlocks; ++i) {
			inputToState.object[i].moveTo(this.padding+i*250,50,0.5,inputToState.objectHitTarget);
		}
		
		
		this.currentTimeout.push(new Timer(function(){
			inputToState.playAnimationPhase(++inputToState.currentPhase) // Play 5
		}, 3000*this.speedMultiplier));
	}
	
	this.step6 = function()
	{
		this.message = "Append suffix";
		this.m_dialog.setMessage(this.context,this.message);
		audio.play("init5");
		
		for (var i=0; i<this.numBlocks; ++i) {
			var str = new string();
			var substr = this.inputString.substring(i*8, (i*8)+8);
			var hex = "";
			for (var j=0; j<substr.length; ++j) {
				hex = substr.charCodeAt(j).toString(16) + hex;
			}

			// (context, x, y, font, size, color, alpha, text)
			this.object.push(str.createString(
				this.context,
				this.padding+i*250, // my measurements are exact!
				50,
				"monospace",
				24,
				"#000000",
				1,
				hex
			));
		}
		
		//Prep block for appending suffix
		if(this.object[this.object.length-1].text.length >= 16)
		{
			var str = new string();
			this.object.push(str.createString(
				this.context,
				this.numBlocks*250, // my measurements are exact!
				50,
				"monospace",
				24,
				"#000000",
				1,
				""
			));
		}
		
		this.sortedObject = this.object;
		
		inputToState.padRemainder(750, 100, this.object[this.object.length-1], this.suffix.toString(16));
	}
	this.step7 = function()
	{
		this.message = "Pad last block with 0";
		this.m_dialog.setMessage(this.context,this.message);
		audio.play("init6");
		
		for (var i=0; i<this.numBlocks; ++i) {
			var str = new string();
			var substr = this.inputString.substring(i*8, (i*8)+8);
			var hex = "";
			for (var j=0; j<substr.length; ++j) {
				hex = substr.charCodeAt(j).toString(16) + hex;
			}

			// (context, x, y, font, size, color, alpha, text)
			this.object.push(str.createString(
				this.context,
				this.padding+i*250, // my measurements are exact!
				50,
				"monospace",
				24,
				"#000000",
				1,
				hex
			));
		}
		
		//Appending suffix
		if(this.object[this.object.length-1].text.length >= 16)
		{
			var str = new string();
			this.object.push(str.createString(
				this.context,
				this.numBlocks*250, // my measurements are exact!
				50,
				"monospace",
				24,
				"#000000",
				1,
				this.suffix.toString(16)
			));
		}
		else
		{
			this.object[this.object.length-1].text += this.suffix.toString(16);
		}
		
		this.sortedObject = this.object;
		
		var padStr = "";
		for(var i=0; i<16-this.object[this.object.length-1].text.length; i++)
		{
			padStr += "0";
		}
		
		this.padRemainder(750, 100, this.object[this.object.length-1], padStr);
	}
	this.padRemainder = function(delay, gap, obj, pad) 
	{
		this.targetCounter = pad.length;
		
		if(this.targetCounter == 0) //no padding required
		{
			inputToState.playAnimationPhase(++inputToState.currentPhase)
			return;
		}
		
		for (var i=0; i<pad.length; i++) {
			this.currentTimeout.push(new Timer(function(i){
										obj.text += pad[i];
										inputToState.objectHitTarget();
									}, delay, i));

			delay += gap;
		}
	}
	this.step8 = function() {
		this.message = "";
		this.m_dialog.setMessage(this.context,this.message);

		// map input array to object array
		for (var i=0; i<this.numBlocks; ++i) {
			var c = new cube();
			this.object.push(c.createCube(
				this.context,
				this.object[i].pos.x,
				100,
				50,
				"#8ED6FF",
				1,
				""
			));
		}
		
		//suffix needs another block
		if(this.inputString.length % 8 == 0)
		{
			this.additionalBlocks = 1;
			var c = new cube();
			this.object.push(c.createCube(
				this.context,
				this.object[this.numBlocks].pos.x,
				100,
				50,
				"#8ED6FF",
				1,
				""
			));
		}
		
		this.sortedObject = this.object;

		this.targetCounter = this.numBlocks;
		// continue 
		//this.moveInput(1000,750,0.5);
		this.currentTimeout.push(new Timer(function(){
			// moves the input into cubes
			for (var i=0; i<inputToState.numBlocks + inputToState.additionalBlocks; ++i) {
				inputToState.object[i].moveTo(inputToState.object[i].pos.x, 125, 0.5, inputToState.objectHitTarget);
			}
		}, 3000*this.speedMultiplier));
	}
	this.step9 = function() {
		this.message = "Put the results into the respective array block";
		this.m_dialog.setMessage(this.context,this.message);
		audio.play("init7");
		
		for (var i=0; i<this.numBlocks + this.additionalBlocks; ++i) {
			var c = new cube();
			this.object.push(c.createCube(
				this.context,
				this.padding+i*250,
				100,
				50,
				"#8ED6FF",
				1,
				""
			));
		}
		
		for(var i=0; i<25; i++)
		{
			var c = new cube();
			this.object.push(c.createCube(
				this.context,
				(i%5*50)+515,
				(Math.floor(i/5)*50)+200,
				50,
				"#8ED6FF",
				0.25,
				""
			));
		}
		
		this.sortedObject = zSort5x5(this.object);
		
		this.currentTimeout.push(new Timer(function(){
			inputToState.targetCounter = inputToState.numBlocks + inputToState.additionalBlocks;
			// moves the input into cubes
			for (var i=0; i<inputToState.numBlocks + inputToState.additionalBlocks; ++i) {
				var x = i % 5;
				var y = Math.floor(i / 5);

				var stateX = (x+2)%5;
				var stateY = (-y+7)%5;
				
				var index = stateY*5 + (stateX + 1) + (inputToState.numBlocks + inputToState.additionalBlocks - 1);
				
				inputToState.object[i].moveTo(inputToState.object[index].pos.x, inputToState.object[index].pos.y, 0.5, inputToState.objectHitTarget);
			}
		}, 3000*this.speedMultiplier));
	}
	this.step10 = function()
	{
		this.message = "Fill up the rest of the array block with 0";
		this.m_dialog.setMessage(this.context,this.message);
		audio.play("init8");
		
		var startIndex = this.object.length;
		//created padded array blocks
		for(var i=inputToState.numBlocks + inputToState.additionalBlocks; i<25; i++)
		{
			var c = new cube();
			this.object.push(c.createCube(
				this.context,
				50,
				100,
				50,
				"#8ED6FF",
				1,
				"0"
			));
		}
		
		this.sortedObject = zSort5x5(this.object);
		
		this.currentTimeout.push(new Timer(function(startIndex){
			inputToState.targetCounter = 25 - (inputToState.numBlocks + inputToState.additionalBlocks);
			var counter = 0;
			// moves the input into cubes
			for (var i=inputToState.numBlocks + inputToState.additionalBlocks; i<25; ++i) {
				var x = i % 5;
				var y = Math.floor(i / 5);

				var stateX = (x+2)%5;
				var stateY = (-y+7)%5;
				
				var index = stateY*5 + (stateX + 1) + (inputToState.numBlocks + inputToState.additionalBlocks - 1);
				
				inputToState.object[startIndex + counter].moveTo(inputToState.object[index].pos.x, inputToState.object[index].pos.y, 0.5, inputToState.objectHitTarget);
				counter++;
			}
		}, 3000*this.speedMultiplier, startIndex));
	}
	
	this.step11 = function()
	{
		this.message = "This concludes the init function";
		this.m_dialog.setMessage(this.context,this.message);
		audio.play("init9");
		
		//clear all object
		this.object = new Array();
		this.sortedObject = new Array();
		
		for(var i=0; i<25; i++)
		{
			var c = new cube();
			this.object.push(c.createCube(
				this.context,
				(i%5*50)+515,
				(Math.floor(i/5)*50)+200,
				50,
				"#8ED6FF",
				1,
				""
			));
		}
		
		this.sortedObject = zSort5x5(this.object);
	}

	// Function to keep track of the number of cubes reaching the destination
	this.objectHitTarget = function()
	{
		++inputToState.hitCounter;
		
		if(inputToState.hitCounter >= inputToState.targetCounter)
		{
			inputToState.hitCounter = 0;
			inputToState.currentTimeout.push(new Timer(function(){
				inputToState.playAnimationPhase(++inputToState.currentPhase);
			}, 1000*this.speedMultiplier));
		}
	}
	
	// Animation phases
	this.playAnimationPhase = function(phase, skipAudio)
	{
		if(!skipAudio)
		{
			if(audio.durationLeft() > 0)
			{
				inputToState.currentTimeout.push(new Timer(inputToState.playAnimationPhase, (audio.durationLeft() + 2) * 1000, phase));
				return;
			}
		}
		else
		{
			audio.stop();
		}
		if(inputToState.step_array.indexOf(phase) > -1)
		{
			for(var i=0; i<inputToState.currentTimeout.length; i++)
			{
				inputToState.currentTimeout[i].remove();
			}
			
			inputToState.currentTimeout = new Array();
			inputToState.object = new Array();
			inputToState.sortedObject = new Array();
		}
		
		switch(phase)
		{
			case 0:
				inputToState.step1();
				break;
			case 1:
				inputToState.step2();
				break;
			case 2:
				inputToState.step3();
				break;
			case 3:
				inputToState.step4();
				break;
			case 4:
				inputToState.step5();
				break;
			case 5:
				inputToState.step6();
				break;
			case 6:
				inputToState.step7();
				break;
			case 7:
				inputToState.step8();
				break;
			case 8:
				inputToState.step9();
				break;
			case 9:
				inputToState.step10();
				break;
			case 10:
				inputToState.step11();
				break;
		}
	}
}