const responses = require('../models/responses');
const sponsorsServices = require("../services/sponsors.services")
const apiPrefix = '/api/sponsors';

module.exports = {
    // postNew: postNew,
    getAll: getAll,
    getByEmail: getByEmail,
    getById: getById,
    putUpdate: putUpdate,
    deleteEntry: deleteEntry
}

function postNew(req, res) {
    // console.log(req.model)
    sponsorsServices.postNew(req.model)
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

function getByEmail(req, res) {
    sponsorsServices.getByEmail(req.model.email)
        .then(
            data => {
                if (data) {
                    res.status(409).send("This user already exists.")
                }
                else {
                    postNew(req, res)
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
function putUpdate(req, res) {
    delete req.model._id;
    sponsorsServices.putUpdate(req.params.id, req.model)
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
function deleteEntry(req, res) {
    sponsorsServices.deleteEntry(req.params.id)
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