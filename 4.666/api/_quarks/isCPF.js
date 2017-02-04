'use strict';

module.exports = (value) => {

  const isEmpty = require('./isEmpty')(value);
  if(isEmpty) return false;

  const isString = require('./isString')(value);
  if(!isString) return false;


  let campos = value.split('');
  let colunas = [];

  const arrayPrimeiroDig = ['10','9','8','7','6','5','4','3','2'];
  const primeiroDig = 2;

  const arraySegundoDig = ['11','10','9','8','7','6','5','4','3','2'];
  const segundoDig = 1;

  if(value.length != 11) return false;
  if(value == '00000000000') return false;


  const verificaDigito = (campos , colunas , arrayVerificador,numDigito) => {

    for(let i = 0; i < arrayVerificador.length; i++) {
      colunas[i] = campos[i] * arrayVerificador[i];
    }

    let soma = 0;

    colunas.forEach((valor) => {
      soma = valor + soma;
    });

    let resto = soma % 11;
    let digitoVerificador = null;

    if(resto < 2) {
      digitoVerificador = 0;
    } else {
      digitoVerificador = 11 - resto;
    }

    let digito = campos.length - numDigito;

    if(digitoVerificador == campos[digito])
      return true;
    return false;
  }

  let valorPrimeiro = verificaDigito(campos,colunas,arrayPrimeiroDig,primeiroDig);
  let valorSegundo = verificaDigito(campos,colunas,arraySegundoDig,segundoDig);

  if(valorPrimeiro && valorSegundo)
    return true;
  return false;

}
