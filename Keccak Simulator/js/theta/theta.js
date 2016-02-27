/*	Zin: theta.js
	---------------
	info: shows a hard coded function which translates
		  input into 5x5 matrix for use in keccak
		  
				sequence: 
				storedraw1()		//store drawings for theta phase 1
				step1()				//start theta Phrase I
				step2()				//show cube to XOR up 1	
				step3()				//show operator 1
				step4()				//show cube to XOR up 2	
				step5()				//show operator 2
				step6()				//show cube to XOR up 3
				step7()				//show operator 3
				step8()				//show cube to XOR up 4
				step9()				//show operator 4
				step10()			//show cube to XOR up 5
				storedraw2()		//store drawing for theta phase 2
				storedraw3(i)		//store drawing for small cubes
				storedraw4(i)		//store drawing for small cubes
				step11()			//A' torot
				step12()			//A' toxor
				step13()			//A' toprime
				step14()			//B' torot
				step15()			//B' toxor
				step16()			//B' toprime
				step17()			//C' torot
				step18()			//C' toxor
				step19()			//C' toprime
				step20()			//D' torot
				step21()			//D' toxor
				step22()			//D' toprime
				step23()			//E' torot
				step24()			//E' toxor
				step25()			//E' toprime
				storedraw5()		//store drawings for theta phase3
				step26()			//show cube base to XOR state
				step27()			//show cube to XOR state 1
				step28()			//show operator 1
				step29()			//show cube to XOR state 2
				step30()			//show operator 2
				step31()			//show cube to XOR state 3
				step32()			//show operator 3
				step33()			//show cube to XOR state 4
				step34()			//show operator 4
				step35()			//show cube to XOR state 5
				step36()			//show operator 5
				step37()			//show final state
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
	
	//all timeouts will be stored here, when the game is pause,
	// all setTimeout(Timer function in util.js) will be handle in that function
	this.currentTimeout = new Array();
	this.m_dialog;
	this.message = "";
	
	// animation sets
	this.object = new Array();
	this.sortedObject = new Array();
	this.maxPhase = 5;
	this.dialogs=new Array();
	this.indexStringX=["3","4","0","1","2"];
	this.indexStringY=["2","1","0","4","3"];
	this.labels = ["D","E","A","B","C"];
	this.labelprimes = ["D'","E'","A'","B'","C'"];
	
	//Insert all critical steps into this array
	// Objects will be cleared automatically in playAnimationPhase() on critical steps
	this.step_array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36];
	
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
		// object input string
		//this.inputString = inputString;

		this.m_dialog = new dialog();
		this.m_dialog.createDialog(this.context,this.message);
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
	
	
	//Called when user skip this theta steps,
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
	
	//Handle pause here
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
	
	//Handle resume here
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
		
		theta_render.update();
	}
	//Theta phase 1 Start
	this.storedraw1=function(){
				var filler = new Array();
				for (var i=0; i<25; ++i) {
					filler.push("");
				}
				
				// (context, x, y, size, color, alpha, input)
				var skeleton = new slice();
				this.object.push(skeleton.createSlice(
					this.context,
					515,
					175,
					50,
					"#8ED6FF",
					0.25,
					filler
				));
				
				for (var i=0; i<5; ++i){
					var str=new string();
					
					this.object.push(str.createString(
						this.context,
						520+i*55,
						450,
						"sans-serif, serif",
						24,
						"#000000",
						1,
						theta.indexStringX[i]
					));
				}
				for (var i=0; i<5; ++i){
					var str=new string();
					
					this.object.push(str.createString(
						this.context,
						480,
						200+i*55,
						"sans-serif, serif",
						24,
						"#000000",
						1,
						theta.indexStringY[i]
					));
				}
	}
	this.step1=function(){
		this.message= "Theta Step is one of the operation to achieve diffusion in Keccak-f permutation with 3 phases . Now,this is State S ready to go through Round function of permutation" ;
		this.m_dialog.setMessage(this.context, this.message);
		audio.play("theta1");
		theta.storedraw1();		
		this.currentTimeout.push(new Timer(function(){
			if(theta.currentPhase != 0)
				return;
			theta.sortedObject = theta.object;
			theta.playAnimationPhase(++theta.currentPhase) ;
			this.message= "" ;
		},3000*this.speedMultiplier));
	}
	this.step2=function(){
		this.message="Theta phase 1 performs XOR in column of State array. 'A','B','C','D','E' will XOR with every bit above, Yellow color circles indicate XOR";
		this.m_dialog.setMessage(this.context, this.message);
		audio.play("theta2");
		
		theta.storedraw1();
		var tableInput = [[theta.labels[0]+"     ",KECCAK.data["absorb_round0"]["theta_step1"][21] ],
			[theta.labels[1]+"     ", KECCAK.data["absorb_round0"]["theta_step1"][27]],
			[theta.labels[2]+"     ", KECCAK.data["absorb_round0"]["theta_step1"][3]],
			[theta.labels[3]+"     ", KECCAK.data["absorb_round0"]["theta_step1"][9]],
			[theta.labels[4]+"     ", KECCAK.data["absorb_round0"]["theta_step1"][15]],
		];

		var t = new table();
		this.object.push(t.createTable(
			this.context,
			5*this.spaceX+2*this.padding,
			0.5*this.spaceY,
			tableInput
		));
		
		var str=new string();
			
		this.object.push(str.createString(
				this.context,
				5*this.spaceX+2*this.padding,
				245,
				"sans-serif, serif",
				24,
				"#000000",
				1,
				"Bit Value Table"
		));
		
		for (var i=0; i<5; ++i) {
				var c = new cube();
				this.object.push(c.createCube(
					this.context,
						this.startX+50*i,
						this.startY+200,
						50,
						"#8ED6FF",
						1,
						theta.labels[i]
				));
			}
			
		console.log("Object"+theta.object.length);
		theta.sortedObject = theta.object;
		
		//theta.object=theta.storedraw1.object;
		
		this.currentTimeout.push(new Timer(function(){
			theta.object.splice(0,13);
			console.log("Object splice"+theta.object.length);
			if(theta.currentPhase != 1)
				return;
			//theta.sortedObject = theta.object;
			theta.targetCounter = theta.object.length;
			this.message= "" ;
			for(var i=0; i<theta.object.length; i++)
				theta.object[i].moveTo(theta.object[i].pos.x,theta.object[i].pos.y-50,1, theta.objectHitTarget);
				
		},3000*this.speedMultiplier));
	}
	
	this.step3=function(){
		//this.dialogs[0].setMessage(this.context, "This is Step 3");
		this.message="Theta phase 1 performs XOR in column of State array. 'A','B','C','D','E' will XOR with every bit above, Yellow color circle indicate XOR";
		this.m_dialog.setMessage(this.context, this.message);
		//audio.play("theta2");
		theta.storedraw1();
		
		for(var i=0; i<5; ++i){
			var opxor = new operator();
				this.object.push(opxor.createOperator(
					this.context,
					this.padding+this.startX+50*i,
					this.startY+200-this.padding,
					20,
					"#ffd66a",
					1,
					""
				));
			}
		
		
		console.log("Object"+theta.object.length);
		theta.sortedObject = theta.object;
		
		//theta.object=theta.storedraw1.object;
		
		this.currentTimeout.push(new Timer(function(){
			//theta.object.splice(0,11);
			console.log("Object splice"+theta.object.length);
			if(theta.currentPhase != 2)
				return;
			theta.playAnimationPhase(++theta.currentPhase) ;
			this.message="";
		},3000*this.speedMultiplier));
	}
	
	this.step4=function(){
		this.message="Theta phase 1 performs XOR in column of State array. 'A','B','C','D','E' will XOR with every bit above, Yellow color circle indicate XOR";
		this.m_dialog.setMessage(this.context, this.message);
		//audio.play("theta2");
		//this.dialogs[0].setMessage(this.context, "This is Step 4");
		theta.storedraw1();
		for (var i=0; i<5; ++i) {
				var c = new cube();
				this.object.push(c.createCube(
					this.context,
						this.startX+50*i,
						this.startY+150,
						50,
						"#8ED6FF",
						1,
						theta.labels[i]
				));
			}
		console.log("Object"+theta.object.length);
		theta.sortedObject = theta.object;
		
		//theta.object=theta.storedraw1.object;
		
		this.currentTimeout.push(new Timer(function(){
			theta.object.splice(0,11);
			console.log("Object splice"+theta.object.length);
			if(theta.currentPhase != 3)
				return;
			//theta.sortedObject = theta.object;
			this.message="";
			theta.targetCounter = theta.object.length;
			for(var i=0; i<theta.object.length; i++)
				theta.object[i].moveTo(theta.object[i].pos.x,theta.object[i].pos.y-50,1, theta.objectHitTarget);
			
		},3000*this.speedMultiplier));
	}
	
	this.step5=function(){
		//this.dialogs[0].setMessage(this.context, "This is Step 5");
		this.message="Theta phase 1 performs XOR in column of State array. 'A','B','C','D','E' will XOR with every bit above, Yellow color circle indicate XOR";
		this.m_dialog.setMessage(this.context, this.message);
		//audio.play("theta2");
		theta.storedraw1();
		for(var i=0; i<5; ++i){
			var opxor = new operator();
				this.object.push(opxor.createOperator(
					this.context,
					this.padding+this.startX+50*i,
					this.startY+150-this.padding,
					20,
					"#ffd66a",
					1,
					""
				));
			}
		
		
		console.log("Object"+theta.object.length);
		theta.sortedObject = theta.object;
		
		//theta.object=theta.storedraw1.object;
		
		this.currentTimeout.push(new Timer(function(){
			//theta.object.splice(0,11);
			console.log("Object splice"+theta.object.length);
			if(theta.currentPhase != 4)
				return;
			theta.playAnimationPhase(++theta.currentPhase) ;
			this.message="";
		},3000*this.speedMultiplier));
	}
	
	this.step6=function(){
		//this.dialogs[0].setMessage(this.context, "This is Step 6");
		this.message="Theta phase 1 performs XOR in column of State array. 'A','B','C','D','E' will XOR with every bit above, Yellow color circle indicate XOR";
		this.m_dialog.setMessage(this.context, this.message);
		//audio.play("theta2");
		theta.storedraw1();
		for (var i=0; i<5; ++i) {
				var c = new cube();
				this.object.push(c.createCube(
					this.context,
						this.startX+50*i,
						this.startY+100,
						50,
						"#8ED6FF",
						1,
						theta.labels[i]
				));
			}
		console.log("Object"+theta.object.length);
		theta.sortedObject = theta.object;
		
		//theta.object=theta.storedraw1.object;
		
		this.currentTimeout.push(new Timer(function(){
			theta.object.splice(0,11);
			console.log("Object splice"+theta.object.length);
			if(theta.currentPhase != 5)
				return;
			//theta.sortedObject = theta.object;
			theta.targetCounter = theta.object.length;
			for(var i=0; i<theta.object.length; i++)
				theta.object[i].moveTo(theta.object[i].pos.x,theta.object[i].pos.y-50,1, theta.objectHitTarget);
			this.message="";
		},3000*this.speedMultiplier));
	}
	
	this.step7=function(){
		//this.dialogs[0].setMessage(this.context, "This is Step 7");
		this.message="Theta phase 1 performs XOR in column of State array. 'A','B','C','D','E' will XOR with every bit above, Yellow color circle indicate XOR";
		this.m_dialog.setMessage(this.context, this.message);
		//audio.play("theta2");
		theta.storedraw1();
		for(var i=0; i<5; ++i){
			var opxor = new operator();
				this.object.push(opxor.createOperator(
					this.context,
					this.padding+this.startX+50*i,
					this.startY+100-this.padding,
					20,
					"#ffd66a",
					1,
					""
				));
			}
		
		
		console.log("Object"+theta.object.length);
		theta.sortedObject = theta.object;
		
		//theta.object=theta.storedraw1.object;
		
		this.currentTimeout.push(new Timer(function(){
			//theta.object.splice(0,11);
			console.log("Object splice"+theta.object.length);
			if(theta.currentPhase != 6)
				return;
			theta.playAnimationPhase(++theta.currentPhase) ;
			this.message="";
		},3000*this.speedMultiplier));
	}
	
	this.step8=function(){
		this.message="Theta phase 1 performs XOR in column of State array. 'A','B','C','D','E' will XOR with every bit above, Yellow color circle indicate XOR";
		this.m_dialog.setMessage(this.context, this.message);
		//audio.play("theta2");
		//this.dialogs[0].setMessage(this.context, "This is Step 8");
		theta.storedraw1();
		for (var i=0; i<5; ++i) {
				var c = new cube();
				this.object.push(c.createCube(
					this.context,
						this.startX+50*i,
						this.startY+50,
						50,
						"#8ED6FF",
						1,
						theta.labels[i]
				));
			}
		console.log("Object"+theta.object.length);
		theta.sortedObject = theta.object;
		
		//theta.object=theta.storedraw1.object;
		
		this.currentTimeout.push(new Timer(function(){
			theta.object.splice(0,11);
			console.log("Object splice"+theta.object.length);
			if(theta.currentPhase != 7)
				return;
			//theta.sortedObject = theta.object;
			theta.targetCounter = theta.object.length;
			for(var i=0; i<theta.object.length; i++)
				theta.object[i].moveTo(theta.object[i].pos.x,theta.object[i].pos.y-50,1, theta.objectHitTarget);
			this.message="";
		},3000*this.speedMultiplier));
	}
	
	this.step9=function(){
		//this.dialogs[0].setMessage(this.context, "This is Step 7");
		this.message="Theta phase 1 performs XOR in column of State array. 'A','B','C','D','E' will XOR with every bit above, Yellow color circle indicate XOR";
		this.m_dialog.setMessage(this.context, this.message);
		//audio.play("theta2");
		theta.storedraw1();
		for(var i=0; i<5; ++i){
			var opxor = new operator();
				this.object.push(opxor.createOperator(
					this.context,
					this.padding+this.startX+50*i,
					this.startY+50-this.padding,
					20,
					"#ffd66a",
					1,
					""
				));
			}
		
		
		console.log("Object"+theta.object.length);
		theta.sortedObject = theta.object;
		
		//theta.object=theta.storedraw1.object;
		
		this.currentTimeout.push(new Timer(function(){
			//theta.object.splice(0,11);
			console.log("Object splice"+theta.object.length);
			if(theta.currentPhase != 8)
				return;
			theta.playAnimationPhase(++theta.currentPhase) ;
			this.message="";
		},3000*this.speedMultiplier));
	}
	
	this.step10=function(){
		this.message="The table on the right show the new value of 'A','B','C','D' and 'E' after XOR every bits in column. This concludes theta phase 1 and ready to proceed to phase 2";
		this.m_dialog.setMessage(this.context, this.message);
		audio.play("theta3");
		theta.storedraw1();
		var tableInput = [[theta.labels[0],KECCAK.data["absorb_round0"]["theta_step1"][29] ],
			[theta.labels[1], KECCAK.data["absorb_round0"]["theta_step1"][28]],
			[theta.labels[2], KECCAK.data["absorb_round0"]["theta_step1"][5]],
			[theta.labels[3], KECCAK.data["absorb_round0"]["theta_step1"][11]],
			[theta.labels[4], KECCAK.data["absorb_round0"]["theta_step1"][23]],
		];

		var t = new table();
		this.object.push(t.createTable(
			this.context,
			5*this.spaceX+2*this.padding,
			0.5*this.spaceY,
			tableInput
		));
		var str=new string();
			
		this.object.push(str.createString(
				this.context,
				5*this.spaceX+2*this.padding,
				245,
				"sans-serif, serif",
				24,
				"#000000",
				1,
				"Bit Value Table"
		));
		for (var i=0; i<5; ++i) {
				var c = new cube();
				this.object.push(c.createCube(
					this.context,
						this.startX+50*i,
						this.startY,
						50,
						"#8ED6FF",
						1,
						theta.labels[i]
				));
			}
		console.log("Object"+theta.object.length);
		theta.sortedObject = theta.object;
		
		//theta.object=theta.storedraw1.object;
		
		this.currentTimeout.push(new Timer(function(){
			theta.object.splice(0,13);
			console.log("Object splice"+theta.object.length);
			if(theta.currentPhase != 9)
				return;
			//theta.sortedObject = theta.object;
			theta.targetCounter = theta.object.length;
			this.message="";
			for(var i=0; i<theta.object.length; i++)
				//var posX = ;
				theta.object[i].moveTo(25+i*theta.spaceX,27,0.5,theta.objectHitTarget);
			
		},3000*this.speedMultiplier));
	}
	//Theta phase 1 finished
	
	
	
	//Theta phase 2 Start
	this.storedraw2=function(){
		/*var opxor = new operator();
			this.object.push(opxor.createOperator(
				this.context,
				780,
				180,
				60,
				"#ffd66a",
				1,
				"XOR"
			));
		
		var oprot = new operator();
			this.object.push(oprot.createOperator(
				this.context,
				780,
				280,
				60,
				"#9900CC",
				1,
				"ROT"
			));*/
		for (var i=0; i<5; ++i) {//cube ABCDE
				var c = new cube();
				this.object.push(c.createCube(
					this.context,
						25+i*theta.spaceX,
						27,
						50,
						"#8ED6FF",
						1,
						theta.labels[i]
				));
			}
			
			for (var i=0; i<5; ++i) {
			var posX = i * 150;
			var c = new cube();
			this.object.push(c.createCube(
					this.context,
					25+posX,
					450,
					50,
					"#8ED6FF",
					1,
					theta.labelprimes[i]
			));
		}
		
		for(var i=0;i<5;++i) {
			var posX = i * this.spaceX;
			var x1 = this.padding+posX+37.5;
			var y1 = this.padding+50;

			// and group (toand, toand2, opand)
			var x2 = x1+(this.spaceX/4);
			var y2 = y1+(this.spaceY/4)+100;

			var opand = new operator();//Rot
			this.object.push(opand.createOperator(
				this.context,
				x2+10,
				y2,
				60,
				"#9900CC",
				1,
				"ROT"
			));

			var opxor = new operator();
			this.object.push(opxor.createOperator(
				this.context,
				x1,
				y1+(this.spaceY/4*3)-50,
				60,
				"#ffd66a",
				1,
				"XOR"
			));
			// rot to xor
			var rottoxor=new line();
			this.object.push(rottoxor.createLine(
					this.context,
					x2+10,
					y2+15,
					x1+15,
					y1+(this.spaceY/4*3)-78,
					"#000000",
					1
				));
			
			// xor to cube
			var xortocube=new line();
			this.object.push(xortocube.createLine(
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
				this.object.push(torot1.createLine(
					this.context,
					x3,
					y3,
					x1+67,
					y1+(this.spaceY/4*3)-173,
					"#000000",
					1
				));
				this.object.push(toxor1.createLine(
					this.context,
					x1-12,
					y3,
					x3,
					y1+(this.spaceY/4*3)-78,
					"#000000",
					1
				));	
			} else {
				var torot= new line();
				this.object.push(torot.createLine(
					this.context,
					this.padding+25,
					y3,
					this.padding+25,
					y3+50,
					"#000000",
					1
				));
				var torot2= new line();
				this.object.push(torot2.createLine(
					this.context,
					this.padding+25,
					y3+50,
					this.padding+700,
					y3+50,
					"#000000",
					1
				));
				var torot3= new line();
				this.object.push(torot3.createLine(
					this.context,
					this.padding+700,
					y3+50,
					this.padding+700,
					y3+200,
					"#000000",
					1
				));
				var toxor2=new line();
				this.object.push(toxor2.createLine(
					this.context,
					this.padding+625,
					y3,
					this.padding+625,
					y3+100,
					"#000000",
					1
				));
				var toxor3=new line();
				this.object.push(toxor3.createLine(
					this.context,
					this.padding+625,
					y3+100,
					this.padding+25,
					y3+100,
					"#000000",
					1
				));
				var toxor4=new line();
				this.object.push(toxor4.createLine(
					this.context,
					this.padding+25,
					y3+100,
					this.padding+25,
					y3+300,
					"#000000",
					1
				));
				
			}

			
		}
	}
	
	this.storedraw3=function(i){
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
		theta.object.push(ac.createCube(
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
		theta.object.push(dc.createCube(
			this.context,
			this.padding+posX,
			this.padding+posY,
			20,
			"#FFF000",
			1,
			""
		));
		
	}
	
	this.storedraw4=function(i){
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
		theta.object.push(ac.createCube(
			this.context,
			this.padding+posX,
			this.padding+posY,
			20,
			"#FFF000",
			1,
			""
		));
		
		
		
	}
	
	this.step11=function(){ //torot A'
		this.message="Theta phase 2 perfoms Rotation and XOR of two bits from result of phase 1 to get maximum diffusion by going through every bit. We can see how XOR and Rotation work in 'Learn Basic Operation' page. To get A', E (before A) XOR with rotated B (after A)";
		this.m_dialog.setMessage(this.context, this.message);
		audio.play("theta4");
		theta.storedraw3(0);
		theta.storedraw2();
		var tableInput = [
			[theta.labels[1], KECCAK.data["absorb_round0"]["theta_step1"][29]],
			[theta.labels[3],KECCAK.data["absorb_round0"]["theta_step1"][11] ],
			["Rotate "+theta.labels[3], ""],
			[theta.labels[1]+" XOR "+theta.labels[3], ""],
			[theta.labelprimes[2], ""],
		];

		var t = new table();
		this.object.push(t.createTable(
			this.context,
			5*this.spaceX+2*this.padding,
			0.5*this.spaceY,
			tableInput
		));
		var str=new string();
			
		this.object.push(str.createString(
				this.context,
				5*this.spaceX+2*this.padding,
				245,
				"sans-serif, serif",
				24,
				"#000000",
				1,
				"Bit Value Table"
		));
		console.log("Object"+theta.object.length);
		theta.sortedObject = theta.object;
		this.currentTimeout.push(new Timer(function(){
			
			console.log("Object splice"+theta.object.length);
			if(theta.currentPhase != 10)
				return;
			
			theta.targetCounter = 1;
				theta.object[1].moveTo(400,300,1,theta.objectHitTarget);
			this.message="";
		},3000*this.speedMultiplier));
	}
	
	this.step12=function(){ //toxor
		this.message="A' = (A-1) XOR (Rot(A+1)), where A-1 is E and A+1 is B";
		this.m_dialog.setMessage(this.context, this.message);

		theta.storedraw4(0);
		var dc = new cube();
		theta.object.push(dc.createCube(
			this.context,
			400,
			300,
			20,
			"#FFF000",
			1,
			""
		));
		theta.storedraw2();
		var tableInput = [
			[theta.labels[1], KECCAK.data["absorb_round0"]["theta_step1"][29]],
			[theta.labels[3],KECCAK.data["absorb_round0"]["theta_step1"][11] ],
			["Rotate "+theta.labels[3], KECCAK.data["absorb_round0"]["theta_step2"][1]],
			[theta.labels[1]+" XOR "+theta.labels[3], ""],
			[theta.labelprimes[2], ""],
		];

		var t = new table();
		this.object.push(t.createTable(
			this.context,
			5*this.spaceX+2*this.padding,
			0.5*this.spaceY,
			tableInput
		));
		var str=new string();
			
		this.object.push(str.createString(
				this.context,
				5*this.spaceX+2*this.padding,
				245,
				"sans-serif, serif",
				24,
				"#000000",
				1,
				"Bit Value Table"
		));
		console.log("Object"+theta.object.length);
		theta.sortedObject = theta.object;
		this.currentTimeout.push(new Timer(function(){
			
			console.log("Object splice"+theta.object.length);
			if(theta.currentPhase != 11)
				return;
			
			theta.targetCounter = 2;
				theta.object[0].moveTo(theta.object[0].pos.x+158,theta.object[0].pos.y+320,1.5,theta.objectHitTarget);
				theta.object[1].moveTo(theta.object[0].pos.x+158,theta.object[0].pos.y+320,1.2,theta.objectHitTarget);
				this.message="";
		},3000*this.speedMultiplier));
	}
	
	this.step13=function(){ //toprime
		this.message="A' = (A-1) XOR (Rot(A+1)), where A-1 is E and A+1 is B";
		this.m_dialog.setMessage(this.context, this.message);
		var dc = new cube();
		theta.object.push(dc.createCube(
			this.context,
			350,
			400,
			20,
			"#FFF000",
			1,
			""
		));
		theta.storedraw2();
		var tableInput = [
			[theta.labels[1], KECCAK.data["absorb_round0"]["theta_step1"][29]],
			[theta.labels[3],KECCAK.data["absorb_round0"]["theta_step1"][11] ],
			["Rotate "+theta.labels[3], KECCAK.data["absorb_round0"]["theta_step2"][1]],
			[theta.labels[1]+" XOR "+theta.labels[3], KECCAK.data["absorb_round0"]["theta_step2"][2]],
			[theta.labelprimes[2], KECCAK.data["absorb_round0"]["theta_step2"][2]],
		];

		var t = new table();
		this.object.push(t.createTable(
			this.context,
			5*this.spaceX+2*this.padding,
			0.5*this.spaceY,
			tableInput
		));
		var str=new string();
			
		this.object.push(str.createString(
				this.context,
				5*this.spaceX+2*this.padding,
				245,
				"sans-serif, serif",
				24,
				"#000000",
				1,
				"Bit Value Table"
		));
		theta.sortedObject = theta.object;
		this.currentTimeout.push(new Timer(function(){
			
			console.log("Object splice"+theta.object.length);
			if(theta.currentPhase != 12)
				return;
			
			theta.targetCounter = 1;
				theta.object[0].moveTo(theta.object[0].pos.x,theta.object[0].pos.y+40,1.5,theta.objectHitTarget);
				this.message="";
		},3000*this.speedMultiplier));
	}
	
	this.step14=function(){ //torot B'
	this.message="Same as A', get B' by A (before B) XOR with rotated C (after B)";
		this.m_dialog.setMessage(this.context, this.message);
		theta.storedraw3(1);
		theta.storedraw2();
		var tableInput = [
			[theta.labels[2], KECCAK.data["absorb_round0"]["theta_step1"][5]],
			[theta.labels[4],KECCAK.data["absorb_round0"]["theta_step1"][17] ],
			["Rotate "+theta.labels[4], ""],
			[theta.labels[2]+" XOR "+theta.labels[4], ""],
			[theta.labelprimes[3], ""],
		];

		var t = new table();
		this.object.push(t.createTable(
			this.context,
			5*this.spaceX+2*this.padding,
			0.5*this.spaceY,
			tableInput
		));
		var str=new string();
			
		this.object.push(str.createString(
				this.context,
				5*this.spaceX+2*this.padding,
				245,
				"sans-serif, serif",
				24,
				"#000000",
				1,
				"Bit Value Table"
		));
		console.log("Object"+theta.object.length);
		theta.sortedObject = theta.object;
		this.currentTimeout.push(new Timer(function(){
			
			console.log("Object splice"+theta.object.length);
			if(theta.currentPhase != 13)
				return;
			
			theta.targetCounter = 1;
				theta.object[1].moveTo(550,300,1,theta.objectHitTarget);
				this.message="";
		},3000*this.speedMultiplier));
	}
	
	this.step15=function(){ //toxor
	this.message="B' = (B-1) XOR (Rot(B+1)), where B-1 is A and B+1 is C";
		this.m_dialog.setMessage(this.context, this.message);
		theta.storedraw4(1);
		var dc = new cube();
		theta.object.push(dc.createCube(
			this.context,
			550,
			300,
			20,
			"#FFF000",
			1,
			""
		));
		theta.storedraw2();
		var tableInput = [
			[theta.labels[2], KECCAK.data["absorb_round0"]["theta_step1"][5]],
			[theta.labels[4],KECCAK.data["absorb_round0"]["theta_step1"][17] ],
			["Rotate "+theta.labels[4], KECCAK.data["absorb_round0"]["theta_step2"][4]],
			[theta.labels[2]+" XOR "+theta.labels[4], ""],
			[theta.labelprimes[3], ""],
		];

		var t = new table();
		this.object.push(t.createTable(
			this.context,
			5*this.spaceX+2*this.padding,
			0.5*this.spaceY,
			tableInput
		));
		var str=new string();
			
		this.object.push(str.createString(
				this.context,
				5*this.spaceX+2*this.padding,
				245,
				"sans-serif, serif",
				24,
				"#000000",
				1,
				"Bit Value Table"
		));
		console.log("Object"+theta.object.length);
		theta.sortedObject = theta.object;
		this.currentTimeout.push(new Timer(function(){
			
			console.log("Object splice"+theta.object.length);
			if(theta.currentPhase != 14)
				return;
			
			theta.targetCounter = 2;
				theta.object[0].moveTo(theta.object[0].pos.x+158,theta.object[0].pos.y+320,1.5,theta.objectHitTarget);
				theta.object[1].moveTo(theta.object[0].pos.x+158,theta.object[0].pos.y+320,1.2,theta.objectHitTarget);
				this.message="";
		},3000*this.speedMultiplier));
	}
	
	this.step16=function(){ //toprime
	this.message="B' = (B-1) XOR (Rot(B+1)), where B-1 is A and B+1 is C";
		this.m_dialog.setMessage(this.context, this.message);
		var dc = new cube();
		theta.object.push(dc.createCube(
			this.context,
			500,
			400,
			20,
			"#FFF000",
			1,
			""
		));
		theta.storedraw2();
		var tableInput = [
			[theta.labels[2], KECCAK.data["absorb_round0"]["theta_step1"][5]],
			[theta.labels[4],KECCAK.data["absorb_round0"]["theta_step1"][17] ],
			["Rotate "+theta.labels[4], KECCAK.data["absorb_round0"]["theta_step2"][4]],
			[theta.labels[2]+" XOR "+theta.labels[4],  KECCAK.data["absorb_round0"]["theta_step2"][5]],
			[theta.labelprimes[3],  KECCAK.data["absorb_round0"]["theta_step2"][5]],
		];

		var t = new table();
		this.object.push(t.createTable(
			this.context,
			5*this.spaceX+2*this.padding,
			0.5*this.spaceY,
			tableInput
		));
		var str=new string();
			
		this.object.push(str.createString(
				this.context,
				5*this.spaceX+2*this.padding,
				245,
				"sans-serif, serif",
				24,
				"#000000",
				1,
				"Bit Value Table"
		));
		theta.sortedObject = theta.object;
		this.currentTimeout.push(new Timer(function(){
			
			console.log("Object splice"+theta.object.length);
			if(theta.currentPhase != 15)
				return;
			
			theta.targetCounter = 1;
				theta.object[0].moveTo(theta.object[0].pos.x,theta.object[0].pos.y+40,1.5,theta.objectHitTarget);
				this.message="";
		},3000*this.speedMultiplier));
	}
	
	this.step17=function(){ //torot C'
	this.message="C' = (C-1) XOR (Rot(C+1)), where C-1 is B and C+1 is D";
		this.m_dialog.setMessage(this.context, this.message);
		theta.storedraw3(2);
		theta.storedraw2();
		var tableInput = [
			[theta.labels[3], KECCAK.data["absorb_round0"]["theta_step1"][11]],
			[theta.labels[0],KECCAK.data["absorb_round0"]["theta_step1"][23] ],
			["Rotate "+theta.labels[0], ""],
			[theta.labels[3]+" XOR "+theta.labels[0],  ""],
			[theta.labelprimes[4],  ""],
		];

		var t = new table();
		this.object.push(t.createTable(
			this.context,
			5*this.spaceX+2*this.padding,
			0.5*this.spaceY,
			tableInput
		));
		var str=new string();
			
		this.object.push(str.createString(
				this.context,
				5*this.spaceX+2*this.padding,
				245,
				"sans-serif, serif",
				24,
				"#000000",
				1,
				"Bit Value Table"
		));
		console.log("Object"+theta.object.length);
		theta.sortedObject = theta.object;
		
		this.currentTimeout.push(new Timer(function(){
					if(theta.currentPhase != 16)
					return;
					theta.targetCounter=3;
					theta.object[1].moveTo(theta.object[1].pos.x,theta.object[1].pos.y+50,1,theta.objectHitTarget);
				
		},1000*this.speedMultiplier));
		this.currentTimeout.push(new Timer(function(){
					if(theta.currentPhase != 16)
					return;
					theta.targetCounter=2;
					theta.object[1].moveTo(theta.object[1].pos.x+687,theta.object[1].pos.y,1,theta.objectHitTarget);
				
				},2000*this.speedMultiplier));
		this.currentTimeout.push(new Timer(function(){
					if(theta.currentPhase != 16)
					return;
					theta.targetCounter=1;
					theta.object[1].moveTo(theta.object[1].pos.x,theta.object[1].pos.y+175,1,theta.objectHitTarget);
					this.message="";
				},3000*this.speedMultiplier));
	}
	
	this.step18=function(){ //toxor
	this.message="C' = (C-1) XOR (Rot(C+1)), where C-1 is B and C+1 is D";
		this.m_dialog.setMessage(this.context, this.message);
		theta.storedraw4(2);
		var dc = new cube();
		theta.object.push(dc.createCube(
			this.context,
			690,
			305,
			20,
			"#FFF000",
			1,
			""
		));
		theta.storedraw2();
		var tableInput = [
			[theta.labels[3], KECCAK.data["absorb_round0"]["theta_step1"][11]],
			[theta.labels[0],KECCAK.data["absorb_round0"]["theta_step1"][23] ],
			["Rotate "+theta.labels[0], KECCAK.data["absorb_round0"]["theta_step2"][7]],
			[theta.labels[3]+" XOR "+theta.labels[0],  ""],
			[theta.labelprimes[4],  ""],
		];

		var t = new table();
		this.object.push(t.createTable(
			this.context,
			5*this.spaceX+2*this.padding,
			0.5*this.spaceY,
			tableInput
		));
		var str=new string();
			
		this.object.push(str.createString(
				this.context,
				5*this.spaceX+2*this.padding,
				245,
				"sans-serif, serif",
				24,
				"#000000",
				1,
				"Bit Value Table"
		));
		console.log("Object"+theta.object.length);
		theta.sortedObject = theta.object;
		this.currentTimeout.push(new Timer(function(){
			
			console.log("Object splice"+theta.object.length);
			if(theta.currentPhase != 17)
				return;
			
			theta.targetCounter = 2;
				theta.object[0].moveTo(theta.object[0].pos.x+158,theta.object[0].pos.y+320,1.5,theta.objectHitTarget);
				theta.object[1].moveTo(theta.object[0].pos.x+158,theta.object[0].pos.y+320,1.3,theta.objectHitTarget);
				this.message="";
		},3000*this.speedMultiplier));
	}
	
	this.step19=function(){ //toprime
	this.message="C' = (C-1) XOR (Rot(C+1)), where C-1 is B and C+1 is D";
		this.m_dialog.setMessage(this.context, this.message);
		var dc = new cube();
		theta.object.push(dc.createCube(
			this.context,
			650,
			400,
			20,
			"#FFF000",
			1,
			""
		));
		theta.storedraw2();
		var tableInput = [
			[theta.labels[3], KECCAK.data["absorb_round0"]["theta_step1"][11]],
			[theta.labels[0],KECCAK.data["absorb_round0"]["theta_step1"][23] ],
			["Rotate "+theta.labels[0], KECCAK.data["absorb_round0"]["theta_step2"][7]],
			[theta.labels[3]+" XOR "+theta.labels[0],  KECCAK.data["absorb_round0"]["theta_step2"][8]],
			[theta.labelprimes[4],  KECCAK.data["absorb_round0"]["theta_step2"][8]],
		];

		var t = new table();
		this.object.push(t.createTable(
			this.context,
			5*this.spaceX+2*this.padding,
			0.5*this.spaceY,
			tableInput
		));
		var str=new string();
			
		this.object.push(str.createString(
				this.context,
				5*this.spaceX+2*this.padding,
				245,
				"sans-serif, serif",
				24,
				"#000000",
				1,
				"Bit Value Table"
		));
		theta.sortedObject = theta.object;
		this.currentTimeout.push(new Timer(function(){
			
			console.log("Object splice"+theta.object.length);
			if(theta.currentPhase != 18)
				return;
			
			theta.targetCounter = 1;
				theta.object[0].moveTo(theta.object[0].pos.x,theta.object[0].pos.y+40,1.5,theta.objectHitTarget);
				this.message="";
		},3000*this.speedMultiplier));
	}
	
	this.step20=function(){ //torot D'
	this.message="D' = (D-1) XOR (Rot(D+1)), where D-1 is C and D+1 is E";
		this.m_dialog.setMessage(this.context, this.message);
		theta.storedraw3(3);
		theta.storedraw2();
		var tableInput = [
			[theta.labels[1], KECCAK.data["absorb_round0"]["theta_step1"][29]],
			[theta.labels[4],KECCAK.data["absorb_round0"]["theta_step1"][17] ],
			["Rotate "+theta.labels[1], ""],
			[theta.labels[1]+" XOR "+theta.labels[4], ""],
			[theta.labelprimes[0], ""],
		];

		var t = new table();
		this.object.push(t.createTable(
			this.context,
			5*this.spaceX+2*this.padding,
			0.5*this.spaceY,
			tableInput
		));
		var str=new string();
			
		this.object.push(str.createString(
				this.context,
				5*this.spaceX+2*this.padding,
				245,
				"sans-serif, serif",
				24,
				"#000000",
				1,
				"Bit Value Table"
		));
		console.log("Object"+theta.object.length);
		theta.sortedObject = theta.object;
		this.currentTimeout.push(new Timer(function(){
		if(theta.currentPhase != 19)
				return;
					theta.targetCounter=1;
					theta.object[1].moveTo(100,300,1.5,theta.objectHitTarget);
				this.message="";
		},3000*this.speedMultiplier));
	}
	
	this.step21=function(){ //toxor 
	this.message="D' = (D-1) XOR (Rot(D+1)), where D-1 is C and D+1 is E";
		this.m_dialog.setMessage(this.context, this.message);
		theta.storedraw4(3);
		var dc = new cube();
		theta.object.push(dc.createCube(
			this.context,
			100,
			300,
			20,
			"#FFF000",
			1,
			""
		));
		theta.storedraw2();
		var tableInput = [
			[theta.labels[1], KECCAK.data["absorb_round0"]["theta_step1"][29]],
			[theta.labels[4],KECCAK.data["absorb_round0"]["theta_step1"][17] ],
			["Rotate "+theta.labels[1], KECCAK.data["absorb_round0"]["theta_step2"][7]],
			[theta.labels[1]+" XOR "+theta.labels[4],  ""],
			[theta.labelprimes[0],  ""],
		];

		var t = new table();
		this.object.push(t.createTable(
			this.context,
			5*this.spaceX+2*this.padding,
			0.5*this.spaceY,
			tableInput
		));
		var str=new string();
			
		this.object.push(str.createString(
				this.context,
				5*this.spaceX+2*this.padding,
				245,
				"sans-serif, serif",
				24,
				"#000000",
				1,
				"Bit Value Table"
		));
		console.log("Object"+theta.object.length);
		theta.sortedObject = theta.object;
		if(theta.currentPhase != 20)
				return;
				this.currentTimeout.push(new Timer(function(){
					if(theta.currentPhase != 20)
					return;
					theta.targetCounter=4;
					theta.object[0].moveTo(theta.object[0].pos.x,theta.object[0].pos.y+95,1,theta.objectHitTarget)
				
		},1000*this.speedMultiplier));
		
		this.currentTimeout.push(new Timer(function(){
					if(theta.currentPhase != 20)
					return;
					theta.targetCounter=3;
					theta.object[0].moveTo(theta.object[0].pos.x-610,theta.object[0].pos.y,1,theta.objectHitTarget);
				
				},2000*this.speedMultiplier));
				
		this.currentTimeout.push(new Timer(function(){
					if(theta.currentPhase != 20)
					return;
					theta.targetCounter=2;
					theta.object[0].moveTo(theta.object[0].pos.x,theta.object[0].pos.y+220,1,theta.objectHitTarget);
					theta.object[1].moveTo(theta.object[0].pos.x,theta.object[0].pos.y+220,1,theta.objectHitTarget);
					this.message="";
				},3000*this.speedMultiplier));
				
	}
	
	this.step22=function(){ //toprime
	this.message="D' = (D-1) XOR (Rot(D+1)), where D-1 is C and D+1 is E";
		this.m_dialog.setMessage(this.context, this.message);
		var dc = new cube();
		theta.object.push(dc.createCube(
			this.context,
			50,
			400,
			20,
			"#FFF000",
			1,
			""
		));
		theta.storedraw2();
		var tableInput = [
			[theta.labels[1], KECCAK.data["absorb_round0"]["theta_step1"][29]],
			[theta.labels[4],KECCAK.data["absorb_round0"]["theta_step1"][17] ],
			["Rotate "+theta.labels[1], KECCAK.data["absorb_round0"]["theta_step2"][7]],
			[theta.labels[1]+" XOR "+theta.labels[4],  KECCAK.data["absorb_round0"]["theta_step2"][10]],
			[theta.labelprimes[0],  KECCAK.data["absorb_round0"]["theta_step2"][11]],
		];

		var t = new table();
		this.object.push(t.createTable(
			this.context,
			5*this.spaceX+2*this.padding,
			0.5*this.spaceY,
			tableInput
		));
		var str=new string();
			
		this.object.push(str.createString(
				this.context,
				5*this.spaceX+2*this.padding,
				245,
				"sans-serif, serif",
				24,
				"#000000",
				1,
				"Bit Value Table"
		));
		theta.sortedObject = theta.object;
		this.currentTimeout.push(new Timer(function(){
			
			console.log("Object splice"+theta.object.length);
			if(theta.currentPhase != 21)
				return;
			
			theta.targetCounter = 1;
				theta.object[0].moveTo(theta.object[0].pos.x,theta.object[0].pos.y+40,1.5,theta.objectHitTarget);
				this.message="";
		},3000*this.speedMultiplier));
	}
	
	this.step23=function(){ //torot E'
	this.message="E' = (E-1) XOR (Rot(E+1)), where E-1 is D and E+1 is A";
		this.m_dialog.setMessage(this.context, this.message);
	
		theta.storedraw3(4);
		theta.storedraw2();
		var tableInput = [
			[theta.labels[0], KECCAK.data["absorb_round0"]["theta_step1"][23]],
			[theta.labels[2],KECCAK.data["absorb_round0"]["theta_step1"][5] ],
			["Rotate "+theta.labels[2], ""],
			[theta.labels[0]+" XOR "+theta.labels[2], ""],
			[theta.labelprimes[1],  ""],
		];

		var t = new table();
		this.object.push(t.createTable(
			this.context,
			5*this.spaceX+2*this.padding,
			0.5*this.spaceY,
			tableInput
		));
		var str=new string();
			
		this.object.push(str.createString(
				this.context,
				5*this.spaceX+2*this.padding,
				245,
				"sans-serif, serif",
				24,
				"#000000",
				1,
				"Bit Value Table"
		));
		console.log("Object"+theta.object.length);
		theta.sortedObject = theta.object;
		this.currentTimeout.push(new Timer(function(){
			
			console.log("Object splice"+theta.object.length);
			if(theta.currentPhase != 22)
				return;
			
			theta.targetCounter = 1;
				theta.object[1].moveTo(250,300,1,theta.objectHitTarget);
				this.message="";
		},3000*this.speedMultiplier));
	}
	
	this.step24=function(){ //toxor
	this.message="E' = (E-1) XOR (Rot(E+1)), where E-1 is D and E+1 is A";
		this.m_dialog.setMessage(this.context, this.message);
		theta.storedraw4(4);
		var dc = new cube();
		theta.object.push(dc.createCube(
			this.context,
			250,
			300,
			20,
			"#FFF000",
			1,
			""
		));
		theta.storedraw2();
		var tableInput = [
			[theta.labels[0], KECCAK.data["absorb_round0"]["theta_step1"][23]],
			[theta.labels[2],KECCAK.data["absorb_round0"]["theta_step1"][5] ],
			["Rotate "+theta.labels[2], KECCAK.data["absorb_round0"]["theta_step2"][13]],
			[theta.labels[0]+" XOR "+theta.labels[2], "" ],
			[theta.labelprimes[1], ""],
		];

		var t = new table();
		this.object.push(t.createTable(
			this.context,
			5*this.spaceX+2*this.padding,
			0.5*this.spaceY,
			tableInput
		));
		var str=new string();
			
		this.object.push(str.createString(
				this.context,
				5*this.spaceX+2*this.padding,
				245,
				"sans-serif, serif",
				24,
				"#000000",
				1,
				"Bit Value Table"
		));
		console.log("Object"+theta.object.length);
		theta.sortedObject = theta.object;
		this.currentTimeout.push(new Timer(function(){
			
			console.log("Object splice"+theta.object.length);
			if(theta.currentPhase != 23)
				return;
			
			theta.targetCounter = 2;
				theta.object[0].moveTo(theta.object[0].pos.x+158,theta.object[0].pos.y+320,1.5,theta.objectHitTarget);
				theta.object[1].moveTo(theta.object[0].pos.x+158,theta.object[0].pos.y+320,1.2,theta.objectHitTarget);
				this.message="";
		},3000*this.speedMultiplier));
	}
	
	this.step25=function(){ //toprime
	this.message="E' = (E-1) XOR (Rot(E+1)), where E-1 is D and E+1 is A.Theta phase 2 ends after XOR and Rotation go through each A,B,C,D,E resulting A',B',C',D',E'";
		this.m_dialog.setMessage(this.context, this.message);
		audio.play("theta5");
		var dc = new cube();
		theta.object.push(dc.createCube(
			this.context,
			200,
			400,
			20,
			"#FFF000",
			1,
			""
		));
		theta.storedraw2();
		var tableInput = [
			[theta.labels[0], KECCAK.data["absorb_round0"]["theta_step1"][23]],
			[theta.labels[2],KECCAK.data["absorb_round0"]["theta_step1"][5] ],
			["Rotate "+theta.labels[2], KECCAK.data["absorb_round0"]["theta_step2"][13]],
			[theta.labels[0]+" XOR "+theta.labels[2],  KECCAK.data["absorb_round0"]["theta_step2"][14]],
			[theta.labelprimes[1],  KECCAK.data["absorb_round0"]["theta_step2"][14]],
		];

		var t = new table();
		this.object.push(t.createTable(
			this.context,
			5*this.spaceX+2*this.padding,
			0.5*this.spaceY,
			tableInput
		));
		var str=new string();
			
		this.object.push(str.createString(
				this.context,
				5*this.spaceX+2*this.padding,
				245,
				"sans-serif, serif",
				24,
				"#000000",
				1,
				"Bit Value Table"
		));
		theta.sortedObject = theta.object;
		this.currentTimeout.push(new Timer(function(){
			
			console.log("Object splice"+theta.object.length);
			if(theta.currentPhase != 24)
				return;
			
			theta.targetCounter = 1;
				theta.object[0].moveTo(theta.object[0].pos.x,theta.object[0].pos.y+40,1.5,theta.objectHitTarget);
				
		},3000*this.speedMultiplier));
	}
	//Theta phase 2 finished
	
	//Theta phase 3 Start	
	this.storedraw5=function(){
		
		for (var i=0; i<5; ++i) {
			var c = new cube();
			this.object.push(c.createCube(
					this.context,
					i * 50+50,
					275,
					50,
					"#8ED6FF",
					1,
					theta.labelprimes[i]
			));
		}
		
		var opxor = new operator();
			this.object.push(opxor.createOperator(
				this.context,
				420,
				280,
				60,
				"#ffd66a",
				1,
				"XOR"
			));
		
		
		
	}
	
	this.step26=function(){
		this.message="Theta phase 3 is all about A',B',C',D',E' XOR back to the State S which is the original state before start round function of permutation";
		this.m_dialog.setMessage(this.context, this.message);
		audio.play("theta6");
		for (var i=0; i<5; ++i) {
			var c = new cube();
			this.object.push(c.createCube(
					this.context,
					25+i * 150,
					450,
					50,
					"#8ED6FF",
					1,
					theta.labelprimes[i]
			));
		}
		theta.sortedObject = theta.object;
		this.currentTimeout.push(new Timer(function(){
			
			console.log("Object splice"+theta.object.length);
			if(theta.currentPhase != 25)
				return;
			
			theta.targetCounter = 5;
				for(var i = 0;i<5;++i){
					
			theta.object[i].moveTo(i * 50+50,275,1,theta.objectHitTarget);
				}
				this.message="";
		},3000*this.speedMultiplier));
		
		
	}
	
	this.step27=function(){ //1
		this.message="Theta phase 3 is all about A',B',C',D',E' XOR back to the State S which is the original state before start round function of permutation";
		this.m_dialog.setMessage(this.context, this.message);
		//audio.play("theta6");
		theta.storedraw1();
		theta.storedraw5();
		
		for (var i=0; i<5; ++i) {
			var c = new cube();
			this.object.push(c.createCube(
				this.context,
					50+50*i,
					275,
					50,
					"#8ED6FF",
					1,
					theta.labelprimes[i]
			));
		}
		theta.sortedObject = theta.object;
		this.currentTimeout.push(new Timer(function(){
			
			console.log("Object splice"+theta.object.length);
			if(theta.currentPhase != 26)
				return;
				theta.object.splice(0,17);
			theta.targetCounter = 5;
				for(var j=0; j<5; ++j){
				theta.object[j].moveTo(theta.object[j].pos.x+465,theta.object[j].pos.y+100,0.5,theta.objectHitTarget);
			}
				this.message="";
		},3000*this.speedMultiplier));
	}
	
	
	this.step28=function(){
		this.message="Theta phase 3 is all about A',B',C',D',E' XOR back to the State S which is the original state before start round function of permutation";
		this.m_dialog.setMessage(this.context, this.message);
		//audio.play("theta6");
		theta.storedraw1();
		theta.storedraw5();
		for(var i=0; i<5; ++i){
			var opxor = new operator();
				this.object.push(opxor.createOperator(
					this.context,
					this.padding+this.startX+50*i,
					this.startY+250-this.padding,
					20,
					"#ffd66a",
					1,
					""
				));
			}
		
		
		console.log("Object"+theta.object.length);
		theta.sortedObject = theta.object;
		
		//theta.object=theta.storedraw1.object;
		
		this.currentTimeout.push(new Timer(function(){
			//theta.object.splice(0,11);
			console.log("Object splice"+theta.object.length);
			if(theta.currentPhase != 27)
				return;
			theta.playAnimationPhase(++theta.currentPhase) ;
			this.message="";
		},3000*this.speedMultiplier));
	}
	
	this.step29=function(){ //2
	this.message="Theta phase 3 is all about A',B',C',D',E' XOR back to the State S which is the original state before start round function of permutation";
		this.m_dialog.setMessage(this.context, this.message);
		//audio.play("theta6");
		theta.storedraw1();
		theta.storedraw5();
		
		for (var i=0; i<5; ++i) {
			var c = new cube();
			this.object.push(c.createCube(
				this.context,
					50+50*i,
					275,
					50,
					"#8ED6FF",
					1,
					theta.labelprimes[i]
			));
		}
		theta.sortedObject = theta.object;
		this.currentTimeout.push(new Timer(function(){
			
			console.log("Object splice"+theta.object.length);
			if(theta.currentPhase != 28)
				return;
				theta.object.splice(0,17);
			theta.targetCounter = 5;
				for(var j=0; j<5; ++j){
				theta.object[j].moveTo(theta.object[j].pos.x+465,theta.object[j].pos.y+50,0.5,theta.objectHitTarget);
			}
			this.message="";
		},3000*this.speedMultiplier));
	}
	
	this.step30=function(){
		this.message="Theta phase 3 is all about A',B',C',D',E' XOR back to the State S which is the original state before start round function of permutation";
		this.m_dialog.setMessage(this.context, this.message);
		//audio.play("theta6");
		theta.storedraw1();
		theta.storedraw5();
		for(var i=0; i<5; ++i){
			var opxor = new operator();
				this.object.push(opxor.createOperator(
					this.context,
					this.padding+this.startX+50*i,
					this.startY+200-this.padding,
					20,
					"#ffd66a",
					1,
					""
				));
			}
		
		
		console.log("Object"+theta.object.length);
		theta.sortedObject = theta.object;
		
		//theta.object=theta.storedraw1.object;
		
		this.currentTimeout.push(new Timer(function(){
			//theta.object.splice(0,11);
			console.log("Object splice"+theta.object.length);
			if(theta.currentPhase != 29)
				return;
			theta.playAnimationPhase(++theta.currentPhase) ;
			this.message="";
		},3000*this.speedMultiplier));
	}
	
	this.step31=function(){ //3
	this.message="Theta phase 3 is all about A',B',C',D',E' XOR back to the State S which is the original state before start round function of permutation";
		this.m_dialog.setMessage(this.context, this.message);
		//audio.play("theta6");
		theta.storedraw1();
		theta.storedraw5();
		
		for (var i=0; i<5; ++i) {
			var c = new cube();
			this.object.push(c.createCube(
				this.context,
					50+50*i,
					275,
					50,
					"#8ED6FF",
					1,
					theta.labelprimes[i]
			));
		}
		theta.sortedObject = theta.object;
		this.currentTimeout.push(new Timer(function(){
			
			console.log("Object splice"+theta.object.length);
			if(theta.currentPhase != 30)
				return;
				theta.object.splice(0,17);
			theta.targetCounter = 5;
				for(var j=0; j<5; ++j){
				theta.object[j].moveTo(theta.object[j].pos.x+465,theta.object[j].pos.y,0.5,theta.objectHitTarget);
			}
			this.message="";
		},3000*this.speedMultiplier));
	}
	
	this.step32=function(){
		this.message="Theta phase 3 is all about A',B',C',D',E' XOR back to the State S which is the original state before start round function of permutation";
		this.m_dialog.setMessage(this.context, this.message);
		//audio.play("theta6");
		theta.storedraw1();
		theta.storedraw5();
		for(var i=0; i<5; ++i){
			var opxor = new operator();
				this.object.push(opxor.createOperator(
					this.context,
					this.padding+this.startX+50*i,
					this.startY+150-this.padding,
					20,
					"#ffd66a",
					1,
					""
				));
			}
		
		
		console.log("Object"+theta.object.length);
		theta.sortedObject = theta.object;
		
		//theta.object=theta.storedraw1.object;
		
		this.currentTimeout.push(new Timer(function(){
			//theta.object.splice(0,11);
			console.log("Object splice"+theta.object.length);
			if(theta.currentPhase != 31)
				return;
			theta.playAnimationPhase(++theta.currentPhase) ;
			this.message="";
		},3000*this.speedMultiplier));
	}
	
	this.step33=function(){ //4
	this.message="Theta phase 3 is all about A',B',C',D',E' XOR back to the State S which is the original state before start round function of permutation";
		this.m_dialog.setMessage(this.context, this.message);
		//audio.play("theta6");
		theta.storedraw1();
		theta.storedraw5();
		
		for (var i=0; i<5; ++i) {
			var c = new cube();
			this.object.push(c.createCube(
				this.context,
					50+50*i,
					275,
					50,
					"#8ED6FF",
					1,
					theta.labelprimes[i]
			));
		}
		theta.sortedObject = theta.object;
		this.currentTimeout.push(new Timer(function(){
			
			console.log("Object splice"+theta.object.length);
			if(theta.currentPhase != 32)
				return;
				theta.object.splice(0,17);
			theta.targetCounter = 5;
				for(var j=0; j<5; ++j){
				theta.object[j].moveTo(theta.object[j].pos.x+465,theta.object[j].pos.y-50,0.5,theta.objectHitTarget);
			}
			this.message="";
		},3000*this.speedMultiplier));
	}
	
	this.step34=function(){
		this.message="Theta phase 3 is all about A',B',C',D',E' XOR back to the State S which is the original state before start round function of permutation";
		this.m_dialog.setMessage(this.context, this.message);
		//audio.play("theta6");
		theta.storedraw1();
		theta.storedraw5();
		for(var i=0; i<5; ++i){
			var opxor = new operator();
				this.object.push(opxor.createOperator(
					this.context,
					this.padding+this.startX+50*i,
					this.startY+100-this.padding,
					20,
					"#ffd66a",
					1,
					""
				));
			}
		
		
		console.log("Object"+theta.object.length);
		theta.sortedObject = theta.object;
		
		//theta.object=theta.storedraw1.object;
		
		this.currentTimeout.push(new Timer(function(){
			//theta.object.splice(0,11);
			console.log("Object splice"+theta.object.length);
			if(theta.currentPhase != 33)
				return;
			theta.playAnimationPhase(++theta.currentPhase) ;
			this.message="";
		},3000*this.speedMultiplier));
	}
	
	this.step35=function(){ //5
	this.message="Theta phase 3 is all about A',B',C',D',E' XOR back to the State S which is the original state before start round function of permutation";
		this.m_dialog.setMessage(this.context, this.message);
		//audio.play("theta6");
		theta.storedraw1();
		theta.storedraw5();
		
		for (var i=0; i<5; ++i) {
			var c = new cube();
			this.object.push(c.createCube(
				this.context,
					50+50*i,
					275,
					50,
					"#8ED6FF",
					1,
					theta.labelprimes[i]
			));
		}
		theta.sortedObject = theta.object;
		this.currentTimeout.push(new Timer(function(){
			
			console.log("Object splice"+theta.object.length);
			if(theta.currentPhase != 34)
				return;
				theta.object.splice(0,17);
			theta.targetCounter = 5;
				for(var j=0; j<5; ++j){
				theta.object[j].moveTo(theta.object[j].pos.x+465,theta.object[j].pos.y-100,0.5,theta.objectHitTarget);
			}
				this.message="";
		},3000*this.speedMultiplier));
	}
	
	this.step36=function(){
		this.message="Theta phase 3 is all about A',B',C',D',E' XOR back to the State S which is the original state before start round function of permutation";
		this.m_dialog.setMessage(this.context, this.message);
		//audio.play("theta6");
		theta.storedraw1();
		theta.storedraw5();
		for(var i=0; i<5; ++i){
			var opxor = new operator();
				this.object.push(opxor.createOperator(
					this.context,
					this.padding+this.startX+50*i,
					this.startY+50-this.padding,
					20,
					"#ffd66a",
					1,
					""
				));
			}
		
		
		console.log("Object"+theta.object.length);
		theta.sortedObject = theta.object;
		
		//theta.object=theta.storedraw1.object;
		
		this.currentTimeout.push(new Timer(function(){
			//theta.object.splice(0,11);
			console.log("Object splice"+theta.object.length);
			if(theta.currentPhase != 35)
				return;
			theta.playAnimationPhase(++theta.currentPhase) ;
			this.message="";
		},3000*this.speedMultiplier));
	}
	
	//Theta phase 3 finished
	
	//Theta show final state
	this.step37=function(){
		this.message="The resulting State S is now ready for the next step of permutation, RHO";
		this.m_dialog.setMessage(this.context, this.message);
		audio.play("theta7");
		var filler = new Array();
				for (var i=0; i<25; ++i) {
					filler.push("");
				}

				// (context, x, y, size, color, alpha, input)
				var skeleton = new slice();
				this.object.push(skeleton.createSlice(
					this.context,
					515,
					175,
					50,
					"#8ED6FF",
					1,
					filler
				));
		theta.sortedObject = zSort5x5(theta.object);
		this.currentTimeout.push(new Timer(function(){
			//theta.object.splice(0,11);
			console.log("Object splice"+theta.object.length);
			if(theta.currentPhase != 36)
				return;
			this.message="";
		},3000*this.speedMultiplier));
	}
	
	this.objectHitTarget = function()
	{
		++theta.hitCounter;
		
		if(theta.hitCounter >= theta.targetCounter)
		{
			theta.hitCounter = 0;
			theta.playAnimationPhase(++theta.currentPhase);
		}
	}
	
	// Animation phases
	this.playAnimationPhase = function(phase, skipAudio)
	{
		if(!skipAudio)
		{
			if(audio.durationLeft() > 0)
			{
				theta.currentTimeout.push(new Timer(theta.playAnimationPhase, (audio.durationLeft() + 2) * 1000, phase));
				return;
			}
		}
		else
		{
			audio.stop();
		}
		//If only its a new step, remove all previously created objects
		if(theta.step_array.indexOf(phase) > -1)
		{
			for(var i=0; i<theta.currentTimeout.length; i++)
			{
				theta.currentTimeout[i].remove();
			}
			
			theta.currentTimeout = new Array();
			theta.object = new Array();
			theta.sortedObject = new Array();
		}
		
		switch(phase)
		{
			case 0:
				theta.step1();//Theta Step I Start
				break;
			case 1:
				theta.step2();
				break;
			case 2:
				theta.step3();
				break;
			case 3:
				theta.step4();
				break;
			case 4:
				theta.step5();
				break;
			case 5:
				theta.step6();
				break;
			case 6:
				theta.step7();
				break;
			case 7:
				theta.step8();
				break;
			case 8:
				theta.step9();
				break;
			case 9:
				theta.step10(); 
				break;
			case 10: 
				theta.step11();
				break;
			case 11:
				theta.step12();
				break;
			case 12:
				theta.step13();
				break;
			case 13:
				theta.step14();
				break;
			case 14:
				theta.step15();
				break;
			case 15:
				theta.step16();
				break;
			case 16:
				theta.step17();
				break;
			case 17:
				theta.step18();
				break;
			case 18:
				theta.step19();
				break;
			case 19:
				theta.step20();
				break;
			case 20:
				theta.step21();
				break;
			case 21:
				theta.step22();
				break;
			case 22:
				theta.step23();
				break;
			case 23:
				theta.step24();
				break;
			case 24:
				theta.step25();
				break;
			case 25:
				theta.step26();
				break;
			case 26:
				theta.step27();
				break;
			case 27:
				theta.step28();
				break;
			case 28:
				theta.step29();
				break;
			case 29:
				theta.step30();
				break;
			case 30:
				theta.step31();
				break;
			case 31:
				theta.step32();
				break;
			case 32:
				theta.step33();
				break;
			case 33:
				theta.step34();
				break;
			case 34:
				theta.step35();
				break;
			case 35:
				theta.step36();
				break;
			case 36:
				theta.step37();
				break;
			
		}
		theta.sortedObject = zSort5x5(theta.object);
	}
}

//theta.init();