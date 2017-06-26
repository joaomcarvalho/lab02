var listaSeries = angular.module("listaSeries",['ngMaterial']);

listaSeries.controller("listaSeriesCtrl", function($http, ListaSeriesService, $scope, $mdDialog) {
	var self = this;
	this.series = [];
	this.seriesPerfil = [];
	this.seriesWatchList = [];
	
	self.search = function(name) { 
		var promise = ListaSeriesService.search(name);
		promise.then(function(response){
			self.series = response.data.Search;
		});
		return promise;
	};

	self.hasImagePoster = function(serie) {
		return series.Poster !== 'N/A';
	};	

	self.adicionarAoPerfil = function(serie) {
		var promise = ListaSeriesService.getSingleSerie(serie);

		promise.then(function(response){
			self.seriesPerfil.push(response.data);
		});
	};

	self.exibirPerfil = function() {
		self.series = self.seriesPerfil;
	};

	self.removerDoPerfil = function(serie) {
		var index = self.seriesPerfil.indexOf(serie);
		self.seriesPerfil.splice(index,1);
	};

	self.adicionarAoWatchList = function(serie) {
		var promise = ListaSeriesService.getSingleSerie(serie);

		promise.then(function(response){
			self.seriesWatchList.push(response.data);
		});
	};

	self.exibirWatchList = function() {
		self.series = self.seriesWatchList;
	};

	self.removerWatchList = function() {
		var index = self.seriesWatchList.indexOf(serie);
		self.seriesWatchList.splice(index,1);
	};

	self.setNota = function(serie, nota) {
		serie.nota = nota;
	}

	self.setUltimoEpisodio = function(serie, episodio) {
		serie.ultimoEpisodio = episodio
	}
});