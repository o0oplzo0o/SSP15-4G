var pi = new function()
{
	this.canvas;
	this.context;
	this.speedMultiplier = 1;
	
	// track moving object
	this.currentPhase = 0;
	this.hitCounter = 0;
	this.targetCounter = 0;
	
	//ERIC: all timeouts will be stored here, when the game is pause,
	// all setTimeout(Timer function in util.js) will be handle in that function
	this.currentTimeout = new Array();
	
	// input
	this.indexStringX=["3","4","0","1","2"];
	this.indexStringY=["2","1","0","4","3"];
	this.indexStringZ=["RHO[X][Y]","PI[X][Y]"];
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
	
	//ERIC: Insert all critical steps into this array
	// Objects will be cleared automatically in playAnimationPhase() on critical steps
	this.step_array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];

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
	
	//ERIC: Called when user skip this pi steps,
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
		
		this.oparray = new Array();
		this.object = new Array();
		this.object1=new Array();
		this.extra = new Array();
		this.indexX=new Array();
		this.indexX2=new Array();
		this.indexY=new Array();
		this.indicators=new Array();
		
		this.currentTimeout = new Array();
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	}
	
	//ERIC: Handle pause here
	// For each of the objects created, call pause to stop their updates (movement, etc)
	this.pause = function()
	{
		clearInterval(this.refresh);
		
		var len = Math.max(this.oparray.length,this.object.length,this.object1.length,this.extra.length,
							this.indexX.length,this.indexX2.length,this.indexY.length,this.indicators.length,this.currentTimeout.length);
		for(var i=0; i<len; i++)
		{
			if(this.oparray[i])
				this.oparray[i].pause();
			if(this.object[i])
				this.object[i].pause();
			if(this.object1[i])
				this.object1[i].pause();
			if(this.extra[i])
				this.extra[i].pause();	
			if(this.indexX[i])
				this.indexX[i].pause();
			if(this.indexX2[i])
				this.indexX2[i].pause();
			if(this.indexY[i])
				this.indexY[i].pause();
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
		
		var len = Math.max(this.oparray.length,this.object.length,this.object1.length,this.extra.length,
							this.indexX.length,this.indexX2.length,this.indexY.length,this.indicators.length,this.currentTimeout.length);
		for(var i=0; i<len; i++)
		{
			if(this.oparray[i])
				this.oparray[i].resume();
			if(this.object[i])
				this.object[i].resume();
			if(this.object1[i])
				this.object1[i].resume();
			if(this.extra[i])
				this.extra[i].resume();	
			if(this.indexX[i])
				this.indexX[i].resume();
			if(this.indexX2[i])
				this.indexX2[i].resume();
			if(this.indexY[i])
				this.indexY[i].resume();
			if(this.indicators[i])
				this.indicators[i].resume();			
			if(this.currentTimeout[i])
				this.currentTimeout[i].resume();				
		}
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
			200,
			175,
			50,
			"#8ED6FF",
			0.25,
			filler
		));
		
		// (context, x, y, size, color, alpha, input)
		var skeleton = new slice();
		this.extra.push(skeleton.createSlice(
			this.context,
			800,
			175,
			50,
			"#8ED6FF",
			0.25,
			filler
		));
		
		this.currentTimeout.push(new Timer(function(){
			pi.playAnimationPhase(++pi.currentPhase) 
		}, 1000*this.speedMultiplier));
	}
	//display XY index (label)
	this.showindexXY=function(){
		//left 25 cube 5 by 5 index(34012)
		for (var i=0; i<5; ++i){
			var str=new string();
			indexX2=this.indexStringX[i];
			this.indexX.push(str.createString(this.context,210+i*55,450,"Consolas",24,"#000000",1,indexX2));
		}
		for (var i=0; i<5; ++i){
			var str=new string();
			indexy=this.indexStringY[i];
			this.indexY.push(str.createString(this.context,180,200+i*55,"Consolas",24,"#000000",1,indexy));
		}
		
		//right 25 cube 5 by 5 index(34012)
		for (var i=0; i<5; ++i){
			var str=new string();
			indexX2=this.indexStringX[i];
			this.indexX.push(str.createString(this.context,810+i*55,450,"Consolas",24,"#000000",1,indexX2));
		}
		for (var i=0; i<5; ++i){
			var str=new string();
			indexy=this.indexStringY[i];
			this.indexY.push(str.createString(this.context,780,200+i*55,"Consolas",24,"#000000",1,indexy));
		}
		
		//Rho Array
		for (var i=0; i<1; ++i){
			var str=new string();
			indexX2=this.indexStringZ[0];
			this.indexX.push(str.createString(this.context,180,140,"Consolas",24,"#000000",1,indexX2));
		}
		//Pi array
		for (var i=0; i<1; ++i){
			var str=new string();
			indexy=this.indexStringZ[1];
			this.indexY.push(str.createString(this.context,780,140,"Consolas",24,"#000000",1,indexy));
		}
		
		
		
		
		this.currentTimeout.push(new Timer(function(){
			pi.playAnimationPhase(++pi.currentPhase) 
		}, 1000*this.speedMultiplier));
	}
	
	
	// create cubes row to Xor up (show first cubes to start 1st pi loop )
	this.showCubes = function() {

		//for (var i=0; i<4; ++i) {
			var c = new cube();
			var delay = 2000;
			
			this.object.push(c.createCube(this.context,300,275,50,"#8ED6FF",1,"[0,0]")); //00
			
			
			
			this.currentTimeout.push(new Timer(function(){
			pi.object[0].moveTo(pi.object[0].pos.x+300,pi.object[0].pos.y,0.5)
			}, delay-1000));
			this.currentTimeout.push(new Timer(function(){
			pi.object[0].moveTo(pi.object[0].pos.x+300,pi.object[0].pos.y,0.5)
			}, delay));
	
		this.currentTimeout.push(new Timer(function(){
			pi.playAnimationPhase(++pi.currentPhase) 
		}, 3000*this.speedMultiplier));
	}
	this.showCubes1 = function() {

		//for (var i=0; i<4; ++i) {
			var c = new cube();
			var delay = 2000;
			this.object.push(c.createCube(this.context,300,225,50,"#8ED6FF",1,"[0,1]"));//13

			this.currentTimeout.push(new Timer(function(){
			pi.object[1].moveTo(pi.object[1].pos.x+300,pi.object[1].pos.y+50,0.5)
			}, delay-1000));
			this.currentTimeout.push(new Timer(function(){
			pi.object[1].moveTo(pi.object[1].pos.x+350,pi.object[1].pos.y+100,0.5)
			}, delay));
	
		this.currentTimeout.push(new Timer(function(){
			pi.playAnimationPhase(++pi.currentPhase) 
		}, 3000*this.speedMultiplier));
	}
	this.showCubes2 = function() {

		//for (var i=0; i<4; ++i) {
			var c = new cube();
			var delay = 2000;
			this.object.push(c.createCube(this.context,300,175,50,"#8ED6FF",1,"[0,2]"));//21
			
			this.currentTimeout.push(new Timer(function(){
			pi.object[2].moveTo(pi.object[2].pos.x+300,pi.object[2].pos.y+100,0.5)
			}, delay-1000));
			this.currentTimeout.push(new Timer(function(){
			pi.object[2].moveTo(pi.object[2].pos.x+400,pi.object[2].pos.y-50,0.5)
			}, delay));
	
		this.currentTimeout.push(new Timer(function(){
			pi.playAnimationPhase(++pi.currentPhase) 
		}, 3000*this.speedMultiplier));
	}
	this.showCubes3 = function() {

		//for (var i=0; i<4; ++i) {
			var c = new cube();
			var delay = 2000;
			this.object.push(c.createCube(this.context,300,375,50,"#8ED6FF",1,"[0,3]"));//34

			this.currentTimeout.push(new Timer(function(){
			pi.object[3].moveTo(pi.object[3].pos.x+300,pi.object[3].pos.y-100,0.5)
			}, delay-1000));
			this.currentTimeout.push(new Timer(function(){
			pi.object[3].moveTo(pi.object[3].pos.x+200,pi.object[3].pos.y+50,0.5)
			}, delay));
	
		this.currentTimeout.push(new Timer(function(){
			pi.playAnimationPhase(++pi.currentPhase) 
		}, 3000*this.speedMultiplier));
	}
	this.showCubes4 = function() {

		//for (var i=0; i<4; ++i) {
			var c = new cube();
			var delay = 2000;
			this.object.push(c.createCube(this.context,300,325,50,"#8ED6FF",1,"[0,4]"));//42

			this.currentTimeout.push(new Timer(function(){
			pi.object[4].moveTo(pi.object[4].pos.x+300,pi.object[4].pos.y-50,0.5)
			}, delay-1000));
			this.currentTimeout.push(new Timer(function(){
			pi.object[4].moveTo(pi.object[4].pos.x+250,pi.object[4].pos.y-100,0.5)
			}, delay));
	
		this.currentTimeout.push(new Timer(function(){
			pi.playAnimationPhase(++pi.currentPhase) 
		}, 3000*this.speedMultiplier));
	}
	this.showCubes5 = function() {

		//for (var i=0; i<4; ++i) {
			var c = new cube();
			var delay = 2000;
			this.object.push(c.createCube(this.context,350,275,50,"#8ED6FF",1,"[1,0]"));//02

			this.currentTimeout.push(new Timer(function(){
			pi.object[5].moveTo(pi.object[5].pos.x+250,pi.object[5].pos.y,0.5)
			}, delay-1000));
			this.currentTimeout.push(new Timer(function(){
			pi.object[5].moveTo(pi.object[5].pos.x+300,pi.object[5].pos.y-100,0.5)
			}, delay));
	
		this.currentTimeout.push(new Timer(function(){
			pi.playAnimationPhase(++pi.currentPhase) 
		}, 3000*this.speedMultiplier));
	}
	this.showCubes6 = function() {

		//for (var i=0; i<4; ++i) {
			var c = new cube();
			var delay = 2000;
			this.object.push(c.createCube(this.context,350,225,50,"#8ED6FF",1,"[1,1]"));//10

			this.currentTimeout.push(new Timer(function(){
			pi.object[6].moveTo(pi.object[6].pos.x+250,pi.object[6].pos.y+50,0.5)
			}, delay-1000));
			this.currentTimeout.push(new Timer(function(){
			pi.object[6].moveTo(pi.object[6].pos.x+350,pi.object[6].pos.y+0,0.5)
			}, delay));
	
		this.currentTimeout.push(new Timer(function(){
			pi.playAnimationPhase(++pi.currentPhase) 
		}, 3000*this.speedMultiplier));
	}
	this.showCubes7 = function() {

		//for (var i=0; i<4; ++i) {
			var c = new cube();
			var delay = 2000;
			this.object.push(c.createCube(this.context,350,175,50,"#8ED6FF",1,"[1,2]"));//23

			this.currentTimeout.push(new Timer(function(){
			pi.object[7].moveTo(pi.object[7].pos.x+250,pi.object[7].pos.y+100,0.5)
			}, delay-1000));
			this.currentTimeout.push(new Timer(function(){
			pi.object[7].moveTo(pi.object[7].pos.x+400,pi.object[7].pos.y+100,0.5)
			}, delay));
	
		this.currentTimeout.push(new Timer(function(){
			pi.playAnimationPhase(++pi.currentPhase) 
		}, 3000*this.speedMultiplier));
	}
	this.showCubes8 = function() {

		//for (var i=0; i<4; ++i) {
			var c = new cube();
			var delay = 2000;
			this.object.push(c.createCube(this.context,350,375,50,"#8ED6FF",1,"[1,3]"));//31

			this.currentTimeout.push(new Timer(function(){
			pi.object[8].moveTo(pi.object[8].pos.x+250,pi.object[8].pos.y-100,0.5)
			}, delay-1000));
			this.currentTimeout.push(new Timer(function(){
			pi.object[8].moveTo(pi.object[8].pos.x+200,pi.object[8].pos.y-50,0.5)
			}, delay));
	
		this.currentTimeout.push(new Timer(function(){
			pi.playAnimationPhase(++pi.currentPhase) 
		}, 3000*this.speedMultiplier));
	}
	this.showCubes9 = function() {

		//for (var i=0; i<4; ++i) {
			var c = new cube();
			var delay = 2000;
			this.object.push(c.createCube(this.context,350,325,50,"#8ED6FF",1,"[1,4]"));//44

			this.currentTimeout.push(new Timer(function(){
			pi.object[9].moveTo(pi.object[9].pos.x+250,pi.object[9].pos.y-50,0.5)
			}, delay-1000));
			this.currentTimeout.push(new Timer(function(){
			pi.object[9].moveTo(pi.object[9].pos.x+250,pi.object[9].pos.y+50,0.5)
			}, delay));
	
		this.currentTimeout.push(new Timer(function(){
			pi.playAnimationPhase(++pi.currentPhase) 
		}, 3000*this.speedMultiplier));
	}
	this.showCubes10 = function() {

		//for (var i=0; i<4; ++i) {
			var c = new cube();
			var delay = 2000;
			this.object.push(c.createCube(this.context,400,275,50,"#8ED6FF",1,"[2,0]"));//04

			this.currentTimeout.push(new Timer(function(){
			pi.object[10].moveTo(pi.object[10].pos.x+200,pi.object[10].pos.y,0.5)
			}, delay-1000));
			this.currentTimeout.push(new Timer(function(){
			pi.object[10].moveTo(pi.object[10].pos.x+300,pi.object[10].pos.y+50,0.5)
			}, delay));
	
		this.currentTimeout.push(new Timer(function(){
			pi.playAnimationPhase(++pi.currentPhase) 
		}, 3000*this.speedMultiplier));
	}
	this.showCubes11 = function() {

		//for (var i=0; i<4; ++i) {
			var c = new cube();
			var delay = 2000;
			this.object.push(c.createCube(this.context,400,225,50,"#8ED6FF",1,"[2,1]"));//12

			this.currentTimeout.push(new Timer(function(){
			pi.object[11].moveTo(pi.object[11].pos.x+200,pi.object[11].pos.y+50,0.5)
			}, delay-1000));
			this.currentTimeout.push(new Timer(function(){
			pi.object[11].moveTo(pi.object[11].pos.x+350,pi.object[11].pos.y-100,0.5)
			}, delay));
	
		this.currentTimeout.push(new Timer(function(){
			pi.playAnimationPhase(++pi.currentPhase) 
		}, 3000*this.speedMultiplier));
	}
	this.showCubes12 = function() {

		//for (var i=0; i<4; ++i) {
			var c = new cube();
			var delay = 2000;
			this.object.push(c.createCube(this.context,400,175,50,"#8ED6FF",1,"[2,2]"));//20

			this.currentTimeout.push(new Timer(function(){
			pi.object[12].moveTo(pi.object[12].pos.x+200,pi.object[12].pos.y+100,0.5)
			}, delay-1000));
			this.currentTimeout.push(new Timer(function(){
			pi.object[12].moveTo(pi.object[12].pos.x+400,pi.object[12].pos.y,0.5)
			}, delay));
	
		this.currentTimeout.push(new Timer(function(){
			pi.playAnimationPhase(++pi.currentPhase) 
		}, 3000*this.speedMultiplier));
	}
	this.showCubes13 = function() {

		//for (var i=0; i<4; ++i) {
			var c = new cube();
			var delay = 2000;
			this.object.push(c.createCube(this.context,400,375,50,"#8ED6FF",1,"[2,3]"));//33

			this.currentTimeout.push(new Timer(function(){
			pi.object[13].moveTo(pi.object[13].pos.x+200,pi.object[13].pos.y-100,0.5)
			}, delay-1000));
			this.currentTimeout.push(new Timer(function(){
			pi.object[13].moveTo(pi.object[13].pos.x+200,pi.object[13].pos.y+100,0.5)
			}, delay));
	
		this.currentTimeout.push(new Timer(function(){
			pi.playAnimationPhase(++pi.currentPhase) 
		}, 3000*this.speedMultiplier));
	}
	this.showCubes14 = function() {

		//for (var i=0; i<4; ++i) {
			var c = new cube();
			var delay = 2000;
			this.object.push(c.createCube(this.context,400,325,50,"#8ED6FF",1,"[2,4]"));//41

			this.currentTimeout.push(new Timer(function(){
			pi.object[14].moveTo(pi.object[14].pos.x+200,pi.object[14].pos.y-50,0.5)
			}, delay-1000));
			this.currentTimeout.push(new Timer(function(){
			pi.object[14].moveTo(pi.object[14].pos.x+250,pi.object[14].pos.y-50,0.5)
			}, delay));
	
		this.currentTimeout.push(new Timer(function(){
			pi.playAnimationPhase(++pi.currentPhase) 
		}, 3000*this.speedMultiplier));
	}
	this.showCubes15 = function() {

		//for (var i=0; i<4; ++i) {
			var c = new cube();
			var delay = 2000;
			this.object.push(c.createCube(this.context,200,275,50,"#8ED6FF",1,"[3,0]"));//01

			this.currentTimeout.push(new Timer(function(){
			pi.object[15].moveTo(pi.object[15].pos.x+400,pi.object[15].pos.y,0.5)
			}, delay-1000));
			this.currentTimeout.push(new Timer(function(){
			pi.object[15].moveTo(pi.object[15].pos.x+300,pi.object[15].pos.y-50,0.5)
			}, delay));
	
		this.currentTimeout.push(new Timer(function(){
			pi.playAnimationPhase(++pi.currentPhase) 
		}, 3000*this.speedMultiplier));
	}
	this.showCubes16 = function() {

		//for (var i=0; i<4; ++i) {
			var c = new cube();
			var delay = 2000;
			this.object.push(c.createCube(this.context,200,225,50,"#8ED6FF",1,"[3,1]"));//14

			this.currentTimeout.push(new Timer(function(){
			pi.object[16].moveTo(pi.object[16].pos.x+400,pi.object[16].pos.y+50,0.5)
			}, delay-1000));
			this.currentTimeout.push(new Timer(function(){
			pi.object[16].moveTo(pi.object[16].pos.x+350,pi.object[16].pos.y+50,0.5)
			}, delay));
	
		this.currentTimeout.push(new Timer(function(){
			pi.playAnimationPhase(++pi.currentPhase) 
		}, 3000*this.speedMultiplier));
	}
	this.showCubes17 = function() {

		//for (var i=0; i<4; ++i) {
			var c = new cube();
			var delay = 2000;
			this.object.push(c.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//22

			this.currentTimeout.push(new Timer(function(){
			pi.object[17].moveTo(pi.object[17].pos.x+400,pi.object[17].pos.y+100,0.5)
			}, delay-1000));
			this.currentTimeout.push(new Timer(function(){
			pi.object[17].moveTo(pi.object[17].pos.x+400,pi.object[17].pos.y-100,0.5)
			}, delay));
	
		this.currentTimeout.push(new Timer(function(){
			pi.playAnimationPhase(++pi.currentPhase) 
		}, 3000*this.speedMultiplier));
	}
	this.showCubes18 = function() {

		//for (var i=0; i<4; ++i) {
			var c = new cube();
			var delay = 2000;
			this.object.push(c.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//30

			this.currentTimeout.push(new Timer(function(){
			pi.object[18].moveTo(pi.object[18].pos.x+400,pi.object[18].pos.y-100,0.5)
			}, delay-1000));
			this.currentTimeout.push(new Timer(function(){
			pi.object[18].moveTo(pi.object[18].pos.x+200,pi.object[18].pos.y,0.5)
			}, delay));
	
		this.currentTimeout.push(new Timer(function(){
			pi.playAnimationPhase(++pi.currentPhase) 
		}, 3000*this.speedMultiplier));
	}
	this.showCubes19 = function() {

		//for (var i=0; i<4; ++i) {
			var c = new cube();
			var delay = 2000;
			this.object.push(c.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//43

			this.currentTimeout.push(new Timer(function(){
			pi.object[19].moveTo(pi.object[19].pos.x+400,pi.object[19].pos.y-50,0.5)
			}, delay-1000));
			this.currentTimeout.push(new Timer(function(){
			pi.object[19].moveTo(pi.object[19].pos.x+250,pi.object[19].pos.y+100,0.5)
			}, delay));
	
		this.currentTimeout.push(new Timer(function(){
			pi.playAnimationPhase(++pi.currentPhase) 
		}, 3000*this.speedMultiplier));
	}
	this.showCubes20 = function() {

		//for (var i=0; i<4; ++i) {
			var c = new cube();
			var delay = 2000;
			this.object.push(c.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//03

			this.currentTimeout.push(new Timer(function(){
			pi.object[20].moveTo(pi.object[20].pos.x+350,pi.object[20].pos.y,0.5)
			}, delay-1000));
			this.currentTimeout.push(new Timer(function(){
			pi.object[20].moveTo(pi.object[20].pos.x+300,pi.object[20].pos.y+100,0.5)
			}, delay));
	
		this.currentTimeout.push(new Timer(function(){
			pi.playAnimationPhase(++pi.currentPhase) 
		}, 3000*this.speedMultiplier));
	}
	this.showCubes21 = function() {

		//for (var i=0; i<4; ++i) {
			var c = new cube();
			var delay = 2000;
			this.object.push(c.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//11

			this.currentTimeout.push(new Timer(function(){
			pi.object[21].moveTo(pi.object[21].pos.x+350,pi.object[21].pos.y+50,0.5)
			}, delay-1000));
			this.currentTimeout.push(new Timer(function(){
			pi.object[21].moveTo(pi.object[21].pos.x+350,pi.object[21].pos.y-50,0.5)
			}, delay));
	
		this.currentTimeout.push(new Timer(function(){
			pi.playAnimationPhase(++pi.currentPhase) 
		}, 3000*this.speedMultiplier));
	}
	this.showCubes22 = function() {

		//for (var i=0; i<4; ++i) {
			var c = new cube();
			var delay = 2000;
			this.object.push(c.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//24

			this.currentTimeout.push(new Timer(function(){
			pi.object[22].moveTo(pi.object[22].pos.x+350,pi.object[22].pos.y+100,0.5)
			}, delay-1000));
			this.currentTimeout.push(new Timer(function(){
			pi.object[22].moveTo(pi.object[22].pos.x+400,pi.object[22].pos.y+50,0.5)
			}, delay));
	
		this.currentTimeout.push(new Timer(function(){
			pi.playAnimationPhase(++pi.currentPhase) 
		}, 3000*this.speedMultiplier));
	}
	this.showCubes23 = function() {

		//for (var i=0; i<4; ++i) {
			var c = new cube();
			var delay = 2000;
			this.object.push(c.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//32

			this.currentTimeout.push(new Timer(function(){
			pi.object[23].moveTo(pi.object[23].pos.x+350,pi.object[23].pos.y-100,0.5)
			}, delay-1000));
			this.currentTimeout.push(new Timer(function(){
			pi.object[23].moveTo(pi.object[23].pos.x+200,pi.object[23].pos.y-100,0.5)
			}, delay));
	
		this.currentTimeout.push(new Timer(function(){
			pi.playAnimationPhase(++pi.currentPhase) 
		}, 3000*this.speedMultiplier));
	}
	this.showCubes24 = function() {
			var c = new cube();
			var delay = 2000;
			this.object.push(c.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//40
			
			this.currentTimeout.push(new Timer(function(){
			pi.object[24].moveTo(pi.object[24].pos.x+350,pi.object[24].pos.y-50,0.5)
			}, delay-1000));	
			this.currentTimeout.push(new Timer(function(){
			pi.object[24].moveTo(pi.object[24].pos.x+250,pi.object[24].pos.y,0.5)
			}, delay));

			
		this.currentTimeout.push(new Timer(function(){
			pi.playAnimationPhase(++pi.currentPhase) 
		}, 3000*this.speedMultiplier));
	}
	
	// operators XOR (show together with cubes for 1st pi loop )
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
			pi.playAnimationPhase(++pi.currentPhase) 
		}, 6000*this.speedMultiplier);*/
	}
	
	//cubes row to Xor Up (animation for 1st pi loop)
	/*this.xorRowUp=function(k){
			
			var delay = 1000;
			
			setTimeout(function(){
			pi.object[j].moveTo(pi.object[j].pos.x+600,pi.object[j].pos.y,0.5)
			}, delay);
			
			for(var j=0; j<1; ++j){
				pi.object[j].moveTo(pi.object[j].pos.x+600,pi.object[j].pos.y,0.5);
	
			}
			
			
			setTimeout(function(){
			pi.playAnimationPhase(++pi.currentPhase) 
			}, 2000*this.speedMultiplier);
			
			
		
		
	}*/
	
	
	// draw skeleton (ready for 2nd pi loop)
	this.showRowSkeleton=function(){
		
		for (var i=0; i<5; ++i) {
			var posX = i * 150;
			var c = new cube();
			this.object1.push(c.createCube(//pi.object[i].pos.x,pi.object[i].pos.y-50
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
	
		
	// draw last State
	this.showStatelastSkeleton = function() { //play 0
		var filler = new Array();
		for (var i=0; i<25; ++i) {
			var c = new cube();
			this.object.push(c.createCube(this.context,300,275,50,"#8ED6FF",1,"[0,0]"));
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
		
		this.currentTimeout.push(new Timer(function(){
			pi.playAnimationPhase(++pi.currentPhase) 
		}, 1000*this.speedMultiplier));
	}
		
	// clear everything
	this.destroyEverything=function(){
		for(var i=0; i<5; ++i){
			pi.oparray[i]=null;
			pi.object[i]=null;
			pi.object1[i]=null;
			pi.indexX2[i]=null;
			pi.indexX[i]=null;
			pi.indexY[i]=null;
		}
		pi.oparray=[];
		pi.indexX2=[];
		pi.object=[];
		pi.object1=[];
		pi.indexX=[];
		pi.indexY=[];
		pi.indicators=[];
		pi.extra=[];
		this.currentTimeout.push(new Timer(function(){
			pi.playAnimationPhase(++pi.currentPhase) 
		}, 1000*this.speedMultiplier));
	}
	
	
	this.update = function()
	{
		time.updateTime();
		
		pi_render.update();
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
			// this.currentTimeout = new Array();
			// this.object = new Array();
			// this.sortedObject = new Array();
		}
		
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
				this.showCubes1();
				break;
			case 4:
				this.showCubes2();
				break;
			case 5:
				this.showCubes3();
				break;
			case 6:
				this.showCubes4();
				break;
			case 7:
				this.showCubes5();
				break;
			case 8:
				this.showCubes6();
				break;
			case 9:
				this.showCubes7();
				break;
			case 10:
				this.showCubes8();
				break;
			case 11:
				this.showCubes9();
				break;
			case 12:
				this.showCubes10();
				break;
			case 13:
				this.showCubes11();
				break;
			case 14:
				this.showCubes12();
				break;
			case 15:
				this.showCubes13();
				break;
			case 16:
				this.showCubes14();
				break;
			case 17:
				this.showCubes15();
				break;
			case 18:
				this.showCubes16();
				break;
			case 19:
				this.showCubes17();
				break;
			case 20:
				this.showCubes18();
				break;
			case 21:
				this.showCubes19();
				break;
			case 22:
				this.showCubes20();
				break;
			case 23:
				this.showCubes21();
				break;
			case 24:
				this.showCubes22();
				break;
			case 25:
				this.showCubes23();
				break;
			case 26:
				this.showCubes24();
				break;
			case 27:
				this.destroyEverything();
				break;
			case 28:
				this.showStatelastSkeleton();
				break;
			
		}
	}
}