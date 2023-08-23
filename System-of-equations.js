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
class unknown{
  constructor(number,variable=""){
    this.number=new Fraction(number.numerator,number.denominator);
    this.variable=variable;
  }
  toString(){
    return (this.number.numerator===0)?"":(this.number.equals(new Fraction(1)))?this.variable:this.number+" "+this.variable;
  }
  add(x){
    return new unknown(this.number.add(x.number),this.variable);
  }
  subtract(x){
    return new unknown(this.number.subtract(x.number),this.variable);
  }
  multiply(x){
    return new unknown(this.number.multiply(x.number),this.variable);
  }
  divide(x){
    return new unknown(this.number.divide(x.number),this.variable);
  }
  equals(unknown){
    return this.variable===unknown.variable
  }
}
function setMatrix(){
  const column= Number(document.querySelector(".js-size").value)+1;
  const row=Number(document.querySelector(".js-equation-size").value);
  document.querySelector(".js-inputs").innerHTML="";
  document.querySelector(".js-steps").innerHTML="";
  let text=`<div>`;
    for(let i=0;i<row;i++){
      for(let j=0;j<column-2;j++){
        let id=[i,j];
        text+=`<input class="matrixInput" onkeydown="check(${i},${j},${row},${column},event.key);" id="${id}"
        title="[${id[0]+1},${id[1]+1}]" ><a class="signs"> X${j+1} +</a>\n`;}
        text+=`<input class="matrixInput" onkeydown="check(${i},${column-2},${row},${column},event.key);" id="${[i,column-2]}"
        title="[${i+1},${column-1}]" ><a class="signs"> X${column-1} =</a>\n`;
        text+=`<input class="matrixInput" onkeydown="check(${i},${column-1},${row},${column},event.key);" id="${[i,column-1]}"
        title="[${i+1},${column}]" >\n`;
        text+=`<br>`;
      }
      text+="</div>";
      text+=`<div class="solving-buttons"><button class="js-solve" onclick="if(checkInput()) solve();">Solve</button>
      <button class="js-reset" onclick="reset()">Reset</button></div>`;
      document.querySelector(".js-inputs").innerHTML+=text;
    document.getElementById("0,0").focus();}
  function check(i,j,row,column,key){
    if(key==="Enter"){
      if(i===row-1&&j===column-1){
        if(checkInput())
          solve();}
      else
        movement(i,j,row,column,"ArrowRight")}
    else if(key==="ArrowUp"||key==="ArrowDown"||key==="ArrowLeft"||key==="ArrowRight")
      movement(i,j,row,column,key);
    else if(key==="Backspace"&&document.getElementById(`${i},${j}`).value===""){
      movement(i,j,row,column,"ArrowLeft");
      event.preventDefault();}
    else if(key!=="0"&&key!=="1"&&key!=="2"&&key!=="3"&&key!=="4"&&key!=="5"&&key!=="6"&&key!=="7"&&key!=="8"&&key!=="9"&&key!=="/"&&key!=="-"&&key!=="Backspace")
      event.preventDefault();
    document.getElementById(i+","+j).style.boxShadow="";
  }
  function movement(i,j,row,column,key){
    i=Number(i);
    j=Number(j);
    row=Number(row);
    column=Number(column);
    if(key==="ArrowUp")
      if(i!==0)
        document.getElementById(`${i-1},${j}`).focus();
    if(key==="ArrowDown")
      if(i!==row-1)
      document.getElementById(`${i+1},${j}`).focus();
    if(key==="ArrowLeft"){
      if(document.getElementById(`${i},${j}`).selectionStart===0){
      if(j!==0)
        document.getElementById(`${i},${j-1}`).focus();
      else if(i!==0)
        document.getElementById(`${i-1},${column-1}`).focus();
        event.preventDefault();}}
    if(key==="ArrowRight"){
      if(document.getElementById(`${i},${j}`).selectionStart===document.getElementById(`${i},${j}`).value.length){
      if(j!==column-1)
      document.getElementById(`${i},${j+1}`).focus();
      else if(i!==row-1)
      document.getElementById(`${i+1},0`).focus();
      event.preventDefault();}}}
function reset(){
  setMatrix();
  document.querySelector(".js-solution").innerHTML="";
}
function checkInput(){
  const column= Number(document.querySelector(".js-size").value)+1;
  const row=Number(document.querySelector(".js-equation-size").value);
    let flag=true
    let errors="Please enter a valid input at: ";
    for(let i=0;i<row;i++)
      for(let j=0;j<column;j++){
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
let stepsList=["test"];
function solve(){
  document.querySelector(".js-solution").innerHTML="";
  document.querySelector(".steps").innerHTML="";
  let stepsMatrix="";
  let info="";
  let matrix=load();
  function load(){
    const column= Number(document.querySelector(".js-size").value)+1;
    const row=Number(document.querySelector(".js-equation-size").value);
    let matrix=[];
    for(let i=0;i<row;i++){
      let miniMatrix=[]
      for(let j=0;j<column;j++){
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
  for(let c=0;c<(Number(document.querySelector(".js-size").value)-Number(document.querySelector(".js-equation-size").value));c++){
    let miniMatrix=[]
    for(let i=0;i<matrix[0].length;i++)
      miniMatrix.push(new Fraction());
    matrix.push(miniMatrix);
  }
  function arrange(){
    let flag=false;
    for(let i=0;i<document.querySelector(".js-size").value;i++)
      if(matrix[i][i].equals(new Fraction()))
        for(let j=i+1;j<matrix.length;j++)
          if(!(matrix[j][i].equals(new Fraction()))){
            let temp=matrix[i];
            matrix[i]=matrix[j];
            matrix[j]=temp;
            flag=true;
            break;
        }
      if(flag){
        info=`&larr; Rearrange the matrix so pivot &#8800; 0`;
        stepsMatrix+=printStep(matrix,info);
      }
    }
  gauss();
  function gauss(){
    for(let i=0;i<matrix.length;i++){
      arrange();
      for(let j=0;j<matrix[i].length;j++){
        if(i===j){
          for(let b=i+1;b<matrix.length;b++){
            let pivot=matrix[b][j].divide(matrix[i][j]);
            if(!(matrix[b][j].equals(new Fraction(0,1)))){
              for(let a=j;a<matrix[b].length;a++){
                matrix[b][a]=matrix[b][a].subtract(matrix[i][a].multiply(pivot));}
              info=(pivot.numerator>0)?`&larr; R${i+2} = R${i+2} - (${pivot}) R${i+1}`:`&larr; R${i+2} = R${i+2} + (${pivot.multiply(new Fraction(-1))}) R${i+1}`;
              stepsMatrix+=printStep(matrix,info);
            }
          }
        }
      }
    }
  }
  arrange();
  info="Solve and substitue to find each value";
  stepsMatrix+=printStep(matrix,info);
  let variables=[]
  let flag=true;
    for(let g=0;g<document.querySelector(".js-size").value;g++)
      if(matrix[g][g].equals(new Fraction()))
        flag=false;
    if(flag){
    for(let i=document.querySelector(".js-size").value-1;i>=0;i--){
      let temp=matrix[i][matrix[i].length-1];
      for(let j=matrix[i].length-2,k=0;j>i;j--,k++)
        temp=temp.subtract(matrix[i][j].multiply(variables[k][0]));
      temp=temp.divide(matrix[i][i]);
      variables.push([temp]);
      info=`(${matrix[i][i]}) X${i+1}`
      for(let j=i+1,k=0;j<matrix[0].length-1;j++,k++)
        info+=`+ (${matrix[i][j]})(${variables[k][0]}) `
      info+=`= ${matrix[i][matrix[i].length-1]} &rarr; X${i+1} = ${variables[variables.length-1][0]}`
      stepsMatrix+=printStep(matrix,info);
      }
      function check2(){
        for(let i=0;i<matrix.length;i++){
          let goal=matrix[i][matrix[i].length-1];
          let total=new Fraction();
          for(let j=0,k=(variables.length-1);j<matrix[i].length-1;j++,k--)
            total=total.add((matrix[i][j]).multiply(variables[k][0]));
          if(!(total.equals(goal)))
            return false;
          }
          return true;
        }
      } 
    else{
      let char=97;
      for(let i=matrix.length-1;i>=0;i--){
        let answers=[];
        if(matrix[i][i].numerator===0){
          variables.push([new unknown(new Fraction(1),String.fromCharCode(char))]);
          info=`Since there is no value for X${i+1}, it will be equal to variable (${String.fromCharCode(char)})`;
          stepsMatrix+=printStep(matrix,info);
          char++;
        }
        else{
        let x=[]
        let flagg=true;
        let temp=new unknown(matrix[i][matrix[i].length-1]);
        x.push(temp);
        for(let j=matrix[i].length-2,k=0;j>i;j--,k++)
          for(let a=0;a<variables[k].length;a++)
            x.push(((variables[k][a]).multiply(new unknown(matrix[i][j]))).multiply(new unknown(new Fraction(-1))));
        for(let i=0;0<x.length;x.splice(0,1)){
          for(let j=i+1;j<x.length;j++)
            if(x[i].equals(x[j])){
              x[i]=x[i].add(x[j]);
              x.splice(j,1);
            }
          answers.push(x[0]);
        }
        for(let z=0;z<answers.length;z++)
          answers[z]=answers[z].divide(new unknown(matrix[i][i]));
        variables.push(answers);
        for(let i=0;i<variables.length;i++)
          if(variables[i].length>1)
            if(variables[i][variables[i].length-1].equals(variables[i][variables[i].length-2])){
              variables[i][variables[i].length-2]=variables[i][variables[i].length-1].add(variables[i][variables[i].length-2])
              variables[i].splice((variables[i].length-1),1);
            }
      }
      if(matrix[i][i].numerator!==0){
      info=`(${matrix[i][i]}) X${i+1}`;
      for(let j=i+1,k=variables.length-2;j<matrix[0].length-1;j++,k--){
        info+=`+ (${matrix[i][j]})(${variables[k][0]} `
        for(let b=1;b<variables[k].length;b++)
          info+=(variables[k][b].number.numerator>0)?`+ ${variables[k][b]} `:`- ${variables[k][b].multiply(new unknown(new Fraction(-1)))} `;
        info+=")"
      }
      let string2="";
      let z=variables.length-1;
      if(variables[z].length===1)
        string2+=`${variables[z][0]}`;
      else
        for(let k=0;k<variables[z].length;k++)
          string2+=(variables[z][k].number.numerator>0 && k!==0)?`+ ${variables[z][k]} `:(variables[z][k].number.numerator<0 && k!==0)?`- ${(variables[z][k].multiply(new unknown(new Fraction(-1))))} `:` ${variables[z][k]} `;
      info+=` = ${matrix[i][matrix[i].length-1]} &rarr; X${i+1} = ${string2}`
      stepsMatrix+=printStep(matrix,info);
      }}
    }
  let string="";
    for(let i=variables.length-1,j=0;j<document.querySelector(".js-size").value;i--,j++){
      string+=`<a class="x"> X${j+1} = `;
      if(variables[i].length===1){
        string+=`${variables[i][0]}`;}
      else{
        for(let k=0;k<variables[i].length;k++)
          string+=(variables[i][k].number.numerator>0 && k!==0)?`+ ${variables[i][k]} `:(variables[i][k].number.numerator<0 && k!==0)?`- ${(variables[i][k].multiply(new unknown(new Fraction(-1))))} `:` ${variables[i][k]} `;
          let flag3=false;
          for(let g=0;g<variables[i].length;g++)
            if(variables[i][g].number.numerator!==0)
              flag3=true;
          if(!flag3)
            string+="0";
      }
      string+="</a>\n";
    }
    if(flag){
      if(check2()){
    let tableString=`<a class="textstart">Result:</a><br><br>\n<div class="table-variables"><div class="solution-table"><div class="absolute1"></div><div class="absolute2"></div>`;
    for(let i=0;i<matrix[0].length;i++){
      if(i===matrix[0].length-1)
        tableString+=`<div class="lastcolumn"><div class="group" ><div class="absolute3"></div></div><div class="row"><div class="xx">=</div></div>\n`;
      else
        tableString+=`<div class="column"><div class="row"><div class="xx">X${i+1}</div></div>`;
      for(let j=0;j<document.querySelector(".js-equation-size").value;j++)
        tableString+=`<div class="row">${matrix[j][i]}</div>\n`;
      tableString+="</div>\n";
    }
    tableString+=`</div><div class="variables">${string}</div></div>\n`;
    document.querySelector(".js-solution").innerHTML=tableString;
    document.querySelector(".js-steps").innerHTML=`<div class="show-button"><button class="show-steps" onclick="steps()">Show steps</button></div>`;
    stepsList[0]=stepsMatrix;
  }
  else{
    document.querySelector(".js-solution").innerHTML=`<a class="step-text">No Solution</a>`;
  }}
  else{
    let tableString=`<a class="textstart">Result:</a><br><br>\n<div class="table-variables"><div class="solution-table"><div class="absolute1"></div><div class="absolute2"></div>`;
    for(let i=0;i<matrix[0].length;i++){
      if(i===matrix[0].length-1)
        tableString+=`<div class="lastcolumn"><div class="group" ><div class="absolute3"></div></div><div class="row"><div class="xx">=</div></div>\n`;
      else
        tableString+=`<div class="column"><div class="row"><div class="xx">X${i+1}</div></div>`;
      for(let j=0;j<document.querySelector(".js-equation-size").value;j++)
        tableString+=`<div class="row">${matrix[j][i]}</div>\n`;
      tableString+="</div>\n";
    }
    tableString+=`</div><div class="variables">${string}</div></div>\n`;
    document.querySelector(".js-solution").innerHTML=tableString;
    document.querySelector(".js-steps").innerHTML=`<div class="show-button"><button class="show-steps" onclick="steps()">Show steps</button></div>`;
    stepsList[0]=stepsMatrix;
  }
}
function printStep(matrix,step){
  let tableString=`<div class="step-matrix"><div class="step-table"><div class="absolute1"></div><div class="absolute2"></div>`;
  for(let i=0;i<matrix[0].length;i++){
    if(i===matrix[0].length-1)
    tableString+=`<div class="lastcolumn">\n`;
    else
      tableString+=`<div class="column">\n`;
    for(let j=0;j<matrix.length;j++){
      tableString+=`<div class="row">${matrix[j][i]}</div>\n`;
    }
    tableString+="</div>\n";
  }
  tableString+=`</div>\n<div class="step-text">${step}</div></div>`;
  document.querySelector(".js-steps").innerHTML=`<div class="show-button"><button class="show-steps" onclick="steps()">Show steps</button></div>`;
  return tableString
  }
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
    if(pos4>=200)
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
  }
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
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
function hideSteps(){
  document.querySelector(".js-steps").innerHTML=`<div class="show-button"><button class="show-steps" onclick="steps()">Show steps</button></div>`;}
function steps(){
  document.querySelector(".js-steps").innerHTML=`<div class="show-button"><button class="hide-steps" onclick="hideSteps()">Hide steps</button></div>`;
  document.querySelector(".js-steps").innerHTML+=stepsList[0];
}