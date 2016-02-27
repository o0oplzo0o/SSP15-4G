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
		
		//Load Audio
		
		//Init
		audio.add("init1", "audio/init/1.mp3");
		audio.add("init2", "audio/init/2.mp3");
		audio.add("init3", "audio/init/3.mp3");
		audio.add("init4", "audio/init/4.mp3");
		audio.add("init5", "audio/init/5.mp3");
		audio.add("init6", "audio/init/6.mp3");
		audio.add("init7", "audio/init/7.mp3");
		audio.add("init8", "audio/init/8.mp3");
		audio.add("init9", "audio/init/9.mp3");
		//Absorb
		audio.add("absorb1", "audio/absorb/1.mp3");
		audio.add("absorb2", "audio/absorb/2.mp3");
		audio.add("absorb3", "audio/absorb/3.mp3");
		audio.add("absorb4", "audio/absorb/4.mp3");
		audio.add("absorb5", "audio/absorb/5.mp3");
		audio.add("absorb6", "audio/absorb/6.mp3");
		//Squeeze
		audio.add("squeeze1", "audio/squeeze/1.mp3");
		audio.add("squeeze2", "audio/squeeze/2.mp3");
		audio.add("squeeze3", "audio/squeeze/3.mp3");
		//Theta
		audio.add("theta1", "audio/theta/1.mp3");
		audio.add("theta2", "audio/theta/2.mp3");
		audio.add("theta3", "audio/theta/3.mp3");
		audio.add("theta4", "audio/theta/4.mp3");
		audio.add("theta5", "audio/theta/5.mp3");
		audio.add("theta6", "audio/theta/6.mp3");
		audio.add("theta7", "audio/theta/7.mp3");
		//Rho
		audio.add("rho1", "audio/rho/1.mp3");
		audio.add("rho2", "audio/rho/2.mp3");
		audio.add("rho3", "audio/rho/3.mp3");
		audio.add("rho4", "audio/rho/4.mp3");
		audio.add("rho5", "audio/rho/5.mp3");
		audio.add("rho6", "audio/rho/5.mp3");
		//Pi
		audio.add("pi1", "audio/pi/1.mp3");
		audio.add("pi2", "audio/pi/2.mp3");
		audio.add("pi3", "audio/pi/3.mp3");
		audio.add("pi4", "audio/pi/4.mp3");
		//Chi
		audio.add("chi1", "audio/chi/1.mp3");
		audio.add("chi2", "audio/chi/2.mp3");
		audio.add("chi3", "audio/chi/3.mp3");
		audio.add("chi4", "audio/chi/4.mp3");
		//Iota
		audio.add("iota1", "audio/iota/1.mp3");
		audio.add("iota2", "audio/iota/2.mp3");
		audio.add("iota3", "audio/iota/3.mp3");
		audio.add("iota4", "audio/iota/4.mp3");
		audio.add("iota5", "audio/iota/5.mp3");
		audio.add("iota6", "audio/iota/6.mp3");
	}
	
	this.onResized = function()
	{
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
		
		audio.stop();
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
		
		if(tempPhase >= this.currentStep.step_array[this.currentStep.step_array.length-1])
			return;
		
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
		
		this.currentStep.playAnimationPhase(this.currentStep.currentPhase, true);
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
		this.currentStep.playAnimationPhase(this.currentStep.currentPhase, true);
		
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
			this.currentStep.pause();
			audio.pause();
		}
		else
		{
			//reset dt
			time.previousTime = Date.now();
			time.updateTime();
			this.currentStep.resume();
			audio.resume();
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
		if(str.length <= 0 || str.length > 40)
		{
			alert("String length should be at least 1 and less than 40");
			return;
		}
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