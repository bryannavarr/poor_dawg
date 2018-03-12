const responses = require('../models/responses');
const notificationsService = require('../services/notifications.service')
const apiPrefix = '/api/notifications';

module.exports = {
    readAll: readAll,

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