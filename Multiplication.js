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
function setLimit(id){
  if(id==="js-column-matrix1")
    document.getElementById("js-row-matrix2").value=document.getElementById("js-column-matrix1").value;
  else if(id==="js-row-matrix2")
    document.getElementById("js-column-matrix1").value=document.getElementById("js-row-matrix2").value;
}
function check(i,j,row,column,key,n){
  if(key==="Enter"){
    if(i===row-1&&j===column-1){
      if(checkInput(n)){
        if(Number(n)===1)
          document.getElementById(`0,0,2`).focus();
        else
          solve();}}
    else
      movement(i,j,row,column,"ArrowRight",n);}
  else if(key==="ArrowUp"||key==="ArrowDown"||key==="ArrowLeft"||key==="ArrowRight")
    movement(i,j,row,column,key,n)
  else if(key==="Backspace"&&document.getElementById(`${i},${j},${n}`).value===""){
    movement(i,j,row,column,"ArrowLeft",n);
    event.preventDefault();}
  else if(key!=="0"&&key!=="1"&&key!=="2"&&key!=="3"&&key!=="4"&&key!=="5"&&key!=="6"&&key!=="7"&&key!=="8"&&key!=="9"&&key!=="/"&&key!=="-"&&key!=="Backspace")
    event.preventDefault();
  document.getElementById(i+","+j+","+n).style.boxShadow="";
}
function movement(i,j,row,column,key,n){
  i=Number(i);
  j=Number(j);
  row=Number(row);
  column=Number(column);
  n=Number(n);
  if(key==="ArrowUp"){
    if(n===2&&i===0&&j===0)
      document.getElementById(`${document.getElementById("js-row-matrix1").value-1},${document.getElementById("js-column-matrix1").value-1},1`).focus();
    if(i!==0)
      document.getElementById(`${i-1},${j},${n}`).focus();}
  if(key==="ArrowDown"){
    if(n===1&&i===row-1&&j===column-1)
      document.getElementById(`0,0,2`).focus();
    if(i!==row-1)
      document.getElementById(`${i+1},${j},${n}`).focus();}
  if(key==="ArrowLeft"){
    if(document.getElementById(`${i},${j},${n}`).selectionStart===0){
    if(n===2&&i===0&&j===0)
      document.getElementById(`${document.getElementById("js-row-matrix1").value-1},${document.getElementById("js-column-matrix1").value-1},1`).focus();
    if(j!==0)
      document.getElementById(`${i},${j-1},${n}`).focus();
    else if(i!==0)
      document.getElementById(`${i-1},${column-1},${n}`).focus();
      event.preventDefault();}}
  if(key==="ArrowRight"){
    if(document.getElementById(`${i},${j},${n}`).selectionStart===document.getElementById(`${i},${j},${n}`).value.length){
    if(n===1&&i===row-1&&j===column-1)
      document.getElementById(`0,0,2`).focus();
    if(j!==column-1)
      document.getElementById(`${i},${j+1},${n}`).focus();
    else if(i!==row-1)
      document.getElementById(`${i+1},0,${n}`).focus();
      event.preventDefault();}}   
  }
function setMatrix(n){
  document.querySelector(".js-steps").innerHTML="";
  const row= Number(document.getElementById("js-row-matrix"+n).value);
  const column= Number(document.getElementById("js-column-matrix"+n).value);
  document.getElementById("js.input"+n).innerHTML=""
  let text="<div>";
  if(row!==0&&column!==0){
    for(let i=0;i<row;i++){
      for(let j=0;j<column;j++){
        let id=[i,j,n];
          text+=`<input class="matrix${n}-input" onkeydown="check(${i},${j},${row},${column},event.key,${n})" id="${id}" title="[${id[0]+1},${id[1]+1}]" >\n`;}
          text+=`<br>`
       }
       text+="</div>"
       text+=(n===1)?`<div class="solving-buttons"><button class="js-reset" onclick="reset(1)">Reset</button></div>`:`<div class="textcenter"><button class="js-reset" onclick="reset(2)">Reset</button></div><div class="solving-buttons">
       <button class="js-solve" onclick="if(checkInput(1) && checkInput(2)) solve();">Solve</button><button class="js-reset" onclick="reset3()">Reset All</button>`;
       document.getElementById("js.input"+n).innerHTML+=text;
      }
    }
function checkInput(n){
  const row= Number(document.getElementById("js-row-matrix"+n).value);
  const column= Number(document.getElementById("js-column-matrix"+n).value);
    let flag=true
    let errors="Please enter a valid input at: ";
    for(let i=0;i<row;i++)
      for(let j=0;j<column;j++){
        let stringForm=document.getElementById(`${i},${j},${n}`).value;
        let dash=0;
        let end=0;
        let error=""
        if(stringForm.length===0){
          error=` [${i+1},${j+1}] `;
          flag=false;
          errors+=error;
          document.getElementById(i+","+j+","+n).style.boxShadow="0px 0px 10px inset red";
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
              document.getElementById(i+","+j+","+n).style.boxShadow="0px 0px 10px inset red";
            }
          }
            else{
              let temp=new Fraction(Number(stringForm.substring(0,end)));
              if(isNaN(temp.numerator)){
                error=` [${i+1},${j+1}] `;
                flag=false;
                errors+=error;
                document.getElementById(i+","+j+","+n).style.boxShadow="0px 0px 10px inset red";
              }
            } 
          }
        }
        if(!flag)
          alert(errors);
        return flag;
        }
function reset(n){
  setMatrix(n);}
function reset3(){
  reset(1);reset(2);
  document.querySelector(".js-solution").innerHTML="";
}
let productList=["test"];
function solve(){
  document.querySelector(".js-solution").innerHTML="";
  let matrix1=[];
  let matrix2=[];
  let stepsMatrix="";
  let info="";
  load();
  function load(){
    const row1= Number(document.getElementById("js-row-matrix1").value);
    const column1= Number(document.getElementById("js-column-matrix1").value);
    for(let i=0;i<row1;i++){
      let miniMatrix=[]
      for(let j=0;j<column1;j++){
        let stringForm=document.getElementById(`${i},${j},1`).value;
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
    matrix1.push(miniMatrix);
  }
   const row2= Number(document.getElementById("js-row-matrix2").value);
   const column2= Number(document.getElementById("js-column-matrix2").value);
   for(let i=0;i<row2;i++){
    let miniMatrix=[]
    for(let j=0;j<column2;j++){
      let stringForm=document.getElementById(`${i},${j},2`).value;
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
      matrix2.push(miniMatrix);
    }
  }
  let product=multiply();
  function multiply(){
    const row= Number(document.getElementById("js-row-matrix1").value);
    const column= Number(document.getElementById("js-column-matrix2").value);
    const limit= Number(document.getElementById("js-column-matrix1").value);
    let product=[];
    for(let i=0;i<row;i++){
      let miniProduct=[];
      for(let j=0;j<column;j++)
        miniProduct.push(new Fraction());
      product.push(miniProduct);}
      for(let k=0;k<row;k++){
        for(let i=0;i<column;i++){
          info=`[${k+1},${i+1}] =`
          for (let j=0;j<limit;j++){
            product[k][i]=product[k][i].add(matrix1[k][j].multiply(matrix2[j][i]));
            info+=` (${matrix1[k][j]} X ${matrix2[j][i]}) +`;}
          info=info.substring(0,info.length-1);
          stepsMatrix+=printStep(matrix1,matrix2,product,info);
          productList[0]=stepsMatrix;
        }
      }
      return product;
    }
  let tableString=`<a class="textstart">Product:</a><br><br>\n<div class="solution-table"><div class="absolute1"></div><div class="absolute2"></div>`;
  const productRow= Number(document.getElementById("js-row-matrix1").value);
  const productColumn= Number(document.getElementById("js-column-matrix2").value);
  for(let i=0;i<productColumn;i++){
    if(i===productColumn-1)
    tableString+=`<div class="lastcolumn">\n`;
    else
      tableString+=`<div class="column">\n`;
    for(let j=0;j<productRow;j++)
      tableString+=`<div class="row">${product[j][i]}</div>\n`;
    tableString+="</div>\n";
  }
  tableString+="</div>\n";
  document.querySelector(".js-solution").innerHTML+=tableString;
document.querySelector(".js-steps").innerHTML=`<div class="show-button"><button class="show-steps" onclick="steps()">Show steps</button></div>`;
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
function printStep(matrix1,matrix2,product,step){
  let tableString=`<div class="product"><div class="step-matrix"><div class="step-table"><div class="absolute1"></div><div class="absolute2"></div>`;
  for(let i=0;i<matrix1[0].length;i++){
    if(i===matrix1[0].length-1)
    tableString+=`<div class="lastcolumn">\n`;
    else
      tableString+=`<div class="column">\n`;
    for(let j=0;j<matrix1.length;j++)
        tableString+=`<div class="row">${matrix1[j][i]}</div>\n`;
    tableString+="</div>\n";
  }
  tableString+=`</div>\n<div class="between-text">X</div></div>`;
  tableString+=`<div class="step-matrix"><div class="step-table"><div class="absolute1"></div><div class="absolute2"></div>`;
    for(let i=0;i<matrix2[0].length;i++){
      if(i===matrix2[0].length-1)
      tableString+=`<div class="lastcolumn">\n`;
      else
        tableString+=`<div class="column">\n`;
      for(let j=0;j<matrix2.length;j++)
          tableString+=`<div class="row">${matrix2[j][i]}</div>\n`;
      tableString+="</div>\n";
    }
    tableString+=`</div>\n<div class="between-text">=</div></div>`;
    tableString+=`<div class="step-matrix"><div class="step-table"><div class="absolute1"></div><div class="absolute2"></div>`;
      for(let i=0;i<product[0].length;i++){
        if(i===product[0].length-1)
        tableString+=`<div class="lastcolumn">\n`;
        else
          tableString+=`<div class="column">\n`;
        for(let j=0;j<product.length;j++)
            tableString+=`<div class="row">${product[j][i]}</div>\n`;
        tableString+="</div>\n";
      }
      tableString+=`</div>\n<div class="between-text">${step}</div></div></div>`;
      return tableString;
}
function hideSteps(){
  document.querySelector(".js-steps").innerHTML=`<div class="show-button"><button class="show-steps" onclick="steps()">Show steps</button></div>`;}
function steps(){
  document.querySelector(".js-steps").innerHTML=`<div class="show-button"><button class="hide-steps" onclick="hideSteps()">Hide steps</button></div>`;
  document.querySelector(".js-steps").innerHTML+=productList[0];
}