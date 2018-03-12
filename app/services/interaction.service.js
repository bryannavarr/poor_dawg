const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId


module.exports = {
    create: create
}


function create (model){
    //console.log(conn.db())
    return conn.db().collection('interaction').insert(model)
    .then(data => data.insertedIds[0].toString())
}