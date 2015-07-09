angular.module("listatelefonica").directive("telefone",function(){
  return {
     require: 'ngModel', 
	 link: function (scope,elem, attrs,ctrl ) {
	    elem.on('change',function() {
		   console.log("alterou");
		});
	 
	    ctrl.$validators.telefone = function (modelValue,viewValue) {
		    
		   return true;
		};
     }
  };
});