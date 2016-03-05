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

  function Temperatura(valor, tipo) { // Clase para la creación de medidas de temperaturas. Herencia de Medida.

    Medida.call(this, valor, tipo); // Herencia de la clase Medida.
  }

  function Celsius(valor) { // Clase para la creación de medidas Celsius. Herencia de Temperatura.


    Temperatura.call(this, valor); // Herencia de la clase Temperatura.
  }

  function Farenheit(valor) { // Clase para la creación de medidas Farenheit. Herencia de Temperatura.

    Temperatura.call(this, valor); // Herencia de la clase Temperatura.
  }

  function Kelvin(valor) { // Clase para la creación de medidas Kelvin. Herencia de Temperatura.

    Temperatura.call(this, valor); // Herencia de la clase Temperatura.
  }
  Fahrenheit.prototype.toCelsius = function () {
    var result = (this.valor - 32) * 5/9;
    return result;
  };

  Fahrenheit.prototype.toKelvin = function () {
    var result = ((this.valor - 32) / (9/5)) + 273.15;
    return result;
  };
    Kelvin.prototype.toCelsius = function () {
      var result = this.valor - 273.15;
      return result;
    };

    Kelvin.prototype.toFahrenheit = function () {
      var result = ((this.valor - 273.15) * 9/5) + 32;
      return result;
    };
    Celsius.prototype.toFahrenheit = function () {
      var result = (this.valor * 9/5)+32;
      return result;
    };

    Celsius.prototype.toKelvin = function () {
      var result = this.valor + 273.15;
      return result;
    };

  Temperatura.prototype = new Medida(); // Necesario para realizar la herencia.
  Temperatura.prototype.constructor = Temperatura;
  Celsius.prototype = new Temperatura(); // Necesario para realizar la herencia.
  Celsius.prototype.constructor = Celsius;
  Farenheit.prototype = new Temperatura(); // Necesario para realizar la herencia.
  Farenheit.prototype.constructor = Farenheit;
  Kelvin.prototype = new Temperatura(); // Necesario para realizar la herencia.
  Kelvin.prototype.constructor = Kelvin;

  exports.Temperatura = Temperatura;
  exports.Celsius = Celsius;
  exports.Farenheit = Farenheit;
  exports.Kelvin = Kelvin;

  exports.convertir = function() {
    var valor     = document.getElementById('convert').value,
        elemento  = document.getElementById('converted'),
        var cadena = XRegExp('^(?<valor>[+-]?\\d+(\\.\\d+)?([e][+-]?\\d+)?[ ]*) # valor  \n\
                           (?<valor_1>[a-z]+)         #valor_1 \n\
                           (?<to>[ ]+(?:to[ ]+)?)     # to_ \n\
                           (?<valor_2>[a-z]+)[ ]*$        #valor_2', 'xi');
               var match = XRegExp.exec(valor, cadena);
               if (valor) {
                 var numero = valor.val,
                     tipo   = valor.tip.toLowerCase(),
                     destino = valor.para.toLowerCase();
                 numero = parseFloat(numero);
                 console.log("Valor: " + numero + ", Tipo: " + tipo + ", To: " + destino);


 switch (tipo) {

            case 'f':
               var fahrenheit = new Fahrenheit(numero);
               if(destino == 'f')
               elemento.innerHTML = numero.toFixed(2) + " Fahrenheit";
               if(destino == 'c')
               elemento.innerHTML = fahrenheit.toCelsius().toFixed(2) + " Celsius";
                if(destino == 'k')
               elemento.innerHTML = fahrenheit.toKelvin().toFixed(2) + " Kelvin";
                 break;
            case 'k':
                var kelvin = new Kelvin(numero);
                  if(destino == 'k')
                 elemento.innerHTML = numero.toFixed(2) + " Kelvin";
                  if(destino == 'c')
                    elemento.innerHTML = kelvin.toCelsius().toFixed(2) + " Celsius";
                  if(destino == 'f')
                   elemento.innerHTML = kelvin.toFahrenheit().toFixed(2) + " Fahrenheit";
                     break;
                     case 'c':
                        var celsius = new Celsius(numero);
                        if(destino == 'c')
                          elemento.innerHTML = numero.toFixed(2) + " Celsius";
                        if(destino == 'f')
                         elemento.innerHTML = celsius.toFahrenheit().toFixed(2) + " Fahrenheit";
                        if(destino == 'k')
                         elemento.innerHTML = celsius.toKelvin().toFixed(2) + " Kelvin";
                          break;

             default:
                     elemento.innetHTML = ".";
                 }

               }
               else
                 elemento.innerHTML = "Introduzca una temperatura valida: 330e-1 F to C";
             }
})(this);
