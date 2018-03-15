const Hacker = require("../models/challenge");
const mongodb = require("../mongodb");
const conn = mongodb.connection;
const ObjectId = mongodb.ObjectId;

module.exports = {
  readAll: readAll,
  readById: readById,
  create: create,
  update: update,
  delete: _delete
};

function readAll() {
  return conn
    .db()
    .collection("challenges")
    .find()
    .toArray()
    .then(challenges => {
      for (let i = 0; i < challenges.length; i++) {
        let challenge = challenges[i];
        challenge._id = challenge._id.toString();
      }
      return challenges;
    });
}

function readById(id) {
  docId = new ObjectId(id);
  return conn
    .db()
    .collection("challenges")
    .findOne({ _id: docId })
    .then(challenge => {
      challenge._id = challenge._id.toString();
      return challenge;
    });
}

function create(model) {
  return conn
    .db()
    .collection("challenges")
    .insert(model)
    .then(result => result.insertedIds[0].toString());
}

function update(id, doc) {
  doc._id = new ObjectId(id);
  return conn
    .db()
    .collection("challenges")
    .replaceOne({ _id: doc._id }, doc)
    .then(result => Promise.resolve());
}

function _delete(id) {
  docId = new ObjectId(id);

  return conn
    .db()
    .collection("challenges")
    .deleteOne({ _id: docId })
    .then(result => Promise.resolve());
}
