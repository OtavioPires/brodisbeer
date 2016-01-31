'use strict';

var meuApp = angular.module('brodisbeer');

meuApp.service('customerService', ['$http', function ($http) {
	
	this.getCustomers = function () {
		return $http.get("/customer");
	}

	this.getOneCustomer = function (id) {
		return $http.get("/customer/"+id);
	}

	this.setCustomer = function (customer) {
		return $http.post("/customer", customer);
	}

	this.rmvCustomer = function (id) {
		return $http.delete("/customer/"+id);
	}

	this.updCustomer = function (id, customer) {
		return $http.put("/customer/"+id, customer);
	}
}]);