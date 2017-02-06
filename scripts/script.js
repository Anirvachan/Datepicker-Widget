var datepickerModule = angular.module('customDatepicker', []);

datepickerModule.controller('datepickerController', ['$scope', function($scope) {

	var current = new Date();

	$scope.month = current.getMonth() + 1;
	$scope.date = current.getDate();
	$scope.year = current.getFullYear();
	$scope.dateObject = current;
	$scope.daysInMonth = {	
							0 : 31,
							1 : 28,
							2 : 31,
							3 : 30,
							4 : 31,
							5 : 30,
							6 : 31,
							7 : 31,
							8 : 30,
							9 : 31,
							10 : 30,
							11: 31
						};

	$scope.dateMatrix = {
		1: [],
		2: [],
		3: [],
		4: [],
		5: []
	}

	$scope.dayList = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	$scope.monthList = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

	$scope.$watchGroup(['month', 'date', 'year'], function(newDateElements, oldDateElements) {

		for(var index=1; index < 6; index ++) {
			$scope.dateMatrix[index] = [];
		}

		var days = 0;
		$scope.dateObject = new Date(newDateElements[2], newDateElements[0] - 1, newDateElements[1]);
		var firstDate = new Date(newDateElements[2], newDateElements[0] - 1, 1);
		var firstDay = firstDate.getDay();

		if ((newDateElements[2] % 4 === 0) && (newDateElements[0] === 2)) {
			days = 29;
		} else {
			days = $scope.daysInMonth[newDateElements[0]-1]
		}

		var lastPushedDate = 0;
		
		for (var i=0; i<5; i++) {

			if (i === 0) {
				for (var j = 0; j < firstDay; j++) {
					$scope.dateMatrix[i+1].push(0);
				}
			}
			while (($scope.dateMatrix[i+1].length < 7) && (lastPushedDate + 1 <= days)) {
				$scope.dateMatrix[i+1].push(lastPushedDate+1);
				lastPushedDate = lastPushedDate + 1;
			}
		};

		var pushedIndex = 0;

		while (lastPushedDate + 1 <= days) {

			$scope.dateMatrix[1][pushedIndex] = lastPushedDate + 1;

			lastPushedDate += 1;
			pushedIndex += 1;
		}

	})

	$scope.pickerShown = false;
	$scope.monthPickerShown = false;

	$scope.togglePicker = function() {
		$scope.pickerShown = !($scope.pickerShown);
	};

	$scope.increaseMonth = function() {
		if ($scope.month === 12) {
			$scope.month = 1;
			$scope.year += 1;
		} else {
			$scope.month += 1;
		}
	};

	$scope.decreaseMonth = function() {
		if ($scope.month === 1) {
			$scope.month = 12;
			$scope.year -=1;
		} else {
			$scope.month -= 1;
		}
	};

	$scope.monthPicker = function() {
		$scope.monthPickerShown = !($scope.monthPickerShown);
	};

	$scope.chooseMonth = function(month) {
		$scope.month = month
	};

	$scope.selectDate = function(dateVal) {
		$scope.date = dateVal;
	};

	$scope.resetDate = function() {
		var current = new Date();

		$scope.month = current.getMonth() + 1;
		$scope.date = current.getDate();
		$scope.year = current.getFullYear();
	}

}]);

datepickerModule.directive('datepicker', function() {
	return {
		template: ''
	};
});