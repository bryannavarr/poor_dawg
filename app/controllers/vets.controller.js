const responses = require('../models/responses')
const vetsService = require('../services/vets.service')
const apiPrefix = '/api/vets'

module.exports = {
    readAll: readAll,
    readById: readById,
    create: create,
    update: update,
    delete: _delete
}

function readAll(req, res){
    vetsService.readAll()
        .then(data => {
            res.status(200).send(
                new responses.ItemsResponse(data)
            ) 
        })
        .catch(err => {
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function readById(req, res){
    vetsService.readById(req.params.id)
        .then(data => {
            res.status(200).send(
                new responses.ItemResponse(data)
            )
        })
        .catch(err => {
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function create(req, res) {
    vetsService.create(req.model)
        .then(id => {
            const responseModel = new responses.ItemResponse()
            responseModel.item = id
            res.status(201)
                .location(`${apiPrefix}/${id}`)
                .json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function update(req, res) {
    vetsService
        .update(req.params.id, req.model)
        .then(hacker => {
            res.status(200).json(new responses.SuccessResponse())
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function _delete(req, res) {
    vetsService
        .delete(req.params.id)
        .then(() => {
            res.status(200).json(new responses.SuccessResponse())
        })
        .catch(err => {
            console.log(err)
            return res.status(500).send(new responses.ErrorResponse(err))
        })
}