mainApp.controller("contactController", function($http, $scope){

	var getUrl = "http://localhost:8085/api/contacts";

	$scope.cont = {
		"_id": "",
		"name": "",
		"email": "",
		"phoneNumber": "",
		"address": "",
		"gender": ""
	};

	$http.get(getUrl).success(function(response){
		$scope.contacts = response;
	});

	$scope.deleteContact = function(id){
		var deleteUrl = "http://localhost:8085/api/contact/"+id;
		$http.delete(deleteUrl).success(function(response){
			$http.get(getUrl).success(function(response){
				$scope.contacts = response;
			});
		});
	};

	$scope.editContact = function (id) {
		
		$scope.contacts.forEach(function(item){
			if(item._id == id){

				$scope.cont = {
					"_id": item._id,
					"name": item.name,
					"email": item.email,
					"phoneNumber": item.phoneNumber,
					"address": item.address,
					"gender": item.gender
				};
			}
		});
	};

	$scope.editContactAction = function (id){
		var editUrl = "http://localhost:8085/api/contact/"+id;
		$http.put(editUrl, $scope.cont).success(function(response){
			if(response.status == "failure"){
				document.getElementById("notifications").innerHTML = "Cannot Edit Contact!!";
			}
			else{
				$http.get(getUrl).success(function(response){
					$scope.contacts = response;
				document.getElementById("notifications").innerHTML = "Contact Edited Successfully!!";

				});
			}
		});

		$scope.cont = {};
	}

	$scope.createContact = function(){
		$scope.cont = {};
	};

	$scope.createContactAction = function(){
		postUrl = "http://localhost:8085/api/contacts";
		$http.post(postUrl, $scope.cont).success(function(response){
			if(response.status == 'failure'){
				document.getElementById("notifications").innerHTML = "Cannot Create Contact!!";
				
			}
			else{
				$http.get(getUrl).success(function(response){
					$scope.contacts = response;
					document.getElementById("notifications").innerHTML = "Contact Created Successfully!!";
				});
			}



		});
					$scope.cont = {};
	}

});