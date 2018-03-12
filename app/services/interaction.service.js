const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId


module.exports = {
    create: create, 
    update: update
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