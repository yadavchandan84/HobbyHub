const path = require('path');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

// Ensure env is loaded if this module is required before app.js runs dotenv
require('dotenv').config({ path: path.join(__dirname, '..', 'config.env') });

const URL = process.env.DATABASE || 'mongodb://127.0.0.1:27017/hobbyhub';

const opts = {
  serverSelectionTimeoutMS: 8000,
};

// Start an in-memory MongoDB and connect to it. Used as a fallback so the
// app is runnable out of the box when no real database is reachable.
async function connectInMemory() {
  const { MongoMemoryServer } = require('mongodb-memory-server');
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri, opts);
  console.log('Connected to in-memory MongoDB (data resets on restart).');
  console.log(
    'To use a persistent database, set DATABASE in config.env to a reachable MongoDB URL.'
  );

  // Clean up the in-memory server when the process exits.
  const shutdown = async () => {
    try {
      await mongoose.connection.close();
      await mongod.stop();
    } catch (e) {
      // ignore
    }
    process.exit(0);
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

async function connect() {
  try {
    await mongoose.connect(URL, opts);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Primary MongoDB connection failed:', err.message);
    if (err.message && err.message.includes('whitelist')) {
      console.error(
        'Atlas: open https://cloud.mongodb.com -> Network Access -> add your current IP (or 0.0.0.0/0 for development only).'
      );
    }
    console.warn('Falling back to an in-memory MongoDB instance...');
    try {
      await connectInMemory();
    } catch (memErr) {
      console.error('In-memory MongoDB fallback also failed:', memErr.message);
    }
  }
}

connect();

module.exports = mongoose.connection;
