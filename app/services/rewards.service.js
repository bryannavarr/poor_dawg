const Reward = require('../models/reward')
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
    return conn.db().collection('rewards').find().toArray()
        .then(rewards => {
            for (let i = 0; i < rewards.length; i++) {
                let reward = rewards[i]
                reward._id = reward._id.toString()
            }
            return rewards
        })
}

function readById(id) {
    return conn.db().collection('rewards').findOne({ _id: new ObjectId(id) })
    .then(reward => {
        reward._id = reward._id.toString()
        return reward
    })
}

function create(model) {
    return conn.db().collection('rewards').insert(model)
        .then(result => result.insertedIds[0].toString()) 
}

function update(id, doc) {
    doc._id = new ObjectId(doc._id)
    return conn.db().collection('rewards').replaceOne( { _id: new ObjectId(id) }, {$set: doc} )
        .then(result => 
            Promise.resolve())
}

function _delete(id) {
    return conn.db().collection('rewards').deleteOne({ _id: new ObjectId(id) })
        .then(result => Promise.resolve())
}