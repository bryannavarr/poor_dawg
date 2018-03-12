const responses = require('../models/responses');
const usersService = require('../services/users.service');
const apiPrefix = '/api/users';

module.exports = {
    readAll: readAll,
    readById: readById,
    create: create,
    update: update,
    delete: _delete
}

function readAll(req, res) {
    usersService.readAll()
        .then(users => {
            const responseModel = new responses.ItemsResponse()
            responseModel.items = users
            res.json(responseModel)
        })
        .catch(err => {
            console.log("error=", error)
            res.sendStatus(500).send(new responses.ErrorResponse(err))
        })
}

function readById(req, res) {
    usersService.readById(req.params.id)
        .then(user => {
            const responseModel = new responses.ItemResponse()
            responseModel.item = user
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function create(req, res) {
    usersService.create(req.model)
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
    usersService.update(req.params.id, req.model)
        .then(user => {
            const responseModel = new responses.Success.Response()
            res.status(200).json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function _delete(req, res) {
    usersService.delete(req.params.id)
        .then(() => {
            const responseModel = new responses.SuccessResponse()
            res.status(200).json(responseModel)
        })
        .catch(err => {
            console.log(err)
            return res.status(500).send(new responses.ErrorResponse(err))
        })
}