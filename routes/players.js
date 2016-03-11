'use strict';

var express = require("express");
var router = express.Router();
var Player = require("../models/player.js");

router.get("/", (req, res) => {
    Player.get((err, data) => {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.send(data);
    });
});

router.post("/", function(req, res) {
    Player.add(req.body, function(err, data) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.send(data);
    });
});

router.put("/:id", function(req, res) {
    Player.update(req.params.id, req.body, function(err, data) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.send(data);
    });
});

router.get("/:id", function(req, res) {
    Player.getPlayer(req.params.id, function(err, data) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.send(data);
    });
});

router.delete("/:id", function(req, res) {
    Player.remove(req.params.id, function(err) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.send();
    })
});

module.exports = router;