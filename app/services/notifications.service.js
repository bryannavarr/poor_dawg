const Notification = require('../models/notification')
const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId

module.exports = {
    readAll: readAll,

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