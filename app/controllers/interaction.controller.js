const apiPrefix = '/api/interaction'
const responses = require('../models/responses')
const interactionServices = require('../services/interaction.service')

module.exports = {
    create: create, 
    update: update

}

function create(req, res){
    interactionServices.create(req.model)
    .then(id => {
        responseModel = new responses.ItemResponse()
        responseModel.item = id
        res.status(201)
        .location(`${apiPrefix}/${id}`)
        .json(responseModel)
        })
        .catch(err=>{
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function update(req, res){
    req.model.updateDate = new Date();
    interactionServices.update(req.params.id, req.model)
    .then(interaction => {
        const responseModel = new responses.SuccessResponse()
        res.status(200).json(responseModel)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(new responses.ErrorResponse(err))
    })
}