'use strict'

var fs = require("fs");
var path = require("path");
var uuid = require("uuid");

var playerFilePath = path.join(__dirname, "../data/db.json");

exports.get = function(cb) {
    fs.readFile(playerFilePath, (err, res) => {
        if (err) return cb(err);
        cb(null, JSON.parse(res));
    });
}

exports.add = function(player, cb) {
    this.get((err, res) => {
        if (err) return cb(err);
        player.id = uuid();
        res.push(player);
        fs.writeFile(playerFilePath, JSON.stringify(res), cb(err));
    });
}

exports.update = function(id, playUpd, cb) {
    this.get((err, res) => {
        var updatedPlay;
        if (err) return cb(err);
        var dataIndex;
        for (var i = 0; i < res.length; i++) {
            if (res[i].id === id) {

                for (var key in playUpd) {
                    res[i][key] = playUpd[key];
                };
                updatedPlay= res[i];
            }
        }
        if (!updatedPlay) {
            cb({
                err: "Player not found"
            });
            return;

        }
        fs.writeFile(playerFilePath, JSON.stringify(res), cb(err, updatedPlay));
    });
}


exports.remove = function(id, cb) {
    this.get((err, res) => {
        var deletedPlay;
        if (err) return cb(err);
        for (var i = 0; i < res.length; i++) {
            if (res[i].id === id) {
                deletedPlay = res[i];
                res.splice(i, 1);
            }
        }
        if (!deletedPlay) {
            cb({
                err: "Player not found"
            });
            return;

        }
        fs.writeFile(playerFilePath, JSON.stringify(res), cb(err));
    });
}

exports.getPlayer = function(id, cb) {
    this.get((err, res) => {
        var indivPlay;
        if (err) return cb(err);
        for (var i = 0; i < res.length; i++) {
            if (res[i].id === id) {
                indivPlay = res[i];
            }
        }
        if (!indivPlay) {
            cb({
                err: "Player not found"
            });
            return;

        }
        cb(err,indivPlay);
    });
}