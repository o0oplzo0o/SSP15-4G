var KECCAK = new function()
{
	this.data = new Array();
	
	this.BLOCKSIZE = [25, 50, 100, 200, 400, 800, 1600];
	
	// Round Constants
	this.RC = [	"1",
				"32898",
				"9223372036854808714",
				"9223372039002292224",
				"32907",
				"2147483649",
				"9223372039002292353",
				"9223372036854808585",
				"138",
				"136",
				"2147516425",
				"2147483658",
				"2147516555",
				"9223372036854775947",
				"9223372036854808713",
				"9223372036854808579",
				"9223372036854808578",
				"9223372036854775936",
				"32778",
				"9223372039002259466",
				"9223372039002292353",
				"9223372036854808704",
				"2147483649",
				"9223372039002292232"]
			
	// Rotation offsets
	this.r =	[[0,36,3,41,18],
				[1,44,10,45,2],
				[62,6,43,15,61],
				[28,55,25,21,56],
				[27,20,39,8,14]]
		
	this.b;
	this.w;
	this.l;
	this.nr;
	
	this.init = function(b)
	{
		/*
		b: parameter b, must be 25, 50, 100, 200, 400, 800 or 1600 (default value)"""
        */
		
		this.data = new Array();
		this.setB(b);
	};
	
	this.setB = function(b)
	{
		/*
		Set the value of the parameter b (and thus w,l and nr)

        b: parameter b, must be choosen among [25, 50, 100, 200, 400, 800, 1600]
		*/
		
		if(!common.existInArray(b,this.BLOCKSIZE))
		{
			console.error("Invalid block size");
		}
		
		this.b = b;
		this.w = Math.floor(b/25);
		this.l = Math.floor(Math.log2(this.w));
		this.nr = 12+2*this.l;
	};
	
	this.rot = function(x,n)
	{
		/*
		Bitwise rotation (to the left) of n bits considering the \
        string of bits is w bits long
		*/
		
		n = bigInt(n).mod(this.w);
		//return ((x>>(this.w-n))+(x<<n))%(1<<this.w);
		var tempA = bigInt(x).shiftRight(bigInt(this.w).minus(n));
		var tempB = bigInt(x).shiftLeft(n);
		var tempC = tempA.add(tempB);
		var tempC1 = bigInt(1).shiftLeft(this.w);
		var tempD = tempC.mod(tempC1);
		return tempD.toString();
	};
	
	this.fromHexStringToLane = function(str)
	{
		/*
		Convert a string of bytes written in hexadecimal to a lane value
		*/
		
		if((str.length % 2) != 0)
		{
			console.error("Input string should be in Hex")
		}
		
		var temp = "";
		var nrBytes = Math.floor(str.length / 2);
		for(var i=0; i<nrBytes; i++)
		{
			var offset = (nrBytes-i-1)*2;
			temp += str.slice(offset,offset+2);
		}
		
		return bigInt(temp,16).toString();
	};
	
	this.fromLaneToHexString = function(lane)
	{
		/*
		Convert a lane value to a string of bytes written in hexadecimal
		*/
		
		var laneHexBE = bigInt(common.padWith("0",Math.floor(this.w/4))).add(lane).toString(16);
		
		var temp = "";
		var nrBytes = Math.floor(laneHexBE.length / 2);
		for(var i=0; i<nrBytes; i++)
		{
			var offset = (nrBytes-i-1)*2;
			temp += laneHexBE.slice(offset,offset+2);
		}
		
		return temp.toUpperCase();
	};
	
	this.printState = function(state, info)
	{
		/*
		Print on screen the state of the sponge function preceded by \
        string info

        state: state of the sponge function
        info: a string of characters used as identifier
		*/
		
		console.log("Current value of state: " + info);
		
		for(var i=0; i<5; i++)
		{
			var line = [];
			for(var j=0; j<5; j++)
			{
				line.push(common.hex(bigInt(state[j][i])));
			}
			console.log(line);
		}
	};
	
	this.convertStrToTable = function(str)
	{
		/*
		Convert a string of bytes to its 5×5 matrix representation

        string: string of bytes of hex-coded bytes (e.g. '9A2C...')
		*/
		
		if(this.w%8 != 0)
		{
			console.error("w is not a multiple of 8");
		}
		if(str.length != Math.floor((2 * this.b)/8))
		{
			console.error("string can't be divided in 25 blocks of w bits\
            i.e. string must have exactly b bits");
		}
		
		//Convert
		var output = 	[[0,0,0,0,0],
						[0,0,0,0,0],
						[0,0,0,0,0],
						[0,0,0,0,0],
						[0,0,0,0,0]];
						
		for(var i=0; i<5; i++)
		{
			for(var j=0; j<5; j++)
			{
				var offset = Math.floor(2*((5*j+i)*this.w)/8);
				output[i][j] = this.fromHexStringToLane(str.slice(offset,offset+Math.floor((2*this.w/8))));
				
			}
		}
		return output;
	};
	
	this.convertTableToStr = function(table)
	{
		/*
		Convert a 5×5 matrix representation to its string representation
		*/

		if(this.w%8 != 0)
		{
			console.error("w is not a multiple of 8");
		}
		if(table.length != 5 || table[0].length != 5)
		{
			console.error("table must be 5×5");
		}
		
		//Convert
		var output = [];
		for(var i=0; i<5; i++)
		{
			for(var j=0; j<5; j++)
			{
				output[5*j+i] = this.fromLaneToHexString(table[i][j]);
			}
		}
		output = output.join('');
		
		return output.toUpperCase();
	};
	
	this.Round = function(A,RCfixed,index,name)
	{
		/*
		Perform one round of computation as defined in the Keccak-f permutation

        A: current state (5×5 matrix)
        RCfixed: value of round constant to use (integer)
        */
		
		var B = [[0,0,0,0,0],
			    [0,0,0,0,0],
			    [0,0,0,0,0],
			    [0,0,0,0,0],
			    [0,0,0,0,0]];
        var C = [0,0,0,0,0];
        var D = [0,0,0,0,0];
		
		
		this.data[name + "_round" + index]["theta_step1"] = new Array();
		//Theta step Start
		for(var i=0; i<5; i++)
		{
			C[i] = bigInt(A[i][0]).xor(bigInt(A[i][1])).xor(bigInt(A[i][2])).xor(bigInt(A[i][3])).xor(bigInt(A[i][4])).toString();
			this.data[name + "_round" + index]["theta_step1"].push(A[i][0],A[i][1],A[i][2],A[i][3],A[i][4],C[i]);
		}
		
		this.data[name + "_round" + index]["theta_step2"] = new Array();
		for(var i=0; i<5; i++)
		{
			var tempA = bigInt(C[common.mod(i-1,5)]);
			var tempB = this.rot(C[common.mod(i+1,5)],1);
			D[i] = tempA.xor(tempB).toString();
			this.data[name + "_round" + index]["theta_step2"].push(tempA,tempB,D[i]);
		}
		
		this.data[name + "_round" + index]["theta_step3"] = new Array();
		for(var i=0; i<5; i++)
		{
			for(var j=0; j<5; j++)
			{
				this.data[name + "_round" + index]["theta_step3"].push(A[i][j],D[i]);
				A[i][j] = bigInt(A[i][j]).xor(bigInt(D[i])).toString();
				this.data[name + "_round" + index]["theta_step3"].push(A[i][j]);
			}
		}
		//Theta step End
		
		this.data[name + "_round" + index]["rhopi_step1"] = new Array();
		//Rho and Pi steps Start
		for(var i=0; i<5; i++)
		{
			for(var j=0; j<5; j++)
			{
				this.data[name + "_round" + index]["rhopi_step1"].push(A[i][j],this.r[i][j]);
				B[j][common.mod(2*i+3*j,5)] = this.rot(A[i][j], this.r[i][j]);
				this.data[name + "_round" + index]["rhopi_step1"].push(B[j][common.mod(2*i+3*j,5)]);
			}
		}
		//Rho and Pi steps End
		
		this.data[name + "_round" + index]["chi_step1"] = new Array();
		//Chi step Start
		for(var i=0; i<5; i++)
		{
			for(var j=0; j<5; j++)
			{
				var tempA = bigInt(B[i][j]);
				var tempB = bigInt(B[common.mod(i+1,5)][j]).add(1).multiply(-1);
				var tempC = bigInt(B[common.mod(i+2,5)][j]);
				var tempD = tempB.and(tempC);
				var tempE = tempA.xor(tempD);
				A[i][j] = tempE.toString();
				this.data[name + "_round" + index]["chi_step1"].push(
					B[i][j],
					tempB.toString(),
					tempD.toString(),
					A[i][j]
				);
			}
		}
		//Chi step End
		
		this.data[name + "_round" + index]["iota_step1"] = new Array();
		//Iota step Start
		this.data[name + "_round" + index]["iota_step1"].push(A[0][0],RCfixed);
		A[0][0] = bigInt(A[0][0]).xor(RCfixed).toString();
		this.data[name + "_round" + index]["iota_step1"].push(A[0][0]);
		//Iota step End
		
		return A;		
	};
	
	this.KeccakF = function(A, verbose, name)
	{
		/*
		Perform Keccak-f function on the state A

        A: 5×5 matrix containing the state
        verbose: a boolean flag activating the printing of intermediate computations
        */
		
		if(verbose === undefined)
		{
			verbose = false;
		}
		
		if(verbose)
		{
			this.printState(A,"Before first round");
		}
		
		for(var i=0; i<this.nr; i++)
		{
			this.data[name + "_round" + i] = new Array();
			A = this.Round(A,bigInt(this.RC[i]).mod((bigInt(1).shiftLeft(this.w))),i, name);
			if(verbose)
			{
				this.printState(A, " : Status end of round " + (i+1) + "/" + this.nr);
			}
		}
		
		return A;
	};
	
	this.appendBit = function(M,bit)
	{
		/*
		Append a bit to M

        M: message pair (length in bits, string of hex characters ('9AFC...'))
        bit: 0 or 1
        Example: appendBit([7, '30'],1) returns [8,'B0']
        Example: appendBit([8, '30'],1) returns [9,'3001']
        */
		var my_string_length = M[0];
		var my_string = M[1];
		
		if(my_string_length > ((Math.floor(my_string.length)/2)*8))
		{
			console.error("the string is too short to contain the number of bits announced");
		}
		
		if((my_string_length%8) == 0)
		{
			my_string = my_string.slice(0,Math.floor(my_string_length/8) * 2) + common.hexify(bit);
			my_string_length = my_string_length + 1;
		}
		else
		{
			var nr_bytes_filled = Math.floor(my_string_length/8);
			var nbr_bits_filled = my_string_length % 8;
			var my_byte = parseInt(my_string.slice(nr_bytes_filled*2,nr_bytes_filled*2+2),16);
			my_byte = my_byte + bit*(Math.pow(2,nbr_bits_filled));
			my_byte = common.hexify(my_byte);
			my_string = my_string.slice(0,nr_bytes_filled*2) + my_byte;
			my_string_length = my_string_length + 1;
		}
		return [my_string_length, my_string];
	};
	
	this.appendDelimitedSuffix = function(M,suffix)
	{
		/*
		Append a delimited suffix to M

        M: message pair (length in bits, string of hex characters ('9AFC...'))
        suffix: integer coding a string of 0 to 7 bits, from LSB to MSB, delimited by a bit 1 at MSB
        Example: appendDelimitedSuffix([3, '00'], 0x06) returns [5, '10']
        Example: appendDelimitedSuffix([3, '00'], 0x1F) returns [7, '78']
        Example: appendDelimitedSuffix([8, '00'], 0x06) returns [10, '0002']
        Example: appendDelimitedSuffix([8, '00'], 0x1F) returns [12, '000F']
        */
		
		if(suffix == 0)
		{
			console.error("the delimited suffix must not be zero");
		}
		
		while(suffix != 1)
		{
			M = this.appendBit(M, suffix%2);
			suffix = Math.floor(suffix/2);
		}
		
		return M;
	};
	
	this.delimitedSuffixInBinary = function(delimitedSuffix)
	{
		var binary = "";
		while(delimitedSuffix != 1)
		{
			binary = binary + ("%d" % (delimitedSuffix%2));
			delimitedSuffix = delimitedSuffix/2;
		}
		
		return binary;
	};
	
	this.pad10star1= function(M,n)
	{
		/*
		Pad M with the pad10*1 padding rule to reach a length multiple of r bits

        M: message pair (length in bits, string of hex characters ('9AFC...')
        n: length in bits (must be a multiple of 8)
        Example: pad10star1([60, 'BA594E0FB9EBBD03'],8) returns 'BA594E0FB9EBBD93'
        */
		
		var my_string_length = M[0];
		var my_string = M[1];
		
		if(n%8!=0)
		{
			console.error("n must be a multiple of 8");
		}
		
		if(my_string.length % 2 != 0)
		{
			console.error("there must be an even number of digits");
		}
		
		if(my_string_length > Math.floor(my_string.length / 2) * 8)
		{
			console.error("the string is too short to contain the number of bits announced");
		}
		
		var nr_bytes_filled = Math.floor(my_string_length/8);
		var nbr_bits_filled = my_string_length%8;
		var l = my_string_length % n;
		if((n-8) <= 1 && 1 <= (n-2))
		{
			if(nbr_bits_filled == 0)
			{
				my_byte = 0;
			}
			else
			{
				my_byte = bigInt(my_string.slice(nr_bytes_filled*2,nr_bytes_filled*2+2),16);
			}
			
			my_byte = my_byte.add(Math.pow(2,nbr_bits_filled)).add(Math.pow(2,7)).toString();
			my_byte = common.hexify(my_byte);
			my_string = my_string.slice(0,nr_bytes_filled*2) + my_byte;
		}
		else
		{
			if(nbr_bits_filled == 0)
			{
				my_byte = 0;
			}
			else
			{
				my_byte = bigInt(my_string.slice(nr_bytes_filled*2,nr_bytes_filled*2+2),16);
			}
			
			my_byte = my_byte.add(Math.pow(2,nbr_bits_filled));
			my_byte = common.hexify(my_byte);
			my_string = my_string.slice(0,nr_bytes_filled*2) + my_byte;
			
			while(Math.floor((8*my_string.length)/2) % n < (n-8))
			{
				my_string = my_string + "00";
			}

			my_string = my_string + "80";
		}
		
		return my_string;
	};
	
	this.Keccak = function(M, r, c, suffix, n, verbose)
	{
		/*
		Compute the Keccak[r,c,d] sponge function on message M

        M: message pair (length in bits, string of hex characters ('9AFC...')
        r: (SHA3-224 - 1152), (SHA3-256 - 1088), (SHA3-384 - 832), (SHA3-512 - 576), (SHAKE128 - 1344), (SHAKE256 - 1088)
        c: capacity in bits (default: 576)
        suffix: the delimited suffix to append to all inputs (0x01 means none, 0x06 for SHA3-* and 0x1F for SHAKE*)
        n: length of output in bits (default: 1024),
        verbose: print the details of computations(default:False)
		*/
		
		if(r === undefined)
		{
			r = 1024;
		}
		if(c === undefined)
		{
			c = 576;
		}
		if(suffix === undefined)
		{
			suffix = 0x01;
		}
		if(n === undefined)
		{
			n = 1024;
		}
		if(verbose === undefined)
		{
			verbose = false;
		}
		
		//Check the inputs
		if(r<0 || (r%8!=0))
		{
			console.error("r must be a multiple of 8 in this implementation");
		}
		if(n%8 != 0)
		{
			console.error("outputLength must be a multiple of 8");
		}
		
		this.setB(r+c);
		
		if(verbose)
		{
			console.log("Create a Keccak[r=" + r + ", c=" + c + "] function with " + suffix + " suffix");
		}
		
		//Compute lane length (in bits)
		w = Math.floor((r+c)/25);
		
		//Initialisation of state
		var S = 	[[0,0,0,0,0],
					[0,0,0,0,0],
					[0,0,0,0,0],
					[0,0,0,0,0],
					[0,0,0,0,0]];
					
		this.data["init"] = new Array();
		this.data["init"]["step1"] = new Array();
		this.data["init"]["step1"].push(common.hex2string(M[1]),M,suffix);
		
		//Appending the suffix
		M = this.appendDelimitedSuffix(M, suffix);
		
		this.data["init"]["step1"].push(M);
		
		if(verbose)
		{
			console.log("After appending the suffix: " + M);
		}
		
		//Padding of messages
		var P = this.pad10star1(M,r);
		this.data["init"]["step1"].push(P);
		
		if(verbose)
		{
			console.log("String ready to be absorbed: " + P + " (will be completed by " + Math.floor(c/8) + " x '00')");
		}
		
		//Absorbing phase
		console.log("Length of P: "+P.length);
		
		for(var i=0; i<Math.floor(Math.floor((P.length*8)/2)/r); i++)
		{
			var Pi = this.convertStrToTable(P.slice(i*(2*Math.floor(r/8)),(i+1)*Math.floor(2*r/8)) + common.padWith("00",Math.floor(c/8)));
			for(var y=0; y<5; y++)
			{
				for(var x=0; x<5; x++)
				{
					S[x][y] = bigInt(S[x][y]).xor(Pi[x][y]).toString();
				}
			}
			S = this.KeccakF(S, verbose, "absorb");
		}
		
		if(verbose)
		{
			console.log("Value after absorption : " + this.convertTableToStr(S));
		}
		
		//Squeezing phase
		var Z = "";
		var outputLength = n;
		while(outputLength > 0)
		{
			var string = this.convertTableToStr(S);
			Z = Z + string.slice(0,Math.floor(r*2/8));
			outputLength -= r;
			if(outputLength > 0)
			{
				S = this.KeccakF(S, verbose, "squeeze");
			}

			this.data["output"] = new Array();
			this.data["output"].push(Z);
			this.data["output"].push(Z.slice(0,Math.floor(2*n/8)));

			// NB: done by block of length r, could have to be cut if outputLength
            //     is not a multiple of r
		}
		
		if(verbose)
		{
			console.log("Value after squeezing : " + this.convertTableToStr(S));
		}
		
		return Z.slice(0,Math.floor(2*n/8));
	};
}