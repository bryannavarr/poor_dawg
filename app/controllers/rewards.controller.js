const responses = require('../models/responses');
const rewardsService = require('../services/rewards.service')
const apiPrefix = '/api/rewards';

module.exports = {
    readAll: readAll,
    create: create,
    readById: readById,
    update: update,
    delete: _delete
}

function readAll(req, res) {
    rewardsService.readAll()
        .then(rewards => {
            const responseModel = new responses.ItemsResponse()
            responseModel.items = rewards
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        });
}

function readById(req, res) {
    rewardsService.readById(req.params.id)
        .then(reward => {
            const responseModel = new responses.ItemResponse()
            responseModel.item = reward
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function create(req, res) {
    rewardsService.create(req.model)
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
    rewardsService
        .update(req.params.id, req.model)
        .then(reward => {
            const responseModel = new responses.SuccessResponse()
            res.status(200).json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function _delete(req, res) {
    rewardsService
        .delete(req.params.id)
        .then(() => {
            const responseModel = new responses.SuccessResponse()
            res.status(200).json(responseModel)
        })
        .catch(err => {
            console.log(err)
            return res.status(500).send(new responses.ErrorResponse(err))
        })
}