'use strict';

var app = angular.module("playerApp");

app.service("playerService", function($http) {

    this.getAll = function() {
        return $http.get("/players")
    };

    this.getIndividual = function(player) {
        return $http.get(`/players/${player.id}`);
    };

    this.addPlayer = function(newPlayer) {
        return $http.post("/players", newPlayer);
    };

    this.remove = function(player) {
        return $http.delete(`/players/${player.id}`);
    };

    this.update = function(player, newInfo) {
        return $http({
            method: "PUT",
            url: `/players/${player.id}`,
            data: newInfo
        });
    };

});