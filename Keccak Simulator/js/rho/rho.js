var rho = new function()
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
	
	// input
	this.inputString;
	this.numBlocks;
	
	// animation sets
	this.shiftcube = new Array();
	this.Ttexts = new Array();
	this.texts = new Array();
	this.input = new Array();
	this.object = new Array();
	this.extra = new Array();
	this.bitcubes = new Array();
	this.data = new Array();
	this.rhophidata = new Array();
	this.temp = new Array();
	
	this.step_array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100];

	// animation loop
	this.refresh;

	// display metrics
	this.padding = 25;
	this.spaceX = 150;
	this.spaceY = 500;
	
	
	// animation status
	this.done=false;
	
	this.init = function()
	{
		this.canvas = document.getElementById("keccakCanvas");
		this.context = this.canvas.getContext("2d");
		
		this.currentPhase = 0;
		this.hitCounter = 0;
		this.targetCounter = 0;
		
		this.shiftcube = new Array();
		this.Ttexts = new Array();
		this.texts = new Array();
		this.input = new Array();
		this.object = new Array();
		this.extra = new Array();
		this.bitcubes = new Array();
		this.data = new Array();
		this.rhophidata = new Array();
		this.temp = new Array();
		
		this.m_dialog = new dialog();
		this.m_dialog.createDialog(this.context,this.message);
		 
		// start by showing state
		this.playAnimationPhase(this.currentPhase); // Play 0

		// 60 fps update loop
		this.update();
		this.refresh = setInterval(this.update,1000/60);
	}
	
	//ERIC: Called when user skip this rho steps,
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
		
		this.shiftcube = new Array();
		this.Ttexts = new Array();
		this.texts = new Array();
		this.input = new Array();
		this.object = new Array();
		this.extra = new Array();
		this.bitcubes = new Array();
		this.data = new Array();
		this.rhophidata = new Array();
		this.temp = new Array();
		this.currentTimeout = new Array();
		
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	}
	
	//ERIC: Handle pause here
	// For each of the objects created, call pause to stop their updates (movement, etc)
	this.pause = function()
	{
		clearInterval(this.refresh);
		
		var len = Math.max(this.shiftcube.length,this.Ttexts.length,this.texts.length,this.input.length,
							this.object.length,this.extra.length,this.bitcubes.length,this.data.length,
							this.currentTimeout.length);
		for(var i=0; i<len; i++)
		{
			if(this.shiftcube[i])
				this.shiftcube[i].pause();
			if(this.Ttexts[i])
				this.Ttexts[i].pause();
			if(this.texts[i])
				this.texts[i].pause();
			if(this.input[i])
				this.input[i].pause();		
			if(this.object[i])
				this.object[i].pause();
			if(this.extra[i])
				this.extra[i].pause();
			if(this.bitcubes[i])
				this.bitcubes[i].pause();
			if(this.data[i])
				this.data[i].pause();		
			if(this.currentTimeout[i])
				this.currentTimeout[i].pause();			
		}
	}
	
	//ERIC: Handle resume here
	// For each of the objects created, call resume to continue their updates (movement, etc)
	this.resume = function()
	{
		this.refresh = setInterval(this.update,1000/60);
		
		var len = Math.max(this.shiftcube.length,this.Ttexts.length,this.texts.length,this.input.length,
							this.object.length,this.extra.length,this.bitcubes.length,this.data.length,
							this.currentTimeout.length);
		for(var i=0; i<len; i++)
		{
			if(this.shiftcube[i])
				this.shiftcube[i].resume();
			if(this.Ttexts[i])
				this.Ttexts[i].resume();
			if(this.texts[i])
				this.texts[i].resume();
			if(this.input[i])
				this.input[i].resume();		
			if(this.object[i])
				this.object[i].resume();
			if(this.extra[i])
				this.extra[i].resume();
			if(this.bitcubes[i])
				this.bitcubes[i].resume();
			if(this.data[i])
				this.data[i].resume();	
			if(this.currentTimeout[i])
				this.currentTimeout[i].resume();		
		}
	}
	
	// loop
	this.update = function()
	{
		time.updateTime();
		
		rho_render.update();
		
	}
	
	this.step1 = function()
	{
		this.message = "Rho performs offsets base on the slice of cube and the fixed offset table shown";
		this.m_dialog.setMessage(this.context,this.message);
		
		var s = new slice(); //draws slice
		var inputt = ["3,2","3,2","3,0","3,4","3,3","4,2","4,1","4,0","4,4","4,3","0,2","0,1","0,0","0,4","0,3","1,2","1,1","1,0","1,4","1,3","2,2","2,1","2,0","2,4","2,3"];
				this.extra.push(s.createSlice(
					this.context,
					115,
					55,
					50,
					"#8ED6FF",
					1,
					inputt
				));
		
		var inputTable = new Array(); // draws table
		for(var i = 0 ; i < 6 ; ++i){
			inputTable[i]=new Array();
		}
		
		inputTable[0][0] =	"      ";
		inputTable[0][1] =	" x = 3";
		inputTable[0][2] =	" x = 4";
		inputTable[0][3] =	" x = 0";
		inputTable[0][4] =	" x = 1";
		inputTable[0][5] =	" x = 2";
		
		inputTable[1][0] =	" y = 2";
		inputTable[1][1] =	"   153";
		inputTable[1][2] =	"   231";
		inputTable[1][3] =	"     3";
		inputTable[1][4] =	"    10";
		inputTable[1][5] =	"   171";
		
		inputTable[2][0] =	" y = 1";
		inputTable[2][1] =	"    55";
		inputTable[2][2] =	"   276";
		inputTable[2][3] =	"    36";
		inputTable[2][4] =	"   300";
		inputTable[2][5] =	"     6";
		
		inputTable[3][0] =	" y = 0";
		inputTable[3][1] =	"    28";
		inputTable[3][2] =	"    91";
		inputTable[3][3] =	"     0";
		inputTable[3][4] =	"     1";
		inputTable[3][5] =	"   190";
		
		inputTable[4][0] =	" y = 4";
		inputTable[4][1] =	"   120";
		inputTable[4][2] =	"    78";
		inputTable[4][3] =	"   210";
		inputTable[4][4] =	"    66";
		inputTable[4][5] =	"   253";
		
		inputTable[5][0] =	" y = 3";
		inputTable[5][1] =	"    21";
		inputTable[5][2] =	"   136";
		inputTable[5][3] =	"   105";
		inputTable[5][4] =	"    45";
		inputTable[5][5] =	"    15";
		
		var t = new table();
		t.fontsize =15;
		t.size = t.getLongestWidth(this.context);
		t.font = "Consolas";
		this.extra.push(t.createTable(
		this.context,
		515,
		115,
		inputTable
		));
		
		this.currentTimeout.push(new Timer(function(){
			if(rho.currentPhase != 0)
				return;
			rho.playAnimationPhase(++rho.currentPhase);
			rho.message = "";
		},3000*this.speedMultiplier));
	}
	
	this.step2 = function(dialog2,cubeNum,ObjNum,PosX,PosY,phaseNum,dataNum)
	{
		this.message = dialog2; //dunno y no show
		this.m_dialog.setMessage(this.context,this.message);
		
		var s = new slice(); //draws slice
		var inputt = ["3,2","3,2","3,0","3,4","3,3","4,2","4,1","4,0","4,4","4,3","0,2","0,1","0,0","0,4","0,3","1,2","1,1","1,0","1,4","1,3","2,2","2,1","2,0","2,4","2,3"];
				this.extra.push(s.createSlice(
					this.context,
					115,
					55,
					50,
					"#8ED6FF",
					0.25,
					inputt
				));
		
		var inputTable = new Array(); // draws table
		for(var i = 0 ; i < 6 ; ++i){
			inputTable[i]=new Array();
		}
		
		inputTable[0][0] =	"      ";
		inputTable[0][1] =	" x = 3";
		inputTable[0][2] =	" x = 4";
		inputTable[0][3] =	" x = 0";
		inputTable[0][4] =	" x = 1";
		inputTable[0][5] =	" x = 2";
		
		inputTable[1][0] =	" y = 2";
		inputTable[1][1] =	"   153";
		inputTable[1][2] =	"   231";
		inputTable[1][3] =	"     3";
		inputTable[1][4] =	"    10";
		inputTable[1][5] =	"   171";
		
		inputTable[2][0] =	" y = 1";
		inputTable[2][1] =	"    55";
		inputTable[2][2] =	"   276";
		inputTable[2][3] =	"    36";
		inputTable[2][4] =	"   300";
		inputTable[2][5] =	"     6";
		
		inputTable[3][0] =	" y = 0";
		inputTable[3][1] =	"    28";
		inputTable[3][2] =	"    91";
		inputTable[3][3] =	"     0";
		inputTable[3][4] =	"     1";
		inputTable[3][5] =	"   190";
		
		inputTable[4][0] =	" y = 4";
		inputTable[4][1] =	"   120";
		inputTable[4][2] =	"    78";
		inputTable[4][3] =	"   210";
		inputTable[4][4] =	"    66";
		inputTable[4][5] =	"   253";
		
		inputTable[5][0] =	" y = 3";
		inputTable[5][1] =	"    21";
		inputTable[5][2] =	"   136";
		inputTable[5][3] =	"   105";
		inputTable[5][4] =	"    45";
		inputTable[5][5] =	"    15";
		
		var t = new table();
		t.fontsize =15;
		t.size = t.getLongestWidth(this.context);
		t.font = "Consolas";
		this.extra.push(t.createTable(
		this.context,
		515,
		115,
		inputTable
		));
		
		var c = new cube();
				this.object.push(c.createCube(
					this.context,
					PosX,
					PosY,
					50,
					"#8ED6FF",
					1,
					cubeNum
				));
		var string1 = KECCAK.data["absorb_round0"]["rhopi_step1"][dataNum];
		
		for(var i=0; i<string1.length;i++)
		{
			this.temp[i] = string1.slice(i,i+1);
		}
		
		var string2 = parseInt(string1, 10).toString(2);
		console.log(string1);
		console.log(string2);
		for(var i=0; i<string2.length;i++)
		{
			this.rhophidata[i] = string2.slice(i,i+1);
		}
		
		this.currentTimeout.push(new Timer(function(){
			if(rho.currentPhase != phaseNum)
				return;
			
		for(var i=0; i<rho.temp.length; i++)
		{
			var c = new cube();
			rho.bitcubes.push(c.createCube(
				rho.context,
				425 + (i*30),
				355,
				30,
				"#FFFFFF",
				1,
				rho.temp[i]
			));	
		}
		
		if(string2.length>22)
		{
			for(var i=0; i<22; i++)//for(var i=0; i<string2.length; i++) cus when number too big there will be too much cubes that it goes out of canvas so limited
			{
				var c = new cube();
				rho.bitcubes.push(c.createCube(
					rho.context,
					425 + (i*30),
					455,
					30,
					"#FFFFFF",
					1,
					rho.rhophidata[i]
				));	
			}
		}
		else
		{
			for(var i=0; i<string2.length; i++)//for(var i=0; i<string2.length; i++) cus when number too big there will be too much cubes that it goes out of canvas so limited
			{
				var c = new cube();
				rho.bitcubes.push(c.createCube(
					rho.context,
					425 + (i*30),
					455,
					30,
					"#FFFFFF",
					1,
					rho.rhophidata[i]
				));	
			}
		}
		
			rho.targetCounter = 1;
			rho.object[ObjNum].moveTo(225,405,0.5,rho.objectHitTarget);
			rho.message = "";
		},3000*this.speedMultiplier));
	}
	
	this.step3 = function(dialog3,cubeNum,numOfZeros,phaseNum,dataNum)
	{
		this.message = dialog3;
		this.m_dialog.setMessage(this.context,this.message);
		
		var offsetV=64;
		
		var s = new slice(); //draws slice
		var inputt = ["3,2","3,2","3,0","3,4","3,3","4,2","4,1","4,0","4,4","4,3","0,2","0,1","0,0","0,4","0,3","1,2","1,1","1,0","1,4","1,3","2,2","2,1","2,0","2,4","2,3"];
				this.extra.push(s.createSlice(
					this.context,
					115,
					55,
					50,
					"#8ED6FF",
					0.25,
					inputt
				));
		
		var inputTable = new Array(); // draws table
		for(var i = 0 ; i < 6 ; ++i){
			inputTable[i]=new Array();
		}
		
		inputTable[0][0] =	"      ";
		inputTable[0][1] =	" x = 3";
		inputTable[0][2] =	" x = 4";
		inputTable[0][3] =	" x = 0";
		inputTable[0][4] =	" x = 1";
		inputTable[0][5] =	" x = 2";
		
		inputTable[1][0] =	" y = 2";
		inputTable[1][1] =	"   153";
		inputTable[1][2] =	"   231";
		inputTable[1][3] =	"     3";
		inputTable[1][4] =	"    10";
		inputTable[1][5] =	"   171";
		
		inputTable[2][0] =	" y = 1";
		inputTable[2][1] =	"    55";
		inputTable[2][2] =	"   276";
		inputTable[2][3] =	"    36";
		inputTable[2][4] =	"   300";
		inputTable[2][5] =	"     6";
		
		inputTable[3][0] =	" y = 0";
		inputTable[3][1] =	"    28";
		inputTable[3][2] =	"    91";
		inputTable[3][3] =	"     0";
		inputTable[3][4] =	"     1";
		inputTable[3][5] =	"   190";
		
		inputTable[4][0] =	" y = 4";
		inputTable[4][1] =	"   120";
		inputTable[4][2] =	"    78";
		inputTable[4][3] =	"   210";
		inputTable[4][4] =	"    66";
		inputTable[4][5] =	"   253";
		
		inputTable[5][0] =	" y = 3";
		inputTable[5][1] =	"    21";
		inputTable[5][2] =	"   136";
		inputTable[5][3] =	"   105";
		inputTable[5][4] =	"    45";
		inputTable[5][5] =	"    15";
		
		var t = new table();
		t.fontsize =15;
		t.size = t.getLongestWidth(this.context);
		t.font = "Consolas";
		this.extra.push(t.createTable(
		this.context,
		515,
		115,
		inputTable
		));
		
		var c = new cube();
				this.object.push(c.createCube(
					this.context,
					225,
					405,
					50,
					"#8ED6FF",
					1,
					cubeNum
				));
		var string1 = KECCAK.data["absorb_round0"]["rhopi_step1"][dataNum];
		
		var string2 = parseInt(string1, 10).toString(2);
		for(var i=0; i<string2.length;i++)
		{
			this.rhophidata[i] = string2.slice(i,i+1);
		}
		if(string2.length>22)
		{
			for(var i=0; i<22; i++)//for(var i=0; i<string2.length; i++) cus when number too big there will be too much cubes that it goes out of canvas so limited
			{
				var c = new cube();
				this.bitcubes.push(c.createCube(
					this.context,
					425 + (i*30),
					455,
					30,
					"#FFFFFF",
					1,
					this.rhophidata[i]
				));	
			}
		}
		else
		{
			for(var i=0; i<string2.length; i++)//for(var i=0; i<string2.length; i++) cus when number too big there will be too much cubes that it goes out of canvas so limited
			{
				var c = new cube();
				this.bitcubes.push(c.createCube(
					this.context,
					425 + (i*30),
					455,
					30,
					"#FFFFFF",
					1,
					this.rhophidata[i]
				));	
			}
		}
		
		var e = new cube();
			this.shiftcube.push(e.createCube(
				this.context,
				300,
				455,
				30,
				"#FFFFFF",
				1,
				numOfZeros
			));	
		var l = new string();
				this.Ttexts.push(l.createString(
				this.context,
				350,
				475,
				"Consolas",
				40,
				"#000000",
				1,
				">>"
				));
		
		this.currentTimeout.push(new Timer(function(){
			if(rho.currentPhase != phaseNum)
				return;
		if(string2.length>22)
		{
			rho.message = "As the binary value is too large the dropping of rear values will not be shown";
			rho.m_dialog.setMessage(rho.context,rho.message);
			rho.playAnimationPhase(++rho.currentPhase);
		}
		else
		{
			if(string2.length>offsetV)
			{
				var j=i+1;
				rho.targetCounter = offsetV;
				for(var i=0;i<offsetV-1;i++)
				{
					rho.bitcubes[string2.length-j].moveTo(425+((string2.length-j)*30),720,0.5,rho.objectHitTarget);
				}
			}
			else if(string2.length<offsetV)
			{
				rho.targetCounter = string2.length;
				
				for(var i=0;i<string2.length;i++)
				{
					var j=i+1;
					rho.bitcubes[string2.length-j].moveTo(425+((string2.length-j)*30),720,0.5,rho.objectHitTarget);
				}
			}
		}
			rho.message = "";
		},3000*this.speedMultiplier));
		
	}
	
	this.step4 = function(dialog4,cubeNum,numOfZeros,phaseNum,dataNum)
	{
		
		this.message = dialog4;
		this.m_dialog.setMessage(this.context,this.message);
		
		var s = new slice(); //draws slice
		var inputt = ["3,2","3,2","3,0","3,4","3,3","4,2","4,1","4,0","4,4","4,3","0,2","0,1","0,0","0,4","0,3","1,2","1,1","1,0","1,4","1,3","2,2","2,1","2,0","2,4","2,3"];
				this.extra.push(s.createSlice(
					this.context,
					115,
					55,
					50,
					"#8ED6FF",
					0.25,
					inputt
				));
		
		var inputTable = new Array(); // draws table
		for(var i = 0 ; i < 6 ; ++i){
			inputTable[i]=new Array();
		}
		
		inputTable[0][0] =	"      ";
		inputTable[0][1] =	" x = 3";
		inputTable[0][2] =	" x = 4";
		inputTable[0][3] =	" x = 0";
		inputTable[0][4] =	" x = 1";
		inputTable[0][5] =	" x = 2";
		
		inputTable[1][0] =	" y = 2";
		inputTable[1][1] =	"   153";
		inputTable[1][2] =	"   231";
		inputTable[1][3] =	"     3";
		inputTable[1][4] =	"    10";
		inputTable[1][5] =	"   171";
		
		inputTable[2][0] =	" y = 1";
		inputTable[2][1] =	"    55";
		inputTable[2][2] =	"   276";
		inputTable[2][3] =	"    36";
		inputTable[2][4] =	"   300";
		inputTable[2][5] =	"     6";
		
		inputTable[3][0] =	" y = 0";
		inputTable[3][1] =	"    28";
		inputTable[3][2] =	"    91";
		inputTable[3][3] =	"     0";
		inputTable[3][4] =	"     1";
		inputTable[3][5] =	"   190";
		
		inputTable[4][0] =	" y = 4";
		inputTable[4][1] =	"   120";
		inputTable[4][2] =	"    78";
		inputTable[4][3] =	"   210";
		inputTable[4][4] =	"    66";
		inputTable[4][5] =	"   253";
		
		inputTable[5][0] =	" y = 3";
		inputTable[5][1] =	"    21";
		inputTable[5][2] =	"   136";
		inputTable[5][3] =	"   105";
		inputTable[5][4] =	"    45";
		inputTable[5][5] =	"    15";
		
		var t = new table();
		t.fontsize =15;
		t.size = t.getLongestWidth(this.context);
		t.font = "Consolas";
		this.extra.push(t.createTable(
		this.context,
		515,
		115,
		inputTable
		));
		
		var c = new cube();
				this.object.push(c.createCube(
					this.context,
					225,
					405,
					50,
					"#8ED6FF",
					1,
					cubeNum
				));
		var string1 = KECCAK.data["absorb_round0"]["rhopi_step1"][dataNum];
		
		var string2 = parseInt(string1, 10).toString(2);
		for(var i=0; i<string2.length;i++)
		{
			this.rhophidata[i] = string2.slice(i,i+1);
		}
		
		for(var i=0; i<string2.length; i++)
		{
			var c = new cube();
			this.bitcubes.push(c.createCube(
				this.context,
				425 + (i*30),
				455,
				30,
				"#FFFFFF",
				1,
				this.rhophidata[i]
			));	
		}
		
		var e = new cube();
			this.shiftcube.push(e.createCube(
				this.context,
				485+(string2.length*30),
				455,
				30,
				"#FFFFFF",
				1,
				numOfZeros //"0x0"
			));	
		var l = new string();
				this.Ttexts.push(l.createString(
				this.context,
				440+(string2.length*30),
				475,
				"Consolas",
				40,
				"#000000",
				1,
				"<<"
				));
		
		this.currentTimeout.push(new Timer(function(){
			if(rho.currentPhase != phaseNum)
				return;
			rho.playAnimationPhase(++rho.currentPhase);
			rho.message = "";
		},3000*this.speedMultiplier));
	}
	
	this.step5 = function(dialog5,cubeNum,ObjNum,PosX,PosY,phaseNum,dataNum) //add the shifted
	{
		this.message = dialog5; //dunno y no show
		this.m_dialog.setMessage(this.context,this.message);
		
		var offsetV=64;
		
		var s = new slice(); //draws slice
		var inputt = ["3,2","3,2","3,0","3,4","3,3","4,2","4,1","4,0","4,4","4,3","0,2","0,1","0,0","0,4","0,3","1,2","1,1","1,0","1,4","1,3","2,2","2,1","2,0","2,4","2,3"];
				this.extra.push(s.createSlice(
					this.context,
					115,
					55,
					50,
					"#8ED6FF",
					0.25,
					inputt
				));
		
		var inputTable = new Array(); // draws table
		for(var i = 0 ; i < 6 ; ++i){
			inputTable[i]=new Array();
		}
		
		inputTable[0][0] =	"      ";
		inputTable[0][1] =	" x = 3";
		inputTable[0][2] =	" x = 4";
		inputTable[0][3] =	" x = 0";
		inputTable[0][4] =	" x = 1";
		inputTable[0][5] =	" x = 2";
		
		inputTable[1][0] =	" y = 2";
		inputTable[1][1] =	"   153";
		inputTable[1][2] =	"   231";
		inputTable[1][3] =	"     3";
		inputTable[1][4] =	"    10";
		inputTable[1][5] =	"   171";
		
		inputTable[2][0] =	" y = 1";
		inputTable[2][1] =	"    55";
		inputTable[2][2] =	"   276";
		inputTable[2][3] =	"    36";
		inputTable[2][4] =	"   300";
		inputTable[2][5] =	"     6";
		
		inputTable[3][0] =	" y = 0";
		inputTable[3][1] =	"    28";
		inputTable[3][2] =	"    91";
		inputTable[3][3] =	"     0";
		inputTable[3][4] =	"     1";
		inputTable[3][5] =	"   190";
		
		inputTable[4][0] =	" y = 4";
		inputTable[4][1] =	"   120";
		inputTable[4][2] =	"    78";
		inputTable[4][3] =	"   210";
		inputTable[4][4] =	"    66";
		inputTable[4][5] =	"   253";
		
		inputTable[5][0] =	" y = 3";
		inputTable[5][1] =	"    21";
		inputTable[5][2] =	"   136";
		inputTable[5][3] =	"   105";
		inputTable[5][4] =	"    45";
		inputTable[5][5] =	"    15";
		
		var t = new table();
		t.fontsize =15;
		t.size = t.getLongestWidth(this.context);
		t.font = "Consolas";
		this.extra.push(t.createTable(
		this.context,
		515,
		115,
		inputTable
		));
		
		var c = new cube();
				this.object.push(c.createCube(
					this.context,
					225,
					405,
					50,
					"#8ED6FF",
					1,
					cubeNum
				));
		var string1 = KECCAK.data["absorb_round0"]["rhopi_step1"][dataNum];
		
		for(var i=0; i<string1.length;i++)
		{
			this.rhophidata[i] = string1.slice(i,i+1);
		}
		
		for(var i=0; i<string1.length; i++)
		{
			var c = new cube();
			this.bitcubes.push(c.createCube(
				this.context,
				425 + (i*30),
				455,
				30,
				"#FFFFFF",
				1,
				this.rhophidata[i]
			));	
		}
		
		
		this.currentTimeout.push(new Timer(function(){
			if(rho.currentPhase != phaseNum)
				return;
			rho.targetCounter = 1;
			rho.object[ObjNum].moveTo(PosX,PosY,0.5,rho.objectHitTarget);
			rho.message = "";
		},3000*this.speedMultiplier));
		
	}
	
	this.stepEND = function()
	{
		this.message = "Rho is now complete";
		this.m_dialog.setMessage(this.context,this.message);
		
		var s = new slice(); //draws slice
		var inputt = ["3,2","3,2","3,0","3,4","3,3","4,2","4,1","4,0","4,4","4,3","0,2","0,1","0,0","0,4","0,3","1,2","1,1","1,0","1,4","1,3","2,2","2,1","2,0","2,4","2,3"];
				this.extra.push(s.createSlice(
					this.context,
					115,
					55,
					50,
					"#8ED6FF",
					1,
					inputt
				));
		
		var inputTable = new Array(); // draws table
		for(var i = 0 ; i < 6 ; ++i){
			inputTable[i]=new Array();
		}
		
		inputTable[0][0] =	"      ";
		inputTable[0][1] =	" x = 3";
		inputTable[0][2] =	" x = 4";
		inputTable[0][3] =	" x = 0";
		inputTable[0][4] =	" x = 1";
		inputTable[0][5] =	" x = 2";
		
		inputTable[1][0] =	" y = 2";
		inputTable[1][1] =	"   153";
		inputTable[1][2] =	"   231";
		inputTable[1][3] =	"     3";
		inputTable[1][4] =	"    10";
		inputTable[1][5] =	"   171";
		
		inputTable[2][0] =	" y = 1";
		inputTable[2][1] =	"    55";
		inputTable[2][2] =	"   276";
		inputTable[2][3] =	"    36";
		inputTable[2][4] =	"   300";
		inputTable[2][5] =	"     6";
		
		inputTable[3][0] =	" y = 0";
		inputTable[3][1] =	"    28";
		inputTable[3][2] =	"    91";
		inputTable[3][3] =	"     0";
		inputTable[3][4] =	"     1";
		inputTable[3][5] =	"   190";
		
		inputTable[4][0] =	" y = 4";
		inputTable[4][1] =	"   120";
		inputTable[4][2] =	"    78";
		inputTable[4][3] =	"   210";
		inputTable[4][4] =	"    66";
		inputTable[4][5] =	"   253";
		
		inputTable[5][0] =	" y = 3";
		inputTable[5][1] =	"    21";
		inputTable[5][2] =	"   136";
		inputTable[5][3] =	"   105";
		inputTable[5][4] =	"    45";
		inputTable[5][5] =	"    15";
		
		var t = new table();
		t.fontsize =15;
		t.size = t.getLongestWidth(this.context);
		t.font = "Consolas";
		this.extra.push(t.createTable(
		this.context,
		515,
		115,
		inputTable
		));
		
		this.currentTimeout.push(new Timer(function(){
			if(rho.currentPhase != 101)
				return;
			rho.playAnimationPhase(++rho.currentPhase);
			rho.clearall();
			rho.message = "";
		},3000*this.speedMultiplier));
	}
	
	this.clearall = function()
	{
		for(var i=0; i<this.shiftcube.length; ++i)
			{
				this.shiftcube[i] = null;
			}
			this.shiftcube = [];
		for(var i=0; i<this.Ttexts.length; ++i)
			{
				this.Ttexts[i] = null;
			}
			this.Ttexts = [];
		for(var i=0; i<this.texts.length; ++i)
			{
				this.texts[i] = null;
			}
			this.texts = [];
		for(var i=0; i<this.input.length; ++i)
			{
				this.input[i] = null;
			}
			this.input = [];
		for(var i=0; i<this.object.length; ++i)
			{
				this.object[i] = null;
			}
			this.object = [];
		for(var i=0; i<this.extra.length; ++i)
			{
				this.extra[i] = null;
			}
			this.extra = [];
		for(var i=0; i<this.bitcubes.length; ++i)
			{
				this.bitcubes[i] = null;
			}
			this.bitcubes = [];
		for(var i=0; i<this.data.length; ++i)
			{
				this.data[i] = null;
			}
			this.data = [];	
		for(var i=0; i<this.rhophidata.length; ++i)
			{
				this.rhophidata[i] = null;
			}
			this.rhophidata = [];	
		for(var i=0; i<this.temp.length; ++i)
			{
				this.temp[i] = null;
			}
			this.temp = [];	
	}

	this.objectHitTarget = function()
	{
		++rho.hitCounter;
		
		if(rho.hitCounter >= rho.targetCounter)
		{
			rho.hitCounter = 0;
			rho.playAnimationPhase(++rho.currentPhase);
		}
	}

	// Animation phases
	this.playAnimationPhase = function(phase)
	{
		this.clearall();
		
		//ERIC: If only its a new step, remove all previously created objects
		if(this.step_array.indexOf(phase) > -1)
		{
			for(var i=0; i<this.currentTimeout.length; i++)
			{
				this.currentTimeout[i].remove();
			}
			
			this.currentTimeout = new Array();
			
			//ERIC: Please determine what to reinitialise on each critical steps
			this.shiftcube = new Array();
			this.Ttexts = new Array();
			this.texts = new Array();
			this.input = new Array();
			this.object = new Array();
			this.extra = new Array();
			this.bitcubes = new Array();
			this.data = new Array();
			this.rhophidata = new Array();
			this.temp = new Array();
		}
		
		//ERIC: Remove all the reinitialisation after adding in the steps for previous/next
		// and use the "if" above
		this.shiftcube = new Array();
		this.Ttexts = new Array();
		this.texts = new Array();
		this.input = new Array();
		this.object = new Array();
		this.extra = new Array();
		this.bitcubes = new Array();
		this.data = new Array();
		this.rhophidata = new Array();
		this.temp = new Array();
		
		
		switch(phase)
		{
			case 0:
				this.step1();
				
				break;
				//0,0
			case 1:
				this.step2("Now we take cube 0,0 and change it to binary","0,0",0,215,155,1,0);
				
				break;
			case 2:
				this.step3("Now with cube 0,0 value in binary we shift right by width of keccak minus offset modulus 64 thus equals 64-0mod64=64","0,0","0x64",2,0);
			
				break;
			case 3:
				this.step4("Now with cube 0,0 value in binary we shift left by n offset from table x=0,y=0 n= 0mod64 =0 ","0,0","0x0",3,0);
				
				break;
			case 4:
				this.step5("After adding the shift left and the shift right values together in decimal form and modulus it by 1<<64 = 18446744073709551616 we get the value above","0,0",0,215,155,4,2);
				
				break;
				//0,1
			case 5:
				this.step2("Now we take cube 0,1 and change it to binary","0,1",0,215,105,5,3);
				
				break;
			case 6:
				this.step3("Now with cube 0,1 value in binary we shift right by width of keccak minus offset modulus 64 thus equals 64-36mod64=28","0,1","0x28",6,3);
			
				break;
			case 7:
				this.step4("Now with cube 0,1 value in binary we shift left by n offset from table x=0,y=1 n= 36mod64 =36 ","0,1","0x36",7,3);
				
				break;
			case 8:
				this.step5("After adding the shift left and the shift right values together in decimal form and modulus it by 1<<64 = 18446744073709551616 we get the value above","0,1",0,215,105,8,5);
				
				break;
				//0,2
			case 9:
				this.step2("Now we take cube 0,2 and change it to binary","0,2",0,215,55,9,6);
				
				break;
			case 10:
				this.step3("Now with cube 0,2 value in binary we shift right by width of keccak minus offset modulus 64 thus equals 64-3mod64=61","0,2","0x61",10,6);
			
				break;
			case 11:
				this.step4("Now with cube 0,2 value in binary we shift left by n offset from table x=0,y=2 n= 3mod64 =3 ","0,2","0x3",11,6);
				
				break;
			case 12:
				this.step5("After adding the shift left and the shift right values together in decimal form and modulus it by 1<<64 = 18446744073709551616 we get the value above","0,2",0,215,105,12,8);
				
				break;
				//0,3
			case 13:
				this.step2("Now we take cube 0,3 and change it to binary","0,3",0,215,255,13,9);
				
				break;
			case 14:
				this.step3("Now with cube 0,3 value in binary we shift right by width of keccak minus offset modulus 64 thus equals 64-105mod64=23","0,3","0x23",14,9);
			
				break;
			case 15:
				this.step4("Now with cube 0,3 value in binary we shift left by n offset from table x=0,y=3 n= 105mod64 =23 ","0,3","0x23",15,9);
				
				break;
			case 16:
				this.step5("After adding the shift left and the shift right values together in decimal form and modulus it by 1<<64 = 18446744073709551616 we get the value above","0,3",0,215,255,16,11);
				
				break;
				//0,4
			case 17:
				this.step2("Now we take cube 0,4 and change it to binary","0,4",0,215,205,17,12);
				
				break;
			case 18:
				this.step3("Now with cube 0,4 value in binary we shift right by width of keccak minus offset modulus 64 thus equals 64-210mod64=46","0,4","0x46",18,12);
			
				break;
			case 19:
				this.step4("Now with cube 0,4 value in binary we shift left by n offset from table x=0,y=4 n= 210mod64 =18 ","0,4","0x18",19,12);
				
				break;
			case 20:
				this.step5("After adding the shift left and the shift right values together in decimal form and modulus it by 1<<64 = 18446744073709551616 we get the value above","0,4",0,215,205,20,14);
				
				break;
			//new column
				//1,0
			case 21:
				this.step2("Now we take cube 1,0 and change it to binary","1,0",0,265,155,21,15);
				
				break;
			case 22:
				this.step3("Now with cube 1,0 value in binary we shift right by width of keccak minus offset modulus 64 thus equals 64-1mod64=63","1,0","0x63",22,15);
			
				break;
			case 23:
				this.step4("Now with cube 1,0 value in binary we shift left by n offset from table x=1,y=0 n= 1mod64 =1 ","1,0","0x1",23,15);
				
				break;
			case 24:
				this.step5("After adding the shift left and the shift right values together in decimal form and modulus it by 1<<64 = 18446744073709551616 we get the value above","1,0",0,265,155,24,17);
				
				break;
				//1,1
			case 25:
				this.step2("Now we take cube 1,1 and change it to binary","1,1",0,265,105,25,18);
				
				break;
			case 26:
				this.step3("Now with cube 1,1 value in binary we shift right by width of keccak minus offset modulus 64 thus equals 64-300mod64=20","1,1","0x20",26,18);
			
				break;
			case 27:
				this.step4("Now with cube 1,1 value in binary we shift left by n offset from table x=1,y=1 n= 300mod64 =44 ","1,1","0x44",27,18);
				
				break;
			case 28:
				this.step5("After adding the shift left and the shift right values together in decimal form and modulus it by 1<<64 = 18446744073709551616 we get the value above","1,1",0,265,105,28,20);
				
				break;
				//1,2
			case 29:
				this.step2("Now we take cube 1,2 and change it to binary","1,2",0,265,55,29,21);
				
				break;
			case 30:
				this.step3("Now with cube 1,2 value in binary we shift right by width of keccak minus offset modulus 64 thus equals 64-10mod64=54","1,2","0x54",30,21);
			
				break;
			case 31:
				this.step4("Now with cube 1,2 value in binary we shift left by n offset from table x=1,y=2 n= 10mod64 =10 ","1,2","0x10",31,21);
				
				break;
			case 32:
				this.step5("After adding the shift left and the shift right values together in decimal form and modulus it by 1<<64 = 18446744073709551616 we get the value above","1,2",0,265,105,32,23);
				
				break;
				//1,3
			case 33:
				this.step2("Now we take cube 1,3 and change it to binary","1,3",0,265,255,33,24);
				
				break;
			case 34:
				this.step3("Now with cube 1,3 value in binary we shift right by width of keccak minus offset modulus 64 thus equals 64-45mod64=19","1,3","0x19",34,24);
			
				break;
			case 35:
				this.step4("Now with cube 1,3 value in binary we shift left by n offset from table x=1,y=3 n= 45mod64 =45 ","1,3","0x45",35,24);
				
				break;
			case 36:
				this.step5("After adding the shift left and the shift right values together in decimal form and modulus it by 1<<64 = 18446744073709551616 we get the value above","1,3",0,265,255,36,26);
				
				break;
				//1,4
			case 37:
				this.step2("Now we take cube 1,4 and change it to binary","1,4",0,265,205,37,27);
				
				break;
			case 38:
				this.step3("Now with cube 1,4 value in binary we shift right by width of keccak minus offset modulus 64 thus equals 64-66mod64=62","1,4","0x62",38,27);
			
				break;
			case 39:
				this.step4("Now with cube 1,4 value in binary we shift left by n offset from table x=1,y=4 n= 66mod64 =2 ","1,4","0x2",39,27);
				
				break;
			case 40:
				this.step5("After adding the shift left and the shift right values together in decimal form and modulus it by 1<<64 = 18446744073709551616 we get the value above","1,4",0,265,205,40,29);
				
				break;
			//new column
				//2,0
			case 41:
				this.step2("Now we take cube 2,0 and change it to binary","2,0",0,315,155,41,30);
				
				break;
			case 42:
				this.step3("Now with cube 2,0 value in binary we shift right by width of keccak minus offset modulus 64 thus equals 64-190mod64=2","2,0","0x2",42,30);
			
				break;
			case 43:
				this.step4("Now with cube 2,0 value in binary we shift left by n offset from table x=2,y=0 n= 190mod64 =62 ","2,0","0x62",43,30);
				
				break;
			case 44:
				this.step5("After adding the shift left and the shift right values together in decimal form and modulus it by 1<<64 = 18446744073709551616 we get the value above","2,0",0,315,155,44,32);
				
				break;
				//2,1
			case 45:
				this.step2("Now we take cube 2,1 and change it to binary","2,1",0,315,105,45,33);
				
				break;
			case 46:
				this.step3("Now with cube 2,1 value in binary we shift right by width of keccak minus offset modulus 64 thus equals 64-6mod64=58","2,1","0x58",46,33);
			
				break;
			case 47:
				this.step4("Now with cube 2,1 value in binary we shift left by n offset from table x=2,y=1 n= 6mod64 =6 ","2,1","0x6",47,33);
				
				break;
			case 48:
				this.step5("After adding the shift left and the shift right values together in decimal form and modulus it by 1<<64 = 18446744073709551616 we get the value above","2,1",0,315,105,48,35);
				
				break;
				//2,2
			case 49:
				this.step2("Now we take cube 2,2 and change it to binary","2,2",0,315,55,49,36);
				
				break;
			case 50:
				this.step3("Now with cube 2,2 value in binary we shift right by width of keccak minus offset modulus 64 thus equals 64-171mod64=21","2,2","0x21",50,36);
			
				break;
			case 51:
				this.step4("Now with cube 2,2 value in binary we shift left by n offset from table x=2,y=2 n= 171mod64 =43 ","2,2","0x43",51,36);
				
				break;
			case 52:
				this.step5("After adding the shift left and the shift right values together in decimal form and modulus it by 1<<64 = 18446744073709551616 we get the value above","2,2",0,315,105,52,38);
				
				break;
				//2,3
			case 53:
				this.step2("Now we take cube 2,3 and change it to binary","2,3",0,315,255,53,39);
				
				break;
			case 54:
				this.step3("Now with cube 2,3 value in binary we shift right by width of keccak minus offset modulus 64 thus equals 64-15mod64=49","2,3","0x49",54,39);
			
				break;
			case 55:
				this.step4("Now with cube 2,3 value in binary we shift left by n offset from table x=2,y=3 n= 15mod64 =15 ","2,3","0x15",55,39);
				
				break;
			case 56:
				this.step5("After adding the shift left and the shift right values together in decimal form and modulus it by 1<<64 = 18446744073709551616 we get the value above","2,3",0,315,255,56,41);
				
				break;
				//2,4
			case 57:
				this.step2("Now we take cube 2,4 and change it to binary","2,4",0,315,205,57,42);
				
				break;
			case 58:
				this.step3("Now with cube 2,4 value in binary we shift right by width of keccak minus offset modulus 64 thus equals 64-253mod64=3","2,4","0x3",58,42);
			
				break;
			case 59:
				this.step4("Now with cube 2,4 value in binary we shift left by n offset from table x=2,y=4 n= 253mod64 =61 ","2,4","0x61",59,42);
				
				break;
			case 60:
				this.step5("After adding the shift left and the shift right values together in decimal form and modulus it by 1<<64 = 18446744073709551616 we get the value above","2,4",0,315,205,60,44);
				
				break;
			//new column
				//3,0
			case 61:
				this.step2("Now we take cube 3,0 and change it to binary","3,0",0,165,155,61,45);
				
				break;
			case 62:
				this.step3("Now with cube 3,0 value in binary we shift right by width of keccak minus offset modulus 64 thus equals 64-28mod64=36","3,0","0x36",62,45);
			
				break;
			case 63:
				this.step4("Now with cube 3,0 value in binary we shift left by n offset from table x=3,y=0 n= 28mod64 =28 ","3,0","0x28",63,45);
				
				break;
			case 64:
				this.step5("After adding the shift left and the shift right values together in decimal form and modulus it by 1<<64 = 18446744073709551616 we get the value above","3,0",0,165,155,64,47);
				
				break;
				//3,1
			case 65:
				this.step2("Now we take cube 3,1 and change it to binary","3,1",0,165,105,65,48);
				
				break;
			case 66:
				this.step3("Now with cube 3,1 value in binary we shift right by width of keccak minus offset modulus 64 thus equals 64-55mod64=9","3,1","0x9",66,48);
			
				break;
			case 67:
				this.step4("Now with cube 3,1 value in binary we shift left by n offset from table x=3,y=1 n= 55mod64 =44 ","3,1","0x55",67,48);
				
				break;
			case 68:
				this.step5("After adding the shift left and the shift right values together in decimal form and modulus it by 1<<64 = 18446744073709551616 we get the value above","3,1",0,165,105,68,50);
				
				break;
				//3,2
			case 69:
				this.step2("Now we take cube 3,2 and change it to binary","3,2",0,165,55,69,51);
				
				break;
			case 70:
				this.step3("Now with cube 3,2 value in binary we shift right by width of keccak minus offset modulus 64 thus equals 64-153mod64=39","3,2","0x39",70,51);
			
				break;
			case 71:
				this.step4("Now with cube 3,2 value in binary we shift left by n offset from table x=3,y=2 n= 153mod64 =25 ","3,2","0x25",71,51);
				
				break;
			case 72:
				this.step5("After adding the shift left and the shift right values together in decimal form and modulus it by 1<<64 = 18446744073709551616 we get the value above","3,2",0,165,105,72,53);
				
				break;
				//3,3
			case 73:
				this.step2("Now we take cube 3,3 and change it to binary","3,3",0,165,255,73,54);
				
				break;
			case 74:
				this.step3("Now with cube 3,3 value in binary we shift right by width of keccak minus offset modulus 64 thus equals 64-21mod64=43","3,3","0x43",74,54);
			
				break;
			case 75:
				this.step4("Now with cube 3,3 value in binary we shift left by n offset from table x=3,y=3 n= 21mod64 =21 ","3,3","0x21",75,54);
				
				break;
			case 76:
				this.step5("After adding the shift left and the shift right values together in decimal form and modulus it by 1<<64 = 18446744073709551616 we get the value above","3,3",0,165,255,76,56);
				
				break;
				//3,4
			case 77:
				this.step2("Now we take cube 3,4 and change it to binary","3,4",0,165,205,77,57);
				
				break;
			case 78:
				this.step3("Now with cube 3,4 value in binary we shift right by width of keccak minus offset modulus 64 thus equals 64-120mod64=8","3,4","0x8",78,57);
			
				break;
			case 79:
				this.step4("Now with cube 3,4 value in binary we shift left by n offset from table x=3,y=4 n= 120mod64 =56 ","3,4","0x56",79,57);
				
				break;
			case 80:
				this.step5("After adding the shift left and the shift right values together in decimal form and modulus it by 1<<64 = 18446744073709551616 we get the value above","3,4",0,165,205,80,59);
				
				break;
			//new column
				//4,0
			case 81:
				this.step2("Now we take cube 4,0 and change it to binary","4,0",0,115,155,81,60);
				
				break;
			case 82:
				this.step3("Now with cube 4,0 value in binary we shift right by width of keccak minus offset modulus 64 thus equals 64-91mod64=37","4,0","0x37",82,60);
			
				break;
			case 83:
				this.step4("Now with cube 4,0 value in binary we shift left by n offset from table x=4,y=0 n= 91mod64 =27 ","4,0","0x27",83,60);
				
				break;
			case 84:
				this.step5("After adding the shift left and the shift right values together in decimal form and modulus it by 1<<64 = 18446744073709551616 we get the value above","4,0",0,115,155,84,62);
				
				break;
				//4,1
			case 85:
				this.step2("Now we take cube 4,1 and change it to binary","4,1",0,115,105,85,63);
				
				break;
			case 86:
				this.step3("Now with cube 4,1 value in binary we shift right by width of keccak minus offset modulus 64 thus equals 64-276mod64=44","4,1","0x44",86,63);
			
				break;
			case 87:
				this.step4("Now with cube 4,1 value in binary we shift left by n offset from table x=4,y=1 n= 276mod64 =20 ","4,1","0x20",87,63);
				
				break;
			case 88:
				this.step5("After adding the shift left and the shift right values together in decimal form and modulus it by 1<<64 = 18446744073709551616 we get the value above","4,1",0,115,105,88,65);
				
				break;
				//4,2
			case 89:
				this.step2("Now we take cube 4,2 and change it to binary","4,2",0,115,55,89,66);
				
				break;
			case 90:
				this.step3("Now with cube 4,2 value in binary we shift right by width of keccak minus offset modulus 64 thus equals 64-231mod64=25","4,2","0x25",90,66);
			
				break;
			case 91:
				this.step4("Now with cube 4,2 value in binary we shift left by n offset from table x=4,y=2 n= 231mod64 =39 ","4,2","0x39",91,66);
				
				break;
			case 92:
				this.step5("After adding the shift left and the shift right values together in decimal form and modulus it by 1<<64 = 18446744073709551616 we get the value above","4,2",0,115,105,92,68);
				
				break;
				//4,3
			case 93:
				this.step2("Now we take cube 4,3 and change it to binary","4,3",0,115,255,93,69);
				
				break;
			case 94:
				this.step3("Now with cube 4,3 value in binary we shift right by width of keccak minus offset modulus 64 thus equals 64-136mod64=23","4,3","0x56",94,69);
			
				break;
			case 95:
				this.step4("Now with cube 4,3 value in binary we shift left by n offset from table x=4,y=3 n= 136mod64 =8 ","4,3","0x8",95,69);
				
				break;
			case 96:
				this.step5("After adding the shift left and the shift right values together in decimal form and modulus it by 1<<64 = 18446744073709551616 we get the value above","4,3",0,115,255,96,71);
				
				break;
				//4,4
			case 97:
				this.step2("Now we take cube 4,4 and change it to binary","4,4",0,115,205,97,72);
				
				break;
			case 98:
				this.step3("Now with cube 4,4 value in binary we shift right by width of keccak minus offset modulus 64 thus equals 64-78mod64=50","4,4","0x50",98,72);
			
				break;
			case 99:
				this.step4("Now with cube 4,4 value in binary we shift left by n offset from table x=4,y=4 n= 78mod64 =14 ","4,4","0x14",99,72);
				
				break;
			case 100:
				this.step5("After adding the shift left and the shift right values together in decimal form and modulus it by 1<<64 = 18446744073709551616 we get the value above","4,4",0,115,205,100,74);
				
				break;
			case 101:
				this.stepEND();
				
				break;
		}
	}
	
	
	
}

//rho.init(KECCAK.data);