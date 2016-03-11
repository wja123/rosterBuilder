'use strict';
var app = angular.module("playerApp");
app.controller("playerCtrl", function($scope, playerService) {
var edPlayer;
refreshData();
$scope.listmode = true;
$scope.sortType="";
$scope.sortType ="player";
$scope.sortReverse =false;
$scope.searchPlayer="";

function refreshData(){
    playerService.getAll().then(function(res) {
        $scope.playersList = res.data;
    }, function(err) {
        swal("Oops...", "Something went wrong!", "We couldn't get the data");
        console.log("err: ", err)
    });
};
    $scope.showDetails = function() {

        edPlayer=this.player;
        playerService.getIndividual(this.player).then(function(res) {
            $scope.playerDet = res.data;
        $scope.listmode=false;
        }, function(err) {
            swal("Oops...", "Something went wrong!", "We couldn't get that players details");
            console.log("err: ", err);
        });
    };

    $scope.addNewPlayer = function(){
    playerService.addPlayer($scope.newplayer).then(function(res){
        console.log(res.data);
        swal("Sucessfully Added!")
        refreshData();
    },function(err){
        swal("Oops...","Something went wrong!","We couldn't add that player");
    });
    }

    $scope.updatePlayer = function() {
        playerService.update(edPlayer, $scope.playerDet).then(function(res) {
            console.log(res.data);
            swal("Successfully Updated!");
            $scope.playerDet = res.data;
        }, function(err) {
            swal("Oops...", "Something went wrong!", "error");
            console.log("err: ", err);
        });
    };

    $scope.deletePlayer = function() {
        playerService.remove(edPlayer).then(function(res) {
            console.log(res.data);
            swal("Successfully Deleted!");
            $scope.playerDet = res.data;
        }, function(err) {
            swal("Oops...", "Something went wrong!", "error");
            console.log("err: ", err);
        });
    };

    $scope.closeDetails = function() {
    edPlayer={};
    refreshData();
    $scope.listmode=true;
    $scope.playerDet={};
    };

});