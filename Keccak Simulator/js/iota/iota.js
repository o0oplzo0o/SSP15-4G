/*	theta.js
	---------------
	info: shows a hard coded function which translates
		  input into 5x5 matrix for use in keccak
		  
				sequence: 
				
				showStateSkeleton();		//show state (ready for 1st theta loop)	
				showindexXY();				//show index of XY on state
				showCubes();				//show row of cube (ready for 1st theta loop)
				xorRowUp(0);				//show animation for 1st theta loop
				destroyArrays1();			//clear all arrays invlove in 1st theta loop
				showindexX1();				//show index X only (ready for 2nd theta loop)
				moveXoredRow();				//move row of cube (ready for 2nd theta loop)
				showRowSkeleton();			//create row of cube for operation (ready for 2nd theta loop)
				showindexX2();				//show index X only for above row of cube (ready for 2nd theta loop)
				showOperation();			//show operation structures: Lines,Operators
				animatexorWithRot(0);		//show animation for 2nd theta loop	
				destroyArrays2();			//clear all arrys invlove in 2nd theta loop
				moveXorRotRow();			//move row of cube (ready for 3rd theta loop)
				showStateSkeleton();		//show state (ready for 3rd theta loop)	
				showindexXY();				//show index of XY on state
				showOperatorXOR1();			//show static XOR (ready for 3rd theta loop)
				xorRowUp1(0);				//show animation for 3rd theta loop
				destroyEverything();		//clear all arrays invlo in 3rd theta loop
				showStatelastSkeleton();	//show state (ready to jump to next step)
				
		  uses:
		  - theta_render.js
		  - relevant base "classes" (cube.js, line.js, etc)
*/

var iota = new function()
{
	this.canvas;
	this.context;
	this.speedMultiplier = 1;
	
	// track moving object
	this.currentPhase = 0;
	this.hitCounter = 0;
	this.targetCounter = 0;
	
	// timeout
	this.currentTimeout = null;

	
	// animation sets
	this.object = new Array();
	this.sortedObject = new Array();
	// animation loop
	this.refresh;

	// display metrics
	// this.padding = 25;
	// this.spaceX = 150;
	// this.spaceY = 500;
	// this.startX=515;
	// this.startY=175;
	
	
	this.init = function()
	{
		this.canvas = document.getElementById("keccakCanvas");
		this.context = this.canvas.getContext("2d");
		
	this.currentPhase = 0;
	this.hitCounter = 0;
	this.targetCounter = 0;
	this.object = new Array();
	this.sortedObject = new Array();
		// store input string
		//this.inputString = inputString;

		// start by showing state
		//this.showInput();
		this.playAnimationPhase(this.currentPhase); 
		//this.showStage();
		// 60 fps update loop
		//this.showStateSkeleton();
		//this.objectHitTarget();
		this.update();
		this.refresh = setInterval(this.update,1000/60);
	}
	
	this.update = function()
	{
		console.log("UPDATE");
		time.updateTime();
		
		iota_render.update();
	}
	
	this.step1 = function() // 1 << this.w
	{
		var bin = util.dec2bin(1);
		
		//bin of w
		for(var i=0; i<8; i++)
		{
			var c = new cube();
			this.object.push(c.createCube(
				this.context,
				200 + (i*50),
				100,
				50,
				"#8ED6FF",
				1,
				bin[i]
			));
		}
		
		//Left shift text
		var t = new string();
		this.object.push(t.createString(
			this.context,
			200 + (9*50),
			125,
			"Consolas",
			24,
			"#000000",
			1,
			"<<"
		));
		
		//cube for left shifting
		var c = new cube();
		this.object.push(c.createCube(
			this.context,
			200 + (10*50),
			100,
			50,
			"#8ED6FF",
			1,
			"0"
		));
		
		//Left shift text
		var t = new string();
		this.object.push(t.createString(
			this.context,
			200 + (11.5*50),
			130,
			"Consolas",
			24,
			"#000000",
			1,
			"x64"
		));
		
		this.currentTimeout = new Timer(function(){
			if(iota.currentPhase != 0)
				return;
			
			iota.object.splice(10,1);
			iota.object.splice(8,1);
			
			iota.sortedObject = zSort5x5(iota.object);
			
			iota.targetCounter = iota.object.length;
			for(var i=0; i<iota.object.length; i++)
				iota.object[i].moveTo(200 + (3*50),100,1,iota.objectHitTarget);
		},3000*this.speedMultiplier);
	}
	
	this.step2 = function() // Result of shifting
	{
		var c = new cube();
		this.object.push(c.createCube(
			this.context,
			200 + (0*50),
			100,
			50,
			"#8ED6FF",
			1,
			KECCAK.RC[0]
		));
		
		//Mod text
		var t = new string();
		this.object.push(t.createString(
			this.context,
			200 + (2*50),
			130,
			"Consolas",
			24,
			"#000000",
			1,
			"%"
		));
		
		c = new cube();
		this.object.push(c.createCube(
			this.context,
			200 + (3*50),
			100,
			50,
			"#8ED6FF",
			1,
			bigInt(1).shiftLeft(KECCAK.w)
		));
		
		this.currentTimeout = new Timer(function(){
			if(iota.currentPhase != 1)
				return;
			
			iota.object.splice(1,1);
			
			iota.sortedObject = zSort5x5(iota.object);
		
			iota.targetCounter = iota.object.length;
			for(var i=0; i<iota.object.length; i++)
				iota.object[i].moveTo(200 + (0*50),100,1,iota.objectHitTarget);
		},3000*this.speedMultiplier);
		
	}
	
	this.step3 = function() // Show A slice
	{
		var c = new cube();
		this.object.push(c.createCube(
			this.context,
			200 + (0*50),
			100,
			50,
			"#8ED6FF",
			1,
			KECCAK.data["absorb_round0"]["iota_step1"][1]
		));
		
		for (var i = 0; i < 25; ++i)
		{
			c = new cube();
			this.object.push(c.createCube(
				this.context,
				400+(i%5*50),
				100+(Math.floor(i/5)*50),
				50,
				"#8ED6FF",
				1,
				" "
			));
		}
		
		iota.sortedObject = zSort5x5(iota.object);
		
		this.currentTimeout = new Timer(function(){
			if(iota.currentPhase != 2)
				return;
			
			for(var i=0; i<iota.object.length; i++)
			{
				if(i != 0 && i != 13)
					iota.object[i].alpha = 0.5;
			}
			this.currentTimeout = new Timer(function(){
				if(iota.currentPhase != 2)
					return;
				
				iota.targetCounter = 1;
				iota.object[13].moveTo(200, 200, 2, iota.objectHitTarget);
				
			},2000*this.speedMultiplier);
		},3000*this.speedMultiplier);
	}
	
	this.step4 = function()
	{
		var c = new cube();
		this.object.push(c.createCube(
			this.context,
			200 + (0*50),
			100,
			50,
			"#8ED6FF",
			1,
			KECCAK.data["absorb_round0"]["iota_step1"][1]
		));
		
		//Mod text
		var t = new string();
		this.object.push(t.createString(
			this.context,
			210 + (0*50),
			170,
			"Consolas",
			24,
			"#000000",
			1,
			"XOR"
		));
		
		c = new cube();
		this.object.push(c.createCube(
			this.context,
			200,
			200,
			50,
			"#8ED6FF",
			1,
			KECCAK.data["absorb_round0"]["iota_step1"][0]
		));
		
		for (var i = 0; i < 25; ++i)
		{
			if(i == 12)
				continue;
			
			c = new cube();
			this.object.push(c.createCube(
				this.context,
				400+(i%5*50),
				100+(Math.floor(i/5)*50),
				50,
				"#8ED6FF",
				0.5,
				" "
			));
		}
		
		this.sortedObject = zSort5x5(this.object);
		
		this.currentTimeout = new Timer(function(){
			if(iota.currentPhase != 3)
				return;
			
			iota.object.splice(1,1);
			iota.sortObject = zSort5x5(iota.object);
			iota.targetCounter = 1;
			iota.object[0].moveTo(200, 200, 2, iota.objectHitTarget);
			
		},2000*this.speedMultiplier);
	}
	
	this.step5 = function()
	{
		var c = new cube();
		this.object.push(c.createCube(
			this.context,
			200,
			200,
			50,
			"#8ED6FF",
			1,
			KECCAK.data["absorb_round0"]["iota_step1"][2]
		));
		
		for (var i = 0; i < 25; ++i)
		{
			if(i == 12)
				continue;
			
			c = new cube();
			this.object.push(c.createCube(
				this.context,
				400+(i%5*50),
				100+(Math.floor(i/5)*50),
				50,
				"#8ED6FF",
				0.5,
				" "
			));
		}
		
		this.sortedObject = zSort5x5(this.object);
		
		this.currentTimeout = new Timer(function(){
			if(iota.currentPhase != 4)
				return;
			
			iota.targetCounter = 1;
			iota.object[0].moveTo(400+(2*50), 200, 2, iota.objectHitTarget);
			
		},2000*this.speedMultiplier);
	}
	
	this.step6 = function()
	{
		for (var i = 0; i < 25; ++i)
		{
			var c = new cube();
			this.object.push(c.createCube(
				this.context,
				400+(i%5*50),
				100+(Math.floor(i/5)*50),
				50,
				"#8ED6FF",
				1,
				" "
			));
		}
		
		this.sortedObject = zSort5x5(this.object);
	}
	
	this.objectHitTarget = function()
	{
		++iota.hitCounter;
		
		if(iota.hitCounter >= iota.targetCounter)
		{
			iota.hitCounter = 0;
			iota.playAnimationPhase(++iota.currentPhase);
		}
	}
	
	// Animation phases
	this.playAnimationPhase = function(phase)
	{
		this.object = new Array();
		this.sortedObject = new Array();
		
		switch(phase)
		{
			case 0:
				this.step1();
				break;
			case 1:
				this.step2();
				break;
			case 2:
				this.step3();
				break;
			case 3:
				this.step4();
				break;
			case 4:
				this.step5();
				break;
			case 5:
				this.step6();
				break;
			case 6:
				break;
			case 7:
				break;
			case 8:
				break;
			case 9:
				break;
			case 10: 
				break;
			case 11:
				break;
			case 12:
				break;
			case 13:
				break;
			case 14:
				break;
			case 15:
				break;
			case 16:
				break;
			case 17:
				break;
			case 18:
				break;
			
		
		}
		iota.sortedObject = zSort5x5(iota.object);
	}
	
	this.nextStep = function()
	{
		iota.currentPhase = Math.min(++iota.currentPhase,5);
		this.playAnimationPhase(iota.currentPhase);
	}
	
	this.previousStep = function()
	{
		iota.currentPhase = Math.max(--iota.currentPhase,0);
		this.playAnimationPhase(iota.currentPhase);
	}
	
	this.togglePause = function(pause)
	{
		if(pause)
		{
			console.log("PAUSE");
			console.log(this.refresh);
			clearInterval(this.refresh);
			this.currentTimeout.pause();
		}
		else
		{
			console.log("RESUME");
			this.refresh = setInterval(this.update,1000/60);
			this.currentTimeout.resume();
		}
	}
}

//iota.init();