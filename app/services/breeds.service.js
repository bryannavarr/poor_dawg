const breeds = require("../models/breed");
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
    .collection("breeds")
    .find()
    .toArray()
    .then(breeds => {
      for (let i = 0; i < breeds.length; i++) {
        let breed = breeds[i];
        breed._id = breed._id.toString();
      }
      return breeds;
    });
}

function readById(id) {
  return conn
    .db()
    .collection("breeds")
    .findOne({ _id: new ObjectId(id) })
    .then(breed => {
      breed._id = breed._id.toString();
      return breed;
    });
}

function create(model) {
  return conn
    .db()
    .collection("breeds")
    .insert(model)
    .then(data => data.insertedIds[0].toString());
}

function update(id, doc) {
  doc._id = new ObjectId(doc._id);
  return conn
    .db()
    .collection("breeds")
    .replaceOne({ _id: new ObjectId(id) }, { $set: doc })
    .then(result => Promise.resolve());
}

function _delete(id) {
  return conn
    .db()
    .collection("breeds")
    .deleteOne({ _id: new ObjectId(id) })
    .then(result => Promise.resolve()); // "return" nothing
}
