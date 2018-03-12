const Notification = require('../models/notification')
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
    return conn.db().collection('notifications').find().toArray()
        .then(notifications => {
            for (let i = 0; i < notifications.length; i++) {
                let notification = notifications[i]
                notification._id = notification._id.toString()
            }
            return notifications
        })
}

function readById(id) {
    return conn.db().collection('notifications').findOne({_id: new ObjectId(id)})
        .then(notification => {
            notification._id = notification._id.toString()
            return notification
        })
}

function create(model) {
    return conn.db().collection('notifications').insert(model)
        .then(result => result.insertedIds[0].toString())
}

function update(id, doc) {
    doc._id = new ObjectId(doc._id)
    return conn.db().collection('notifications').replaceOne({_id: new ObjectId(id)}, doc)
    .then(result => Promise.resolve())
}

function _delete(id) {
    return conn.db().collection('notifications')
    .deleteOne({_id: new ObjectId(id)})
        .then(result => Promise.resolve())
}