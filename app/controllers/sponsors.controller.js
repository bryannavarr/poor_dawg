const responses = require('../models/responses');
const sponsorsServices = require("../services/sponsors.services")
const apiPrefix = '/api/sponsors';

module.exports = {
    postNew: postNew,
    getAll: getAll,
    getById: getById
}

function postNew(req, res) {
    sponsorsServices.postNew(req.model)
        .then(
            data => {
                console.log(data)
                res.status(200).send(data)
            }
        )
        .catch(
            error => {
                res.status(500).send(error)
            }
        )
}

function getAll(req, res) {
    sponsorsServices.getAll()
        .then(
            data => {
                res.status(200).send(data)
            }
        )
        .catch(
            error => {
                res.status(500).send(error)
            }
        )
}

function getById(req, res) {
    sponsorsServices.getById(req.params.id)
        .then(
            data => {
                console.log(data)
                res.status(200).send(data)
            }
        )
        .catch(
            error => {
                res.status(500).send(error)
            }
        )
}