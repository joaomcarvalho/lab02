var listaSeries = angular.module("listaSeries",['ngMaterial']);

listaSeries.controller("listaSeriesCtrl", function($http, ListaSeriesService, $scope, $mdDialog) {
	var self = this;
	this.series = [];
	this.seriesPerfil = [];
	this.seriesWatchList = [];
	
	self.search = function(name,ev) { 
		var promise = ListaSeriesService.search(name);
		promise.then(function(response){
			if (response.data.Response == "False"){
				$mdDialog.show(
     		 	$mdDialog.alert()
        		.parent(angular.element(document.querySelector('#popupContainer')))
       		    .clickOutsideToClose(true)
        		.title('Ops!')
        		.textContent('Série não encontrada')
        		.ariaLabel('Alert Dialog Demo')
        		.ok('Ok')
        		.targetEvent(ev)
   			 );
			}
			self.series = response.data.Search;
		});
		return promise;
	};

	self.hasImagePoster = function(serie) {
		return series.Poster !== 'N/A';
	};	

	self.contemSeriePerfil = function(id) {
		for (var i = 0; i < self.seriesPerfil.length; i++){
			if(self.seriesPerfil[i].imdbID === id){
				return true;
			}
		}
		return false;
	};

	self.adicionarAoPerfil = function(ev, serie) {
		var promise = ListaSeriesService.getSingleSerie(serie);
		promise.then(function(response){
			if(!self.contemSeriePerfil(response.data.imdbID)){
				self.seriesPerfil.push(response.data);
			}else{
				$mdDialog.show(
     		 	$mdDialog.alert()
        		.parent(angular.element(document.querySelector('#popupContainer')))
       		    .clickOutsideToClose(true)
        		.title('Ops!')
        		.textContent('Você já colocou esta série no Perfil.')
        		.ariaLabel('Alert Dialog Demo')
        		.ok('Ok')
        		.targetEvent(ev)
   			 );
			}
		});
	};

	self.removerDoPerfil = function(ev, serie) {
		var dialog = $mdDialog.confirm()
			.title('Cuidado!')
			.textContent('Deseja mesmo remover ' + serie.Title + ' do seu Perfil?')
			.ariaLabel('Confirm Dialog')
			.targetEvent(ev)
			.ok('Remover')
			.cancel('Cancelar');

		$mdDialog.show(dialog).then(function(){
			var index = self.seriesPerfil.indexOf(serie);
			self.seriesPerfil.splice(index,1);
		})
		
	};

	self.adicionarAoWatchList = function(ev, serie) {
		if(!self.contemSerieWatchList(serie.imdbID)){
			self.seriesWatchList.push(serie);
		}else{
			$mdDialog.show(
     		 	$mdDialog.alert()
        		.parent(angular.element(document.querySelector('#popupContainer')))
       		    .clickOutsideToClose(true)
        		.title('Ops!')
        		.textContent('Você já colocou esta série a sua WatchList.')
        		.ariaLabel('Alert Dialog Demo')
        		.ok('Ok')
        		.targetEvent(ev)
   			 );
		}
	};

	self.contemSerieWatchList = function(id) {
		for (var i = 0; i < self.seriesWatchList.length; i++){
			if(self.seriesWatchList[i].imdbID === id){
				return true;
			}
		}
		return false;
	}

	self.removerWatchList = function(serie) {
		var index = self.seriesWatchList.indexOf(serie);
		self.seriesWatchList.splice(index,1);
	};

	self.setNota = function(ev, serie, nota) {
		if(nota > 10 || nota < 0){
			
		}else{
			serie.nota = nota;
		}
	}

	self.setUltimoEpisodio = function(serie, episodio) {
		serie.ultimoEpisodio = episodio
	}

	self.adicionarAoPerfilERemoverWatchList = function(evt, serie) {
		self.adicionarAoPerfil(evt, serie);
		self.removerWatchList(serie);
	}
});