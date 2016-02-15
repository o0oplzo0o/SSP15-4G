var common = new function()
{
	//Check if a value exist in the array
	this.existInArray = function(val, arr)
	{
		for(var i=0; i<arr.length; i++)
		{
			if(val == arr[i])
			{
				return true;
			}
		}
		return false;
	};
	
	this.string2hex = function(str)
	{
		var result = "";
		
		for(var i=0; i<str.length; i++)
		{
			result += this.hexify(str.charCodeAt(i));
		}
		
		return result;
	}
	
	this.hex2string = function(hex)
	{
		var str = '';
		for (var i=0; i<hex.length; i+=2)
			str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
		return str;
	}
	
	this.sizeOfHex = function(hex)
	{
		if(hex.length % 2 != 0)
		{
			console.error("Invalid hex provided.");
			return null;
		}
		
		return hex.length / 2 * 8;
	}
	
	this.hexify = function(val)
	{
		if(val.toString(16).length <= 1)
		{
			return "0" + val.toString(16).toUpperCase();
		}
		
		return val.toString(16).toUpperCase();
	}
	
	this.padWith = function(str,len)
	{
		var temp = "";
		for(var i=0; i<len; i++)
		{
			temp += str;
		}
		return temp;
	}
	
	this.hex = function(val)
	{
		var temp = "";
		
		if(val < 0)
		{
			temp += "-";
		}
		
		temp += "0x" + val.toString(16);
		
		return temp;
	}
	
	this.mod = function(val, n)
	{
		return ((val%n)+n)%n;
	}
}