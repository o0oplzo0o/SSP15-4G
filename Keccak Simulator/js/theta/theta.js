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

var theta = new function()
{
	this.canvas;
	this.context;
	this.speedMultiplier = 1;
	
	// track moving object
	this.currentPhase = 0;
	this.hitCounter = 0;
	this.targetCounter = 0;
	
	// input
	this.indexStringX=["3","4","0","1","2"];
	this.indexStringY=["2","1","0","4","3"];
	this.numBlocks;
	
	// animation sets
	this.oparray = new Array();
	this.object = new Array();
	this.object1=new Array();
	this.extra = new Array();
	this.indexX=new Array();
	this.indexX2=new Array();
	this.indexY=new Array();
	this.indicators=new Array();
	// animation loop
	this.refresh;

	// display metrics
	this.padding = 25;
	this.spaceX = 150;
	this.spaceY = 500;
	this.startX=515;
	this.startY=175;
	
	
	this.init = function(inputString)
	{
		this.canvas = document.getElementById("keccakCanvas");
		this.context = this.canvas.getContext("2d");

		// store input string
		this.inputString = inputString;

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
	
	
	
		// draw state 
       this.showStateSkeleton = function() { //play 0
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
			theta.playAnimationPhase(++theta.currentPhase) 
		}, 1000*this.speedMultiplier);
	}
	
	
	//display XY index (label)
	this.showindexXY=function(){//play1
		for (var i=0; i<5; ++i){
			var str=new string();
			index=this.indexStringX[i];
			this.indexX.push(str.createString(
				this.context,
				520+i*55,
				450,
				"Consolas",
				24,
				"#000000",
				1,
				index
			));
		}
		for (var i=0; i<5; ++i){
			var str=new string();
			indexy=this.indexStringY[i];
			this.indexY.push(str.createString(
				this.context,
				480,
				200+i*55,
				"Consolas",
				24,
				"#000000",
				1,
				indexy
			));
		}
		
		setTimeout(function(){
			theta.playAnimationPhase(++theta.currentPhase) 
		}, 1000*this.speedMultiplier);
	}
	
	//display X index (label for 2nd theta loop)
	this.showindexX1=function(){
		for (var i=0; i<5; ++i){
			var str=new string();
			index=this.indexStringX[i];
			this.indexX.push(str.createString(
				this.context,
				550+i*55,
				80,
				"Consolas",
				24,
				"#000000",
				1,
				index
			));
		}
		setTimeout(function(){
			theta.playAnimationPhase(++theta.currentPhase) 
		}, 1000*this.speedMultiplier);
	}
	
	//display X index (lable for 2nd theta loop)
	this.showindexX2=function(){
		for (var i=0; i<5; ++i){
			var posX = i * this.spaceX;
			var str=new string();
			index=this.indexStringX[i];
			this.indexX2.push(str.createString(
				this.context,
				50+posX,
				485,
				"Consolas",
				24,
				"#000000",
				1,
				index
			));
		}
		setTimeout(function(){
			theta.playAnimationPhase(++theta.currentPhase) 
		}, 1000*this.speedMultiplier);
	}
	
	
	// create cubes row to Xor up (show first cubes to start 1st theta loop )
	this.showCubes = function() {

		for (var i=0; i<5; ++i) {
			var c = new cube();
			this.object.push(c.createCube(
				this.context,
					this.startX+50*i,
					this.startY+200,
					50,
					"#8ED6FF",
					1,
					""
			));
		}

	
		setTimeout(function(){
			theta.playAnimationPhase(++theta.currentPhase) 
		}, 1000*this.speedMultiplier);
	}
	
	// operators XOR (show together with cubes for 1st theta loop )
	this.showOperatorXOR= function(k) {
		var i=k;
		for(var j=0; j<5; ++j){
		var opxor = new operator();
			this.oparray.push(opxor.createOperator(
				this.context,
				this.padding+this.startX+50*j,
				this.startY+200-i*50-this.padding,
				20,
				"#ffd66a",
				1,
				""
			));
		}
		/*setTimeout(function(){
			theta.playAnimationPhase(++theta.currentPhase) 
		}, 6000*this.speedMultiplier);*/
	}
	
	//cubes row to Xor Up (animation for 1st theta loop)
	this.xorRowUp=function(k){
			
			var delay = 1000;
			var i=k;
			var g=500;
			for(var j=0; j<5; ++j){
				theta.object[j].moveTo(theta.object[j].pos.x,theta.object[j].pos.y-50,0.5);
	
			}
			setTimeout(function(){
						if(i<4){
						theta.showOperatorXOR(i);
						}
						
					}, delay);
					
				
					delay += g;
					setTimeout(function(){
					
					theta.oparray=[];
					if (i < 4) {
						
						theta.xorRowUp(k+1);
						
					}
					
				}, delay);
			
			
			setTimeout(function(){
			theta.playAnimationPhase(++theta.currentPhase) 
			}, 6000*this.speedMultiplier);
			
			
		
		
	}
	
	// move rows new postion (ready for 2nd theta loop)
	this.moveXoredRow=function(){
		
		for(var i = 0;i<5;++i){
			var posX = i * this.spaceX;
			theta.object[i].moveTo(25+posX,27,0.5);
			theta.indexX[i].moveTo(50+posX,20,0.5);
			}
		
	}
	
	// draw skeleton (ready for 2nd theta loop)
	this.showRowSkeleton=function(){
		
		for (var i=0; i<5; ++i) {
			var posX = i * 150;
			var c = new cube();
			this.object1.push(c.createCube(//theta.object[i].pos.x,theta.object[i].pos.y-50
					this.context,
					25+posX,
					450,
					50,
					"#8ED6FF",
					1,
					""
			));
		}

	
	}
	
	//show Xor and Rot operators, lines (ready for 2nd theta loop)
	this.showOperation=function(){
		var opxor = new operator();
			this.oparray.push(opxor.createOperator(
				this.context,
				780,
				180,
				60,
				"#ffd66a",
				1,
				"XOR"
			));
		
		var oprot = new operator();
			this.oparray.push(oprot.createOperator(
				this.context,
				780,
				280,
				60,
				"#9900CC",
				1,
				"ROT"
			));
		
		for(var i=0;i<5;++i) {
			var posX = i * this.spaceX;
			var x1 = this.padding+posX+37.5;
			var y1 = this.padding+50;

			// and group (toand, toand2, opand)
			var x2 = x1+(this.spaceX/4);
			var y2 = y1+(this.spaceY/4)+100;

			var opand = new operator();//Rot
			this.extra.push(opand.createOperator(
				this.context,
				x2+25,
				y2,
				30,
				"#9900CC",
				1,
				""
			));

			var opxor = new operator();
			this.extra.push(opxor.createOperator(
				this.context,
				x1,
				y1+(this.spaceY/4*3)-50,
				30,
				"#ffd66a",
				1,
				""
			));
			// rot to xor
			var rottoxor=new line();
			this.extra.push(rottoxor.createLine(
					this.context,
					x2+20,
					y2+15,
					x1+15,
					y1+(this.spaceY/4*3)-50,
					"#000000",
					1
				));
			
			// xor to cube
			var xortocube=new line();
			this.extra.push(xortocube.createLine(
					this.context,
					x1,
					y1+(this.spaceY/4*3)-35,
					x1,
					y1+(this.spaceY/4*3)-5,
					"#000000",
					1
				));
		
			// group (torot, opxor)
			var x3 = x2+this.spaceX-50;
			var y3 = y2-225;

			var torot1 = new line();
			var toxor1= new line();
			if (i < 4) {
				this.extra.push(torot1.createLine(
					this.context,
					x3,
					y3,
					x1+67,
					y1+(this.spaceY/4*3)-165,
					"#000000",
					1
				));
				this.extra.push(toxor1.createLine(
					this.context,
					x1-12,
					y3,
					x3,
					y1+(this.spaceY/4*3)-50,
					"#000000",
					1
				));	
			} else {
				var torot= new line();
				this.extra.push(torot.createLine(
					this.context,
					this.padding+25,
					y3,
					this.padding+25,
					y3+50,
					"#000000",
					1
				));
				var torot2= new line();
				this.extra.push(torot2.createLine(
					this.context,
					this.padding+25,
					y3+50,
					this.padding+700,
					y3+50,
					"#000000",
					1
				));
				var torot3= new line();
				this.extra.push(torot3.createLine(
					this.context,
					this.padding+700,
					y3+50,
					this.padding+700,
					y3+210,
					"#000000",
					1
				));
				var toxor2=new line();
				this.extra.push(toxor2.createLine(
					this.context,
					this.padding+625,
					y3,
					this.padding+625,
					y3+100,
					"#000000",
					1
				));
				var toxor3=new line();
				this.extra.push(toxor3.createLine(
					this.context,
					this.padding+625,
					y3+100,
					this.padding+25,
					y3+100,
					"#000000",
					1
				));
				var toxor4=new line();
				this.extra.push(toxor4.createLine(
					this.context,
					this.padding+25,
					y3+100,
					this.padding+25,
					y3+317,
					"#000000",
					1
				));
				
			}

			
		}

		
		
		
	}
	
	//move indicators (animation for 2nd theta loop)
	this.animatexorWithRot=function(i){
		var delay = 1000;
		var s = 0.5 ;
		var g = 500 ;
		var k=i;
		//var start=k%5;
		var a=(((k-1)%5)+5)%5;//(val%n)+n)%n
		var b=(((k+1)%5)+5)%5;
		if(k==4){
			//var 
			var posX = k*0+15;
		}else{
		//	posX = k*0+15;
			posX = k*150+165;
			//posY = this.spaceY-450;
		}
		var posY = this.spaceY-450;
		// create 2 indicator for Xor+Rot animation
		var ac = new cube();
		theta.indicators.push(ac.createCube(
			this.context,
			this.padding+posX,
			this.padding+posY,
			20,
			"#FFF000",
			1,
			""
		));
		if(k==2){
			posX= k*0+15;
		}
		else if(k==3){
			posX= k*0+155;
		}
		else if(k==4){
			posX= k*50+115;
		}
		else{
		posX = k*150+465;
		}
		var dc = new cube();
		theta.indicators.push(dc.createCube(
			this.context,
			this.padding+posX,
			this.padding+posY,
			20,
			"#FFF000",
			1,
			""
		));
		setTimeout(function(){//1
				
				if(k==2){
					theta.indicators[1].moveTo(theta.indicators[1].pos.x,theta.indicators[1].pos.y+50,s);
					
				}
				else if(k==3){
					theta.indicators[0].moveTo(theta.indicators[0].pos.x,theta.indicators[0].pos.y+115,s-0.2);
					
				}
				else{
					theta.indicators[1].moveTo(theta.indicators[1].pos.x-80,theta.indicators[1].pos.y+220,s);
				}
			
		}, delay);

		delay += g;
		setTimeout(function(){//2
			if(k==2){
				theta.indicators[1].moveTo(theta.indicators[1].pos.x+685,theta.indicators[1].pos.y,s);
			}
			else if(k==3){
				theta.indicators[0].moveTo(theta.indicators[0].pos.x-645,theta.indicators[0].pos.y,s-0.2);
				theta.indicators[1].moveTo(theta.indicators[1].pos.x-80,theta.indicators[1].pos.y+220,s+0.2);
			}
			else{
			theta.indicators[0].moveTo(theta.indicators[0].pos.x+158,theta.indicators[0].pos.y+320,s+0.2);
			theta.indicators[1].moveTo(theta.indicators[0].pos.x+158,theta.indicators[0].pos.y+320,s-0.2);
			}
			
			
			
		}, delay);
		delay += g;
		setTimeout(function(){//3
			if(k==2){
				
				theta.indicators[1].moveTo(theta.indicators[1].pos.x,theta.indicators[1].pos.y+185,s-0.2);
			}
			else if(k==3){
				
				theta.indicators[0].moveTo(theta.indicators[0].pos.x,theta.indicators[0].pos.y+220,s-0.2);
				theta.indicators[1].moveTo(theta.indicators[0].pos.x,theta.indicators[0].pos.y+220,s+0.2);
			}
			else{
			
			theta.indicators[0].alpha=0;
			theta.indicators[1].moveTo(theta.indicators[1].pos.x,theta.indicators[1].pos.y+80,s);
			}
			
		}, delay);
		
		delay +=g;
		setTimeout(function(){
			if(k==2){
				theta.indicators[0].moveTo(theta.indicators[0].pos.x+158,theta.indicators[0].pos.y+320,s+0.2);
				theta.indicators[1].moveTo(theta.indicators[0].pos.x+158,theta.indicators[0].pos.y+320,s-0.2);
			}
			if(k==3){
			theta.indicators[0].alpha=0;
			theta.indicators[1].moveTo(theta.indicators[1].pos.x,theta.indicators[1].pos.y+80,s);
			}
		}, delay);
		
		delay +=g;
		setTimeout(function(){
			if(k==2){
			theta.indicators[0].alpha=0;
			theta.indicators[1].moveTo(theta.indicators[1].pos.x,theta.indicators[1].pos.y+80,s);
			}
		}, delay);
		
		delay += g;
		setTimeout(function(){
			theta.indicators=[];
			if (i < 4) {
				theta.animatexorWithRot(i+1);
				
			}else{
				setTimeout(function(){
				theta.playAnimationPhase(++theta.currentPhase) 
				}, 1000*this.speedMultiplier);
			}
			
			
		}, delay);
		
		
		
	}
	
	//move xor+rot-ed row (ready for 3rd theta loop)
	this.moveXorRotRow=function(){
		for(var i = 0;i<5;++i){
			var posX = i * 50;
			theta.object1[i].moveTo(posX+50,275,0.5);
			theta.indexX2[i].moveTo(posX+58,350,0.5);

			}
			
		setTimeout(function(){
			theta.playAnimationPhase(++theta.currentPhase) 
		}, 1000*this.speedMultiplier);
		
	}
	
	//create cubes row to Xor up (show first cubes to start 3rd theta loop )
	this.showCubes1 = function() {

		for (var i=0; i<5; ++i) {
			var c = new cube();
			this.object.push(c.createCube(
				this.context,
					50+50*i,
					275,
					50,
					"#8ED6FF",
					0.5,
					""
			));
		}
		
	}
	
	// create static Xor operator (display in 3rd theta loop)
	this.showOperatorXOR1= function(k) {
		var i=k;
		
		var opxor = new operator();
			this.indicators.push(opxor.createOperator(
				this.context,
				420,
				280,
				60,
				"#ffd66a",
				1,
				"XOR"
			));
		setTimeout(function(){
			theta.playAnimationPhase(++theta.currentPhase) 
		}, 1000*this.speedMultiplier);
		
	}
	
	// Operator XOR (show together with cubes for 3rd theta loop)
	this.showOperatorXOR2= function(k) {
		var i=k;
		for(var j=0; j<5; ++j){
		var opxor = new operator();
			this.oparray.push(opxor.createOperator(
				this.context,
				this.padding+this.startX+50*j,
				this.startY+250-i*50-this.padding,
				20,
				"#ffd66a",
				1,
				""
			));
		}
		/*setTimeout(function(){
			theta.playAnimationPhase(++theta.currentPhase) 
		}, 6000*this.speedMultiplier);*/
	}
	
	// cubes row to Xor (animation for 3rd theta loop)
	this.xorRowUp1=function(k){
			
			var delay = 1000;
			var i=k;
			var g=500;
			
			theta.showCubes1();
			
			setTimeout(function(){
			
			for(var j=0; j<5; ++j){
				theta.object[j].moveTo(theta.object[j].pos.x+465,theta.object[j].pos.y+100-50*i,0.5);
				//theta.object[j].moveTo(515,theta.object[j].pos.y+100-50*i,0.5);
			}
			}, delay);
			
			/*
			delay += g;
			setTimeout(function(){
			
			for(var j=0; j<5; ++j){
				theta.object[j].moveTo(theta.object[j].pos.x,theta.object[j].pos.y-50*i,0.5);
	
			}
			}, delay);
			*/
			delay += g;
			setTimeout(function(){
						
						
						//theta.showCubes1();
						theta.showOperatorXOR2(i);
						
						
					}, delay);
					
				
					delay += g;
					setTimeout(function(){
					theta.object=[];
					theta.oparray=[];
					if (i < 4) {
						
						theta.xorRowUp1(k+1);
						
					}
					
				}, delay);
		
			
			setTimeout(function(){
			theta.playAnimationPhase(++theta.currentPhase) 
			},10000*this.speedMultiplier);

	}
	
	// draw last State
	this.showStatelastSkeleton = function() { //play 0
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
			1,
			filler
		));

		//this.moveCubes(1000, 750, 0.5);
		
		setTimeout(function(){
			theta.playAnimationPhase(++theta.currentPhase) 
		}, 1000*this.speedMultiplier);
	}
	
	this.objectHitTarget = function()
	{
		theta.hitCounter++;
		if(theta.hitCounter >= theta.targetCounter) 
		{
			//theta.reorderCube();
			theta.hitCounter = 0;
			theta.playAnimationPhase(++theta.currentPhase);
		}
	}
	
	
	// clear state,opeator index arrays
	this.destroyArrays1 = function()
	{
		// destroy skeleton
		for (var i=0; i<theta.extra.length; ++i) {
			theta.oparray[i]=null;
			theta.indexX[i]=null;
			theta.indexY[i]=null;
			theta.extra[i] = null;
		}
		theta.oparray=[];
		theta.indexX=[];
		theta.indexY=[];
		theta.extra = [];
	}
	
	// clear indicators
	this.destroyArrays2=function(){
		for(var i=0; i<theta.indicators.length;++i){
			theta.indicators[i]=null;
		}
		theta.indicators=[];
		for(var i=0;i<theta.extra.length;++i){
			theta.extra[i]=null;
		}
		theta.extra=[];
		for(var i=0; i<theta.object.length; ++i){
			theta.object[i]=null;
			theta.indexX[i]=null;
		}
		theta.object=[];
		theta.indexX=[];
		theta.oparray=[];
		setTimeout(function(){
			theta.playAnimationPhase(++theta.currentPhase) 
		}, 1000*this.speedMultiplier);
	}
	
	// clear everything
	this.destroyEverything=function(){
		for(var i=0; i<5; ++i){
			theta.oparray[i]=null;
			theta.object[i]=null;
			theta.object1[i]=null;
			theta.indexX2[i]=null;
			theta.indexX[i]=null;
			theta.indexY[i]=null;
		}
		theta.oparray=[];
		theta.indexX2=[];
		theta.object=[];
		theta.object1=[];
		theta.indexX=[];
		theta.indexY=[];
		theta.indicators=[];
		theta.extra=[];
		setTimeout(function(){
			theta.playAnimationPhase(++theta.currentPhase) 
		}, 1000*this.speedMultiplier);
	}
	
	this.update = function()
	{
		time.updateTime();
		
		theta_render.update();
	}
	// Animation phases
	this.playAnimationPhase = function(phase)
	{
		switch(phase)
		{
			case 0:
				this.showStateSkeleton();
				break;
			case 1:
				this.showindexXY();
				break;
			case 2:
				this.showCubes();
				break;
			case 3:
				this.xorRowUp(0);
				break;
			case 4:
				this.destroyArrays1();
				
				break;
			case 5:
				this.showindexX1();
				break;
			case 6:
				this.moveXoredRow();
				break;
			case 7:
				this.showRowSkeleton();
				break;
			case 8:
				this.showindexX2();
				break;
			case 9:
				this.showOperation();
				break;
			case 10: 
				this.animatexorWithRot(0);
				break;
			case 11:
				this.destroyArrays2();
				break;
			case 12:
				this.moveXorRotRow();
				break;
			case 13:
				this.showStateSkeleton();
				break;
			case 14:
				this.showindexXY();
				break;
			case 15:
				this.showOperatorXOR1();
				break;
			case 16:
				this.xorRowUp1(0);
				break;
			case 17:
				this.destroyEverything();
				break;
			case 18:
				this.showStatelastSkeleton();
				break;
			
		}
	}
}

theta.init();