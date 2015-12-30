var index = new function()
{
	this.canvas;
	this.context;
	this.object = new Array();
	this.indicate=new Array();
	this.extra = new Array();

	var padding = 50;
	var spaceX = 150;
	var spaceY = 500;
	
	this.init = function()
	{
		this.canvas = document.getElementById("keccakCanvas");
		this.context = this.canvas.getContext("2d");
		this.context.font = "24px arial";
		
		
				
		
		//create 10 cubes
		for (var i = 0; i < 5; ++i)
		{
			var axisY = new Array();
			this.object.push(axisY);

			for (var j = 0; j < 2; ++j)
			{
				var posX = i * spaceX;
				var posY = j * spaceY;
				var a = new cube();
				axisY.push(a.createCube(this.context,padding+posX,padding+posY,50,"#8ED6FF",i+","+j));
			}
		}
		
		

		for(var i=0;i<5;++i) {
			// straight vertical line
			var posX = i * spaceX;
			var vertical = new line();
			this.extra.push(vertical.createLine(this.context,padding+posX+37.5,padding+50,padding+posX+37.5,padding+spaceY-12.5));

			// not group (tonot, tonot2, opnot)
			var x1 = padding+posX+37.5;
			var y1 = padding+50;

			var tonot = new line();
			this.extra.push(tonot.createLine(
				this.context,
				x1,
				y1+(spaceY/4),
				x1+(spaceX/4),
				y1+(spaceY/4)
			));

			var tonot2 = new line();
			this.extra.push(tonot2.createLine(
				this.context,
				x1+(spaceX/4),
				y1+(spaceY/4),
				x1+(spaceX/4),
				y1+(spaceY/4)+100
			));

			var opnot = new operator();
			this.extra.push(opnot.createOperator(
				this.context,
				x1+(spaceX/4),
				y1+(spaceY/4)+50,
				60,
				"#ff5733",
				"NOT"
			));

			// and group (toand, toand2, opand)
			var x2 = x1+(spaceX/4);
			var y2 = y1+(spaceY/4)+100;

			var toand = new line();
			var toand2 = new line();
			if (i < 4) {
				this.extra.push(toand.createLine(
					this.context,
					x2+50,
					y2,
					x2+50,
					y2-150
				));

				this.extra.push(toand2.createLine(
					this.context,
					x2+50,
					y2-150,
					padding+posX+37.5+spaceX,
					y2-150
				));
			} else {
				this.extra.push(toand.createLine(
					this.context,
					x2+50,
					y2,
					x2+50,
					y2-175
				));

				this.extra.push(toand2.createLine(
					this.context,
					x2+50,
					y2-175,
					padding+37.5,
					y2-175
				));
			}

			var opand = new operator();
			this.extra.push(opand.createOperator(
				this.context,
				x2+25,
				y2+12.5,
				60,
				"#6aff75",
				"AND"
			));

			// xor group (toxor, opxor)
			var x3 = x2+spaceX+25;
			var y3 = y2+42.5;

			var toxor = new line();
			if (i < 4) {
				this.extra.push(toxor.createLine(
					this.context,
					x3,
					y3,
					x1,
					y1+(spaceY/4*3)-30
				));
			} else {
				this.extra.push(toxor.createLine(
					this.context,
					padding+37.5+(spaceX/4)+25,
					y3,
					x1,
					y1+(spaceY/4*3)-30
				));
			}

			var opxor = new operator();
			this.extra.push(opxor.createOperator(
				this.context,
				x1,
				y1+(spaceY/4*3),
				60,
				"#ffd66a",
				"XOR"
			));

		}
		/*
		var count=0;
		var interval=setInterval(function(){
			index.context.clearRect(0, 0, index.canvas.width, index.canvas.height);
			//index.drawindicator();
			
			index.moveindicator(count);
			//index.drawindicator();
			count+=1;
			if(count===5){
				clearInterval(interval);
			}
			index.context.clearRect(0, 0, index.canvas.width, index.canvas.height);
		},8000);
		*/
		/*
		function drawoperatorNOT(x,y,sizex,sizey){
				context.beginPath();
				context.fillStyle = "#FF0000";
				context.fillRect(x, y, sizex, sizey);
				context.font="Bold 12px Georgia";
				context.fillStyle = "Black";
				context.fillText("NOT",x+3,y+16);
				context.stroke();
		 }
		function drawoperatorAND(x,y,sizex,sizey){
				context.beginPath();
				context.fillStyle = "#339900";
				context.fillRect(x, y, sizex, sizey);
				context.font="Bold 12px Georgia";
				context.fillStyle = "Black";
				context.fillText("AND",x+3,y+16);
				context.stroke();
		 }
		 function drawoperatorXOR(x,y,sizex,sizey){
			 context.beginPath();
				context.fillStyle = "#FF9900";
				context.fillRect(x, y, sizex, sizey);
				context.font="Bold 12px Georgia";
				context.fillStyle = "Black";
				context.fillText("XOR",x+3,y+16);
				context.stroke();
		 }*/
		
		//60 fps update loop
			this.drawindicator();
		//this.update();
		setInterval(this.update,1000/60);
		//for testing
		//setTimeout(this.moveindicator,2000);
		//setInterval(this.moveindicator,2000);
		
		//setInterval(this.animate,1000);
		//this.animateindicator();
		//this.animateindicator();
		//setInterval(this.animateindicator,8000);
		//for testing
		//setTimeout(this.test2,2000);
	}
	this.test = function()
	{
		
		index.object[0][0].moveTo(index.object[0][0].pos.x,index.object[0][0].pos.y-200,0.1);
	}

	this.test2 = function()
	{
		index.object[0][0].moveTo(index.object[0][0].pos.x+200,index.object[0][0].pos.y,0.1);
	}
	
	
	
	this.drawindicator=function(){
			
		for (var i=0; i<5; ++i){
			var indicator=new Array();
			//this.indicate.push(indicator);
			//for (var j=0; j<1; ++j){
				var posX=i*spaceX+25;
				var posY=spaceY-450;
				var smallcube=new cube();
				this.indicate.push(smallcube.createCube(this.context,padding+posX,padding+posY,20,"#FFF000"," "));
				
				
			//}
		}
		
	}

	/*
	this.animateindicator=function(){
	for(var i=0;i<5;i++){
		this.animate=function(i){
			setTimeout(function(){
				this.moveindicator(i);
				},7000);
		}(i);
	}
	}
	
	var time=0;
	this.animateindicator=function(time){
		var interval= setInterval(function(){
			index.moveindicator(time);
			time += 1;
			if(time === 6){
		
			clearInterval(interval);
					
			}
		
	
		},8000);
		(time);
	}
	*/

	
	
	
	this.moveindicator=function(i){
		
		var k=i;
		//this.drawindicator();
		//var interval=setInterval(function(){
			//index.context.clearRect(0, 0, index.canvas.width, index.canvas.height);
		//this.drawindicator();
		//this.anmate=function(){
		var a=k%5;
		var b= (1+k)%5;
		var c=(2+k)%5;
		
		setTimeout(function(){
			index.indicate[b].moveTo(index.indicate[b].pos.x,index.indicate[b].pos.y+125,0.1);
			index.indicate[c].moveTo(index.indicate[c].pos.x,index.indicate[c].pos.y+80,0.1);
		},1000);
		
		setTimeout(function(){
			index.indicate[b].moveTo(index.indicate[b].pos.x+40,index.indicate[b].pos.y,0.1);
			index.indicate[c].moveTo(index.indicate[c].pos.x-65,index.indicate[c].pos.y,0.1);
		},3000);
	
		setTimeout(function(){
			index.indicate[b].moveTo(index.indicate[b].pos.x,index.indicate[b].pos.y+100,0.1);
			index.indicate[c].moveTo(index.indicate[c].pos.x,index.indicate[c].pos.y+180,0.1);
		},4000);
			
		setTimeout(function(){
			index.indicate[b].moveTo(index.indicate[b].pos.x+25,index.indicate[b].pos.y,0.1);
			index.indicate[c].moveTo(index.indicate[c].pos.x-30,index.indicate[c].pos.y,0.1);
		},5000);
		setTimeout(function(){
			index.indicate[a].moveTo(index.indicate[a].pos.x,index.indicate[a].pos.y+360,0.1);
			index.indicate[b].moveTo(index.indicate[a].pos.x,index.indicate[a].pos.y+360,0.1);
		},6000);
		setTimeout(function(){
			index.indicate[a].moveTo(index.indicate[a].pos.x,index.indicate[a].pos.y+100,0.1);
		},7000);
		
		if(a===3){
			setTimeout(function(){
			index.indicate[b].moveTo(index.indicate[b].pos.x,index.indicate[b].pos.y+125,0.1);
			index.indicate[c].moveTo(index.indicate[c].pos.x,index.indicate[c].pos.y+50,0.1);
		},1000);
		
		setTimeout(function(){
			index.indicate[b].moveTo(index.indicate[b].pos.x+40,index.indicate[b].pos.y,0.1);
			index.indicate[c].moveTo(index.indicate[c].pos.x+720,index.indicate[c].pos.y,0.1);
		},3000);
			
		}
		
		
		
		}
		
		
	

	
	
	//var time=100;
	/*this.moveindicator=function(){
	
		//1	
		setTimeout(function(){
			index.indicate[1].moveTo(index.indicate[1].pos.x,index.indicate[1].pos.y+125,0.1);
		},2000);
		
		setTimeout(function(){
			index.indicate[1].moveTo(index.indicate[1].pos.x+40,index.indicate[1].pos.y,0.1);
		},3000);
		setTimeout(function(){
			index.indicate[1].moveTo(index.indicate[1].pos.x,index.indicate[1].pos.y+100,0.1);
		},4000);
		setTimeout(function(){
			index.indicate[1].moveTo(index.indicate[1].pos.x+25,index.indicate[1].pos.y,0.1);
		},5000);
		//2
		setTimeout(function(){
			index.indicate[2].moveTo(index.indicate[2].pos.x,index.indicate[2].pos.y+80,0.1);
		},2000);
		
		setTimeout(function(){
			index.indicate[2].moveTo(index.indicate[2].pos.x-65,index.indicate[2].pos.y,0.1);
		},3000);
		
		setTimeout(function(){
			index.indicate[2].moveTo(index.indicate[2].pos.x,index.indicate[2].pos.y+165,0.1);
		},4000);
		
		setTimeout(function(){
			index.indicate[2].moveTo(index.indicate[2].pos.x-25,index.indicate[2].pos.y,0.1);
		},5000);
		//0
		setTimeout(function(){
			index.indicate[0].moveTo(index.indicate[0].pos.x,index.indicate[0].pos.y+360,0.1);
		},6000);
		
		setTimeout(function(){
			index.indicate[2].moveTo(index.indicate[0].pos.x,index.indicate[0].pos.y+360,0.1);
		},6000);
		
		setTimeout(function(){
			index.indicate[0].moveTo(index.indicate[0].pos.x,index.indicate[0].pos.y+100,0.1);
		},7000);
	}*/
	

			
		
		
		
		
		//setTimeout(index.indicate[1].moveTo(index.indicate[1].pos.x+50,index.indicate[1].pos.y,0.1),1000);
		//index.indicate[1].moveTo(index.indicate[1].pos.x+50,index.indicate[1].pos.y,0.1);
	
	
	//Game loop
	this.update = function()
	{
		time.updateTime();
		
		render.update();
		
	}
}


index.init();

//index.moveindicator(4);
//index.animatechi();


//this.drawindicator();
index.moveindicator(3);//test

