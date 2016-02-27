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
	this.m_dialog;
	this.message = "";
	
	// animation sets
	this.object = new Array();
	this.sortedObject = new Array();
	//this.maxPhase = 5;
	//this.dialogs=new Array();
	this.indexStringX=["3","4","0","1","2"];
	this.indexStringY=["2","1","0","4","3"];
	this.indexStringZ=["RHO[X][Y]","PI[X][Y]"];
	
	//ERIC: Insert all critical steps into this array
	// Objects will be cleared automatically in playAnimationPhase() on critical steps
	this.step_array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53];
	
	// animation loop
	this.refresh;

	// display metrics
	this.padding = 25;
	this.spaceX = 150;
	this.spaceY = 500;
	this.startX=515;
	this.startY=175;
	
	
	this.init = function()
	{
		this.canvas = document.getElementById("keccakCanvas");
		this.context = this.canvas.getContext("2d");
		
		this.currentPhase = 0;
		this.hitCounter = 0;
		this.targetCounter = 0;
		this.object = new Array();
		this.sortedObject = new Array();

		this.m_dialog = new dialog();
		this.m_dialog.createDialog(this.context,this.message);
		
		this.playAnimationPhase(this.currentPhase); 
		
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
		this.object = new Array();
		this.sortedObject = new Array();
		
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	}
	
	//ERIC: Handle pause here
	// For each of the objects created, call pause to stop their updates (movement, etc)
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
	
	//ERIC: Handle resume here
	// For each of the objects created, call resume to continue their updates (movement, etc)
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
	
	this.update = function()
	{
		time.updateTime();
		
		pi_render.update();
	}
	//pi phase 1 Start
	this.storedraw1a=function(){

				var filler = new Array();
				for (var i=0; i<25; ++i) {
					filler.push("");
				}

				// (context, x, y, size, color, alpha, input)
				var skeleton = new slice();
				this.object.push(skeleton.createSlice(
					this.context,
					200,
					175,
					50,
					"#8ED6FF",
					0.25,
					filler
				));
				// (context, x, y, size, color, alpha, input)
				skeleton = new slice();
				this.object.push(skeleton.createSlice(
					this.context,
					800,
					175,
					50,
					"#8ED6FF",
					0.25,
					filler
				));
	}
	this.storedraw1b=function(){
		
			var str=new string();
			this.object.push(str.createString(this.context,210+0*55,450,"monospace",24,"#000000",1,pi.indexStringX[0]));
			var str=new string();
			this.object.push(str.createString(this.context,210+1*55,450,"monospace",24,"#000000",1,pi.indexStringX[1]));
			var str=new string();
			this.object.push(str.createString(this.context,210+2*55,450,"monospace",24,"#000000",1,pi.indexStringX[2]));
			var str=new string();
			this.object.push(str.createString(this.context,210+3*55,450,"monospace",24,"#000000",1,pi.indexStringX[3]));
			var str=new string();
			this.object.push(str.createString(this.context,210+4*55,450,"monospace",24,"#000000",1,pi.indexStringX[4]));


			var str=new string();
			this.object.push(str.createString(this.context,180,200+0*55,"monospace",24,"#000000",1,pi.indexStringY[0]));
			var str=new string();
			this.object.push(str.createString(this.context,180,200+1*55,"monospace",24,"#000000",1,pi.indexStringY[1]));
			var str=new string();
			this.object.push(str.createString(this.context,180,200+2*55,"monospace",24,"#000000",1,pi.indexStringY[2]));
			var str=new string();
			this.object.push(str.createString(this.context,180,200+3*55,"monospace",24,"#000000",1,pi.indexStringY[3]));
			var str=new string();
			this.object.push(str.createString(this.context,180,200+4*55,"monospace",24,"#000000",1,pi.indexStringY[4]));
			
			var str=new string();
			this.object.push(str.createString(this.context,810+0*55,450,"monospace",24,"#000000",1,pi.indexStringX[0]));
			var str=new string();
			this.object.push(str.createString(this.context,810+1*55,450,"monospace",24,"#000000",1,pi.indexStringX[1]));
			var str=new string();
			this.object.push(str.createString(this.context,810+2*55,450,"monospace",24,"#000000",1,pi.indexStringX[2]));
			var str=new string();
			this.object.push(str.createString(this.context,810+3*55,450,"monospace",24,"#000000",1,pi.indexStringX[3]));
			var str=new string();
			this.object.push(str.createString(this.context,810+4*55,450,"monospace",24,"#000000",1,pi.indexStringX[4]));

			var str=new string();
			this.object.push(str.createString(this.context,780,200+0*55,"monospace",24,"#000000",1,pi.indexStringY[0]));
			var str=new string();
			this.object.push(str.createString(this.context,780,200+1*55,"monospace",24,"#000000",1,pi.indexStringY[1]));
			var str=new string();
			this.object.push(str.createString(this.context,780,200+2*55,"monospace",24,"#000000",1,pi.indexStringY[2]));
			var str=new string();
			this.object.push(str.createString(this.context,780,200+3*55,"monospace",24,"#000000",1,pi.indexStringY[3]));
			var str=new string();
			this.object.push(str.createString(this.context,780,200+4*55,"monospace",24,"#000000",1,pi.indexStringY[4]));
	
			var str=new string();
			this.object.push(str.createString(this.context,180,140,"monospace",24,"#000000",1,pi.indexStringZ[0]));

			var str=new string();
			this.object.push(str.createString(this.context,780,140,"monospace",24,"#000000",1,pi.indexStringZ[1]));

	}
	this.moveCube0 = function() {
		var c0 = new cube();
		var c1 = new cube();
		var c2 = new cube();
		var c3 = new cube();
		var c4 = new cube();
		
		var c5 = new cube();
		var c6 = new cube();
		var c7 = new cube();
		var c8 = new cube();
		var c9 = new cube();
		
		var c10 = new cube();
		var c11 = new cube();
		var c12 = new cube();
		var c13 = new cube();
		var c14 = new cube();
		
		var c15 = new cube();
		var c16 = new cube();
		var c17 = new cube();
		var c18 = new cube();
		var c19 = new cube();
		
		var c20 = new cube();
		var c21 = new cube();
		var c22 = new cube();
		var c23 = new cube();
		var c24 = new cube();
		
			
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c15.createCube(this.context,200,275,50,"#8ED6FF",1,"[3,0]"));//creating 15 - 01//array2
			this.object.push(c16.createCube(this.context,200,225,50,"#8ED6FF",1,"[3,1]"));//creating 16 - 14//array3
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			
			this.object.push(c3.createCube(this.context,300,375,50,"#8ED6FF",1,"[0,3]"));//creating 3 - 34//array10
			this.object.push(c4.createCube(this.context,300,325,50,"#8ED6FF",1,"[0,4]"));//creating 4 - 42//array11
			this.object.push(c0.createCube(this.context,300,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array12
			this.object.push(c1.createCube(this.context,300,225,50,"#8ED6FF",1,"[0,1]"));//creating 1 - 13//array13
			this.object.push(c2.createCube(this.context,300,175,50,"#8ED6FF",1,"[0,2]"));//creating 2 - 21//array14
			
			this.object.push(c8.createCube(this.context,350,375,50,"#8ED6FF",1,"[1,3]"));//creating 8 - 31//array15
			this.object.push(c9.createCube(this.context,350,325,50,"#8ED6FF",1,"[1,4]"));//creating 9 - 44//array16
			this.object.push(c5.createCube(this.context,350,275,50,"#8ED6FF",1,"[1,0]"));//creating 5 - 02//array17
			this.object.push(c6.createCube(this.context,350,225,50,"#8ED6FF",1,"[1,1]"));//creating 6 - 10//array18
			this.object.push(c7.createCube(this.context,350,175,50,"#8ED6FF",1,"[1,2]"));//creating 7 - 23//array19
			
			this.object.push(c13.createCube(this.context,400,375,50,"#8ED6FF",1,"[2,3]"));//creating 13 - 33//array20
			this.object.push(c14.createCube(this.context,400,325,50,"#8ED6FF",1,"[2,4]"));//creating 14 - 41//array21
			this.object.push(c10.createCube(this.context,400,275,50,"#8ED6FF",1,"[2,0]"));//creating 10 - 04//array22
			this.object.push(c11.createCube(this.context,400,225,50,"#8ED6FF",1,"[2,1]"));//creating 11 - 12//array23
			this.object.push(c12.createCube(this.context,400,175,50,"#8ED6FF",1,"[2,2]"));//creating 12 - 20//array24

			
	}
	this.moveCube0a = function() {
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
	
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c15.createCube(this.context,200,275,50,"#8ED6FF",1,"[3,0]"));//creating 15 - 01//array2
			this.object.push(c16.createCube(this.context,200,225,50,"#8ED6FF",1,"[3,1]"));//creating 16 - 14//array3
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			
			this.object.push(c3.createCube(this.context,300,375,50,"#8ED6FF",1,"[0,3]"));//creating 3 - 34//array10
			this.object.push(c4.createCube(this.context,300,325,50,"#8ED6FF",1,"[0,4]"));//creating 4 - 42//array11
			this.object.push(c0.createCube(this.context,600,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array12
			this.object.push(c1.createCube(this.context,300,225,50,"#8ED6FF",1,"[0,1]"));//creating 1 - 13//array13
			this.object.push(c2.createCube(this.context,300,175,50,"#8ED6FF",1,"[0,2]"));//creating 2 - 21//array14
			
			this.object.push(c8.createCube(this.context,350,375,50,"#8ED6FF",1,"[1,3]"));//creating 8 - 31//array15
			this.object.push(c9.createCube(this.context,350,325,50,"#8ED6FF",1,"[1,4]"));//creating 9 - 44//array16
			this.object.push(c5.createCube(this.context,350,275,50,"#8ED6FF",1,"[1,0]"));//creating 5 - 02//array17
			this.object.push(c6.createCube(this.context,350,225,50,"#8ED6FF",1,"[1,1]"));//creating 6 - 10//array18
			this.object.push(c7.createCube(this.context,350,175,50,"#8ED6FF",1,"[1,2]"));//creating 7 - 23//array19
			
			this.object.push(c13.createCube(this.context,400,375,50,"#8ED6FF",1,"[2,3]"));//creating 13 - 33//array20
			this.object.push(c14.createCube(this.context,400,325,50,"#8ED6FF",1,"[2,4]"));//creating 14 - 41//array21
			this.object.push(c10.createCube(this.context,400,275,50,"#8ED6FF",1,"[2,0]"));//creating 10 - 04//array22
			this.object.push(c11.createCube(this.context,400,225,50,"#8ED6FF",1,"[2,1]"));//creating 11 - 12//array23
			this.object.push(c12.createCube(this.context,400,175,50,"#8ED6FF",1,"[2,2]"));//creating 12 - 20//array24
			
			
			
	
	}
	this.moveCube1 = function() {
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
		
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c15.createCube(this.context,200,275,50,"#8ED6FF",1,"[3,0]"));//creating 15 - 01//array2
			this.object.push(c16.createCube(this.context,200,225,50,"#8ED6FF",1,"[3,1]"));//creating 16 - 14//array3
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			
			this.object.push(c3.createCube(this.context,300,375,50,"#8ED6FF",1,"[0,3]"));//creating 3 - 34//array10
			this.object.push(c4.createCube(this.context,300,325,50,"#8ED6FF",1,"[0,4]"));//creating 4 - 42//array11
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array12
			this.object.push(c1.createCube(this.context,300,225,50,"#8ED6FF",1,"[0,1]"));//creating 1 - 13//array13
			this.object.push(c2.createCube(this.context,300,175,50,"#8ED6FF",1,"[0,2]"));//creating 2 - 21//array14
			
			this.object.push(c8.createCube(this.context,350,375,50,"#8ED6FF",1,"[1,3]"));//creating 8 - 31//array15
			this.object.push(c9.createCube(this.context,350,325,50,"#8ED6FF",1,"[1,4]"));//creating 9 - 44//array16
			this.object.push(c5.createCube(this.context,350,275,50,"#8ED6FF",1,"[1,0]"));//creating 5 - 02//array17
			this.object.push(c6.createCube(this.context,350,225,50,"#8ED6FF",1,"[1,1]"));//creating 6 - 10//array18
			this.object.push(c7.createCube(this.context,350,175,50,"#8ED6FF",1,"[1,2]"));//creating 7 - 23//array19
			
			this.object.push(c13.createCube(this.context,400,375,50,"#8ED6FF",1,"[2,3]"));//creating 13 - 33//array20
			this.object.push(c14.createCube(this.context,400,325,50,"#8ED6FF",1,"[2,4]"));//creating 14 - 41//array21
			this.object.push(c10.createCube(this.context,400,275,50,"#8ED6FF",1,"[2,0]"));//creating 10 - 04//array22
			this.object.push(c11.createCube(this.context,400,225,50,"#8ED6FF",1,"[2,1]"));//creating 11 - 12//array23
			this.object.push(c12.createCube(this.context,400,175,50,"#8ED6FF",1,"[2,2]"));//creating 12 - 20//array24

			
	}
	this.moveCube1a = function() {
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
			
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c15.createCube(this.context,200,275,50,"#8ED6FF",1,"[3,0]"));//creating 15 - 01//array2
			this.object.push(c16.createCube(this.context,200,225,50,"#8ED6FF",1,"[3,1]"));//creating 16 - 14//array3
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			
			this.object.push(c3.createCube(this.context,300,375,50,"#8ED6FF",1,"[0,3]"));//creating 3 - 34//array10
			this.object.push(c4.createCube(this.context,300,325,50,"#8ED6FF",1,"[0,4]"));//creating 4 - 42//array11
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array12
			this.object.push(c1.createCube(this.context,600,275,50,"#8ED6FF",1,"[0,1]"));//creating 1 - 13//array13
			this.object.push(c2.createCube(this.context,300,175,50,"#8ED6FF",1,"[0,2]"));//creating 2 - 21//array14
			
			this.object.push(c8.createCube(this.context,350,375,50,"#8ED6FF",1,"[1,3]"));//creating 8 - 31//array15
			this.object.push(c9.createCube(this.context,350,325,50,"#8ED6FF",1,"[1,4]"));//creating 9 - 44//array16
			this.object.push(c5.createCube(this.context,350,275,50,"#8ED6FF",1,"[1,0]"));//creating 5 - 02//array17
			this.object.push(c6.createCube(this.context,350,225,50,"#8ED6FF",1,"[1,1]"));//creating 6 - 10//array18
			this.object.push(c7.createCube(this.context,350,175,50,"#8ED6FF",1,"[1,2]"));//creating 7 - 23//array19
			
			this.object.push(c13.createCube(this.context,400,375,50,"#8ED6FF",1,"[2,3]"));//creating 13 - 33//array20
			this.object.push(c14.createCube(this.context,400,325,50,"#8ED6FF",1,"[2,4]"));//creating 14 - 41//array21
			this.object.push(c10.createCube(this.context,400,275,50,"#8ED6FF",1,"[2,0]"));//creating 10 - 04//array22
			this.object.push(c11.createCube(this.context,400,225,50,"#8ED6FF",1,"[2,1]"));//creating 11 - 12//array23
			this.object.push(c12.createCube(this.context,400,175,50,"#8ED6FF",1,"[2,2]"));//creating 12 - 20//array24
	
}
	this.moveCube2 = function() {
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();

			
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c15.createCube(this.context,200,275,50,"#8ED6FF",1,"[3,0]"));//creating 15 - 01//array2
			this.object.push(c16.createCube(this.context,200,225,50,"#8ED6FF",1,"[3,1]"));//creating 16 - 14//array3
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			
			this.object.push(c3.createCube(this.context,300,375,50,"#8ED6FF",1,"[0,3]"));//creating 3 - 34//array10
			this.object.push(c4.createCube(this.context,300,325,50,"#8ED6FF",1,"[0,4]"));//creating 4 - 42//array11
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array12
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c2.createCube(this.context,300,175,50,"#8ED6FF",1,"[0,2]"));//creating 2 - 21//array14
			
			this.object.push(c8.createCube(this.context,350,375,50,"#8ED6FF",1,"[1,3]"));//creating 8 - 31//array15
			this.object.push(c9.createCube(this.context,350,325,50,"#8ED6FF",1,"[1,4]"));//creating 9 - 44//array16
			this.object.push(c5.createCube(this.context,350,275,50,"#8ED6FF",1,"[1,0]"));//creating 5 - 02//array17
			this.object.push(c6.createCube(this.context,350,225,50,"#8ED6FF",1,"[1,1]"));//creating 6 - 10//array18
			this.object.push(c7.createCube(this.context,350,175,50,"#8ED6FF",1,"[1,2]"));//creating 7 - 23//array19
			
			this.object.push(c13.createCube(this.context,400,375,50,"#8ED6FF",1,"[2,3]"));//creating 13 - 33//array20
			this.object.push(c14.createCube(this.context,400,325,50,"#8ED6FF",1,"[2,4]"));//creating 14 - 41//array21
			this.object.push(c10.createCube(this.context,400,275,50,"#8ED6FF",1,"[2,0]"));//creating 10 - 04//array22
			this.object.push(c11.createCube(this.context,400,225,50,"#8ED6FF",1,"[2,1]"));//creating 11 - 12//array23
			this.object.push(c12.createCube(this.context,400,175,50,"#8ED6FF",1,"[2,2]"));//creating 12 - 20//array24
			

	
}
	this.moveCube2a = function() {
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
		
			
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c15.createCube(this.context,200,275,50,"#8ED6FF",1,"[3,0]"));//creating 15 - 01//array2
			this.object.push(c16.createCube(this.context,200,225,50,"#8ED6FF",1,"[3,1]"));//creating 16 - 14//array3
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			
			this.object.push(c3.createCube(this.context,300,375,50,"#8ED6FF",1,"[0,3]"));//creating 3 - 34//array10
			this.object.push(c4.createCube(this.context,300,325,50,"#8ED6FF",1,"[0,4]"));//creating 4 - 42//array11
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array12
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c2.createCube(this.context,600,275,50,"#8ED6FF",1,"[0,2]"));//creating 2 - 21//array14
			
			this.object.push(c8.createCube(this.context,350,375,50,"#8ED6FF",1,"[1,3]"));//creating 8 - 31//array15
			this.object.push(c9.createCube(this.context,350,325,50,"#8ED6FF",1,"[1,4]"));//creating 9 - 44//array16
			this.object.push(c5.createCube(this.context,350,275,50,"#8ED6FF",1,"[1,0]"));//creating 5 - 02//array17
			this.object.push(c6.createCube(this.context,350,225,50,"#8ED6FF",1,"[1,1]"));//creating 6 - 10//array18
			this.object.push(c7.createCube(this.context,350,175,50,"#8ED6FF",1,"[1,2]"));//creating 7 - 23//array19
			
			this.object.push(c13.createCube(this.context,400,375,50,"#8ED6FF",1,"[2,3]"));//creating 13 - 33//array20
			this.object.push(c14.createCube(this.context,400,325,50,"#8ED6FF",1,"[2,4]"));//creating 14 - 41//array21
			this.object.push(c10.createCube(this.context,400,275,50,"#8ED6FF",1,"[2,0]"));//creating 10 - 04//array22
			this.object.push(c11.createCube(this.context,400,225,50,"#8ED6FF",1,"[2,1]"));//creating 11 - 12//array23
			this.object.push(c12.createCube(this.context,400,175,50,"#8ED6FF",1,"[2,2]"));//creating 12 - 20//array24
			

		
	
}

	this.moveCube3 = function() {
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
			
			
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c15.createCube(this.context,200,275,50,"#8ED6FF",1,"[3,0]"));//creating 15 - 01//array2
			this.object.push(c16.createCube(this.context,200,225,50,"#8ED6FF",1,"[3,1]"));//creating 16 - 14//array3
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			
			this.object.push(c3.createCube(this.context,300,375,50,"#8ED6FF",1,"[0,3]"));//creating 3 - 34//array10
			this.object.push(c4.createCube(this.context,300,325,50,"#8ED6FF",1,"[0,4]"));//creating 4 - 42//array11
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array12
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array14
			
			this.object.push(c8.createCube(this.context,350,375,50,"#8ED6FF",1,"[1,3]"));//creating 8 - 31//array15
			this.object.push(c9.createCube(this.context,350,325,50,"#8ED6FF",1,"[1,4]"));//creating 9 - 44//array16
			this.object.push(c5.createCube(this.context,350,275,50,"#8ED6FF",1,"[1,0]"));//creating 5 - 02//array17
			this.object.push(c6.createCube(this.context,350,225,50,"#8ED6FF",1,"[1,1]"));//creating 6 - 10//array18
			this.object.push(c7.createCube(this.context,350,175,50,"#8ED6FF",1,"[1,2]"));//creating 7 - 23//array19
			
			this.object.push(c13.createCube(this.context,400,375,50,"#8ED6FF",1,"[2,3]"));//creating 13 - 33//array20
			this.object.push(c14.createCube(this.context,400,325,50,"#8ED6FF",1,"[2,4]"));//creating 14 - 41//array21
			this.object.push(c10.createCube(this.context,400,275,50,"#8ED6FF",1,"[2,0]"));//creating 10 - 04//array22
			this.object.push(c11.createCube(this.context,400,225,50,"#8ED6FF",1,"[2,1]"));//creating 11 - 12//array23
			this.object.push(c12.createCube(this.context,400,175,50,"#8ED6FF",1,"[2,2]"));//creating 12 - 20//array24
			
		
			
		
	
}
	this.moveCube3a = function() {
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
			
			
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c15.createCube(this.context,200,275,50,"#8ED6FF",1,"[3,0]"));//creating 15 - 01//array2
			this.object.push(c16.createCube(this.context,200,225,50,"#8ED6FF",1,"[3,1]"));//creating 16 - 14//array3
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			
			this.object.push(c3.createCube(this.context,600,275,50,"#8ED6FF",1,"[0,3]"));//creating 3 - 34//array10
			this.object.push(c4.createCube(this.context,300,325,50,"#8ED6FF",1,"[0,4]"));//creating 4 - 42//array11
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array12
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array14
			
			this.object.push(c8.createCube(this.context,350,375,50,"#8ED6FF",1,"[1,3]"));//creating 8 - 31//array15
			this.object.push(c9.createCube(this.context,350,325,50,"#8ED6FF",1,"[1,4]"));//creating 9 - 44//array16
			this.object.push(c5.createCube(this.context,350,275,50,"#8ED6FF",1,"[1,0]"));//creating 5 - 02//array17
			this.object.push(c6.createCube(this.context,350,225,50,"#8ED6FF",1,"[1,1]"));//creating 6 - 10//array18
			this.object.push(c7.createCube(this.context,350,175,50,"#8ED6FF",1,"[1,2]"));//creating 7 - 23//array19
			
			this.object.push(c13.createCube(this.context,400,375,50,"#8ED6FF",1,"[2,3]"));//creating 13 - 33//array20
			this.object.push(c14.createCube(this.context,400,325,50,"#8ED6FF",1,"[2,4]"));//creating 14 - 41//array21
			this.object.push(c10.createCube(this.context,400,275,50,"#8ED6FF",1,"[2,0]"));//creating 10 - 04//array22
			this.object.push(c11.createCube(this.context,400,225,50,"#8ED6FF",1,"[2,1]"));//creating 11 - 12//array23
			this.object.push(c12.createCube(this.context,400,175,50,"#8ED6FF",1,"[2,2]"));//creating 12 - 20//array24

	

	
}

	this.moveCube4 = function() {
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
	
			
			
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c15.createCube(this.context,200,275,50,"#8ED6FF",1,"[3,0]"));//creating 15 - 01//array2
			this.object.push(c16.createCube(this.context,200,225,50,"#8ED6FF",1,"[3,1]"));//creating 16 - 14//array3
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c4.createCube(this.context,300,325,50,"#8ED6FF",1,"[0,4]"));//creating 4 - 42//array11
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array12
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array14
			
			this.object.push(c8.createCube(this.context,350,375,50,"#8ED6FF",1,"[1,3]"));//creating 8 - 31//array15
			this.object.push(c9.createCube(this.context,350,325,50,"#8ED6FF",1,"[1,4]"));//creating 9 - 44//array16
			this.object.push(c5.createCube(this.context,350,275,50,"#8ED6FF",1,"[1,0]"));//creating 5 - 02//array17
			this.object.push(c6.createCube(this.context,350,225,50,"#8ED6FF",1,"[1,1]"));//creating 6 - 10//array18
			this.object.push(c7.createCube(this.context,350,175,50,"#8ED6FF",1,"[1,2]"));//creating 7 - 23//array19
			
			this.object.push(c13.createCube(this.context,400,375,50,"#8ED6FF",1,"[2,3]"));//creating 13 - 33//array20
			this.object.push(c14.createCube(this.context,400,325,50,"#8ED6FF",1,"[2,4]"));//creating 14 - 41//array21
			this.object.push(c10.createCube(this.context,400,275,50,"#8ED6FF",1,"[2,0]"));//creating 10 - 04//array22
			this.object.push(c11.createCube(this.context,400,225,50,"#8ED6FF",1,"[2,1]"));//creating 11 - 12//array23
			this.object.push(c12.createCube(this.context,400,175,50,"#8ED6FF",1,"[2,2]"));//creating 12 - 20//array24
			
		

	
}
	this.moveCube4a = function() {
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
	
			
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c15.createCube(this.context,200,275,50,"#8ED6FF",1,"[3,0]"));//creating 15 - 01//array2
			this.object.push(c16.createCube(this.context,200,225,50,"#8ED6FF",1,"[3,1]"));//creating 16 - 14//array3
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c4.createCube(this.context,600,275,50,"#8ED6FF",1,"[0,4]"));//creating 4 - 42//array11
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array12
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array14
			
			this.object.push(c8.createCube(this.context,350,375,50,"#8ED6FF",1,"[1,3]"));//creating 8 - 31//array15
			this.object.push(c9.createCube(this.context,350,325,50,"#8ED6FF",1,"[1,4]"));//creating 9 - 44//array16
			this.object.push(c5.createCube(this.context,350,275,50,"#8ED6FF",1,"[1,0]"));//creating 5 - 02//array17
			this.object.push(c6.createCube(this.context,350,225,50,"#8ED6FF",1,"[1,1]"));//creating 6 - 10//array18
			this.object.push(c7.createCube(this.context,350,175,50,"#8ED6FF",1,"[1,2]"));//creating 7 - 23//array19
			
			this.object.push(c13.createCube(this.context,400,375,50,"#8ED6FF",1,"[2,3]"));//creating 13 - 33//array20
			this.object.push(c14.createCube(this.context,400,325,50,"#8ED6FF",1,"[2,4]"));//creating 14 - 41//array21
			this.object.push(c10.createCube(this.context,400,275,50,"#8ED6FF",1,"[2,0]"));//creating 10 - 04//array22
			this.object.push(c11.createCube(this.context,400,225,50,"#8ED6FF",1,"[2,1]"));//creating 11 - 12//array23
			this.object.push(c12.createCube(this.context,400,175,50,"#8ED6FF",1,"[2,2]"));//creating 12 - 20//array24
			

	
}

	this.moveCube5 = function() {
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
	
		
			
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c15.createCube(this.context,200,275,50,"#8ED6FF",1,"[3,0]"));//creating 15 - 01//array2
			this.object.push(c16.createCube(this.context,200,225,50,"#8ED6FF",1,"[3,1]"));//creating 16 - 14//array3
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array11
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array12
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array14
			
			this.object.push(c8.createCube(this.context,350,375,50,"#8ED6FF",1,"[1,3]"));//creating 8 - 31//array15
			this.object.push(c9.createCube(this.context,350,325,50,"#8ED6FF",1,"[1,4]"));//creating 9 - 44//array16
			this.object.push(c5.createCube(this.context,350,275,50,"#8ED6FF",1,"[1,0]"));//creating 5 - 02//array17
			this.object.push(c6.createCube(this.context,350,225,50,"#8ED6FF",1,"[1,1]"));//creating 6 - 10//array18
			this.object.push(c7.createCube(this.context,350,175,50,"#8ED6FF",1,"[1,2]"));//creating 7 - 23//array19
			
			this.object.push(c13.createCube(this.context,400,375,50,"#8ED6FF",1,"[2,3]"));//creating 13 - 33//array20
			this.object.push(c14.createCube(this.context,400,325,50,"#8ED6FF",1,"[2,4]"));//creating 14 - 41//array21
			this.object.push(c10.createCube(this.context,400,275,50,"#8ED6FF",1,"[2,0]"));//creating 10 - 04//array22
			this.object.push(c11.createCube(this.context,400,225,50,"#8ED6FF",1,"[2,1]"));//creating 11 - 12//array23
			this.object.push(c12.createCube(this.context,400,175,50,"#8ED6FF",1,"[2,2]"));//creating 12 - 20//array24
			
		
			
	
	
}
	this.moveCube5a = function() {
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();

		
			
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c15.createCube(this.context,200,275,50,"#8ED6FF",1,"[3,0]"));//creating 15 - 01//array2
			this.object.push(c16.createCube(this.context,200,225,50,"#8ED6FF",1,"[3,1]"));//creating 16 - 14//array3
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array11
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array12
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array14
			
			this.object.push(c8.createCube(this.context,350,375,50,"#8ED6FF",1,"[1,3]"));//creating 8 - 31//array15
			this.object.push(c9.createCube(this.context,350,325,50,"#8ED6FF",1,"[1,4]"));//creating 9 - 44//array16
			this.object.push(c5.createCube(this.context,600,275,50,"#8ED6FF",1,"[1,0]"));//creating 5 - 02//array17
			this.object.push(c6.createCube(this.context,350,225,50,"#8ED6FF",1,"[1,1]"));//creating 6 - 10//array18
			this.object.push(c7.createCube(this.context,350,175,50,"#8ED6FF",1,"[1,2]"));//creating 7 - 23//array19
			
			this.object.push(c13.createCube(this.context,400,375,50,"#8ED6FF",1,"[2,3]"));//creating 13 - 33//array20
			this.object.push(c14.createCube(this.context,400,325,50,"#8ED6FF",1,"[2,4]"));//creating 14 - 41//array21
			this.object.push(c10.createCube(this.context,400,275,50,"#8ED6FF",1,"[2,0]"));//creating 10 - 04//array22
			this.object.push(c11.createCube(this.context,400,225,50,"#8ED6FF",1,"[2,1]"));//creating 11 - 12//array23
			this.object.push(c12.createCube(this.context,400,175,50,"#8ED6FF",1,"[2,2]"));//creating 12 - 20//array24
			
	
}

	this.moveCube6 = function() {
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();

		
			
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c15.createCube(this.context,200,275,50,"#8ED6FF",1,"[3,0]"));//creating 15 - 01//array2
			this.object.push(c16.createCube(this.context,200,225,50,"#8ED6FF",1,"[3,1]"));//creating 16 - 14//array3
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array11
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array12
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array14
			
			this.object.push(c8.createCube(this.context,350,375,50,"#8ED6FF",1,"[1,3]"));//creating 8 - 31//array15
			this.object.push(c9.createCube(this.context,350,325,50,"#8ED6FF",1,"[1,4]"));//creating 9 - 44//array16
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array17
			this.object.push(c6.createCube(this.context,350,225,50,"#8ED6FF",1,"[1,1]"));//creating 6 - 10//array18
			this.object.push(c7.createCube(this.context,350,175,50,"#8ED6FF",1,"[1,2]"));//creating 7 - 23//array19
			
			this.object.push(c13.createCube(this.context,400,375,50,"#8ED6FF",1,"[2,3]"));//creating 13 - 33//array20
			this.object.push(c14.createCube(this.context,400,325,50,"#8ED6FF",1,"[2,4]"));//creating 14 - 41//array21
			this.object.push(c10.createCube(this.context,400,275,50,"#8ED6FF",1,"[2,0]"));//creating 10 - 04//array22
			this.object.push(c11.createCube(this.context,400,225,50,"#8ED6FF",1,"[2,1]"));//creating 11 - 12//array23
			this.object.push(c12.createCube(this.context,400,175,50,"#8ED6FF",1,"[2,2]"));//creating 12 - 20//array24
			
		

	
}
	this.moveCube6a = function() {
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();

		
			
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c15.createCube(this.context,200,275,50,"#8ED6FF",1,"[3,0]"));//creating 15 - 01//array2
			this.object.push(c16.createCube(this.context,200,225,50,"#8ED6FF",1,"[3,1]"));//creating 16 - 14//array3
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array11
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array12
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array14
			
			this.object.push(c8.createCube(this.context,350,375,50,"#8ED6FF",1,"[1,3]"));//creating 8 - 31//array15
			this.object.push(c9.createCube(this.context,350,325,50,"#8ED6FF",1,"[1,4]"));//creating 9 - 44//array16
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array17
			this.object.push(c6.createCube(this.context,600,275,50,"#8ED6FF",1,"[1,1]"));//creating 6 - 10//array18
			this.object.push(c7.createCube(this.context,350,175,50,"#8ED6FF",1,"[1,2]"));//creating 7 - 23//array19
			
			this.object.push(c13.createCube(this.context,400,375,50,"#8ED6FF",1,"[2,3]"));//creating 13 - 33//array20
			this.object.push(c14.createCube(this.context,400,325,50,"#8ED6FF",1,"[2,4]"));//creating 14 - 41//array21
			this.object.push(c10.createCube(this.context,400,275,50,"#8ED6FF",1,"[2,0]"));//creating 10 - 04//array22
			this.object.push(c11.createCube(this.context,400,225,50,"#8ED6FF",1,"[2,1]"));//creating 11 - 12//array23
			this.object.push(c12.createCube(this.context,400,175,50,"#8ED6FF",1,"[2,2]"));//creating 12 - 20//array24
			
	
	
}
//create cube and move cube 8
	this.moveCube7 = function() {
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();

			
			
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c15.createCube(this.context,200,275,50,"#8ED6FF",1,"[3,0]"));//creating 15 - 01//array2
			this.object.push(c16.createCube(this.context,200,225,50,"#8ED6FF",1,"[3,1]"));//creating 16 - 14//array3
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array11
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array12
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array18 a swap
			
			this.object.push(c8.createCube(this.context,350,375,50,"#8ED6FF",1,"[1,3]"));//creating 8 - 31//array15
			this.object.push(c9.createCube(this.context,350,325,50,"#8ED6FF",1,"[1,4]"));//creating 9 - 44//array16
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array17
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array14 a swap
			this.object.push(c7.createCube(this.context,350,175,50,"#8ED6FF",1,"[1,2]"));//creating 7 - 23//array19
			
			this.object.push(c13.createCube(this.context,400,375,50,"#8ED6FF",1,"[2,3]"));//creating 13 - 33//array20
			this.object.push(c14.createCube(this.context,400,325,50,"#8ED6FF",1,"[2,4]"));//creating 14 - 41//array21
			this.object.push(c10.createCube(this.context,400,275,50,"#8ED6FF",1,"[2,0]"));//creating 10 - 04//array22
			this.object.push(c11.createCube(this.context,400,225,50,"#8ED6FF",1,"[2,1]"));//creating 11 - 12//array23
			this.object.push(c12.createCube(this.context,400,175,50,"#8ED6FF",1,"[2,2]"));//creating 12 - 20//array24
			
		
			
			
	
}
	this.moveCube7a = function() {
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();

			
			
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c15.createCube(this.context,200,275,50,"#8ED6FF",1,"[3,0]"));//creating 15 - 01//array2
			this.object.push(c16.createCube(this.context,200,225,50,"#8ED6FF",1,"[3,1]"));//creating 16 - 14//array3
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array11
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array12
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array18 a swap
			
			this.object.push(c8.createCube(this.context,350,375,50,"#8ED6FF",1,"[1,3]"));//creating 8 - 31//array15
			this.object.push(c9.createCube(this.context,350,325,50,"#8ED6FF",1,"[1,4]"));//creating 9 - 44//array16
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array17
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array14 a swap
			this.object.push(c7.createCube(this.context,600,275,50,"#8ED6FF",1,"[1,2]"));//creating 7 - 23//array19
			
			this.object.push(c13.createCube(this.context,400,375,50,"#8ED6FF",1,"[2,3]"));//creating 13 - 33//array20
			this.object.push(c14.createCube(this.context,400,325,50,"#8ED6FF",1,"[2,4]"));//creating 14 - 41//array21
			this.object.push(c10.createCube(this.context,400,275,50,"#8ED6FF",1,"[2,0]"));//creating 10 - 04//array22
			this.object.push(c11.createCube(this.context,400,225,50,"#8ED6FF",1,"[2,1]"));//creating 11 - 12//array23
			this.object.push(c12.createCube(this.context,400,175,50,"#8ED6FF",1,"[2,2]"));//creating 12 - 20//array24
			
		
	
	
}
//create cube and move cube 9	
	this.moveCube8 = function() {
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();

		
			
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c15.createCube(this.context,200,275,50,"#8ED6FF",1,"[3,0]"));//creating 15 - 01//array2
			this.object.push(c16.createCube(this.context,200,225,50,"#8ED6FF",1,"[3,1]"));//creating 16 - 14//array3
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array11
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array12
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array18 a swap
			
			this.object.push(c8.createCube(this.context,350,375,50,"#8ED6FF",1,"[1,3]"));//creating 8 - 31//array15
			this.object.push(c9.createCube(this.context,350,325,50,"#8ED6FF",1,"[1,4]"));//creating 9 - 44//array16
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array17
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array14 a swap
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array19
			
			this.object.push(c13.createCube(this.context,400,375,50,"#8ED6FF",1,"[2,3]"));//creating 13 - 33//array20
			this.object.push(c14.createCube(this.context,400,325,50,"#8ED6FF",1,"[2,4]"));//creating 14 - 41//array21
			this.object.push(c10.createCube(this.context,400,275,50,"#8ED6FF",1,"[2,0]"));//creating 10 - 04//array22
			this.object.push(c11.createCube(this.context,400,225,50,"#8ED6FF",1,"[2,1]"));//creating 11 - 12//array23
			this.object.push(c12.createCube(this.context,400,175,50,"#8ED6FF",1,"[2,2]"));//creating 12 - 20//array24
			
	
	
}	
	this.moveCube8a = function() {
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
	
			
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c15.createCube(this.context,200,275,50,"#8ED6FF",1,"[3,0]"));//creating 15 - 01//array2
			this.object.push(c16.createCube(this.context,200,225,50,"#8ED6FF",1,"[3,1]"));//creating 16 - 14//array3
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array11
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array12
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array18 a swap
			
			this.object.push(c8.createCube(this.context,600,275,50,"#8ED6FF",1,"[1,3]"));//creating 8 - 31//array15
			this.object.push(c9.createCube(this.context,350,325,50,"#8ED6FF",1,"[1,4]"));//creating 9 - 44//array16
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array17
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array14 a swap
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array19
			
			this.object.push(c13.createCube(this.context,400,375,50,"#8ED6FF",1,"[2,3]"));//creating 13 - 33//array20
			this.object.push(c14.createCube(this.context,400,325,50,"#8ED6FF",1,"[2,4]"));//creating 14 - 41//array21
			this.object.push(c10.createCube(this.context,400,275,50,"#8ED6FF",1,"[2,0]"));//creating 10 - 04//array22
			this.object.push(c11.createCube(this.context,400,225,50,"#8ED6FF",1,"[2,1]"));//creating 11 - 12//array23
			this.object.push(c12.createCube(this.context,400,175,50,"#8ED6FF",1,"[2,2]"));//creating 12 - 20//array24
			

	
}	
//create cube and move cube 10	
	this.moveCube9 = function() {
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();

			
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c15.createCube(this.context,200,275,50,"#8ED6FF",1,"[3,0]"));//creating 15 - 01//array2
			this.object.push(c16.createCube(this.context,200,225,50,"#8ED6FF",1,"[3,1]"));//creating 16 - 14//array3
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c8.createCube(this.context,800,225,50,"#8ED6FF",1,"[3,1]"));//creating 8 - 31//array15 b swap
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array12
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array18 a swap
			
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array11 b swap
			this.object.push(c9.createCube(this.context,350,325,50,"#8ED6FF",1,"[1,4]"));//creating 9 - 44//array16
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array17
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array14 a swap
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array19
			
			this.object.push(c13.createCube(this.context,400,375,50,"#8ED6FF",1,"[2,3]"));//creating 13 - 33//array20
			this.object.push(c14.createCube(this.context,400,325,50,"#8ED6FF",1,"[2,4]"));//creating 14 - 41//array21
			this.object.push(c10.createCube(this.context,400,275,50,"#8ED6FF",1,"[2,0]"));//creating 10 - 04//array22
			this.object.push(c11.createCube(this.context,400,225,50,"#8ED6FF",1,"[2,1]"));//creating 11 - 12//array23
			this.object.push(c12.createCube(this.context,400,175,50,"#8ED6FF",1,"[2,2]"));//creating 12 - 20//array24
			
		
	
}	
	this.moveCube9a = function() {
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();

	
			
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c15.createCube(this.context,200,275,50,"#8ED6FF",1,"[3,0]"));//creating 15 - 01//array2
			this.object.push(c16.createCube(this.context,200,225,50,"#8ED6FF",1,"[3,1]"));//creating 16 - 14//array3
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c8.createCube(this.context,800,225,50,"#8ED6FF",1,"[3,1]"));//creating 8 - 31//array15 b swap
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array12
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array18 a swap
			
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array11 b swap
			this.object.push(c9.createCube(this.context,600,275,50,"#8ED6FF",1,"[1,4]"));//creating 9 - 44//array16
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array17
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array14 a swap
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array19
			
			this.object.push(c13.createCube(this.context,400,375,50,"#8ED6FF",1,"[2,3]"));//creating 13 - 33//array20
			this.object.push(c14.createCube(this.context,400,325,50,"#8ED6FF",1,"[2,4]"));//creating 14 - 41//array21
			this.object.push(c10.createCube(this.context,400,275,50,"#8ED6FF",1,"[2,0]"));//creating 10 - 04//array22
			this.object.push(c11.createCube(this.context,400,225,50,"#8ED6FF",1,"[2,1]"));//creating 11 - 12//array23
			this.object.push(c12.createCube(this.context,400,175,50,"#8ED6FF",1,"[2,2]"));//creating 12 - 20//array24
			
		
	
}	
//create cube and move cube 11	
	this.moveCube10 = function() {

	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
			
			
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c15.createCube(this.context,200,275,50,"#8ED6FF",1,"[3,0]"));//creating 15 - 01//array2
			this.object.push(c16.createCube(this.context,200,225,50,"#8ED6FF",1,"[3,1]"));//creating 16 - 14//array3
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c8.createCube(this.context,800,225,50,"#8ED6FF",1,"[3,1]"));//creating 8 - 31//array15 b swap
			this.object.push(c9.createCube(this.context,850,325,50,"#8ED6FF",1,"[4,4]"));//creating 9 - 44//array16 c swap
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array12 ca swap
			
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array18 aa swap
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array11 b swap
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array17
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array14 a swap
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array19
			
			this.object.push(c13.createCube(this.context,400,375,50,"#8ED6FF",1,"[2,3]"));//creating 13 - 33//array20
			this.object.push(c14.createCube(this.context,400,325,50,"#8ED6FF",1,"[2,4]"));//creating 14 - 41//array21
			this.object.push(c10.createCube(this.context,400,275,50,"#8ED6FF",1,"[2,0]"));//creating 10 - 04//array22
			this.object.push(c11.createCube(this.context,400,225,50,"#8ED6FF",1,"[2,1]"));//creating 11 - 12//array23
			this.object.push(c12.createCube(this.context,400,175,50,"#8ED6FF",1,"[2,2]"));//creating 12 - 20//array24
			
		
	
	
}
	this.moveCube10a = function() {

			
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
			
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c15.createCube(this.context,200,275,50,"#8ED6FF",1,"[3,0]"));//creating 15 - 01//array2
			this.object.push(c16.createCube(this.context,200,225,50,"#8ED6FF",1,"[3,1]"));//creating 16 - 14//array3
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c8.createCube(this.context,800,225,50,"#8ED6FF",1,"[3,1]"));//creating 8 - 31//array15 b swap
			this.object.push(c9.createCube(this.context,850,325,50,"#8ED6FF",1,"[4,4]"));//creating 9 - 44//array16 c swap
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array12 ca swap
			
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array18 aa swap
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array11 b swap
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array17
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array14 a swap
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array19
			
			this.object.push(c13.createCube(this.context,400,375,50,"#8ED6FF",1,"[2,3]"));//creating 13 - 33//array20
			this.object.push(c14.createCube(this.context,400,325,50,"#8ED6FF",1,"[2,4]"));//creating 14 - 41//array21
			this.object.push(c10.createCube(this.context,600,275,50,"#8ED6FF",1,"[2,0]"));//creating 10 - 04//array22
			this.object.push(c11.createCube(this.context,400,225,50,"#8ED6FF",1,"[2,1]"));//creating 11 - 12//array23
			this.object.push(c12.createCube(this.context,400,175,50,"#8ED6FF",1,"[2,2]"));//creating 12 - 20//array24
			
		

	
}
	
//create cube and move cube 12	
	this.moveCube11 = function() {

	
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
			
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c15.createCube(this.context,200,275,50,"#8ED6FF",1,"[3,0]"));//creating 15 - 01//array2
			this.object.push(c16.createCube(this.context,200,225,50,"#8ED6FF",1,"[3,1]"));//creating 16 - 14//array3
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c8.createCube(this.context,800,225,50,"#8ED6FF",1,"[3,1]"));//creating 8 - 31//array15 
			this.object.push(c9.createCube(this.context,850,325,50,"#8ED6FF",1,"[4,4]"));//creating 9 - 44//array16 
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c10.createCube(this.context,900,325,50,"#8ED6FF",1,"[0,4]"));//creating 10 - 04//array22 
			
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array12 
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array18 
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array11 
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array17
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array14
			
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array19
			this.object.push(c13.createCube(this.context,400,375,50,"#8ED6FF",1,"[2,3]"));//creating 13 - 33//array20
			this.object.push(c14.createCube(this.context,400,325,50,"#8ED6FF",1,"[2,4]"));//creating 14 - 41//array21
			this.object.push(c11.createCube(this.context,400,225,50,"#8ED6FF",1,"[2,1]"));//creating 11 - 12//array23
			this.object.push(c12.createCube(this.context,400,175,50,"#8ED6FF",1,"[2,2]"));//creating 12 - 20//array24
		
		
	
	
}
	this.moveCube11a = function() {

	
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
			
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c15.createCube(this.context,200,275,50,"#8ED6FF",1,"[3,0]"));//creating 15 - 01//array2
			this.object.push(c16.createCube(this.context,200,225,50,"#8ED6FF",1,"[3,1]"));//creating 16 - 14//array3
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c8.createCube(this.context,800,225,50,"#8ED6FF",1,"[3,1]"));//creating 8 - 31//array15 
			this.object.push(c9.createCube(this.context,850,325,50,"#8ED6FF",1,"[4,4]"));//creating 9 - 44//array16 
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c10.createCube(this.context,900,325,50,"#8ED6FF",1,"[0,4]"));//creating 10 - 04//array22 
			
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array12 
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array18 
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array11 
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array17
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array14
			
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array19
			this.object.push(c13.createCube(this.context,400,375,50,"#8ED6FF",1,"[2,3]"));//creating 13 - 33//array20
			this.object.push(c14.createCube(this.context,400,325,50,"#8ED6FF",1,"[2,4]"));//creating 14 - 41//array21
			this.object.push(c11.createCube(this.context,600,275,50,"#8ED6FF",1,"[2,1]"));//creating 11 - 12//array23
			this.object.push(c12.createCube(this.context,400,175,50,"#8ED6FF",1,"[2,2]"));//creating 12 - 20//array24
	
	
}

//create cube and move cube 13	
	this.moveCube12 = function() {
	
			
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
			
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c15.createCube(this.context,200,275,50,"#8ED6FF",1,"[3,0]"));//creating 15 - 01//array2
			this.object.push(c16.createCube(this.context,200,225,50,"#8ED6FF",1,"[3,1]"));//creating 16 - 14//array3
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c8.createCube(this.context,800,225,50,"#8ED6FF",1,"[3,1]"));//creating 8 - 31//array15 
			this.object.push(c9.createCube(this.context,850,325,50,"#8ED6FF",1,"[4,4]"));//creating 9 - 44//array16 
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c10.createCube(this.context,900,325,50,"#8ED6FF",1,"[0,4]"));//creating 10 - 04//array22 
			
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array12 
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array18 
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array11 
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array17
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array14
			
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array19
			this.object.push(c13.createCube(this.context,400,375,50,"#8ED6FF",1,"[2,3]"));//creating 13 - 33//array20
			this.object.push(c14.createCube(this.context,400,325,50,"#8ED6FF",1,"[2,4]"));//creating 14 - 41//array21
			this.object.push(c11.createCube(this.context,950,175,50,"#8ED6FF",1,"[1,2]"));//creating 11 - 12//array23
			this.object.push(c12.createCube(this.context,400,175,50,"#8ED6FF",1,"[2,2]"));//creating 12 - 20//array24
			
		
		
	
}
	this.moveCube12a = function() {
	
			
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
			
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c15.createCube(this.context,200,275,50,"#8ED6FF",1,"[3,0]"));//creating 15 - 01//array2
			this.object.push(c16.createCube(this.context,200,225,50,"#8ED6FF",1,"[3,1]"));//creating 16 - 14//array3
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c8.createCube(this.context,800,225,50,"#8ED6FF",1,"[3,1]"));//creating 8 - 31//array15 
			this.object.push(c9.createCube(this.context,850,325,50,"#8ED6FF",1,"[4,4]"));//creating 9 - 44//array16 
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c10.createCube(this.context,900,325,50,"#8ED6FF",1,"[0,4]"));//creating 10 - 04//array22 
			
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array12 
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array18 
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array11 
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array17
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array14
			
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array19
			this.object.push(c13.createCube(this.context,400,375,50,"#8ED6FF",1,"[2,3]"));//creating 13 - 33//array20
			this.object.push(c14.createCube(this.context,400,325,50,"#8ED6FF",1,"[2,4]"));//creating 14 - 41//array21
			this.object.push(c11.createCube(this.context,950,175,50,"#8ED6FF",1,"[1,2]"));//creating 11 - 12//array23
			this.object.push(c12.createCube(this.context,600,275,50,"#8ED6FF",1,"[2,2]"));//creating 12 - 20//array24
			
		
			

	
}

//create cube and move cube 14	// start change array
	this.moveCube13 = function() {

			
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c15.createCube(this.context,200,275,50,"#8ED6FF",1,"[3,0]"));//creating 15 - 01//array2
			this.object.push(c16.createCube(this.context,200,225,50,"#8ED6FF",1,"[3,1]"));//creating 16 - 14//array3
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c8.createCube(this.context,800,225,50,"#8ED6FF",1,"[3,1]"));//creating 8 - 31//array11
			this.object.push(c9.createCube(this.context,850,325,50,"#8ED6FF",1,"[4,4]"));//creating 9 - 44//array12 
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c10.createCube(this.context,900,325,50,"#8ED6FF",1,"[0,4]"));//creating 10 - 04//array14 
			
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array15 
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array16 
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array17 
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array18
			this.object.push(c12.createCube(this.context,1000,275,50,"#8ED6FF",1,"[2,0]"));//creating 12 - 20//array19
			
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array20
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array21
			this.object.push(c13.createCube(this.context,400,375,50,"#8ED6FF",1,"[2,3]"));//creating 13 - 33//array22
			this.object.push(c14.createCube(this.context,400,325,50,"#8ED6FF",1,"[2,4]"));//creating 14 - 41//array23
			this.object.push(c11.createCube(this.context,950,175,50,"#8ED6FF",1,"[1,2]"));//creating 11 - 12//array24
			
	
}
	this.moveCube13a = function() {
	
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
			
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c15.createCube(this.context,200,275,50,"#8ED6FF",1,"[3,0]"));//creating 15 - 01//array2
			this.object.push(c16.createCube(this.context,200,225,50,"#8ED6FF",1,"[3,1]"));//creating 16 - 14//array3
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c8.createCube(this.context,800,225,50,"#8ED6FF",1,"[3,1]"));//creating 8 - 31//array11
			this.object.push(c9.createCube(this.context,850,325,50,"#8ED6FF",1,"[4,4]"));//creating 9 - 44//array12 
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c10.createCube(this.context,900,325,50,"#8ED6FF",1,"[0,4]"));//creating 10 - 04//array14 
			
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array15 
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array16 
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array17 
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array18
			this.object.push(c12.createCube(this.context,1000,275,50,"#8ED6FF",1,"[2,0]"));//creating 12 - 20//array19
			
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array20
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array21
			this.object.push(c13.createCube(this.context,600,275,50,"#8ED6FF",1,"[2,3]"));//creating 13 - 33//array22
			this.object.push(c14.createCube(this.context,400,325,50,"#8ED6FF",1,"[2,4]"));//creating 14 - 41//array23
			this.object.push(c11.createCube(this.context,950,175,50,"#8ED6FF",1,"[1,2]"));//creating 11 - 12//array24
			
		
			

	
}

//create cube and move cube 15	// start change array
	this.moveCube14 = function() {


	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
			
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c15.createCube(this.context,200,275,50,"#8ED6FF",1,"[3,0]"));//creating 15 - 01//array2
			this.object.push(c16.createCube(this.context,200,225,50,"#8ED6FF",1,"[3,1]"));//creating 16 - 14//array3
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			this.object.push(c13.createCube(this.context,800,375,50,"#8ED6FF",1,"[3,3]"));//creating 13 - 33//array22
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c8.createCube(this.context,800,225,50,"#8ED6FF",1,"[3,1]"));//creating 8 - 31//array11
			this.object.push(c9.createCube(this.context,850,325,50,"#8ED6FF",1,"[4,4]"));//creating 9 - 44//array12 
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c10.createCube(this.context,900,325,50,"#8ED6FF",1,"[0,4]"));//creating 10 - 04//array14 
			
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array15 
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array16 
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array17 
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array18
			this.object.push(c12.createCube(this.context,1000,275,50,"#8ED6FF",1,"[2,0]"));//creating 12 - 20//array19
			
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array20
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array21
			
			this.object.push(c14.createCube(this.context,400,325,50,"#8ED6FF",1,"[2,4]"));//creating 14 - 41//array23
			this.object.push(c11.createCube(this.context,950,175,50,"#8ED6FF",1,"[1,2]"));//creating 11 - 12//array24
			
		
			
	
	
}
	this.moveCube14a = function() {

	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();

			
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c15.createCube(this.context,200,275,50,"#8ED6FF",1,"[3,0]"));//creating 15 - 01//array2
			this.object.push(c16.createCube(this.context,200,225,50,"#8ED6FF",1,"[3,1]"));//creating 16 - 14//array3
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			this.object.push(c13.createCube(this.context,800,375,50,"#8ED6FF",1,"[3,3]"));//creating 13 - 33//array22
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c8.createCube(this.context,800,225,50,"#8ED6FF",1,"[3,1]"));//creating 8 - 31//array11
			this.object.push(c9.createCube(this.context,850,325,50,"#8ED6FF",1,"[4,4]"));//creating 9 - 44//array12 
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c10.createCube(this.context,900,325,50,"#8ED6FF",1,"[0,4]"));//creating 10 - 04//array14 
			
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array15 
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array16 
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array17 
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array18
			this.object.push(c12.createCube(this.context,1000,275,50,"#8ED6FF",1,"[2,0]"));//creating 12 - 20//array19
			
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array20
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array21
			
			this.object.push(c14.createCube(this.context,600,275,50,"#8ED6FF",1,"[2,4]"));//creating 14 - 41//array23
			this.object.push(c11.createCube(this.context,950,175,50,"#8ED6FF",1,"[1,2]"));//creating 11 - 12//array24
			

	
	}
//create cube and move cube 16	// start change array
	this.moveCube15 = function() {

			
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c15.createCube(this.context,200,275,50,"#8ED6FF",1,"[3,0]"));//creating 15 - 01//array2
			this.object.push(c16.createCube(this.context,200,225,50,"#8ED6FF",1,"[3,1]"));//creating 16 - 14//array3
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			this.object.push(c13.createCube(this.context,800,375,50,"#8ED6FF",1,"[3,3]"));//creating 13 - 33//array22
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c8.createCube(this.context,800,225,50,"#8ED6FF",1,"[3,1]"));//creating 8 - 31//array11
			this.object.push(c9.createCube(this.context,850,325,50,"#8ED6FF",1,"[4,4]"));//creating 9 - 44//array12 
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c10.createCube(this.context,900,325,50,"#8ED6FF",1,"[0,4]"));//creating 10 - 04//array14 
			
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array15 
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array16 
			this.object.push(c14.createCube(this.context,850,225,50,"#8ED6FF",1,"[4,1]"));//creating 14 - 41//array23
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array17 
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array18
			this.object.push(c12.createCube(this.context,1000,275,50,"#8ED6FF",1,"[2,0]"));//creating 12 - 20//array19
			
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array20
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array21
			
			
			this.object.push(c11.createCube(this.context,950,175,50,"#8ED6FF",1,"[1,2]"));//creating 11 - 12//array24
			
		
			

	}
	this.moveCube15a = function() {


	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
			
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c15.createCube(this.context,600,275,50,"#8ED6FF",1,"[3,0]"));//creating 15 - 01//array2
			this.object.push(c16.createCube(this.context,200,225,50,"#8ED6FF",1,"[3,1]"));//creating 16 - 14//array3
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			
			this.object.push(c13.createCube(this.context,800,375,50,"#8ED6FF",1,"[3,3]"));//creating 13 - 33//array22
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c8.createCube(this.context,800,225,50,"#8ED6FF",1,"[3,1]"));//creating 8 - 31//array11
			this.object.push(c9.createCube(this.context,850,325,50,"#8ED6FF",1,"[4,4]"));//creating 9 - 44//array12 
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			
			this.object.push(c10.createCube(this.context,900,325,50,"#8ED6FF",1,"[0,4]"));//creating 10 - 04//array14 
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array15 
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array16 
			this.object.push(c14.createCube(this.context,850,225,50,"#8ED6FF",1,"[4,1]"));//creating 14 - 41//array23
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array17
			
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array18
			this.object.push(c12.createCube(this.context,1000,275,50,"#8ED6FF",1,"[2,0]"));//creating 12 - 20//array19
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array20
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array21
			this.object.push(c11.createCube(this.context,950,175,50,"#8ED6FF",1,"[1,2]"));//creating 11 - 12//array24
			
		

	}
//create cube and move cube 17	// start change array
	this.moveCube16 = function() {
	

	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
			
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c16.createCube(this.context,200,225,50,"#8ED6FF",1,"[3,1]"));//creating 16 - 14//array3
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			this.object.push(c13.createCube(this.context,800,375,50,"#8ED6FF",1,"[3,3]"));//creating 13 - 33//array22
			
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c8.createCube(this.context,800,225,50,"#8ED6FF",1,"[3,1]"));//creating 8 - 31//array11
			this.object.push(c9.createCube(this.context,850,325,50,"#8ED6FF",1,"[4,4]"));//creating 9 - 44//array12 
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c10.createCube(this.context,900,325,50,"#8ED6FF",1,"[0,4]"));//creating 10 - 04//array14 
			
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array15 
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array16 
			this.object.push(c14.createCube(this.context,850,225,50,"#8ED6FF",1,"[4,1]"));//creating 14 - 41//array23
			this.object.push(c15.createCube(this.context,900,225,50,"#8ED6FF",1,"[0,1]"));//creating 15 - 01//array2
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array17
			
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array18
			this.object.push(c12.createCube(this.context,1000,275,50,"#8ED6FF",1,"[2,0]"));//creating 12 - 20//array19
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array20
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array21
			this.object.push(c11.createCube(this.context,950,175,50,"#8ED6FF",1,"[1,2]"));//creating 11 - 12//array24
			
		
	
	}
	this.moveCube16a = function() {
	
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
			
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c16.createCube(this.context,600,275,50,"#8ED6FF",1,"[3,1]"));//creating 16 - 14//array3
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			this.object.push(c13.createCube(this.context,800,375,50,"#8ED6FF",1,"[3,3]"));//creating 13 - 33//array22
			
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c8.createCube(this.context,800,225,50,"#8ED6FF",1,"[3,1]"));//creating 8 - 31//array11
			this.object.push(c9.createCube(this.context,850,325,50,"#8ED6FF",1,"[4,4]"));//creating 9 - 44//array12 
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c10.createCube(this.context,900,325,50,"#8ED6FF",1,"[0,4]"));//creating 10 - 04//array14 
			
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array15 
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array16 
			this.object.push(c14.createCube(this.context,850,225,50,"#8ED6FF",1,"[4,1]"));//creating 14 - 41//array23
			this.object.push(c15.createCube(this.context,900,225,50,"#8ED6FF",1,"[0,1]"));//creating 15 - 01//array2
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array17
			
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array18
			this.object.push(c12.createCube(this.context,1000,275,50,"#8ED6FF",1,"[2,0]"));//creating 12 - 20//array19
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array20
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array21
			this.object.push(c11.createCube(this.context,950,175,50,"#8ED6FF",1,"[1,2]"));//creating 11 - 12//array24
			
		

	}
		
//create cube and move cube 18	// start change array
	this.moveCube17 = function() {

	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
			
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c17.createCube(this.context,200,175,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			this.object.push(c13.createCube(this.context,800,375,50,"#8ED6FF",1,"[3,3]"));//creating 13 - 33//array22
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			
			this.object.push(c8.createCube(this.context,800,225,50,"#8ED6FF",1,"[3,1]"));//creating 8 - 31//array11
			this.object.push(c9.createCube(this.context,850,325,50,"#8ED6FF",1,"[4,4]"));//creating 9 - 44//array12 
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c10.createCube(this.context,900,325,50,"#8ED6FF",1,"[0,4]"));//creating 10 - 04//array14 
			this.object.push(c16.createCube(this.context,950,325,50,"#8ED6FF",1,"[1,4]"));//creating 16 - 14//array3
			
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array15 
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array16 
			this.object.push(c14.createCube(this.context,850,225,50,"#8ED6FF",1,"[4,1]"));//creating 14 - 41//array23
			this.object.push(c15.createCube(this.context,900,225,50,"#8ED6FF",1,"[0,1]"));//creating 15 - 01//array2
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array17
			
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array18
			this.object.push(c12.createCube(this.context,1000,275,50,"#8ED6FF",1,"[2,0]"));//creating 12 - 20//array19
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array20
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array21
			this.object.push(c11.createCube(this.context,950,175,50,"#8ED6FF",1,"[1,2]"));//creating 11 - 12//array24
			
	
	}
	this.moveCube17a = function() {
	
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c17.createCube(this.context,600,275,50,"#8ED6FF",1,"[3,2]"));//creating 17 - 22//array4
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			this.object.push(c13.createCube(this.context,800,375,50,"#8ED6FF",1,"[3,3]"));//creating 13 - 33//array22
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			
			this.object.push(c8.createCube(this.context,800,225,50,"#8ED6FF",1,"[3,1]"));//creating 8 - 31//array11
			this.object.push(c9.createCube(this.context,850,325,50,"#8ED6FF",1,"[4,4]"));//creating 9 - 44//array12 
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c10.createCube(this.context,900,325,50,"#8ED6FF",1,"[0,4]"));//creating 10 - 04//array14 
			this.object.push(c16.createCube(this.context,950,325,50,"#8ED6FF",1,"[1,4]"));//creating 16 - 14//array3
			
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array15 
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array16 
			this.object.push(c14.createCube(this.context,850,225,50,"#8ED6FF",1,"[4,1]"));//creating 14 - 41//array23
			this.object.push(c15.createCube(this.context,900,225,50,"#8ED6FF",1,"[0,1]"));//creating 15 - 01//array2
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array17
			
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array18
			this.object.push(c12.createCube(this.context,1000,275,50,"#8ED6FF",1,"[2,0]"));//creating 12 - 20//array19
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array20
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array21
			this.object.push(c11.createCube(this.context,950,175,50,"#8ED6FF",1,"[1,2]"));//creating 11 - 12//array24
			

	}
		
//create cube and move cube 19	// start change array
	this.moveCube18 = function() {

	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
			this.object.push(c18.createCube(this.context,200,375,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			this.object.push(c13.createCube(this.context,800,375,50,"#8ED6FF",1,"[3,3]"));//creating 13 - 33//array22
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c8.createCube(this.context,800,225,50,"#8ED6FF",1,"[3,1]"));//creating 8 - 31//array11
			
			this.object.push(c9.createCube(this.context,850,325,50,"#8ED6FF",1,"[4,4]"));//creating 9 - 44//array12 
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c10.createCube(this.context,900,325,50,"#8ED6FF",1,"[0,4]"));//creating 10 - 04//array14 
			this.object.push(c16.createCube(this.context,950,325,50,"#8ED6FF",1,"[1,4]"));//creating 16 - 14//array3
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array15 
			 
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array16
			this.object.push(c14.createCube(this.context,850,225,50,"#8ED6FF",1,"[4,1]"));//creating 14 - 41//array23
			this.object.push(c15.createCube(this.context,900,225,50,"#8ED6FF",1,"[0,1]"));//creating 15 - 01//array2
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array17
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array18
			
			this.object.push(c12.createCube(this.context,1000,275,50,"#8ED6FF",1,"[2,0]"));//creating 12 - 20//array19
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array20
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array21
			this.object.push(c11.createCube(this.context,950,175,50,"#8ED6FF",1,"[1,2]"));//creating 11 - 12//array24
			this.object.push(c17.createCube(this.context,1000,175,50,"#8ED6FF",1,"[2,2]"));//creating 17 - 22//array4
			
		
	
	}
	this.moveCube18a = function() {
	
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();

			
			this.object.push(c18.createCube(this.context,600,275,50,"#8ED6FF",1,"[3,3]"));//creating 18 - 30//array0
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			this.object.push(c13.createCube(this.context,800,375,50,"#8ED6FF",1,"[3,3]"));//creating 13 - 33//array22
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c8.createCube(this.context,800,225,50,"#8ED6FF",1,"[3,1]"));//creating 8 - 31//array11
			
			this.object.push(c9.createCube(this.context,850,325,50,"#8ED6FF",1,"[4,4]"));//creating 9 - 44//array12 
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c10.createCube(this.context,900,325,50,"#8ED6FF",1,"[0,4]"));//creating 10 - 04//array14 
			this.object.push(c16.createCube(this.context,950,325,50,"#8ED6FF",1,"[1,4]"));//creating 16 - 14//array3
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array15 
			 
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array16
			this.object.push(c14.createCube(this.context,850,225,50,"#8ED6FF",1,"[4,1]"));//creating 14 - 41//array23
			this.object.push(c15.createCube(this.context,900,225,50,"#8ED6FF",1,"[0,1]"));//creating 15 - 01//array2
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array17
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array18
			
			this.object.push(c12.createCube(this.context,1000,275,50,"#8ED6FF",1,"[2,0]"));//creating 12 - 20//array19
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array20
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array21
			this.object.push(c11.createCube(this.context,950,175,50,"#8ED6FF",1,"[1,2]"));//creating 11 - 12//array24
			this.object.push(c17.createCube(this.context,1000,175,50,"#8ED6FF",1,"[2,2]"));//creating 17 - 22//array4
			
		
		

	}

//create cube and move cube 20	// start change array
	this.moveCube19 = function() {
		
			
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
			
			this.object.push(c19.createCube(this.context,200,325,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			this.object.push(c13.createCube(this.context,800,375,50,"#8ED6FF",1,"[3,3]"));//creating 13 - 33//array22
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c18.createCube(this.context,800,275,50,"#8ED6FF",1,"[3,0]"));//creating 18 - 30//array0
			this.object.push(c8.createCube(this.context,800,225,50,"#8ED6FF",1,"[3,1]"));//creating 8 - 31//array11

			this.object.push(c9.createCube(this.context,850,325,50,"#8ED6FF",1,"[4,4]"));//creating 9 - 44//array12 
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c10.createCube(this.context,900,325,50,"#8ED6FF",1,"[0,4]"));//creating 10 - 04//array14 
			this.object.push(c16.createCube(this.context,950,325,50,"#8ED6FF",1,"[1,4]"));//creating 16 - 14//array3
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array15 
			 
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array16
			this.object.push(c14.createCube(this.context,850,225,50,"#8ED6FF",1,"[4,1]"));//creating 14 - 41//array23
			this.object.push(c15.createCube(this.context,900,225,50,"#8ED6FF",1,"[0,1]"));//creating 15 - 01//array2
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array17
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array18
			
			this.object.push(c12.createCube(this.context,1000,275,50,"#8ED6FF",1,"[2,0]"));//creating 12 - 20//array19
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array20
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array21
			this.object.push(c11.createCube(this.context,950,175,50,"#8ED6FF",1,"[1,2]"));//creating 11 - 12//array24
			this.object.push(c17.createCube(this.context,1000,175,50,"#8ED6FF",1,"[2,2]"));//creating 17 - 22//array4
			
		
		
	}
	this.moveCube19a = function() {

	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
			
			
			this.object.push(c19.createCube(this.context,600,275,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			this.object.push(c13.createCube(this.context,800,375,50,"#8ED6FF",1,"[3,3]"));//creating 13 - 33//array22
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c18.createCube(this.context,800,275,50,"#8ED6FF",1,"[3,0]"));//creating 18 - 30//array0
			this.object.push(c8.createCube(this.context,800,225,50,"#8ED6FF",1,"[3,1]"));//creating 8 - 31//array11

			this.object.push(c9.createCube(this.context,850,325,50,"#8ED6FF",1,"[4,4]"));//creating 9 - 44//array12 
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c10.createCube(this.context,900,325,50,"#8ED6FF",1,"[0,4]"));//creating 10 - 04//array14 
			this.object.push(c16.createCube(this.context,950,325,50,"#8ED6FF",1,"[1,4]"));//creating 16 - 14//array3
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array15 
			 
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array16
			this.object.push(c14.createCube(this.context,850,225,50,"#8ED6FF",1,"[4,1]"));//creating 14 - 41//array23
			this.object.push(c15.createCube(this.context,900,225,50,"#8ED6FF",1,"[0,1]"));//creating 15 - 01//array2
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array17
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array18
			
			this.object.push(c12.createCube(this.context,1000,275,50,"#8ED6FF",1,"[2,0]"));//creating 12 - 20//array19
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array20
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array21
			this.object.push(c11.createCube(this.context,950,175,50,"#8ED6FF",1,"[1,2]"));//creating 11 - 12//array24
			this.object.push(c17.createCube(this.context,1000,175,50,"#8ED6FF",1,"[2,2]"));//creating 17 - 22//array4
			
		
	}
//create cube and move cube 21	// start change array
	this.moveCube20 = function() {
		
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
			
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,250,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			
			this.object.push(c13.createCube(this.context,800,375,50,"#8ED6FF",1,"[3,3]"));//creating 13 - 33//array22
			this.object.push(c19.createCube(this.context,850,375,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c18.createCube(this.context,800,275,50,"#8ED6FF",1,"[3,0]"));//creating 18 - 30//array0
			this.object.push(c8.createCube(this.context,800,225,50,"#8ED6FF",1,"[3,1]"));//creating 8 - 31//array11

			this.object.push(c9.createCube(this.context,850,325,50,"#8ED6FF",1,"[4,4]"));//creating 9 - 44//array12 
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c10.createCube(this.context,900,325,50,"#8ED6FF",1,"[0,4]"));//creating 10 - 04//array14 
			this.object.push(c16.createCube(this.context,950,325,50,"#8ED6FF",1,"[1,4]"));//creating 16 - 14//array3
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array15 
			 
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array16
			this.object.push(c14.createCube(this.context,850,225,50,"#8ED6FF",1,"[4,1]"));//creating 14 - 41//array23
			this.object.push(c15.createCube(this.context,900,225,50,"#8ED6FF",1,"[0,1]"));//creating 15 - 01//array2
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array17
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array18
			
			this.object.push(c12.createCube(this.context,1000,275,50,"#8ED6FF",1,"[2,0]"));//creating 12 - 20//array19
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array20
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array21
			this.object.push(c11.createCube(this.context,950,175,50,"#8ED6FF",1,"[1,2]"));//creating 11 - 12//array24
			this.object.push(c17.createCube(this.context,1000,175,50,"#8ED6FF",1,"[2,2]"));//creating 17 - 22//array4
			
		
		
	}
	this.moveCube20a = function() {
		
			
			
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c20.createCube(this.context,600,275,50,"#8ED6FF",1,"[4,0]"));//creating 20 - 03//array7
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			
			this.object.push(c13.createCube(this.context,800,375,50,"#8ED6FF",1,"[3,3]"));//creating 13 - 33//array22
			this.object.push(c19.createCube(this.context,850,375,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c18.createCube(this.context,800,275,50,"#8ED6FF",1,"[3,0]"));//creating 18 - 30//array0
			this.object.push(c8.createCube(this.context,800,225,50,"#8ED6FF",1,"[3,1]"));//creating 8 - 31//array11

			this.object.push(c9.createCube(this.context,850,325,50,"#8ED6FF",1,"[4,4]"));//creating 9 - 44//array12 
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c10.createCube(this.context,900,325,50,"#8ED6FF",1,"[0,4]"));//creating 10 - 04//array14 
			this.object.push(c16.createCube(this.context,950,325,50,"#8ED6FF",1,"[1,4]"));//creating 16 - 14//array3
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array15 
			 
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array16
			this.object.push(c14.createCube(this.context,850,225,50,"#8ED6FF",1,"[4,1]"));//creating 14 - 41//array23
			this.object.push(c15.createCube(this.context,900,225,50,"#8ED6FF",1,"[0,1]"));//creating 15 - 01//array2
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array17
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array18
			
			this.object.push(c12.createCube(this.context,1000,275,50,"#8ED6FF",1,"[2,0]"));//creating 12 - 20//array19
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array20
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array21
			this.object.push(c11.createCube(this.context,950,175,50,"#8ED6FF",1,"[1,2]"));//creating 11 - 12//array24
			this.object.push(c17.createCube(this.context,1000,175,50,"#8ED6FF",1,"[2,2]"));//creating 17 - 22//array4
			
		
			

	}
//create cube and move cube 22	// start change array
	this.moveCube21 = function() {
		
			
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c21.createCube(this.context,250,225,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			this.object.push(c13.createCube(this.context,800,375,50,"#8ED6FF",1,"[3,3]"));//creating 13 - 33//array22
			
			this.object.push(c19.createCube(this.context,850,375,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c20.createCube(this.context,900,375,50,"#8ED6FF",1,"[0,3]"));//creating 20 - 03//array7
			this.object.push(c18.createCube(this.context,800,275,50,"#8ED6FF",1,"[3,0]"));//creating 18 - 30//array0
			this.object.push(c8.createCube(this.context,800,225,50,"#8ED6FF",1,"[3,1]"));//creating 8 - 31//array11

			this.object.push(c9.createCube(this.context,850,325,50,"#8ED6FF",1,"[4,4]"));//creating 9 - 44//array12 
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c10.createCube(this.context,900,325,50,"#8ED6FF",1,"[0,4]"));//creating 10 - 04//array14 
			this.object.push(c16.createCube(this.context,950,325,50,"#8ED6FF",1,"[1,4]"));//creating 16 - 14//array3
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array15 
			 
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array16
			this.object.push(c14.createCube(this.context,850,225,50,"#8ED6FF",1,"[4,1]"));//creating 14 - 41//array23
			this.object.push(c15.createCube(this.context,900,225,50,"#8ED6FF",1,"[0,1]"));//creating 15 - 01//array2
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array17
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array18
			
			this.object.push(c12.createCube(this.context,1000,275,50,"#8ED6FF",1,"[2,0]"));//creating 12 - 20//array19
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array20
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array21
			this.object.push(c11.createCube(this.context,950,175,50,"#8ED6FF",1,"[1,2]"));//creating 11 - 12//array24
			this.object.push(c17.createCube(this.context,1000,175,50,"#8ED6FF",1,"[2,2]"));//creating 17 - 22//array4
			


	}
	this.moveCube21a = function() {
			
			
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c21.createCube(this.context,600,275,50,"#8ED6FF",1,"[4,1]"));//creating 21 - 11//array8
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			this.object.push(c13.createCube(this.context,800,375,50,"#8ED6FF",1,"[3,3]"));//creating 13 - 33//array22
			
			this.object.push(c19.createCube(this.context,850,375,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c20.createCube(this.context,900,375,50,"#8ED6FF",1,"[0,3]"));//creating 20 - 03//array7
			this.object.push(c18.createCube(this.context,800,275,50,"#8ED6FF",1,"[3,0]"));//creating 18 - 30//array0
			this.object.push(c8.createCube(this.context,800,225,50,"#8ED6FF",1,"[3,1]"));//creating 8 - 31//array11

			this.object.push(c9.createCube(this.context,850,325,50,"#8ED6FF",1,"[4,4]"));//creating 9 - 44//array12 
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c10.createCube(this.context,900,325,50,"#8ED6FF",1,"[0,4]"));//creating 10 - 04//array14 
			this.object.push(c16.createCube(this.context,950,325,50,"#8ED6FF",1,"[1,4]"));//creating 16 - 14//array3
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array15 
			 
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array16
			this.object.push(c14.createCube(this.context,850,225,50,"#8ED6FF",1,"[4,1]"));//creating 14 - 41//array23
			this.object.push(c15.createCube(this.context,900,225,50,"#8ED6FF",1,"[0,1]"));//creating 15 - 01//array2
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array17
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array18
			
			this.object.push(c12.createCube(this.context,1000,275,50,"#8ED6FF",1,"[2,0]"));//creating 12 - 20//array19
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array20
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array21
			this.object.push(c11.createCube(this.context,950,175,50,"#8ED6FF",1,"[1,2]"));//creating 11 - 12//array24
			this.object.push(c17.createCube(this.context,1000,175,50,"#8ED6FF",1,"[2,2]"));//creating 17 - 22//array4
			
		
			

	}
//create cube and move cube 23	// start change array
	this.moveCube22 = function() {
			
			
			
			
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			
			this.object.push(c22.createCube(this.context,250,175,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			this.object.push(c13.createCube(this.context,800,375,50,"#8ED6FF",1,"[3,3]"));//creating 13 - 33//array22
			
			this.object.push(c19.createCube(this.context,850,375,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c20.createCube(this.context,900,375,50,"#8ED6FF",1,"[0,3]"));//creating 20 - 03//array7
			this.object.push(c18.createCube(this.context,800,275,50,"#8ED6FF",1,"[3,0]"));//creating 18 - 30//array0
			this.object.push(c8.createCube(this.context,800,225,50,"#8ED6FF",1,"[3,1]"));//creating 8 - 31//array11

			this.object.push(c9.createCube(this.context,850,325,50,"#8ED6FF",1,"[4,4]"));//creating 9 - 44//array12 
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c10.createCube(this.context,900,325,50,"#8ED6FF",1,"[0,4]"));//creating 10 - 04//array14 
			this.object.push(c16.createCube(this.context,950,325,50,"#8ED6FF",1,"[1,4]"));//creating 16 - 14//array3
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array15 
			 
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array16
			this.object.push(c14.createCube(this.context,850,225,50,"#8ED6FF",1,"[4,1]"));//creating 14 - 41//array23
			this.object.push(c15.createCube(this.context,900,225,50,"#8ED6FF",1,"[0,1]"));//creating 15 - 01//array2
			this.object.push(c21.createCube(this.context,950,225,50,"#8ED6FF",1,"[1,1]"));//creating 21 - 11//array8
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array17
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array18
			
			this.object.push(c12.createCube(this.context,1000,275,50,"#8ED6FF",1,"[2,0]"));//creating 12 - 20//array19
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array20
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array21
			this.object.push(c11.createCube(this.context,950,175,50,"#8ED6FF",1,"[1,2]"));//creating 11 - 12//array24
			this.object.push(c17.createCube(this.context,1000,175,50,"#8ED6FF",1,"[2,2]"));//creating 17 - 22//array4
			
		
		
	}
	this.moveCube22a = function() {
			
			
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			
			this.object.push(c22.createCube(this.context,600,275,50,"#8ED6FF",1,"[4,2]"));//creating 22 - 24//array9
			this.object.push(c13.createCube(this.context,800,375,50,"#8ED6FF",1,"[3,3]"));//creating 13 - 33//array22
			
			this.object.push(c19.createCube(this.context,850,375,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c20.createCube(this.context,900,375,50,"#8ED6FF",1,"[0,3]"));//creating 20 - 03//array7
			this.object.push(c18.createCube(this.context,800,275,50,"#8ED6FF",1,"[3,0]"));//creating 18 - 30//array0
			this.object.push(c8.createCube(this.context,800,225,50,"#8ED6FF",1,"[3,1]"));//creating 8 - 31//array11

			this.object.push(c9.createCube(this.context,850,325,50,"#8ED6FF",1,"[4,4]"));//creating 9 - 44//array12 
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c10.createCube(this.context,900,325,50,"#8ED6FF",1,"[0,4]"));//creating 10 - 04//array14 
			this.object.push(c16.createCube(this.context,950,325,50,"#8ED6FF",1,"[1,4]"));//creating 16 - 14//array3
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array15 
			 
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array16
			this.object.push(c14.createCube(this.context,850,225,50,"#8ED6FF",1,"[4,1]"));//creating 14 - 41//array23
			this.object.push(c15.createCube(this.context,900,225,50,"#8ED6FF",1,"[0,1]"));//creating 15 - 01//array2
			this.object.push(c21.createCube(this.context,950,225,50,"#8ED6FF",1,"[1,1]"));//creating 21 - 11//array8
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array17
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array18
			
			this.object.push(c12.createCube(this.context,1000,275,50,"#8ED6FF",1,"[2,0]"));//creating 12 - 20//array19
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array20
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array21
			this.object.push(c11.createCube(this.context,950,175,50,"#8ED6FF",1,"[1,2]"));//creating 11 - 12//array24
			this.object.push(c17.createCube(this.context,1000,175,50,"#8ED6FF",1,"[2,2]"));//creating 17 - 22//array4
			
		
			
	}
//create cube and move cube 24	// start change array
	this.moveCube23 = function() {
			
			
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
			
			this.object.push(c23.createCube(this.context,250,375,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			
			
			this.object.push(c13.createCube(this.context,800,375,50,"#8ED6FF",1,"[3,3]"));//creating 13 - 33//array22
			
			this.object.push(c19.createCube(this.context,850,375,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c20.createCube(this.context,900,375,50,"#8ED6FF",1,"[0,3]"));//creating 20 - 03//array7
			this.object.push(c18.createCube(this.context,800,275,50,"#8ED6FF",1,"[3,0]"));//creating 18 - 30//array0
			this.object.push(c8.createCube(this.context,800,225,50,"#8ED6FF",1,"[3,1]"));//creating 8 - 31//array11
			
			this.object.push(c9.createCube(this.context,850,325,50,"#8ED6FF",1,"[4,4]"));//creating 9 - 44//array12 
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array21
			this.object.push(c10.createCube(this.context,900,325,50,"#8ED6FF",1,"[0,4]"));//creating 10 - 04//array14 
			this.object.push(c16.createCube(this.context,950,325,50,"#8ED6FF",1,"[1,4]"));//creating 16 - 14//array3
			this.object.push(c22.createCube(this.context,1000,325,50,"#8ED6FF",1,"[2,4]"));//creating 22 - 24//array9
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array15 
			 
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array16
			this.object.push(c14.createCube(this.context,850,225,50,"#8ED6FF",1,"[4,1]"));//creating 14 - 41//array23
			this.object.push(c15.createCube(this.context,900,225,50,"#8ED6FF",1,"[0,1]"));//creating 15 - 01//array2
			this.object.push(c21.createCube(this.context,950,225,50,"#8ED6FF",1,"[1,1]"));//creating 21 - 11//array8
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array17
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array18
			
			this.object.push(c12.createCube(this.context,1000,275,50,"#8ED6FF",1,"[2,0]"));//creating 12 - 20//array19
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array20

			this.object.push(c11.createCube(this.context,950,175,50,"#8ED6FF",1,"[1,2]"));//creating 11 - 12//array24
			this.object.push(c17.createCube(this.context,1000,175,50,"#8ED6FF",1,"[2,2]"));//creating 17 - 22//array4
			
	
			
	}
	this.moveCube23a = function() {
			
			
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
			
			this.object.push(c23.createCube(this.context,600,275,50,"#8ED6FF",1,"[4,3]"));//creating 24 - 32//array5
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			
			
			this.object.push(c13.createCube(this.context,800,375,50,"#8ED6FF",1,"[3,3]"));//creating 13 - 33//array22
			
			this.object.push(c19.createCube(this.context,850,375,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c20.createCube(this.context,900,375,50,"#8ED6FF",1,"[0,3]"));//creating 20 - 03//array7
			this.object.push(c18.createCube(this.context,800,275,50,"#8ED6FF",1,"[3,0]"));//creating 18 - 30//array0
			this.object.push(c8.createCube(this.context,800,225,50,"#8ED6FF",1,"[3,1]"));//creating 8 - 31//array11
			
			this.object.push(c9.createCube(this.context,850,325,50,"#8ED6FF",1,"[4,4]"));//creating 9 - 44//array12 
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array21
			this.object.push(c10.createCube(this.context,900,325,50,"#8ED6FF",1,"[0,4]"));//creating 10 - 04//array14 
			this.object.push(c16.createCube(this.context,950,325,50,"#8ED6FF",1,"[1,4]"));//creating 16 - 14//array3
			this.object.push(c22.createCube(this.context,1000,325,50,"#8ED6FF",1,"[2,4]"));//creating 22 - 24//array9
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array15 
			 
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array16
			this.object.push(c14.createCube(this.context,850,225,50,"#8ED6FF",1,"[4,1]"));//creating 14 - 41//array23
			this.object.push(c15.createCube(this.context,900,225,50,"#8ED6FF",1,"[0,1]"));//creating 15 - 01//array2
			this.object.push(c21.createCube(this.context,950,225,50,"#8ED6FF",1,"[1,1]"));//creating 21 - 11//array8
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array17
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array18
			
			this.object.push(c12.createCube(this.context,1000,275,50,"#8ED6FF",1,"[2,0]"));//creating 12 - 20//array19
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array20
			this.object.push(c11.createCube(this.context,950,175,50,"#8ED6FF",1,"[1,2]"));//creating 11 - 12//array24
			this.object.push(c17.createCube(this.context,1000,175,50,"#8ED6FF",1,"[2,2]"));//creating 17 - 22//array4
			
	
			

		
	}
//create cube and move cube 25	// start change array
	this.moveCube24 = function() {
			
			
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
			
			
			this.object.push(c24.createCube(this.context,250,325,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			
			
			this.object.push(c13.createCube(this.context,800,375,50,"#8ED6FF",1,"[3,3]"));//creating 13 - 33//array22
			
			this.object.push(c19.createCube(this.context,850,375,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c20.createCube(this.context,900,375,50,"#8ED6FF",1,"[0,3]"));//creating 20 - 03//array7
			this.object.push(c18.createCube(this.context,800,275,50,"#8ED6FF",1,"[3,0]"));//creating 18 - 30//array0
			this.object.push(c8.createCube(this.context,800,225,50,"#8ED6FF",1,"[3,1]"));//creating 8 - 31//array11
			
			this.object.push(c9.createCube(this.context,850,325,50,"#8ED6FF",1,"[4,4]"));//creating 9 - 44//array12 
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array21
			this.object.push(c10.createCube(this.context,900,325,50,"#8ED6FF",1,"[0,4]"));//creating 10 - 04//array14 
			this.object.push(c16.createCube(this.context,950,325,50,"#8ED6FF",1,"[1,4]"));//creating 16 - 14//array3
			this.object.push(c22.createCube(this.context,1000,325,50,"#8ED6FF",1,"[2,4]"));//creating 22 - 24//array9
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array15 
			 
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array16
			this.object.push(c14.createCube(this.context,850,225,50,"#8ED6FF",1,"[4,1]"));//creating 14 - 41//array23
			this.object.push(c15.createCube(this.context,900,225,50,"#8ED6FF",1,"[0,1]"));//creating 15 - 01//array2
			this.object.push(c21.createCube(this.context,950,225,50,"#8ED6FF",1,"[1,1]"));//creating 21 - 11//array8
			this.object.push(c23.createCube(this.context,800,175,50,"#8ED6FF",1,"[3,2]"));//creating 24 - 32//array5
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array17
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array18
			
			this.object.push(c12.createCube(this.context,1000,275,50,"#8ED6FF",1,"[2,0]"));//creating 12 - 20//array19
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array20

			this.object.push(c11.createCube(this.context,950,175,50,"#8ED6FF",1,"[1,2]"));//creating 11 - 12//array24
			this.object.push(c17.createCube(this.context,1000,175,50,"#8ED6FF",1,"[2,2]"));//creating 17 - 22//array4
			
		
	}	
	this.moveCube24a = function() {
			
			
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
			
			this.object.push(c24.createCube(this.context,600,275,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			
			
			this.object.push(c13.createCube(this.context,800,375,50,"#8ED6FF",1,"[3,3]"));//creating 13 - 33//array22
			
			this.object.push(c19.createCube(this.context,850,375,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c20.createCube(this.context,900,375,50,"#8ED6FF",1,"[0,3]"));//creating 20 - 03//array7
			this.object.push(c18.createCube(this.context,800,275,50,"#8ED6FF",1,"[3,0]"));//creating 18 - 30//array0
			this.object.push(c8.createCube(this.context,800,225,50,"#8ED6FF",1,"[3,1]"));//creating 8 - 31//array11
			
			this.object.push(c9.createCube(this.context,850,325,50,"#8ED6FF",1,"[4,4]"));//creating 9 - 44//array12 
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array21
			this.object.push(c10.createCube(this.context,900,325,50,"#8ED6FF",1,"[0,4]"));//creating 10 - 04//array14 
			this.object.push(c16.createCube(this.context,950,325,50,"#8ED6FF",1,"[1,4]"));//creating 16 - 14//array3
			this.object.push(c22.createCube(this.context,1000,325,50,"#8ED6FF",1,"[2,4]"));//creating 22 - 24//array9
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array15 
			 
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array16
			this.object.push(c14.createCube(this.context,850,225,50,"#8ED6FF",1,"[4,1]"));//creating 14 - 41//array23
			this.object.push(c15.createCube(this.context,900,225,50,"#8ED6FF",1,"[0,1]"));//creating 15 - 01//array2
			this.object.push(c21.createCube(this.context,950,225,50,"#8ED6FF",1,"[1,1]"));//creating 21 - 11//array8
			this.object.push(c23.createCube(this.context,800,175,50,"#8ED6FF",1,"[3,2]"));//creating 24 - 32//array5
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array17
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array18
			
			this.object.push(c12.createCube(this.context,1000,275,50,"#8ED6FF",1,"[2,0]"));//creating 12 - 20//array19
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array20

			this.object.push(c11.createCube(this.context,950,175,50,"#8ED6FF",1,"[1,2]"));//creating 11 - 12//array24
			this.object.push(c17.createCube(this.context,1000,175,50,"#8ED6FF",1,"[2,2]"));//creating 17 - 22//array4
			
			
			
	}	
	this.moveCube25 = function() {
			
			
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();
			
			this.object.push(c24.createCube(this.context,850,275,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c13.createCube(this.context,800,375,50,"#8ED6FF",1,"[3,3]"));//creating 13 - 33//array22
			this.object.push(c19.createCube(this.context,850,375,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c3.createCube(this.context,800,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c20.createCube(this.context,900,375,50,"#8ED6FF",1,"[0,3]"));//creating 20 - 03//array7
			
			this.object.push(c18.createCube(this.context,800,275,50,"#8ED6FF",1,"[3,0]"));//creating 18 - 30//array0
			this.object.push(c8.createCube(this.context,800,225,50,"#8ED6FF",1,"[3,1]"));//creating 8 - 31//array11
			this.object.push(c9.createCube(this.context,850,325,50,"#8ED6FF",1,"[4,4]"));//creating 9 - 44//array12 
			this.object.push(c1.createCube(this.context,950,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c7.createCube(this.context,1000,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array21
			
			this.object.push(c10.createCube(this.context,900,325,50,"#8ED6FF",1,"[0,4]"));//creating 10 - 04//array14 
			this.object.push(c16.createCube(this.context,950,325,50,"#8ED6FF",1,"[1,4]"));//creating 16 - 14//array3
			this.object.push(c22.createCube(this.context,1000,325,50,"#8ED6FF",1,"[2,4]"));//creating 22 - 24//array9
			this.object.push(c0.createCube(this.context,900,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array15 
			this.object.push(c6.createCube(this.context,950,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array16
			
			this.object.push(c14.createCube(this.context,850,225,50,"#8ED6FF",1,"[4,1]"));//creating 14 - 41//array23
			this.object.push(c15.createCube(this.context,900,225,50,"#8ED6FF",1,"[0,1]"));//creating 15 - 01//array2
			this.object.push(c21.createCube(this.context,950,225,50,"#8ED6FF",1,"[1,1]"));//creating 21 - 11//array8
			this.object.push(c23.createCube(this.context,800,175,50,"#8ED6FF",1,"[3,2]"));//creating 24 - 32//array5
			this.object.push(c4.createCube(this.context,850,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array17
			
			this.object.push(c5.createCube(this.context,900,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array18
			this.object.push(c12.createCube(this.context,1000,275,50,"#8ED6FF",1,"[2,0]"));//creating 12 - 20//array19
			this.object.push(c2.createCube(this.context,1000,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array20
			this.object.push(c11.createCube(this.context,950,175,50,"#8ED6FF",1,"[1,2]"));//creating 11 - 12//array24
			this.object.push(c17.createCube(this.context,1000,175,50,"#8ED6FF",1,"[2,2]"));//creating 17 - 22//array4
			
	}	
//create cube and move cube 25	// start change array
	this.endofmove = function() {

			var str=new string();
			this.object.push(str.createString(this.context,520+0*55,450,"monospace",24,"#000000",1,pi.indexStringX[0]));
			var str=new string();
			this.object.push(str.createString(this.context,520+1*55,450,"monospace",24,"#000000",1,pi.indexStringX[1]));
			var str=new string();
			this.object.push(str.createString(this.context,520+2*55,450,"monospace",24,"#000000",1,pi.indexStringX[2]));
			var str=new string();
			this.object.push(str.createString(this.context,520+3*55,450,"monospace",24,"#000000",1,pi.indexStringX[3]));
			var str=new string();
			this.object.push(str.createString(this.context,520+4*55,450,"monospace",24,"#000000",1,pi.indexStringX[4]));

			var str=new string();
			this.object.push(str.createString(this.context,490,200+0*55,"monospace",24,"#000000",1,pi.indexStringY[0]));
			var str=new string();
			this.object.push(str.createString(this.context,490,200+1*55,"monospace",24,"#000000",1,pi.indexStringY[1]));
			var str=new string();
			this.object.push(str.createString(this.context,490,200+2*55,"monospace",24,"#000000",1,pi.indexStringY[2]));
			var str=new string();
			this.object.push(str.createString(this.context,490,200+3*55,"monospace",24,"#000000",1,pi.indexStringY[3]));
			var str=new string();
			this.object.push(str.createString(this.context,490,200+4*55,"monospace",24,"#000000",1,pi.indexStringY[4]));
	
			var str=new string();
			this.object.push(str.createString(this.context,490,140,"monospace",24,"#000000",1,pi.indexStringZ[1]));
			
			
			//Show cube 0 last position
	
	var c0 = new cube();
	var c1 = new cube();
	var c2 = new cube();
	var c3 = new cube();
	var c4 = new cube();
	
	var c5 = new cube();
	var c6 = new cube();
	var c7 = new cube();
	var c8 = new cube();
	var c9 = new cube();
	
	var c10 = new cube();
	var c11 = new cube();
	var c12 = new cube();
	var c13 = new cube();
	var c14 = new cube();
	
	var c15 = new cube();
	var c16 = new cube();
	var c17 = new cube();
	var c18 = new cube();
	var c19 = new cube();
	
	var c20 = new cube();
	var c21 = new cube();
	var c22 = new cube();
	var c23 = new cube();
	var c24 = new cube();

			this.object.push(c13.createCube(this.context,515,375,50,"#8ED6FF",1,"[3,3]"));//creating 13 - 33//array22
			this.object.push(c19.createCube(this.context,565,375,50,"#8ED6FF",1,"[3,4]"));//creating 19 - 43//array1
			this.object.push(c3.createCube(this.context,515,325,50,"#8ED6FF",1,"[3,4]"));//creating 3 - 34//array10
			this.object.push(c20.createCube(this.context,615,375,50,"#8ED6FF",1,"[0,3]"));//creating 20 - 03//array7
			this.object.push(c18.createCube(this.context,515,275,50,"#8ED6FF",1,"[3,0]"));//creating 18 - 30//array0
			
			this.object.push(c8.createCube(this.context,515,225,50,"#8ED6FF",1,"[3,1]"));//creating 8 - 31//array11
			this.object.push(c9.createCube(this.context,565,325,50,"#8ED6FF",1,"[4,4]"));//creating 9 - 44//array12 
			this.object.push(c24.createCube(this.context,565,275,50,"#8ED6FF",1,"[4,4]"));//creating 23 - 40//array6
			this.object.push(c1.createCube(this.context,665,375,50,"#8ED6FF",1,"[1,3]"));//creating 1 - 13//array13
			this.object.push(c7.createCube(this.context,715,375,50,"#8ED6FF",1,"[2,3]"));//creating 7 - 23//array21
			
			this.object.push(c10.createCube(this.context,615,325,50,"#8ED6FF",1,"[0,4]"));//creating 10 - 04//array14 
			this.object.push(c16.createCube(this.context,665,325,50,"#8ED6FF",1,"[1,4]"));//creating 16 - 14//array3
			this.object.push(c22.createCube(this.context,715,325,50,"#8ED6FF",1,"[2,4]"));//creating 22 - 24//array9
			this.object.push(c0.createCube(this.context,615,275,50,"#8ED6FF",1,"[0,0]"));//creating 0 - 00//array15 
			this.object.push(c6.createCube(this.context,665,275,50,"#8ED6FF",1,"[1,0]"));//creating 6 - 10//array16
			
			this.object.push(c14.createCube(this.context,565,225,50,"#8ED6FF",1,"[4,1]"));//creating 14 - 41//array23
			this.object.push(c15.createCube(this.context,615,225,50,"#8ED6FF",1,"[0,1]"));//creating 15 - 01//array2
			this.object.push(c21.createCube(this.context,665,225,50,"#8ED6FF",1,"[1,1]"));//creating 21 - 11//array8
			this.object.push(c23.createCube(this.context,515,175,50,"#8ED6FF",1,"[3,2]"));//creating 24 - 32//array5
			this.object.push(c4.createCube(this.context,565,175,50,"#8ED6FF",1,"[4,2]"));//creating 4 - 42//array17
			
			this.object.push(c5.createCube(this.context,615,175,50,"#8ED6FF",1,"[0,2]"));//creating 5 - 02//array18
			this.object.push(c12.createCube(this.context,715,275,50,"#8ED6FF",1,"[2,0]"));//creating 12 - 20//array19
			this.object.push(c2.createCube(this.context,715,225,50,"#8ED6FF",1,"[2,1]"));//creating 2 - 21//array20
			this.object.push(c11.createCube(this.context,665,175,50,"#8ED6FF",1,"[1,2]"));//creating 11 - 12//array24
			this.object.push(c17.createCube(this.context,715,175,50,"#8ED6FF",1,"[2,2]"));//creating 17 - 22//array4
			
	}	
	
	this.step1=function(){
		this.message= "This is PI";
		this.m_dialog.setMessage(this.context, this.message);
		audio.play("pi1");
		pi.storedraw1a();
		this.currentTimeout.push(new Timer(function(){
			if(pi.currentPhase != 0)
				return;
			pi.sortedObject = zSort5x5(pi.object);
			pi.playAnimationPhase(++pi.currentPhase) ;
			this.message= "" ;
		},2000*this.speedMultiplier));
	}
	this.step1a=function(){
		this.message= "RHO will use PI's formula and send it's cube to it's respectively PI's Place ";
		this.m_dialog.setMessage(this.context, this.message);
		audio.play("pi2");
		pi.storedraw1a();
		pi.storedraw1b();
		this.currentTimeout.push(new Timer(function(){
			if(pi.currentPhase != 1)
				return;
			pi.sortedObject = zSort5x5(pi.object);
			pi.playAnimationPhase(++pi.currentPhase) ;
			this.message= "" ;
		},2000*this.speedMultiplier));
	}
	this.step2=function(){
		this.message= "RHO[0][0] will move to PI[0][0]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube0(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 2)
				return;
			pi.targetCounter = 1;
			pi.object[12+24].moveTo(pi.object[12+24].pos.x+300,pi.object[12+24].pos.y,0.5, pi.objectHitTarget);
				this.message= "" ;
		},2000*this.speedMultiplier));
	}
	this.step3=function(){
		this.message= "RHO[0][0] will move to PI[0][0]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube0a(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 3)
				return;
			pi.targetCounter = 1;
			pi.object[12+24].moveTo(pi.object[12+24].pos.x+300,pi.object[12+24].pos.y,0.5, pi.objectHitTarget);
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step4=function(){
		this.message= "RHO[0][1] will move to PI[1][3]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube1(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 4)
				return;
			pi.targetCounter = 1;
			pi.object[13+24].moveTo(pi.object[13+24].pos.x+300,pi.object[13+24].pos.y+50,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step5=function(){
		this.message= "RHO[0][1] will move to PI[1][3]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube1a(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 5)
				return;
			pi.targetCounter = 1;
			pi.object[13+24].moveTo(pi.object[13+24].pos.x+350,pi.object[13+24].pos.y+100,0.5, pi.objectHitTarget);
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step6=function(){
		this.message= "RHO[0][2] will move to PI[2][1]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube2(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 6)
				return;
			pi.targetCounter = 1;
			pi.object[14+24].moveTo(pi.object[14+24].pos.x+300,pi.object[14+24].pos.y+100,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step7=function(){
		this.message= "RHO[0][2] will move to PI[2][1]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube2a(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 7)
				return;
			pi.targetCounter = 1;
			pi.object[14+24].moveTo(pi.object[14+24].pos.x+400,pi.object[14+24].pos.y-50,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step8=function(){
		this.message= "RHO[0][3] will move to PI[3][4]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube3();
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 8)
				return;
			pi.targetCounter = 1;
			pi.object[10+24].moveTo(pi.object[10+24].pos.x+300,pi.object[10+24].pos.y-100,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step9=function(){
		this.message= "RHO[0][3] will move to PI[3][4]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube3a();
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 9)
				return;
			pi.targetCounter = 1;
			pi.object[10+24].moveTo(pi.object[10+24].pos.x+200,pi.object[10+24].pos.y+50,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step10=function(){
		this.message= "RHO[0][4] will move to PI[4][2]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube4();
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 10)
				return;
			pi.targetCounter = 1;
			pi.object[11+24].moveTo(pi.object[11+24].pos.x+300,pi.object[11+24].pos.y-50,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step11=function(){
	this.message= "RHO[0][4] will move to PI[4][2]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube4a(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 11)
				return;
			pi.targetCounter = 1;
			pi.object[11+24].moveTo(pi.object[11+24].pos.x+250,pi.object[11+24].pos.y-100,0.5, pi.objectHitTarget)//cube5 array 11 fifth cube
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step12=function(){
		this.message= "RHO[1][0] will move to PI[0][2]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube5();
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 12)
				return;
			pi.targetCounter = 1;
			pi.object[17+24].moveTo(pi.object[17+24].pos.x+250,pi.object[17+24].pos.y,0.5, pi.objectHitTarget)//cube5 array 17 6th cube
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step13=function(){
		this.message= "RHO[1][0] will move to PI[0][2]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube5a(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 13)
				return;
			pi.targetCounter = 1;
			pi.object[17+24].moveTo(pi.object[17+24].pos.x+300,pi.object[17+24].pos.y-100,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step14=function(){
		this.message= "RHO[1][1] will move to PI[1][0]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube6(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 14)
				return;
			pi.targetCounter = 1;
			pi.object[18+24].moveTo(pi.object[18+24].pos.x+250,pi.object[18+24].pos.y+50,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step15=function(){
		this.message= "RHO[1][1] will move to PI[1][0]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube6a();
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 15)
				return;
			pi.targetCounter = 1;
			pi.object[18+24].moveTo(pi.object[18+24].pos.x+350,pi.object[18+24].pos.y,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step16=function(){
		this.message= "RHO[1][2] will move to PI[2][3]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube7(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 16)
				return;
			pi.targetCounter = 1;
			pi.object[19+24].moveTo(pi.object[19+24].pos.x+250,pi.object[19+24].pos.y+100,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step17=function(){
		this.message= "RHO[1][2] will move to PI[2][3]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube7a(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 17)
				return;
			pi.targetCounter = 1;
			pi.object[19+24].moveTo(pi.object[19+24].pos.x+400,pi.object[19+24].pos.y+100,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step18=function(){
		this.message= "RHO[1][3] will move to PI[3][1]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube8(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 18)
				return;
			pi.targetCounter = 1;
			pi.object[15+24].moveTo(pi.object[15+24].pos.x+250,pi.object[15+24].pos.y-100,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step19=function(){
		this.message= "RHO[1][3] will move to PI[3][1]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube8a(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 19)
				return;
			pi.targetCounter = 1;
			pi.object[15+24].moveTo(pi.object[15+24].pos.x+200,pi.object[15+24].pos.y-50,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step20=function(){
		this.message= "RHO[1][4] will move to PI[4][4]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube9(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 20)
				return;
			pi.targetCounter = 1;
			pi.object[16+24].moveTo(pi.object[16+24].pos.x+250,pi.object[16+24].pos.y-50,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step21=function(){
		this.message= "RHO[1][4] will move to PI[4][4]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube9a(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 21)
				return;
			pi.targetCounter = 1;
			pi.object[16+24].moveTo(pi.object[16+24].pos.x+250,pi.object[16+24].pos.y+50,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step22=function(){
		this.message= "RHO[2][0] will move to PI[0][4]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube10(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 22)
				return;
			pi.targetCounter = 1;
			pi.object[22+24].moveTo(pi.object[22+24].pos.x+200,pi.object[22+24].pos.y,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step23=function(){
		this.message= "RHO[2][0] will move to PI[0][4]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube10a(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 23)
				return;
			pi.targetCounter = 1;
			pi.object[22+24].moveTo(pi.object[22+24].pos.x+300,pi.object[22+24].pos.y+50,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step24=function(){
		this.message= "RHO[2][1] will move to PI[1][2]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube11(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 24)
				return;
			pi.targetCounter = 1;
			pi.object[23+24].moveTo(pi.object[23+24].pos.x+200,pi.object[23+24].pos.y+50,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step25=function(){
		this.message= "RHO[2][1] will move to PI[1][2]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube11a(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 25)
				return;
			pi.targetCounter = 1;
			pi.object[23+24].moveTo(pi.object[23+24].pos.x+350,pi.object[23+24].pos.y-100,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step26=function(){
		this.message= "RHO[2][2] will move to PI[2][0]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube12(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 26)
				return;
			pi.targetCounter = 1;
			pi.object[24+24].moveTo(pi.object[24+24].pos.x+200,pi.object[24+24].pos.y+100,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step27=function(){
		this.message= "RHO[2][2] will move to PI[2][0]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube12a(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 27	)
				return;
			pi.targetCounter = 1;
			pi.object[24+24].moveTo(pi.object[24+24].pos.x+400,pi.object[24+24].pos.y,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step28=function(){
		this.message= "RHO[2][3] will move to PI[3][3]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube13(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 28	)
				return;
			pi.targetCounter = 1;
			pi.object[22+24].moveTo(pi.object[22+24].pos.x+200,pi.object[22+24].pos.y-100,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step29=function(){
	this.message= "RHO[2][3] will move to PI[3][3]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube13a(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 29	)
				return;
			pi.targetCounter = 1;
			pi.object[22+24].moveTo(pi.object[22+24].pos.x+200,pi.object[22+24].pos.y+100,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step30=function(){
	this.message= "RHO[2][4] will move to PI[4][1]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube14(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 30	)
				return;
			pi.targetCounter = 1;
			pi.object[23+24].moveTo(pi.object[23+24].pos.x+200,pi.object[23+24].pos.y-50,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step31=function(){
	this.message= "RHO[2][4] will move to PI[4][1]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube14a(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 31	)
				return;
			pi.targetCounter = 1;
			pi.object[23+24].moveTo(pi.object[23+24].pos.x+250,pi.object[23+24].pos.y-50,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step32=function(){
		this.message= "RHO[3][0] will move to PI[0][1]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube15(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 32	)
				return;
			pi.targetCounter = 1;
			pi.object[2+24].moveTo(pi.object[2+24].pos.x+400,pi.object[2+24].pos.y,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step33=function(){
		this.message= "RHO[3][0] will move to PI[0][1]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube15a(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 33	)
				return;
			pi.targetCounter = 1;
			pi.object[2+24].moveTo(pi.object[2+24].pos.x+300,pi.object[2+24].pos.y-50,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step34=function(){
		this.message= "RHO[3][1] will move to PI[1][4]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube16(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 34	)
				return;
			pi.targetCounter = 1;
			pi.object[2+24].moveTo(pi.object[2+24].pos.x+400,pi.object[2+24].pos.y+50,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step35=function(){
		this.message= "RHO[3][1] will move to PI[1][4]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube16a(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 35	)
				return;
			pi.targetCounter = 1;
			pi.object[2+24].moveTo(pi.object[2+24].pos.x+350,pi.object[2+24].pos.y+100,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step36=function(){
		this.message= "RHO[3][2] will move to PI[2][2]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube17(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 36	)
				return;
			pi.targetCounter = 1;
			pi.object[2+24].moveTo(pi.object[2+24].pos.x+400,pi.object[2+24].pos.y+100,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step37=function(){
		this.message= "RHO[3][2] will move to PI[2][2]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube17a(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 37	)
				return;
			pi.targetCounter = 1;
			pi.object[2+24].moveTo(pi.object[2+24].pos.x+400,pi.object[2+24].pos.y-100,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step38=function(){
		this.message= "RHO[3][3] will move to PI[3][0]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube18(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 38	)
				return;
			pi.targetCounter = 1;
			pi.object[0+24].moveTo(pi.object[0+24].pos.x+400,pi.object[0+24].pos.y-100,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step39=function(){
		this.message= "RHO[3][3] will move to PI[3][0]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube18a(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 39	)
				return;
			pi.targetCounter = 1;
			pi.object[0+24].moveTo(pi.object[0+24].pos.x+200,pi.object[0+24].pos.y,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step40=function(){
		this.message= "RHO[3][4] will move to PI[4][3]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube19(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 40	)
				return;
			pi.targetCounter = 1;
			pi.object[0+24].moveTo(pi.object[0+24].pos.x+400,pi.object[0+24].pos.y-50,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step41=function(){
		this.message= "RHO[3][4] will move to PI[4][3]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube19a(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 41	)
				return;
			pi.targetCounter = 1;
			pi.object[0+24].moveTo(pi.object[0+24].pos.x+250,pi.object[0+24].pos.y+100,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step42=function(){
		this.message= "RHO[4][0] will move to PI[0][3]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube20(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 42	)
				return;
			pi.targetCounter = 1;
			pi.object[2+24].moveTo(pi.object[2+24].pos.x+350,pi.object[2+24].pos.y,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step43=function(){
		this.message= "RHO[4][0] will move to PI[0][3]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube20a(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 43	)
				return;
			pi.targetCounter = 1;
			pi.object[2+24].moveTo(pi.object[2+24].pos.x+300,pi.object[2+24].pos.y+100,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step44=function(){
		this.message= "RHO[4][1] will move to PI[1][1]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube21(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 44	)
				return;
			pi.targetCounter = 1;
			pi.object[2+24].moveTo(pi.object[2+24].pos.x+350,pi.object[2+24].pos.y+50,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step45=function(){
		this.message= "RHO[4][1] will move to PI[1][1]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube21a(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 45	)
				return;
			pi.targetCounter = 1;
			pi.object[2+24].moveTo(pi.object[2+24].pos.x+350,pi.object[2+24].pos.y-50,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step46=function(){
		this.message= "RHO[4][2] will move to PI[2][4]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube22(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 46	)
				return;
			pi.targetCounter = 1;
			pi.object[2+24].moveTo(pi.object[2+24].pos.x+350,pi.object[2+24].pos.y+100,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step47=function(){
		this.message= "RHO[4][2] will move to PI[2][4]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube22a(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 47	)
				return;
			pi.targetCounter = 1;
			pi.object[2+24].moveTo(pi.object[2+24].pos.x+400,pi.object[2+24].pos.y+50,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step48=function(){
		this.message= "RHO[4][3] will move to PI[3][2]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube23(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 48	)
				return;
			pi.targetCounter = 1;
			pi.object[0+24].moveTo(pi.object[0+24].pos.x+350,pi.object[0+24].pos.y-100,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step49=function(){
		this.message= "RHO[4][3] will move to PI[3][2]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube23a(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 49	)
				return;
			pi.targetCounter = 1;
			pi.object[0+24].moveTo(pi.object[0+24].pos.x+200,pi.object[0+24].pos.y-100,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step50=function(){
		this.message= "RHO[4][4] will move to PI[4][0]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube24(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 50	)
				return;
			pi.targetCounter = 1;
			pi.object[0+24].moveTo(pi.object[0+24].pos.x+350,pi.object[0+24].pos.y-50,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	this.step51=function(){
		this.message= "RHO[4][4] will move to PI[4][0]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube24a(); 
		console.log("Object"+pi.object.length);
		pi.sortedObject = zSort5x5(pi.object);
		this.currentTimeout.push(new Timer(function(){
			console.log("Object splice"+pi.object.length);
			if(pi.currentPhase != 51	)
				return;
			pi.targetCounter = 1;
			pi.object[0+24].moveTo(pi.object[0+24].pos.x+250,pi.object[0+24].pos.y,0.5, pi.objectHitTarget)
			this.message= "" ;	
		},4000*this.speedMultiplier));
	}
	this.step52=function(){
		this.message= "RHO[4][4] will move to PI[4][0]";
		this.m_dialog.setMessage(this.context, this.message);
		pi.storedraw1a();
		pi.storedraw1b();
		pi.moveCube25(); 
		this.currentTimeout.push(new Timer(function(){
			if(pi.currentPhase != 52)
				return;
			pi.sortedObject = zSort5x5(pi.object);
			pi.playAnimationPhase(++pi.currentPhase) ;
			this.message= "" ;
		},2000*this.speedMultiplier));
	}	
	this.step53=function(){
		this.message= "This is the end of PI. This will be the input value for CHI.";
		this.m_dialog.setMessage(this.context, this.message);
		audio.play("pi4");
		pi.endofmove();
		this.currentTimeout.push(new Timer(function(){
			if(pi.currentPhase != 53)
				return;
			pi.sortedObject = zSort5x5(pi.object);
			this.message= "" ;	
		},2000*this.speedMultiplier));
	}
	
	this.objectHitTarget = function()
	{
		++pi.hitCounter;
		
		if(pi.hitCounter >= pi.targetCounter)
		{
			pi.hitCounter = 0;
			pi.playAnimationPhase(++pi.currentPhase);
		}
	}
	
	// Animation phases
	this.playAnimationPhase = function(phase, skipAudio)
	{
		if(!skipAudio)
		{
			if(audio.durationLeft() > 0)
			{
				pi.currentTimeout.push(new Timer(pi.playAnimationPhase, (audio.durationLeft() + 2) * 1000, phase));
				return;
			}
		}
		else
		{
			audio.stop();
		}
		//ERIC: If only its a new step, remove all previously created objects
		if(pi.step_array.indexOf(phase) > -1)
		{
			for(var i=0; i<pi.currentTimeout.length; i++)
			{
				pi.currentTimeout[i].remove();
			}
			
			pi.currentTimeout = new Array();
			pi.object = new Array();
			pi.sortedObject = new Array();
		}
		
		switch(phase)
		{
			case 0:
				pi.step1();//pi Step I Start
				break;
			case 1:
				pi.step1a();
				break;
			case 2:
				pi.step2();
				break;
			case 3:
				pi.step3();
				break;
			case 4:
				pi.step4();
				break;
			case 5:
				pi.step5();
				break;
			case 6:
				pi.step6();
				break;
			case 7:
				pi.step7();
				break;
			case 8:
				pi.step8();
				break;
			case 9:
				pi.step9(); 
				break;
			case 10: 
				pi.step10();
				break;
			case 11:
				pi.step11();
				break;
			case 12:
				pi.step12();
				break;
			case 13:
				pi.step13();
				break;
			case 14:
				pi.step14();
				break;
			case 15:
				pi.step15();
				break;
			case 16:
				pi.step16();
				break;
			case 17:
				pi.step17();
				break;
			case 18:
				pi.step18();
				break;
			case 19:
				pi.step19();
				break;
			case 20:
				pi.step20();
				break;
			case 21:
				pi.step21();
				break;
			case 22:
				pi.step22();
				break;
			case 23:
				pi.step23();
				break;
			case 24:
				pi.step24();
				break;
			case 25:
				pi.step25();
				break;
			case 26:
				pi.step26();
				break;
			case 27:
				pi.step27();
				break;
			case 28:
				pi.step28();
				break;
			case 29:
				pi.step29();
				break;
			case 30:
				pi.step30();
				break;
			case 31:
				pi.step31();
				break;
			case 32:
				pi.step32();
				break;
			case 33:
				pi.step33();
				break;
			case 34:
				pi.step34();
				break;
			case 35:
				pi.step35();
				break;
			case 36:
				pi.step36();
				break;
			case 37:
				pi.step37();
				break;
			case 38:
				pi.step38();
				break;
			case 39:
				pi.step39();
				break;
			case 40: 
				pi.step40();
				break;	
			case 41: 
				pi.step41();
				break;
			case 42: 
				pi.step42();
				break;	
			case 43: 
				pi.step43();
				break;	
			case 44: 
				pi.step44();
				break;	
			case 45: 
				pi.step45();
				break;	
			case 46: 
				pi.step46();
				break;	
			case 47: 
				pi.step47();
				break;	
			case 48: 
				pi.step48();
				break;	
			case 49: 
				pi.step49();
				break;	
			case 50: 
				pi.step50();
				break;	
			case 51: 
				pi.step51();
				break;	
			case 52: 
				pi.step52();
				break;
			case 53:
				pi.step53();
				break;
			
		}
		pi.sortedObject = zSort5x5(pi.object);
	}
}

//pi.init();