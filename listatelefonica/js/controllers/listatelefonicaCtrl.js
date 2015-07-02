angular.module("listatelefonica").controller("listatelefonicaCtrl",function($scope,agendaApi){
           $scope.app ="Lista Telefonica";
		   $scope.dataAtual = new Date();
           $scope.contatos = [];
           $scope.operadoras = [];
		   var carregarContatos = function () {
		      agendaApi.getContatos().success( function(data){
				 var _alt = data.map(function(contato){
                    contato.selecionado = false ;
					return contato;
				 });  
								  
				 $scope.contatos = _alt;
				
			  }).error( function(data){
			     console.log("erro de dados " + data);
			  
			  });
		   };
		   var carregarOperadoras = function ()  {
			   agendaApi.getOperadoras().success( function(data){
				 $scope.operadoras = data;
			  }).error( function(data){
			     console.log("erro de dados " + data);
			  });
		   }
           $scope.adicionarContato = function (contato) {
		       agendaApi.saveContatos(contato).success (function(data){
				  delete $scope.contato;
			      carregarContatos();
			      $scope.contatoForm.$setPristine();   
			   });
               
           };
           $scope.apagarContatos = function (contatos) {
			   var  _contatos =  contatos.filter(function(contato) {
                  if (contato.selecionado) return contato ;  
           	   });
			   console.log(_contatos);
			   agendaApi.deletaContatos(_contatos).success(function(data) {
				  carregarContatos(); 
			   });
           	   
           };
           $scope.contatosSelecioados = function (contatos ) {
               return !contatos.some(function(contato ){
                   return contato.selecionado;
               });
           };
		   carregarContatos();
		   carregarOperadoras();
	    });