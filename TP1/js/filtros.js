'use strict';
document.addEventListener("DOMContentLoaded", function(event) {
  var canvas = document.getElementById("miCanvas");
  var ctx = canvas.getContext("2d");
  var puntox = 0;
  var puntoy = 0;
  var ancho;
  var alto;
  var original;
  var masBlur = false;
  var masBril = false;
  

  document.querySelector('#inputFile').addEventListener('change', r => {     
    const FILE = document.querySelector('#inputFile').files[0];     
    const reader = new FileReader();     
    if (FILE) {         
      reader.readAsDataURL(FILE);     
    }     
    reader.addEventListener("load", function() {         
      let img = new Image();         
      img.src = reader.result;         
      img.onload = function() {             
          ancho = canvas.width;
          alto = canvas.height;
          ctx.drawImage(this, puntox, puntoy, ancho, alto); 
          original = ctx.getImageData(0,0,canvas.width,canvas.height);   
      }     
    }, false); 
  });

    $("#restaurar").on("click",function(){
      restaurar();
    });
    $("#limpiar").on("click",function(){
      limpiar();
    });
    $("#lapiz").on("click",function(){
      lapiz = true;
      goma = false;
      comenzar();
    });
    $("#goma").on("click",function(){
      goma = true;
      lapiz = false;
      comenzar();
    });
    $("#inverso").on("click",function(){
      invertir();
    });
    $("#grises").on("click",function(){
      grises();
    });
    $("#sepia").on("click",function(){
      sepia();
    });
    $("#blur").on("click",function(){
      masBlur = false;
      blur();
    });
    $("#blurMas").on("click",function(){
      masBlur = true;
      blur();
    });    
    $("#binario").on("click",function(){
      binario();
    });
    $("#saturar").on("click",function(){
      saturar();
    });
    $("#brillo").on("click",function(){
      masBril = false;
      brillo();
    });
    $("#brilloMas").on("click",function(){
      masBril = true;
      brillo();
    });
    

  function restaurar(){
    ctx.putImageData(original,0,0);
  }
  function limpiar(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function getRed(imageData,x,y){
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index];
  }

  function getGreen(imageData,x,y){
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index+1];
  }

  function getBlue(imageData,x,y){
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index+2];
  }

  function setPixel (imageData,x,y,r,g,b,a){
    let index = (x + y * imageData.width) * 4;
    imageData.data[index] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
  }

  //BLUR
  function blur(){
    if (!masBlur) {
      restaurar();
    }
    var filtro=[[1,1,1],[1,1,1],[1,1,1]];
    apFiltro(filtro,9);
  }

    function apFiltro(filtro, n){
    let copia = ctx.getImageData(0,0,canvas.width,canvas.height);
    
    for (let x=puntox+1; x < ancho-1; x++) {
      for (let y=puntoy+1 ; y < alto-1; y++){

        let red = Math.floor((getRed(copia,x-1,y-1) * filtro[0][0] + getRed(copia,x,y-1) * filtro[0][1] + getRed(copia,x+1,y-1) * filtro[0][2]+
                              getRed(copia,x-1,y) * filtro[1][0] + getRed(copia,x,y) * filtro[1][1] + getRed(copia,x+1,y) * filtro[1][2] +
                              getRed(copia,x-1,y+1) * filtro[2][0] + getRed(copia,x,y+1) * filtro[2][1] + getRed(copia,x+1,y+1) * filtro[2][2]) / n);
        let green = Math.floor((getGreen(copia,x-1,y-1) * filtro[0][0] + getGreen(copia,x,y-1) * filtro[0][1] + getGreen(copia,x+1,y-1) * filtro[0][2]+
                              getGreen(copia,x-1,y) * filtro[1][0] + getGreen(copia,x,y) * filtro[1][1] + getGreen(copia,x+1,y) * filtro[1][2] +
                              getGreen(copia,x-1,y+1) * filtro[2][0] + getGreen(copia,x,y+1) * filtro[2][1] + getGreen(copia,x+1,y+1) * filtro[2][2]) / n);
        let blue = Math.floor((getBlue(copia,x-1,y-1) * filtro[0][0] + getBlue(copia,x,y-1) * filtro[0][1] + getBlue(copia,x+1,y-1) * filtro[0][2]+
                              getBlue(copia,x-1,y) * filtro[1][0] + getBlue(copia,x,y) * filtro[1][1] + getBlue(copia,x+1,y) * filtro[1][2] +
                              getBlue(copia,x-1,y+1) * filtro[2][0] + getBlue(copia,x,y+1) * filtro[2][1] + getBlue(copia,x+1,y+1) * filtro[2][2]) / n);
        
        setPixel(copia , x, y, red, green, blue, 255);
      }
    }
    ctx.putImageData(copia,0,0);
  }

  function binario(){
    restaurar();
    let limite = 127;
    let copia = ctx.getImageData(0,0,canvas.width,canvas.height);
    for (let x=0 ; x < copia.width ; x++) {
      for (let y=0 ; y < copia.height ; y++){
        let red = getRed(copia, x, y);
        let green = getGreen(copia, x, y);
        let blue = getBlue(copia, x, y);
        let suma = red + green + blue;
        let color;

        if (suma<limite) {
          color = 0;
        }else{
          color = 255;
        }
        setPixel(copia , x, y, color, color, color, 255);
      }
    }
    ctx.putImageData(copia,0,0);
  }


  function sepia(){
    restaurar();
    var copia = ctx.getImageData(0,0,canvas.width,canvas.height);
    for (let x=0 ; x < copia.width ; x++) {
      for (let y=0 ; y < copia.height ; y++){
        let red = 0.393 * getRed(copia, x, y) + 0.769 * getGreen(copia, x, y) + 0.189 * getBlue(copia, x, y);
        let green = 0.349 * getRed(copia, x, y) + 0.686 * getGreen(copia, x, y) + 0.168 * getBlue(copia, x, y);
        let blue = 0.272 * getRed(copia, x, y) + 0.534 * getGreen(copia, x, y) + 0.131 * getBlue(copia, x, y);
          
        setPixel(copia , x, y, red, green, blue, 255);
      }
    }
    ctx.putImageData(copia,0,0);
  }

  function grises(){
    restaurar();
    let copia = ctx.getImageData(0,0,canvas.width,canvas.height);
    for (let x=0 ; x < copia.width ; x++) {
      for (let y=0 ; y < copia.height ; y++){
        let prom = 0.34 * getRed(copia, x, y) + 0.5 * getGreen(copia,x,y) + 0.16 * getBlue(copia,x,y);
        setPixel(copia , x, y, prom, prom, prom, 255);
      }
    }
    ctx.putImageData(copia,0,0);
  }

  function invertir(){
    restaurar();
    var copia = ctx.getImageData(0,0,canvas.width,canvas.height);
    for (let x=0 ; x < copia.width ; x++) {
      for (let y=0 ; y < copia.height ; y++){
        let red = 255 - getRed(copia, x, y);
        let green = 255 - getGreen(copia, x, y);
        let blue = 255 - getBlue(copia, x, y);
          
        setPixel(copia , x, y, red, green, blue, 255);
      }
    }
    ctx.putImageData(copia,0,0);
  }

  function brillo(){
    if (!masBril) {
      restaurar();
    }
    let copia = ctx.getImageData(0,0,canvas.width,canvas.height);
    const apBri = 30;
    for (let x=0 ; x < copia.width ; x++) {
      for (let y=0 ; y < copia.height ; y++){
        let red = getRed(copia, x, y) + apBri;
        let green = getGreen(copia, x, y) + apBri;
        let blue = getBlue(copia, x, y) + apBri;
          
        setPixel(copia , x, y, red, green, blue, 255);
      }
    }
    ctx.putImageData(copia,0,0);
  }


  let guardar = document.querySelector('#save');
  guardar.addEventListener('click',(e) => {
    let dir = canvas.toDataURL('image/jpg');
    guardar.href = dir;
  });


  //LAPIZ Y GOMA
  var dibujar;
  var lapiz = false;
  var goma = false;

  function comenzar(){
    document.addEventListener('mousedown',clickMouse,false);
    document.addEventListener('mousemove',moverMouse,false);
    document.addEventListener('mouseup',sueltaMouse,false);
  }

  function clickMouse(e){
    dibujar = true;
    ctx.beginPath();
    ctx.moveTo(e.layerX,e.layerY);
  }

  function moverMouse(e){
    let tamano = 5;
    let color;
    if (lapiz) {
      color = '#000000';
    }else if(goma){
      color = "#FFFFFF";
    }
    if(dibujar){
      ctx.lineWidth = tamano;
      ctx.strokeStyle = color;
      ctx.lineTo(e.layerX, e.layerY);
      ctx.stroke();
    }
  }

  function sueltaMouse(e){
      ctx.closePath();
      dibujar = false;
    }

    function saturar() {
      restaurar();
      let copia = ctx.getImageData(0,0,canvas.width,canvas.height);
      let r = 0;
      let g = 0;
      let b = 0;
      const apBri = 30;
      let dato;
      for (let x = 0; x < copia.width; x++) {
          for (let y = 0; y < copia.height; y++) {
              r = getRed(copia, x, y) + apBri;
              g = getGreen(copia, x, y) + apBri;
              b = getBlue(copia, x, y) + apBri;
              dato = rgbToHsv(r, g, b);
              dato = hsvToRgb(dato.h, 1, dato.v);


              setPixel(copia, x, y, dato.r, dato.g, dato.b, 255);
          }
      }
      ctx.putImageData(copia, 0, 0);
  }

  function rgbToHsv(r, g, b) {

      var h;
      var s;
      var v;

      var maxColor = Math.max(r, g, b);
      var minColor = Math.min(r, g, b);
      var delta = maxColor - minColor;

      // Calculate hue
      // To simplify the formula, we use 0-6 range.
      if (delta == 0) {
          h = 0;
      } else if (r == maxColor) {
          h = (6 + (g - b) / delta) % 6;
      } else if (g == maxColor) {
          h = 2 + (b - r) / delta;
      } else if (b == maxColor) {
          h = 4 + (r - g) / delta;
      } else {
          h = 0;
      }
      // Then adjust the range to be 0-1
      h = h / 6;

      // Calculate saturation
      if (maxColor != 0) {
          s = delta / maxColor;
      } else {
          s = 0;
      }

      // Calculate value
      v = maxColor / 255;

      return { h: h, s: s, v: v };
  };

  function hsvToRgb(h, s, v) {
      var r, g, b, i, f, p, q, t;
      if (arguments.length === 1) {
          s = h.s, v = h.v, h = h.h;
      }
      i = Math.floor(h * 6);
      f = h * 6 - i;
      p = v * (1 - s);
      q = v * (1 - f * s);
      t = v * (1 - (1 - f) * s);
      switch (i % 6) {
          case 0:
              r = v, g = t, b = p;
              break;
          case 1:
              r = q, g = v, b = p;
              break;
          case 2:
              r = p, g = v, b = t;
              break;
          case 3:
              r = p, g = q, b = v;
              break;
          case 4:
              r = t, g = p, b = v;
              break;
          case 5:
              r = v, g = p, b = q;
              break;
      }
      return {
          r: Math.round(r * 255),
          g: Math.round(g * 255),
          b: Math.round(b * 255)
      };
  }
});  