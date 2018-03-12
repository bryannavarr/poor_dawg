const responses = require('../models/responses');
const notificationsService = require('../services/notifications.service')
const apiPrefix = '/api/notifications';

module.exports = {
    readAll: readAll,
    readById: readById,
    create: create,


}

function readAll(req, res) {
    notificationsService.readAll()
        .then(notifications => {
            const responseModel = new responses.ItemsResponse()
            responseModel.items = notifications
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function readById(req, res) {
    notificationsService.readById(req.params.id)
        .then(notification => {
            const responseModel = new responses.ItemsResponse()
            responseModel.item = notification
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function create(req, res) {
    notificationsService.create(req.model)
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