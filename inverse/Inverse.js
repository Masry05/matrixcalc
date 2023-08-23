class Fraction{
  constructor(numerator=0,denominator=1){
      if(denominator<0){
          this.numerator=-numerator;
          this.denominator=-denominator;}
      else{
          this.numerator=numerator;
          this.denominator=denominator;}
          this.simplify()
        }
  toString(){
    this.simplify();
    return (this.denominator===0)?"Undefined":(this.numerator===0 || this.denominator===1)?this.numerator+"":(this.numerator+"/"+this.denominator);}
  simplify(){
      let gcm=1;
      for(let i=2;i<=this.denominator;i++)
          if((this.numerator%i===0) && this.denominator%i===0)
            gcm=Math.max(gcm,i);
              this.numerator/=gcm;
              this.denominator/=gcm;
      if(this.numerator===0)
        this.denominator=1;
            }
  add(fraction){
    return (this.denominator===fraction.denominator)?new Fraction(this.numerator+fraction.numerator,this.denominator):new Fraction((this.numerator*fraction.denominator)+(fraction.numerator*this.denominator),this.denominator*fraction.denominator);
  }
  subtract(fraction){
    return this.add(new Fraction(-fraction.numerator,fraction.denominator));}
  multiply(fraction){
    return new Fraction(this.numerator*fraction.numerator,this.denominator*fraction.denominator);
  }
  divide(fraction){
    let quotient=new Fraction(this.numerator*fraction.denominator,this.denominator*fraction.numerator);
      if(quotient.denominator<0){
          quotient.numerator=-quotient.numerator;
          quotient.denominator=-quotient.denominator;}
      return quotient;
    }
  equals(fraction){return (fraction.numerator===0)?this.numerator===fraction.numerator:this.numerator===fraction.numerator&&this.denominator===fraction.denominator;
  }
}
function setMatrix(){
  const size= Number(document.querySelector(".js-size").value);
  document.querySelector(".js-inputs").innerHTML="";
  document.querySelector(".js-steps").innerHTML="";
  let text="<div>";
  if(size>=2){
    for(let i=0;i<size;i++){
      for(let j=0;j<size;j++){
        let id=[i,j];
        text+=`<input class="matrixInput" onkeydown="check(${i},${j},${size},event.key);" id="${id}"
        title="[${id[0]+1},${id[1]+1}]" >\n`;}
        text+=`<br>`;
      }
      text+="</div>";
      text+=`<div class="solving-buttons"><button class="js-solve" onclick="if(checkInput()) solve();">Solve</button>
      <button class="js-reset" onclick="reset()">Reset</button></div>`;
      document.querySelector(".js-inputs").innerHTML+=text;
    }
    document.getElementById("0,0").focus();
  }
  function check(i,j,size,key){
    if(key==="Enter"){
      if(i===size-1&&j===size-1){
        if(checkInput())
          solve();}
      else
        movement(i,j,size,"ArrowRight")}
    else if(key==="ArrowUp"||key==="ArrowDown"||key==="ArrowLeft"||key==="ArrowRight")
      movement(i,j,size,key);
    else if(key==="Backspace"&&document.getElementById(`${i},${j}`).value===""){
      movement(i,j,size,"ArrowLeft");
      event.preventDefault();}
    else if(key!=="0"&&key!=="1"&&key!=="2"&&key!=="3"&&key!=="4"&&key!=="5"&&key!=="6"&&key!=="7"&&key!=="8"&&key!=="9"&&key!=="/"&&key!=="-"&&key!=="Backspace")
      event.preventDefault();
    document.getElementById(i+","+j).style.boxShadow="";
  }
  function movement(i,j,size,key){
    i=Number(i);
    j=Number(j);
    size=Number(size);
    if(key==="ArrowUp")
      if(i!==0)
        document.getElementById(`${i-1},${j}`).focus();
    if(key==="ArrowDown")
      if(i!==size-1)
      document.getElementById(`${i+1},${j}`).focus();
    if(key==="ArrowLeft"){
      if(document.getElementById(`${i},${j}`).selectionStart===0){
      if(j!==0)
        document.getElementById(`${i},${j-1}`).focus();
      else if(i!==0)
        document.getElementById(`${i-1},${size-1}`).focus();
        event.preventDefault();}}
    if(key==="ArrowRight"){
      if(document.getElementById(`${i},${j}`).selectionStart===document.getElementById(`${i},${j}`).value.length){
      if(j!==size-1)
      document.getElementById(`${i},${j+1}`).focus();
      else if(i!==size-1)
      document.getElementById(`${i+1},0`).focus();
      event.preventDefault();}}}
function reset(){
  setMatrix();
  document.querySelector(".js-solution").innerHTML="";
  document.querySelector(".show2").innerHTML="";
}
function checkInput(){
  const size= Number(document.querySelector(".js-size").value);
    let flag=true
    let errors="Please enter a valid input at: ";
    for(let i=0;i<size;i++)
      for(let j=0;j<size;j++){
        let stringForm=document.getElementById(`${i},${j}`).value;
        let dash=0;
        let end=0;
        let error=""
        if(stringForm.length===0){
          error=` [${i+1},${j+1}] `;
          flag=false;
          errors+=error;
          document.getElementById(i+","+j).style.boxShadow="0px 0px 10px inset red";
        }
        else{
          for(let k=0;k<stringForm.length;k++,end=k)
            if(stringForm.charAt(k)=='/')
              dash=k;
            if(dash!=0){
            let temp=new Fraction(Number(stringForm.substring(0,dash)),Number(stringForm.substring(dash+1,end)));
            if(isNaN(temp.numerator)){
              error=` [${i+1},${j+1}] `;
              flag=false;
              errors+=error;
              document.getElementById(i+","+j).style.boxShadow="0px 0px 10px inset red";
            }
          }
            else{
              let temp=new Fraction(Number(stringForm.substring(0,end)));
              if(isNaN(temp.numerator)){
                error=` [${i+1},${j+1}] `;
                flag=false;
                errors+=error;
                document.getElementById(i+","+j).style.boxShadow="0px 0px 10px inset red";
              }
            } 
          }
        }
        if(!flag)
          alert(errors);
        return flag;
        }
let determinantM=["test"];
let stepsList=["test"];
let determinantStepsList=["test"];
function solve(){
  document.querySelector(".js-solution").innerHTML="";
  document.querySelector(".steps").innerHTML="";
  let stepsMatrix="";
  let info="";
  let matrix=load();
  function load(){
    const size= Number(document.querySelector(".js-size").value);
    let matrix=[];
    for(let i=0;i<size;i++){
      let miniMatrix=[]
      for(let j=0;j<size;j++){
        let stringForm=document.getElementById(`${i},${j}`).value;
        let dash=0;
        let end=0;
        for(let k=0;k<stringForm.length;k++,end=k)
        if(stringForm.charAt(k)=='/')
        dash=k;
        if(dash!=0)
        miniMatrix.push(new Fraction(Number(stringForm.substring(0,dash)),Number(stringForm.substring(dash+1,end))));
        else
        miniMatrix.push(new Fraction(Number(stringForm.substring(0,end))));
    }
    matrix.push(miniMatrix);
  }
  return matrix;
}
  let copyMatrix=[];   //coping matrix to check if invertible
  for(let i=0;i<matrix.length;i++){ 
    let miniMatrix=[]
    for(let j=0;j<matrix.length;j++)
      miniMatrix.push(matrix[i][j]);
    copyMatrix.push(miniMatrix);}
    let determinantSign=new Fraction(arrange(copyMatrix));
    function arrange(matrix){
      let size=matrix.length;
      let sign=1;
      let flag=false;
      for(let i=0;i<size;i++)
        if(matrix[i][i].equals(new Fraction()))
          for(let j=i+1;j<size;j++)
            if(!(matrix[j][i].equals(new Fraction()))){
              let temp=matrix[i];
              matrix[i]=matrix[j];
              matrix[j]=temp;
              sign=-1;
              flag=true;
              break;
          }
      if(matrix[size-1][size-1].equals(new Fraction())){
        for(let i=0;i<size;i++)
          if(!(matrix[i][size-1].equals(new Fraction())) && !(matrix[size-1][i].equals(new Fraction()))){
            let temp=matrix[i];
            matrix[i]=matrix[size-1];
            matrix[size-1]=temp;
            sign=-1;
            flag=true;
            break;
          }
        }
        if(flag){
          info=`&larr; Rearrange the matrix so pivot &#8800; 0 <br><br> matrix sign = (${sign>0?"+":"-"}) .(sign changes everytime a row is switched)`;
          stepsMatrix+=printStep(matrix,info);
        }
        return sign;
      }
    let d=determinant(determinantSign);
    function determinant(determinantSign){
      for(let i=0;i<copyMatrix.length;i++)
      for(let j=0;j<copyMatrix.length;j++){
        if(i===j){
          for(let b=i+1;b<copyMatrix.length;b++){
            let pivot=copyMatrix[b][j].divide(copyMatrix[i][j]);
              if(!(copyMatrix[b][j].equals(new Fraction(0,1)))){
                for(let a=j;a<copyMatrix[b].length;a++){
                  copyMatrix[b][a]=copyMatrix[b][a].subtract(copyMatrix[i][a].multiply(pivot));}
                  info=(pivot.numerator>0)?`&larr; R${i+2} = R${i+2} - (${pivot}) R${i+1}`:`&larr; R${i+2} = R${i+2} + (${pivot.multiply(new Fraction(-1))}) R${i+1}`;
                  stepsMatrix+=printStep(copyMatrix,info);
                }}}}
       let determinant=new Fraction(1);
       for(let i=0;i<copyMatrix.length;i++)
          determinant=determinant.multiply(copyMatrix[i][i]);
       return determinant.multiply(determinantSign);
      }
      info=`sign(${determinantSign.numerator>0?"+":"-"}) `;
      for(let i=0;i<copyMatrix.length;i++)
        info+="x "+copyMatrix[i][i]+" ";
      info+="= "+d+" (Determinant)";
      stepsMatrix+=printStep(copyMatrix,info);
      determinantStepsList[0]=(stepsMatrix);
      if(d.equals(new Fraction())){
        document.querySelector(".js-solution").innerHTML="This matrix is singular.";}
      else{
   let stepsMatrix="";
   let info="";
   determinantM[0]=d;
   identity(matrix);
  function identity(matrix){
  for(let i=0;i<matrix.length;i++)
    for(let j=0;j<matrix.length;j++){
      if(i===j)
        matrix[i].push(new Fraction(1));
      else
        matrix[i].push(new Fraction());
      }
    }
  info="&larr; Identity matrix was added.";
  stepsMatrix+=printStep(matrix,info);
  let flag= arrange(matrix);
  function arrange(matrix){
    for(let i=0;i<matrix.length;i++)
      if(matrix[i][i].equals(new Fraction()))
        for(let j=i+1;j<matrix.length;j++)
          if(!(matrix[j][i].equals(new Fraction()))){
            let temp=matrix[i];
            matrix[i]=matrix[j];
            matrix[j]=temp;
            return true;
          } 
      if(matrix[matrix.length-1][matrix.length-1].equals(new Fraction())){
        for(let i=0;i<matrix.length;i++)
          if(!(matrix[i][matrix.length-1].equals(new Fraction())) && !(matrix[matrix.length-1][i].equals(new Fraction()))){
            let temp=matrix[i];
            matrix[i]=matrix[matrix.length-1];
            matrix[matrix.length-1]=temp;
            return true;
          }
        }
        return false;
      }
  if(flag){
    info="&larr; Rearrange the matrix so pivot &#8800; 0.";
    stepsMatrix+=printStep(matrix,info);
  }
  gauss(matrix);
  function gauss(matrix){
    for(let i=0;i<matrix.length;i++)
      for(let j=0;j<matrix[i].length;j++) {
        if(i==j){
          if (!(matrix[i][j].equals(new Fraction(1))) && !(matrix[i][j].equals(new Fraction()))){
            let pivot=matrix[i][j];//making the pivot=1
            for (let k=0;k<matrix[i].length; k++)
              matrix[i][k]=matrix[i][k].divide(pivot);
            info=info=(pivot.numerator>0&&pivot.denominator===1)?`&larr; R${i+1} = (1/${pivot}) R${i+1}`:(pivot.numerator<0&&pivot.denominator===1)?`&larr; R${i+1} = (-1/${-pivot.numerator}) R${i+1}`:(pivot.denominator!==1&&pivot.numerator==1)?`&larr; R${i+1} = (${pivot.denominator}) R${i+1}`:(pivot.denominator!==1&&pivot.numerator>0)?`&larr; R${i+1} = (${pivot.denominator}/${pivot.numerator}) R${i+1}`:`&larr; R${i+1} = (${-pivot.denominator}/${-pivot.numerator}) R${i+1}`
            stepsMatrix+=printStep(matrix,info);
            }
          if(matrix[i][j].equals(new Fraction(1))){//starting to divide under the pivot
            for (let b=i+1;b<matrix.length; b++){
              let pivot=matrix[b][j];
                if (!(matrix[b][j].equals(new Fraction())))
                  for (let a=j;a<matrix[b].length;a++)
                    matrix[b][a] = matrix[b][a].subtract(matrix[i][a].multiply(pivot));
                    info=(pivot.numerator>0)?`&larr; R${i+2} = R${i+2} - (${pivot}) R${i+1}`:`&larr; R${i+2} = R${i+2} + (${pivot.multiply(new Fraction(-1))}) R${i+1}`;
                    stepsMatrix+=printStep(matrix,info);
                  }
                }
              }
            }
          }
  jordan(matrix)
  function jordan(matrix){
    for(let i=matrix.length-1;i>=0;i--)
      for (let j=matrix[i].length-1;j>=0;j--){
        if(i==j){
          if (!(matrix[i][j].equals(new Fraction(1))) && !(matrix[i][j].equals(new Fraction()))) {
            let pivot =matrix[i][j];
            for (let k=0;k<matrix[i].length;k++)
              matrix[i][k]=matrix[i][k].divide(pivot);
              info=info=(pivot.numerator>0&&pivot.denominator===1)?`&larr; R${i+1} = (1/${pivot}) R${i+1}`:(pivot.numerator<0&&pivot.denominator===1)?`&larr; R${i+1} = (-1/${-pivot}) R${i+1}`:(pivot.denominator!==1&&pivot.numerator==1)?`&larr; R${i+1} = (${pivot.denominator}) R${i+1}`:(pivot.denominator!==1&&pivot.numerator>0)?`&larr; R${i+1} = (${pivot.denominator}/${pivot.numerator}) R${i+1}`:`&larr; R${i+1} = (${-pivot.denominator}/${-pivot.numerator}) R${i+1}`
              stepsMatrix+=printStep(matrix,info);
            }
            if(matrix[i][j].equals(new Fraction(1))) {
              for(let b=i-1;b>=0;b--){
                let pivot=matrix[b][j];
                if (!(matrix[b][j].equals(new Fraction())))
                  for (let a=0;a<matrix[i].length; a++)
                    matrix[b][a]=matrix[b][a].subtract(matrix[i][a].multiply(pivot));
                    info=(pivot.numerator>0)?`&larr; R${i} = R${i} - (${pivot}) R${i+1}`:`&larr; R${i} = R${i} + (${pivot.multiply(new Fraction(-1))}) R${i+1}`;
                    stepsMatrix+=printStep(matrix,info);
                  }
                }
              }
            }
          }
  let solution=[];
  for(let i=0;i<matrix.length;i++){
    let miniSolution=[];
    for(let j=matrix.length;j<(matrix.length*2);j++)
      miniSolution.push(matrix[i][j]);
    solution.push(miniSolution);}
    info="Remove the identity matrix."
    stepsMatrix+=printStep(solution,info)
let tableString=`<a class="textstart">Result:</a><br><br>\n<div class="solution-table"><div class="absolute1"></div><div class="absolute2"></div>`;
for(let i=0;i<solution.length;i++){
  if(i===solution.length-1)
  tableString+=`<div class="lastcolumn">\n`;
  else
    tableString+=`<div class="column">\n`;
  for(let j=0;j<solution.length;j++)
      tableString+=`<div class="row">${solution[j][i]}</div>\n`;
  tableString+="</div>\n";
}
tableString+=`</div>\n`;
document.querySelector(".js-solution").innerHTML=tableString;
document.querySelector(".show2").innerHTML=`<div class="show-buttons"><button class="show-determinant" onclick="showDeterminant();">Show determinant</button><button class="show-steps" onclick="steps()">Show steps</button></div>`;
stepsList[0]=stepsMatrix;
}}
//move sidebar
function dragElement(elmnt) {
  let pos2 = 0;
  let pos4 = 0;
  dragMouseDown();
  function dragMouseDown() {
    e=window.event;
    pos4 = e.clientY;
    document.onmousemove = elementDrag;
    document.onmouseup = closeDragElement;
  }
  function elementDrag(e) {
    e = e || window.event;
    pos2 = pos4 - e.clientY;
    pos4 = e.clientY;
    if((elmnt.offsetTop - pos2)>=160)
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
  }
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
//swip sidebar
const myElement=document.getElementById("movebar");
myElement.addEventListener("touchstart", startTouch, false);
myElement.addEventListener("touchmove", moveTouch, false);
 
// Swipe Up / Down
let initialY = null;
function startTouch(e) {
  initialY = e.touches[0].clientY;
};
 
function moveTouch(e) {
  if (initialY === null) {
    return;
  }
  let currentY = e.touches[0].clientY;
  
  let diffY = initialY - currentY;
 
  if(currentY>=200)
      document.querySelector(".sidebar").style.top = (document.querySelector(".sidebar").offsetTop - diffY) + "px";
  initialY = null;
  e.preventDefault();
};
//hide sidebar
function hide(){
  document.querySelector(".sidebar").innerHTML=`<button class="show" onmousedown="dragElement(document.querySelector('.sidebar'))" id="movebar" onclick="show();">&gt;</button>`;}
function show(){
  document.querySelector(".sidebar").innerHTML=`<div class="options-group">
  <a class="options" onclick="href='/determinant/Determinant.html'" >Determinant</a>
  <a class="options" onclick="href='/multiplication/Multiplication.html'">Multiplication</a>
  <a class="options" onclick="href='/system-of-equations/System-of-equations.html'" >System of equations</a>
</div>
<button class="hide" onmousedown="dragElement(document.querySelector('.sidebar'))" id="movebar" onclick="hide();">&lt;</button>`;
}
function showDeterminant(){
  if(document.querySelector(".show-buttons").innerHTML.charAt(102)==="s"||document.querySelector(".show-buttons").innerHTML.charAt(128)==="s")
    document.querySelector(".show2").innerHTML=`<div class="show-buttons"><button class="hide-determinant" onclick="hideDeterminant();">Hide determinant</button><button class="show-steps" onclick="steps()">Show steps</button></div>`;
  else
    document.querySelector(".show2").innerHTML=`<div class="show-buttons"><button class="hide-determinant" onclick="hideDeterminant();">Hide determinant</button><button class="hide-steps" onclick="hideSteps()" >Hide steps</button></div>`;
  document.querySelector(".show2").innerHTML+=`<div class="determinant">Determinant= ${determinantM[0]}</div>`;
  document.querySelector(".show2").innerHTML+=`<div class="determinant-steps"><button class="show-determinant-steps" onclick="showDeterminantSteps()">Show determinant steps</button></div>`
}
function hideDeterminant(){
  if(document.querySelector(".show-buttons").innerHTML.charAt(102)==="s"){
    document.querySelector(".show2").innerHTML=`<div class="show-buttons"><button class="show-determinant" onclick="showDeterminant();">Show determinant</button><button class="show-steps" onclick="steps()">Show steps</button></div>`;
    document.querySelector(".js-steps").innerHTML="";}
  else
  document.querySelector(".show2").innerHTML=`<div class="show-buttons"><button class="show-determinant" onclick="showDeterminant();">Show determinant</button><button class="hide-steps" onclick="hideSteps()" >Hide steps</button></div>`
  }
function hideSteps(){
  document.querySelector(".js-steps").innerHTML="";
  if(document.querySelector(".show-buttons").innerHTML.charAt(15)==="s"||document.querySelector(".show-buttons").innerHTML.charAt(15)==="w")
    document.querySelector(".show-buttons").innerHTML=`<div class="show-buttons"><button class="show-determinant" onclick="showDeterminant();">Show determinant</button><button class="show-steps" onclick="steps()">Show steps</button></div>`;
  else
    document.querySelector(".show-buttons").innerHTML=`<button class="hide-determinant" onclick="hideDeterminant();">Hide determinant</button><button class="show-steps" onclick="steps()">Show steps</button></div>`;
}
//printing steps
function printStep(matrix,step){
  let tableString=`<div class="step-matrix"><div class="step-table"><div class="absolute1"></div><div class="absolute2"></div>`;
  for(let i=0;i<matrix[0].length;i++){
    if(i===matrix[0].length-1)
    tableString+=`<div class="lastcolumn">\n`;
    else
      tableString+=`<div class="column">\n`;
    for(let j=0;j<matrix.length;j++){
      if(j===matrix.length-1 && i-1===j && matrix[0].length===(matrix.length*2))
        tableString+=`<div class="group" ><div class="absolute3"></div></div>`;
      tableString+=`<div class="row">${matrix[j][i]}</div>\n`;
    }
    tableString+="</div>\n";
  }
  tableString+=`</div>\n<div class="step-text">${step}</div></div>`;
  return tableString;
  }
function steps(){
  document.querySelector(".js-steps").innerHTML="";
  if(document.querySelector(".show-buttons").innerHTML.charAt(15)==="s"||document.querySelector(".show-buttons").innerHTML.charAt(15)==="w")
    document.querySelector(".show-buttons").innerHTML=`<div class="show-buttons"><button class="show-determinant" onclick="showDeterminant();">Show determinant</button><button class="hide-steps" onclick="hideSteps()" >Hide steps</button></div>`;
  else{
  document.querySelector(".show2").innerHTML=`<div class="show-buttons"><button class="hide-determinant" onclick="hideDeterminant();">Hide determinant</button><button class="hide-steps" onclick="hideSteps()">Hide steps</button></div>`;
  document.querySelector(".show2").innerHTML+=`<div class="determinant">Determinant= ${determinantM[0]}</div>`;
  document.querySelector(".show2").innerHTML+=`<div class="determinant-steps"><button class="show-determinant-steps" onclick="showDeterminantSteps()">Show determinant steps</button></div>`;}
  document.querySelector(".js-steps").innerHTML=stepsList[0];
}
function showDeterminantSteps(){
  hideSteps();
  document.querySelector(".show2").innerHTML=`<div class="show-buttons"><button class="hide-determinant" onclick="hideDeterminant();">Hide determinant</button><button class="show-steps" onclick="steps()">Show steps</button></div>`;
  document.querySelector(".show2").innerHTML+=`<div class="determinant">Determinant= ${determinantM[0]}</div>`;
  document.querySelector(".show2").innerHTML+=`<div class="determinant-steps"><button class="hide-determinant-steps" onclick="hideDeterminantSteps()">Hide determinant steps</button></div>`;
  console.log(determinantStepsList[0]);
  document.querySelector(".js-steps").innerHTML=determinantStepsList[0];
}
function hideDeterminantSteps(){
  document.querySelector(".js-steps").innerHTML="";
  document.querySelector(".show2").innerHTML=`<div class="show-buttons"><button class="hide-determinant" onclick="hideDeterminant();">Hide determinant</button><button class="show-steps" onclick="steps()">Show steps</button></div>`;
  document.querySelector(".show2").innerHTML+=`<div class="determinant">Determinant= ${determinantM[0]}</div>`;
  document.querySelector(".show2").innerHTML+=`<div class="determinant-steps"><button class="show-determinant-steps" onclick="showDeterminantSteps()">Show determinant steps</button></div>`;
}