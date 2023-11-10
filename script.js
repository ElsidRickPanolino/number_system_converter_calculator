var activeOperation = 0

var indexOfChangedValue = 0

var outputHold = ""

var xLibrary = ["01", "01234567", "0123456789", "0123456789ABCDEF"]

function splitBinary(binary){
    var whole = ""
    var frac = ""

    var array = [whole,frac]

    var isFraction = false
    for (let i = 0; i < binary.length; i++){
        if (binary[i] == ".")
            isFraction = true
        if (isFraction == false){
            whole += binary[i]
        }
        else{
            if (binary[i] != "."){
                frac += binary[i]
            }
        }
    }

    array[0] = whole
    array[1] = frac

    return array
}

function convertToDecimal(binary){
    let decimal = 0

    split = splitBinary(binary)

    whole = split[0]
    frac = split[1]
    
    for (let i = 0; i < whole.length; i++){
        let j = whole.length-1-i
        if (whole[j] == "1"){
            decimal += 2**i
        }
    }
    for (let i = 0; i < frac.length; i++){
        if (frac[i] == "1"){
            decimal += 1/2**(i+1)
        }
    }

    return decimal
}

function add(addend1, addend2){
    var cbx1 = document.getElementById("cbxinput1").checked
    var cbx2 = document.getElementById("cbxinput2").checked

    var a1 = convertToDecimal(addend1)
    var a2 = convertToDecimal(addend2)    
    if (cbx1 == true){
        if (addend1[0] == "1"){
            a1 = signedBinaryToDecimal(addend1)
        }
    }
    if (cbx2 == true){
        if (addend2[0] == "1"){
            a2 = signedBinaryToDecimal(addend2)
        }
    }
    return a1+a2
}

function subtract(minuend, subtrahend){
    var cbx1 = document.getElementById("cbxinput1").checked
    var cbx2 = document.getElementById("cbxinput2").checked

    var m = convertToDecimal(minuend)
    var s = convertToDecimal(subtrahend)    
    if (cbx1 == true){
        if (minuend[0] == "1"){
            m = signedBinaryToDecimal(minuend)
        }
    }
    if (cbx2 == true){
        if (subtrahend[0] == "1"){
            s = signedBinaryToDecimal(subtrahend)
        }
    }
    return m-s
}
function multiply(multiplier, multiplicand){
    var cbx1 = document.getElementById("cbxinput1").checked
    var cbx2 = document.getElementById("cbxinput2").checked

    var m1 = convertToDecimal(multiplier)
    var m2 = convertToDecimal(multiplicand)    

    if (cbx1 == true){
        if (multiplier[0] == "1"){
            m1 = signedBinaryToDecimal(multiplier)
        }
    }
    if (cbx2 == true){
        if (multiplicand[0] == "1"){
            m2 = signedBinaryToDecimal(multiplicand)
        }
    }

    return m1*m2
}

function divide(dividend, divisor){
    if (divisor != 0){
        var cbx1 = document.getElementById("cbxinput1").checked
        var cbx2 = document.getElementById("cbxinput2").checked
    
        var d1 = convertToDecimal(dividend)
        var d2 = convertToDecimal(divisor)    
        if (cbx1 == true){
            if (dividend[0] == "1"){
                d1 = signedBinaryToDecimal(dividend)
            }
        }
        if (cbx2 == true){
            if (divisor[0] == "1"){
                d2 = signedBinaryToDecimal(divisor)
            }
        }
        return d1/d2
    }
}

function decimalToBinary(decimal, isSigned){

    var whole = divideWORemainder(decimal, 1)
    var frac = decimal%1
    var bin = ""
    while(whole != 0){
        if (whole%2 == 0){
            bin += "0"
            whole = divideWORemainder(whole, 2)
        }
        else{
            bin += "1"
            whole = divideWORemainder(whole,2)
        }
    }
    var sizes = [4,8,16,32]

    var leastSize = 4
    let len = bin.length
    if (isSigned == true){
        len += 1;
    }

    for (let i in sizes){

        if (len <= sizes[i]){
            leastSize = sizes[i]
            break
        }
    }
    while (bin.length < leastSize){
        bin += "0"
    }

    var str = ""
    for (let i in bin){
        str = bin[i] + str
    }

    fracBinary = "."


    if (frac != 0){
        var limitReached = false
        while (frac*2 != 1){
            if (frac*2 > 1){
                fracBinary += "1"
                frac = frac*2-1
            }
            else if(frac*2 < 1){
                fracBinary += "0"
                frac = frac*2
            }

            if (fracBinary.length >= 9){
                limitReached = true
                break
            }
        }
        if (limitReached == false){
            fracBinary += "1"
        }

    }

    if (fracBinary == "."){
        return str
    }
    else{
        return str + fracBinary
    }

}

function twosComplement(binary){
    var complement = ""
    var isFlip = false
    for (let i = binary.length-1; i >= 0; i--){
        if (isFlip == false){
            complement += binary[i]
            if (binary[i] == "1"){
                isFlip = true
            }
        }
        else{
            if (binary[i] == "0"){
                complement += "1"
            }
            else if (binary[i] == "1"){
                complement += "0"
            }
            else if(binary[i] == "."){
                complement += "."
            }
        }
    }

    var str = ""
    for (let i in complement){
        str = complement[i] + str
    }

    return str

}


function divideWORemainder(a,b){
    return (a/b)-((a/b)%1)
}



function selectOperation(index){
    document.getElementById("mainCalculator").style = "display: flex"
    activeOperation = index
    var operations = document.getElementsByClassName("operation_button")
    for (let i = 0; i < operations.length; i++){
        operations[index].style.backgroundColor = "rgba(240,240,240,1)"

        if (i != index){
            operations[i].style.backgroundColor = "#666666"    
        }
    }
    var operationSymbols = ["+", "-", "×", "÷", "2's C"]
    document.getElementById("operation_symbol").innerHTML = operationSymbols[activeOperation]

    if (activeOperation == 4){
        document.getElementById("cbxTxt2").style = "display: none"
        document.getElementById("cbxTxt1").style = "width: 80%"
    }
    else{
        document.getElementById("cbxTxt2").style = ""
        document.getElementById("cbxTxt1").style = "width: 50%"

    }

    document.getElementById("output").value = ""

}


function calculate(){
    
    var input1 = document.getElementById("input1").value

    var input2 = document.getElementById("input2").value

    if (activeOperation == 0){
        let sum = add(input1,input2)
        if (sum < 0){
            let bin = decimalToBinary(sum*-1,true)
            bin = twosComplement(bin)
            document.getElementById("output").value = bin
            document.getElementById("cbx_output").checked = true
            document.getElementById("cbx_output").disabled = true

        }
        else{
            document.getElementById("output").value = decimalToBinary(sum)
            document.getElementById("cbx_output").checked = false
            document.getElementById("cbx_output").disabled = false

        }
    }
    else if (activeOperation == 1){
        let difference = subtract(input1,input2)
        if (difference < 0){
            let bin = decimalToBinary(difference*-1, true)
            bin = twosComplement(bin)
            document.getElementById("output").value = bin
            document.getElementById("cbx_output").checked = true
            document.getElementById("cbx_output").disabled = true

        }
        else{
            document.getElementById("output").value = decimalToBinary(difference)
            document.getElementById("cbx_output").checked = false
            document.getElementById("cbx_output").disabled = false

        }


    }
    else if (activeOperation == 2){
        let product = multiply(input1,input2)
        if (product < 0){
            let bin = decimalToBinary(product*-1, true)
            bin = twosComplement(bin)
            document.getElementById("output").value = bin
            document.getElementById("cbx_output").checked = true
            document.getElementById("cbx_output").disabled = true

        }
        else{
            document.getElementById("output").value = decimalToBinary(product)
            document.getElementById("cbx_output").checked = false
            document.getElementById("cbx_output").disabled = false
        }    
    }
    else if (activeOperation == 3){
        if (input2 != 0){
            let qoutient = divide(input1,input2)
            if (qoutient < 0){
                let bin = decimalToBinary(qoutient*-1, true)
                bin = twosComplement(bin)
                document.getElementById("output").value = bin
                document.getElementById("cbx_output").checked = true
                document.getElementById("cbx_output").disabled = true

            }
            else{
                document.getElementById("output").value = decimalToBinary(qoutient)
                document.getElementById("cbx_output").checked = false
                document.getElementById("cbx_output").disabled = false

            }        }
        else{
            if (input1 == 0){
                alert("The result is indeterminate!\nCannot divide 0 by 0")
            }
            else{
                alert("The result is undefined!\nCannot divide any number by 0")
            }
        }
    }
    else if (activeOperation == 4){
        document.getElementById("output").value = twosComplement(input1)
    }
    outputHold = document.getElementById("output").value

}


function validate(allowedString, input_id, index){
    var str = document.getElementById(input_id).value
    var typed = str[str.length-1]
    var accept = false


    var dotCount = 0


    if (isCharacterALetter(typed) == true){
        document.getElementById(input_id).value = str.toUpperCase()
    }

    for (let i = 0; i < str.length; i++){
        if (str[i] == "."){
            dotCount += 1
        }
    }

    for (let i = 0; i < allowedString.length; i++){
        if (allowedString[i]==typed || ("." == typed && dotCount <= 1)){
            accept = true
            if (str.length > 1 && typed == "-"){
                accept = false
            }
        }
    }


    if (accept == false){
        document.getElementById(input_id).value = str.slice(0,-1)
    }

    indexOfChangedValue = index
    convertButton()
}

function isCharacterALetter(char) {
    return (/[a-zA-Z]/).test(char)
  }

function reverseString(str){
    var out = ""
    for (let i in str){
        out = str[i] + out
    }
    return out
}

  function convertNumberSystemWithFraction(number, fromBase, toBase) {

    var dec = document.getElementById("input_decimal").value

    var a = convertXToDecimal(number, fromBase)
    if (dec[0] == "-"){
        return xComplement(convertToNumberSystem(a,toBase), fromBase)
    }
    else{
        return convertToNumberSystem(a,toBase)
    }
  }


  function convertButton(){
    var bin = document.getElementById("input_binary").value
    var oct = document.getElementById("input_octal").value
    var dec = document.getElementById("input_decimal").value
    var hex = document.getElementById("input_hex").value

    if (dec[0] == "-"){
        dec = dec.substring(1)
    }

    if(indexOfChangedValue == 0){
        if (bin != ""){
            document.getElementById("input_octal").value = convertNumberSystemWithFraction(bin, 2, 8)
            document.getElementById("input_decimal").value = convertXToDecimal(bin, 2)
            document.getElementById("input_hex").value = convertNumberSystemWithFraction(bin, 2, 16)    
        }
        else{
            document.getElementById("input_octal").value = ""
            document.getElementById("input_decimal").value = ""
            document.getElementById("input_hex").value = ""
        }
    }
    else if(indexOfChangedValue == 1){
        if (oct != ""){
            document.getElementById("input_binary").value = convertNumberSystemWithFraction(oct, 8, 2)
            document.getElementById("input_decimal").value = convertXToDecimal(oct, 8)
            document.getElementById("input_hex").value = convertNumberSystemWithFraction(oct, 8, 16)    
        }
        else{
            document.getElementById("input_binary").value = ""
            document.getElementById("input_decimal").value = ""
            document.getElementById("input_hex").value = ""
        }
    }
    else if(indexOfChangedValue == 2){
        if (dec != ""){
            if (document.getElementById("input_decimal").value[0] == "-"){
                document.getElementById("input_binary").value = twosComplement(convertToNumberSystem(dec, 2))
                document.getElementById("input_octal").value = xComplement(convertToNumberSystem(dec, 8),8)
                document.getElementById("input_hex").value = xComplement(convertToNumberSystem(dec, 16),16)        
            }
            else{
                document.getElementById("input_binary").value = convertToNumberSystem(dec, 2)
                document.getElementById("input_octal").value = convertToNumberSystem(dec, 8)
                document.getElementById("input_hex").value = convertToNumberSystem(dec, 16)        
            }
        }
        else{
            document.getElementById("input_binary").value = ""
            document.getElementById("input_octal").value = ""
            document.getElementById("input_hex").value = ""
        }
    }
    else if(indexOfChangedValue == 3){
        if (hex != ""){
            document.getElementById("input_binary").value = convertNumberSystemWithFraction(hex, 16, 2)
            document.getElementById("input_octal").value = convertNumberSystemWithFraction(hex, 16, 8)
            document.getElementById("input_decimal").value = convertXToDecimal(hex, 16)    
        }
        else{
            document.getElementById("input_binary").value = ""
            document.getElementById("input_octal").value = ""
            document.getElementById("input_decimal").value = "" 
        }
    }
  }


  function convertXToDecimal(str, size){
    let decimal = 0

    split = splitBinary(str)

    whole = split[0]
    frac = split[1]
    
    for (let i = 0; i < whole.length; i++){
        let j = whole.length-1-i
        let digit = whole[j]
        if (isCharacterALetter(digit) == true){
            switch(digit) {
                case "A":
                    digit = "10"
                  break;
                case "B":
                    digit = "11"
                  break;
                case "C":
                    digit = "12"
                  break;
                case "D":
                    digit = "13"
                  break;
                case "E":
                    digit = "14"
                  break;
                case "F":
                    digit = "15"
                  break;
                default:
                  break
              }
        }
        decimal += parseInt(digit)*(size**i)
    }
    for (let i = 0; i < frac.length; i++){
        let digit2 = frac[i]
        if (isCharacterALetter(digit2) == true){
            switch(digit2) {
                case "A":
                    digit2 = "10"
                  break;
                case "B":
                    digit2 = "11"
                  break;
                case "C":
                    digit2 = "12"
                  break;
                case "D":
                    digit2 = "13"
                  break;
                case "E":
                    digit2 = "14"
                  break;
                case "F":
                    digit2 = "15"
                  break;
                default:
                  break;
              }
            }
            decimal += parseInt(digit2)*(size**(-1*(i+1)))
        }
  return decimal
}


function convertToNumberSystem(dec, size){
    var whole = divideWORemainder(dec, 1)
    var frac = dec%1

    var output = ""

    var alphabet = "0123456789ABCDEF"

    while(whole !=0){
        output += alphabet[whole%size]
        whole = divideWORemainder(whole, size)
    }

    output = reverseString(output)

    var outputFrac = ""
    if (frac != 0){
        outputFrac += "."

        let f = frac
        let p = f*size
        let r = p%1
        let w = p-r

        if (r == 0){
            outputFrac += alphabet[w]
        }
        else{
            while(r != 0){
                p = f*size
                r = p%1
                w = p-r
                outputFrac += alphabet[w]
                f = r

                if (outputFrac.length >= 9){
                    break
                }
            }
        }

    }

    return output+outputFrac
}

function signedBinaryToDecimal(signedBinary){
    if(signedBinary[0] == "1"){
        return convertToDecimal(twosComplement(signedBinary))*-1
    }
    else{
        return convertToDecimal(signedBinary)
    }
}


function decimaltoSignedBinary(decimal){
    if (decimal < 0){
        decimal = decimal*-1
        return twosComplement(decimalToBinary(decimal, true))
    }
    else{
        return decimalToBinary(decimal)
    }
}

function positiveBinToSigned(bin){
    var sizes = [4,8,16,32]

    var leastSize = 4
    let len = bin.length
    if (bin[0] == "1"){
        len += 1;
    }

    for (let i in sizes){

        if (len <= sizes[i]){
            leastSize = sizes[i]
            break
        }
    }
    
    bin = reverseString(bin)
    while (bin.length < leastSize){
        bin += "0"
    }
    bin = reverseString(bin)
    return bin

}


function ouputCbxController(){

    var cbx = document.getElementById("cbx_output").checked

    if (cbx == true){
        document.getElementById("output").value = positiveBinToSigned(outputHold)
    }
    else{
        document.getElementById("output").value = outputHold
    }
}

function xComplement(num, base){

    var whole = splitBinary(num)[0]
    var frac = splitBinary(num)[1]

    var x = convertToNumberSystem(convertXToDecimal(whole, base)-1, base)

    var len = x.length-1

    if (frac != ""){
        x += "."
        x += frac
    }

    var libraryIndex = 0
    if(base == 2){
        libraryIndex = 0
    }
    else if(base == 8){
        libraryIndex = 1
    }
    else if(base == 16){
        libraryIndex = 3
    }
    library = xLibrary[libraryIndex]

    var sizes = [4,8,16,32]
    var leastSize = 4

    for (let i in sizes){

        if (len+2 <= sizes[i]){
            leastSize = sizes[i]
            break
        }
    
    }

    var wholeLen = whole.length
    x = reverseString(x)
    while (wholeLen < leastSize){
        x += "0"
        wholeLen += 1
    }
    x = reverseString(x)


    var finalstring = ""
    for (let i in x){
        if(x[i] == "."){
            finalstring += "."
        }
        else{
            for(let j in library){
                if(x[i] == library[j]){
                    k = library.length-1-j
                    finalstring += library[k]
                }
            }
        }
    }

    return finalstring
}

