var index = new function()
{
	this.hashName = "";
	this.hashProperties = {};
	
	this.hash = function()
	{
		if(index.hashName == "")
		{
			alert("Select a hash function.");
			return;
		}
		
		var d = document.getElementById("input_text");
		
		var str = d.value;

		//animation:init
		//inputToState.init(str);
		
		//settimeout for chi
		//setTimeout(function(){
		var hexStr = common.string2hex(str);
		var hexValue = common.sizeOfHex(hexStr);
		
		var result = KECCAK.Keccak([hexValue,hexStr], index.hashProperties.r,index.hashProperties.c * 2,0x1F,index.hashProperties.n,true);
		
		console.log("Hash result: \n" + result);
		
		var l = document.getElementById("hash_result");
		l.textContent = result;
		//},14000);
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