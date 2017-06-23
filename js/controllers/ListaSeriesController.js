var listaSeries = angular.module("listaSeries",[]);

listaSeries.controller("listaSeriesCtrl", function($http) {
	var self = this;
	var url = 'https://omdbapi.com/?s=TITULO&apikey=93330d3c&type=series'
	self.series = [];
	
	self.search = function(name) { 
		var uri = encodeURI(url.replace(/TITULO/, name));
		var promisse = $http.get(uri).then(function(info) {
			self.series = info.data.Search;
		}, function error(info) {
			console.log("me lasquei");
		})
		return promisse;
	};

	self.hasImagePoster = function(serie) {
		return series.Poster !== 'N/A';
	}	

});