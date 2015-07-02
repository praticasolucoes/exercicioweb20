angular.module("listatelefonica").factory("agendaApi",function($http,config){
   var _getContatos  = function () {
       return  $http.get(config.baseUrl + "/contato");
   };
   var _saveContatos = function (contato) {
	   return $http.put(config.baseUrl + "/contato",contato);
   }
   var _getOperadoras  = function () {
       return  $http.get(config.baseUrl + "/contato/operadoras");
   };
   var _deletaContatos = function (contato) {
	   return $http.delete(config.baseUrl + "/contato/"+ contato.codigo);
   }
   return {
      getContatos: _getContatos,
	  saveContatos:_saveContatos,
	  getOperadoras:_getOperadoras,
	  deletaContatos:_deletaContatos
   };
});