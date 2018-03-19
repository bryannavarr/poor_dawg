const users = require('../models/users')
const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId

module.exports = {
    readAll: readAll,
    readById: readById,
    create: create,
    update: update,
    delete: _delete
}

function readAll() {
    return conn.db().collection('users').find().toArray()
        .then(users => {
            for (i = 0; i < users.length; i++) {
                let user = users[i]
                user._id = user._id.toString()
            }
            return users
        })
}

function readById(id) {
    return conn.db().collection('users').findOne({ _id: ObjectId(id) })
        .then(user => {
            user._id = user._id.toString();
            return user
        })
}

function create(model) {
    return conn.db().collection('users').insert(model)
        .then(result =>
            result.insertedIds[0].toString())
}

function update(id, doc) {
    doc._id = new ObjectId(doc._id)
    return conn.db().collection('hackers').replaceOne( { _id: new ObjectId(id) }, doc )
        .then(result => Promise.resolve()) 
}

function _delete(id) {
    return conn.db().collection('users').deleteOne({ _id: ObjectId(id) })
        .then(result => Promise.resolve())
}