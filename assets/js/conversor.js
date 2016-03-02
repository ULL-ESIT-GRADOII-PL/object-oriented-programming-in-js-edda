(function(exports) {
  "use strict";

  function Medida(valor, tipo) { // Clase para almacenar medidas. Tipo es opcional, puede admitir new Medida("45.2 Km")
    if (tipo == undefined) {
      var palabras = valor.split(" ");
      valor = palabras[0];
      tipo = palabras[1];
    }
    else {
      valor = valor;
      tipo = tipo;
    }
  }
  
  function Temperatura(valor, tipo)
  {
    /* tipo es opcional. Debería admitir new Medida("45.2 F") */
  }
  
  function Celsius(valor)
  {
  }
  
  function Farenheit(valor)
  {
  }
  
  exports.Temperatura = Temperatura;
  exports.Celsius = Celsius;
  exports.Farenheit = Farenheit;

  exports.convertir = function() {
    var valor     = document.getElementById('convert').value,
        elemento  = document.getElementById('converted'),
        /* Extienda la RegeExp a la especificación. use una XRegExp */
        regexp    = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([a-z,A-Z]+)\s*$/i;
    valor     = valor.match(regexp);
    
    if (valor) {
      var numero = valor[1],
          tipo   = valor[2].toLowerCase();
      
      numero = parseFloat(numero);
      console.log("Valor: " + numero + ", Tipo: " + tipo);
      
      switch (tipo) {
        case 'c':
          var celsius = new Celsius(numero);
          elemento.innerHTML = celsius.toFarenheit().toFixed(2) + " Farenheit";
          break;
        case 'f':
          var farenheit = new Farenheit(numero);
          elemento.innerHTML = farenheit.toCelsius().toFixed(2) + " Celsius";
          break;
        
        default:
          /* rellene este código */
      }
    }
    else
      elemento.innerHTML = "";
  };
})(this);
