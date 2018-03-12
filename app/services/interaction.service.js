const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId


module.exports = {
    create: create, 
    update: update, 
    readAll: readAll, 
    readById: readById,
    delete: _delete
}


function create (model){
    //console.log(conn.db())
    console.log(model)
    return conn.db().collection('interaction').insert(model)
    .then(data => data.insertedIds[0].toString())
}

function update(id, doc){
    console.log(doc)
    doc._id = new ObjectId(doc._id)
    return conn.db().collection('interaction').replaceOne({_id: new ObjectId(id)}, doc)
    .then(result => Promise.resolve())
}

function readAll(){
    return conn.db().collection('interaction').find().toArray()
    .then(interactions => {
        for (let i=0; i<interactions.length; i++){
            let interaction = interactions[i]
            interaction._id = interaction._id.toString()
        }
        return interactions
    })
}

function readById(id){
    return conn.db().collection('interaction').findOne({_id: new ObjectId(id)})
    .then(interaction => {
        interaction._id = interaction._id.toString()
        return interaction
    })
}

function _delete(id){
    return conn.db().collection('interaction').deleteOne({_id: new ObjectId(id)})
    .then(result => Promise.resolve())
}