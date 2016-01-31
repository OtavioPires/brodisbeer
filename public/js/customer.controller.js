angular.module('brodisbeer', ['ui.router', 'ngMask', 'ngAnimate'])

.controller('CustomerListCtrl', ['$scope', 'customerService', '$rootScope', function ($scope, customerService, $rootScope){

  $scope.customers = [];

  var carregarCustomers = function () {
    customerService.getCustomers().success(function  (response) {
      $scope.customers = response;
      console.log(response);
    });
  } 

  $scope.deleteCustomer = function (customers) {
    var customersParaRmv = customers.filter(function  (customer) {
      if (customer.selecionado) return customer;
    });
    customersParaRmv.forEach(function  (customer) {
      customerService.rmvCustomer(customer._id).success(function (response){
        console.log(customer.nome + " Deletado com Sucesso")
      });
    });
    carregarCustomers();
  }

  $scope.editarCustomer = function (id) {
    customerService.getOneCustomer(id).success(function  (response) {
      $rootScope.customer = response;
      document.getElementById("btn-add").style.display = "none";
      document.getElementById("btn-upd").style.display = "inline";

    });
  }

  $scope.hasCustomersSelecionados = function (customers) {
    return customers.some(function (customer) {
      return customer.selecionado;
    });
  }

  $scope.ordenarPor = function  (campo) {
    $scope.criterioOrdenamento = campo;
    $scope.direcaoOrdenamento = !$scope.direcaoOrdenamento;
  }

  carregarCustomers();

}])

.controller('CustomerAddCtrl', ['$scope', 'customerService' ,'$rootScope', function ($scope, customerService, $rootScope){

    $scope.adicionaCustomer = function (customer) {
    customer.data = new Date();
    customerService.setCustomer(customer).success(function (response){
      delete $scope.customer;
      $scope.customerForm.$setPristine();
    });
  }

    $scope.atualizarCustomer = function (customer) {
    customerService.updCustomer(customer._id, customer).success(function  (response) {
      console.log(response + " Atualizado com sucesso.");
      delete $rootScope.customer;
      $scope.customerForm.$setPristine();
      
    });
  }

  document.getElementById("btn-upd").style.display = "none";
  document.getElementById("btn-add").style.display = "inline";
  
}])

.controller('CustomerGetCtrl', ['$scope', 'customerService' , '$stateParams', function ($scope, customerService, $stateParams ){
  var id = $stateParams.foo;

  customerService.getOneCustomer(id).success(function (response){
    $scope.customer = response;
    console.log("Obejto Retornado: "+ response.nome);
  });

}])

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/addcustomer");

  $stateProvider
    .state('addcustomer', {
      url: "/addcustomer",
      templateUrl: "template/form_customers.html",
      controller: "CustomerAddCtrl"
    })

    .state('getcustomer', {
      url: "/getcustomer/:foo",
      templateUrl: "template/get_customer.html",
      controller: "CustomerGetCtrl"
    })

    .state('listcustomer', {
      url: "/listcustomer",
      templateUrl: "template/list_customers.html",
      controller: "CustomerListCtrl"
    });
});
