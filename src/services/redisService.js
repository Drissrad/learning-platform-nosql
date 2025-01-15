// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse :
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse :

// Fonctions utilitaires pour Redis
const redisClient = require('../config/db').redisClient;
async function cacheData(key, data, ttl) {
  try {
    await redisClient.setEx(key, ttl, JSON.stringify(data));
  } catch (err) {
    console.error('Erreur lors de la mise en cache :', err);
  }
  }
  async function getCachedData(key) {
    try {
      const data = await redisClient.get(key);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      console.error('Erreur lors de la récupération du cache :', err);
      return null;
    }
  }
  
  module.exports = {
    cacheData, getCachedData
  };