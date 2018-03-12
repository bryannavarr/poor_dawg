const apiPrefix = '/api/interaction'
const responses = require('../models/responses')
const interactionServices = require('../services/interaction.service')

module.exports = {
    create: create

}

function create(req, res){
    interactionServices.create(req.body)
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
