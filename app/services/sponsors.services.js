const SponsorsSchema = require('../models/sponsorsSchema')
const mongodb = require("../mongodb")
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId

module.exports = {
    postNew: postNew,
    getAll: getAll,
    getByEmail: getByEmail,
    getById: getById,
    putUpdate: putUpdate,
    deleteEntry: deleteEntry
}

function postNew(model) {
    return conn.db().collection("sponsors").insertOne(model)
        .then(result => result.insertedId.toString())
}
function getAll() {
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
    return conn.db().collection("sponsors").findOne({ "email": email }) //Use this returned data to check for a truthy value (data).
        .then(
            data => {
                if (data) {
                    data._id = data._id.toString() //Needed if statement because a null data value errors out.
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
function putUpdate(id, model) {
    return conn.db().collection("sponsors").replaceOne({ "_id": ObjectId(id) }, model)
        .then(result => Promise.resolve())
}
function deleteEntry(id) {
    return conn.db().collection("sponsors").deleteOne({ "_id": ObjectId(id) })
        .then(result => Promise.resolve())
}