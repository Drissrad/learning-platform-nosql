// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : Pour centraliser la gestion des connexions et les réutiliser facilement.
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : En utilisant des hooks comme SIGTERM pour fermer proprement les connexions lors de l'arrêt de l'application.

const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient;
let db = null;

async function connectMongo() {
  try {
    console.log("Tentative de connexion à MongoDB...");
    mongoClient = await MongoClient.connect(config.mongodb.uri);
    db = mongoClient.db(config.mongodb.dbName);
    console.log('Connexion MongoDB réussie.');
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error);
    process.exit(1);
  }
}
function getDb() {
  if (!db) {
    console.error("La connexion à MongoDB n'a pas été établie.");
    throw new Error("La connexion à la base de données MongoDB n'a pas été établie.");
  }
  return db;
}
async function connectRedis() {
  try {
    console.log("Tentative de connexion à Redis...");
    redisClient = redis.createClient({ url: config.redis.uri });
    await redisClient.connect();
    console.log('Connexion Redis réussie.');
  } catch (err) {
    console.error('Erreur de connexion à Redis :', err);
    process.exit(1);
  }
}
async function closeConnections() {
  if (mongoClient) await mongoClient.close();
  if (redisClient) await redisClient.quit();
}

// Export des fonctions et clients
module.exports = {
  connectMongo,
  connectRedis,
  closeConnections,
  getDb

};