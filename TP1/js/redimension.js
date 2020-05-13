//window.onload = function() {
//$(document).on("ready",function() {
  

var canvas = document.getElementById("miCanvas");
var ctx = canvas.getContext("2d");
var puntox = 0;
var puntoy = 0;
var ancho;
var alto;
var original;

document.querySelector('#inputFile').addEventListener('change', r => {     
  const FILE = document.querySelector('#inputFile').files[0];     
  const reader = new FileReader();     
  if (FILE) {         
    reader.readAsDataURL(FILE);     
  }     
  reader.addEventListener("load", function() {         
    img = new Image();         
    img.src = reader.result;         
    img.onload = function() {             
      var escalar = img.width/canvas.width; 
        canvas.width = this.width/escalar; 
        ancho = canvas.width;
        canvas.height = this.height/escalar; 
        alto = canvas.height
        ctx.drawImage(this, puntox, puntoy, ancho, alto); 
        var obtener = ctx.getImageData(0,0,canvas.width,canvas.height);
        original = obtener.data;             
      //$("#collapseCanvas").collapse('show');         
    }     
  }, false); 
});



// var img = new Image();
// img.src ='images/paisaje.jpg';

//ctx.drawImage(img, 0, 0);





  $("#inverso").on("click",function(){
    invertir(canvas, ctx);
  })
  $("#grises").on("click",function(){
    grises(canvas, ctx);
  })
  $("#sepia").on("click",function(){
    sepia(canvas, ctx);
  })
  $("#blur").on("click",function(){
    blur();
  })
  $("#otro").on("click",function(){
    byn(canvas, ctx);
  })

function getRed(imageData,x,y){
  index = (x + y * imageData.width * 4);
  return imageData.data[index];
}

function getGreen(imageData,x,y){
  index = (x + y * imageData.width * 4);
  return imageData.data[index+1];
}

function getBlue(imageData,x,y){
  let index = (x + y * imageData.width * 4);
  return imageData.data[index+2];
}

function setPixel (imageData,x,y,r,g,b,a){
  let index = (x + y * imageData.width * 4);
  imageData.data[index] = r;
  imageData.data[index+1] = g;
  imageData.data[index+2] = b;
  imageData.data[index+3] = a;
}

function byn(canvas, ctx){
  var obtener = ctx.getImageData(0,0,canvas.width,canvas.height);
     for (y=puntoy ; y < alto; y++){
      for (x = puntox; x < ancho; x++) {
        var bn = Math.floor(getRed(obtener,x,y) + getGreen(obtener,x,y) + getBlue(obtener,x,y)/3);
        setPixel(obtener, x, y, bn, bn, bn, 255);
      }
    }
    ctx.putImageData(obtener,0,0);
}

//BLUR

function blur(){
  console.log("llegue blur");
  var filtro=[[1,1,1],[1,1,1],[1,1,1]];
  apFiltro(filtro,9)
}


function apFiltro(filtro, n){
  var obtener = ctx.getImageData(0,0,canvas.width,canvas.height);
  var copia = obtener;
  console.log(puntoy + puntox);
  for (y=puntoy ; y < alto; y++){
    for (x=puntox; x < ancho; x++) {
      var red = Math.floor((getRed(copia,x-1,y-1) * filtro[0][0] + getRed(copia,x,y-1) * filtro[0][1] + getRed(copia,x+1,y+1) * filtro[0][2]+
                            getRed(copia,x-1,y) * filtro[1][0] + getRed(copia,x,y) * filtro[1][1] + getRed(copia,x+1,y) * filtro[1][2] +
                            getRed(copia,x-1,y+1) * filtro[2][0] + getRed(copia,x,y+1) * filtro[2][1] + getRed(copia,x+1,y+1) * filtro[2][2]) / n);
      var green = Math.floor((getGreen(copia,x-1,y-1) * filtro[0][0] + getGreen(copia,x,y-1) * filtro[0][1] + getGreen(copia,x+1,y+1) * filtro[0][2]+
                            getGreen(copia,x-1,y) * filtro[1][0] + getGreen(copia,x,y) * filtro[1][1] + getGreen(copia,x+1,y) * filtro[1][2] +
                            getGreen(copia,x-1,y+1) * filtro[2][0] + getGreen(copia,x,y+1) * filtro[2][1] + getGreen(copia,x+1,y+1) * filtro[2][2]) / n);
      var blue = Math.floor((getBlue(copia,x-1,y-1) * filtro[0][0] + getBlue(copia,x,y-1) * filtro[0][1] + getBlue(copia,x+1,y+1) * filtro[0][2]+
                            getBlue(copia,x-1,y) * filtro[1][0] + getBlue(copia,x,y) * filtro[1][1] + getBlue(copia,x+1,y) * filtro[1][2] +
                            getBlue(copia,x-1,y+1) * filtro[2][0] + getBlue(copia,x,y+1) * filtro[2][1] + getBlue(copia,x+1,y+1) * filtro[2][2]) / n);
      

      setPixel(copia, x, y, red, green, blue, 255);
    }
  }
  ctx.putImageData(copia,0,0);
}


//FALTA TERMINAR
function binarizacion(canvas,ctx){
  var obtener = ctx.getImageData(0,0,canvas.width,canvas.height);
  var copia = obtener.data;
  let limite = 127;
    for (var i=0 ; i < copia.length; i+=4){
      copia[i] = 0.393 * copia[i] + 0.769 * copia[i+1] + 0.189 * copia[i+2];
      copia[i+1] = 0.349 * copia[i] + 0.686 * copia[i+1] + 0.168 * copia[i+2];
      copia[i+2] = 0.272 * copia[i] + 0.534 * copia[i+1] + 0.131 * copia[i+2];
    }
    ctx.putImageData(obtener,0,0);
}

function sepia(canvas, ctx){
    var obtener = ctx.getImageData(0,0,canvas.width,canvas.height);
    var copia = obtener.data;
    console.log(copia.length);
    for (var i=0 ; i < copia.length; i+=4){
      copia[i] = 0.393 * copia[i] + 0.769 * copia[i+1] + 0.189 * copia[i+2];
      copia[i+1] = 0.349 * copia[i] + 0.686 * copia[i+1] + 0.168 * copia[i+2];
      copia[i+2] = 0.272 * copia[i] + 0.534 * copia[i+1] + 0.131 * copia[i+2];
    }
    ctx.putImageData(obtener,0,0);
}

function grises(canvas, ctx){
  var obtener = ctx.getImageData(0,0,canvas.width,canvas.height);
  var copia = obtener.data;
  for (var i=0 ; i < copia.length; i+=4){
    var prom = 0.34 * copia[i] + 0.5 * copia[i+1] + 0.16 * copia[i+2];
    copia[i] = prom;
    copia[i+1] = prom;
    copia[i+2] = prom;
  }
  ctx.putImageData(obtener,0,0);
}

function invertir(canvas, ctx){
  var obtener = ctx.getImageData(0,0,canvas.width,canvas.height);
  var copia = obtener.data;
  console.log(obtener.data);
  for (var i=0 ; i < copia.length; i+=4){
    copia[i] = 255 - copia[i];
    copia[i+1] = 255 - copia[i+1];
    copia[i+2] = 255 - copia[i+2];
  }
  ctx.putImageData(obtener,0,0);
}

let guardar = document.querySelector('#save');
guardar.addEventListener('click',(e) => {
  let dir = canvas.toDataURL('image/jpg');
  guardar.href = dir;
})


  




// if(ctx){
  //   //Creo una imagen conun objeto Image de Javascript
  //   var img = new Image();
  //   //indico la URL de la imagen
  //   img.src = img.src ='descarga.jpg';
  //   //defino el evento onload del objeto imagen
  //   img.onload = function(){
  //      //incluyo la imagen en el canvas escala muy pequeña
  //      ctx.drawImage(img, 10, 10, 40 , 24);
  //      //un poco mayor
  //      ctx.drawImage(img, 70, 10, 70 , 38);
  //      //tamaño natural
  //      ctx.drawImage(img, 160, 20);
  //   }
  // }






//}
//});