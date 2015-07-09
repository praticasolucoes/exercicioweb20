angular.module("listatelefonica").directive("ngPainel",function(){
  return {
     templateUrl:"painel.html",
	 replace:true,
	 restrict:"E",
	 scope:{
	   mensagem:"@mensagem"
	 }
	 
  };
});