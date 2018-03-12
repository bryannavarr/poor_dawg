const SponsorsSchema = require('../models/sponsorsSchema')
const mongodb = require("../mongodb")
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId

module.exports = {
    postNew: postNew,
    getAll: getAll,
    getById: getById
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
function getById(id) {
    return conn.db().collection("sponsors").findOne({ "_id": ObjectId(id) })
        .then(data => {
            data.id = 
            data.id.toString()
            return data
        }
        )
}