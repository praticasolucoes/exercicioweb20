angular.module("listatelefonica").controller("listatelefonicaCtrl",function($scope,agendaApi,$modal,$log){
           $scope.app ="Lista Telefonica";
		   $scope.dataAtual = new Date();
           $scope.contatos = [];
           $scope.operadoras = [];
		
	
	$scope.open = function (contato) {
   
    var modalInstance = $modal.open({
      animation: true ,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: null,
      resolve: {
        items: function () {
          return contato;
        } ,
		operadoras : function () {
		  return $scope.operadoras;
		}  
      }
    });
		
	modalInstance.result.then(function () {
       carregarContatos();
    }, function () {
       
    });
  };	
		var carregarOperadoras = function ()  {
			   agendaApi.getOperadoras().success( function(data){
				 $scope.operadoras = data;
			  }).error( function(data){
			     console.log("erro de dados " + data);
			  });
		   };
		
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
		   
		   $scope.apagarContato = function (contato) {
		       agendaApi.deletaContatos(contato).success(function(data) {
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
		
angular.module('listatelefonica').controller('ModalInstanceCtrl', function ($scope, $modalInstance,agendaApi, items , operadoras) {

  $scope.contato = items;
  $scope.operadoras = operadoras;
  $scope.titulo = "Novo Contato";
  
  if ( items != undefined ) {
     $scope.titulo = "Alterar Contato";
  }
  $scope.adicionarContato = function (contato) {
            if ( items == undefined ) {  
		       agendaApi.saveContatos(contato).success (function(data){
				  delete $scope.contato;
			       $modalInstance.close();
			   });
             } else {
		       agendaApi.alteraContato(contato).success (function(data){
				  delete $scope.contato;
			       $modalInstance.close();
			   });
             }
           };
  $scope.ok = function () {
    $modalInstance.close();
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});		
		