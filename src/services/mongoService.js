// Question: Pourquoi créer des services séparés ?
// Réponse: 

const { ObjectId } = require('mongodb');
const db = require('../config/db').getDb();
// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error('ID non valide.');
    }
    const result = await db.collection(collection).findOne({ _id: new ObjectId(id) });
    return result;
  } catch (err) {
    console.error(`Erreur lors de la recherche dans ${collection} :`, err);
    throw err;
  }
}
async function insertOne(collection, data) {
  try {
    const result = await db.collection(collection).insertOne(data);
    return result;
  } catch (err) {
    console.error(`Erreur lors de l'insertion dans ${collection} :`, err);
    throw err;
  }
}
async function findAll(collection) {
  try {
    const results = await db.collection(collection).find().toArray();
    return results;
  } catch (err) {
    console.error(`Erreur lors de la récupération dans ${collection} :`, err);
    throw err;
  }
}

// Export des services
module.exports = {
  findOneById,
  insertOne,
  findAll,
};