const responses = require('../models/responses');
const sponsorsServices = require("../services/sponsors.services")
const apiPrefix = '/api/sponsors';

module.exports = {
    readAll: readAll,
    getByEmail: getByEmail,
    getById: getById,
    update: update,
    del: del
}

function create(req, res) {
    sponsorsServices.create(req.model)
        .then(
            data => {
                req.model._id = data;
                res.status(200).send(req.model)
            }
        )
        .catch(
            error => {
                res.status(500).send(error)
            }
        )
}

function readAll(req, res) {
    sponsorsServices.readAll()
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

function getByEmail(req, res) {
    sponsorsServices.getByEmail(req.model.email)
        .then(
            data => {
                if (data) {
                    res.status(409).send("This user already exists.")
                }
                else {
                    create(req, res)
                }
            }
        )
        .catch(
            error => {
                res.status(500).send(error
                )
            }
        )
}

function getById(req, res) {
    sponsorsServices.getById(req.params.id)
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
function update(req, res) {
    delete req.model._id;
    sponsorsServices.update(req.params.id, req.model)
        .then(
            data => {
                res.status(200).send(req.model)
            }
        )
        .catch(
            error => {
                res.status(500).send(error)
            }
        )
}
function del(req, res) {
    sponsorsServices.del(req.params.id)
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