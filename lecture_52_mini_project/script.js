const inputSlider = document.querySelector("[data-lengthSlider]");
const  lengthDisplay = document.querySelector("[data-lengthNumber]");

const passWordDisplay = document.querySelector("[data-passwordDisplay]");
const  copyBtn = document.querySelector("[data-copyBtn]");

const copyMsg = document.querySelector("[data-copyMsg]");
const  uppercaseCheck = document.querySelector("#uppercase");

const lowercaseCheck = document.querySelector("#lowercase");
const  numbersCheck = document.querySelector("#numbers");

const symbolsCheck = document.querySelector("#symbols");
const  indicator = document.querySelector("[data-indicator]");

const generateBtn = document.querySelector(".generateButton");
const  allCheckBox = document.querySelectorAll("input[type=checkbox]");
let password = "";
let passwordLength = 10;
let checkCount = 0;
const symbol = `!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`;
//copy content
// handle slider
//generate password
//setIndicator -color change and shadow change
// getrandominteger(min,max)
//getRandomUppercase
//getRandomLowerCase
//getRandomSymbol
//calculateStrength()
//
handleSlider()
//set passwprd length
function handleSlider(){
      inputSlider.value  = passwordLength ;
      lengthDisplay.innerHTML = passwordLength;
}
function setIndicator(color){
      indicator.style.backgroundColor = color;
      //also add shadow
}
function getRndInteger(min,max){
      return Math.floor(Math.random()*(max-min)) + min;

}
function generateRandomNumber(){
      return getRndInteger(0,9);
}
function generateLowercase(){
      return String.fromCharCode(getRndInteger(97,123));
}
function generateUppercase(){
      return String.fromCharCode(getRndInteger(65,91));
}
function generateSymbol(){
      const radomNum = getRndInteger(0,symbol.length);
      return symbol.charAt(radomNum);
}
function shufflePassword(array){
      //fisher yates method
      for(let i=array.length-1;i>0;i--){
            const j  = Math.floor(Math.random()*(i+1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
      }
      let str = "";
      array.forEach((el) =>{
             str += el;
      });
      return str;
}
function calcStrength(){
      let hasUpper = false;
      let hasLower =false;
      let hasNum = false ; 
      let hasSym = false;
      if(uppercaseCheck.checked) hasUpper = true;
      if(lowercaseCheck.checked) hasLower =  true;
      if (numbersCheck.checked) hasNum = true;
      if (symbolsCheck.checked) hasSym = true;
      if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength >=8){
            setIndicator("#0f0");
      }else if ((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >=6 ){
            setIndicator("#ff0");
      }else{
            setIndicator("#f00");
      }
}
async function copyContent(){
      try{
            //it will return one promise
            await navigator.clipboard.writeText(passWordDisplay.value);
            // jab promise ho tab copied wala text display ho
            copyMsg.innerHTML="copied";
      }
      catch(e){
            copyMsg.innerHTML="failed";
      }
      //to make copy wala spam visible
      copyMsg.classList.add("active");
      setTimeout( ()=>{
            copyMsg.classList.remove("active");
      },2000);
}
function handleCheckBoxChange(){
      checkCount = 0;
      allCheckBox.forEach((checkbox) =>{
            if(checkbox.checked)
                  checkCount++;
      })
      //special condition
      if(passwordLength < checkCount){
            passwordLength = checkCount;
            handleSlider();
      }
}
allCheckBox.forEach((checkbox) =>{
      checkbox.addEventListener('change',handleCheckBoxChange);
})

inputSlider.addEventListener('input',(e) =>{
      passwordLength = e.target.value;
      handleSlider();
});
copyBtn.addEventListener('click',() =>{
      if(passWordDisplay.value)
            copyContent();
});
console.log("call to addEventListener")
generateBtn.addEventListener('click',() =>{
      //if none of checkbox is selected
      if(checkCount == 0)
            return;
      if (passwordLength < checkCount){
            passwordLength = checkCount;
            handleSlider();
      }
      //lets start journey to find new password
      //remove old password
      console.log("Starting the journey")
      password =  ""
      //lets put the stuff mentioned by checkbox
      let funArr = [];
      if(uppercaseCheck.checked){
            funArr.push(generateUppercase);
      }
      if (lowercaseCheck.checked){
            funArr.push(generateLowercase);
      }
      if(symbolsCheck.checked){
            funArr.push(generateSymbol);
      }
      if (numbersCheck.checked){
            funArr.push(generateRandomNumber);
      }
      //compulsory addition
      console.log("start of compulsory addition")
      for(let i= 0;i<funArr.length; i++){
            password += funArr[i]();
      }
      console.log("compulsory addition done")
      //remaining addition
      for(let i=0;i<passwordLength-funArr.length ;i++){
            let randIndex = getRndInteger(0,funArr.length);
            password += funArr[randIndex]();
      }
      //password shuffle
      console.log("remaining addition done")

      password = shufflePassword(Array.from(password));

      console.log("suffling addition done")

      //show in UI
      passWordDisplay.value  = password;
      console.log("UI addition done")

      //call to check strength
      calcStrength();
});