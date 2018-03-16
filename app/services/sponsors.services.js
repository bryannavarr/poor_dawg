const SponsorsSchema = require('../models/sponsorsSchema')
const mongodb = require("../mongodb")
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId

module.exports = {
    create: create,
    readAll: readAll,
    getByEmail: getByEmail,
    getById: getById,
    update: update,
    del: del
}

function create(model) {
    return conn.db().collection("sponsors").insertOne(model)
        .then(result => result.insertedId.toString())
}
function readAll() {
    return conn.db().collection("sponsors").find().toArray()
        .then(result => {
            for (let i = 0; i < result.length; i++) {
                result[i]._id = result[i]._id.toString()
            }
            return result
        }
        )
}
function getByEmail(email) {
    return conn.db().collection("sponsors").findOne({ "email": email })
        .then(
            data => {
                if (data) {
                    data._id = data._id.toString()
                }
                return data
            }
        )
}
function getById(id) {
    return conn.db().collection("sponsors").findOne({ "_id": ObjectId(id) })
        .then(data => {
            data._id = data._id.toString()
            return data
        }
        )
}
function update(id, model) {
    return conn.db().collection("sponsors").replaceOne({ "_id": ObjectId(id) }, model)
        .then(result => Promise.resolve())
}
function del(id) {
    return conn.db().collection("sponsors").deleteOne({ "_id": ObjectId(id) })
        .then(result => Promise.resolve())
}