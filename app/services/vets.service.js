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
    return conn.db().collection('vets').find().toArray()
        .then(items => {
            return items.map(item => {
                item._id = item._id.toString()
                return item
            })
        })
}

function readById(id) {
    return conn.db().collection('vets').findOne({ _id: new ObjectId(id) })
        .then(item => {
            item._id = item._id.toString() // convert ObjectId back to string
            return item
        })
}

function create(model) {
    return conn.db().collection('vets').insert(model)
        .then(result => result.insertedIds[0].toString()) // "return" generated Id as string
}

function update(id, doc) {
    // convert string id used outside of MongoDB into ObjectId needed by MongoDB
    doc._id = new ObjectId(doc._id)

    return conn.db().collection('vets')
        .replaceOne({ _id: new ObjectId(id) }, doc)
        .then(result => Promise.resolve()) // "return" nothing
}

function _delete(id) {
    return conn.db().collection('vets').deleteOne({ _id: new ObjectId(id) })
        .then(result => Promise.resolve()) // "return" nothing
}
