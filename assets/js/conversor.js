(function(exports) {
  "use strict";

  function Medida(valor, tipo) { // Clase para almacenar medidas. Tipo es opcional, puede admitir new Medida("45.2 Km")

    if(valor && !tipo) {
      var reg_exp = XRegExp('^(?<valor_re> [+-]?\\d+(\\.\\d+)?([e][+-]?\\d+)?[ ]*) # valor \n' +
                            '(?<tipo_re> [a-zA-Z]+)                                # tipo  \n'                                     
                            , 'xi'); // Flags: x: allow comments and whitespaces.

      var match = XRegExp.exec(valor, reg_exp);
      var unidad = match[0];
      this.valor = parseFloat(unidad);
      this.tipo = match[1];
    }
    else if(valor && tipo) {
      this.valor = valor;
      this.tipo = tipo;
    }
  }

  function Temperatura(valor, tipo) { // Clase para la creación de medidas de temperaturas. Herencia de Medida.

    Medida.call(this, valor, tipo); // Herencia de la clase Medida.
  }

  Temperatura.prototype = new Medida(); // Necesario para realizar la herencia.
  Temperatura.prototype.constructor = Temperatura;

  function Celsius(valor) { // Clase para la creación de medidas Celsius. Herencia de Temperatura.

    Temperatura.call(this, valor); // Herencia de la clase Temperatura.
  }

  Celsius.prototype = new Temperatura(); // Necesario para realizar la herencia.
  Celsius.prototype.constructor = Celsius;

  Celsius.prototype.toFahrenheit = function () {
    var result = (this.valor * 9/5)+32;
    return result;
  }

  Celsius.prototype.toKelvin = function () {
    var result = this.valor + 273.15;
    return result;
  }

  function Fahrenheit(valor) { // Clase para la creación de medidas Fahrenheit. Herencia de Temperatura.

    Temperatura.call(this, valor); // Herencia de la clase Temperatura.
  }

  Fahrenheit.prototype = new Temperatura(); // Necesario para realizar la herencia.
  Fahrenheit.prototype.constructor = Fahrenheit;

  Fahrenheit.prototype.toCelsius = function () {
    var result = (this.valor - 32) * 5/9;
    return result;
  }

  Fahrenheit.prototype.toKelvin = function () {
    var result = ((this.valor - 32) / (9/5)) + 273.15;
    return result;
  }

  function Kelvin(valor) { // Clase para la creación de medidas Kelvin. Herencia de Temperatura.

    Temperatura.call(this, valor); // Herencia de la clase Temperatura.
  }

  Kelvin.prototype = new Temperatura(); // Necesario para realizar la herencia.
  Kelvin.prototype.constructor = Kelvin;

  Kelvin.prototype.toCelsius = function () {
    var result = this.valor - 273.15;
    return result;
  }

  Kelvin.prototype.toFahrenheit = function () {
    var result = ((this.valor - 273.15) * 9/5) + 32;
    return result;
  }

  exports.Temperatura = Temperatura;
  exports.Celsius = Celsius;
  exports.Fahrenheit = Fahrenheit;
  exports.Kelvin = Kelvin;

  exports.convertir = function() {
    var valor = document.getElementById('convert').value,
    elemento = document.getElementById('converted');

    var temperaturas = "(([fF](?:[aA](?:[hH](?:[rR](?:[eE](?:[nN](?:[hH](?:[eE](?:[iI](?:[tT])?)?)?)?)?)?)?)?)?)" +
                       "|([cC](?:[eE](?:[lL](?:[sS](?:[iI](?:[uU](?:[sS])?)?)?)?)?)?)" +
                       "|([kK](?:[eE](?:[lL](?:[vV](?:[iI](?:[nN])?)?)?)?)?))";

    var cadena = XRegExp('^(\\s*)                                            # espacios en blanco \n' +
                         '(?<unidad> [+-]?\\d+(\\.\\d+)?([e][+-]?\\d+)?[ ]*) # valor \n' +
                         '(?<tipo1> ' + temperaturas + ')                    # tipo 1 \n' +
                         '(?<to>[ ]+(?:to[ ]+)?)                             # to \n' +
                         '(?<tipo2> ' + temperaturas + ')                    # tipo 2 \n' +
                         '(\\s*)$                                            # espacios en blanco \n'
                       , 'xi'); // Flags: x: allow comments and whitespaces.

    valor = XRegExp.exec(valor, cadena); 

    if (valor) {
      var numero = valor.unidad,
          tipo_from = valor.tipo1.toLowerCase(),
          tipo_to = valor.tipo2.toLowerCase();
      
      numero = parseFloat(numero);
      console.log("Valor: " + numero + ", 1º Tipo: " + tipo_from + ", 2º Tipo: " + tipo_to);

      switch (tipo_from) {
        case 'c':
        var celsius = new Celsius(numero);
          if(tipo_to == 'f')
            elemento.innerHTML = celsius.toFahrenheit().toFixed(2) + " Fahrenheit";
          if(tipo_to == 'k')
            elemento.innerHTML = celsius.toKelvin().toFixed(2) + " Kelvin";
          if(tipo_to == 'c')
            elemento.innerHTML = numero + " Celsius";
        break;

        case 'f':
          var fahrenheit = new Fahrenheit(numero);
          if(tipo_to == 'c')
            elemento.innerHTML = fahrenheit.toCelsius().toFixed(2) + " Celsius";
          if(tipo_to == 'k')
            elemento.innerHTML = fahrenheit.toKelvin().toFixed(2) + " Kelvin";
          if(tipo_to == 'f')
            elemento.innerHTML = numero + " Fahrenheit";
        break;

        case 'k':
          var kelvin = new Kelvin(numero);
          if(tipo_to == 'f')
            elemento.innerHTML = kelvin.toFahrenheit().toFixed(2) + " Fahrenheit";
          if(tipo_to == 'c')
            elemento.innerHTML = kelvin.toCelsius().toFixed(2) + " Celsius";
          if(tipo_to == 'k')
            elemento.innerHTML = numero + " Kelvin";
        break;

        default:
            elemento.innerHTML = "undefined";  
      }
    }
    else
      elemento.innerHTML = "ERROR! Try something like '4F to K or 50e1K C' instead";
    }
})(this);
