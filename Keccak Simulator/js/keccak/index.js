var index = new function()
{
	this.hashName = "";
	this.hashProperties = {};
	this.isResize = true;
	this.lastScaleValue = 1;
	this.currentStep = null;
	this.isPause = false;
	this.hash_start = false;
	
	this.init = function()
	{
		window.onresize = this.onResized;
	}
	
	this.onResized = function()
	{
		console.log("resized");
		index.isResize = true;
	}
	
	this.goToStep = function(step)
	{
		if(!this.hash_start)
		{
			alert("Submit a string to start hashing!");
			return;
		}
		if(this.isPause)
		{
			this.togglePause();
		}
		
		var parent = document.getElementById("step_tab");
		for(var i=0; i<parent.childNodes.length; i++)
		{
			parent.childNodes[i].className = "KNavin KNavinUnselected";
		}
		if(this.currentStep)
		{
			this.currentStep.stop();
			this.currentStep = null;
		}
		switch(step)
		{
			case "init":
				document.getElementById("tab_init").className = "KNavin KNavinSelected";
				this.currentStep = inputToState;
				break;
			case "absorb":
				document.getElementById("tab_absorb").className = "KNavin KNavinSelected";
				this.currentStep = absorb;
				break;
			case "squeeze":
				document.getElementById("tab_squeeze").className = "KNavin KNavinSelected";
				this.currentStep = squeezing;
				break;
			case "theta":
				document.getElementById("tab_theta").className = "KNavin KNavinSelected";
				this.currentStep = theta;
				break;
			case "rho":
				document.getElementById("tab_rho").className = "KNavin KNavinSelected";
				this.currentStep = rho;
				break;
			case "pi":
				document.getElementById("tab_pi").className = "KNavin KNavinSelected";
				this.currentStep = pi;
				break;
			case "chi":
				document.getElementById("tab_chi").className = "KNavin KNavinSelected";
				this.currentStep = chi;
				break;
			case "iota":
				document.getElementById("tab_iota").className = "KNavin KNavinSelected";
				this.currentStep = iota;
				break;
		}
		
		if(this.currentStep)
			this.currentStep.init();
	}
	
	this.playNext = function()
	{
		if(this.isPause)
		{
			this.togglePause();
		}
		
		var tempPhase = this.currentStep.currentPhase;
		//Default to the last phase
		this.currentStep.currentPhase = this.currentStep.step_array[this.currentStep.step_array.length-1];
		
		for(var i=0; i<this.currentStep.step_array.length; i++)
		{
			//if the next array index value is bigger than current phase, go to next phase
			if(this.currentStep.step_array[i] > tempPhase)
			{
				this.currentStep.currentPhase = this.currentStep.step_array[i];
				break;
			}
		}
		
		this.currentStep.playAnimationPhase(this.currentStep.currentPhase);
		// this.currentStep.currentPhase = Math.min(++this.currentStep.currentPhase,this.currentStep.maxPhase);
		// this.currentStep.playAnimationPhase(this.currentStep.currentPhase);
	}
	
	this.playPrevious = function()
	{
		if(this.isPause)
		{
			this.togglePause();
		}
		
		var tempPhase = this.currentStep.currentPhase;
		//Default to the last phase
		this.currentStep.currentPhase = this.currentStep.step_array[0];
		
		for(var i=this.currentStep.step_array.length-1; i>=0; i--)
		{
			//if the next array index value is bigger than current phase, go to next phase
			if(this.currentStep.step_array[i] < tempPhase)
			{
				this.currentStep.currentPhase = this.currentStep.step_array[i];
				break;
			}
		}
		
		console.log(this.currentStep.currentPhase);
		this.currentStep.playAnimationPhase(this.currentStep.currentPhase);
		
		// this.currentStep.currentPhase = Math.max(--this.currentStep.currentPhase,0);
		// this.currentStep.playAnimationPhase(this.currentStep.currentPhase);
	}
	
	this.togglePause = function()
	{
		this.isPause = !this.isPause;
		document.getElementById("pausebutton").src = this.isPause == true ? "image/Unpause.png" : "image/Pause.png";
		//this.currentStep.togglePause(this.isPause);
		if(this.isPause)
		{
			//Stop main update
			// clearInterval(this.currentStep.refresh);
			// //Stop objects update
			// for(var i=0; i<this.currentStep.object.length; i++)
			// {
				// this.currentStep.object[i].pause();
			// }
			// for(var i=0; i<this.currentStep.currentTimeout.length; i++)
			// {
				// this.currentStep.currentTimeout[i].pause();
			// }
			
			this.currentStep.pause();
		}
		else
		{
			//reset dt
			time.previousTime = Date.now();
			time.updateTime();
			// //Resume main update
			// this.currentStep.refresh = setInterval(this.currentStep.update,1000/60);
			// //Resume objects update
			// for(var i=0; i<this.currentStep.object.length; i++)
			// {
				// this.currentStep.object[i].resume();
			// }
			
			// for(var i=0; i<this.currentStep.currentTimeout.length; i++)
			// {
				// this.currentStep.currentTimeout[i].resume();
			// }
			this.currentStep.resume();
		}
	}
	
	this.hash = function()
	{
		if(index.hashName == "")
		{
			alert("Select a hash function.");
			return;
		}
		
		var d = document.getElementById("input_text");
		
		var str = d.value;
		var hexStr = common.string2hex(str);
		var hexValue = common.sizeOfHex(hexStr);
		
		var result = KECCAK.Keccak([hexValue,hexStr], index.hashProperties.r,index.hashProperties.c * 2,0x1F,index.hashProperties.n,true);
		
		console.log("Hash result: \n" + result);
		
		var l = document.getElementById("hash_result");
		l.textContent = result;
		
		this.hash_start = true;
		
		this.goToStep("init");
	};
	
	this.hashFunctionChanged = function()
	{
		var s = document.getElementById("hashFunction");
		
		var selectedIndex = s.options[s.selectedIndex].value;
		console.log(selectedIndex);
		switch(parseInt(selectedIndex))
		{
			case 0: //No function choosen
				index.hashName = "";
				index.hashProperties = {};
				break;
			case 1: //SHAKE128,output256
				console.log("SHAKE128, Output256");
				index.hashName = "SHAKE128, Output256";
				index.hashProperties.r = 1344;
				index.hashProperties.c = 128;
				index.hashProperties.n = 256;
				break;
			case 2: //SHAKE256,output512
				console.log("SHAKE256, Output512");
				index.hashName = "SHAKE256, Output512";
				index.hashProperties.r = 1088;
				index.hashProperties.c = 256;
				index.hashProperties.n = 512;
				break;
		}
	};
}
index.init();