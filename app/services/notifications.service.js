const Notification = require('../models/notification')
const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId

module.exports = {
    readAll: readAll,
    readById: readById,
    create: create

}

function readAll() {
    return conn.db().collection('notifications').find().toArray()
        .then(notifications => {
            for (let i = 0; i < notifications.length; i++) {
                let notification = notification[i]
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

