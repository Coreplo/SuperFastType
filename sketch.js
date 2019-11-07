const kbs = 80; //key Button Size
const  kx= 30; //keyboard x upperleftCorner
const ky= 300; //keyboard y upperleftCorner
const canvasSizeX = 1300;
const canvasSizeY = 750;

let prevEventTime = new Date();
let currentEventTime = new Date();
let timeItTooktoPressTheRightKey=0;
let timeIntervalsArray=[];


let arrayOfChars ;
console.log(arrayOfChars);
charPos = 0;

let keys;

class KeyButton{
  constructor(xSize,ySize,xPos,yPos,kLabel){
    this.xSize=xSize;
    this.ySize=ySize;
    this.xPos=xPos;
    this.yPos=yPos;
    this.keyIsPressed=false;
    this.mistakenlyPressed=false;
    this.nextToBePressed=false;
    this.kLabel=kLabel;
  }

  paint(){
    if (this.keyIsPressed==true ){
      fill(70,70,150);
      rect(this.xPos, this.yPos, this.xSize,this.ySize);
      fill(255);
      textSize(kbs*0.6);
      text (this.kLabel, this.xPos+((this.ySize)/3), this.yPos+((this.ySize)/2));
    } 
    else if(this.nextToBePressed==true ) {
      fill(50,200,50);
      rect(this.xPos, this.yPos, this.xSize,this.ySize);
      fill(255);
      textSize(kbs*0.6);
      text (this.kLabel, this.xPos+((this.ySize)/3), this.yPos+((this.ySize)/2));
    }
    else {
      fill(255);
      rect(this.xPos, this.yPos, this.xSize,this.ySize);
      fill(0);
      textSize(kbs*0.4);
      text (this.kLabel, this.xPos+((this.ySize)/3), this.yPos+((this.ySize)/2));
    }


  }
}

function setup() { 
  createCanvas(canvasSizeX,canvasSizeY);
 
  keys = [

    //row one 
    new KeyButton(kbs,kbs, kx,       ky,"`"),
    new KeyButton(kbs,kbs, kx+1*kbs, ky,"1"),
    new KeyButton(kbs,kbs, kx+2*kbs, ky,"2"),
    new KeyButton(kbs,kbs, kx+3*kbs, ky,"3"),
    new KeyButton(kbs,kbs, kx+4*kbs, ky,"4"),
    new KeyButton(kbs,kbs, kx+5*kbs, ky,"5"),
    new KeyButton(kbs,kbs, kx+6*kbs, ky,"6"),
    new KeyButton(kbs,kbs, kx+7*kbs, ky,"7"),
    new KeyButton(kbs,kbs, kx+8*kbs, ky,"8"),
    new KeyButton(kbs,kbs, kx+9*kbs, ky,"9"),
    new KeyButton(kbs,kbs, kx+10*kbs, ky,"0"),
    new KeyButton(kbs,kbs, kx+11*kbs, ky,"-"),
    new KeyButton(kbs,kbs, kx+12*kbs, ky,"="),
    new KeyButton(kbs*1.50,kbs, kx+13*kbs, ky,"bs"),

    //row two
    new KeyButton(kbs+kbs/2, kbs, kx,ky+kbs,"tab" ),
    new KeyButton(kbs,kbs, kx+1*kbs+kbs/2, ky+kbs,"q"),
    new KeyButton(kbs,kbs, kx+2*kbs+kbs/2, ky+kbs,"w"),
    new KeyButton(kbs,kbs, kx+3*kbs+kbs/2, ky+kbs,"e"),
    new KeyButton(kbs,kbs, kx+4*kbs+kbs/2, ky+kbs,"r"),
    new KeyButton(kbs,kbs, kx+5*kbs+kbs/2, ky+kbs,"t"),
    new KeyButton(kbs,kbs, kx+6*kbs+kbs/2, ky+kbs,"y"),
    new KeyButton(kbs,kbs, kx+7*kbs+kbs/2, ky+kbs,"u"),
    new KeyButton(kbs,kbs, kx+8*kbs+kbs/2, ky+kbs,"i"),
    new KeyButton(kbs,kbs, kx+9*kbs+kbs/2, ky+kbs,"o"),
    new KeyButton(kbs,kbs, kx+10*kbs+kbs/2, ky+kbs,"p"),
    new KeyButton(kbs,kbs, kx+11*kbs+kbs/2, ky+kbs,"["),
    new KeyButton(kbs,kbs, kx+12*kbs+kbs/2, ky+kbs,"]"),
    new KeyButton(kbs,kbs, kx+13*kbs+kbs/2, ky+kbs,"\\"),

    //row three
    new KeyButton(kbs+kbs*3/4,kbs, kx,       ky+kbs*2,"caps"),
    new KeyButton(kbs,kbs, kx+  kbs+kbs*3/4, ky+kbs*2,"a"),
    new KeyButton(kbs,kbs, kx+2*kbs+kbs*3/4, ky+kbs*2,"s"),
    new KeyButton(kbs,kbs, kx+3*kbs+kbs*3/4, ky+kbs*2,"d"),
    new KeyButton(kbs,kbs, kx+4*kbs+kbs*3/4, ky+kbs*2,"f"),
    new KeyButton(kbs,kbs, kx+5*kbs+kbs*3/4, ky+kbs*2,"g"),
    new KeyButton(kbs,kbs, kx+6*kbs+kbs*3/4, ky+kbs*2,"h"),
    new KeyButton(kbs,kbs, kx+7*kbs+kbs*3/4, ky+kbs*2,"j"),
    new KeyButton(kbs,kbs, kx+8*kbs+kbs*3/4, ky+kbs*2,"k"),
    new KeyButton(kbs,kbs, kx+9*kbs+kbs*3/4, ky+kbs*2,"l"),
    new KeyButton(kbs,kbs, kx+10*kbs+kbs*3/4, ky+kbs*2,";"),
    new KeyButton(kbs,kbs, kx+11*kbs+kbs*3/4, ky+kbs*2,"'"),
    new KeyButton(kbs*1.75,kbs, kx+12*kbs+kbs*3/4, ky+kbs*2,"ent"),
     
    //row four
    new KeyButton(kbs+kbs/2,kbs, kx          ,        ky+kbs*3,"shift"),
    new KeyButton(kbs,      kbs, kx + kbs/2 + kbs,   ky+kbs*3,"<"),
    new KeyButton(kbs,      kbs, kx + kbs/2 + 2*kbs, ky+kbs*3,"z"),
    new KeyButton(kbs,      kbs, kx + kbs/2 + 3*kbs, ky+kbs*3,"x"),
    new KeyButton(kbs,      kbs, kx + kbs/2 + 4*kbs, ky+kbs*3,"c"),
    new KeyButton(kbs,      kbs, kx + kbs/2 + 5*kbs, ky+kbs*3,"v"),
    new KeyButton(kbs,      kbs, kx + kbs/2 + 6*kbs, ky+kbs*3,"b"),
    new KeyButton(kbs,      kbs, kx + kbs/2 + 7*kbs, ky+kbs*3,"n"),
    new KeyButton(kbs,      kbs, kx + kbs/2 + 8*kbs, ky+kbs*3,"m"),
    new KeyButton(kbs,      kbs, kx + kbs/2 + 9*kbs, ky+kbs*3,","),
    new KeyButton(kbs,      kbs, kx + kbs/2 + 10*kbs, ky+kbs*3,"."),
    new KeyButton(kbs,      kbs, kx + kbs/2 + 11*kbs, ky+kbs*3,"/"),
    new KeyButton(kbs*2,kbs, kx + kbs/2 + 12*kbs, ky+kbs*3,"shift"),

    //row five
    //new KeyButton(kbs+kbs*1/2,kbs,   kx,                  ky+kbs*4,"Ctrl"),
    //new KeyButton(kbs+kbs*1/2,kbs,   kx+kbs*1.5,      ky+kbs*4,"Win"),
    //new KeyButton(kbs+kbs*1/2,kbs,   kx+kbs*3,    ky+kbs*4,"Alt"),
    new KeyButton(kbs*8,kbs, kx+kbs*3,  ky+kbs*4," "),
    //new KeyButton(kbs+kbs*1/2,kbs,   kx+kbs*10, ky+kbs*4,"Alt Gr"),
    //new KeyButton(kbs+kbs*1/2,kbs,   kx+kbs*11.5, ky+kbs*4,"Menu"),
    //new KeyButton(kbs+kbs*1/2,kbs,   kx+kbs*13, ky+kbs*4,"Ctrl"),
  ];
  
  //ctrl win  alt  space agr menu ctrl
  //1,5  1,5  1,5  5,5  1,5 1,5   1,5
  //0    1,5  3    4,5  10  11,5  13
  console.log(keys);

  arrayOfChars = randomString();

  initializeNextKey();
} 

function draw() { 

  background(220);

  printMyString();
 
  for (let i = 0; i<keys.length; i++){
    keys[i].paint();
  }

  printTime();
}

function keyPressed() {
  
  keys.forEach(element => {
    
    if (element.kLabel===key){
      element.keyIsPressed=true;
      if (key===arrayOfChars[charPos]){
        charPos < arrayOfChars.length-1 ? charPos++ : initString();
        element.nextToBePressed = false;

        currentEventTime = new Date()
        timeItTooktoPressTheRightKey =currentEventTime.getTime()-prevEventTime.getTime();
        prevEventTime= new Date();

        timeIntervalsArray.push(timeItTooktoPressTheRightKey);

        console.log("charPos " + charPos + " - char=" + arrayOfChars[charPos] );
      }
    }
  });

  keys.forEach(element => {
    
    if (element.kLabel===arrayOfChars[charPos]){
      element.nextToBePressed=true;
      console.log("next key to be pressed: " + element.kLabel);
    }
  });
  
}

function keyReleased() {
  keys.forEach(element => {
  if (element.kLabel===key){
    element.keyIsPressed=false;
  }
}); 
}

function printMyString(){
  let textXPos = kx+kbs*5;
  textSize(50);

  fill(0, 50, 80);
  for (let i =0; i <charPos; i++){
    
    text((arrayOfChars[i]===" " ? "·" : arrayOfChars[i]), textXPos, 150);
    textXPos+=textWidth(arrayOfChars[i]);
  }
  
  fill(185, 12, 12);
  
  text(arrayOfChars[charPos]===" "? "·": arrayOfChars[charPos], textXPos ,150);
  textXPos += textWidth(arrayOfChars[charPos]);
  
  fill(0, 50, 80);
  for (let i =charPos+1; i <arrayOfChars.length; i++){
    
    text((arrayOfChars[i]===" " ? "·" : arrayOfChars[i]), textXPos, 150);
    textXPos+=textWidth(arrayOfChars[i]);
  }

}


function randomString(){
  var result           = '';
  var characters       = 'abcdefghijklmnopqrstuvwxyz      ';
  var charactersLength = characters.length;
  for ( var i = 0; i < 20; i++ ) {
    let char=characters.charAt(Math.floor(Math.random() * charactersLength));
    while (char==" " && result.slice(-1)==" ") {
        char=characters.charAt(Math.floor(Math.random() * charactersLength));
      };
    result += char;
  }
  myArr = result.split("");
  console.log("new string: " + result);
   return myArr;
}

function initializeNextKey(){
  keys.forEach(element => {
    if (element.kLabel===arrayOfChars[0]){
    element.nextToBePressed=true;
    } 
  });
}

function initString(){
  charPos = 0;
  arrayOfChars = randomString();
  initializeNextKey(); 
  timeIntervalsArray = [];
}

function printTime(){
  fill(0);
  textSize(kbs*0.6);
  currentEventTime = new Date();
  let timeLapsed = currentEventTime.getTime()-prevEventTime.getTime();
  text(Math.round(timeLapsed/1000 * 10) /10,canvasSizeX-100, 100)
  text(Math.round(timeItTooktoPressTheRightKey/1000 * 10) /10,canvasSizeX-100, 200)
  let sum = 0;
  for (let i= 0; i<timeIntervalsArray.length; i++){
    sum += timeIntervalsArray[i];
  }
  let average = sum / timeIntervalsArray.length;
  text(Math.round(sum/1000 * 10) /10, canvasSizeX - 100, 300);
  text(Math.round(average/1000 * 10) /10, canvasSizeX - 100, 400);
};