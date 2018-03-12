const dogOwnersServices = require('../services/dogOwnersServices')

module.exports = {
    create: create,
    readById: readById,
    delete: _delete,
    readAll: readAll,
    update: update
}

function update(req,res){
    dogOwnersServices
        .update(req.params.id, req.body)
        .then(dogOwner=>{
            res.status(200).json(dogOwner)
        })
        .catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })

}

function readAll(req, res) {
    dogOwnersServices.readAll()
        .then(dogOwners => {
            res.send(dogOwners)
            console.log(dogOwners)
        })
        .catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
}

function _delete(req,res){
    dogOwnersServices
        .delete(req.params.id)
        .then(()=>{
            res.status(200).json("deleted")
        })
        .catch(err=>{
            return res.status(500).send(err)
        })
}

function readById(req,res){
    dogOwnersServices.readById(req.params.id)
    .then(dogOwner=>{
        res.send(dogOwner)
        console.log(dogOwner)
    })
    .catch(err=>{
        res.status(500).send(err)
    })
}

function create(req,res){
    dogOwnersServices.create(req.body)
        .then(dogOwners=>{
            res.status(201).json(dogOwners)
        })
        .catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
}
